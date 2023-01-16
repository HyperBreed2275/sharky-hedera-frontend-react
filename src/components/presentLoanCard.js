import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CYAN_DEFAULT_COLOR, WHITE_DEFAULT_COLOR } from '../default/color';
import { CARD_STATUS_STYLE, DISPLAY_COLUMN_STYLE } from '../default/style';
import { milliSecToStr } from '../api/defaultFunctions';
import { useHashConnect } from '../api/HashConnectAPIProvider.tsx';
import Loading from './loading';
import { calcServerFee } from '../api/mirrorApiRequest';
import { FEE_USE_FLAG, SERVER_FEE_DOLLAR_VALUE, TREASURY_WALLET_ID } from '../default/value';
import { getLoanBackRequest } from '../api/apiRequests';

const PresentLoanCard = ({ accountId, cardInfo, offerFinished }) => {
    let remainTime = 0;
    const [remainTimeStr, setRemainTimeStr] = useState('');

    const [loadingStatus, setLoadingStatus] = useState(false);

    const { allowanceTransaction } = useHashConnect();

    useEffect(() => {
        console.log('PresentLoanCard useEffect log - 1', cardInfo);
        getRemainTimeStr(cardInfo.remainTime);
        const interval = setInterval(() => {
            getRemainTimeStr(remainTime - 1000);
        }, 1000);
        return () => clearInterval(interval);
    }, [cardInfo]);

    const getRemainTimeStr = (remainTime_g) => {
        if (remainTime_g <= 0) {
            offerFinished(cardInfo.tokenId, cardInfo.serialNum,
                'Loan Finished!');
        }

        remainTime = remainTime_g > 0 ? remainTime_g : 0;
        console.log('getRemainTimeStr log - 1 : ', remainTime_g);
        const timeInfo = milliSecToStr(remainTime_g);
        console.log('getRemainTimeStr log - 2 : ', timeInfo);

        const tempTimeStr = (timeInfo.day > 0 ? timeInfo.day + (timeInfo.day > 1 ? ' days ' : ' day ') : '') +
            ('0' + timeInfo.hour).slice(-2) + ':' +
            ('0' + timeInfo.min).slice(-2) + ':' +
            ('0' + timeInfo.sec).slice(-2);
        setRemainTimeStr(tempTimeStr);
    }

    const onClickGetBackLoan = async () => {
        console.log('onClickGetBackLoan log - 1');
        setLoadingStatus(true);
        // calc fee
        const serverFee = FEE_USE_FLAG ? await calcServerFee(SERVER_FEE_DOLLAR_VALUE) : 0;

        // allowance
        const allowanceResult = await allowanceTransaction(TREASURY_WALLET_ID, serverFee + cardInfo.billPrice, 0, 0);
        console.log('onClickGetBackLoan log - 2 : ', allowanceResult);
        if (!allowanceResult.result) {
            toast.error(allowanceResult.error);
            setLoadingStatus(false);
            return;
        }

        // get back request
        const getBackResult = await getLoanBackRequest(accountId, cardInfo.tokenId, cardInfo.serialNum);
        console.log('onClickGetBackLoan log - 3 : ', getBackResult);
        if (!getBackResult.result) {
            toast.error(getBackResult.error);
            setLoadingStatus(false);
            return;
        }

        setLoadingStatus(false);
        offerFinished(cardInfo.tokenId, cardInfo.serialNum,
            'Get back NFT successfully done. Please check your wallet!');
    }

    return (
        <>
            <Box sx={{
                ...DISPLAY_COLUMN_STYLE,
                ...{
                    width: '250px',
                    height: '380px',
                    backgroundColor: CYAN_DEFAULT_COLOR,
                    alignItems: 'center',
                }
            }}>
                <Box sx={{
                    width: '240px',
                    height: '240px',
                    margin: '5px',
                    backgroundImage: `url(${cardInfo.imageUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                }} />
                <Box sx={{
                    ...DISPLAY_COLUMN_STYLE,
                    ...{
                        width: '230px',
                        marginBottom: '7px',
                    }
                }}>
                    <Typography sx={CARD_STATUS_STYLE}>
                        Duration: {cardInfo.duration} {cardInfo.duration > 1 ? 'days' : 'day'}
                    </Typography>
                    <Typography sx={CARD_STATUS_STYLE}>
                        Time Remain: {remainTimeStr}
                    </Typography>
                    <Typography sx={CARD_STATUS_STYLE}>
                        Bill Price: {cardInfo.billPrice} hbar
                    </Typography>
                </Box>
                {
                    loadingStatus &&
                    <Loading />
                }
                {
                    !loadingStatus &&
                    <Button variant='outlined'
                        onClick={onClickGetBackLoan}
                        sx={{
                            width: '150px',
                            color: WHITE_DEFAULT_COLOR,
                            border: '3px solid',
                            borderColor: WHITE_DEFAULT_COLOR,
                            borderRadius: '0',
                            '&:hover': {
                                border: '3px solid',
                                borderColor: WHITE_DEFAULT_COLOR,
                            },
                            '&:focus': {
                                outline: 'none',
                            }
                        }}>
                        GET BACK
                    </Button>
                }
            </Box>
            <ToastContainer autoClose={3000} draggableDirection='x' />
        </>
    );
}

export default PresentLoanCard;
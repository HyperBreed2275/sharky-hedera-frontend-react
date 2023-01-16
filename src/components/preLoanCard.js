import React, { useState } from 'react';
import { Box, Button, Dialog, Typography, Slider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CYAN_DEFAULT_COLOR } from '../default/color';
import { DIALOG_BUTTON_STYLE, DISPLAY_COLUMN_STYLE, DISPLAY_ROW_STYLE, INPUT_WRAPPER_STYLE } from '../default/style';
import { BILL_PRICE_MAX_VALUE, DURATION_MAX_VALUE, FEE_USE_FLAG, SERVER_FEE_DOLLAR_VALUE, TREASURY_WALLET_ID } from '../default/value';
import { sendCreateLoanRequest } from '../api/apiRequests';
import { useHashConnect } from '../api/HashConnectAPIProvider.tsx';
import Loading from './loading';
import { calcServerFee } from '../api/mirrorApiRequest';

const PreLoanCard = ({ accountId, cardInfo, offerFinished }) => {
    const { allowanceTransaction } = useHashConnect();

    const [loadingStatus, setLoadingStatus] = useState(false);
    const [settingDialogView, setSettingDialogView] = useState(false);

    const [durationValue, setDurationValue] = useState(1);
    const [billPriceValue, setBillPriceValue] = useState(1);

    const onClickRequest = async () => {
        setLoadingStatus(true);

        // calc fee
        const serverFee = FEE_USE_FLAG ? await calcServerFee(SERVER_FEE_DOLLAR_VALUE) : 0;

        // allowance
        const allowanceResult = await allowanceTransaction(TREASURY_WALLET_ID, serverFee, cardInfo.tokenId, cardInfo.serialNum);
        console.log('onClickRequest log - 2 : ', allowanceResult);
        if (!allowanceResult.result) {
            toast.error(allowanceResult.error);
            setLoadingStatus(false);
            return;
        }

        // send request
        const createResult = await sendCreateLoanRequest(accountId, cardInfo.tokenId, cardInfo.serialNum, cardInfo.imgUrl, durationValue, billPriceValue, serverFee);
        console.log('onClickRequest log - 3 : ', createResult);
        if (!createResult.result) {
            toast.error(createResult.error);
            setLoadingStatus(false);
            return;
        }

        setLoadingStatus(false);
        setSettingDialogView(false);
        offerFinished(cardInfo.tokenId, cardInfo.serialNum);
    }

    return (
        <>
            <Button onClick={() => { setSettingDialogView(true) }}
                sx={{
                    position: 'relative',
                    width: '250px',
                    height: '250px',
                    borderRadius: '0',
                    border: '5px solid',
                    borderColor: CYAN_DEFAULT_COLOR,
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                    '& p': {
                        top: '250px',
                        transition: 'all 1s',
                    },
                    '&:hover': {
                        backgroundColor: '#ffffff80',
                        '& p': {
                            top: '105px',
                            transition: 'all 0.75s',
                        },
                    },
                    '&:focus': {
                        outline: 'none',
                    },
                }}>
                <Box sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${cardInfo.imgUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    '&:hover': {
                        filter: 'blur(5px)',
                    },
                }} />
                <Typography sx={{
                    position: 'absolute',
                    textTransform: 'none',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: CYAN_DEFAULT_COLOR,
                    border: '3px solid',
                    borderColor: CYAN_DEFAULT_COLOR,
                    padding: '0 7px',
                    margin: '0',
                    pointerEvents: 'none',
                }}>
                    Create Loan
                </Typography>
            </Button>
            <Dialog open={settingDialogView}>
                <Box sx={{
                    ...DISPLAY_COLUMN_STYLE,
                    ...{
                        width: '250px',
                        margin: '15px',
                    }
                }}>
                    <Box sx={{
                        width: '250px',
                        height: '250px',
                        backgroundImage: `url(${cardInfo.imgUrl})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }} />
                    <Box sx={INPUT_WRAPPER_STYLE}>
                        <p>Duration : {durationValue} {durationValue > 1 ? 'days' : 'day'}</p>
                        <Slider
                            value={durationValue}
                            min={1}
                            step={1}
                            max={DURATION_MAX_VALUE}
                            onChange={(e) => { !loadingStatus && setDurationValue(e.target.value) }}
                        />
                    </Box>
                    <Box sx={{
                        ...INPUT_WRAPPER_STYLE,
                        ...{
                            marginBottom: '15px',
                        }
                    }}>
                        <p>Bill Price : {billPriceValue} hbar</p>
                        <Slider
                            value={billPriceValue}
                            min={1}
                            step={1}
                            max={BILL_PRICE_MAX_VALUE}
                            onChange={(e) => { !loadingStatus && setBillPriceValue(e.target.value) }}
                        />
                    </Box>
                    {
                        !loadingStatus &&
                        <Box sx={{
                            ...DISPLAY_ROW_STYLE,
                            ...{
                                justifyContent: 'right',
                            }
                        }}>
                            <Button variant='contained'
                                onClick={onClickRequest}
                                sx={DIALOG_BUTTON_STYLE}>
                                Request
                            </Button>
                            <Button variant='outlined'
                                onClick={() => { setSettingDialogView(false) }}
                                sx={DIALOG_BUTTON_STYLE}>
                                Cancel
                            </Button>
                        </Box>
                    }
                    {
                        loadingStatus &&
                        <Loading />
                    }
                </Box>
            </Dialog>
            <ToastContainer autoClose={3000} draggableDirection='x' />
        </>
    );
}

export default PreLoanCard;
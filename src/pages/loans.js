import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHashConnect } from '../api/HashConnectAPIProvider.tsx';
import { MAIN_DESCRIPTION_TEXT_STYLE, MAIN_DESCRIPTION_TITLE_STYLE, MAIN_STATUS_WRAPPER_STYLE, MAIN_WRAPPER_STYLE } from '../default/style';
import Loading from '../components/loading';
import StatusDisplay from '../components/statusDisplay';
import { getLoanRequest } from '../api/apiRequests';
import PresentLoanCard from '../components/presentLoanCard';

function Loans() {
    const { walletData } = useHashConnect();
    const { accountIds } = walletData;

    const [loadingStatus, setLoadingStatus] = useState(false);

    const [loanNfts, setLoanNfts] = useState([]);

    useEffect(() => {
        if (accountIds?.length > 0) {
            console.log('Loans useEffect log - 1');
            getLoans();
        }
    }, [accountIds]);

    const getLoans = async () => {
        console.log('getLoans log - 1 ');

        if (!accountIds) return;

        setLoadingStatus(true);

        const tempLoanNfts = await getLoanRequest(accountIds[0]);
        console.log('getLoans log - 2 : ', tempLoanNfts);

        setLoanNfts(tempLoanNfts.data);
        setLoadingStatus(false);
    }

    const offerFinished = async (tokenId_o, serialNum_o, text_o) => {
        console.log('offerFinished log - 1 : ', tokenId_o, serialNum_o);
        const remainNfts = loanNfts.filter(item => item.tokenId !== tokenId_o || item.serialNum !== serialNum_o);
        console.log('offerFinished log - 2 : ', remainNfts);
        setLoanNfts(remainNfts);
        toast.success(text_o);
    }

    return (
        <>
            <Box sx={MAIN_WRAPPER_STYLE}>
                <Box>
                    <Typography sx={MAIN_DESCRIPTION_TITLE_STYLE}>
                        My loans
                    </Typography>
                    <Typography sx={MAIN_DESCRIPTION_TEXT_STYLE}>
                        Here are the NFTs you borrowed against. You must pay these in full by the expiration date in order to keep your NFT.
                    </Typography>
                </Box>
                <Box sx={MAIN_STATUS_WRAPPER_STYLE}>
                    {
                        !accountIds &&
                        <StatusDisplay statusText={'Connect Wallet'} />
                    }
                    {
                        loadingStatus &&
                        <Loading />
                    }
                    {
                        accountIds?.length > 0 &&
                        !loadingStatus &&
                        loanNfts.length === 0 &&
                        <StatusDisplay statusText={'No active loans.'} />
                    }
                    {
                        accountIds?.length > 0 &&
                        !loadingStatus &&
                        loanNfts.length > 0 &&
                        <Grid container gap={2}>
                            {
                                loanNfts.map((item) => (
                                    <Grid item>
                                        <PresentLoanCard
                                            accountId={accountIds[0]}
                                            cardInfo={item}
                                            offerFinished={offerFinished}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    }
                </Box>
            </Box>
            <ToastContainer autoClose={3000} draggableDirection='x' />
        </>
    );
}

export default Loans;
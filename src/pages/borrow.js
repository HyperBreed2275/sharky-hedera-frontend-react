import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MAIN_DESCRIPTION_TEXT_STYLE, MAIN_DESCRIPTION_TITLE_STYLE, MAIN_STATUS_WRAPPER_STYLE, MAIN_WRAPPER_STYLE } from '../default/style';
import { useHashConnect } from '../api/HashConnectAPIProvider.tsx';
import { getSpecificNftDataFromWallet } from '../api/mirrorApiRequest';
import { LOAN_NFT_IDS } from '../default/value';
import Loading from '../components/loading';
import StatusDisplay from '../components/statusDisplay';
import PreLoanCard from '../components/preLoanCard';

function Borrow() {
    const { walletData } = useHashConnect();
    const { accountIds } = walletData;

    const [loadingStatus, setLoadingStatus] = useState(false);

    const [walletNfts, setWalletNfts] = useState([]);

    useEffect(() => {
        if (accountIds?.length > 0) {
            console.log('Borrow useEffect log - 1');
            getWalletNfts();
        }
    }, [accountIds]);

    const getWalletNfts = async () => {
        console.log('getWalletNfts log - 1');
        if (!accountIds) return;

        setLoadingStatus(true);

        const tempWalletNfts = await getSpecificNftDataFromWallet(accountIds[0], LOAN_NFT_IDS);
        console.log('getWalletNfts log - 2 : ', tempWalletNfts);

        setWalletNfts(tempWalletNfts.data);
        setLoadingStatus(false);
    }

    const offerFinished = async (tokenId_o, serialNum_o) => {
        console.log('offerFinished log - 1 : ', tokenId_o, serialNum_o);
        const remainNfts = walletNfts.filter(item => item.tokenId !== tokenId_o || item.serialNum !== serialNum_o);
        console.log('offerFinished log - 2 : ', remainNfts);
        setWalletNfts(remainNfts);
        toast.success('Borrow hbar successfully done. Please check your wallet!');
    }

    return (
        <>
            <Box sx={MAIN_WRAPPER_STYLE}>
                <Box>
                    <Typography sx={MAIN_DESCRIPTION_TITLE_STYLE}>
                        Borrow against my NFTs
                    </Typography>
                    <Typography sx={MAIN_DESCRIPTION_TEXT_STYLE}>
                        Instantly take a loan against your NFTs. Escrow-free loans allows you to keep the collateral NFT in your wallet. When you accept a loan offer, a secure contract is created, freezing the NFT in-wallet. Not repaying by the due date means the lender can repossess your NFT. Successfully pay the loan in full by the expiration date to automatically thaw the NFT.
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
                        walletNfts.length === 0 &&
                        <StatusDisplay statusText={'No NFTs'} />
                    }
                    {
                        accountIds?.length > 0 &&
                        !loadingStatus &&
                        walletNfts.length > 0 &&
                        <Grid container gap={2}>
                            {
                                walletNfts.map((item) => (
                                    <Grid item>
                                        <PreLoanCard
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

export default Borrow;
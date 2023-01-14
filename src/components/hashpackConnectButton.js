import React, { useState } from 'react';
import { Button, Modal } from '@mui/material';

import { BLACK_DEFAULT_COLOR, RED_DEFAULT_COLOR } from '../default/color';
import HashPackConnectModal from './HashPackConnectModal';
import { useHashConnect } from '../api/HashConnectAPIProvider.tsx';

// import { associateCheck } from '../api/web3Functions';
// const tempTokenId = '0.0.1182820';

const HashPackConnectButton = () => {
    const [walletConnectModalViewFlag, setWalletConnectModalViewFlag] = useState(false);

    const { walletData, installedExtensions, connect, disconnect, associateToken } = useHashConnect();
    const { accountIds } = walletData;

    const onClickWalletConnectModalClose = () => {
        setWalletConnectModalViewFlag(false);
    }

    const onClickOpenConnectModal = () => {
        setWalletConnectModalViewFlag(true);
        console.log('onClickOpenConnectModal log - 1 : ', walletData);
    }

    const onClickDisconnectHashPack = () => {
        disconnect();
        setWalletConnectModalViewFlag(false);
    }

    const onClickCopyPairingStr = () => {
        navigator.clipboard.writeText(walletData.pairingString);
    };

    const onClickConnectHashPack = () => {
        console.log('onClickConnectHashPack log - 1');
        if (installedExtensions) {
            connect();
            setWalletConnectModalViewFlag(false);
        } else {
            alert(
                'Please install hashconnect wallet extension first. from chrome web store.'
            );
        }
    };

    // token auto associate
    // useEffect(() => {
    //     console.log('HashPackConnectButton useEffect log - 1 : ', accountIds);
    //     if (accountIds?.length > 0) {
    //         autoAssociate(tempTokenId);
    //     }
    // }, [accountIds])

    // const autoAssociate = async (tokenId) => {
    //     const associateState = await associateCheck(accountIds[0], tokenId);
    //     if (!associateState.result) {
    //         console.log('Something wrong with Mirror Network.');
    //         return;
    //     }
    //     if (associateState.associated) {
    //         console.log('Already associated.');
    //         return;
    //     }
    //     const associateResult = await associateToken(tokenId);
    //     if (associateResult) {
    //         console.log('Associate successful.');
    //         return;
    //     }
    //     console.log('Associate failed.');
    // }

    return (
        <>
            <Button onClick={() => onClickOpenConnectModal()}
                variant='outlined'
                sx={{
                    borderRadius: '32px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: '3px solid',
                    borderColor: BLACK_DEFAULT_COLOR,
                    color: RED_DEFAULT_COLOR,
                    '&:hover': {
                        backgroundColor: BLACK_DEFAULT_COLOR,
                        border: '3px solid',
                        borderColor: BLACK_DEFAULT_COLOR,
                    },
                }}>
                {accountIds?.length > 0 ? accountIds[0] : 'Connect Wallet'}
            </Button>
            <Modal
                open={walletConnectModalViewFlag}
                onClose={() => onClickWalletConnectModalClose()}
                centered={true}
            >
                <HashPackConnectModal
                    pairingString={walletData.pairingString}
                    connectedAccount={accountIds}
                    onClickConnectHashPack={onClickConnectHashPack}
                    onClickCopyPairingStr={onClickCopyPairingStr}
                    onClickDisconnectHashPack={onClickDisconnectHashPack}
                />
            </Modal>
        </>
    );
}

export default HashPackConnectButton;
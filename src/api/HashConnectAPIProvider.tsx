import { HashConnect, HashConnectTypes, MessageTypes } from 'hashconnect';
import React, { useEffect, useState } from 'react';
import {
    AccountId,
    TokenId,
    NftId,
    Hbar,
    TransferTransaction,
    AccountAllowanceApproveTransaction,
    Timestamp,
    ScheduleCreateTransaction,
    TransactionId
} from '@hashgraph/sdk';

import { NETWORK_TYPE } from '../default/value';

//Type declarations
interface SaveData {
    topic: string;
    pairingString: string;
    privateKey: string;
    pairedWalletData: HashConnectTypes.WalletMetadata | null;
    pairedAccounts: string[];
    netWork?: string;
    id?: string;
    accountIds?: string[];
}

type Networks = 'testnet' | 'mainnet' | 'previewnet';


interface PropsType {
    children: React.ReactNode;
    hashConnect: HashConnect;
    netWork: Networks;
    metaData?: HashConnectTypes.AppMetadata;
    debug?: boolean;
}

export interface HashConnectProviderAPI {
    connect: () => void;
    disconnect: () => void;
    tokenTransfer: () => void;
    walletData: SaveData;
    netWork: Networks;
    metaData?: HashConnectTypes.AppMetadata;
    installedExtensions: HashConnectTypes.WalletMetadata | null;
}

// const availableExtensions: HashConnectTypes.WalletMetadata[] = [];

const INITIAL_SAVE_DATA: SaveData = {
    topic: '',
    pairingString: '',
    privateKey: '',
    pairedAccounts: [],
    pairedWalletData: null,
};

let APP_CONFIG: HashConnectTypes.AppMetadata = {
    name: 'Deragods GiftCard',
    description: 'Deragods GiftCard',
    icon: 'http://localhost:3000/favicon.ico',
};

const loadLocalData = (): null | SaveData => {
    let foundData = localStorage.getItem('hashConnectData');
    if (foundData) {
        const saveData: SaveData = JSON.parse(foundData);
        // setSaveData(saveData);
        return saveData;
    } else return null;
};

export const HashConnectAPIContext =
    React.createContext < HashConnectProviderAPI > ({
        connect: () => null,
        disconnect: () => null,
        tokenTransfer: () => null,
        walletData: INITIAL_SAVE_DATA,
        netWork: NETWORK_TYPE,
        installedExtensions: null,
    });

export default function HashConnectProvider({
    children,
    hashConnect,
    metaData,
    netWork,
    debug,
}: PropsType) {
    //Saving Wallet Details in Ustate
    const [saveData, SetSaveData] = useState < SaveData > (INITIAL_SAVE_DATA);
    const [installedExtensions, setInstalledExtensions] =
        useState < HashConnectTypes.WalletMetadata | null > (null);

    //? Initialize the package in mount
    const initializeHashConnect = async () => {
        // console.log('initializeHashConnect');

        const saveData = INITIAL_SAVE_DATA;
        const localData = loadLocalData();
        // console.log('Glinton HashConnect Test >>>>> localData :', localData);
        try {
            if (!localData) {
                if (debug) console.log('===Local data not found.=====');

                //first init and store the private for later
                // console.log('Glinton HashConnect Test >>>>> APP_CONFIG :', APP_CONFIG);
                let initData = await hashConnect.init(APP_CONFIG);
                saveData.privateKey = initData.privKey;
                // console.log('initData privkey', saveData.privateKey);

                //then connect, storing the new topic for later
                const state = await hashConnect.connect();
                saveData.topic = state.topic;

                //generate a pairing string, which you can display and generate a QR code from
                saveData.pairingString = hashConnect.generatePairingString(state, netWork, false);

                //find any supported local wallets
                hashConnect.findLocalWallets();
            } else {
                console.log('====Local data found====', localData);

                console.log('====localData to save1====');

                await SetSaveData((prevData) => ({ ...prevData, ...localData }));

                await hashConnect.init(APP_CONFIG, localData.privateKey);
                await hashConnect.connect(localData.topic, localData.pairedWalletData!);
            }
        } catch (error) {
            // console.log(error);
        } finally {
            if (localData) {
                SetSaveData((prevData) => ({ ...prevData, ...localData }));
            } else {
                console.log('************************ saveData 1 : ', saveData);
                SetSaveData((prevData) => ({ ...prevData, ...saveData }));
            }
            if (debug) console.log('====Wallet details updated to state====');
        }
    };

    const saveDataInLocalStorage = async (data: MessageTypes.ApprovePairing) => {
        if (debug) console.info('===============Saving to localstorage::=============');
        console.log('************************ saveData 3 : ', saveData);
        console.log('************************ data : ', data);
        const { metadata, ...restData } = data;
        SetSaveData((prevSaveData) => {
            prevSaveData.pairedWalletData = metadata;
            return { ...prevSaveData, ...restData };
        });
        data['privateKey'] = saveData.privateKey;
        data['pairingString'] = saveData.pairingString;
        data['pairedWalletData'] = metadata;
        console.log('************************ hashConnectData : ', data);
        let dataToSave = JSON.stringify(data);
        localStorage.setItem('hashConnectData', dataToSave);
    };

    // const additionalAccountResponseEventHandler = (
    //   data: MessageTypes.AdditionalAccountResponse
    // ) => {
    //   // if (debug) console.debug('=====additionalAccountResponseEvent======', data);
    //   // Do a thing
    // };

    const foundExtensionEventHandler = (
        data: HashConnectTypes.WalletMetadata
    ) => {
        if (debug) console.debug('====foundExtensionEvent====', data);
        // Do a thing
        setInstalledExtensions(data);
    };

    const pairingEventHandler = (data: MessageTypes.ApprovePairing) => {
        if (debug) console.log('====pairingEvent:::Wallet connected=====', data);
        console.log('************************ saveData 2 : ', saveData);
        // Save Data to localStorage
        saveDataInLocalStorage(data);
    };

    useEffect(() => {
        initializeAll();
    }, []);

    const initializeAll = () => {
        //Intialize the setup
        initializeHashConnect();

        // Attach event handlers
        // hashConnect.additionalAccountResponseEvent.on(
        //   additionalAccountResponseEventHandler
        // );
        hashConnect.foundExtensionEvent.on(foundExtensionEventHandler);
        hashConnect.pairingEvent.on(pairingEventHandler);

        return () => {
            // Detach existing handlers
            // hashConnect.additionalAccountResponseEvent.off(
            //   additionalAccountResponseEventHandler
            // );
            hashConnect.foundExtensionEvent.off(foundExtensionEventHandler);
            hashConnect.pairingEvent.off(pairingEventHandler);
        };
    };

    const connect = () => {
        if (installedExtensions) {
            if (debug) console.log('Pairing String::', saveData.pairingString);
            // console.log('Glinton HashConnect Test >>>>> saveData.pairingString :', saveData.pairingString);
            hashConnect.connectToLocalWallet(saveData.pairingString);
        } else {
            // if (debug) console.log('====No Extension is not in browser====');
            return 'wallet not installed';
        }
    };

    const disconnect = async () => {
        // console.log('Glinton log >>>>> disconnect function called!');
        await SetSaveData(INITIAL_SAVE_DATA);
        // await SetInfo([]);
        let foundData = localStorage.getItem('hashConnectData');
        if (foundData)
            localStorage.removeItem('hashConnectData');
        initializeAll();
    };


    const allowanceSendNft = async (receiverId_, tokenId_, serialNum_) => {
        // console.log('************************ sendHbarAndNftToTreasury 0 : ');

        const _accountId = saveData.accountIds[0];
        const _provider = hashConnect.getProvider(netWork, saveData.topic, _accountId);
        const _signer = hashConnect.getSigner(_provider);
        const _treasuryId = AccountId.fromString(receiverId_);
        const _nft = new NftId(TokenId.fromString(tokenId_), serialNum_);


        const allowanceTx = new AccountAllowanceApproveTransaction()
            .approveTokenNftAllowance(_nft, _accountId, _treasuryId);
        if (!allowanceTx) return false;
        const allowanceFreeze = await allowanceTx.freezeWithSigner(_signer);
        if (!allowanceFreeze) return false;
        const allowanceSign = await allowanceFreeze.signWithSigner(_signer);
        if (!allowanceSign) return false;
        const allowanceSubmit = await allowanceSign.executeWithSigner(_signer);
        if (!allowanceSubmit) return false;
        const allowanceRx = await _provider.getTransactionReceipt(allowanceSubmit.transactionId);

        if (allowanceRx.status._code === 22)
            return true;

        return false;
    }

    const allowanceSendHbar = async (receiverId_, amount_) => {
        console.log('allowanceSendHbar log - 1 : ', receiverId_, amount_);

        const _accountId = saveData.accountIds[0];
        const _provider = hashConnect.getProvider(netWork, saveData.topic, _accountId);
        const _signer = hashConnect.getSigner(_provider);
        const _treasuryId = AccountId.fromString(receiverId_);

        const allowanceTx = new AccountAllowanceApproveTransaction().approveHbarAllowance(_accountId, _treasuryId, amount_);
        if (!allowanceTx) return false;
        const allowanceFreeze = await allowanceTx.freezeWithSigner(_signer);
        if (!allowanceFreeze) return false;
        const allowanceSign = await allowanceFreeze.signWithSigner(_signer);
        if (!allowanceSign) return false;
        const allowanceSubmit = await allowanceSign.executeWithSigner(_signer);
        if (!allowanceSubmit) return false;
        const allowanceRx = await _provider.getTransactionReceipt(allowanceSubmit.transactionId);

        console.log('allowanceSendHbar log - 2 : ', allowanceRx);

        if (allowanceRx.status._code === 22)
            return true;

        return false;
    }

    return (
        <HashConnectAPIContext.Provider
            value={{
                walletData: saveData,
                installedExtensions,
                connect,
                disconnect,
                allowanceSendNft,
                allowanceSendHbar,
            }}>
            {children}
        </HashConnectAPIContext.Provider>
    );
}

const defaultProps: Partial<PropsType> = {
    metaData: {
        name: 'Deragods GiftCard',
        description: 'Deragods GiftCard',
        icon: 'http://localhost:3000/favicon.ico',
    },
    netWork: NETWORK_TYPE,
    debug: false,
};

HashConnectProvider.defaultProps = defaultProps;

export function useHashConnect() {
    const value = React.useContext(HashConnectAPIContext);
    return value;
}
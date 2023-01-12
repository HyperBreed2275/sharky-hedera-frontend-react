import React from 'react';
import { Box } from '@mui/material';

import { MAIN_DESCRIPTION_TEXT_STYLE, MAIN_DESCRIPTION_TITLE_STYLE, MAIN_WRAPPER_STYLE } from '../default/style';
import { CTC_TYPE_A_POOL, CTC_TYPE_BUTTON, CTC_TYPE_B_OFFER, CTC_TYPE_COLLECTION, CTC_TYPE_DURATION, CTC_TYPE_INTEREST } from '../default/value';
import CollectionTable from '../components/collectionTable';

function Borrow() {
    return (
        <>
            <Box sx={MAIN_WRAPPER_STYLE}>
                <Box>
                    <p style={MAIN_DESCRIPTION_TITLE_STYLE}>
                        Borrow against my NFTs
                    </p>
                    <p style={MAIN_DESCRIPTION_TEXT_STYLE}>
                        Instantly take a loan against your NFTs. Escrow-free loans allows you to keep the collateral NFT in your wallet. When you accept a loan offer, a secure contract is created, freezing the NFT in-wallet. Not repaying by the due date means the lender can repossess your NFT. Successfully pay the loan in full by the expiration date to automatically thaw the NFT.
                    </p>
                </Box>
                <Box sx={{ marginTop: '64px' }}>
                    <CollectionTable collectionInfo={testCollectionInfo} />
                </Box>
            </Box>
        </>
    );
}

export default Borrow;

const testCollectionInfo = {
    fields: [
        {
            name: 'Collection',
            description: '',
        },
        {
            name: 'Available Pool',
            description: '',
        },
        {
            name: 'Best Offer',
            description: '',
        },
        {
            name: 'Interest',
            description: '',
        },
        {
            name: 'Duration',
            description: '',
        },
        {
            name: '',
            description: '',
        },
    ],
    rows: [
        [
            {
                type: CTC_TYPE_COLLECTION,
                image: 'https://sharky.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsharx.05c4d190.png&w=1920&q=75',
                text: 'sharx',
            },
            {
                type: CTC_TYPE_A_POOL,
                value: '144.07',
                totalOffer: '2254',
                takenOffer: '2236',
            },
            {
                type: CTC_TYPE_B_OFFER,
                value: '14.20',
                lastPrice: '14.20',
            },
            {
                type: CTC_TYPE_INTEREST,
                value: '160',
                subValue: '5.09',
            },
            {
                type: CTC_TYPE_DURATION,
                value: '16',
            },
            {
                type: CTC_TYPE_BUTTON,
                text: 'Borrow',
                disable: 'false',
            }
        ],
        [
            {
                type: CTC_TYPE_COLLECTION,
                image: 'https://sharky.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBR1%3A%20Ape%20Operatives.8fffb74e.jpg&w=640&q=75',
                text: 'BR1: Ape Operatives',
            },
            {
                type: CTC_TYPE_A_POOL,
                value: '52',
                totalOffer: '2254',
                takenOffer: '2236',
            },
            {
                type: CTC_TYPE_B_OFFER,
                value: '8',
                lastPrice: '14.20',
            },
            {
                type: CTC_TYPE_INTEREST,
                value: '0.75',
                subValue: '5.09',
            },
            {
                type: CTC_TYPE_DURATION,
                value: '16',
            },
            {
                type: CTC_TYPE_BUTTON,
                text: 'Borrow',
                disable: 'false',
            }
        ],
        [
            {
                type: CTC_TYPE_COLLECTION,
                image: 'https://sharky.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBR1%3A%20Droid%20Operatives.99755597.jpg&w=640&q=75',
                text: 'BR1: Droid Operatives',
            },
            {
                type: CTC_TYPE_A_POOL,
                value: '227.55',
                totalOffer: '2254',
                takenOffer: '2236',
            },
            {
                type: CTC_TYPE_B_OFFER,
                value: '1.90',
                lastPrice: '14.20',
            },
            {
                type: CTC_TYPE_INTEREST,
                value: '0.09',
                subValue: '5.09',
            },
            {
                type: CTC_TYPE_DURATION,
                value: '14',
            },
            {
                type: CTC_TYPE_BUTTON,
                text: 'Borrow',
                disable: 'false',
            }
        ],
        [
            {
                type: CTC_TYPE_COLLECTION,
                image: 'https://sharky.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDegods.073e300e.png&w=3840&q=75',
                text: 'DeGods',
            },
            {
                type: CTC_TYPE_A_POOL,
                value: '4129',
                totalOffer: '2254',
                takenOffer: '2236',
            },
            {
                type: CTC_TYPE_B_OFFER,
                value: '415',
                lastPrice: '14.20',
            },
            {
                type: CTC_TYPE_INTEREST,
                value: '16.87',
                subValue: '5.09',
            },
            {
                type: CTC_TYPE_DURATION,
                value: '14',
            },
            {
                type: CTC_TYPE_BUTTON,
                text: 'Borrow',
                disable: 'false',
            }
        ],
        [
            {
                type: CTC_TYPE_COLLECTION,
                image: 'https://sharky.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FSolana%20Monkey%20Business.4168921b.png&w=256&q=75',
                text: 'Monkey Business',
            },
            {
                type: CTC_TYPE_A_POOL,
                value: '3836',
                totalOffer: '2254',
                takenOffer: '2236',
            },
            {
                type: CTC_TYPE_B_OFFER,
                value: '249',
                lastPrice: '14.20',
            },
            {
                type: CTC_TYPE_INTEREST,
                value: '11.07',
                subValue: '5.09',
            },
            {
                type: CTC_TYPE_DURATION,
                value: '14',
            },
            {
                type: CTC_TYPE_BUTTON,
                text: 'Borrow',
                disable: 'false',
            }
        ],
    ]
}
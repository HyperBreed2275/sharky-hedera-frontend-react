import React from 'react';
import { Box } from '@mui/material';

import { MAIN_DESCRIPTION_TEXT_STYLE, MAIN_DESCRIPTION_TITLE_STYLE, MAIN_WRAPPER_STYLE } from '../default/style';
import { CTC_TYPE_APY, CTC_TYPE_A_POOL, CTC_TYPE_BUTTON, CTC_TYPE_B_OFFER, CTC_TYPE_COLLECTION, CTC_TYPE_DURATION } from '../default/value';
import CollectionTable from '../components/collectionTable';


function Lend() {
    return (
        <>
            <Box sx={MAIN_WRAPPER_STYLE}>
                <Box>
                    <p style={MAIN_DESCRIPTION_TITLE_STYLE}>
                        Make loan offers on NFT collections.
                    </p>
                    <p style={MAIN_DESCRIPTION_TEXT_STYLE}>
                        Browse collections below, and name your price. The current best offer will be shown to borrowers. To take your offer, they lock in an NFT from that collection to use as collateral. You will be repaid at the end of the loan, plus interest. If they fail to repay, you get to keep the NFT.
                    </p>
                </Box>
                <Box sx={{ marginTop: '64px' }}>
                    <CollectionTable collectionInfo={testCollectionInfo} />
                </Box>
            </Box>
        </>
    );
}

export default Lend;

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
            name: 'APY',
            description: `APY may be changed to meet market demands, but will never go below 40%. APY shown is what you get after Sharky's Feed.`,
        },
        {
            name: 'Duration',
            description: 'Note that for lenders, duration will appear 4 hours longer than shown here.',
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
                type: CTC_TYPE_APY,
                value: '160',
            },
            {
                type: CTC_TYPE_DURATION,
                value: '16',
            },
            {
                type: CTC_TYPE_BUTTON,
                text: 'Lend',
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
                type: CTC_TYPE_APY,
                value: '160',
            },
            {
                type: CTC_TYPE_DURATION,
                value: '14',
            },
            {
                type: CTC_TYPE_BUTTON,
                text: 'Lend',
                disable: 'false',
            }
        ],
        [
            {
                type: CTC_TYPE_COLLECTION,
                image: 'https://sharky.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBR1%3A%20Droid%20Operatives.99755597.jpg&w=1920&q=75',
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
                value: '1.09',
                lastPrice: '14.20',
            },
            {
                type: CTC_TYPE_APY,
                value: '180',
            },
            {
                type: CTC_TYPE_DURATION,
                value: '14',
            },
            {
                type: CTC_TYPE_BUTTON,
                text: 'Lend',
                disable: 'false',
            }
        ],
        [
            {
                type: CTC_TYPE_COLLECTION,
                image: 'https://sharky.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBet3.5a175827.jpeg&w=1920&q=75',
                text: 'Bet3',
            },
            {
                type: CTC_TYPE_A_POOL,
                value: '4219',
                totalOffer: '2254',
                takenOffer: '2236',
            },
            {
                type: CTC_TYPE_B_OFFER,
                value: '415',
                lastPrice: '14.20',
            },
            {
                type: CTC_TYPE_APY,
                value: '140',
            },
            {
                type: CTC_TYPE_DURATION,
                value: '7',
            },
            {
                type: CTC_TYPE_BUTTON,
                text: 'Lend',
                disable: 'false',
            }
        ],
        [
            {
                type: CTC_TYPE_COLLECTION,
                image: 'https://sharky.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FINFKTED.4f6e1673.jpg&w=1920&q=75',
                text: 'INFKTED',
            },
            {
                type: CTC_TYPE_A_POOL,
                value: '1701.72',
                totalOffer: '2254',
                takenOffer: '2236',
            },
            {
                type: CTC_TYPE_B_OFFER,
                value: '137.20',
                lastPrice: '14.20',
            },
            {
                type: CTC_TYPE_APY,
                value: '180',
            },
            {
                type: CTC_TYPE_DURATION,
                value: '7',
            },
            {
                type: CTC_TYPE_BUTTON,
                text: 'Lend',
                disable: 'false',
            }
        ]
    ]
}
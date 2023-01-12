import React from 'react';
import { Box } from '@mui/material';

import { MAIN_DESCRIPTION_TEXT_STYLE, MAIN_DESCRIPTION_TITLE_STYLE, MAIN_STATUS_WRAPPER_STYLE, MAIN_WRAPPER_STYLE } from '../default/style';

function Offers() {
    return (
        <>
            <Box sx={MAIN_WRAPPER_STYLE}>
                <Box>
                    <p style={MAIN_DESCRIPTION_TITLE_STYLE}>
                        My offers and contracts
                    </p>
                    <p style={MAIN_DESCRIPTION_TEXT_STYLE}>
                        Once your offer is accepted by a borrower, a secure contract is created, freezing the NFT in their wallet. When the loan ends, you will get paid the total SOL (loan with interest). In the event of a default, you can foreclose, which transfers the collateral NFT to your wallet.
                    </p>
                </Box>
                <Box sx={MAIN_STATUS_WRAPPER_STYLE}>
                    <p style={MAIN_DESCRIPTION_TEXT_STYLE}>
                        No active or completed loans.
                    </p>
                </Box>
            </Box>
        </>
    );
}

export default Offers;
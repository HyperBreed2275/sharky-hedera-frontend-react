import React from 'react';
import { Box } from '@mui/material';

import { MAIN_DESCRIPTION_TEXT_STYLE, MAIN_DESCRIPTION_TITLE_STYLE, MAIN_STATUS_WRAPPER_STYLE, MAIN_WRAPPER_STYLE } from '../default/style';

function Loans() {
    return (
        <>
            <Box sx={MAIN_WRAPPER_STYLE}>
                <Box>
                    <p style={MAIN_DESCRIPTION_TITLE_STYLE}>
                        My loans
                    </p>
                    <p style={MAIN_DESCRIPTION_TEXT_STYLE}>
                        Here are the NFTs you borrowed against. You must pay these in full by the expiration date in order to keep your NFT.
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

export default Loans;
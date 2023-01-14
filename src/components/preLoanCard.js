import React from 'react';
import { Box, Button } from '@mui/material';
import { CYAN_DEFAULT_COLOR, RED_DEFAULT_COLOR } from '../default/color';
import { DISPLAY_ROW_STYLE } from '../default/style';

const PreLoanCard = ({ cardInfo }) => {
    return (
        <>
            <Button sx={{
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
                <p style={{
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
                </p>
            </Button>
        </>
    );
}

export default PreLoanCard;
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';

import { DISPLAY_COLUMN_STYLE, MAIN_WRAPPER_STYLE } from '../default/style';
import { BLACK_DEFAULT_COLOR, GRAY_DEFAULT_COLOR, RED_DEFAULT_COLOR, WHITE_DEFAULT_COLOR } from '../default/color';

function Home() {
    let history = useHistory();

    return (
        <>
            <Box sx={MAIN_WRAPPER_STYLE}>
                <Grid container
                    sx={{
                        height: 'calc(100vh - 200px)',
                    }}>
                    <Grid item xs={6}
                        sx={{
                            ...DISPLAY_COLUMN_STYLE,
                            ...{
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '5% 0 15%',
                            }
                        }}>
                        <Box>
                            <Typography sx={{
                                color: BLACK_DEFAULT_COLOR,
                                fontSize: '72px',
                                fontWeight: '700',
                                margin: '0',
                            }}>
                                RECEIVE INSTANT LIQUIDITY FOR YOUR NFT
                            </Typography>
                        </Box>
                        <Box sx={{
                            '& button': {
                                borderRadius: '0',
                                border: '5px solid',
                                borderColor: RED_DEFAULT_COLOR,
                                fontSize: '48px',
                                fontWeight: '700',
                                padding: '0 10px',
                                '&:hover': {
                                    border: '5px solid',
                                    borderColor: RED_DEFAULT_COLOR,
                                },
                                '&:focus': {
                                    outline: 'none',
                                },
                            },
                        }}>
                            <Button variant='outlined'
                                onClick={() => { history.push('/borrow') }}
                                sx={{
                                    color: RED_DEFAULT_COLOR,
                                    marginRight: '20px',
                                }}>
                                BORROW
                            </Button>
                            <Button variant='contained'
                                onClick={() => { history.push('/loans') }}
                                sx={{
                                    color: WHITE_DEFAULT_COLOR,
                                    backgroundColor: RED_DEFAULT_COLOR,
                                    '&:hover': {
                                        backgroundColor: RED_DEFAULT_COLOR,
                                    },
                                }}>
                                LOANS
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6}
                        sx={{
                            position: 'relative',
                        }}>
                        <Box sx={{
                            position: 'absolute',
                            bottom: '100px',
                            left: '100px',
                            border: '3px solid',
                            borderColor: GRAY_DEFAULT_COLOR,
                            borderTop: 'none',
                            borderRight: 'none',
                            backgroundColor: WHITE_DEFAULT_COLOR,
                            padding: '15px 25px',
                        }}>
                            <Typography sx={{
                                fontSize: '32px',
                                color: BLACK_DEFAULT_COLOR,
                                fontWeight: '700',
                                margin: '20px 0',
                            }}>
                                Club Finance
                            </Typography>
                            <Typography sx={{
                                fontSize: '22px',
                                fontStyle: 'italic',
                                color: GRAY_DEFAULT_COLOR,
                                margin: '20px 0',
                            }}>
                                BETA VERSION, FEBRUARY 2023.
                            </Typography>
                            <Typography sx={{
                                fontSize: '24px',
                                color: BLACK_DEFAULT_COLOR,
                                margin: '20px 0',
                            }}>
                                NFT collateralized loans.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Home;
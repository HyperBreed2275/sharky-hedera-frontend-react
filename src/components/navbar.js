import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Chip, IconButton } from '@mui/material';
import { Star } from '@mui/icons-material';

import { RED_DEFAULT_COLOR, YELLOW_DEFAULT_COLOR } from '../default/color';
import { DISPLAY_COLUMN_STYLE, DISPLAY_ROW_STYLE, NAVBAR_LINK_BUTTON_STYLE, NAVBAR_TEXT_STYLE, SOCIAL_LINK_BUTTON_STYLE } from '../default/style';
import { MAX_WRAPPER_WIDTH, NAVBAR_HEIGHT } from '../default/value';
import HashPackConnectButton from './hashpackConnectButton';

function Navbar() {
    let history = useHistory();

    return (
        <>
            <Box sx={{
                ...DISPLAY_COLUMN_STYLE,
                ...{
                    position: 'absolute',
                    width: '100vw',
                    top: '32px',
                    alignItems: 'center',
                }
            }}>
                <Box sx={{
                    ...DISPLAY_ROW_STYLE,
                    ...{
                        width: 'calc(100% - 40px)',
                        margin: '0 20px',
                        maxWidth: `${MAX_WRAPPER_WIDTH}px`,
                        height: `${NAVBAR_HEIGHT}px`,
                        alignItems: 'start',
                        justifyContent: 'space-between',
                    }
                }}>
                    {/* app logo */}
                    <Box onClick={() => { history.push('/home') }}
                        sx={{
                            width: `${NAVBAR_HEIGHT}px`,
                            height: `${NAVBAR_HEIGHT}px`,
                            backgroundImage: 'url(./images/logo.png)',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            cursor: 'pointer',
                        }} />
                    <Box sx={DISPLAY_ROW_STYLE}>
                        {/* link buttons */}
                        <Box sx={{
                            ...DISPLAY_ROW_STYLE,
                            ...{
                                height: `${NAVBAR_HEIGHT}px`,
                                alignItems: 'center',
                            }
                        }}>
                            <Button variant='text'
                                onClick={() => { history.push('/lend') }}
                                sx={NAVBAR_LINK_BUTTON_STYLE}>
                                LEND
                            </Button>
                            <Button variant='text'
                                onClick={() => { history.push('/offers') }}
                                sx={NAVBAR_LINK_BUTTON_STYLE}>
                                OFFERS
                            </Button>
                            <p style={{
                                ...NAVBAR_TEXT_STYLE,
                                ...{ margin: '0 10px', }
                            }}>/</p>
                            <Button variant='text'
                                onClick={() => { history.push('/borrow') }}
                                sx={NAVBAR_LINK_BUTTON_STYLE}>
                                BORROW
                            </Button>
                            <Button variant='text'
                                onClick={() => { history.push('/loans') }}
                                sx={NAVBAR_LINK_BUTTON_STYLE}>
                                LOANS
                            </Button>
                            <Chip icon={<Star />} label='100'
                                sx={{
                                    margin: '0 15px',
                                    backgroundColor: YELLOW_DEFAULT_COLOR,
                                    color: RED_DEFAULT_COLOR,
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    '& svg': {
                                        color: `${RED_DEFAULT_COLOR} !important`,
                                    },
                                }} />
                            <HashPackConnectButton />
                        </Box>
                        {/* social links */}
                        <Box sx={{
                            ...DISPLAY_COLUMN_STYLE,
                            ...{
                                width: '42px',
                                margin: '15px 0 0 20px',
                            }
                        }}>
                            <IconButton sx={{
                                ...SOCIAL_LINK_BUTTON_STYLE,
                                ...{ backgroundImage: 'url(./images/twitter-icon.png)', }
                            }} />
                            <IconButton sx={{
                                ...SOCIAL_LINK_BUTTON_STYLE,
                                ...{ backgroundImage: 'url(./images/discord-icon.png)', }
                            }} />
                            <IconButton sx={{
                                ...SOCIAL_LINK_BUTTON_STYLE,
                                ...{ backgroundImage: 'url(./images/zuse-icon.png)', }
                            }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Navbar;
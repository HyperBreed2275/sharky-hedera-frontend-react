import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Button, IconButton } from '@mui/material';

import { DISPLAY_COLUMN_STYLE, DISPLAY_ROW_STYLE, NAVBAR_LINK_BUTTON_STYLE, SOCIAL_LINK_BUTTON_STYLE } from '../default/style';
import { MAX_WRAPPER_WIDTH, NAVBAR_HEIGHT } from '../default/value';
import HashPackConnectButton from './hashpackConnectButton';
import { BLACK_DEFAULT_COLOR, RED_DEFAULT_COLOR } from '../default/color';

const pathList = ['', 'home', 'borrow', 'loans'];

function Navbar() {
    let history = useHistory();
    const location = useLocation();
    const [navSelected, setNavSelected] = useState('');

    useEffect(() => {
        let pathName = location.pathname.replace('/', '');
        if (!pathList.includes(pathName))
            pathName = '';
        setNavSelected(pathName);
    }, [location]);

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
                                onClick={() => { history.push('/borrow') }}
                                sx={{
                                    ...NAVBAR_LINK_BUTTON_STYLE,
                                    ...{
                                        color: navSelected === 'borrow' ? RED_DEFAULT_COLOR : BLACK_DEFAULT_COLOR,
                                    }
                                }}>
                                BORROW
                            </Button>
                            <Button variant='text'
                                onClick={() => { history.push('/loans') }}
                                sx={{
                                    ...NAVBAR_LINK_BUTTON_STYLE,
                                    ...{
                                        marginRight: '20px',
                                        color: navSelected === 'loans' ? RED_DEFAULT_COLOR : BLACK_DEFAULT_COLOR,
                                    }
                                }}>
                                LOANS
                            </Button>
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
                            <IconButton
                                onClick={() => { window.open('https://twitter.com/SailorHBAR', '_blank') }}
                                sx={{
                                    ...SOCIAL_LINK_BUTTON_STYLE,
                                    ...{ backgroundImage: 'url(./images/twitter-icon.png)', }
                                }} />
                            <IconButton
                                onClick={() => { window.open('https://discord.gg/4fYW2cBta5', '_blank') }}
                                sx={{
                                    ...SOCIAL_LINK_BUTTON_STYLE,
                                    ...{ backgroundImage: 'url(./images/discord-icon.png)', }
                                }} />
                            <IconButton
                                onClick={() => { window.open('https://zuse.market/collection/0.0.1593425', '_blank') }}
                                sx={{
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
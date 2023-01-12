import React from 'react';
import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { BLACK_DEFAULT_COLOR, GREEN_DEFAULT_COLOR, RED_DEFAULT_COLOR } from '../default/color';
import { DISPLAY_ROW_STYLE, TABLE_BODY_B_MINI_TEXT_STYLE, TABLE_BODY_BIG_TEXT_STYLE, TABLE_BODY_N_MINI_TEXT_STYLE, TABLE_HEADER_TEXT_STYLE, TABLE_BODY_MEDIUM_TEXT_STYLE } from '../default/style';
import { CTC_TYPE_APY, CTC_TYPE_A_POOL, CTC_TYPE_BUTTON, CTC_TYPE_B_OFFER, CTC_TYPE_COLLECTION, CTC_TYPE_DURATION, CTC_TYPE_INTEREST } from '../default/value';

const CollectionTable = ({ collectionInfo }) => {
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                collectionInfo.fields.map((item) => (
                                    <TableCell sx={TABLE_HEADER_TEXT_STYLE}>
                                        {item.name}
                                        {
                                            item.description !== '' &&
                                            <Tooltip title={item.description} arrow
                                                placement='top'>
                                                <HelpOutline />
                                            </Tooltip>
                                        }
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            collectionInfo.rows.map((item) => (
                                <TableRow>
                                    {
                                        item.map((subItem) => (
                                            <TableCell>
                                                {
                                                    subItem.type === CTC_TYPE_COLLECTION &&
                                                    <Box sx={{
                                                        ...DISPLAY_ROW_STYLE,
                                                        ...{ alignItems: 'center' }
                                                    }}>
                                                        <Avatar alt={subItem.text} src={subItem.image}
                                                            sx={{
                                                                width: '64px',
                                                                height: '64px',
                                                            }} />
                                                        <p style={{
                                                            ...TABLE_BODY_MEDIUM_TEXT_STYLE,
                                                            ...{ margin: '0 0 0 10px' }
                                                        }}>
                                                            {subItem.text}
                                                        </p>
                                                    </Box>
                                                }
                                                {
                                                    subItem.type === CTC_TYPE_A_POOL &&
                                                    <Box>
                                                        <p style={{
                                                            ...TABLE_BODY_BIG_TEXT_STYLE,
                                                            ...{ color: BLACK_DEFAULT_COLOR, }
                                                        }}>
                                                            ◎{subItem.value}
                                                        </p>
                                                        <p style={{
                                                            ...DISPLAY_ROW_STYLE,
                                                            ...TABLE_BODY_N_MINI_TEXT_STYLE,
                                                        }}>
                                                            <p style={{
                                                                ...TABLE_BODY_B_MINI_TEXT_STYLE,
                                                                ...{
                                                                    margin: '0 5px 0 0',
                                                                }
                                                            }}>
                                                                {subItem.takenOffer}
                                                            </p>
                                                            of
                                                            <p style={{
                                                                ...TABLE_BODY_B_MINI_TEXT_STYLE,
                                                                ...{
                                                                    margin: '0 5px',
                                                                }
                                                            }}>
                                                                {subItem.totalOffer}
                                                            </p>
                                                            offers taken
                                                        </p>
                                                    </Box>
                                                }
                                                {
                                                    subItem.type === CTC_TYPE_B_OFFER &&
                                                    <Box>
                                                        <p style={{
                                                            ...TABLE_BODY_BIG_TEXT_STYLE,
                                                            ...{ color: BLACK_DEFAULT_COLOR, }
                                                        }}>
                                                            ◎{subItem.value}
                                                        </p>
                                                        <p style={{
                                                            ...DISPLAY_ROW_STYLE,
                                                            ...TABLE_BODY_N_MINI_TEXT_STYLE,
                                                        }}>
                                                            <p style={{
                                                                ...TABLE_BODY_B_MINI_TEXT_STYLE,
                                                                ...{
                                                                    margin: '0 5px 0 0',
                                                                }
                                                            }}>
                                                                {subItem.lastPrice} SOL
                                                            </p>
                                                            Last loan taken
                                                        </p>
                                                    </Box>
                                                }
                                                {
                                                    subItem.type === CTC_TYPE_APY &&
                                                    <p style={{
                                                        ...TABLE_BODY_BIG_TEXT_STYLE,
                                                        ...{ color: GREEN_DEFAULT_COLOR, }
                                                    }}>
                                                        {subItem.value}%
                                                    </p>
                                                }
                                                {
                                                    subItem.type === CTC_TYPE_DURATION &&
                                                    <p style={{
                                                        ...TABLE_BODY_BIG_TEXT_STYLE,
                                                        ...{ color: BLACK_DEFAULT_COLOR, }
                                                    }}>
                                                        {subItem.value}d
                                                    </p>
                                                }
                                                {
                                                    subItem.type === CTC_TYPE_INTEREST &&
                                                    <Box>
                                                        <p style={{
                                                            ...TABLE_BODY_BIG_TEXT_STYLE,
                                                            ...{ color: GREEN_DEFAULT_COLOR, }
                                                        }}>
                                                            ◎{subItem.value}
                                                        </p>
                                                        <p style={{
                                                            ...DISPLAY_ROW_STYLE,
                                                            ...TABLE_BODY_N_MINI_TEXT_STYLE,
                                                            ...{ color: GREEN_DEFAULT_COLOR }
                                                        }}>
                                                            <p style={{
                                                                ...TABLE_BODY_B_MINI_TEXT_STYLE,
                                                                ...{
                                                                    margin: '0 5px 0 0',
                                                                    color: GREEN_DEFAULT_COLOR,
                                                                }
                                                            }}>
                                                                {subItem.subValue}%
                                                            </p>
                                                            interest
                                                        </p>
                                                    </Box>
                                                }
                                                {
                                                    subItem.type === CTC_TYPE_BUTTON &&
                                                    <Button variant='contained'
                                                        sx={{
                                                            width: '120px',
                                                            height: '48px',
                                                            backgroundColor: RED_DEFAULT_COLOR,
                                                            textTransform: 'none',
                                                            fontSize: '18px',
                                                            fontWeight: '700',
                                                            '&:hover': {
                                                                backgroundColor: RED_DEFAULT_COLOR,
                                                            },
                                                        }}>
                                                        {subItem.text}
                                                    </Button>
                                                }
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CollectionTable;
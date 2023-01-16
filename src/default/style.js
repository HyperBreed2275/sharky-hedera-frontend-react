import { BLACK_DEFAULT_COLOR, GRAY_DEFAULT_COLOR, WHITE_DEFAULT_COLOR } from "./color";
import { MAX_WRAPPER_WIDTH } from "./value";

// Navbar styles
export const NAVBAR_TEXT_STYLE = {
    fontSize: '18px',
    fontWeight: '700',
}

export const NAVBAR_LINK_BUTTON_STYLE = {
    ...NAVBAR_TEXT_STYLE,
    ...{
        color: BLACK_DEFAULT_COLOR,
        borderRadius: '32px',
    }
}

export const SOCIAL_LINK_BUTTON_STYLE = {
    width: '42px',
    height: '42px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    marginBottom: '10px',
}

// Main wrapper style
export const MAIN_WRAPPER_STYLE = {
    width: 'calc(100vw - 40px)',
    padding: '0 20px',
    maxWidth: `${MAX_WRAPPER_WIDTH}px`,
    margin: '150px auto 0',
}

export const MAIN_DESCRIPTION_TITLE_STYLE = {
    fontSize: '64px',
    fontWeight: '700',
    color: BLACK_DEFAULT_COLOR,
    margin: '0 0 20px 0',
};

export const MAIN_DESCRIPTION_TEXT_STYLE = {
    fontSize: '24px',
    lineHeight: '36px',
    color: BLACK_DEFAULT_COLOR,
    margin: 0,
};

export const MAIN_STATUS_WRAPPER_STYLE = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '25vh',
    padding: '20px 0',
}

// default styles
export const DISPLAY_ROW_STYLE = {
    display: 'flex',
    flexDirection: 'row',
}

export const DISPLAY_COLUMN_STYLE = {
    display: 'flex',
    flexDirection: 'column',
}

// collection table styles
export const TABLE_HEADER_TEXT_STYLE = {
    fontSize: '32px',
    fontColor: BLACK_DEFAULT_COLOR,
    '& svg': {
        color: GRAY_DEFAULT_COLOR,
        cursor: 'pointer',
    },
}

export const TABLE_BODY_BIG_TEXT_STYLE = {
    fontSize: '42px',
    fontWeight: '600',
    margin: '0',
}

export const TABLE_BODY_MEDIUM_TEXT_STYLE = {
    fontSize: '32px',
    fontWeight: '600',
    margin: '0',
    color: BLACK_DEFAULT_COLOR,
}

export const TABLE_BODY_N_MINI_TEXT_STYLE = {
    fontSize: '14px',
    fontWeight: '100',
    margin: '0',
    color: GRAY_DEFAULT_COLOR,
}

export const TABLE_BODY_B_MINI_TEXT_STYLE = {
    fontSize: '14px',
    fontWeight: '700',
    margin: '0',
    color: GRAY_DEFAULT_COLOR,
}

// loan setting dialog styles
export const INPUT_WRAPPER_STYLE = {
    ...DISPLAY_COLUMN_STYLE,
    ...{
        width: '250px',
        marginTop: '15px',
        alignItems: 'center',
        '& .MuiSlider-root': {
            width: '230px',
            height: '2px',
            margin: '0 10px',
        },
        '& p': {
            width: '230px',
            margin: '0 10px 5px',
            fontSize: '16px',
            color: BLACK_DEFAULT_COLOR,
            fontWeight: '400',
        },
    }
};

export const DIALOG_BUTTON_STYLE = {
    borderRadius: '0',
    padding: '5px 10px',
    marginLeft: '10px',
    textTransform: 'none',
}

//present loan card styles
export const CARD_STATUS_STYLE = {
    color: WHITE_DEFAULT_COLOR,
    fontSize: '16px',
}
import {createTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        blueRYB: {
            main: '#3E54E7',
        },
        azure: {
            main: '#5081E5',
        },
        babyBlue: {
            main: '#9CBBF2',
        },
        brinkPink:{
            main: '#F06177',
        },
        imperialRed:{
            main: '#EC323D'
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#E8F5FF',
        },
    },
});

export default theme;
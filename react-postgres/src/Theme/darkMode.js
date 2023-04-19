import { amber, blueGrey, deepOrange, grey,  } from '@mui/material/colors';

const themeObj = {
    primary: blueGrey,
    divider: blueGrey[50],
    background: {
        // default: blueGrey.A800,
        paper: blueGrey.A900,
    },
    text: {
        primary: blueGrey[50],
        secondary: blueGrey[50],
    },
    components: {
        AppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: "red"
            }
          }
        }
    }
};

export default themeObj;


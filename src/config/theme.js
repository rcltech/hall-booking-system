import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        light: '#727394',
        main: '#464866',
        dark: '#1d213b'
      },
      secondary: {
        main: '#ef9a9a'
      },
      background: {
        default: '#fff'
      },
      error: {
        main: '#B00020'
      },
      user: {
        main: '#ce93d8'
      },
      others: {
        main: '#9fa8da'
      }
    },
    typography: {
      h1: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 900
      },
      h2: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 800
      },
      h3: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700
      },
      h4: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 200
      },
      h5: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600
      },
      h6: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 800,
        fontSize: '1em'
      },
      button: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 300
      }
    }
  })
);

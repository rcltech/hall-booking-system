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
        fontFamily: 'Didact Gothic, sans-serif',
        fontWeight: 900
      },
      h2: {
        fontFamily: 'Didact Gothic, sans-serif',
        fontWeight: 800
      },
      h3: {
        fontFamily: 'Didact Gothic, sans-serif',
        fontWeight: 700
      },
      h4: {
        fontFamily: 'Didact Gothic, sans-serif',
        fontWeight: 200
      },
      h5: {
        fontFamily: 'Didact Gothic, sans-serif',
        fontWeight: 600
      },
      h6: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 800,
        fontSize: '1em'
      },
      subtitle1: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 600
      },
      subtitle2: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 200
      },
      button: {
        fontFamily: 'Didact Gothic, sans-serif',
        fontWeight: 300
      }
    }
  })
);

import '../styles/globals.css'
import { pink } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LocalContextProvider from '../contexts/LocalContextProvider';
import Navbar from '../components/navbar';


const theme = createTheme({
  palette: {
    primary: {
      main: pink[500],
      dark: pink[600],
      light: pink[400],
      more_dark: pink[700]
    },
    secondary: {
      main: "#ebe9ed"
    },
    modal: {
      main: 'rgba(0,0,0,0.4)'
    }
  },
});

function MyApp({ Component, pageProps }) {
  return <LocalContextProvider>
    <ThemeProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  </LocalContextProvider>
}

export default MyApp

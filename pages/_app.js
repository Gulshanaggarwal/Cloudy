import '../styles/globals.css'
import { pink } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LocalContextProvider from '../contexts/LocalContextProvider';
import Navbar from '../components/navbar';
import getCurrentUser, { AuthContext } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import Footer from '../components/footer';
import { Box } from '@mui/material';
import ToastContextProvider from '../contexts/ToastContext';
import Toast from '../components/resuables/Toast';
import Loader from '../components/resuables/loader';


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
    },
    zIndex: {
      backdrop: '1350'
    }
  },
});

function MyApp({ Component, pageProps }) {


  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(null);

  const checkIfSignedIn = async () => {
    setIsLoading(true);
    setIsUser(await getCurrentUser())
    setIsLoading(null);
  }

  useEffect(() => {

    checkIfSignedIn()

  }, [])


  return <ToastContextProvider>
    <AuthContext.Provider value={isUser}>
      <LocalContextProvider>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
            <Loader />
            <Toast />
          </Box>
        </ThemeProvider>
      </LocalContextProvider>
    </AuthContext.Provider>
  </ToastContextProvider>
}

export default MyApp

import '../styles/globals.css' 
import { ChakraProvider } from '@chakra-ui/react'; 
import {Provider} from "react-redux"; 
import {configureStore} from "@reduxjs/toolkit"; 
import rootReducer from "../redux/store";
import AuthProvider from '../components/auth/AuthProvider';

const store = configureStore({ reducer: rootReducer});
function MyApp({ Component, pageProps }) {
    return (
      <Provider store={store}>
        <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} /> 
        </ChakraProvider> 
        </AuthProvider>
      </Provider>
    )
}

export default MyApp

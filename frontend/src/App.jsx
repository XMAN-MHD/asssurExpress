import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {ChakraProvider} from '@chakra-ui/react';
import {Toaster} from 'react-hot-toast';
import theme from './theme';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
            <Toaster />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;

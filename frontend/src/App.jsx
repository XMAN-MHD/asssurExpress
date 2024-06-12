import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import NavBar from './components/NavBar';
import {ChakraProvider} from '@chakra-ui/react';
import {Toaster} from 'react-hot-toast';
import theme from './theme';
import { useSelector } from 'react-redux';

function App() {
    const {user} = useSelector(state => state.auth);
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
            <Toaster />
                <NavBar />
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

// ForgotPassword.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, FormControl, Input, Button, VStack, Flex } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { sendPasswordResetEmail } from '../../features/auth/authSlice';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    // State to track if toast notifications have been shown
    const [toastShown, setToastShown] = useState({ error: false, success: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendPasswordResetEmail(email));
    };

    useEffect(() => {
        if (isError && !toastShown.error) {
            toast.error(message);
            setToastShown((prev) => ({ ...prev, error: true }));
        }

        if (isSuccess && !toastShown.success) {
            toast.success("Email envoyé!");
            setToastShown((prev) => ({ ...prev, success: true }));
        }
    }, [isError, isSuccess, message]);

    return (
        <Flex justifyContent={'center'}>
            <Box marginTop={{base: 10, md: 20}}>
                <Heading marginBottom={5}>Réinitialiser mot de passe</Heading>
                <VStack spacing={4} align="flex-start">
                    <FormControl id="email">
                        <Input
                            type="email"
                            placeholder='Saisir votre email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
                        />
                    </FormControl>
                    <Button onClick={handleSubmit} isLoading={isLoading} size={'sm'} mx='auto'>
                        Envoyer
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
};

export default ForgotPassword;
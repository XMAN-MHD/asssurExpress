// ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Heading, Box, FormControl, Input, Button, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const { token } = useParams();
    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: ''
    });
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    // State to track if toast notifications have been shown
    const [toastShown, setToastShown] = useState({ error: false, success: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ token, ...passwordData }));
    };

    useEffect(() => {
        if (isError && !toastShown.error) {
            toast.error(message);
            setToastShown((prev) => ({ ...prev, error: true }));
        }

        if (isSuccess && !toastShown.success) {
            toast.success("Mot de passe modifié !");
            setToastShown((prev) => ({ ...prev, success: true }));
        }
    }, [isError, isSuccess, message]);

    return (
        <Flex justifyContent={'center'}>
            <Box marginTop={{base: 10, md: 20}}>
                <Heading marginBottom={5}>Nouveau mot de passe</Heading>
                <VStack spacing={4} align="flex-start">
                    <FormControl id="password">
                        <Input
                            placeholder='Entrer mot de passe'
                            type="password"
                            name="password"
                            value={passwordData.password}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl id="confirmPassword">
                        <Input
                            placeholder='Confirmer mot de passe'
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button onClick={handleSubmit} isLoading={isLoading} size={'sm'} mx='auto'>
                        Modifier
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
};

export default ResetPassword;
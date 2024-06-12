import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Flex,
  Stack,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  IconButton,
  InputGroup,
  InputRightElement,
  Heading,
  Text
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login as logUserIn, reset } from '../../features/auth/authSlice';

function SignIn() {
  // State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // React Router hook to navigate to different routes
  const navigate = useNavigate();

  // Redux hooks for dispatching actions and accessing state
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // React Hook Form setup for form handling
  const { handleSubmit, register, formState: { errors } } = useForm();

  // Function to handle form submission
  const doSubmit = async (data) => {
    dispatch(logUserIn(data));  // Dispatch login action
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Effect to handle success or error state changes
  useEffect(() => {
    if (isError) {
      toast.error(message);  // Show error message
    }

    if (isSuccess || user) {
      toast.success('Vous êtes connecté');  // Show success message
      navigate('/');  // Redirect to home page
    }

    dispatch(reset());  // Reset the auth state
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  return (
    <Flex
      height={['auto', 'auto', '100vh']}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={['8', '6']}
      py={['5', '10', 0]}
      mt={[0, 0, -100]}
      gap={8}
    >
      <Box maxW="sm">
        <Heading as="h1" textAlign="center">
          Connexion
        </Heading>
      </Box>
      <Box maxW="sm" mx="auto" borderWidth={1} borderRadius="md" boxShadow="lg" p={10}>
        <form onSubmit={handleSubmit(doSubmit)}>
          <Stack spacing={4}>
            {/* Telephone input field */}
            <FormControl isInvalid={!!errors.telephone}>
              <Input
                type="tel"
                placeholder="Téléphone"
                {...register('telephone', {
                  required: 'Champ obligatoire',
                  pattern: {
                    value: /^(77|78|70|76|75)\d{7}$/,
                    message: 'Numéro de téléphone invalide'
                  }
                })}
                _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
              />
              <FormErrorMessage>{errors.telephone && errors.telephone.message}</FormErrorMessage>
            </FormControl>
            {/* Password input field */}
            <FormControl isInvalid={!!errors.password}>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  {...register('password', { required: 'Champ obligatoire' })}
                  _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={togglePasswordVisibility}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            {/* Submit button */}
            <Button
              color="white"
              bg="primary.500"
              _hover={{ bg: 'primary.600' }}
              isLoading={isLoading}
              type="submit"
            >
              Se connecter
            </Button>
          </Stack>
        </form>
      </Box>
      <Box>
        <Flex gap={4}>
          <Text>Vous n'avez pas de compte?</Text>
          <Link to="/signup">
            <Text textDecoration="underline" color="primary.500">
              S'Inscrire
            </Text>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}

export default SignIn;

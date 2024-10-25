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
  Text,
  Image
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register as registerUser, reset } from '../../features/auth/authSlice';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { 
    user, 
    isLoading,
    isError, 
    isSuccess, 
    message 
  } = useSelector((state) => state.auth); // Access auth state from Redux store

  const { 
    handleSubmit, 
    register, 
    formState: { errors }
  } = useForm(); // Initialize React Hook Form

  const doSubmit = async (data) => {
    if (data.password !== data.password2) {
      toast.error("Les mots de passe ne correspondent pas");
      return; // Stop submission if passwords don't match
    }
    dispatch(registerUser(data)); // Dispatch register action
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  useEffect(() => {
    if (isError) {
      toast.error(message); // Show error message
    }

    if (isSuccess || user) {
      toast.success('Inscription réussie. Vous êtes maintenant connecté');
      navigate('/dashboard'); // Redirect to home page on success
    }

    dispatch(reset()); // Reset auth state
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  return (
    <Flex 
      height={['auto', 'auto', '100vh']} 
      gap={8} 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      px={['8', '6']} 
      py={[5, 10, 0]} 
      mt={[0, 0, -5]}
    >
      <Box maxW="sm">
      {/*
        <Heading as="h1" textAlign="center">
          Inscription
        </Heading>
      */}
      </Box>
      <Box maxW="sm" width="full" mx="auto" borderWidth={1} borderRadius="md" boxShadow="lg" p={5}>
        <form onSubmit={handleSubmit(doSubmit)}>
          <Stack spacing={4} p={4}>
            {/* Prénom input */}
            <FormControl isInvalid={!!errors.prenom}>
              <Input
                type="text"
                placeholder="Prénom"
                {...register('prenom', { required: 'Champ obligatoire.' })}
                _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
                aria-label="Prénom"
              />
              <FormErrorMessage>{errors.prenom && errors.prenom.message}</FormErrorMessage>
            </FormControl>
            {/* Nom input */}
            <FormControl isInvalid={!!errors.nom}>
              <Input
                type="text"
                placeholder="Nom"
                {...register('nom', { required: 'Champ obligatoire.' })}
                _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
                aria-label="Nom"
              />
              <FormErrorMessage>{errors.nom && errors.nom.message}</FormErrorMessage>
            </FormControl>
            {/* Téléphone input */}
            <FormControl isInvalid={!!errors.telephone}>
              <Input
                type="tel"
                placeholder="Téléphone"
                {...register('telephone', {
                  required: 'Champ obligatoire.',
                  pattern: {
                    value: /^(77|78|70|76|75)\d{7}$/,
                    message: 'Numéro de téléphone invalide.'
                  }
                })}
                _focus={{ borderColor: 'primary.500', boxShadow: '0 0 1px var(--chakra-colors-primary-500)' }}
                aria-label="Téléphone"
              />
              <FormErrorMessage>{errors.telephone && errors.telephone.message}</FormErrorMessage>
            </FormControl>
            {/* Password input */}
            <FormControl isInvalid={!!errors.password}>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  {...register('password', {
                    required: 'Champ obligatoire.',
                    minLength: { value: 6, message: 'Le mot de passe doit contenir au moins 6 caractères.' },
                  })}
                  _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
                  aria-label="Mot de passe"
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={togglePasswordVisibility}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            {/* Confirm Password input */}
            <FormControl isInvalid={!!errors.password2}>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Retaper mot de passe"
                  {...register('password2', {
                    required: 'Champ obligatoire.'
                  })}
                  _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
                  aria-label="Retaper mot de passe"
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={togglePasswordVisibility}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password2 && errors.password2.message}</FormErrorMessage>
            </FormControl>
            {/* Submit button */}
            <Button
              color="white"
              bg="primary.500"
              _hover={{ bg: 'primary.600' }}
              isLoading={isLoading}
              type="submit"
              aria-label="S'inscrire"
            >
              S'inscrire
            </Button>
          </Stack>
        </form>
      </Box>
      <Box>
        <Flex gap={4}>
          <Text>Avez-vous un compte ?</Text>
          <Link to="/signin">
            <Text textDecoration="underline" color="primary.500">
              Se Connecter
            </Text>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}

export default SignUp;

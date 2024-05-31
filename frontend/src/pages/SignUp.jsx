import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const doSubmit = async (data) => {
    toast.success('Inscription réussie. Vous êtes maintenant connecté');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex height="100vh" gap={8} flexDirection={'column'} alignItems="center" justifyContent="center">
      <Box maxW="lg" width="full" mx="auto" p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
        <Heading as="h1" mb={6} textAlign="center">
          Créer un compte
        </Heading>
        <form onSubmit={handleSubmit(doSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.nom}>
              <Input
                type="text"
                placeholder="Nom"
                
                {...register('nom', { required: 'Ce champ est obligatoire' })}
                _focus={{ borderColor: 'primary.main !important'}}
              />
              <FormErrorMessage>{errors.nom && errors.nom.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.prenom}>
              <Input
                type="text"
                placeholder="Prénom"
                {...register('prenom', { required: 'Ce champ est obligatoire' })}
                _focus={{ borderColor: 'primary.main !important'}}
              />
              <FormErrorMessage>{errors.prenom && errors.prenom.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.telephone}>
              <Input
                type="tel"
                placeholder="Téléphone"
                {...register('telephone', { required: 'Ce champ est obligatoire' })}
                _focus={{ borderColor: 'primary.main !important'}}
              />
              <FormErrorMessage>{errors.telephone && errors.telephone.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  {...register('password', { required: 'Ce champ est obligatoire' })}
                  _focus={{ borderColor: 'primary.main !important'}}
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
            <Button
              color="white"
              isLoading={isSubmitting}
              type="submit"
            >
              S'inscrire
            </Button>
          </Stack>
        </form>
      </Box>
      <Box>
        <Flex gap={4}>
            <Text>Avez-vous un compte ?</Text>
            <Link to={'/login'}>
                <Text textDecoration={'underline'} color='primary.main'>Se Connecter</Text>
            </Link>
        </Flex>
      </Box>
    </Flex>
  );
}

export default SignUp;

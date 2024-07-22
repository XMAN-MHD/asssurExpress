import React, { useState, useEffect } from 'react'; // Importation de React et des hooks useState et useEffect
import { useForm } from 'react-hook-form'; // Importation du hook useForm pour gérer les formulaires
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
} from '@chakra-ui/react'; // Importation des composants Chakra UI pour le style
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importation des icônes pour afficher/cacher le mot de passe
import toast from 'react-hot-toast'; // Importation de la bibliothèque de notifications react-hot-toast
import { Link, useNavigate } from 'react-router-dom'; // Importation des hooks Link et useNavigate pour la navigation
import { useSelector, useDispatch } from 'react-redux'; // Importation des hooks useSelector et useDispatch de Redux
import { login as logUserIn, reset } from '../../features/auth/authSlice'; // Importation des actions login et reset du slice auth

function SignIn() {
  // État pour gérer la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);

  // État pour suivre si les notifications toast ont été affichées
  const [toastShown, setToastShown] = useState({ error: false, success: false });

  // Hook React Router pour naviguer vers différentes routes
  const navigate = useNavigate();

  // Hooks Redux pour dispatcher des actions et accéder au state
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // Configuration de React Hook Form pour la gestion des formulaires
  const { handleSubmit, register, formState: { errors } } = useForm();

  // Fonction pour gérer la soumission du formulaire
  const doSubmit = async (data) => {
    dispatch(logUserIn(data));  // Dispatch de l'action login avec les données du formulaire
  };

  // Fonction pour alterner la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Effet pour gérer les changements d'état de succès ou d'erreur
  useEffect(() => {
    if (isError && !toastShown.error) {
      toast.error(message);  // Affichage d'une notification d'erreur si une erreur est présente
      setToastShown((prev) => ({ ...prev, error: true }));
    }

    if (isSuccess || user) {
      toast.success('Vous êtes connecté');  // Affichage d'une notification de succès si la connexion est réussie
      setToastShown((prev) => ({ ...prev, success: true }));
      navigate('/');  // Redirection vers la page d'accueil après une connexion réussie
    }

    dispatch(reset());  // Réinitialisation de l'état d'authentification
  }, [isError, isSuccess, user, message, dispatch, navigate, toastShown]); // Dépendances de useEffect pour exécuter l'effet lorsque ces valeurs changent

  return (
    <Flex
      height={['auto', 'auto', '100vh']} // Hauteur du conteneur, adaptative en fonction de la taille de l'écran
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={['8', '6']} // Espacement horizontal adaptatif
      py={['5', '10', 0]} // Espacement vertical adaptatif
      mt={[0, 0, -100]} // Marge supérieure adaptative
      gap={8} // Espacement entre les éléments enfants
    >
      <Box maxW="sm"> {/* Conteneur pour le titre */}
        <Heading as="h1" textAlign="center">
          Connexion
        </Heading>
      </Box>
      <Box maxW="sm" mx="auto" borderWidth={1} borderRadius="md" boxShadow="lg" p={10}>
        <form onSubmit={handleSubmit(doSubmit)}> {/* Formulaire avec gestion de la soumission */}
          <Stack spacing={4}>
            {/* Champ de saisie pour le téléphone */}
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
                _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }} // Styles personnalisés pour l'état focus de l'input
              />
              <FormErrorMessage>{errors.telephone && errors.telephone.message}</FormErrorMessage> {/* Message d'erreur pour le champ téléphone */}
            </FormControl>
            {/* Champ de saisie pour le mot de passe */}
            <FormControl isInvalid={!!errors.password}>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  {...register('password', { required: 'Champ obligatoire' })}
                  _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }} // Styles personnalisés pour l'état focus de l'input
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />} // Icône pour afficher ou cacher le mot de passe
                    onClick={togglePasswordVisibility}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage> {/* Message d'erreur pour le champ mot de passe */}
            </FormControl>
            {/* Bouton de soumission */}
            <Button
              color="white"
              bg="primary.500"
              _hover={{ bg: 'primary.600' }} // Couleur de fond au survol
              isLoading={isLoading} // Affiche un indicateur de chargement lors de la soumission
              type="submit"
            >
              Se connecter
            </Button>
          </Stack>
        </form>
      </Box>
      <Box>
        <Flex gap={4} justifyContent={'center'}>
          <Text color="primary.500">Vous n'avez pas de compte?</Text>
          <Link to="/signup">
            <Text textDecoration="underline" color="primary.500">
              S'Inscrire
            </Text>
          </Link>
        </Flex>
        <Flex justifyContent={'center'}>
          <Link to="/forgot-password">
            <Text textDecoration="underline" color="red.500">
              Mot de passe oublié?
            </Text>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}

export default SignIn;

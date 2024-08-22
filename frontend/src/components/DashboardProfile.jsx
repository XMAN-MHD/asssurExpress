import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex, Box, Heading, VStack, Divider, useColorModeValue, FormControl, FormLabel, Input, IconButton, Button, HStack, Text, FormErrorMessage } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { FaSave, FaTimes } from 'react-icons/fa';
import { updateProfile, updatePassword } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const DashboardProfile = () => {
  const dispatch = useDispatch();

  // Data for the user's profile
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);
  const { prenom, nom, telephone, email, address } = user;


  // State for editing mode and form values
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    prenom,
    nom,
    telephone,
    email,
    address
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordValues, setPasswordValues] = useState({
    password: '',
    confirmNewPassword: '',
  });

  // Color Mode Value
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('white');
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordValues({ ...passwordValues, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateProfile(formValues));
    setIsEditing(false);
    toast.success('Les modifications prendront effet lors de votre prochaine connexion.')
    
  };

  const handleCancel = () => {
    setFormValues({ prenom, nom, telephone, email, address });
    setIsEditing(false);
  };

  const handlePasswordSave = () => {
    if (passwordValues.password !== passwordValues.confirmNewPassword) {
      toast.error('Les mots de passe ne correspondes pas');
      return;
    }
    dispatch(updatePassword(passwordValues));
    setIsChangingPassword(false);
  };

  const handlePasswordCancel = () => {
    setPasswordValues({
      password: '',
      confirmNewPassword: '',
    });
    setIsChangingPassword(false);
  };

  return (
    <>
      <Helmet>
        <title>Profil - {prenom} {nom}</title>
        <meta name="description" content={`Profil de l'utilisateur ${prenom} ${nom}.`} />
      </Helmet>
      <Box p={6} bg={bgColor} rounded="md" shadow="md">
        <Heading as="h1" size="xl" mb={4} color={primaryColor}>Profil de {prenom} {nom}</Heading>
        <Divider mb={10} />
        <VStack align="start" spacing={4}>
          <FormControl id="prenom">
            <Flex flexDirection={{base: 'column', lg: 'row'}}>
              <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Prénom</FormLabel>
              <Input
                w={{lg:"50%"}}
                name="prenom"
                value={formValues.prenom}
                onChange={handleInputChange}
                readOnly={!isEditing}
                _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
              />
            </Flex>
          </FormControl>
          <FormControl id="nom">
            <Flex flexDirection={{base: 'column', lg: 'row'}}>
              <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Nom</FormLabel>
              <Input
                w={{lg:"50%"}}
                name="nom"
                value={formValues.nom}
                onChange={handleInputChange}
                readOnly={!isEditing}
                _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
              />
            </Flex>
          </FormControl>
          <FormControl id="telephone">
            <Flex flexDirection={{base: 'column', lg: 'row'}}>
              <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Téléphone</FormLabel>
              <Input
                w={{lg:"50%"}}
                name="telephone"
                value={formValues.telephone}
                onChange={handleInputChange}
                readOnly={!isEditing}
                _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
              />
            </Flex>
          </FormControl>
          <FormControl id="email">
            <Flex flexDirection={{base: 'column', lg: 'row'}}>
              <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Email</FormLabel>
              <Input
                w={{lg:"50%"}}
                name="email"
                value={formValues.email}
                placeholder='Saisir votre email'
                onChange={handleInputChange}
                readOnly={!isEditing}
                _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
              />
            </Flex>
          </FormControl>
          <FormControl id="address">
            <Flex flexDirection={{base: 'column', lg: 'row'}}>
              <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Adresse</FormLabel>
              <Input
                w={{lg:"50%"}}
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                readOnly={!isEditing}
                _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
              />
            </Flex>
          </FormControl>
          {isChangingPassword && (
            <>
              <FormControl id="password" isInvalid={!passwordValues.password}>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={passwordValues.password}
                  onChange={handlePasswordChange}
                  _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
                />
                {!passwordValues.password && <FormErrorMessage>Champ requis</FormErrorMessage>}
              </FormControl>
              <FormControl id="confirmNewPassword" isInvalid={passwordValues.password !== passwordValues.confirmNewPassword}>
                <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                <Input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordValues.confirmNewPassword}
                  onChange={handlePasswordChange}
                  _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
                />
                {passwordValues.password !== passwordValues.confirmNewPassword && <FormErrorMessage>Les mots de passe ne correspondent pas</FormErrorMessage>}
              </FormControl>
              <Flex direction={{base: 'column', md: 'row'}} gap={4}>
                <Button leftIcon={<FaSave />} colorScheme="green" onClick={handlePasswordSave} isLoading={isLoading}>
                  Enregistrer le mot de passe
                </Button>
                <Button leftIcon={<FaTimes />} colorScheme="red" onClick={handlePasswordCancel}>
                  Annuler
                </Button>
              </Flex>
            </>
          )}
          {isError && (
            <Text color="red.500">{message}</Text>
          )}
           {isSuccess && (
            <Text color="primary.500">{message}</Text>
          )}
          <Box w={'100%'}>
            {isEditing ? (
              <Flex gap={4} direction={{base: 'column', md: 'row'}}>
                <Button leftIcon={<FaSave />} colorScheme="green" onClick={handleSave} isLoading={isLoading}>
                  Enregistrer
                </Button>
                <Button leftIcon={<FaTimes />} colorScheme="red" onClick={handleCancel}>
                  Annuler
                </Button>
              </Flex>
            ) : ( !isChangingPassword && (
              <Flex gap={4} direction={{base: 'column', md: 'row'}}>
                <Button
                  color={textColor }
                  bgColor= {primaryColor}
                  onClick={() => setIsEditing(true)}
                >
                  Modifier profil
                </Button>
                <Button 
                  onClick={() => setIsChangingPassword(true)} 
                  bgColor= {secondaryBtnBgColor} 
                  color={textColor} 
                  _hover={{bgColor:'gray.800'}}
                >
                  Changer le mot de passe
                </Button>
              </Flex>
            ))}
          </Box >
        </VStack>
      </Box>
    </>
  );
};

export default DashboardProfile;

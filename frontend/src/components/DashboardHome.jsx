import React, { useEffect } from 'react';
import {format} from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, Text, Button, VStack, Divider, Flex, useColorModeValue } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { getPolicies} from '../features/dash/dashSlice';

const DashboardHome = () => {
  const dispatch = useDispatch();
  // Mock data for the user's policies and activities
  const { user } = useSelector((state) => state.auth);
  const {prenom, nom, _id} = user;
  const userName = `${prenom} ${nom}`;

  useEffect(() => {
    dispatch(getPolicies(user)); 
 }, [dispatch]);

  // Selecting data from Redux state
  const { data: policies, isLoading, isError, message } = useSelector(state => state.dashboard.policies);
  // Array of user's insurance policies 

  // Determine colors based on light or dark mode
  const bgColor = useColorModeValue('white', 'gray.700');
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  
  // Function to determine background color for notifications based on type
  const notificationBg = (type) => type === 'warning' ? 'yellow.100' : type === 'success' ? 'green.100' : 'red.100';

  // Function to check if a policy is expired
  const isPolicyExpired = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration < today;
  };

  // Function to check if a policy is expiring soon (within 30 days)
  const isPolicyExpiringSoon = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const timeDiff = expiration - today;
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 30 && daysDiff > 0;
  };

  // Array to hold notification messages based on policy status
  const notifications = []; 
  policies.forEach(policy => { console.log(policy.vehicle.brand) })
  // Loop through each policy and create a corresponding notification
  if (!isLoading && !isError && policies.length > 0)
  {
    policies.forEach(policy => {
      const brand = policy.vehicle.brand; 
      const model = policy.vehicle.model;
      if (isPolicyExpired(policy.expiration)) 
      {
        notifications.push({
          id: notifications.length + 1,
          message: `Votre assurance ${brand} ${model} est expirée!`,
          type: 'danger',
        });
      } 
      else if (isPolicyExpiringSoon(policy.expiration)) 
      {
        notifications.push({
          id: notifications.length + 1,
          message: `Votre assurance ${brand} ${model} expire bientôt!`,
          type: 'warning',
        });
      }
      else 
      {
        notifications.push({
          id: notifications.length + 1,
          message: `Votre assurance ${brand} ${model} est active.`,
          type: 'success',
        });
      }
    });
  }

  return (
    <>
      {/* Use react-helmet to set the document head properties */}
      <Helmet>
        <title>Tableau de Bord - Bienvenue, {userName}!</title>
        <meta name="description" content={`Bienvenue sur votre tableau de bord, ${userName}. Gérez vos polices d'assurance et restez informé de vos notifications.`} />
      </Helmet>
      <Box p={6} bg={bgColor} rounded="md" shadow="md">
        {/* Welcome heading */}
        <Heading as="h1" size="xl" mb={4} color={primaryColor}>Bienvenue, {userName}!</Heading>
        <Divider mb={10} />

        {/* Section for displaying user's insurance policies */}
        <Heading as="h2" size="lg" mb={4}>Vos Polices d'Assurance</Heading>
        {isLoading ? (
          <Text mb={4}>Chargement des polices...</Text>
        ) : isError ? (
          <Text mb={4}>Une erreur s'est produite : {message}</Text>
        ):policies.length === 0 ? (
          <Text mb={4}>Vous n'avez aucune police d'assurance pour le moment.</Text>
        ): (
          <Box maxH="300px" overflowY="auto" mb={4}>
            <VStack align="start" spacing={4}>
              {policies.map(policy => (
                <Box key={policy.id} p={4} borderWidth="1px" borderRadius="md" width="100%" bg="beige">
                  <Text fontSize="lg" fontWeight="bold">{policy.vehicle.brand} {policy.vehicle.model}</Text>
                  <Text>Date de délivrance: Le {format(new Date(policy.deliverance), 'dd/MM/yyyy à HH:mm:ss')}</Text>
                  <Text>Date d'expiration: Le {format(policy.expiration, 'dd/MM/yyyy')}</Text> 
                </Box>
              ))}
            </VStack>
          </Box>
        )}

        {/* Section for displaying notifications */}
        <Heading as="h2" size="lg" mb={4}>Notifications</Heading>
        {notifications.length === 0 ? (
          <Text mb={4}>Aucune notification pour le moment.</Text>
        ) : (
          <Box maxH="300px" overflowY="auto" mb={4}>
            <VStack align="start" spacing={4}>
              {notifications.map(notification => (
                <Box key={notification.id} p={4} borderWidth="1px" borderRadius="md" width="100%" bg={notificationBg(notification.type)}>
                  <Text>{notification.message}</Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )}

        {/* Section for quick action buttons */}
        <Heading as="h2" size="lg" mb={4}>Actions Rapides</Heading>
        <Flex flexDirection={{ base: 'column', lg: 'row' }}>
          <Button colorScheme="blue" mb={{ base: 4, lg: 0 }} mr={{ base: 0, lg: 4 }}>Renouveler une Police</Button>
          <Button colorScheme="green" mb={{ base: 4, lg: 0 }} mr={{ base: 0, lg: 4 }}>Acheter une Nouvelle Assurance</Button>
          <Button colorScheme="red">Contacter le Support</Button>
        </Flex>
      </Box>
    </>
  );
};

export default DashboardHome;

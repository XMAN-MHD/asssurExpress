import React from 'react';
import { Box, Heading, Text, Button, VStack, Divider, Flex, useColorModeValue } from '@chakra-ui/react';

const DashboardHome = () => {
  // Mock data for the user's policies and activities
  const userName = 'John Doe';
  const policies = [
    
  ]; // Empty policies array for demonstration

  const bgColor = useColorModeValue('white', 'gray.700');
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const notificationBg = (type) => type === 'warning' ? 'yellow.100' : type === 'success' ? 'green.100' : 'red.100';

  const isPolicyExpired = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration < today;
  };

  const isPolicyExpiringSoon = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const timeDiff = expiration - today;
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 30 && daysDiff > 0;
  };

  const notifications = [];

  policies.forEach(policy => {
    if (isPolicyExpired(policy.expiration)) {
      notifications.push({
        id: notifications.length + 1,
        message: `Votre assurance ${policy.brand} ${policy.model} est expirée!`,
        type: 'danger',
      });
    } else if (isPolicyExpiringSoon(policy.expiration)) {
      notifications.push({
        id: notifications.length + 1,
        message: `Votre assurance ${policy.brand} ${policy.model} expire bientôt!`,
        type: 'warning',
      });
    } else {
      notifications.push({
        id: notifications.length + 1,
        message: `Votre assurance ${policy.brand} ${policy.model} est active.`,
        type: 'success',
      });
    }
  });

  return (
    <Box p={6} bg={bgColor} rounded="md" shadow="md">
      <Heading as="h1" size="xl" mb={4} color={primaryColor}>Bienvenue, {userName}!</Heading>
      <Divider mb={10} />

      <Heading as="h2" size="lg" mb={4}>Vos Polices d'Assurance</Heading>
      {policies.length === 0 ? (
        <Text mb={4}>Vous n'avez aucune police d'assurance pour le moment.</Text>
      ) : (
        <VStack align="start" spacing={4} mb={4}>
          {policies.map(policy => (
            <Box key={policy.id} p={4} borderWidth="1px" borderRadius="md" width="100%" bg="beige">
              <Text fontSize="lg" fontWeight="bold">{policy.brand} {policy.model}</Text>
              <Text>Date de délivrance: {policy.deliverance}</Text>
              <Text>Date d'expiration: {policy.expiration}</Text>
            </Box>
          ))}
        </VStack>
      )}

      <Heading as="h2" size="lg" mb={4}>Notifications</Heading>
      {notifications.length === 0 ? (
        <Text mb={4}>Aucune notification pour le moment.</Text>
      ) : (
        <VStack align="start" spacing={4} mb={4}>
          {notifications.map(notification => (
            <Box key={notification.id} p={4} borderWidth="1px" borderRadius="md" width="100%" bg={notificationBg(notification.type)}>
              <Text>{notification.message}</Text>
            </Box>
          ))}
        </VStack>
      )}

      <Heading as="h2" size="lg" mb={4}>Actions Rapides</Heading>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <Button colorScheme="blue" mb={{ base: 4, lg: 0 }} mr={{ base: 0, lg: 4 }}>Renouveler une Police</Button>
        <Button colorScheme="green" mb={{ base: 4, lg: 0 }} mr={{ base: 0, lg: 4 }}>Acheter une Nouvelle Assurance</Button>
        <Button colorScheme="red">Contacter le Support</Button>
      </Flex>
    </Box>
  );
};

export default DashboardHome;

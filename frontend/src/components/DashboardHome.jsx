import React from 'react';
import { Box, Heading, Text, Button, VStack, Divider, HStack } from '@chakra-ui/react';

const DashboardHome = () => {
  // Mock data for the user's policies and activities
  const userName = 'John Doe';
  const policies = [
    { id: 1, type: 'Car Insurance', coverage: 'Full Coverage', expiration: '2024-12-31' },
    { id: 2, type: 'Home Insurance', coverage: 'Standard Coverage', expiration: '2025-05-15' },
  ];
  const activities = [
    { id: 1, description: 'Claim submitted for car accident', date: '2024-06-20' },
    { id: 2, description: 'Renewed home insurance policy', date: '2024-05-01' },
  ];
  const notifications = [
    { id: 1, message: 'Your car insurance is expiring soon!', type: 'warning' },
    { id: 2, message: 'Your payment for home insurance was successful.', type: 'success' },
  ];

  return (
    <Box p="6" bg="white" rounded="md" shadow="md">
      <Heading as="h1" size="xl" mb="4">Bienvenue, {userName}!</Heading>
      <Divider mb="10" />

      <Heading as="h3" size="lg" mb="4">Vos Polices d'Assurance</Heading>
      <VStack align="start" spacing="4" mb="4">
        {policies.map(policy => (
          <Box key={policy.id} p="4" borderWidth="1px" borderRadius="md" width="100%">
            <Text fontSize="lg" fontWeight="bold">{policy.type}</Text>
            <Text>Couverture: {policy.coverage}</Text>
            <Text>Date d'expiration: {policy.expiration}</Text>
          </Box>
        ))}
      </VStack>

      <Heading as="h3" size="lg" mb="4">Notifications</Heading>
      <VStack align="start" spacing="4" mb="4">
        {notifications.map(notification => (
          <Box key={notification.id} p="4" borderWidth="1px" borderRadius="md" width="100%" bg={notification.type === 'warning' ? 'yellow.100' : 'green.100'}>
            <Text>{notification.message}</Text>
          </Box>
        ))}
      </VStack>

      <Heading as="h3" size="lg" mb="4">Actions Rapides</Heading>
      <HStack spacing="4">
        <Button colorScheme="blue">Renouveler une Police</Button>
        <Button colorScheme="green">Acheter une Nouvelle Assurance</Button>
        <Button colorScheme="red">Contacter le Support</Button>
      </HStack>
    </Box>
  );
};

export default DashboardHome;

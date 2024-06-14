import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Divider,
} from '@chakra-ui/react';
import { FaHome, FaUser, FaCar, FaSync } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Text>Accueil - Bienvenue sur votre tableau de bord</Text>;
      case 'profile':
        return <Text>Profil - Gérez vos informations personnelles</Text>;
      case 'purchase':
        return <Text>Acheter Assurance - Choisissez et achetez une assurance</Text>;
      case 'renew':
        return <Text>Renouveler Assurance - Renouvelez votre assurance existante</Text>;
      default:
        return <Text>Accueil - Bienvenue sur votre tableau de bord</Text>;
    }
  };

  const {handleMenu} = useSelector(state => state.dashboard);

  return (
    <Flex height="100vh">
      { 
        handleMenu && (
          <Box
            width="250px"
            bg="gray.800"
            color="white"
            py="4"
            px="3"
            display={{ base: 'block', md: 'none' }}
            position={''}
          >
            <VStack spacing="4" align="stretch">
              <Text fontSize="2xl" fontWeight="bold" mb="4">MENU</Text>
              <Button
                leftIcon={<FaHome />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                onClick={() => setActiveSection('home')}
              >
                Accueil
              </Button>
              <Button
                leftIcon={<FaUser />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                onClick={() => setActiveSection('profile')}
              >
                Profil
              </Button>
              <Button
                leftIcon={<FaCar />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                onClick={() => setActiveSection('purchase')}
              >
                Acheter Assurance
              </Button>
              <Button
                leftIcon={<FaSync />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                onClick={() => setActiveSection('renew')}
              >
                Renouveler Assurance
              </Button>
            </VStack>
          </Box>
        )
      }
      <Box
            width="250px"
            bg="gray.800"
            color="white"
            py="4"
            px="3"
            display={{ base: 'none', md: 'block' }}
          >
            <VStack spacing="4" align="stretch">
              <Text fontSize="2xl" fontWeight="bold" mb="4">MENU</Text>
              <Button
                leftIcon={<FaHome />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                onClick={() => setActiveSection('home')}
              >
                Accueil
              </Button>
              <Button
                leftIcon={<FaUser />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                onClick={() => setActiveSection('profile')}
              >
                Profil
              </Button>
              <Button
                leftIcon={<FaCar />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                onClick={() => setActiveSection('purchase')}
              >
                Acheter Assurance
              </Button>
              <Button
                leftIcon={<FaSync />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                onClick={() => setActiveSection('renew')}
              >
                Renouveler Assurance
              </Button>
            </VStack>
          </Box>

      <Box flex="1" bg="primary.100" p="6">
        <Box bg="white" p="6" rounded="md" shadow="md">
          <Text fontSize="2xl" fontWeight="bold" mb="4">Bienvenue sur votre tableau de bord</Text>
          <Divider mb="4" />
          {renderContent()}
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;

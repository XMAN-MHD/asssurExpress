import React, { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Box, Flex, VStack, Text, Button, Divider } from '@chakra-ui/react';
import { FaHome, FaUser, FaCar, FaSync, FaHistory } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Home from '../DashboardHome';
import Profile from '../DashboardProfile';
import Purchase from '../DashboardPurchase';
import Renew from '../DashboardRenew';
import History from '../DashboardHistory';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'profile':
        return <Profile />;
      case 'purchase':
        return <Purchase />;
      case 'renew':
        return <Renew />;
      case 'history':
        return <History />;
      default:
        return <Home />;
    }
  };

  const { handleMenu } = useSelector(state => state.dashboard);

  return (
    <Flex >

      {/** Desktop sidebar menu */}
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
            bg={activeSection === 'home' ? 'white' : 'transparent'}
            color={activeSection === 'home' ? 'black' : 'primary.500'}
            onClick={() => setActiveSection('home')}
          >
            Accueil
          </Button>
          <Button
            leftIcon={<FaUser />}
            variant="ghost"
            justifyContent="flex-start"
            width="100%"
            bg={activeSection === 'profile' ? 'white' : 'transparent'}
            color={activeSection === 'profile' ? 'black' : 'primary.500'}
            onClick={() => setActiveSection('profile')}
          >
            Profil
          </Button>
          <Button
            leftIcon={<FaCar />}
            variant="ghost"
            justifyContent="flex-start"
            width="100%"
            bg={activeSection === 'purchase' ? 'white' : 'transparent'}
            color={activeSection === 'purchase' ? 'black' : 'primary.500'}
            onClick={() => setActiveSection('purchase')}
          >
            Acheter   
          </Button>
          <Button
            leftIcon={<FaSync />}
            variant="ghost"
            justifyContent="flex-start"
            width="100%"
            bg={activeSection === 'renew' ? 'white' : 'transparent'}
            color={activeSection === 'renew' ? 'black' : 'primary.500'}
            onClick={() => setActiveSection('renew')}
          >
            Renouveler 
          </Button>
          <Button
            leftIcon={<FaHistory />}
            variant="ghost"
            justifyContent="flex-start"
            width="100%"
            bg={activeSection === 'history' ? 'white' : 'transparent'}
            color={activeSection === 'history' ? 'black' : 'primary.500'}
            onClick={() => setActiveSection('history')}
          >
            Historique
          </Button>
        </VStack>
      </Box>

      {/** Mobile sidebar menu */}
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
                as={RouterNavLink}
                leftIcon={<FaHome />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                bg={activeSection === 'home' ? 'white' : 'transparent'}
                color={activeSection === 'home' ? 'black' : 'primary.500'}
                onClick={() => setActiveSection('home')}
              >
                Accueil
              </Button>
              <Button
                leftIcon={<FaUser />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                bg={activeSection === 'profile' ? 'white' : 'transparent'}
                color={activeSection === 'profile' ? 'black' : 'primary.500'}
                onClick={() => setActiveSection('profile')}
              >
                Profil
              </Button>
              <Button 
                leftIcon={<FaCar />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                bg={activeSection === 'purchase' ? 'white' : 'transparent'}
                color={activeSection === 'purchase' ? 'black' : 'primary.500'}
                onClick={() => setActiveSection('purchase')}
              >
                Acheter 
              </Button>
              <Button
                leftIcon={<FaSync />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                bg={activeSection === 'renew' ? 'white' : 'transparent'}
                color={activeSection === 'renew' ? 'black' : 'primary.500'}
                onClick={() => setActiveSection('renew')}
              >
                Renouveler 
              </Button>
              <Button
                leftIcon={<FaHistory />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                bg={activeSection === 'history' ? 'white' : 'transparent'}
                color={activeSection === 'history' ? 'black' : 'primary.500'}
                onClick={() => setActiveSection('history')}
              >
                Historique
              </Button>
            </VStack>
          </Box>
        )
      }

      {/** Main content  */}
      <Box flex="1" bg="primary.100" p="6">
        <Box bg="white" p="6" rounded="md" shadow="md">
          {/* <Text fontSize="2xl" fontWeight="bold" mb="4">Bienvenue sur votre tableau de bord</Text>
          <Divider mb="4" /> */}
          {renderContent()}
        </Box>
      </Box>
      
    </Flex>
  );
};

export default Dashboard;

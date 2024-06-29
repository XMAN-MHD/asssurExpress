import React from 'react';
import { NavLink as RouterNavLink, Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { toggleMenu } from '../features/dashboard';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Link,
  Text,
  useDisclosure,
  Image
} from '@chakra-ui/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/images/logo/protection.png';

const NavBar = () => {
  // Chakra UI hook to handle menu open/close state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Use react router hooks
  const dispatch = useDispatch();
  const location = useLocation();
  

  // Get some slices from the store
  const { user } = useSelector((state) => state.auth);
  const { handleMenu } = useSelector((state) => state.dashboard);


  // set up useNavigate to redirect user
  const navigate = useNavigate()

  // Function to handle user logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  // Handle dashboard menu
  const handleDashboardMenu = (e) => {
    dispatch(toggleMenu());
  }

  // Render Navbar view
  return (
    <Box bg="primary.500" zIndex={1} px={{ md: '59' }}>
      <Flex h={16} alignItems="center" justifyContent="space-between" px={4}>
        {/* Menu button for mobile view */}
        {
          location.pathname !== '/dashboard' && (
            <IconButton
              size="lg"
              icon={isOpen ? <FaTimes /> : <FaBars />}
              aria-label="Open Menu"
              display={{ md: 'none' }}
              _hover={{ bg: 'transparent' }}
              onClick={isOpen ? onClose : onOpen}
              bg="transparent"
              marginRight={"20px"}
            />  
          )
        }

        {/* Dashboard menu button for mobile view */}
        {
          location.pathname == '/dashboard' && (
            <IconButton
              size="lg"
              icon={handleMenu ? <FaTimes /> : <FaBars />}
              aria-label="Open Menu"
              display={{ md: 'none' }}
              _hover={{ bg: 'transparent' }}
              onClick={handleDashboardMenu}
              bg="transparent"
            />
          )
        }

        {/* Logo and brand name */}
        <HStack spacing={20} alignItems="center" ml={[-10, 0]}> 
           <Flex gap={2} as={RouterLink} to="/">
            <Image src={logo} alt="logo" boxSize={8} />
            <Text fontWeight="bold" mb={1} color="white" fontSize={20}>
              Assur'Express
            </Text>
          </Flex> 
        </HStack> 
        
        {/* Navigation links and Profile */}
        <Flex 
          alignItems="center"
          justifyContent={"flex-end"}
          flexBasis={"80%"}
        >
          {/* Navigation links for desktop view */}
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }} marginRight={"20px"}>
            <Link
              as={RouterNavLink}
              to="/"
              color="white"
              fontWeight={600}
              _hover={{ textDecoration: 'none' }}
              _activeLink={{ color: 'primary.800', bg: 'white', p: 1, borderRadius: 5 }}
            >
              Accueil
            </Link>
            <Link
              as={RouterNavLink}
              to="/partner"
              color="white"
              fontWeight={600}
              _hover={{ textDecoration: 'none' }}
              _activeLink={{ color: 'primary.800', bg: 'white', p: 1, borderRadius: 5 }}
            >
              Partenaires
            </Link>
            <Link
              as={RouterNavLink}
              to="/about"
              color="white"
              fontWeight={600}
              _hover={{ textDecoration: 'none' }}
              _activeLink={{ color: 'primary.800', bg: 'white', p: 1, borderRadius: 5 }}
            >
              Qui sommes-nous
            </Link>
          </HStack>   

          {/* User profile */}
          {user ? (
            // User menu when logged in
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
                _active={{ bg: 'transparent' }}
              >
                <HStack>
                  {/* <Text color="white" textTransform="capitalize" display={{ base: 'none', lg: 'flex' }}>
                    {user.prenom.toUpperCase()}
                  </Text> */}
                  <Avatar size={['sm', 'md']} src={user.avatar} bg="white" color="black" />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={RouterLink}
                  to="/dashboard"
                  _hover={{ bg: 'primary.100' }}
                  _focus={{ bg: 'primary.100' }}
                >
                  Mon compte
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  _hover={{ bg: 'primary.100' }}
                  _focus={{ bg: 'primary.100' }}
                >
                  Se déconnecter
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            // Login button when not logged in
            <Button
              as={RouterLink}
              to="/signin"
              bg="white"
              p={{base:'2', md:'4'}}
              color="primary.900"
              _hover={{ bg: 'white' }}
              size={'xs'}
              fontSize={[12, 14]}
            >
              connexion
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Navigation links for mobile view */}
      {isOpen && (
        <Box
          pt={4}
          pb={4}
          display={{ base: 'flex', md: 'none' }}
          bg="white"
          width="100%"
          px={2}
          boxShadow="lg"
          position="relative"
        >
          <Flex as="nav" direction="column" width="full">
            <Link
              as={RouterNavLink}
              to="/"
              _hover={{ bg: 'primary.100' }}
              px={2}
              onClick={onClose}
              color={'primary.800'}
            >
              Accueil
            </Link>
            <Link
              as={RouterNavLink}
              to="/about"
              _hover={{ bg: 'primary.100' }}
              px={2}
              onClick={onClose}
              color={'primary.800'}
            >
              Qui sommes-nous
            </Link>
            <Link
              as={RouterNavLink}
              to="/partner"
              _hover={{ bg: 'primary.100' }}
              px={2}
              onClick={onClose}
              color={'primary.800'}
            >
              Devenir partenaire
            </Link>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;

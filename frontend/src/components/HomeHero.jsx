import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import heroImage from '../assets/images/hero-image.svg';

const Hero = () => {
  return (
    <Box
      // Set the background image and styling for the hero section
      bgImage={`url(${heroImage})`}
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      height="100vh"
      display="flex"
      justifyContent={{base:'center', md:'flex-start'}}
      alignItems="center"
      position="relative"
      py={10}
      px={{base:'10', md:'59'}}
      zIndex={0}
    >
      {/* Overlay for semi-transparent background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex={0}
      />
      <Flex
        pt={100}
        as="section"
        // Set the direction and alignment of the content
        direction="column"
        alignItems={{ base: 'center', md: 'flex-start' }}
        textAlign={{ base: 'center', md: 'left' }}
        // Ensure content is displayed above the overlay
        position="relative"
        zIndex={1}
        // Adjust margin for different screen sizes
        mt={{ base: '-150px', md: '0px' }}
        borderRadius="md"
      >
        {/* Main heading */}
        <Text
          as="h1"
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="bold"
          mb={4}
          color="white"
        >
          Bienvenue chez Assur'Express
        </Text>
        {/* Subheading/description */}
        <Text
          as="p"
          fontSize={{ base: 'lg', md: 'xl' }}
          mb={6}
          color="white"
          textAlign={{base: 'justify', lg: 'start'}}
          w={{base: "100%", lg: "50%"}}
        >
          Votre partenaire de confiance pour tous vos besoins en assurance. Nous fournissons des services rapides et fiables pour assurer votre tranquillité d'esprit.
        </Text>
        {/* Button to navigate to the signup page */}
        <Button
          as={RouterLink}
          to="/signup"
          bg="primary.500"
          color="white"
          size={{ base: 'md', md: 'lg' }}
          _hover={{ bg: 'primary.600' }}
          mt={{base:'0', md:'10'}}
        >
          S'inscrire
        </Button>
      </Flex>
    </Box>
  );
};

export default Hero;

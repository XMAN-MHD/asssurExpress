// src/components/Footer.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Text, Link, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  // Color mode value
  const primaryColor = useColorModeValue('primary.500');

  return (
    <Box as="footer" mt={20} bgColor={primaryColor} color="white" py={4} textAlign="center">
      <Text>
            &copy; {new Date().getFullYear()} &nbsp;
            <Link 
                as={RouterLink} 
                to={'https://xman-mhd.github.io/mouhamed-moustapha-diouf/'}
                target='_blank'
            >
                2MD
            </Link>. 
            Tous droits réservés.
       </Text>
    </Box>
  );
};

export default Footer;

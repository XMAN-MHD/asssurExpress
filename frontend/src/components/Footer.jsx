// src/components/Footer.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" mt={20} bg="gray.800" color="white" py={4} textAlign="center">
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

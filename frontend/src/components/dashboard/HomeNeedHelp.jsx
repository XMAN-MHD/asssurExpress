// src/components/home/NeedHelp.jsx
import React from 'react';
import { Box, Flex, Text, Heading, Icon } from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const NeedHelp = () => {
  return (
    <Box as="section" pt={20} pb={5} px={{ base: '10', md: '59' }}>
      <Heading fontSize={{ base: '2xl', md: '5xl' }} fontWeight="bold" mb={20}>
        Besoin d'aide?
      </Heading>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={10} wrap="wrap">
        <ContactBox
          icon={<Icon as={FaPhone} color="white" boxSize={6} />}
          title="Téléphone"
          contactInfo="+221 33 234 56 89"
        />
        <ContactBox
          icon={<Icon as={FaEnvelope} color="white" boxSize={6} />}
          title="Email"
          contactInfo="contact@assurexpress.com"
        />
        <ContactBox
          icon={<Icon as={FaMapMarkerAlt} color="white" boxSize={6} />}
          title="Adresse"
          contactInfo="123 Rue de l'Assurance, 75001 Dakar, Sénégal"
        />
      </Flex>
    </Box>
  );
};

const ContactBox = ({ icon, title, contactInfo }) => {
  return (
    <Flex
      as="article"
      w={{ base: '100%', md: '45%', lg: '30%' }}
      p={6}
      direction="row"
      textAlign="left"
      bg="white"
      boxShadow="lg"
      borderRadius="2xl"
      _hover={{ boxShadow: "0px 4px 6px #25D366" }}
      justifyContent="flex-start"
      alignItems="center"
      wrap="nowrap"
    >
      {/* Icon container */}
      <Flex
        aria-hidden="true"
        borderRadius="50%"
        bg="primary.500"
        h={50}
        w={50}
        minWidth={50}
        justifyContent="center"
        alignItems="center"
        mr={4}
      >
        {icon}
      </Flex>
      {/* Contact Information */}
      <Box flex="1">
        <Heading fontSize="lg" mb={1}>{title}</Heading>
        <Text>{contactInfo}</Text>
      </Box>
    </Flex>
  );
};

export default NeedHelp;

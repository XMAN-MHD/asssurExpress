// src/components/home/NeedHelp.jsx
import React from 'react';
import { Box, Flex, Text, Heading, Icon } from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const NeedHelp = () => {
  return (
    <Box as="section" pt={20} pb={5} px={{ base: '10', md: '59' }}>
      <Heading fontSize={{ base: '2xl', md: '5xl' }} fontWeight="bold" mb={10} textAlign={'center'}>
        Besoin d'aide?
      </Heading>
      {/** Text */}
      <Text 
        mt={1}
        fontSize="lg"
        w={{lg: "60%"}}
        m={'auto'}
        mb={10}
        textAlign={{base: 'justify', md: 'start'}}
      >
        Besoin de plus d'informations sur nos services d'assurance ou prêt à démarrer votre couverture ? 
        N'hésitez pas à nous contacter. Notre équipe est à votre disposition pour répondre à toutes vos 
        questions.
      </Text>  
      {/** Contacts */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={10} wrap="wrap">
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
      boxShadow="0px 4px 6px #25D366"
      _hover={{ boxShadow: "lg" }}
      borderRadius="2xl"
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
        <Text fontSize={{base: 12, md: 14}}>{contactInfo}</Text>
      </Box>
    </Flex>
  );
};

export default NeedHelp;

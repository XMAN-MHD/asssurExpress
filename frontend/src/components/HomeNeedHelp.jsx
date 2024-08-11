// src/components/home/NeedHelp.jsx
import React from 'react';
import { Box, Flex, Text, Heading, useColorModeValue, Icon} from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const NeedHelp = () => {

  // Color mode value
  const primaryColor = useColorModeValue('primary.100');

  // VIEW
  return (
    <Box as='section'>
      {/* Main container using Flexbox for layout */}
      <Flex
        as="section"
        justifyContent="center"
        direction={{ base: 'column', lg: 'column' }}
        flexWrap="wrap"
      >
    {/* Section 1: Additional Information */}
    <Flex
          as="article"
          px={{ base: '10', md: '59' }}
          pt={{ base: "20", lg: "20" }}
          flexBasis="50%"
          direction="column"
          gap={10}
        >
     <Heading fontSize={{ base: '2xl', md: "5xl" }} fontWeight="bold" as="h1">
        Besoin d'aide?
      </Heading>
      {/** Text */}
      <Text 
            fontSize="lg"
            w={{lg: "80%"}}
            textAlign={{base: 'justify', md: 'start'}}
      >
        Besoin de plus d'informations sur nos services d'assurance ou prêt à démarrer votre couverture ? 
        N'hésitez pas à nous contacter. Notre équipe est à votre disposition pour répondre à toutes vos 
        questions.
      </Text>  
      </Flex>
      {/** Contacts */}
      <Flex
          direction="column"
          gap={5}
          justifyContent="space-between"
          as="section"
          flexBasis="50%"
          px={{base:10, md: 59}}
          pt={10}
      >
        <Flex 
            flexWrap="wrap" 
            justifyContent="space-between"
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: '5', md: '0' }}
        >
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
      </Flex>
      </Flex> 
    </Box>
  );
};

// contact box item
const ContactBox = ({ icon, title, contactInfo }) => {
  return (
    <Flex
      as="article"
      w={{ base: '100%', md: '45%', lg: '30%' }}
      p={6}
      direction="row"
      textAlign="left"
      bg="primary.50"
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

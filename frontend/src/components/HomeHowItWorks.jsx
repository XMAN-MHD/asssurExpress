import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Text, Heading, Icon, useColorModeValue, Button } from '@chakra-ui/react';
import { FaFileAlt, FaCogs, FaCreditCard, FaEnvelope } from 'react-icons/fa';

const HowItWorks = () => {

  // Color mode value
  const primaryColor = useColorModeValue('primary.100');

  // View
  return (
    <Box as="section" pt={20} pb={12} px={{ base: '2', md: '59' }}>
      {/* Section heading */}
      <Heading fontSize={{ base: '2xl', md: '5xl' }} fontWeight="bold" mb={10}>
        Comment ça marche?
      </Heading>
      {/** Text */}
      <Text 
        mt={1}
        fontSize="lg"
        w={{lg: "80%"}}
        mb={10}
        textAlign={{base: 'justify', md: 'start'}}
      >
        Découvrez notre processus simple et sécurisé pour acheter votre assurance en ligne. 
        Obtenez un devis instantané en fournissant vos informations, choisissez les options 
        de couverture qui vous conviennent, effectuez un paiement sécurisé et recevez votre police d'assurance. 
        Simplifiez votre expérience d'achat d'assurance avec nous.
      </Text>  
      {/* Container for the steps */}
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" flexWrap="wrap" gap={10}>
        <StepBox
          icon={<Icon as={FaFileAlt} color="white" boxSize={6} />}
          title="Obtenez un devis"
          description="Entrez vos détails pour recevoir un devis instantané."
        />
        <StepBox
          icon={<Icon as={FaCogs} color="white" boxSize={6} />}
          title="Choisir votre police"
          description="Sélectionnez les options de couverture."
        />
        <StepBox
          icon={<Icon as={FaCreditCard} color="white" boxSize={6} />}
          title="Effectuez le paiement"
          description="Faites un paiement sécurisé en ligne."
        />
        <StepBox
          icon={<Icon as={FaEnvelope} color="white" boxSize={6} />}
          title="Recevez votre police"
          description="Recevez votre police d'assurance numérique."
        />
      </Flex>

      {/* Call to action button */}
      {/* <Button 
        as={RouterLink} 
        mt={20}
        size="lg" 
        to={'/signin'} 
        w={{ base: "120px", md: "150px", lg: "160px" }}
      >
        Commencer
      </Button> */}
    </Box>
  );
};

// Step box item
const StepBox = ({ icon, title, description }) => {
  return (
    <Flex 
      as="article"  // Using semantic HTML to indicate this is an article
      w={{ base: '100%', md: '45%', lg: '22%' }} 
      p={6}
      direction="column"
      textAlign="center"
      bg="primary.100"
      justifyContent="center"
      alignItems="center"
    >
      {/* Icon container */}
      <Flex 
        aria-hidden="true"  // Hiding icon from screen readers as it is decorative
        borderRadius="50%" 
        bg="primary.500" 
        h={50} 
        w={50} 
        justifyContent="center" 
        alignItems="center"
        mb={4}
      >
        {icon}
      </Flex>

      {/* Step title */}
      <Heading fontSize="xl" mb={2}>{title}</Heading>

      {/* Step description */}
      <Text>{description}</Text>
    </Flex>
  );
};

export default HowItWorks;

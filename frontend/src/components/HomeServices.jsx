import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Icon, Heading, useColorModeValue, Box } from '@chakra-ui/react';
import { 
  FaMobile,
  FaShoppingCart, 
  FaDollarSign, 
  FaClipboardList, 
  FaHeadset, 
  FaTruck, 
} from 'react-icons/fa';

const Services = () => {
  
  // Color mode value
  const primaryColor = useColorModeValue('primary.100');

  // VIEW
  return (
    <Box as='section' bg={"#e9fbf0"} pb={12}>
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
          px={{ base: '2', md: '59' }}
          pt={{ base: "20", lg: "20" }}
          flexBasis="50%"
          direction="column"
          gap={10}
        >
          <Heading fontSize={{ base: '2xl', md: "5xl" }} fontWeight="bold" as="h1">
            Pourquoi nous choisir?
          </Heading>
          <Text 
            fontSize="lg"
            w={{lg: "80%"}}
            textAlign={{base: 'justify', md: 'start'}}
          >
            Acheter une assurance voiture en ligne présente plusieurs avantages,
            notamment en termes de commodité, de coûts et de personnalisation. 
            Voici quelques raisons pour lesquelles il peut être bénéfique d'acheter 
            une assurance voiture en ligne : 
          </Text>
        </Flex>

        {/* Section 2: Features and Benefits */}
        <Flex
          direction="column"
          gap={5}
          justifyContent="space-between"
          as="section"
          flexBasis="50%"
          px={{base:2, md: 59}}
          pt={10}
        >   
          {/* First row of feature/benefit boxes */}
          <Flex 
            flexWrap="wrap" 
            justifyContent="space-between"
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: '5', md: '0' }}
          >
            <FeatureBox
              icon={<Icon as={FaShoppingCart} color="white" boxSize={6} />}
              text="Processus d'achat facile"
            />
            <FeatureBox
              icon={<Icon as={FaClipboardList} color="white" boxSize={6} />}
              text="Gestion facile des politiques"
            />
            <FeatureBox
              icon={<Icon as={FaHeadset} color="white" boxSize={6} />}
              text="Assistance client 24h/24"
            />
          </Flex>

          {/* Second row of feature/benefit boxes */}
          <Flex 
            flexWrap="wrap" 
            justifyContent="space-between"
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: '5', md: '0' }}
          >
            <FeatureBox
              icon={<Icon as={FaDollarSign} color="white" boxSize={6} />}
              text="Des prix ​​abordables"
            />
            <FeatureBox
              icon={<Icon as={FaTruck} color="white" boxSize={6} />}
              text="Livraison à Domicile"
            />
            <FeatureBox
              icon={<Icon as={FaMobile} color="white" boxSize={6} />}
              text="Assurance numérique"
            />
          </Flex>
        </Flex>
      </Flex>  
    </Box>
  );
};

// Service Box Item
const FeatureBox = ({ icon, text }) => {
  return (
    <Flex 
      w={{ base: '100%', md: '33%', lg: '30%' }} 
      p={4} 
      flexWrap="wrap"
      textAlign="center" 
      bg="white"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      {/* Icon container */}
      <Flex borderRadius="50%" bg="primary.500" h={50} w={50} justifyContent="center" alignItems="center">
        {icon}
      </Flex>
      {/* Feature/benefit text */}
      <Text fontWeight={'bold'} mt={2}>{text}</Text>
    </Flex>
  );
};

export default Services;

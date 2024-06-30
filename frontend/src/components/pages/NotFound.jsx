import React from 'react';
import { Box, Heading, Text, Button, VStack, Image} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Image404 from '../../assets/images/404.jpg';

const NotFound = () => {

  return (
    <Box p={6} display="flex" justifyContent="center" alignItems="center">
      <VStack spacing={6} textAlign="center">
        <Image src={Image404} alt="404 Not Found" boxSize={{md: "300px"}} objectFit="cover" w={{md: "100%"}}/>
        <Heading as="h1" size="2xl">
          Oups! Page non trouvée.
        </Heading>
        <Text fontSize="lg">
          La page que vous recherchez n'existe pas. Elle a peut-être été supprimée ou vous avez mal tapé l'URL.
        </Text>
        <Button as={Link} to="/" bg={"primary.500"} size="lg">
          Retour à l'accueil
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;

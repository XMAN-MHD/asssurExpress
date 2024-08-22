import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Flex, Heading, Input, Box, FormControl, FormLabel, useColorModeValue, FormErrorMessage } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DashboardPurchasePhoto = ({ nextStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
 

  // Chakra UI color mode values for consistent theming
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  const onSubmit = (data) => {
      // Logic to upload photos or store them in state/Redux
     
      // Navigate to the next step
      nextStep('purchasePayment');
  };

  // Handle the previous step navigation
  const handlePrev = () => {
    nextStep('purchaseOwner'); // Navigate back to vehicle owner
  };

  return (
    <Box mt={4} as="section"> 
      <Heading as="h2" size="md" mb={4} id="carte-grise-voiture">
        Carte grise de la voiture
      </Heading>   
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.rectoPhoto} isRequired>
            <Flex flexDirection={{ base: 'column', lg: 'row' }}>
                <FormLabel w={{ lg: "30%" }} mt={{ base: 0, lg: 2 }}>Recto Photo</FormLabel>
                <Input 
                w={{ base: '220px', lg: "50%" }}
                type="file"
                accept="image/*"
                {...register('rectoPhoto', { required: "Recto photo est requis" })}
                />
            </Flex>
           {/* Display error message if validation fails */}
           <FormErrorMessage>{errors.rectoPhoto?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={errors.versoPhoto} isRequired>
            <Flex flexDirection={{ base: 'column', lg: 'row' }}>
                <FormLabel  w={{ lg: "30%" }} mt={{ base: 0, lg: 2 }}>Verso Photo</FormLabel>
                <Input 
                w={{ base: '220px', lg: "50%" }}
                type="file"
                accept="image/*"
                {...register('versoPhoto', { required: "Verso photo est requis" })}
                />
            </Flex>
            {/* Display error message if validation fails */}
            <FormErrorMessage>{errors.versoPhoto?.message}</FormErrorMessage>
        </FormControl>
        <Flex gap={3} direction={{base: 'column', md: 'row'}} mt={6}>
            <Button onClick={handlePrev} bg={secondaryBtnBgColor} _hover={{ bgColor: 'gray.800' }}>
              Précédent
            </Button>
            <Button 
                bg={primaryColor}
                type="submit"
            >
            Suivant
            </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default DashboardPurchasePhoto;
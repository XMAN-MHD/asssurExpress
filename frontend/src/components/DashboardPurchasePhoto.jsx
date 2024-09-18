// Packages
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Flex, Heading, Input, Box, FormControl, FormLabel, useColorModeValue, FormErrorMessage } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { uploadFiles, deletePolicy } from '../features/dash/dashSlice';

const DashboardPurchasePhoto = ({ nextStep }) => {
  // Hooks from react router dom
  const navigate = useNavigate();

  // Retrieve the policy data saved recently
  const { 
    data: newPolicyData, 
  } = useSelector(state => state.dashboard.newPolicy);
  
  // Retrieve file uploading slice data  
  const { 
    isLoading,  
    message
  } = useSelector(state => state.dashboard.fileUpload);

  // React hook form tools to handle form
  const { register, handleSubmit, formState: { errors } } = useForm();
 
  // function to dispatch actions 
  const dispatch = useDispatch();

  // Chakra UI color mode values for consistent theming
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  const onSubmit = async (data) => {
    try {
      const files = [data.rectoPhoto[0], data.versoPhoto[0]]; // Ensure to use the correct file array

      // Dispatch file upload action
      const result = await dispatch(uploadFiles(files)).unwrap();
      
      if (result) {
        toast.success("Fichiers téléchargés avec succès!");
        navigate('/');
      } else {
        toast.error(message || "Une erreur est survenue lors du téléchargement des fichiers.");
      }
    } catch (error) {
      console.log(error);
      toast.error(message || "Une erreur est survenue lors du téléchargement des fichiers.");
    }
  };

  // Handle the previous step navigation
  const handlePrev = async() => {
    try {
      const result = await dispatch(deletePolicy(newPolicyData.insuranceId)).unwrap();
      if (result) {
        // Navigate back to the beginning of purchasing a policy
        toast.success("Assurance annulé avec succés");
        nextStep('purchaseType'); 
      }
    } 
    catch (error) {
      console.log(error);
      toast.error("Erreur interne du serveur");
    }
    
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
                isLoading={isLoading} 
                loadingText="Chargement..."
            >
            {!isLoading && "Valider"}
            </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default DashboardPurchasePhoto;

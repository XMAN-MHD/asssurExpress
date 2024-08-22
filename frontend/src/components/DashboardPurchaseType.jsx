import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { purchasePolicyType } from '../features/dash/dashSlice';
import { Box, Heading, VStack, FormControl, FormLabel, RadioGroup, Radio, Button, useColorModeValue } from '@chakra-ui/react';

const DashboardPurchaseType = ({ nextStep }) => {

  // Manage state for the type of insurance selected, defaulting to 'Assurance Digitale'
  const [type, setType] = useState('Assurance Digitale');

  // Initialize dispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Define color mode values for styling based on the current theme (light or dark)
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('white');
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  // Handle the next step action
  const handleNext = () => {
    if (type) {
      // Dispatch the action to purchase a policy type with the selected type
      dispatch(purchasePolicyType(type));
      // Proceed to the next step in the form
      nextStep('purchaseCompany');
    }
  };

  // Render the component
  return (
    <Box>
      <Heading as="h2" size="md" mb={4}>Choisissez le type d'assurance</Heading>
      <VStack align="start" spacing={4}>
        <FormControl as="fieldset">
          <FormLabel as="legend" mb={5}>
            Avec la dématérialisation des polices d'assurance, il est maintenant possible de souscrire 
            à une police d'assurance digitale et de la conserver sur votre téléphone. 
            Cette assurance est tout aussi valable et reconnue qu'une attestation physique.
          </FormLabel>
          <RadioGroup onChange={setType} value={type}>
            <VStack align="start">
              {/* Radio buttons for selecting the type of insurance */}
              <Radio value='Assurance Digitale'>Assurance Digitale</Radio>
              {/* <Radio value="Assurance Papier">Assurance Papier</Radio> */}
            </VStack>
          </RadioGroup>
        </FormControl>
        {/* Button to go to the next step */}
        <Button onClick={handleNext} bg={primaryColor} mt={5}>Suivant</Button>
      </VStack>
    </Box>
  );
};

export default DashboardPurchaseType;

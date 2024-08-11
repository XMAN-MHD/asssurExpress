import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { purchasePolicyType} from '../features/dash/dashSlice';
import { Box, Heading, VStack, FormControl, FormLabel, RadioGroup, Radio, Button, useColorModeValue } from '@chakra-ui/react';

const DashboardPurchaseType = ({ nextStep }) => {

  // Manage states 
  const [type, setType] = useState('Assurance Digitale');

  //  Hooks
  const dispatch = useDispatch();

  // Color mode value
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('white');
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  const handleNext = () => {
    if(type){
      dispatch(purchasePolicyType(type));
      nextStep('purchaseCompany');
    }
  };

  // Render Purchase Type View
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
              <Radio value='Assurance Digitale'>Assurance Digitale</Radio>
              <Radio value="Assurance Papier">Assurance Papier</Radio>
            </VStack>
          </RadioGroup>
        </FormControl>
        <Button onClick={handleNext} bg={primaryColor} mt={5}>Suivant</Button>
      </VStack>
    </Box>
  );
};

export default DashboardPurchaseType;

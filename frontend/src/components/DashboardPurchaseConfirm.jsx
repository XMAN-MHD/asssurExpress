import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, VStack, Text, Button, useColorModeValue, Flex } from '@chakra-ui/react';

const DashboardPurchaseConfirm = ({ nextStep}) => {
  // Get the selected policy cost from the Redux store
  const cost = useSelector((state) => state.dashboard.purchase.cost.value);
  const isError = useSelector((state) => state.dashboard.purchase.cost.isError);
  const dispatch = useDispatch();

  // Handle confirmation of the purchase
  const handleConfirm = () => {
    nextStep('purchaseVehicle');
  };

  // Handle going back to the previous step
  const handleBack = () => {
    nextStep('purchaseCost');
  };

  // Define color mode values for styling based on the current theme (light or dark)
  const bgColor = useColorModeValue('white', 'gray.700');
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  // Render the component
  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Devis</Heading>
      <VStack align="start" spacing={4}>
        <Text>Le coût de votre police d'assurance est de:</Text>
        <Heading size="lg" color={primaryColor}> {`${cost} FCFA`}</Heading>
        {isError && <Heading size="sm" color={'red'}>Erreur de calcul. Veuillez vérifier vos données, s'il vous plaît.</Heading>}
        <Text>Voulez-vous continuer ?</Text>
        <Flex gap={4}>
          {/* Button to go back to the previous step */}
          <Button onClick={handleBack} bg={secondaryBtnBgColor} _hover={{ bgColor: 'gray.800' }} mt={5}>Non</Button>
          {/* Button to confirm the purchase */}
          <Button onClick={handleConfirm} bg={primaryColor} mt={5}>Oui</Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default DashboardPurchaseConfirm;

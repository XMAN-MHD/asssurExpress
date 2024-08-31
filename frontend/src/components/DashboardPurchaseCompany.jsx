import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, VStack, FormControl, RadioGroup, Radio, Button, useColorModeValue, Flex, HStack } from '@chakra-ui/react';
import { purchasePolicyCompany } from '../features/dash/dashSlice';

const DashboardPurchaseCompany = ({ nextStep }) => {
  // State to manage the selected insurance company
  const [company, setCompany] = useState('');
  // Initialize dispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Handle the next step action
  const handleNext = () => {
    if (company) {
      // Dispatch the action to purchase a policy with the selected company
      dispatch(purchasePolicyCompany(company));
      // Proceed to the next step in the form
      nextStep('purchaseCost');
    }
  };

  // Handle the previous step action
  const handlePrev = () => {
    nextStep('purchaseType');
  };

  // Define color mode values for styling based on the current theme (light or dark)
  const bgColor = useColorModeValue('white', 'gray.700');
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  // Render the component
  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Choisissez la compagnie d'assurance</Heading>
      <VStack align="start" spacing={4}>
        <FormControl as="fieldset">
          <RadioGroup onChange={setCompany} value={company}>
            <Flex gap={4} direction={{base: 'column', lg: 'row'}}>
              <Flex gap={4} flexDirection={{base: 'column', lg: 'row'}}>
                <Flex flexDirection={{ base: 'column' }} gap={4}>
                  {/* Radio buttons for selecting an insurance company */}
                  <Radio value="Allianz">Allianz</Radio>
                  <Radio value="Askia">Askia</Radio>
                  <Radio value="SAS">SAS</Radio>
                </Flex>
                <Flex flexDirection={{ base: 'column' }} gap={4}>
                  <Radio value="Amsa">Amsa</Radio>
                  <Radio value="AXA">AXA</Radio>
                  <Radio value="Cnart">Cnart</Radio>
                </Flex>
              </Flex>
              <Flex gap={4} flexDirection={{base: 'column', lg: 'row'}}>
                <Flex flexDirection={{ base: 'column' }} gap={4}>
                  <Radio value="La providence">La providence</Radio>
                  <Radio value="PA">PA</Radio>
                  <Radio value="Saar">Saar</Radio>
                </Flex>
                <Flex flexDirection={{ base: 'column' }} gap={4}>
                  <Radio value="Sanlam">Sanlam</Radio>
                  <Radio value="Salama">Salama</Radio>
                  <Radio value="SUNU">SUNU</Radio>
                </Flex>
              </Flex>
            </Flex>
          </RadioGroup>
        </FormControl>
        <Flex gap={4} direction={{base: 'column', md: 'row'}}>
          {/* Button to go to the previous step */}
          <Button onClick={handlePrev} bg={secondaryBtnBgColor} _hover={{ bgColor: 'gray.800' }} mt={5}>Précédent</Button>
          {/* Button to go to the next step */}
          <Button onClick={handleNext} bg={primaryColor} mt={5}>Suivant</Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default DashboardPurchaseCompany;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, VStack, FormControl, RadioGroup, Radio, Button, useColorModeValue, Flex, HStack } from '@chakra-ui/react';
import { purchasePolicyCompany } from '../features/dash/dashSlice';

const DashboardPurchaseCompany = ({ nextStep }) => {
  const [company, setCompany] = useState('');
  const dispatch = useDispatch();

  const handleNext = () => {
    if (company) {
      dispatch(purchasePolicyCompany(company));
      nextStep('purchaseCost');
    }
  };

  const handlePrev = () => {
    nextStep('purchaseType');
  };

  const bgColor = useColorModeValue('white', 'gray.700');
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  return (
    <Box>
      <Heading as="h2" size="md" mb={4}>Choisissez la compagnie d'assurance</Heading>
      <VStack align="start" spacing={4}>
        <FormControl as="fieldset">
          <RadioGroup onChange={setCompany} value={company}>
            <HStack align="start">
              <Flex flexDirection={{base:'column'}}>
                <Radio value="Allianz">Allianz</Radio>
                <Radio value="Askia">Askia</Radio>
                <Radio value="SAS">SAS</Radio>
              </Flex>
              <Flex flexDirection={{base:'column'}}>
                <Radio value="Amsa">Amsa</Radio>
                <Radio value="AXA">AXA</Radio>
                <Radio value="Cnart">Cnart</Radio>
              </Flex>
              <Flex flexDirection={{base:'column'}}>
                <Radio value="La providence">La providence</Radio>
                <Radio value="PA">PA</Radio>
                <Radio value="Saar">Saar</Radio>
              </Flex>
              <Flex flexDirection={{base:'column'}}>
              <Radio value="Sanlam">Sanlam</Radio>
              <Radio value="Salama">Salama</Radio>
              <Radio value="SUNU">SUNU</Radio>
              </Flex>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Flex gap={4}>
            <Button onClick={handleNext} bg={primaryColor} mt={5}>Suivant</Button>
            <Button onClick={handlePrev} bg={secondaryBtnBgColor} _hover={{bgColor:'gray.900'}} mt={5}>Précédent</Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default DashboardPurchaseCompany;

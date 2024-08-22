import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Heading, VStack, FormControl, FormLabel, Input, Select, Button, useColorModeValue, Flex } from '@chakra-ui/react';
import { calculatePolicyCost } from '../features/dash/dashSlice';

const DashboardPurchaseCost = ({ nextStep }) => {
  const [category, setCategory] = useState('');
  const [power, setPower] = useState('');
  const [duration, setDuration] = useState('');
  const dispatch = useDispatch();

  const handleCalculateCost = () => {
    if (category && power && duration) {
      // Dispatch the action to calculate the policy cost
      dispatch(calculatePolicyCost({ category, power, duration }));
      // Proceed to the next step
      nextStep('purchaseConfirm');
    }
  };

  const handlePrev = () => {
    nextStep('purchaseCompany');
  };

  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  return (
    <Box>
      <Heading as="h2" size="md" mb={4}>Calculez le coût de votre police</Heading>
      <Flex gap={4} flexDirection={{base: 'column'}} >
        <Flex flexDirection={{lg: 'row'}}>
            <FormControl isRequired>
            <Flex flexDirection={{base: 'column', lg: 'row'}} >
              <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Catégorie du véhicule</FormLabel>
              <Select 
                w={{lg:"50%"}}
                placeholder="Sélectionnez la catégorie" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
              >
                <option value="Catégorie 1" >Catégorie 1</option>
                {/* <option value="Catégorie 2">Catégorie 2</option>
                <option value="Catégorie 3">Catégorie 3</option>
                <option value="Catégorie 4">Catégorie 4</option>
                <option value="Catégorie 5">Catégorie 5</option> */}
              </Select>
            </Flex>
            </FormControl>
        </Flex>
        <Flex >
            <FormControl isRequired>
            <Flex flexDirection={{base: 'column', lg: 'row'}}>
              <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Puissance du véhicule (CV)</FormLabel>
              <Input 
                  w={{lg:"50%"}}
                  type="number" value={power} 
                  onChange={(e) => setPower(e.target.value)}
                  _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }} 
              />
            </Flex>
            </FormControl>
        </Flex>
        <Flex>
            <FormControl isRequired>
            <Flex flexDirection={{base: 'column', lg: 'row'}}>
              <FormLabel mt={{base: 0, lg: 2}} w={{lg:"30%"}}>Durée de l'assurance (mois)</FormLabel>
              <Input 
                  w={{lg:"50%"}}
                  type="number" value={duration} 
                  onChange={(e) => setDuration(e.target.value)} 
                  _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
              />
            </Flex>
            </FormControl>
        </Flex>
        <Flex gap={3} direction={{base: 'column', md: 'row'}}>
            <Button onClick={handlePrev} bg={secondaryBtnBgColor} _hover={{ bgColor: 'gray.800' }} mt={5}>Précédent</Button>
            <Button onClick={handleCalculateCost} bg={primaryColor} mt={5}>Calculer le coût</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardPurchaseCost;


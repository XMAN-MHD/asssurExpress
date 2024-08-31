import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Heading, FormControl, FormLabel, Input, Select, Button, useColorModeValue, Flex } from '@chakra-ui/react';
import { saveVehicleDetails } from '../features/dash/dashSlice';

const DashboardPurchaseVehicle = ({ nextStep }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [firstRegistrationDate, setFirstRegistrationDate] = useState('');
  const [energy, setEnergy] = useState('');
  const dispatch = useDispatch();

  const handleSaveDetails = () => {
    if (registrationNumber && brand && model && firstRegistrationDate && energy) {
      dispatch(saveVehicleDetails({ registrationNumber, brand, model, firstRegistrationDate, energy }));
      nextStep('purchaseOwner');
    }
  };

  const handlePrev = () => {
    nextStep('purchaseConfirm');
  };

  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Détails du véhicule</Heading>
      <Flex gap={4} flexDirection={{ base: 'column' }}>
        <FormControl isRequired>
          <Flex flexDirection={{base: 'column', lg: 'row'}}>
            <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Nº d'immatriculation</FormLabel>
            <Input
              w={{lg:"50%"}}
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
            />
          </Flex>
        </FormControl>
        <FormControl isRequired>
          <Flex flexDirection={{base: 'column', lg: 'row'}}>
            <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Marque du véhicule</FormLabel>
            <Input
              w={{lg:"50%"}}
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
            />
          </Flex>
        </FormControl>
        <FormControl isRequired>
        <Flex flexDirection={{base: 'column', lg: 'row'}}>
            <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Modèle du véhicule</FormLabel>
            <Input
              w={{lg:"50%"}}
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
            />
          </Flex>
        </FormControl>
        <FormControl isRequired>
          <Flex flexDirection={{base: 'column', lg: 'row'}}>
            <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Date de 1ère mise en circulation</FormLabel>
            <Input
              w={{lg:"50%"}}
              type="date"
              value={firstRegistrationDate}
              onChange={(e) => setFirstRegistrationDate(e.target.value)}
              _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
            />
          </Flex>
        </FormControl>
        <FormControl isRequired>
          <Flex flexDirection={{base: 'column', lg: 'row'}}>
            <FormLabel w={{lg:"30%"}} mt={{base: 0, lg: 2}}>Énergie</FormLabel>
            <Select
              w={{lg:"50%"}}
              placeholder="Choisir une option"
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
              _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
            >
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Électric">Électrique</option>
              <option value="Hybrid">Hybride</option>
            </Select>
          </Flex>
        </FormControl>
        <Flex gap={3} direction={{base: 'column', md: 'row'}}>
          <Button onClick={handlePrev} bg={secondaryBtnBgColor} _hover={{ bgColor: 'gray.800' }} mt={5}>Précédent</Button>
          <Button onClick={handleSaveDetails} bg={primaryColor} mt={5}>Suivant</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardPurchaseVehicle;

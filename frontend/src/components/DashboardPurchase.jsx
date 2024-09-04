import React, { useState } from 'react';
import { Box, Heading, Flex, Divider, useColorModeValue } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import DashboardPurchaseType from './DashboardPurchaseType';
import DashboardPurchaseCompany from './DashboardPurchaseCompany';
import DashboardPurchaseCost from './DashboardPurchaseCost';
import DashboardPurchaseConfirm from './DashboardPurchaseConfirm';
import DashboardPurchaseVehicle from './DashboardPurchaseVehicle';
import DashboardPurchaseOwner from './DashboardPurchaseOwner';
import DashboardPurchasePhoto from './DashboardPurchasePhoto';
import DashboardPurchaseRecap from './DashboardPurchaseRecap';
import DashboardPurchasePayment  from './DashboardPurchasePayment';
import DashboardPurchaseFeedback from './DashboardPurchaseFeedback';
import { useSelector } from 'react-redux';

const Purchase = () => {
   // Get the new policy data
   const {
    type, 
    cost, 
    company,
    category, 
    power, 
    duration, 
    vehicle,
    owner,
  }= useSelector(state => state.dashboard.purchase);
  const initialData = {
    type, 
    cost: cost.value,
    company,
    category, 
    power, 
    insuranceDuration: duration, 
    registrationNumber: vehicle.registrationNumber,
    brand: vehicle.brand,
    model: vehicle.model,
    firstRegistrationDate: vehicle.firstRegistrationDate,
    energy: vehicle.energy,
    firstName: owner.firstName,
    lastName: owner.lastName,
    phone: owner.phone,
    address: owner.address,
  }

  const bgColor = useColorModeValue('white', 'gray.700');
  const primaryColor = useColorModeValue('primary.500', 'primary.200');

  const [activeSection, setActiveSection] = useState('purchaseType');

  const nextStep = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'purchaseType':
        return <DashboardPurchaseType nextStep={nextStep} />;
      case 'purchaseCompany':
        return <DashboardPurchaseCompany nextStep={nextStep} />;
      case 'purchaseCost':
        return <DashboardPurchaseCost nextStep={nextStep} />;
      case 'purchaseConfirm':
        return <DashboardPurchaseConfirm nextStep={nextStep} />;
      case 'purchaseVehicle':
        return <DashboardPurchaseVehicle nextStep={nextStep} />;
      case 'purchaseOwner':
        return <DashboardPurchaseOwner nextStep={nextStep} />;
      case 'purchaseRecap':
        return <DashboardPurchaseRecap nextStep={nextStep} initialData={initialData}/>;
      case 'purchasePhoto':
        return <DashboardPurchasePhoto nextStep={nextStep} initialData={initialData}/>;
      case 'purchasePayment':
        return <DashboardPurchasePayment nextStep={nextStep} />;
      case 'purchaseFeedback':
        return <DashboardPurchaseFeedback />;
      default:
        return <DashboardPurchaseType nextStep={nextStep} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Achetez une assurance - AssurExpress</title>
        <meta name="description" content={`Choisissez puis achetez votre assurance`} />
      </Helmet>
      <Box p={6} bg={bgColor} rounded="md" shadow="md">
        <Heading as="h1" size="xl" mb={4} color={primaryColor} textTransform={'uppercase'}>Achetez une assurance</Heading>
        <Divider mb={10} />
        <Flex>
          <Box w={'full'}>
            {renderContent()}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Purchase;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Flex, Button, Heading, Input, FormControl, FormLabel, FormErrorMessage, useColorModeValue } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createPolicy } from '../features/dash/dashSlice';
import toast from 'react-hot-toast'

const DashboardPurchaseRecap = ({ initialData, nextStep }) => {
  // handle the form with react-hook-form
  const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData
  });

  //Get the slice data new policy
  const { isLoading, message }= useSelector( state => state.dashboard.newPolicy )

  // Chakra UI color mode values for consistent theming
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');
  
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      // Dispatch the action to save the new policy data into the database
      const resultAction = await dispatch(createPolicy(data)).unwrap();
      
      // Handle successful policy creation
      if (resultAction) {
        toast.success("Données enregistrées avec succés!");
        nextStep('purchasePhoto');
      }
    } catch (error) {
      console.log(error.message);
      // Handle error during policy creation
      toast.error(message || "Une erreur est survenue lors de la sauvegarde des données.");
    }
  };
  

  const handleCancel =  () => { 
    // Move to the bigining of purchase process
    nextStep('purchaseType');
  };

  return (
    <Box p={6} borderWidth={1} borderRadius="md" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Vérifiez et mettez à jour 
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Type */}
        <Controller
        name="type"
        control={control}
        render={({ field }) => <Input id="type" {...field} type="hidden" />}
        /> 
        {/* Cost */}
        <Controller
        name="cost"
        control={control}
        render={({ field }) => <Input id="cost" {...field} type="hidden" />}
        />
        {/* FirstName */}
        <FormControl isInvalid={errors.firstName} mt={4}>
          <FormLabel htmlFor="owner">Prénom</FormLabel>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <Input id="firstName" {...field} />}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>

        {/* LastName */}
        <FormControl isInvalid={errors.lastName} mt={4}>
          <FormLabel htmlFor="owner">Nom</FormLabel>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <Input id="lastName" {...field} />}
        />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl> 
        
        {/* Phone */}
        <FormControl isInvalid={errors.phone} mt={4}>
          <FormLabel htmlFor="owner">Téléphone</FormLabel>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <Input id="phone" type="number" {...field} />}
        />
          <FormErrorMessage>
            {errors.phone && errors.phone.message}
          </FormErrorMessage>
        </FormControl> 
        
        {/* Phone */}
        <FormControl isInvalid={errors.address} mt={4}>
          <FormLabel htmlFor="owner">Adresse</FormLabel>
          <Controller
            name="address"
            control={control}
            render={({ field }) => <Input id="address" {...field} />}
        />
          <FormErrorMessage>
            {errors.address && errors.addressmessage}
          </FormErrorMessage>
        </FormControl>

        {/* Company */}
        <FormControl isInvalid={errors.company} mt={4}>
          <FormLabel htmlFor="company">la compagnie d'assurance</FormLabel>
          <Controller
            name="company"
            control={control}
            render={({ field }) => <Input id="company" {...field} />}
          />
          <FormErrorMessage>
            {errors.company && errors.company.message}
          </FormErrorMessage>
        </FormControl>

        {/* Power */}
        <FormControl isInvalid={errors.power} mt={4}>
          <FormLabel htmlFor="power">Durée de l'assurance (mois)</FormLabel>
          <Controller
            name="power"
            control={control}
            render={({ field }) => <Input id="power" type="number" {...field} />}
          />
          <FormErrorMessage>
            {errors.power && errors.power.message}
          </FormErrorMessage>
        </FormControl>

        {/* Duration */}
        <FormControl isInvalid={errors.insuranceDuration} mt={4}>
          <FormLabel htmlFor="duration">Puissance du véhicule (CV)</FormLabel>
          <Controller
            name="insuranceDuration"
            control={control}
            render={({ field }) => <Input id="insuranceDuration" type="number" {...field} />}
          />
          <FormErrorMessage>
            {errors.insuranceDuration && errors.insuranceDuration.message}
          </FormErrorMessage>
        </FormControl>

        {/* RegistrationNumber */}
        <FormControl isInvalid={errors.registrationNumber} mt={4}>
          <FormLabel htmlFor="cost">Nº d'immatriculation</FormLabel>
          <Controller
            name="registrationNumber"
            control={control}
            render={({ field }) => <Input id="registrationNumber" {...field} />}
          />
          <FormErrorMessage>
            {errors.registrationNumber && errors.registrationNumber.message}
          </FormErrorMessage>
        </FormControl>

        {/* Brand */}
        <FormControl isInvalid={errors.brand} mt={4}>
          <FormLabel htmlFor="vehicle">Modèle du véhicule</FormLabel>
          <Controller
            name="brand"
            control={control}
            render={({ field }) => <Input id="brand" {...field} />}
          />
          <FormErrorMessage>
            {errors.brand && errors.brand.message}
          </FormErrorMessage>
        </FormControl>

        {/* FirstRegistrationDate */}
        <FormControl isInvalid={errors.firstRegistrationDate} mt={4}>
          <FormLabel htmlFor="vehicle">Date de 1ère mise en circulation</FormLabel>
          <Controller
            name="firstRegistrationDate"
            control={control}
            render={({ field }) => <Input id="firstRegistrationDate" type="date" {...field} />}
          />
          <FormErrorMessage>
            {errors.firstRegistrationDate && errors.firstRegistrationDate.message}
          </FormErrorMessage>
        </FormControl>

        {/* Energy */}
        <FormControl isInvalid={errors.energy} mt={4}>
          <FormLabel htmlFor="vehicle">Énergie</FormLabel>
          <Controller
            name="energy"
            control={control}
            render={({ field }) => <Input id="energy" {...field} />}
          />
          <FormErrorMessage>
            {errors.energy && errors.energy.message}
          </FormErrorMessage>
        </FormControl>

        {/* Navigation Buttons */}
        <Flex gap={3} direction={{base: 'column', md: 'row'}} mt={6}>
          <Button onClick={handleCancel} bg={secondaryBtnBgColor} _hover={{ bgColor: 'gray.800' }}>
            Annuler
          </Button>
          <Button type="submit" bg={primaryColor} isLoading={isLoading} loadingText="Traitement...">
            {!isLoading && "Valider"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default DashboardPurchaseRecap;

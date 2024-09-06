import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Flex, Button, Heading, Input, FormControl, FormLabel, FormErrorMessage, useColorModeValue } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createPolicy } from '../features/dash/dashSlice';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify'; // Importing DOMPurify to sanitize input fields

const DashboardPurchaseRecap = ({ initialData, nextStep }) => {
  // Handle the form with react-hook-form
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  // Get the slice data new policy
  const { isLoading, message } = useSelector(state => state.dashboard.newPolicy);

  // Chakra UI color mode values for consistent theming
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const sanitizedData = {
        type: DOMPurify.sanitize(data.type),
        cost: DOMPurify.sanitize(data.cost),
        category: DOMPurify.sanitize(data.category),
        firstName: DOMPurify.sanitize(data.firstName),
        lastName: DOMPurify.sanitize(data.lastName),
        phone: DOMPurify.sanitize(data.phone),
        address: DOMPurify.sanitize(data.address),
        company: DOMPurify.sanitize(data.company),
        power: DOMPurify.sanitize(data.power),
        insuranceDuration: DOMPurify.sanitize(data.insuranceDuration),
        registrationNumber: DOMPurify.sanitize(data.registrationNumber),
        brand: DOMPurify.sanitize(data.brand),
        model: DOMPurify.sanitize(data.model),
        firstRegistrationDate: DOMPurify.sanitize(data.firstRegistrationDate),
        energy: DOMPurify.sanitize(data.energy)
      };
      // Dispatch the action to save the new policy data into the database
      const resultAction = await dispatch(createPolicy(sanitizedData)).unwrap();
      
      // Handle successful policy creation
      if (resultAction) {
        toast.success("Données enregistrées avec succès!");
        nextStep('purchasePhoto');
      }
    } catch (error) {
      console.log(error);
      // Handle error during policy creation
      toast.error(message || "Une erreur est survenue lors de la sauvegarde des données.");
    }
  };

  const handleCancel = () => { 
    // Move to the beginning of the purchase process
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
        
        {/* Category */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => <Input id="category" {...field} type="hidden" />}
        />
        
        {/* FirstName */}
        <FormControl isInvalid={errors.firstName} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="firstName" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Prénom:</FormLabel>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "Le prénom est requis" }}
              render={({ field }) => <Input id="firstName" {...field} />}
              w={{ lg: "50%" }}
            />
            <FormErrorMessage>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </Flex>
        </FormControl>

        {/* LastName */}
        <FormControl isInvalid={errors.lastName} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="lastName"  w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Nom:</FormLabel>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Le nom est requis" }}
              render={({ field }) => <Input id="lastName" {...field} />}
              w={{ lg: "50%" }}
            />
            <FormErrorMessage>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </Flex>
        </FormControl> 
        
        {/* Phone */}
        <FormControl isInvalid={errors.phone} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="phone" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Téléphone:</FormLabel>
            <Controller
              name="phone"
              control={control}
              rules={{ 
                required: "Le téléphone est requis", 
                pattern: { value: /^[0-9]+$/, message: "Téléphone non valide" } 
              }}
              render={({ field }) => <Input id="phone" type="number" {...field} />}
              w={{ lg: "50%" }}
            />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </Flex>
        </FormControl> 
        
        {/* Address */}
        <FormControl isInvalid={errors.address} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="address" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Adresse:</FormLabel>
            <Controller
              name="address"
              control={control}
              rules={{ required: "L'adresse est requise" }}
              render={({ field }) => <Input id="address" {...field} />} 
              w={{ lg: "50%" }}    
            />
            <FormErrorMessage>
              {errors.address && errors.address.message}
            </FormErrorMessage>
          </Flex>
        </FormControl>

        {/* Company */}
        <FormControl isInvalid={errors.company} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="company" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>La compagnie d'assurance:</FormLabel>
            <Controller
              name="company"
              control={control}
              rules={{ required: "La compagnie d'assurance est requise" }}
              render={({ field }) => <Input id="company" {...field} />}
              w={{ lg: "50%" }}  
            />
            <FormErrorMessage>
              {errors.company && errors.company.message}
            </FormErrorMessage>
          </Flex>
        </FormControl>

        {/* Power */}
        <FormControl isInvalid={errors.power} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="power" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Puissance du véhicule (CV):</FormLabel>
            <Controller
              name="power"
              control={control}
              rules={{ required: "La durée est requise", min: { value: 1, message: "La durée doit être au moins 1 mois" } }}
              render={({ field }) => <Input id="power" type="number" {...field} />}
              w={{ lg: "50%" }} 
            />
            <FormErrorMessage>
              {errors.power && errors.power.message}
            </FormErrorMessage>
          </Flex> 
        </FormControl>

        {/* Insurance Duration */}
        <FormControl isInvalid={errors.insuranceDuration} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="insuranceDuration" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Durée de l'assurance (mois):</FormLabel>
            <Controller
              name="insuranceDuration"
              control={control}
              rules={{ required: "La puissance est requise", min: { value: 1, message: "La puissance doit être au moins 1 CV" } }}
              render={({ field }) => <Input id="insuranceDuration" type="number" {...field} />}
              w={{ lg: "50%" }} 
            />
            <FormErrorMessage>
              {errors.insuranceDuration && errors.insuranceDuration.message}
            </FormErrorMessage>
          </Flex>
        </FormControl>

        {/* Registration Number */}
        <FormControl isInvalid={errors.registrationNumber} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="registrationNumber" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Nº d'immatriculation:</FormLabel>
            <Controller
              name="registrationNumber"
              control={control}
              rules={{ required: "Le numéro d'immatriculation est requis" }}
              render={({ field }) => <Input id="registrationNumber" {...field} />}
              w={{ lg: "50%" }}
            />
            <FormErrorMessage>
              {errors.registrationNumber && errors.registrationNumber.message}
            </FormErrorMessage>
          </Flex>
        </FormControl>

        {/* Brand */}
        <FormControl isInvalid={errors.brand} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="brand" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Marque du véhicule:</FormLabel>
            <Controller
              name="brand"
              control={control}
              rules={{ required: "La marque du véhicule est requis" }}
              render={({ field }) => <Input id="brand" {...field} />}
              w={{ lg: "50%" }}
            />
            <FormErrorMessage>
              {errors.brand && errors.brand.message}
            </FormErrorMessage>
          </Flex> 
        </FormControl>

        {/* Model */}
        <FormControl isInvalid={errors.model} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="model" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Modéle du véhicule:</FormLabel>
            <Controller
              name="model"
              control={control}
              rules={{ required: "Le modéle du véhicule est requis" }}
              render={({ field }) => <Input id="model" {...field} />}
              w={{ lg: "50%" }}
            />
            <FormErrorMessage>
              {errors.model && errors.model.message}
            </FormErrorMessage>
          </Flex>
        </FormControl>

        {/* First Registration Date */}
        <FormControl isInvalid={errors.firstRegistrationDate} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="firstRegistrationDate" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Date de 1ère mise en circulation:</FormLabel>
            <Controller
              name="firstRegistrationDate"
              control={control}
              rules={{ required: "La date de première mise en circulation est requise" }}
              render={({ field }) => <Input id="firstRegistrationDate" type="date" {...field} />}
              w={{ lg: "50%" }}
            />
            <FormErrorMessage>
              {errors.firstRegistrationDate && errors.firstRegistrationDate.message}
            </FormErrorMessage>
          </Flex>
        </FormControl>

        {/* Energy */}
        <FormControl isInvalid={errors.energy} mt={4}>
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormLabel htmlFor="energy" w={{ lg: "50%" }} mt={{ base: 0, lg: 2 }}>Énergie:</FormLabel>
            <Controller
              name="energy"
              control={control}
              rules={{ required: "Le type d'énergie est requis" }}
              render={({ field }) => <Input id="energy" {...field} />}
              w={{ lg: "50%" }}
            />
            <FormErrorMessage>
              {errors.energy && errors.energy.message}
            </FormErrorMessage>
          </Flex>
        </FormControl>

        {/* Navigation Buttons */}
        <Flex gap={3} direction={{ base: 'column', md: 'row' }} mt={6}>
          <Button onClick={handleCancel} bg={secondaryBtnBgColor} _hover={{ bgColor: useColorModeValue('gray.800', 'gray.600') }}>
            Annuler
          </Button>

          <Button type="submit" bg={primaryColor} isLoading={isLoading} loadingText="Traitement...">
            {isLoading ? "Traitement..." : "Valider"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default DashboardPurchaseRecap;

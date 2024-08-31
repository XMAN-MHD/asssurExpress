import React from 'react';
import { useForm } from 'react-hook-form'; // Importing React Hook Form for form handling
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from Redux
import { Box, Heading, FormControl, FormLabel, Input, Button, Flex, useColorModeValue, FormErrorMessage } from '@chakra-ui/react'; // Importing Chakra UI components
import { saveOwnerDetails} from '../features/dash/dashSlice'; // Importing the Redux action to save owner details
import DOMPurify from 'dompurify'; // Importing DOMPurify to sanitize input fields

const DashboardPurchaseOwner = ({ nextStep }) => {
  // Initialize React Hook Form with register, handleSubmit, and formState for error handling
  const { register, handleSubmit, formState: { errors } } = useForm()

  const dispatch = useDispatch(); // Initialize dispatch to send actions to the Redux store

  // Handle form submission
  const onSubmit = (data) => {
    // Sanitize the fields to prevent XSS attacks
    const sanitizedData = {
      firstName: DOMPurify.sanitize(data.firstName),
      lastName: DOMPurify.sanitize(data.lastName),
      phone: DOMPurify.sanitize(data.phone),
      address: DOMPurify.sanitize(data.address)
    };
    // Dispatch the sanitized owner details to the Redux store and move to the next step
    dispatch(saveOwnerDetails(sanitizedData));
    nextStep('purchaseRecap'); // Proceed to the photo upload step
  };

  // Handle the previous step navigation
  const handlePrev = () => {
    nextStep('purchaseVehicle'); // Navigate back to the vehicle details step
  };

  // Chakra UI color mode values for consistent theming
  const primaryColor = useColorModeValue('primary.500', 'primary.200');
  const secondaryBtnBgColor = useColorModeValue('gray.700');

  return (
    <section>
      {/* Main container for owner details */}
      <Box mt={4} as="article" aria-labelledby="owner-details-heading">
        <Heading as="h2" size="md" mb={4} id="owner-details-heading">
          Détails du propriétaire
        </Heading>
        {/* Form submission handler with React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={4} flexDirection={{ base: 'column' }}>
            {/* First Name Field */}
            <FormControl isInvalid={errors.firstName} isRequired>
              <Flex flexDirection={{ base: 'column', lg: 'row' }}>
                <FormLabel htmlFor="firstName" w={{ lg: "30%" }} mt={{ base: 0, lg: 2 }}>
                  Prénom
                </FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  w={{ lg: "50%" }}
                  type="text"
                  {...register(
                    'firstName', 
                    { 
                      required: 'Prénom est requis', // Validation: Field is required
                      maxLength: {
                        value: 50, // Maximum length validation
                        message: 'Prénom ne doit pas dépasser 50 caractères'
                      }
                    }
                  )}
                  _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
                />
              </Flex>
              {/* Display error message if validation fails */}
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            {/* Last Name Field */}
            <FormControl isInvalid={errors.lastName} isRequired>
              <Flex flexDirection={{ base: 'column', lg: 'row' }}>
                <FormLabel htmlFor="lastName" w={{ lg: "30%" }} mt={{ base: 0, lg: 2 }}>
                  Nom
                </FormLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  w={{ lg: "50%" }}
                  type="text"
                  {...register(
                    'lastName', 
                    { 
                      required: 'Nom est requis', // Validation: Field is required
                      maxLength: {
                        value: 50, // Maximum length validation
                        message: 'Nom ne doit pas dépasser 50 caractères'
                      }
                    }
                  )}
                  _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
                />
              </Flex>
              {/* Display error message if validation fails */}
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>

            {/* Phone Field */}
            <FormControl isInvalid={errors.phone} isRequired>
              <Flex flexDirection={{ base: 'column', lg: 'row' }}>
                <FormLabel htmlFor="phone" w={{ lg: "30%" }} mt={{ base: 0, lg: 2 }}>
                  Téléphone
                </FormLabel>
                <Input
                  id="phone"
                  name="phone"
                  w={{ lg: "50%" }}
                  type="text"
                  {...register('phone', {
                    required: 'Téléphone est requis', // Validation: Field is required
                    pattern: {
                      value: /^(77|78|70|76|75)\d{7}$/, // Validation pattern for phone numbers
                      message: 'Téléphone est invalide', // Error message if pattern doesn't match
                    }
                  })}
                  _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
                />
              </Flex>
              {/* Display error message if validation fails */}
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>

            {/* Address Field */}
            <FormControl isInvalid={errors.address} isRequired>
              <Flex flexDirection={{ base: 'column', lg: 'row' }}>
                <FormLabel htmlFor="address" w={{ lg: "30%" }} mt={{ base: 0, lg: 2 }}>
                  Adresse
                </FormLabel>
                <Input
                  id="address"
                  name="address"
                  w={{ lg: "50%" }}
                  type="text"
                  {...register(
                    'address', 
                    { 
                      required: 'Adresse est requise', // Validation: Field is required
                      maxLength: {
                        value: 50, // Maximum length validation
                        message: 'Adresse ne doit pas dépasser 50 caractères'
                      }
                    }
                  )}
                  _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
                />
              </Flex>
              {/* Display error message if validation fails */}
              <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
            </FormControl>
          </Flex>

          {/* Navigation Buttons */}
          <Flex gap={3} direction={{base: 'column', md: 'row'}} mt={6}>
            <Button onClick={handlePrev} bg={secondaryBtnBgColor} _hover={{ bgColor: 'gray.800' }}>
              Précédent
            </Button>
            <Button type="submit" bg={primaryColor}>
              Suivant
            </Button>
          </Flex>
        </form>
      </Box>
    </section>
  );
};

export default DashboardPurchaseOwner;

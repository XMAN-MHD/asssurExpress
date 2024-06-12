import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Flex, Heading, Text, FormControl, FormLabel, Input, Textarea, Button, FormErrorMessage } from '@chakra-ui/react';

const ContactUs = () => {
  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
    // Add your form submission logic here
  };

  return (
    <Box as="section" pt={20} pb={5} px={{ base: '10', md: '59' }} bg="gray.50">
      <Heading fontSize={{ base: '2xl', md: '5xl' }} fontWeight="bold" mb={10}>
        Contactez-Nous
      </Heading>
      <Text fontSize="lg" mb={10}>
        Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter en remplissant le formulaire ci-dessous.
      </Text>
      <Flex as="form" direction="column" gap={5} onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <FormControl id="name" isInvalid={errors.name} isRequired>
          <FormLabel>Nom</FormLabel>
          <Input
            type="text"
            placeholder="Votre nom"
            {...register('name', { required: 'Le nom est requis' })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        
        {/* Email Field */}
        <FormControl id="email" isInvalid={errors.email} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Votre email"
            {...register('email', {
              required: 'L\'email est requis',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Adresse email invalide'
              }
            })}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        
        {/* Message Field */}
        <FormControl id="message" isInvalid={errors.message} isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            placeholder="Votre message"
            {...register('message', { required: 'Le message est requis' })}
          />
          <FormErrorMessage>{errors.message && errors.message.message}</FormErrorMessage>
        </FormControl>
        
        {/* Submit Button */}
        <Button type="submit" colorScheme="blue" size="lg" w="full">
          Envoyer
        </Button>
      </Flex>
    </Box>
  );
};

export default ContactUs;

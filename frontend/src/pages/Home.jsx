import React from 'react';
import {Box, Heading, Button} from '@chakra-ui/react';

function Home() {
    return (
        <Box textAlign='center'>
            <Heading>Home</Heading>
            <Button 
                color='white' 
                bg='#25D366'
                sx={{
                    ':hover': {
                      bg: '#1a9447', // Change this to your desired hover color
                    },
                }}
            >
                Cliquer Moi
            </Button>
        </Box>
    )
}

export default Home;

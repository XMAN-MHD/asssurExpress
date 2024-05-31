// src/theme.js
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const colors = {
  primary: {
    main: '#25D366',
    50: '#e3f2ec',
    100: '#c5e4cf',
    200: '#a2d4b0',
    300: '#7ac18e',
    400: '#47ad6c',
    500: '#25D366', // main brand color
    600: '#1cba54',
    700: '#158e41',
    800: '#0e632f',
    900: '#07361d',
  },
};

const components = {
  Input: {
    baseStyle: {
      field: {
        _focus: {
          borderColor: 'primary.500',
          outline: 'none',
        },
      },
    },
  },
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: 'none',
      },
      _active: {
        bg: 'primary.700',
      },
    },
  },
};

const theme = extendTheme(
  { colors, components },
  withDefaultColorScheme({ colorScheme: 'primary' })
);

export default theme;

export const colors = {
  // Brand Colors
  primary: {
    DEFAULT: '#00C7BD', // Your turquoise dot color
    hover: '#00B0A7',
    light: '#E6FAF9',
    dark: '#00A49B',
  },
  
  // Text Colors
  text: {
    primary: '#1A2322',    // Main text
    secondary: '#323736',   // Secondary text
    tertiary: '#525A59',      // Tertiary text
    link: '#D64A0E',       // Link color from your design
  },
  
  // Button Colors
  button: {
    primary: {
      bg: '#0A705E',       // Default button background
      hover: '#085D4E',    // Button hover state
      text: '#FFFFFF',     // Button text
    },
    secondary: {
      bg: '#F5F5F5',
      hover: '#E5E5E5',
      text: '#1A1A1A',
    },
  },
  
  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F7F7F7',
    tertiary: '#F3F3F3',
  },
  
  // Border Colors
  border: {
    light: '#E5E5E5',
    DEFAULT: '#D1D1D1',
    dark: '#B3B3B3',
  },
  
  // Status Colors
  status: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
};

// Common spacing values
export const spacing = {
  section: {
    sm: '2rem',     // 32px
    md: '3rem',     // 48px
    lg: '4rem',     // 64px
    xl: '6rem',     // 96px
  },
};

// Typography styles
export const typography = {
  heading: {
    h1: 'text-4xl font-serif mb-8',
    h2: 'text-3xl font-serif mb-6',
    h3: 'text-2xl font-serif mb-4',
    h4: 'text-xl font-serif mb-3',
  },
  body: {
    large: 'text-lg text-text-primary',
    regular: 'text-base text-text-primary',
    small: 'text-sm text-text-secondary',
    tiny: 'text-xs text-text-muted',
  },
};

// Common button styles
export const buttons = {
  primary: `
    bg-button-primary-bg
    text-button-primary-text
    px-4
    py-2
    rounded
    hover:bg-button-primary-hover
    transition-colors
  `,
  secondary: `
    bg-button-secondary-bg
    text-button-secondary-text
    px-4
    py-2
    rounded
    hover:bg-button-secondary-hover
    transition-colors
  `,
}; 
export const colors = {
  // Text Colors (from the image)
  text: {
    muted: '#6D5950',      // Brownish-grey
    dark: '#4E220F',       // Dark reddish-brown  
    normal: '#3D2F28',     // Dark brown
    accent: '#D64A0E',     // Vibrant orange
  },
  
  // General Colors (from the image)
  color: {
    accent: '#D64A0E',     // Same vibrant orange
  },
  
  // Background Colors
  background: {
    primary: '#FAF7F2',    // Light beige background
    secondary: '#F7F7F7',
    tertiary: '#F3F3F3',
  },
  
  // Legacy colors (keeping for compatibility)
  primary: {
    DEFAULT: '#D64A0E',    // Updated to match accent
    hover: '#B83A0A',
    light: '#FDF2F0',
    dark: '#A83208',
  },
  
  // Button Colors
  button: {
    primary: {
      bg: '#D64A0E',
      hover: '#B83A0A',
      text: '#FFFFFF',
    },
    secondary: {
      bg: '#F5F5F5',
      hover: '#E5E5E5',
      text: '#3D2F28',
    },
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

  // Surface Colors
  surface: {
    light: '#FFFFFF',
    DEFAULT: '#F7F7F7',
    dark: '#1A1A1A',
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
    h1: 'text-4xl font-serif font-bold mb-8 text-text-dark',
    h2: 'text-3xl font-serif mb-6 text-text-dark',
    h3: 'text-xl font-serif mb-4 text-text-dark',
    h4: 'text-xl font-serif mb-3 text-text-dark',
  },
  body: {
    large: 'text-xl text-text-normal',
    medium: 'text-lg text-text-normal',
    regular: 'text-base text-text-normal',
    small: 'text-sm text-text-muted',
    tiny: 'text-xs text-text-muted',
  },
};

// Common button styles
export const buttons = {
  primary: `
    bg-color-accent
    text-white
    px-4
    py-2
    rounded
    hover:bg-primary-hover
    transition-colors
  `,
  secondary: `
    bg-button-secondary-bg
    text-text-normal
    px-4
    py-2
    rounded
    hover:bg-button-secondary-hover
    transition-colors
  `,
}; 
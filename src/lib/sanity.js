import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '2tsgrdzc',
  dataset: 'production',
  apiVersion: '2024-03-28',
  useCdn: false,
  token: process.env.REACT_APP_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
  perspective: 'published',
  stega: {
    enabled: false
  }
}); 
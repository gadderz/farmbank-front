'use client'
 
import React from 'react'
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@emotion/react';
import { THEME } from '../../styles/BaseTheme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
 
const App = dynamic(() => import('../../App'), { ssr: false })
 
export function ClientOnly() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={THEME}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

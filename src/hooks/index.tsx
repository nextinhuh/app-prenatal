import React from 'react';

import { ConsultProvider } from './consults';
import { ThemeProvider } from './theme';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider>
    <ConsultProvider>{children}</ConsultProvider>
  </ThemeProvider>
);

export default AppProvider;

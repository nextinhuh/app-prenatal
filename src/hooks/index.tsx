import React from 'react';

import { ConsultProvider } from './consults';

const AppProvider: React.FC = ({ children }) => (
  <ConsultProvider>{children}</ConsultProvider>
);

export default AppProvider;

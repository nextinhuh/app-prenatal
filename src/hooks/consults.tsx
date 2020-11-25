import React, { createContext, useCallback, useState, useContext } from 'react';

interface ConsultContextData {
  updateConsultId(id: string): void;
  consultId: string;
}

const ConsultContext = createContext<ConsultContextData>(
  {} as ConsultContextData,
);

export const ConsultProvider: React.FC = ({ children }) => {
  const [consultId, setConsultId] = useState<string>('');

  const updateConsultId = useCallback(
    (id: string) => {
      setConsultId(id);
    },
    [setConsultId],
  );

  return (
    <ConsultContext.Provider value={{ consultId, updateConsultId }}>
      {children}
    </ConsultContext.Provider>
  );
};

export function useConsult(): ConsultContextData {
  const context = useContext(ConsultContext);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
}

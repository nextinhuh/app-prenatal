import React, { createContext, useCallback, useState, useContext } from 'react';

interface ConsultContextData {
  updateConsultId(id: string): void;
  consultId: string;
  updateUserStatus(status: UserStatus): void;
  userStatus: UserStatus;
}

interface UserStatus {
  userName: string;
}

const ConsultContext = createContext<ConsultContextData>(
  {} as ConsultContextData,
);

export const ConsultProvider: React.FC = ({ children }) => {
  const [consultId, setConsultId] = useState<string>('');
  const [userStatus, setUserStatus] = useState<UserStatus>({} as UserStatus);

  const updateConsultId = useCallback(
    (id: string) => {
      setConsultId(id);
    },
    [setConsultId],
  );

  const updateUserStatus = useCallback(
    (userStatus: UserStatus) => {
      setUserStatus(userStatus);
    },
    [setUserStatus],
  );

  return (
    <ConsultContext.Provider
      value={{ consultId, updateConsultId, userStatus, updateUserStatus }}
    >
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

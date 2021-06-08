import React, { createContext, useCallback, useState, useContext } from 'react';

interface ThemeContextData {
  updateThemeColor(color: ThemeData): void;
  color: ThemeData;
  logged: boolean;
  updateLogged(status: boolean): void;
}

interface ThemeData {
  colorOne?: string | undefined | any;
  colorTwo?: string | undefined | any;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {
  const [color, setColor] = useState<ThemeData>({} as ThemeData);
  const [logged, setlogged] = useState<boolean>(false);

  const updateThemeColor = useCallback(
    (color: ThemeData) => {
      setColor(color);
    },
    [setColor],
  );

  const updateLogged = useCallback(
    (status: boolean) => {
      setlogged(status);
    },
    [setlogged],
  );

  return (
    <ThemeContext.Provider
      value={{ color, updateThemeColor, logged, updateLogged }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
}

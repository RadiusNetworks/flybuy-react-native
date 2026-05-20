import React, {createContext, useContext, useMemo} from 'react';

type AppStateValue = {
  selectedToken: string;
  selectedAppAuthId: string;
};

const AppStateContext = createContext<AppStateValue | null>(null);

type Props = {
  selectedToken: string;
  children: React.ReactNode;
};

export function AppStateProvider({selectedToken, children}: Props) {
  const selectedAppAuthId = useMemo(
    () => selectedToken.split('.')[0] ?? '',
    [selectedToken],
  );

  const value = useMemo(
    () => ({selectedToken, selectedAppAuthId}),
    [selectedToken, selectedAppAuthId],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
}

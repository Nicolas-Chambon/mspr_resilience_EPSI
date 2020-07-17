import { createContext, useContext } from 'react';

export const AuthContext = createContext(undefined, undefined);

export function useAuth() {
  return useContext(AuthContext);
}

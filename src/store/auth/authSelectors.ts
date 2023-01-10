import { RootState } from 'store';

export const selectIsAuthenticated = (state:RootState) => (
  state.auth.isAuthenticated
);

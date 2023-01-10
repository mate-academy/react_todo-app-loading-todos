import { createAsyncThunk } from '@reduxjs/toolkit';
import StorageService from 'services/StorageService';
import { usersActions } from 'store/users/usersSlice';
import { authActions } from './authSlice';

const AuthAsync = {
  // Check authenticated
  checkAuthenticated: createAsyncThunk(
    'auth/checkAuthenticated',
    async (_, thunkApi) => {
      const user = StorageService.getUser();

      if (user) {
        thunkApi.dispatch(usersActions.setCurrentUser(user));
        thunkApi.dispatch(authActions.setAuthenticated(true));
      } else {
        thunkApi.dispatch(authActions.setAuthenticated(false));
      }
    },
  ),
  // Sign out
  signOut: createAsyncThunk('auth/signOut', async (_, thunkApi) => {
    StorageService.removeUser();
    thunkApi.dispatch(usersActions.setCurrentUser(null));
    thunkApi.dispatch(authActions.setAuthenticated(false));
  }),
};

export default AuthAsync;

import { createAsyncThunk } from '@reduxjs/toolkit';
import User from 'models/User';
import StorageService from 'services/StorageService';
import { HttpClient } from 'utilities/HttpClient';

const endpoint = '/users';

const UsersAsync = {
  // Fetch user
  fetchUser: createAsyncThunk('users/fetchUser', async (email: string) => {
    const users = await HttpClient.get<User[]>(`${endpoint}?email=${email}`);
    const user = users[0] || null;

    if (user) {
      StorageService.setUser(user);
    }

    return user;
  }),
  // Create user
  createUser: createAsyncThunk('users/createUser', async (data: User) => {
    const user = await HttpClient.post<User>(endpoint, data);

    StorageService.setUser(user);

    return user;
  }),
};

export default UsersAsync;

import { client } from '../utils/fetchClient';

export const getUsers = () => client.get('/users');

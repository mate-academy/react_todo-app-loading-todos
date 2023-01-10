import User from 'models/User';

const StorageService = {
  getUser: () => {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  },
  setUser: (user: User) => {
    return localStorage.setItem('user', JSON.stringify(user));
  },
  removeUser: () => {
    localStorage.removeItem('user');
  },
};

export default StorageService;

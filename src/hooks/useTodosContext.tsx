import { useContext } from 'react';
import { TodosContext } from '../context/TodoContext';

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }

  return context;
};

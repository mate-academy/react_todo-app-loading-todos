import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Todo, TodoPatchProps } from '../../types';

import server from '../../api/todos';
import ErrorsContext from '../Errors/ErrorsContext';

type State = {
  todos: Todo[];
};

const StateContext = React.createContext<State | null>(null);

type Contract = {
  addTodo: (title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  updateTodo: (id: number, props: TodoPatchProps) => Promise<void>;
  clearComplete: () => Promise<void>;
};

const ContractContext = React.createContext<Contract | null>(null);

const Provider = ({ children }: PropsWithChildren) => {
  const { raiseError } = ErrorsContext.useContract();

  const [todos, setTodos] = useState([] as Todo[]);

  useEffect(() => {
    server
      .getTodos()
      .then(setTodos)
      .catch(() => raiseError('Unable to load todos'));
  }, [raiseError]);

  const state: State = {
    todos,
  };

  const contract: Contract = {
    addTodo: async (title: string) => {
      const knownData = {
        title,
        userId: server.USER_ID,
        completed: false,
      };

      // set up mock item
      setTodos(prev => [
        ...prev,
        {
          ...knownData,
          id: -1, // mock id
        },
      ]);

      try {
        const { id } = await server.addTodo(knownData);

        // replace mock with real thing
        setTodos(prev =>
          prev.map(item => (item.id === -1 ? { ...knownData, id } : item)),
        );
      } catch {
        raiseError('Unable to add a todo');

        // remove mock item on error
        setTodos(prev => prev.filter(item => item.id >= 0));
      }
    },

    deleteTodo: async (id: number) => {
      try {
        await server.deleteTodo(id);
      } catch {
        raiseError('Unable to delete a todo');
      }

      setTodos(prev => prev.filter(todo => todo.id !== id));
    },

    updateTodo: async (id, props) => {
      try {
        await server.updateTodo(id, props);
      } catch {
        raiseError('Unable to update a todo');
      }

      setTodos(prev =>
        prev.map(item => (item.id === id ? { ...item, ...props } : item)),
      );
    },

    clearComplete: async () => {
      const completedIds = todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);

      for (const id of completedIds) {
        try {
          await server.deleteTodo(id);

          setTodos(prev => prev.filter(todo => todo.id !== id));
        } catch {
          raiseError('Unable to delete a todo');
        }
      }
    },
  };

  return (
    <StateContext.Provider value={state}>
      <ContractContext.Provider value={contract}>
        {children}
      </ContractContext.Provider>
    </StateContext.Provider>
  );
};

export default {
  Provider,
  useState: () => useContext(StateContext) as State,
  useContract: () => useContext(ContractContext) as Contract,
};

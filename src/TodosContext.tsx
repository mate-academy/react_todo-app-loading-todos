import React, { useEffect, useState } from 'react';
import { Todo } from './services/types';
import { Filter } from './services/enums';
import {
  getTodos,
} from './api/todos';

const USER_ID = 11138;

interface FilterParams {
  filterBy?: Filter,
}

function filterTodosByCompleted(todos: Todo[], filter: Filter): Todo[] {
  let todosCopy = [...todos];

  switch (filter) {
    case (Filter.ACTIVE): {
      todosCopy = todosCopy.filter(todo => !todo.completed);
      break;
    }

    case (Filter.COMPLETED): {
      todosCopy = todosCopy.filter(todo => todo.completed);
      break;
    }

    default: {
      break;
    }
  }

  return todosCopy;
}

function filterTodos(todos: Todo[], { filterBy }: FilterParams): Todo[] {
  let todosCopy = [...todos];

  if (filterBy) {
    todosCopy = filterTodosByCompleted(todos, filterBy);
  }

  return todosCopy;
}

interface ContextProps {
  todos: Todo[],
  visibleTodos: Todo[],
  isTodosHasCompleted: () => boolean,
  isEveryTodoCompleted: () => boolean,
  filterBy: Filter,
  setFilterBy: (newFilter: Filter) => void,
  errorMessage: string,
}

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  visibleTodos: [],
  isTodosHasCompleted: () => false,
  isEveryTodoCompleted: () => false,
  filterBy: Filter.ALL,
  setFilterBy: () => {},
  errorMessage: '',
});

interface ProviderProps {
  children: React.ReactNode,
}

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(Filter.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const visibleTodos = filterTodos(todos, { filterBy });

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load the data');

        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const isTodosHasCompleted = () => {
    return todos.some(todo => todo.completed);
  };

  const isEveryTodoCompleted = () => {
    return todos.every(todo => todo.completed);
  };

  const value = {
    todos,
    visibleTodos,
    isTodosHasCompleted,
    isEveryTodoCompleted,
    filterBy,
    setFilterBy,
    errorMessage,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

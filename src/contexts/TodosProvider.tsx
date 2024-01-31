import React, { useEffect, useMemo, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { TodoAction } from '../types/TodoAction';
import { FilterOptions } from '../types/FilterOptions';
import { getTodos } from '../api/todos';
import { USER_ID } from '../constants/USER_ID';

interface Props {
  children: React.ReactNode,
}

type Action = {
  type: TodoAction.Update | TodoAction.Add | TodoAction.Delete,
  todo: Todo
} | {
  type: TodoAction.SetTodos,
  todos: Todo[],
} | {
  type: TodoAction.ClearCompleted
} | {
  type: TodoAction.SetFilterOptions,
  filterOptions: FilterOptions,
} | {
  type: TodoAction.setError,
  errorMessage: string,
};

interface State {
  todos: Todo[],
  filterOptions: FilterOptions,
  errorMessage: string,
}

function reducer(
  state: State,
  action: Action,
): State {
  switch (action.type) {
    case TodoAction.Add: {
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    }

    case TodoAction.Delete: {
      const newTodos = state.todos.filter(currentTodo => ((
        currentTodo.id !== action.todo.id)));

      return {
        ...state,
        todos: newTodos,
      };
    }

    case TodoAction.Update: {
      const todoCopy = [...state.todos];
      const editedTodoIndex
        = todoCopy.findIndex(currentTodo => (
          currentTodo.id === action.todo.id));

      todoCopy[editedTodoIndex] = action.todo;

      return {
        ...state,
        todos: todoCopy,
      };
    }

    case TodoAction.ClearCompleted: {
      return {
        ...state,
        todos: state.todos.filter(({ completed }) => !completed),
      };
    }

    case TodoAction.SetTodos: {
      return {
        ...state,
        todos: action.todos,
      };
    }

    case TodoAction.SetFilterOptions: {
      return {
        ...state,
        filterOptions: action.filterOptions,
      };
    }

    case TodoAction.setError: {
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    }

    default:
      return state;
  }
}

export const TodosContext = React.createContext({
  errorMessage: '',
  todos: [] as Todo[],
  filterOptions: FilterOptions.All,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: (_action: Action) => { },
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    filterOptions: FilterOptions.All,
    errorMessage: '',
  });

  useEffect(() => {
    getTodos(USER_ID)
      .then(todos => dispatch({
        type: TodoAction.SetTodos,
        todos,
      }))
      .catch(() => {
        dispatch({
          type: TodoAction.setError,
          errorMessage: 'Unable to load todos',
        });
      });
  }, []);

  const value = useMemo(() => {
    return {
      todos: state.todos,
      filterOptions: state.filterOptions,
      errorMessage: state.errorMessage,
      dispatch,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

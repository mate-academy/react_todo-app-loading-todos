/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useReducer } from 'react';

import { getTodos } from '../../api/todos';

import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { TodoError } from '../../types/TodoError';

const USER_ID = 11722;

enum ReducerActions {
  LoadTodos = 'loadTodos',
  AddTodo = 'addTodo',
  UpdateTodo = 'updateTodo',
  DeleteTodo = 'deleteTodo',
  FilterTodo = 'filterTodo',
  AddTodoError = 'addTodoError',
  ClearTodoErrors = 'clearTodoErrors',
}

interface Action {
  type: ReducerActions;
  payload?: any;
}

interface State {
  initialTodos: Todo[];
  visibleTodos: Todo[];
  filter: Filter;
  todoError: TodoError | null;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ReducerActions.LoadTodos:
      return {
        ...state,
        initialTodos: action.payload,
        visibleTodos: action.payload,
      };

    case ReducerActions.FilterTodo: {
      const filteredTodos = state.initialTodos.filter(todo => {
        switch (action.payload) {
          case Filter.Active:
            return !todo.completed;

          case Filter.Completed:
            return todo.completed;

          case Filter.All:
          default:
            return true;
        }
      });

      return {
        ...state,
        visibleTodos: filteredTodos,
      };
    }

    case ReducerActions.AddTodoError:
      return {
        ...state,
        todoError: action.payload,
      };

    case ReducerActions.ClearTodoErrors:
      return {
        ...state,
        todoError: null,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export const actionCreator = {
  load: (payload: Todo[]) => ({ type: ReducerActions.LoadTodos, payload }),
  add: (payload: Todo) => ({ type: ReducerActions.AddTodo, payload }),
  update: (payload: Todo) => ({ type: ReducerActions.UpdateTodo, payload }),
  delete: (payload: Todo) => ({ type: ReducerActions.DeleteTodo, payload }),
  filter: (payload: Filter) => ({ type: ReducerActions.FilterTodo, payload }),
  // eslint-disable-next-line max-len
  addError: (payload: TodoError) => ({ type: ReducerActions.AddTodoError, payload }),
  clearErrors: () => ({ type: ReducerActions.ClearTodoErrors }),
};

const initialState: State = {
  initialTodos: [],
  visibleTodos: [],
  filter: Filter.All,
  todoError: null,
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line max-len
export const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode;
};

export const TodoAppContext: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(actionCreator.clearErrors());
    getTodos(USER_ID)
      .then(todos => dispatch(actionCreator.load(todos)))
      .catch(() => {
        dispatch(actionCreator.addError(TodoError.ErrorLoad));
        setTimeout(() => (
          dispatch(actionCreator.clearErrors())
        ), 3000);
      });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

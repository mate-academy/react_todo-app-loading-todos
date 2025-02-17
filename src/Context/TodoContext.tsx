import React, { createContext, ReactNode, useEffect, useReducer } from 'react';
import { FILTERS, FilterType } from '../types/Filters';
import { Todo, TodoBase } from '../types/Todo';
import { Action, ACTIONS } from '../types/Actions';
import {
  addTodo,
  renameTodo,
  deleteTodo,
  toggleTodo,
  toggleAll,
  deleteCompleted,
  getTodos,
} from '../api/todos';
import { useNotification } from './NotificationContext';

type State = {
  todos: Todo[];
  filter: FilterType;
  isLoading: boolean;
  isError: boolean;
};

type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
  handleAddTodo: (todo: TodoBase) => Promise<void>;
  handleRenameTodo: (id: number, newTitle: string) => void;
  handleDeleteTodo: (id: number) => void;
  handleToggleTodo: (id: number, completed: boolean) => void;
  handleToggleAll: () => void;
  handleDeleteCompleted: () => void;
};

export const TodosContext = createContext<Context>({
  state: { todos: [], filter: FILTERS.ALL, isLoading: false, isError: false },
  dispatch: () => {},
  handleAddTodo: async () => Promise.resolve(),
  handleRenameTodo: () => {},
  handleDeleteTodo: () => {},
  handleToggleTodo: () => {},
  handleToggleAll: () => {},
  handleDeleteCompleted: () => {},
});

export const todosReducer = (state: State, action: Action): State => {
  const { todos } = state;
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_TODOS:
      return { ...state, todos: payload };

    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: payload };

    case ACTIONS.SET_ERROR:
      return { ...state, isError: payload, isLoading: false };

    case ACTIONS.ADD_TODO:
      return { ...state, todos: [...todos, payload] };

    case ACTIONS.UPDATE_ID: {
      const { tempId, id } = payload;

      return {
        ...state,
        todos: todos.map(todo => (todo.id === tempId ? { ...todo, id } : todo)),
      };
    }

    case ACTIONS.DELETE_TODO:
      return { ...state, todos: todos.filter(todo => todo.id !== payload.id) };

    case ACTIONS.RENAME_TODO: {
      const { id, title } = payload;

      return {
        ...state,
        todos: todos.map(todo => (todo.id === id ? { ...todo, title } : todo)),
      };
    }

    case ACTIONS.DELETE_TODO: {
      const { id } = payload;

      return { ...state, todos: todos.filter(todo => todo.id !== id) };
    }

    case ACTIONS.TOGGLE_TODO:
      const { id } = payload;

      return {
        ...state,
        todos: todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      };

    case ACTIONS.TOGGLE_ALL:
      const isTodosCompleted = todos.every(todo => todo.completed);

      if (isTodosCompleted) {
        return {
          ...state,
          todos: todos.map(todo => {
            return { ...todo, completed: false };
          }),
        };
      }

      return {
        ...state,
        todos: todos.map(todo => {
          return { ...todo, completed: true };
        }),
      };

    case ACTIONS.DELETE_COMPLETED:
      return { ...state, todos: todos.filter(todo => !todo.completed) };

    case ACTIONS.SET_FILTER:
      return { ...state, filter: payload };

    default:
      return state;
  }
};

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todosReducer, {
    todos: [],
    filter: FILTERS.ALL,
    isLoading: false,
    isError: false,
  });

  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      try {
        const fetchedTodos = await getTodos();

        dispatch({ type: ACTIONS.SET_TODOS, payload: fetchedTodos });
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: true });
        showNotification('Unable to load todos');
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    };

    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTodo = async (todo: TodoBase) => {
    const tempId = +new Date();
    const tempTodo: Todo = { ...todo, id: tempId };

    const createdTodo = await addTodo({ ...todo });

    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: { ...tempTodo, id: createdTodo.id },
    });
  };

  const handleDeleteTodo = async (id: number) => {
    const prevTodos = state.todos;

    dispatch({
      type: ACTIONS.SET_TODOS,
      payload: prevTodos.filter(todo => todo.id !== id),
    });

    try {
      await deleteTodo(id);
    } catch (error) {
      dispatch({ type: ACTIONS.SET_TODOS, payload: prevTodos });
    }
  };

  const handleDeleteCompleted = async () => {
    const prevTodos = state.todos;
    const filteredTodos = prevTodos.filter(todo => !todo.completed);

    dispatch({
      type: ACTIONS.SET_TODOS,
      payload: filteredTodos,
    });

    try {
      await deleteCompleted(prevTodos);
    } catch (error) {
      dispatch({ type: ACTIONS.SET_TODOS, payload: prevTodos });
    }
  };

  const handleRenameTodo = async (id: number, newTitle: string) => {
    const prevTodos = state.todos;

    dispatch({
      type: ACTIONS.SET_TODOS,
      payload: prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      ),
    });

    try {
      await renameTodo(id, newTitle);
    } catch (error) {
      dispatch({ type: ACTIONS.SET_TODOS, payload: prevTodos });
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    const prevTodos = state.todos;

    dispatch({
      type: ACTIONS.SET_TODOS,
      payload: prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo,
      ),
    });

    try {
      await toggleTodo(id, completed);
    } catch (error) {
      dispatch({ type: ACTIONS.SET_TODOS, payload: prevTodos });
    }
  };

  const handleToggleAll = async () => {
    const prevTodos = state.todos;
    const allCompleted = prevTodos.every(todo => todo.completed);
    const updatedTodos = prevTodos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    dispatch({
      type: ACTIONS.SET_TODOS,
      payload: updatedTodos,
    });

    try {
      await toggleAll(prevTodos);
    } catch (error) {
      dispatch({ type: ACTIONS.SET_TODOS, payload: prevTodos });
    }
  };

  return (
    <TodosContext.Provider
      value={{
        state,
        dispatch,
        handleAddTodo,
        handleRenameTodo,
        handleDeleteTodo,
        handleToggleTodo,
        handleToggleAll,
        handleDeleteCompleted,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

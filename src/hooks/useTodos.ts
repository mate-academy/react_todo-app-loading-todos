import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FormEvent,
} from 'react';

import {
  USER_ID,
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from '../api/todos';

import { useErrors } from './useErrors';

import { Errors } from '../types/Errors';
import { Todo } from '../types/Todo';

type AddTodoAndSubmitFunction = (
  e: FormEvent<HTMLFormElement>,
  todo: Todo,
  setTodo: Dispatch<SetStateAction<Todo>>,
  tempTodo: Todo,
) => void;

export interface TodosContextValue {
  todos: Todo[];
  isLoading: boolean;
  errors: Errors;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setErrors: Dispatch<SetStateAction<Errors>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  loadingIds: number[];
  triggerError: (errorKey: keyof Errors) => void;
  addTodoAndSubmit: AddTodoAndSubmitFunction;
  deletingTodo: (todoId: number) => void;
  updatingTodo: (updatedTodo: Todo) => void;
  toggleAllTodos: () => void;
}

export const useTodos = (): TodosContextValue => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [errors, triggerError, setErrors] = useErrors({
    titleError: false,
    loadingError: false,
    addTodoError: false,
    updateTodoError: false,
    deleteTodoError: false,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      if (USER_ID) {
        setIsLoading(true);
        try {
          const todosData = await getTodos();

          setTodos(todosData);
        } catch {
          triggerError('loadingError');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTodos();
  }, []);

  const addTodoAndSubmit = async (
    e: FormEvent<HTMLFormElement>,
    todo: Todo,
    setTodo: Dispatch<SetStateAction<Todo>>,
    tempTodo: Todo,
  ) => {
    e.preventDefault();
    if (!todo.title.trim()) {
      triggerError('titleError');

      return;
    }

    // const tempId = Date.now();
    // const tempTodoItem = { ...todo, id: tempId };

    // setTodos(prev => [...prev, tempTodoItem]);

    setIsLoading(true);
    try {
      const newTodo = await addTodo(todo);

      setTodos(prev => [...prev, newTodo]);
      setTodo(tempTodo);
    } catch {
      triggerError('addTodoError');
    } finally {
      setIsLoading(false);
    }
  };

  const deletingTodo = async (todoId: number) => {
    setLoadingIds(prev => [...prev, todoId]);
    try {
      await deleteTodo(todoId);
      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
    } catch {
      triggerError('deleteTodoError');
    } finally {
      setLoadingIds(prev => prev.filter(id => id !== todoId));
    }
  };

  const updatingTodo = async (updatedTodo: Todo) => {
    setLoadingIds(prev => [...prev, updatedTodo.id]);
    try {
      const todoUpdated = await updateTodo(updatedTodo);

      setTodos(currentTodos =>
        currentTodos.map(todo =>
          todo.id === updatedTodo.id ? todoUpdated : todo,
        ),
      );
    } catch {
      triggerError('updateTodoError');
    } finally {
      setLoadingIds(prev => prev.filter(id => id !== updatedTodo.id));
    }
  };

  const toggleAllTodos = async () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setLoadingIds(todos.map(todo => todo.id));

    try {
      await Promise.all(updatedTodos.map(todo => updateTodo(todo)));
      setTodos(updatedTodos);
    } catch {
      triggerError('updateTodoError');
    } finally {
      setLoadingIds([]);
    }
  };

  return {
    todos,
    setTodos,
    isLoading,
    setIsLoading,
    errors,
    triggerError,
    setErrors,
    loadingIds,
    addTodoAndSubmit,
    deletingTodo,
    updatingTodo,
    toggleAllTodos,
  };
};

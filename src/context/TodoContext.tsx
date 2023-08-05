import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FilterBy';
import * as todosService from '../api/todos';

type TodoContext = {
  todos: Todo[],
  filteringBy: Todo[],
  filterBy: FilterBy,
  newTodoId: number | null,
  isLoading: boolean,
  errorMessage: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setFilterBy: (v: FilterBy) => void,
  deleteTodo: (todoId: number) => void,
  setIsLoading: (state: boolean) => void,
  updateTodo: (updatedTodo: Todo) => void,
  setNewTodoId: (v: number) => void,
  setErrorMessage: (error: string) => void,
};

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  filteringBy: [],
  filterBy: FilterBy.ALL,
  newTodoId: null,
  isLoading: false,
  errorMessage: '',
  setTodos: () => { },
  setFilterBy: () => {},
  deleteTodo: () => {},
  setIsLoading: () => {},
  updateTodo: () => {},
  setNewTodoId: () => {},
  setErrorMessage: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.ALL);
  const [errorMessage, setErrorMessage] = useState('');
  const [newTodoId, setNewTodoId] = useState<number>(0); // ???
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    todosService.getTodos(todosService.USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage('load');
        throw error;
      })
      .finally(() => {
        setErrorMessage('');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const filteringBy = useMemo(() => {
    switch (filterBy) {
      case FilterBy.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterBy.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filterBy, todos]);

  const updateTodo = async (todoToUpdate: Todo) => {
    setNewTodoId(todoToUpdate.id);

    try {
      const updatedTodo = await todosService
        .updateTodo(todoToUpdate.id, todoToUpdate) as Todo;

      const findIndexTodo = [...todos]
        .findIndex(todo => todo.id === todoToUpdate.id);

      setTodos((currentTodos: Todo[]): Todo[] => {
        const newTodos = [...currentTodos];

        newTodos.splice(findIndexTodo, 1, updatedTodo);

        return newTodos;
      });
    } catch (error) {
      setErrorMessage('update');
      throw error;
    } finally {
      setNewTodoId(0);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const deleteTodo = async (todoId: number) => {
    setNewTodoId(todoId);

    try {
      await todosService.deleteTodo(todoId);

      setTodos((currentTodos: Todo[]) => (
        currentTodos.filter(todo => todo.id !== todoId)
      ));
    } catch (error) {
      setErrorMessage('delete');
      throw error;
    } finally {
      setNewTodoId(0);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const todoState = useMemo(() => ({
    todos,
    filteringBy,
    filterBy,
    newTodoId,
    isLoading,
    errorMessage,
    setTodos,
    setFilterBy,
    deleteTodo,
    setIsLoading,
    updateTodo,
    setNewTodoId,
    setErrorMessage,
  }), [todos, filterBy]);

  return (
    <TodosContext.Provider value={todoState}>
      {children}
    </TodosContext.Provider>
  );
};

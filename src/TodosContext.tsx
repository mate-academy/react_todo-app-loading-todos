import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import * as postService from './api/todos';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  todos: Todo[];
  selectedFilter: Selected;
  loader: boolean;
  errorMessage: string;
  loadPost: () => void;
  setSelectedFilter: (value: Selected) => void;
  showFilteredTodos: (value: Selected) => Todo[];
  setTodos: (prevTodos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleTodoCompleted: (id: number, completed: boolean) => void;
  editTodo: (id: number, title: string) => void;
  setErrorMessage: (value: string) => void;
};

enum Selected {
  'all',
  'active',
  'completed',
}

export const TodosContext = React.createContext<ContextType>({
  todos: [],
  selectedFilter: Selected.all,
  loader: false,
  errorMessage: '',
  loadPost: () => {},
  setSelectedFilter: () => Selected.all,
  showFilteredTodos: () => [],
  setTodos: () => [],
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodoCompleted: () => {},
  editTodo: () => {},
  setErrorMessage: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Selected>(Selected.all);

  const loadPost = () => {
    setLoader(true);

    postService
      .getTodos()
      .then(res => {
        const sortBack = res.sort((a, b) => b.id - a.id);

        setTodos(sortBack);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    loadPost();
  }, []);

  const showFilteredTodos = (value: Selected): Todo[] => {
    switch (value) {
      case Selected.active:
        return todos.filter(item => !item.completed);
      case Selected.completed:
        return todos.filter(item => item.completed);
      default:
        return todos;
    }
  };

  const addTodo = ({ userId, title, completed }: Todo) => {
    return postService
      .addTodo({ userId, title, completed })
      .then(newTodo => {
        setTodos(currentTodos => [newTodo, ...currentTodos]);
      })
      .catch(error => {
        setErrorMessage('Unable to add a todo');
        throw error;
      });
  };

  const deleteTodo = (id: number) => {
    postService.deleteTodo(id);

    setTodos(todos.filter(currentTodo => currentTodo.id !== id));
  };

  const toggleTodoCompleted = (id: number, completed: boolean) => {
    postService
      .toggleCompleted(id, completed)
      .catch(() => setErrorMessage('Unable to update a todo'));
  };

  const editTodo = (id: number, title: string) => {
    postService.editTodo(id, title);
  };

  const value = useMemo(
    () => ({
      todos,
      selectedFilter,
      loader,
      errorMessage,
      loadPost,
      setSelectedFilter,
      showFilteredTodos,
      setTodos,
      addTodo,
      deleteTodo,
      toggleTodoCompleted,
      editTodo,
      setErrorMessage,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todos, selectedFilter],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

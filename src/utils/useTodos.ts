import { useEffect, useState } from 'react';
import { getTodos } from '../api/todos';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { FilterStatus } from '../types/ToDoFilterProps';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [query, setQuery] = useState<string>('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // функція для встановлення ерорів
  const showError = (type: 'load' | 'add' | 'delete' | 'update' | 'empty') => {
    const messages = {
      load: 'Unable to load todos',
      add: 'Unable to add a todo',
      delete: 'Unable to delete a todo',
      update: 'Unable to update a todo',
      empty: 'Title should not be empty',
    };

    setErrorMessage(messages[type]);

    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  // завантаження тудушок з апі
  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((loadedTodos: Todo[]) => {
        setTodos(loadedTodos);
        setFilteredTodos(loadedTodos);
        setErrorMessage(null);
      })
      .catch(() => {
        showError('load');
      })
      .finally(() => setIsLoading(false));
  }, []);

  // фільтрація тудушок при зміні тудушок, значення, відфільтрованого стану
  useEffect(() => {
    let result = [...todos];

    if (query) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (filterStatus === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (filterStatus === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    // console.log('Filter status:', filterStatus);
    // console.log('Query:', query);
    // console.log('Todos count:', todos.length);
    // console.log('Filtered todos count:', result.length);

    setFilteredTodos(result);
  }, [todos, query, filterStatus]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsLoadingUser(true);
  };

  const onSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedTodoId(todo.id);
    setIsLoadingUser(true);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setIsLoadingUser(false);
    setSelectedTodoId(null);
  };

  // додавання нової тудушки
  const handleAddTodo = (title: string) => {
    if (!title.trimStart()) {
      showError('empty');

      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      userId: selectedUser ? selectedUser.id : 1,
      title,
      completed: false,
    };

    setTodos(prev => [newTodo, ...prev]);
  };

  // обробка сабміту форми
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    handleAddTodo(query);
    setQuery('');
  };

  // перемикання стану всіх тудушок
  const onToggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  // перемикання статусу конкретної тудушки
  const handleToggleStatus = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // видалення тудушки
  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    showError('delete');
  };

  return {
    todos,
    isLoading,
    selectedTodo,
    selectedUser,
    selectedTodoId,
    isLoadingUser,
    filterStatus,
    query,
    filteredTodos,
    setQuery,
    setFilterStatus,
    handleSelectTodo,
    handleCloseModal,
    setSelectedTodoId,
    onSelectTodo,
    handleAddTodo,
    handleDelete,
    handleToggleStatus,
    onFormSubmit,
    onToggleAll,
    isHovered,
    setIsHovered,
    errorMessage,
    setErrorMessage,
    showError,
  };
};

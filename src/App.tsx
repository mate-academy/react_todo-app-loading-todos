/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/header';
import { TodoList } from './components/todoList';
import { Footer } from './components/footer';
import { Error } from './components/Error';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const newTodoInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [newTodo, setNewTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newFilter, setNewFilter] = useState<Filter>(Filter.All);
  const [isActive] = useState<number>();
  const todosLeft = todos.filter(todo => !todo.completed).length;
  const [isLoading, setIsLoading] = useState(false);
  const [todoClear, setTodoClear] = useState<boolean>(false);

  const loadTodos = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const todosData = await getTodos();

      setTodos(todosData);
    } catch (error) {
      setErrorMessage('Unable to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    setTodoClear(todos.some(todo => todo.completed)); // Тепер відображається, коли є завершені todo
  }, [todos]);

  useEffect(() => {
    if (newTodoInputRef.current) {
      newTodoInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') {
      setErrorMessage('Title should not be empty');
      newTodoInputRef.current?.focus();
    } else {
      setNewTodo('');
      setErrorMessage('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (newFilter === Filter.All) {
      return true;
    }

    if (newFilter === Filter.Active) {
      return !todo.completed;
    }

    if (newFilter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header
        handleSubmit={handleSubmit}
        newTodoInputRef={newTodoInputRef}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
      />

      {todos.length > 0 && (
        <TodoList
          filteredTodos={filteredTodos}
          isActive={isActive}
          isLoading={isLoading}
        />
      )}

      {todos.length > 0 && (
        <Footer
          todoClear={todoClear}
          newFilter={newFilter}
          setNewFilter={setNewFilter}
          todosLeft={todosLeft}
        />
      )}
      <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};

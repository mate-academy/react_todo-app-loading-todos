/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import {
  getTodos, createTodo, updateMarkTodo, deleteTodo,
} from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [error, setError] = useState<ErrorType>('');
  const [filter, setFilter] = useState<Filter>('all');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const getTodosFromServer = async () => {
    if (!user) {
      return;
    }

    try {
      const result = await getTodos(user.id);

      setTodos(result);
    } catch (err: unknown) {
      throw new Error('Networ Error');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const showError = (err: ErrorType) => {
    setError(err);
    setTimeout(() => setError(''), 3000);
  };

  const filteredByCompleted = (isCompleted: boolean): Todo[] => (
    todos.filter(todo => todo.completed === isCompleted)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    try {
      const todo = await createTodo(user.id, todoTitle);

      setTodos(currTodos => [...currTodos, todo]);

      setTodoTitle('');
    } catch (err: unknown) {
      showError('add');
    }
  };

  const handleMarkChange = async (id: number, completed: boolean) => {
    try {
      await updateMarkTodo(id, completed);

      setTodos(currTodos => {
        return currTodos.map(prev => {
          const todo = { ...prev };

          if (todo.id === id) {
            todo.completed = !todo.completed;
          }

          return todo;
        });
      });
    } catch (err: unknown) {
      showError('update');
    }
  };

  const handleDeleteTodoClick = async (id: number) => {
    try {
      await deleteTodo(id);

      setTodos(currTodos => {
        return currTodos.filter(todo => todo.id !== id);
      });
    } catch (err: unknown) {
      showError('delete');
    }
  };

  const handleFilterClick = (value: Filter) => {
    setFilter(value);
  };

  const getFilterTodos = () => {
    switch (filter) {
      case 'active':
        return filteredByCompleted(false);

      case 'completed':
        return filteredByCompleted(true);

      default:
        return todos;
    }
  };

  const itemsLeft = filteredByCompleted(false).length;

  const visibleTodos = useMemo(
    getFilterTodos,
    [todos, filter],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          handleSubmit={handleSubmit}
          handleTitleChange={setTodoTitle}
          newTodoField={newTodoField}
          todoTitle={todoTitle}
        />

        <section className="todoapp__main" data-cy="TodoList">
          {todos.length > 0 && (
            <TodoList
              todos={visibleTodos}
              handleMarkChange={handleMarkChange}
              handleDeleteTodoClick={handleDeleteTodoClick}
            />
          )}
        </section>

        {todos.length > 0 && (
          <Footer
            itemsLeft={itemsLeft}
            filter={filter}
            handleFilterClick={handleFilterClick}
          />
        )}
      </div>

      <ErrorMessage
        error={error}
        setError={setError}
      />
    </div>
  );
};

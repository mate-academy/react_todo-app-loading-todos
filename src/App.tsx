import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  deleteCompleted,
  deleteTodo,
  getTodos,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Selected } from './types/Selected';
import { ErrorMessage } from './types/ErrorMessage';
import { Filter } from './types/Filter';

const filters: Filter[] = [
  {
    title: 'All',
    value: 'all',
    href: '#/',
    dataCy: 'All',
  },
  {
    title: 'Active',
    value: 'active',
    href: '#/active',
    dataCy: 'Active',
  },
  {
    title: 'Completed',
    value: 'completed',
    href: '#/completed',
    dataCy: 'Completed',
  },
];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [selectedFilterLink, setSelectedFilterLink] = useState<Selected>('all');
  const [error, setError] = useState<string>('');

  const timerError = useRef<NodeJS.Timeout | null>(null);

  const filteredTodos = todos.filter(todo => {
    switch (selectedFilterLink) {
      case 'all':
        return true;

      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return false;
    }
  });

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const todosCounter = todos.reduce((curr, todo) => {
    return !todo.completed ? curr + 1 : curr;
  }, 0);

  const completedAllTodos = () => {
    setTodos(
      todos.map(todo => {
        const copyTodo = { ...todo };

        if (allCompleted) {
          copyTodo.completed = false;
        } else {
          copyTodo.completed = true;
        }

        return copyTodo;
      }),
    );
  };

  const hasCompletedTodos = todos.some(todo => todo.completed);

  function checkedTodoComleted(id: number, completed: boolean) {
    setError('');

    updateTodo(id, completed)
      .then(data => {
        setTodos(
          todos.map(todo => {
            if (data.id === id) {
              return data;
            }

            return todo;
          }),
        );
      })
      .catch(() => setError(ErrorMessage.Update));
  }

  function removeTodo(id: number) {
    setError('');

    deleteTodo(id)
      .then(() => {
        const newTodosWithOutDelete = todos.filter(todo => todo.id !== id);

        setTodos(newTodosWithOutDelete);
      })
      .catch(() => setError(ErrorMessage.Delete));
  }

  function clearCompleted() {
    setError('');

    deleteCompleted(true)
      .then(() => {
        const newTodoWithOutCompleted = todos.filter(todo => !todo.completed);

        setTodos(newTodoWithOutCompleted);
      })
      .catch(() => setError(ErrorMessage.Delete));
  }

  useEffect(() => {
    setError('');

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => setError(ErrorMessage.Load));
  }, []);

  useEffect(() => {
    if (error === '') {
      return;
    }

    if (timerError.current !== null) {
      clearTimeout(timerError.current);
    }

    timerError.current = setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      if (timerError.current === null) {
        return;
      }

      clearTimeout(timerError.current);
    };
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          completedAllTodos={completedAllTodos}
          allCompleted={allCompleted}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              checkedTodoComleted={checkedTodoComleted}
              removeTodo={removeTodo}
            />

            <Footer
              selectedFilterLink={selectedFilterLink}
              setSelectedFilterLink={setSelectedFilterLink}
              todosCounter={todosCounter}
              hasCompletedTodos={hasCompletedTodos}
              clearCompleted={clearCompleted}
              filters={filters}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error === '' ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        <p>{error}</p>
      </div>
    </div>
  );
};

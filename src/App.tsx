/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { Footer } from './Footer';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Filter.ALL);

  const setError = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const isAllCompleted = useMemo(() => {
    return todos.every(el => el.completed);
  }, [todos]);

  const isAllIncompleted = useMemo(() => {
    return todos.every(el => !el.completed);
  }, [todos]);

  const todosForView = useMemo(() => {
    switch (filter) {
      case Filter.ALL:
        return todos;
      case Filter.ACTIVE:
        return todos.filter(el => !el.completed);
      case Filter.COMPLETED:
        return todos.filter(el => el.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addNewTodo = (title: string) => {
    if (!title) {
      setError('Title should not be empty');

      return;
    }

    const ids = todos.map(el => el.id);

    const id = Math.max(...ids, 0) + 1;

    setTodos([
      ...todos,
      {
        id: id,
        title: title,
        userId: USER_ID,
        completed: false,
      },
    ]);
  };

  const handleCompleteTodo = (id: number) => {
    const newTodoList = todos.map(el => {
      return el.id !== id ? el : { ...el, completed: !el.completed };
    });

    setTodos(newTodoList);
  };

  const handleCleareCompleted = () => {
    const newTodoList = todos.map(el => {
      return {
        ...el,
        completed: false,
      };
    });

    setTodos(newTodoList);
  };

  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter(el => el.id !== id);

    setTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isAllCompleted={isAllCompleted} addNewTodo={addNewTodo} />
        {!isLoading && (
          <TodoList
            todos={todosForView}
            handleComplete={handleCompleteTodo}
            handleDelete={handleDeleteTodo}
          />
        )}

        {todos.length > 0 && (
          <Footer
            todosCount={todos.filter(el => !el.completed).length}
            isAllIncompleted={isAllIncompleted}
            filter={filter}
            clearCompleted={handleCleareCompleted}
            handleSetFilter={setFilter}
          />
        )}
      </div>

      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: errorMessage.length === 0 },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};

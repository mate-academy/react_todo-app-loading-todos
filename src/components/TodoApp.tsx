import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { UserWarning } from '../UserWarning';
import { USER_ID, getTodos } from '../api/todos';
import { FilterBy } from '../types';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { SetTodosContext, TodosContext } from './TodosContext';
import { Footer } from './Footer';

export const TodoApp: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState('All');

  const todos = useContext(TodosContext);
  const setTodos = useContext(SetTodosContext);

  const todosToShow = useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case FilterBy.Active:
          return !todo.completed;
        case FilterBy.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filterBy]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, [setTodos]);

  useEffect(() => {
    setErrorMessage('');
  }, [todos]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (errorMessage) {
      timeoutId = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  const handleFilterClick = (e: React.MouseEvent) => {
    setFilterBy(e.currentTarget.innerHTML);
  };

  const handleHideErrorMessage = useCallback(() => {
    setErrorMessage('');
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header setErrorMessage={setErrorMessage} />
        {todos.length !== 0 && (
          <>
            <TodoList todosToShow={todosToShow} />
            <Footer filterBy={filterBy} handleFilterClick={handleFilterClick} />
          </>
        )}
      </div>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          aria-label="hide error"
          onClick={handleHideErrorMessage}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};

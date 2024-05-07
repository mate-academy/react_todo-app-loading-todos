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
import { Filter } from '../types/Filter';
import { TodoList } from './TodoList';
import { TodosContext } from './Context';
import { Footer } from './Footer';
import { Header } from './Header';

export const TodoApp: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState('All');

  const { todos, setTodos } = useContext(TodosContext);

  const todosToShow = useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case Filter.Active:
          return !todo.completed;
        case Filter.Completed:
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
            <Footer filter={filterBy} handleFilterClick={handleFilterClick} />
          </>
        )}
      </div>
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
        {errorMessage}
      </div>
    </div>
  );
};

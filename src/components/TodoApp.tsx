import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { TodoContext } from '../TodoContext';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp: React.FC = () => {
  const { todos, todoLoadingError } = useContext(TodoContext);

  const hasErrors = todoLoadingError; // в будущем добавлю еще ошибки

  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    if (hasErrors) {
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
    }
  }, [hasErrors]);

  const closeNotification = () => {
    setErrorVisible(false);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {!!todos.length && (
          <>
            <TodoList />
            <TodosFilter />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorVisible },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          aria-label="hide error"
          onClick={closeNotification}
        />
        {todoLoadingError && (
          <>
            Unable to load todos
            {/* <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
          </>

        )}

      </div>
    </div>
  );
};

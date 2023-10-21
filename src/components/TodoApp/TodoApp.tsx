import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { UserWarning } from '../../UserWarning';
import { TodoList } from '../TodoList';
import { TodoContext } from '../TodoContext';
import * as todosServices from '../../api/todos';
import { ErrorMessage } from '../../types/ErrorMessage';
import { TodoFooter } from '../TodoFooter';
import { TodoErrorNotification } from '../TodoErrorNotification';

const USER_ID = 11708;

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    todosServices.getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.UnableLoad);

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, [setTodos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const allTodosActive = todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">

          {!!todos.length && (
            // eslint-disable-next-line
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: allTodosActive,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!!todos.length && (
          <>
            <TodoList />
            <TodoFooter />
          </>
        )}
      </div>

      {!!errorMessage.length && (
        <TodoErrorNotification
          errorMessage={errorMessage}
          closeWindow={() => setErrorMessage('')}
        />
      )}
    </div>
  );
};

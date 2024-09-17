import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todosApi from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getFilteredTodos } from './utils/getFilterTodos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { wait } from './utils/fetchClient';
import { Error } from './components/Error';
import { countIncompleteItems } from './utils/countIncompleteItems';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState<Status>(Status.All);

  const handleError = (message: string) => {
    setErrorMessage(message);
    wait(3000).then(() => {
      setErrorMessage('');
    });
  };

  useEffect(() => {
    todosApi
      .getTodos()
      .then(setTodos)
      .catch(() => {
        handleError(`Unable to load todos`);
      });
  }, []);

  const visibleTodos = getFilteredTodos([...todos], filter);

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  };

  if (!todosApi.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={handleTitleChange}
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <Footer
            itemsLeft={countIncompleteItems(todos)}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <Error
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

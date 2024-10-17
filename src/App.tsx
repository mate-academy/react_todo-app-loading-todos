import React, { useEffect, useState } from 'react';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { getFilteredTodos } from './utils/getFilter';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error/Error';
import { TypeError } from './types/TypeError';
import { SelectedType } from './types/SelectedType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<TypeError>(
    TypeError.DEFAULT,
  );
  const [selectedOption, setSelectedOption] = useState<SelectedType>(
    SelectedType.ALL,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(TypeError.LOADING));
  }, []);

  const filteredTodos = getFilteredTodos(todos, selectedOption);

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
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              todos={todos}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </>
        )}
      </div>

      <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};

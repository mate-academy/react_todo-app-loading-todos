import React, { useEffect, useState } from 'react';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { getFilteredTodos } from './utils/getFilterdTodos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { TypeError } from './types/TypeError';
import { SelectedType } from './types/SelectedType';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<TypeError>(
    TypeError.DEFAULT,
  );
  const [selectedOption, setSelectedOption] = useState<SelectedType>(
    SelectedType.ALL,
  );

  const filteredTodos = getFilteredTodos(todos, selectedOption);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(TypeError.LOADING));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

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

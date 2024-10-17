import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { Errors } from './types/Errors';
import { Filter } from './types/Filters';
import { getFilteredTodosByStatus } from './utils/getFilteredTodosByStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);

  const [errorMessage, setErrorMessage] = useState('');

  const filteredTodos = getFilteredTodosByStatus(todos, filter);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(Errors.LOADING));
  }, []);

  const countActiveTodos = todos.reduce((accum, todo) => {
    return !todo.completed ? accum + 1 : accum;
  }, 0);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              countActiveTodos={countActiveTodos}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

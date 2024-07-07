import React, { useEffect, useMemo, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filters } from './types';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filters>(Filters.All);
  const completedTodos = todos.reduce(
    (acc, curr) => (!curr.completed ? acc + 1 : acc),
    0,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  const filTodos = useMemo(() => {
    const filtrTodos = [...todos];

    switch (filter) {
      case Filters.Active:
        return filtrTodos.filter(todo => todo.completed === false);

      case Filters.Completed:
        return filtrTodos.filter(todo => todo.completed);

      case Filters.All:
      default:
        return filtrTodos;
    }
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList todos={filTodos} />

        {todos.length !== 0 && (
          <TodoFooter
            selectedFilter={filter}
            todosLeft={completedTodos}
            onChangeFilter={setFilter}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessage={setErrorMessage}
      />
    </div>
  );
};

import React, { useEffect, useMemo, useState } from 'react';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNotification';

import { TodoStatus } from './enums/TodoStatus';
import { ErrorMessage } from './enums/ErrorMessage';

import { getTodos } from './api/todos';

import { filterTodos } from './utils/filterTodos';

const USER_ID = 6522;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(TodoStatus.All);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.NONE);
  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userTodos = await getTodos(USER_ID);

      setTodos(userTodos);
    };

    fetchData().catch(() => {
      setErrorMessage(ErrorMessage.DOWNLOAD);
      setIsErrorShown(true);
    });
  }, []);

  const activeTodosQuantity = useMemo(
    () => todos.reduce((num, todo) => {
      return todo.completed ? num : num + 1;
    }, 0),
    [todos],
  );

  const filteredTodos = useMemo(
    () => filterTodos(todos, selectedFilter),
    [selectedFilter, todos],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            activeTodosQuantity={activeTodosQuantity}
            selectedFilter={selectedFilter}
            onFilterSelect={setSelectedFilter}
          />
        )}

        {isErrorShown && (
          <ErrorNotification
            errorMessage={errorMessage}
            onErrorClose={() => setIsErrorShown(false)}
          />
        )}
      </div>
    </div>
  );
};

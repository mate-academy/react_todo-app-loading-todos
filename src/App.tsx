import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Todo } from './types/Todo';
import { FILTER } from './types/Filter';
import { ERROR } from './types/ErrorMessage';

const filterByStatus = (todos: Todo[], selectedStatus: string) => {
  if (selectedStatus === FILTER.ACTIVE) {
    return todos.filter(todo => !todo.completed);
  }

  if (selectedStatus === FILTER.COMPLETED) {
    return todos.filter(todo => todo.completed);
  }

  return todos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>(FILTER.ALL);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const filteredTodos = filterByStatus(todos, selectedStatus);
  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ERROR.LOAD));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <Footer
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

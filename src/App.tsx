import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Filter } from './types/Filter';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');

        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return todos?.filter(todo => {
      return filter === 'all'
        ? true
        : filter === 'completed'
          ? todo.completed
          : !todo.completed;
    });
  }, [filter, todos]);

  const completedTodos = useMemo(() => {
    return todos?.filter(todo => !todo.completed);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isButtonActive={todos?.every(todo => todo.completed)} />

        {filteredTodos && <TodoList todos={filteredTodos} />}

        {todos && todos.length !== 0 && completedTodos && (
          <Footer
            numberOfCompletedTodos={completedTodos?.length}
            filter={filter}
            setFilter={setFilter}
            isClearButtonDisabled={todos.every(todo => !todo.completed)}
          />
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};

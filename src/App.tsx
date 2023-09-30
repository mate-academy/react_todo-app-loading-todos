/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { deleteTodo, getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { getPreparedTodos } from './components/TodosFilter/TodosFilter';
import { Query } from './types/Query';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { ErrorMessageEnum } from './types/ErrorMessageEnum';

const USER_ID = 11619;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<Query>('All');
  const [errorMessage, setErrorMessage] = useState<ErrorMessageEnum | ''>('');

  const preparedTodos = getPreparedTodos(todos, query);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessageEnum.TodoLoadError));
  }, []);

  const deleteAllTodos = () => {
    todos.forEach(todo => deleteTodo(todo.id));

    setTodos([]);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header setErrorMessage={setErrorMessage} />
        <TodoList
          todos={preparedTodos}
          setTodos={setTodos}
        />
        <Footer
          todos={todos}
          setQuery={setQuery}
          deleteAllTodos={deleteAllTodos}
        />
      </div>

      <ErrorMessage errorMessage={errorMessage} />

    </div>
  );
};

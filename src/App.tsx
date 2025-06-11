/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { StatusTodos } from './types/StatusTodos';

const prepereTodos = (todos: Todo[], statusTodos: StatusTodos) => {
  let preparedTodo = [...todos];

  switch (statusTodos) {
    case StatusTodos.Completed:
      preparedTodo = preparedTodo.filter(todo => todo.completed);
      break;
    case StatusTodos.Active:
      preparedTodo = preparedTodo.filter(todo => !todo.completed);
      break;
  }

  return preparedTodo;
};

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState(true);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [inputForAddTodo, setInputForAddTodo] = useState('');

  const [selectStatusTodos, setSelectStatusTodos] = useState(StatusTodos.All);

  const visibleTodos = prepereTodos(todos, selectStatusTodos);

  useEffect(() => {
    setLoadingTodos(true);
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      })
      .finally(() => setLoadingTodos(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          inputForAddTodo={inputForAddTodo}
          onChangeInput={setInputForAddTodo}
        />

        {/* This is a completed todo */}
        {loadingTodos ? (
          'Loading....'
        ) : (
          <TodoList visibleTodos={visibleTodos} />
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && !loadingTodos && (
          <Footer
            todos={todos}
            selectStatusTodos={selectStatusTodos}
            onChangeStatusTodos={setSelectStatusTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessage={setErrorMessage}
      />
    </div>
  );
};

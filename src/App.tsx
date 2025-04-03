/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { Footer } from './components/footer';
import { ErrorMessage, FilteredStatus, Todo } from './types/Todo';
import { Header } from './components/header';
import { TodoList } from './components/todoList';
import { ErrorsMessage } from './components/errorsMessage';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<FilteredStatus>(
    FilteredStatus.ALL,
  );
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.DEFAULT,
  );
  const [loading, setLoading] = useState(true);

  function loadTodo() {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.LOAD);
        setTimeout(() => {
          setErrorMessage(ErrorMessage.DEFAULT);
        }, 3000);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadTodo, []);

  const filteredTodo = todos.filter(todo => {
    switch (filteredStatus) {
      case FilteredStatus.ACTIVE:
        return !todo.completed;

      case FilteredStatus.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  });

  const deleteAllCompletedTodo = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {!loading && <TodoList filteredTodo={filteredTodo} />}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            filteredStatus={filteredStatus}
            setFilteredStatus={setFilteredStatus}
            deleteAllCompletedTodo={deleteAllCompletedTodo}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorsMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

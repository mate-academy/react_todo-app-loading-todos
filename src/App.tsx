/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FooterTodo } from './components/FooterTodo';
import { Header } from './components/HeaderTodo';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { FilteredBy } from './types/filteredBy';

const filter = (todos: Todo[], filteredBy: FilteredBy) => {
  if (filteredBy === FilteredBy.ALL) {
    return todos;
  }

  switch (filteredBy) {
    case FilteredBy.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case FilteredBy.COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [filteredBy, setFilteredBy] = useState(FilteredBy.ALL);

  useEffect(() => {
    setIsTodosLoading(true);
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setIsTodosLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = filter(todos, filteredBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header todos={todos} />
        {!isTodosLoading && !errorMessage && todos && (
          <TodoList todos={filteredTodos} />
        )}
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <FooterTodo
            todos={todos}
            filteredBy={filteredBy}
            setFilteredBy={setFilteredBy}
          />
        )}
      </div>
      <ErrorNotification
        message={errorMessage}
        onCloseNotification={setErrorMessage}
      />
    </div>
  );
};

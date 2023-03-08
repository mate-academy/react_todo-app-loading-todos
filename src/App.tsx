/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';

import { Todo } from './types/Todo';
import { FilteredBy } from './types/FilteredBy';
import { getTodos } from './api/todos';
import { Footer } from './Footer.tsx';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { Notifications } from './Notification';

const USER_ID = 6459;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [todoStatus, setTodoStatus] = useState<FilteredBy>(FilteredBy.ALL);
  const [errorFromServer, setErrorFromServer] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const todosToShow = useMemo(() => {
    return todos.filter(todo => {
      switch (todoStatus) {
        case FilteredBy.ALL:
          return true;

        case FilteredBy.ACTIVE:
          return !todo.completed;

        case FilteredBy.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, todoStatus]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setErrorFromServer(false);
      })
      .catch(() => {
        setErrorFromServer(true);
        setErrorMessage('upload');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          setQuery={setQuery}
          todos={todos}
        />

        {todos.length > 0 && (
          <>
            <TodoList todosToShow={todosToShow} />
            <Footer
              todosToShow={todosToShow}
              todoStatus={todoStatus}
              setTodoStatus={setTodoStatus}
            />
          </>
        )}
        <Notifications
          errorFromServer={errorFromServer}
          setErrorFromServer={setErrorFromServer}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToDisplay, setTodosToDisplay] = useState<Todo[]>([]);
  const [selectedValue, setSelectedValue] = useState('All');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });
  }, []);

  useEffect(() => {
    let viewList = todos;

    if (selectedValue === 'Active') {
      viewList = viewList.filter(todo => todo.completed === false);
    }

    if (selectedValue === 'Completed') {
      viewList = viewList.filter(todo => todo.completed === true);
    }

    setTodosToDisplay(viewList);
  }, [selectedValue, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={todosToDisplay} />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            selectedValue={(value: string) => setSelectedValue(value)}
            onSelect={selectedValue}
          />
        )}
      </div>

      <ErrorNotification isError={isError} />
    </div>
  );
};

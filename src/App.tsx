/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import ErrorMessage from './components/ErrorMessage';
import NewTodoInputField from './components/NewTodoInputField';
import TodosList from './components/TodosList';

import { TodoStatus } from './types/TodoStatus';
import FooterMenu from './components/FooterMenu';

const USER_ID = 10595;

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [status, setStatus] = useState<TodoStatus>('all');
  const [itemsLeft, setItemsLeft] = useState(0);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodosList(response);
        setVisibleTodos(response);
        setItemsLeft(response.filter(todo => todo.completed === false).length);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleFilterTodos = (newStatus: TodoStatus) => {
    setStatus(newStatus);

    switch (newStatus) {
      case 'completed':
        setVisibleTodos(todosList.filter(todo => todo.completed === true));
        break;
      case 'active':
        setVisibleTodos(todosList.filter(todo => todo.completed === false));
        break;
      default:
        setVisibleTodos(todosList);
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoInputField hasTodos={todosList.length > 0} />
        {todosList.length > 0 && (
          <>
            <section className="todoapp__main">
              <TodosList
                visibleTodos={visibleTodos}
              />
            </section>

            <FooterMenu
              handleFilterTodos={handleFilterTodos}
              status={status}
              itemsLeft={itemsLeft}
            />
          </>
        )}
      </div>
      {isError && <ErrorMessage handleSetError={setIsError} />}
    </div>
  );
};

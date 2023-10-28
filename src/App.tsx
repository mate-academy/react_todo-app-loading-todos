/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';

import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';

import { getTodos } from './api/todos';
import { USER_ID } from './utils/variables';
import { TodoList } from './components/TodoList';
import { TodosContext } from './components/TodosContext';

export const App: React.FC = () => {
  const {
    todos,
    setTodos,
    filteredTodos,
    setFilteredTodos,
    setIsLoadTodoError,
    setIsTitleEmpty,
  } = useContext(TodosContext);

  // const [isLoadTodoError, setIsLoadTodoError] = useState(true);
  // const [isTitleEmpty, setIsTitleEmpty] = useState(false);

  useEffect(() => {
    if (USER_ID) {
      getTodos(USER_ID)
        .then(todosFromServer => {
          setTodos(todosFromServer);
          setFilteredTodos(todosFromServer);
        })
        .catch(errorMessage => {
          // eslint-disable-next-line no-console
          console.log(errorMessage);
          setIsLoadTodoError(true);
          setTodos([]);
        });
    }
  }, [USER_ID]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={filteredTodos}
          onSetTodos={setFilteredTodos}
          setIsTitleEmpty={setIsTitleEmpty}
        />

        {!!todos.length && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              todos={todos}
              onSetTodos={setFilteredTodos}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification />
    </div>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState, FC } from 'react';
import { USER_ID as id, getTodos } from './api/todos';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import TodoList from './Components/TodoList/TodoList';
import Notification from './Components/Notification/Notification';
import Loader from './Components/Loader/Loader';
import { Todo } from './types/Todo';
import { Error, ErrorMessage } from './types/Error';
import { filterTodoList, getMountCompletedTodos } from './utils/filterTodoList';

export const App: FC = () => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [mountCompletedTodos, setMountCompletedTodos] = useState<number>(0);
  const [error, setErrorLoadTodo] = useState<Error>({
    status: false,
    message: ErrorMessage.NONE,
  });
  const [isLoader, setIsLoader] = useState<boolean>(true);

  useEffect(() => {
    getTodos(id)
      .then(todos => {
        setVisibleTodos(todos);
        setCurrentTodos(todos);
        setMountCompletedTodos(getMountCompletedTodos(todos));

        if (!todos.length) {
          setErrorLoadTodo({
            status: true,
            message: ErrorMessage.LOAD,
          });
        }
      })
      .catch(() => {
        setErrorLoadTodo({
          status: true,
          message: ErrorMessage.LOAD,
        });
        setVisibleTodos([]);
      })
      .finally(() => setIsLoader(false));
  }, []);

  const filterTodos = (filterBy: string): void => {
    setVisibleTodos(filterTodoList(currentTodos, filterBy));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {isLoader ? (
          <Loader />
        ) : (
          <TodoList todos={visibleTodos} />
        )}

        {!visibleTodos.length || (
          <Footer
            mountComplitedTodos={mountCompletedTodos}
            filterTodos={filterTodos}
          />
        )}
      </div>

      {error.status && (
        <Notification
          errorMessage={error.message}
          closeError={setErrorLoadTodo}
        />
      )}
    </div>
  );
};

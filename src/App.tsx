/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useEffect,
  useState,
} from 'react';
import { USER_ID as id, getTodos } from './api/todos';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import TodoList from './Components/TodoList/TodoList';
import Notification from './Components/Notification/Notification';
import Loader from './Components/Loader/Loader';
import { Todo } from './types/Todo';
import { Error, ErrorMessage } from './types/Error';
import { FilterType } from './types/FilterType';
import { filterTodoList, getMountCompletedTodos } from './utils/filterTodoList';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [amountCompletedTodos, setAmountCompletedTodos] = useState<number>(0);
  const [error, setErrorLoadTodo] = useState<Error>({
    status: false,
    message: ErrorMessage.NONE,
  });
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [filterTodosBy, setFilterTodos] = useState<FilterType>(FilterType.All);

  const visibleTodoList = filterTodoList(todos, filterTodosBy);

  useEffect(() => {
    getTodos(id)
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setAmountCompletedTodos(getMountCompletedTodos(todosFromServer));

        if (!todosFromServer.length) {
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
      })
      .finally(() => setIsLoader(false));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {isLoader ? (
          <Loader />
        ) : (
          <TodoList todos={visibleTodoList} />
        )}

        {!todos.length || (
          <Footer
            amountCompletedTodos={amountCompletedTodos}
            filterType={filterTodosBy}
            setFilterType={setFilterTodos}
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

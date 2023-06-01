/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { FilterValues } from './types/FilterValues';
import { ErrorValues } from './types/ErrorValues';
import { Notification } from './components/Notification';
import { ErrorContext } from './context/ErrorContextProvider';

const USER_ID = 10544;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState(FilterValues.All);

  const filteredTodos = (todos: Todo[], value: FilterValues) => {
    return todos.filter(todo => {
      switch (value as FilterValues) {
        case FilterValues.Completed:
          return todo.completed;
        case FilterValues.Active:
          return !todo.completed;
        case FilterValues.All:
        default:
          return true;
      }
    });
  };

  const errorContext = useContext(ErrorContext);

  useEffect(() => {
    getTodos(USER_ID)
      .then(res => {
        setTodosFromServer(res);
      })
      .catch(() => {
        errorContext.setErrorMessage(ErrorValues.Loading);
      });
  }, []);

  const todosAfterFilter = useMemo(() => {
    return filteredTodos(todosFromServer, filterValue);
  }, [todosFromServer, filterValue]);
  const countOfTodos = todosFromServer?.filter(todo => !todo.completed).length
    || 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header countOfTodos={countOfTodos} />
        {todosAfterFilter && (
          <>
            <TodoList todosAfterFilter={todosAfterFilter} />
            <Footer
              countOfTodos={countOfTodos}
              setFilterValue={setFilterValue}
            />
          </>
        )}
      </div>
      <Notification />
    </div>
  );
};

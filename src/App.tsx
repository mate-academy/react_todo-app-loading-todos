/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect, useMemo, useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { filteredTodoList } from './helpers';
import { Errors } from './components/Errors/Errors';
import { ErrorType } from './types/ErorTypes';

const USER_ID = 12036;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('');
  const [errorType, setErorType] = useState<ErrorType | null>(null);

  useEffect(() => {
    setErorType(null);
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErorType(ErrorType.LoadError);
      });
  }, []);

  const todosToView = useMemo(
    () => filteredTodoList(todos, filterBy),
    [todos, filterBy],
  );

  const closeError = useCallback(() => setErorType(null), []);
  const isAllTodosCompleted = todos.every(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isAllCompleted={isAllTodosCompleted}
        />

        {todosToView && (
          <TodoList
            todos={todosToView}
          />
        )}
        {todos && (
          <Footer
            onFilter={setFilterBy}
            todos={todosToView}
            filterBy={filterBy}
          />
        )}
      </div>
      {errorType
        && (
          <Errors
            error={errorType}
            onClose={closeError}
          />
        )}
    </div>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { FilterBy } from './types/FilterBy';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Filter } from './components/Filter';
import { TodoWarning } from './components/TodoWarning';

const USER_ID = 6401;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.all);

  const getTodosFromServer = useCallback(
    async () => {
      try {
        const todosList = await getTodos(USER_ID);

        setTodos(todosList);
      } catch (error) {
        setIsError(true);
      }
    }, [todos],
  );

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const allTodosCompleted = todos.every(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo
          allTodosCompleted={allTodosCompleted}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={todos}
              filterBy={filterBy}
            />

            <Filter
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          </>
        )}
      </div>

      {isError && (
        <TodoWarning
          isError={isError}
          setIsError={setIsError}
        />
      )}
    </div>
  );
};

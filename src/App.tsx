/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { TodoappHeader } from './Components/TodoappHeader';
import { TodoappList } from './Components/TodoappList';
import { TodoappFooter } from './Components/TodoappFooter';
import { Todo } from './types/Todo';
import { TodoappError } from './Components/TodoappError';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';

const USER_ID = 11828;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(Filter.ALL);
  const [isLoading, setIsLoading] = useState(true);
  const [todosError, setTodosError] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosData = await getTodos(USER_ID);

        setTodos(todosData);
      } catch (error) {
        setTodosError('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filterBy) {
      case Filter.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case Filter.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoappHeader />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <>
            <TodoappList todos={visibleTodos} />

            <TodoappFooter
              todos={todos}
              filterBy={filterBy}
              onFilterClick={setFilterBy}
            />
          </>
        )}
      </div>

      {/* Add the 'hidden' class to hide the message smoothly */}
      {!isLoading && (
        <TodoappError
          todosError={todosError}
          // onSetIsHidden={setIsHidden}
          // isHidden={isHidden}
        />
      )}
    </div>
  );
};

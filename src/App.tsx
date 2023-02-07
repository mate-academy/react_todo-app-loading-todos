/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { filteredTodos, activeTodosCount } from './helpers/functionsTodos';
import { NotificationTodo } from './Components/NotificationTodo';
import { TodoFooter } from './Components/TodoFooter';
import { TodoHeader } from './Components/TodoHeader';
import { TodoList } from './Components/TodoList';
import { Loader } from './Components/Loader';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
// import { Errors } from './types/Errors';

const USER_ID = 6211;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSelected, setIsSelected] = useState(true);
  const [filter, setFilter] = useState(Filter.All);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos(USER_ID);

        setTodos(loadedTodos);
      } catch (err) {
        throw new Error();
      } finally {
        setIsSelected(false);
      }
    };

    loadTodos();
  }, []);

  const visibeTodos = filteredTodos(todos, filter);
  const activeTodos = activeTodosCount(todos).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {isSelected && <Loader />}
        {visibeTodos.length > 0 && (
          <TodoList
            todos={visibeTodos}
          />
        )}

        {visibeTodos.length > 0 && (
          <TodoFooter
            setFilter={setFilter}
            filter={filter}
            activeTodos={activeTodos}
          />
        )}
      </div>

      <NotificationTodo
        setError={setError}
        error={error}
      />
    </div>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { getTodos } from './api/todos';
import { Header } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/TodoFooter/TodoFooter';
import { Error } from './components/TodoError/TodoError';

const USER_ID = 11859;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosError, setTodosError] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [filter, setFilter] = useState(Filter.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setTodosError('Unable to load todos');
        setIsHidden(false);
      });
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        case Filter.All:
        default:
          return true;
      }
    })
  ), [filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList
          todos={filteredTodos}
        />

        {todos.length > 0 && (
          <Footer
            todosArray={todos}
            setFilter={setFilter}
            filter={filter}
          />
        )}
      </div>

      <Error
        todosError={todosError}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
      />
    </div>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { NewTodo } from './components/NewTodo/NewTodo';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';

const USER_ID = 10338;

type IsCompleted = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedFilter, setCompletedFilter] = useState<IsCompleted>('all');
  const [isLoadingError, setIsLoadingError] = useState(false);

  const loadTodos = async () => {
    setIsLoadingError(false);
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setIsLoadingError(true);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoadingError(false), 3000);
  }, [todos]);

  const visibleTodos = todos.filter(todo => {
    switch (completedFilter) {
      case ('active'):
        return !todo.completed;

      case ('completed'):
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo />
        <TodoList todos={visibleTodos} />
        {todos.length !== 0 && (
          <Footer
            completedFilter={completedFilter}
            setCompletedFilter={setCompletedFilter}
            todos={todos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className={classNames('notification', 'is-danger', 'is-light',
        'has-text-weight-normal', { hidden: !isLoadingError })}
      >
        Unable to load a todo
        <button
          type="button"
          className="delete"
          onClick={() => setIsLoadingError(false)}
        />

        {/* show only one message at a time */}
        {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};

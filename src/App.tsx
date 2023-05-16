/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Sort } from './utils/Sort';
import { TodosList } from './components/TodosList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

const USER_ID = 10360;

export const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<Sort>(Sort.All);
  const [hasError, setHasError] = useState(false);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const sortingTodos = (type: Sort) => {
    switch (type) {
      case Sort.Active:
        return todos.filter(todo => !todo.completed);
      case Sort.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const isAnyActiveTodo = todos.some(todo => !todo.completed);
  const isAnyCompletedTodo = todos.some(todo => todo.completed);
  const itemsLeftToComplete = todos.filter(todo => !todo.completed).length;
  const sortedTodos = sortingTodos(sortType);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {isAnyActiveTodo && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(event) => {
                setNewTodo(event.target.value);
              }}
            />
          </form>
        </header>

        <TodosList todos={sortedTodos} />

        {todos.length > 0 && (
          <Footer
            itemsLeftToComplete={itemsLeftToComplete}
            isAnyCompletedTodo={isAnyCompletedTodo}
            sortType={sortType}
            setSortType={setSortType}
          />
        )}
      </div>

      {hasError && (
        <Error setHasError={setHasError} />
      )}
    </div>
  );
};

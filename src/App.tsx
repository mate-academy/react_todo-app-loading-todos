/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { getTodos } from './api/todos';

import { SortType } from './types/SortType';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.All);
  const [error, setError] = useState(false);

  const filteredTodo = [...todos].filter(todo => {
    switch (sortType) {
      case SortType.Active:
        return !todo.completed;
      case SortType.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  const loadFromServer = async () => {
    setError(false);

    try {
      if (user?.id) {
        const TodosFromServer = await getTodos(user.id);

        setTodos(TodosFromServer);
      }
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadFromServer();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList filteredTodo={filteredTodo} />

        {!!todos.length && (
          <Footer
            todos={todos}
            sortType={sortType}
            setSortType={setSortType}
          />
        )}
      </div>

      <ErrorMessage error={error} setError={setError} />
    </div>
  );
};

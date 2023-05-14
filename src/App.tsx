/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './component/TodoList';
import { Footer } from './component/Footer';
import { Error } from './component/Error';
import { FilterBy } from './types/typedefs';
import { getTodosByFilter } from './helpers';

const USER_ID = 10303; // 10363

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState(FilterBy.ALL);
  const [hasError, setHasError] = useState(true);

  const handleFilterTodos = useCallback((userFilter: FilterBy) => {
    setFilterTodos(userFilter);
  }, []);

  const handleHasError = useCallback(() => {
    setHasError(false);
  }, []);

  const prepareTodos = useMemo(() => {
    let visibleTodos = [...todos];

    if (filterTodos) {
      visibleTodos = getTodosByFilter(visibleTodos, filterTodos);
    }

    // if (query) {
    //   visibleTodos = visibleTodos.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));
    // }

    return visibleTodos;
  }, [filterTodos, todos]);

  useEffect(() => {
    getTodos(USER_ID).then(setTodos);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={prepareTodos} />

        <Footer
          todos={filterTodos}
          items={prepareTodos.length}
          onSelect={handleFilterTodos}
        />

      </div>

      <Error
        error={hasError}
        onError={handleHasError}
      />
    </div>
  );
};

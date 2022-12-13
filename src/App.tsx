/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotifications';
import { NewTodo } from './components/NewTodo';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filter';
import { Notifications } from './types/Notifications';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [notification, setNotification] = useState<Notifications | ''>('');
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    async function fetchTodos() {
      if (user) {
        const receivedTodos = await getTodos(user.id);

        setTodos(receivedTodos);
      }
    }

    fetchTodos();
  }, []);

  const filterTodos = (filterType: Filter) => {
    switch (filterType) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      case Filter.All:
      default:
        return todos;
    }
  };

  const filteredTodos = filterTodos(filter);
  const activeTodos = filterTodos(Filter.Active);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {filteredTodos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                { active: activeTodos.length === 0 },
              )}
            />
          )}
          <NewTodo newTodoField={newTodoField} />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              todos={todos}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>
      {notification && (
        <ErrorNotification
          notification={notification}
          resetNotification={() => setNotification('')}
        />
      )}
    </div>
  );
};

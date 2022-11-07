/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Footer } from './components/Footer/Footer';
import { Errors } from './components/Errors/Errors';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<Filter>(Filter.ALL);
  const [errors, setErrors] = useState(false);

  const getTodosFromServer = async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
        setErrors(false);
      } catch (error) {
        setErrors(true);

        setTimeout(() => {
          setErrors(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    getTodosFromServer();
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const visibleTodos = todos.filter(todo => {
    switch (filterType) {
      case Filter.ACTIVE:
        return !todo.completed;
      case Filter.COMPLETED:
        return todo.completed;
      default:
        return todo;
    }
  });

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

        {todos.length > 0 && (
          <TodoList todos={visibleTodos} />
        )}

        <Footer
          setFilterType={setFilterType}
          filterType={filterType}
          todos={visibleTodos}
          setTodos={setTodos}
        />
      </div>

      {errors && (
        <Errors setErrors={setErrors} errors={errors} />
      )}
    </div>
  );
};

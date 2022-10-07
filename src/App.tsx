/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { Errormessage } from './components/Auth/Errormessage';
import { Footer } from './components/Auth/Footer';
import { TodoList } from './components/Auth/TodoList';
import { getTodos } from './api/todos';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredSelect, setFilteredSelect] = useState(SortType.All);
  const [error, setError] = useState(false);

  const filteredTodo = [...todos].filter(todo => {
    switch (filteredSelect) {
      case SortType.Active:
        return !todo.completed;
      case SortType.Completed:
        return todo.completed;
      case SortType.All:
      default:
        return todo;
    }
  });

  const loadFromServer = async () => {
    setError(false);

    try {
      if (user?.id) {
        const TodoFromServer = await getTodos(user.id);

        setTodos(TodoFromServer);
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
        {todos.length > 0 && (
          <Footer
            todos={todos}
            setFilteredSelect={setFilteredSelect}
            filteredSelect={filteredSelect}
          />
        )}
      </div>

      <Errormessage error={error} setError={setError} />
    </div>
  );
};

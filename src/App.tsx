/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { SortType } from './types/SortType';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredBySelect, setFilteredBySelect] = useState(SortType.All);
  const [errorLoad, setErrorLoad] = useState(false);

  const filteredTodo = [...todos].filter(todo => {
    switch (filteredBySelect) {
      case SortType.Active:
        return !todo.completed;

      case SortType.Completed:
        return todo.completed;

      case SortType.All:
      default:
        return todo;
    }
  });

  const loadTodosFromServer = async () => {
    setErrorLoad(false);

    try {
      if (user?.id) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (error) {
      setErrorLoad(true);
    }
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodosFromServer();
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
            setFilteredBySelect={setFilteredBySelect}
            filteredBySelect={filteredBySelect}
          />
        )}
      </div>

      <ErrorNotification
        errorLoad={errorLoad}
        setErrorLoad={setErrorLoad}
      />
    </div>
  );
};

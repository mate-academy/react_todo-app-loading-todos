/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import Footer from './components/Footer/Footer';
import TodoList from './components/TodoList/TodoList';
import Warning from './components/Warning/warning';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromTheServer, setTodosFromTheServer] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [todosToShow, setTodosToShow] = useState([...todosFromTheServer]);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const filterTodos = (type: string) => {
    switch (type) {
      case 'COMPLETED': {
        const completedTodos = todosFromTheServer.filter(
          todo => todo.completed,
        );

        setTodosToShow(completedTodos);
        break;
      }

      case 'ACTIVE': {
        const activeTodos = todosFromTheServer.filter(
          todo => !todo.completed,
        );

        setTodosToShow(activeTodos);
        break;
      }

      default: {
        setTodosToShow(todosFromTheServer);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(gotTodos => {
        setTodosFromTheServer(gotTodos);
        setTodosToShow([...gotTodos]);
      })
      .catch(() => setErrorMessage('Unable to get todos'));
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
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

        {todosFromTheServer.length > 0 && (
          <>
            <TodoList todos={todosToShow} />

            <Footer
              left={todosFromTheServer.filter(todo => !todo.completed).length}
              onFilter={filterTodos}
            />
          </>
        )}
      </div>

      <Warning message={errorMessage} />
    </div>
  );
};

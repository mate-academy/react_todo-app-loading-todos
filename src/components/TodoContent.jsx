/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
import {
  useContext, useEffect, useState,
} from 'react';
import { TodoList } from './TodoList';
import { getTodos } from '../api/todos';
import { AuthContext } from './Auth/AuthContext';
import { Footer } from './Footer';

export const TodoContent = ({ newTodoField, setHasLoadingError }) => {
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then((fetchedTodos) => {
        setTodos(fetchedTodos);
        setVisibleTodos(fetchedTodos);
      })
      .catch(() => setHasLoadingError(true));
  }, []);

  return (
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

      <TodoList visibleTodos={visibleTodos} />
      <Footer
        setVisibleTodos={setVisibleTodos}
        todos={todos}
        visibleTodos={visibleTodos}
      />
    </div>
  );
};

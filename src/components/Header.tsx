import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createTodo } from '../api/todos';
import { AppContext } from './AppContext';
import { Todo } from '../types/Todo';

export const Header: React.FC = () => {
  const {
    user,
    loadTodos,
    setError,
    todosFromServer,
  } = useContext(AppContext);
  const userId = user?.id;

  const newTodoField = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const createTodoHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');

    if (userId) {
      const todo: Todo = {
        userId,
        title,
        completed: false,
      };

      try {
        await createTodo(userId, todo);
        loadTodos();
        setTitle('');
      } catch {
        setError('Unable to add a todo');
      }
    }
  };

  return (
    <header className="todoapp__header">
      {todosFromServer.length > 0 && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className="todoapp__toggle-all active"
          aria-label="toggle all"
        />
      )}

      <form onSubmit={createTodoHandler}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};

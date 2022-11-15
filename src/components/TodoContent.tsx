import {
  FC,
  useContext, useEffect, useState,
} from 'react';
import { TodoList } from './TodoList';
import { getTodos } from '../api/todos';
import { AuthContext } from './Auth/AuthContext';
import { Footer } from './Footer';
import { Todo } from '../types/Todo';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>,
  setHasLoadingError: React.Dispatch<React.SetStateAction<boolean>>,
};

export const TodoContent: FC<Props> = (
  {
    newTodoField, setHasLoadingError,
  },
) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
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
          aria-label="toggle"
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

      {visibleTodos.length > 0 && (
        <TodoList visibleTodos={visibleTodos} />
      )}
      <Footer
        setVisibleTodos={setVisibleTodos}
        todos={todos}
        visibleTodos={visibleTodos}
      />
    </div>
  );
};

import React, {
  useContext, useEffect, useState,
} from 'react';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { getTodos } from '../api/todos';
import { AuthContext } from './Auth/AuthContext';
import { Todo } from '../types/Todo';

type Props = {
  newTodoField: React.LegacyRef<HTMLInputElement> | undefined,
  // setHasError: (value: boolean) => void,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
};

export const TodoContent: React.FC<Props> = ({
  newTodoField, setHasError,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user?.id) {
      getTodos(user.id)
        .then(todo => {
          setTodos(todo);
          setHasError(false);
          setVisibleTodos(todo);
        })
        .catch(() => setHasError(true));
    }
  }, []);

  return (
    <div className="todoapp__content">
      <header className="todoapp__header">
        <button
          aria-label="ToggleAllButton"
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
        todos={todos}
        visibleTodos={visibleTodos}
        setVisibleTodos={setVisibleTodos}
      />
    </div>
  );
};

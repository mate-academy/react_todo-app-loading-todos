import cn from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { createTodo } from '../../api/todos';
import { USER_ID } from '../../constants/user';
import { DispatchContext, StateContext } from '../../State/State';
import { isCompletedTodo } from '../../services/todosServices';

export const Header = () => {
  const [todo, setTodo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  function handleOnSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!todo.length) {
      return;
    }

    setIsSubmitting(true);

    const newTodo = {
      title: todo.trim(),
      userId: USER_ID,
      completed: false,
    };

    createTodo(newTodo)
      .then(() => {
        dispatch({ type: 'updatedAt' });
        setTodo('');
        setIsSubmitting(false);
      })
      .catch(() => dispatch(
        { type: 'setError', payload: 'Unable to add a todo' },
      ));
  }

  const inputTodo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputTodo.current) {
      inputTodo.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: !isCompletedTodo(todos),
        })}
        data-cy="ToggleAllButton"
        aria-label="Set all"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleOnSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todo}
          onChange={event => setTodo(event.target.value)}
          disabled={isSubmitting}
          ref={inputTodo}
        />
      </form>
    </header>
  );
};

import {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { createTodo, updateTodo } from '../../api/todos';
import { USER_ID } from '../../constants/user';
import { DispatchContext, StateContext } from '../../State/State';
import { isActiveTodo } from '../../services/todosServices';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

export const Header = () => {
  const [todo, setTodo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { todos, todosStatus } = useContext(StateContext);
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

  function handleToggleAll() {
    const promises = todos.reduce((prev, el) => {
      switch (todosStatus) {
        case Filter.active:
          if (!el.completed) {
            return [
              ...prev,
              updateTodo({ completed: true, id: el.id }),
            ];
          }

          return prev;

        case Filter.completed:
          if (el.completed) {
            return [
              ...prev,
              updateTodo({ completed: false, id: el.id }),
            ];
          }

          return prev;

        default: return prev;
      }
    }, [] as Promise<Partial<Todo>>[]);

    dispatch({ type: 'setIsSubmitting', payload: true });

    Promise.all(promises)
      .then(() => {
        dispatch({
          type: 'setTodosStatus',
          payload: todosStatus === Filter.active
            ? Filter.completed
            : Filter.active,
        });
      })
      .finally(() => dispatch({
        type: 'setIsSubmitting',
        payload: false,
      }));
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
          active: isActiveTodo(todos),
        })}
        onClick={handleToggleAll}
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

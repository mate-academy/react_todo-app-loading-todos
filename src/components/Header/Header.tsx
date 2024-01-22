import { useContext, useState } from 'react';
import { createTodo } from '../../api/todos';
import { USER_ID } from '../../constants/user';
import { DispatchContext } from '../../State/State';

export const Header = () => {
  const [todo, setTodo] = useState('');
  const dispatch = useContext(DispatchContext);

  function handleOnSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!todo.length) {
      return;
    }

    const newTodo = {
      title: todo.trim(),
      userId: USER_ID,
      completed: false,
    };

    createTodo(newTodo)
      .then(() => {
        dispatch({ type: 'updatedAt' });
        setTodo('');
      })
      .catch(() => dispatch(
        { type: 'setError', payload: 'Unable to add a todo' },
      ));
  }

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
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
        />
      </form>
    </header>
  );
};

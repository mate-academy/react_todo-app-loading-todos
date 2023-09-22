import { useContext } from 'react';
import { NewTodoContext }
  from '../../providers/NewTodoProvider/NewTodoProvider';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const NewTodo = () => {
  const newTodoContext = useContext(NewTodoContext);

  const { handleSubmit, handleInput, todoInput } = newTodoContext;

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={() => handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoInput}
          onChange={handleInput}
        />
      </form>
    </header>
  );
};

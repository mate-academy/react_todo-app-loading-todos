/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID } from '../../App';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  onSubmit: (todo: Todo) => void;
};

export const InputForm: React.FC<Props> = ({ onSubmit }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const newTodo: Todo = {
        id: 0,
        title: newTodoTitle,
        userId: USER_ID,
        completed: false,
      };

      onSubmit(newTodo);
      setNewTodoTitle('');
    } catch (error) {
      throw new Error();
    } finally {
      console.log('handle submit newTodo', newTodoTitle);
    }
  }

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />
      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={event => {
            setNewTodoTitle(event.target.value);
          }}
        />
      </form>
    </header>
  );
};

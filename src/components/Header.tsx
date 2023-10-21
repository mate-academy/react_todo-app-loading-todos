import { FC } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  title: string;
  setTitle: (par: string) => void;
  addTodo: (par: Omit<Todo, 'id'>) => void;
  setErrorMessage: (par: string) => void;
};

export const Header: FC<Props> = ({
  title,
  addTodo,
  setTitle,
  setErrorMessage,
}) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        aria-label="close"
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim().length) {
            setErrorMessage('Title should not be empty');
            setTimeout(() => {
              setErrorMessage('');
            }, 3000);
          } else {
            addTodo({ title, completed: false, userId: 11641 });
            setTitle('');
          }
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};

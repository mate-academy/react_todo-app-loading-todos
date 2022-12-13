/* eslint-disable jsx-a11y/control-has-associated-label */

import { createTodo } from '../api/todos';
import { User } from '../types/User';

type Props = {
  user: User | null,
  title: string,
  changeTitle: (value: string) => void,
  newTodoField: React.RefObject<HTMLInputElement>,
};

export const Header: React.FC<Props> = (
  {
    user, title, changeTitle, newTodoField,
  },
) => {
  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user) {
      createTodo(title, user.id, false);
    }

    changeTitle('');
  };

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
      />

      <form
        onSubmit={addNewTodo}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => changeTitle(event.target.value)}
        />
      </form>
    </header>
  );
};

import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    inputValue: string,
  ) => Promise<void>;
  toggleAllTodosStatus: () => Promise<void>;
  todos: Todo[];
};

export const TodoForm: React.FC<Props> = ({
  onSubmit,
  toggleAllTodosStatus,
  todos,
}) => {
  const [inputValue, setInputValue] = useState('');

  const buttonStatus = useMemo(
    () => todos.every(todo => todo.completed === true),
    [todos],
  );

  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    inputValue: string,
  ) => {
    onSubmit(e, inputValue).then(() => setInputValue(''));
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: buttonStatus })}
        data-cy="ToggleAllButton"
        onClick={toggleAllTodosStatus}
      />

      <form onSubmit={e => handleOnSubmit(e, inputValue)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </form>
    </header>
  );
};

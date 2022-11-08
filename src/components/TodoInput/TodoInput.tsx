import { FC, useState } from 'react';
import cn from 'classnames';

type Props = {
  newTodoField: any | null;
  isAllTodosCompleted: boolean;
  handleSetNewTodoTitle: (newTitle: string) => void;
};

export const TodoInput: FC<Props> = ({
  newTodoField,
  isAllTodosCompleted,
  handleSetNewTodoTitle,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const resetNewTitle = () => {
    setNewTitle('');
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="ToggleAllButton"
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isAllTodosCompleted,
        })}
      />

      <form onSubmit={() => {
        if (newTitle) {
          handleSetNewTodoTitle(newTitle);
          resetNewTitle();
        }
      }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
        />
      </form>
    </>
  );
};

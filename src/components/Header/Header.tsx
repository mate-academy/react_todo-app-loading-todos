import React, { useEffect, useState } from 'react';
import cn from 'classnames';

interface Props {
  allTodos: number;
  checkTodoCompleted: () => number;
  handleToggleActivate: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  setNewTodoTitle: (value: React.SetStateAction<string>) => void;
  newTodoTitle: string;
  inputRef: React.RefObject<HTMLInputElement>;
  isSubmiting: boolean;
}

export const Header: React.FC<Props> = React.memo(
  ({
    allTodos,
    checkTodoCompleted,
    handleToggleActivate,
    handleSubmit,
    setNewTodoTitle,
    // newTodoTitle,
    inputRef,
    isSubmiting,
  }) => {
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
      setNewTodoTitle(inputValue);
    }, [setInputValue, setNewTodoTitle, inputValue]);

    return (
      <header className="todoapp__header">
        {Boolean(allTodos) && (
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: checkTodoCompleted(),
            })}
            data-cy="ToggleAllButton"
            onClick={handleToggleActivate}
          />
        )}

        <form
          onSubmit={e => {
            setInputValue('');
            handleSubmit(e);
          }}
        >
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            ref={inputRef}
            disabled={isSubmiting}
          />
        </form>
      </header>
    );
  },
);

Header.displayName = 'Header';

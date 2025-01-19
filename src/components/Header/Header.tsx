import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  todos: Todo[];
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  onAdd: (title: string) => Promise<void>;
  errorMessage: ErrorMessage;
  setErrorMessage: (error: ErrorMessage) => void;
  isInputDisabled: boolean;
  isTodoLoading: boolean;
};

export const Header: React.FC<Props> = props => {
  const {
    todos,
    onAdd,
    errorMessage,
    setErrorMessage,
    inputRef,
    isInputDisabled,
    isTodoLoading,
  } = props;

  const allTodoCompleted = todos.every(todo => todo.completed);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, isInputDisabled, isTodoLoading]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (errorMessage !== ErrorMessage.Default) {
      setErrorMessage(ErrorMessage.Default);
    }

    if (!title) {
      setErrorMessage(ErrorMessage.EmptyTitle);

      return;
    }

    return onAdd(title)
      .then(() => setTitle(''))
      .catch(() => {});
  }

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: allTodoCompleted })}
        data-cy="ToggleAllButton"
      />
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={isInputDisabled || isTodoLoading}
          //autoFocus
        />
      </form>
    </header>
  );
};

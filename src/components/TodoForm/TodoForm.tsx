import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (todo: Todo) => Promise<void>;
  makeAllTodosCompleted: (
    setAllTodoCompleted: (prev: boolean) => boolean,
  ) => void;
  isCompletedTodos: boolean;
};

export const TodoForm: React.FC<Props> = ({
  onSubmit,
  makeAllTodosCompleted,
  isCompletedTodos,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const reset = () => {
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      id: 0,
      title,
      userId: 0,
      completed: false,
    }).then(reset);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isCompletedTodos,
        })}
        aria-label="Change todos completed state"
        data-cy="ToggleAllButton"
        onClick={() => makeAllTodosCompleted(prevState => !prevState)}
      />

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};

import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { ErrorsEnum } from '../../enums/ErrorMessage';

import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  onAddTodo: (todo: Todo) => void;
  onSetErrorMessage: (message: string) => void;
  hasTodos: boolean;
  isAllTodoCompleted: boolean;
};

const TodoFormComponent = ({
  onAddTodo,
  onSetErrorMessage,
  hasTodos,
  isAllTodoCompleted,
}: Props) => {
  const [title, setTitle] = useState('');

  const newTodoField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    newTodoField.current?.focus();
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      onSetErrorMessage(ErrorsEnum.Title);

      return;
    }

    onAddTodo({ title, id: 0, completed: false, userId: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      {hasTodos && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', isAllTodoCompleted && 'active')}
          data-cy="ToggleAllButton"
        />
      )}

      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        ref={newTodoField}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </form>
  );
};

export const TodoForm = React.memo(TodoFormComponent);

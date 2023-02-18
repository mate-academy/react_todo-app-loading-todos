/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';

import { NewFormTodo } from '../NewFormTodo';

type Props = {
  isAllTodosActive: boolean,
  isTodosNotEmpty: boolean,
  title: string,
  onTitleChange: (newTitle: string) => void,
};

export const Header: React.FC<Props> = ({
  isAllTodosActive,
  isTodosNotEmpty,
  title,
  onTitleChange,
}) => {
  return (
    <header className="todoapp__header">

      {isTodosNotEmpty && (
        <button
          type="button"
          className={cn('todoapp__toggle-all',
            {
              active: isAllTodosActive,
            })}
        />
      )}

      <NewFormTodo
        title={title}
        onTitleChange={onTitleChange}
      />

    </header>
  );
};

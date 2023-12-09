import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { ErrorContext, ErrorsMessageContext } from './ErrorsContext';

type Props = {
  todos: Todo[] | undefined;
};

export const Header: React.FC<Props> = ({ todos }) => {
  const { setErrorsMesage } = useContext(ErrorsMessageContext);
  const [value, setValue] = useState('');
  const { setIsError } = useContext(ErrorContext);

  return (
    <header className="todoapp__header">
      {todos?.length && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className={cn('todoapp__toggle-all ', {
            active: !todos.some((el) => el.completed === false),
          })}
          data-cy="ToggleAllButton"
        />
      ) }
      {/* Add a todo on form submit */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.length <= 0) {
            setIsError(false);
            setErrorsMesage('empty');
          }
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onMouseDown={() => {
            setIsError(true);
          }}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </header>
  );
};

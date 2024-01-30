/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useContext, useState } from 'react';
import cn from 'classnames';
import { TodosContext, USER_ID } from '../Store/Store';
import { Todo } from '../../types/Todo';

type Props = {
  setHasTileErrorMessage: (arg: boolean) => void,
};

export const Header: React.FC<Props> = React.memo((
  { setHasTileErrorMessage },
) => {
  const {
    todos, setTodos, isCompletedAll, setIsCompletedAll,
  } = useContext(TodosContext);

  const [title, setTitle] = useState('');

  const hasToggle = todos.length > 0;

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const addTodo = useCallback((newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTileErrorMessage(!title.trim());

    if (!title.trim()) {
      return;
    }

    addTodo({
      id: +new Date(),
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    });

    setIsCompletedAll(null);
    setTitle('');
  };

  const handleCompletedAll = () => {
    setIsCompletedAll(!isCompletedAll);
  };

  return (
    <header className="todoapp__header">
      {hasToggle && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isCompletedAll })}
          data-cy="ToggleAllButton"
          onClick={handleCompletedAll}
        />
      )}

      <form
        onSubmit={handleSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitle}
        />
      </form>
    </header>
  );
});

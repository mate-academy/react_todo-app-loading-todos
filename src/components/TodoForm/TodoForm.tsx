import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todoList: Todo[];
  showErrorMessage: (message: string, delay?: number) => void;
};

export const TodoForm: React.FC<Props> = ({ todoList, showErrorMessage }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const areAllTodosCompleted = todoList?.every(todo => todo.completed);
  const newTodoRef = useRef<HTMLInputElement>(null);

  const handlerSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle === '') {
      showErrorMessage('Title should not be empty');

      return;
    }

    showErrorMessage('Unable to add a todo');

    setTodoTitle('');
  };

  useEffect(() => {
    if (newTodoRef.current) {
      newTodoRef.current.focus();
    }
  }, [todoList]);

  return (
    <header className="todoapp__header">
      {todoList.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handlerSubmitForm}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoRef}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={e => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};

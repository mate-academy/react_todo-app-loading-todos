/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { createTodo } from '../../api/todos';
import { USER_ID } from '../../utils/variables';

type Props = {
  todos: Todo[],
  onSetTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setIsTitleEmpty: Dispatch<SetStateAction<boolean>>,
};

export const Header: React.FC<Props> = ({
  todos,
  onSetTodos,
  setIsTitleEmpty,
}) => {
  const [inputValue, setInputValue] = useState('');

  const isAllCompletedTodos = todos.every(todo => todo.completed);

  const addTodo = ({ title, userId, completed }: Omit<Todo, 'id'>) => {
    createTodo({ title, userId, completed })
      .then(newTodo => {
        onSetTodos(currentTodos => [...currentTodos, newTodo]);
      });
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      setIsTitleEmpty(false);
    }

    addTodo({ title: inputValue, userId: USER_ID, completed: false });
  };

  return (
    <header className="todoapp__header">
      { !!todos.length && (
        <button
          type="button"
          data-cy="ToggleAllButton"
          className={cn(
            'todoapp__toggle-all',
            { active: isAllCompletedTodos },
          )}
        />
      )}

      <form onSubmit={handleSubmitForm}>
        <input
          data-cy="NewTodoField"
          value={inputValue}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => setInputValue(event.target.value)}
        />
      </form>
    </header>
  );
};

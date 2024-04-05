import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { StateContext } from '../../lib/TodosContext';
import type { Todo } from '../../types/Todo';
export const Header: FC = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const [isActiveButton, setIsActiveButton] = useState(false);

  const { todos, setTodos } = useContext(StateContext);

  useEffect(() => {
    setIsActiveButton(todos.every(todo => todo.completed));
  }, [todos]);

  const resetForm = () => {
    setTitle('');
  };

  const handleEnterForm = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (title.trim().length <= 0) {
        return;
      }

      resetForm();
    }
  };

  const handleAllChecked = () => {
    const newTodos: Todo[] = todos.map(todo => ({
      ...todo,
      completed: !isActiveButton,
    }));

    setTodos(newTodos);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={handleAllChecked}
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          ref={titleRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          onKeyDown={handleEnterForm}
          autoFocus={isFocused}
          onFocus={() => setIsFocused(!isFocused)}
          onBlur={() => setIsFocused(false)}
        />
      </form>
    </header>
  );
};

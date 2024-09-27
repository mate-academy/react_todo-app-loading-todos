import React, { useEffect, useRef } from 'react';

import { useTodos } from '../../hooks/useTodos';

const TodoInput: React.FC = () => {
  const { todos, setTodos } = useTodos();

  const [newTodoTitle, setNewTodoTitle] = React.useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const hangleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleAddTodo = () => {
    if (!newTodoTitle.trim()) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: +new Date(),
        userId: 285,
        title: newTodoTitle.trim(),
        completed: false,
      },
    ]);
    setNewTodoTitle('');
  };

  const handleEnterEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTodo();
    }
  };

  return (
    <header className="todoapp__header">
      <button
        aria-label="toggle all active todos"
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          value={newTodoTitle}
          ref={inputRef}
          type="text"
          data-cy="NewTodoField"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={hangleInputChange}
          onKeyDown={handleEnterEvent}
        />
      </form>
    </header>
  );
};

export default TodoInput;

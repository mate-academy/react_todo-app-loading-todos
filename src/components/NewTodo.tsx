import React, { useEffect, useRef } from 'react';
import { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';
import cn from 'classnames';
import { USER_ID } from '../api/todos';

export const NewTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, setError, dispatch } = useContext(TodoContext);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      setError('Title should not be empty');

      return;
    }

    if (title.trim().length > 0) {
      const addedTodo: Todo = {
        id: +new Date(),
        title: title.trim(),
        completed: false,
        userId: USER_ID,
      };

      setTitle('');

      dispatch({ type: 'addTodo', payload: addedTodo });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  // const completedTodos = todos.filter(todo => todo.completed === true);

  const allCompleted = todos.every(todo => todo.completed === true);

  const setAllCompleted = () => {
    if (allCompleted) {
      todos.map(todo => todo.completed === false);
    } else {
      todos.map(todo => todo.completed === true);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (allCompleted) {
      focusInput();
    }
  }, [allCompleted]);

  useEffect(() => {
    focusInput();
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allCompleted })}
          data-cy="ToggleAllButton"
          onClick={setAllCompleted}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          autoFocus
          className={cn('todoapp__new-todo', { active: allCompleted })}
          placeholder="What needs to be done?"
          value={title}
          ref={inputRef}
          onChange={handleFormChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
};

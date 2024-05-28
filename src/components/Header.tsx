import React, { useRef, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
}

const DEFAULT_USER_ID = 418;

export const Header: React.FC<Props> = ({ todos }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [todosState, setTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const allCompleted = todosState.every(todo => todo.completed);

    setIsAllCompleted(allCompleted);
  }, [todosState]);

  const handleToggleAll = () => {
    const allCompleted = todosState.every(todo => todo.completed);
    const newTodos = todosState.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(newTodos);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodoValue = inputRef.current?.value;

    if (newTodoValue) {
      const newTodo = {
        id: todosState.length + 1,
        userId: DEFAULT_USER_ID,
        title: newTodoValue,
        completed: false,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={handleToggleAll}
      />

      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
        />
      </form>
    </header>
  );
};

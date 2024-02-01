/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';
import { USER_ID } from '../constants';
import { createTodo } from '../api/todos';
import { Todo } from '../types/Todo';

export const getNextId = (todos: Todo[]) => {
  const ids = todos.map((todo) => todo.id);

  return Math.max(...ids) + 1;
};

export const Header:React.FC = () => {
  const [title, setTitle] = useState('');

  const {
    todos,
    setTodos,
    setErrorMessage,
  } = useContext(TodosContext);

  const uncompletedTodos = todos.filter(todo => !todo.completed).map(t => t.id);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!title) {
        setErrorMessage('Title should not be empty');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);

        return;
      }

      const newTodo = {
        userId: USER_ID,
        title,
        completed: false,
      };

      createTodo(newTodo)
        .then(
          (createdTodo: Todo) => setTodos((prev) => [...prev, createdTodo]),
        )
        .catch(() => setErrorMessage('Unable to add a todo'))
        .then(() => setTimeout(() => {
            setErrorMessage('');
        }, 3000));

      setTitle('');
    });

  const handleUncompletedTodos = (ids: number[]) => {
    const updatedTodos = todos.map(todo => {
      if (ids.includes(todo.id)) {
        return {
          ...todo,
          completed: true,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={() => handleUncompletedTodos(uncompletedTodos)}
      />

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};

import React, { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';
import { USER_ID } from '../api/todos';
import classNames from 'classnames';
import { Errors } from '../types/Errors';

export const Header: React.FC = () => {
  const { todos, setTodos, setMessageError } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');

  const biggestId = () => {
    if (todos.length === 0) {
      return 1;
    }

    const justId = todos.map(todo => todo.id);

    return Math.max(...justId) + 1;
  };

  const AddNewTodo = () => {
    if (!todoTitle.trim()) {
      setMessageError(Errors.EmptyTitle);

      return;
    }

    setMessageError(Errors.NoError);

    return setTodos([
      ...todos,
      {
        id: biggestId(),
        title: todoTitle,
        completed: false,
        userId: USER_ID,
      },
    ]);
  };

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    AddNewTodo();

    setTodoTitle('');
  };

  const isAllComplited = todos.every(todo => todo.completed);

  const handleAllComplited = () => {
    const allComplited = todos.map(todo => {
      if (isAllComplited) {
        return { ...todo, completed: !todo.completed };
      }

      return { ...todo, completed: true };
    });

    setTodos(allComplited);
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllComplited,
          })}
          data-cy="ToggleAllButton"
          onClick={handleAllComplited}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          value={todoTitle}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};

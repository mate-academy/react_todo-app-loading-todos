import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import { addTodo, updateTodo, USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';
import { getCompletedTodos } from '../utils/methods';

interface Props {
  todos: Todo[];
  sizeLeft: number;
  onTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onErrorMessage: (v: string) => void;
}

export const Header: React.FC<Props> = ({
  todos,
  sizeLeft,
  onTodos,
  onErrorMessage,
}) => {
  const [title, setTitle] = useState('');

  const changeAllCompleted = async () => {
    const shouldCompleteAll =
      getCompletedTodos(todos).length === 0 || sizeLeft > 0;

    try {
      const updatedTodos = await Promise.all(
        todos.map(async e => {
          const updatedTodo = await updateTodo({
            id: e.id,
            completed: shouldCompleteAll,
          });

          return {
            ...e,
            completed: updatedTodo.completed,
          };
        }),
      );

      onTodos(updatedTodos);
    } catch {
      onErrorMessage('Unable to update todo');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title) {
      const newTodo = {
        title,
        userId: USER_ID,
        completed: false,
      };

      addTodo(newTodo)
        .then(newPost => {
          onTodos(prev => [...prev, newPost]);
        })
        .catch(() => onErrorMessage('Unable to add todo'));
      setTitle('');
    } else {
      onErrorMessage('Title should not be empty');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: sizeLeft === 0,
          })}
          // className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
          onClick={changeAllCompleted}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit} method="POST" action="">
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};

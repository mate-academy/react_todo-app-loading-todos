import React, { useState } from 'react';
import * as todosService from '../api/todos';

import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  changeComplete: (todo: Todo) => void;
  setTodos: (todos: Todo[] | ((prevTodos: Todo[]) => Todo[])) => void;
};
export const TodoItem: React.FC<Props> = ({
  todo,
  changeComplete,
  setTodos,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  function editTodo() {
    setValue(todo.title);
    setIsEdited(true);
  }

  const handleCheck = () => {
    changeComplete(todo);
  };

  const handleDeleteTodo = () => {
    setIsLoading(true);
    todosService
      .deleteTodo(todo.id)
      .then(() =>
        setTodos(todosPrev =>
          todosPrev.filter(todoCurrent => todoCurrent.id !== todo.id),
        ),
      )
      .finally(() => setIsLoading(false));
  };

  const handleSubmitEditedTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    todosService
      .editTodo({ ...todo, title: value })
      .then(todoRes => {
        setTodos(currenTodos => {
          const newTodos = [...currenTodos].map(todoCur =>
            todoCur.id === todo.id ? todoRes : todoCur,
          );

          return newTodos;
        });
      })
      .finally(() => setIsEdited(false));
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        {' '}
        <input
          checked={todo.completed}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={handleCheck}
        />
      </label>

      {!isEdited && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={editTodo}
          >
            {todo.title}
          </span>

          <button
            onClick={handleDeleteTodo}
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
          >
            x
          </button>
        </>
      )}
      {isEdited && (
        <form onSubmit={handleSubmitEditedTodo}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </form>
      )}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', { 'is-active': isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

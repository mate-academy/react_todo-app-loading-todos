import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  filteredTodos: Todo[];
  loading: number[];
  editTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (todoId: number) => Promise<void>;
}

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  loading,
  editTodo,
  deleteTodo,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedTitle(todo.title);
  };

  const handleChangeTodo = (
    e: React.FormEvent<HTMLFormElement>,
    editedTodo: Todo,
  ) => {
    e.preventDefault();

    if (!selectedTitle.trim()) {
      deleteTodo(editedTodo.id).then(() => {
        setSelectedTodo(null);
        setSelectedTitle('');
      });

      return;
    }

    editTodo({ ...editedTodo, title: selectedTitle }).then(() => {
      setSelectedTodo(null);
      setSelectedTitle('');
    });
  };

  const handleChangeStatus = (pickedTodo: Todo) => {
    editTodo({ ...pickedTodo, completed: !pickedTodo.completed });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
          onDoubleClick={() => handleEditTodo(todo)}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleChangeStatus(todo)}
            />
          </label>

          {todo.id === selectedTodo?.id ? (
            <form onSubmit={e => handleChangeTodo(e, todo)}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={selectedTitle}
                onChange={e => setSelectedTitle(e.target.value)}
              />
            </form>
          ) : (
            <>
              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>
            </>
          )}

          <div
            data-cy="TodoLoader"
            className={classNames('modal overlay', {
              'is-active': loading.includes(todo.id),
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};

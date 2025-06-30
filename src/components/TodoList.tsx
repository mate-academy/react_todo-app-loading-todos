import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[] | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  setErrorMessage,
  loading,
}) => {
  const handleToggle = (todoId: number) => {
    if (!todos) {
      setErrorMessage('Failed to toggle todo');

      return;
    }

    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
  };

  const handleDelete = (todoId: number) => {
    if (!todos) {
      return;
    }

    const updatedTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(updatedTodos);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos?.map(todo => (
        <div
          data-cy="Todo"
          className={todo.completed ? 'todo completed' : 'todo'}
          key={todo.id}
        >
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
            disabled={loading}
          />

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
            disabled={loading}
          >
            ×
          </button>

          {/* Optional loader shown when deleting/updating */}
          <div
            data-cy="TodoLoader"
            className={`modal overlay${loading ? '' : ' hidden'}`}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};

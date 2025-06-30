import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[] | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  loadingTodoId: number | null;
  setLoadingTodoId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  setErrorMessage,
  loadingTodoId,
  setLoadingTodoId,
}) => {
  const handleToggle = async (todoId: number) => {
    if (!todos) {
      setErrorMessage('Failed to toggle todo');

      return;
    }

    setLoadingTodoId(todoId);

    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
    setLoadingTodoId(null);
  };

  const handleDelete = async (todoId: number) => {
    if (!todos) {
      return;
    }

    setLoadingTodoId(todoId);

    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(updatedTodos);
    setLoadingTodoId(null);
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
            disabled={loadingTodoId === todo.id}
          />

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
            disabled={loadingTodoId === todo.id}
          >
            ×
          </button>

          {loadingTodoId === todo.id && (
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

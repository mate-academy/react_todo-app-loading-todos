import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useState } from 'react';
import { deleteTodos } from '../api/todos';

type TodoListProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  loadingTodos: boolean;
  setLoadingTodos: (loading: boolean) => void;
  handleErrorMessage: (errorMessage: string) => void;
};

export function TodoList({
  todos,
  setTodos,
  loadingTodos,
  setLoadingTodos,
  handleErrorMessage,
}: TodoListProps) {
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  const handleDeleteTodo = async (id: number) => {
    handleErrorMessage('');
    setLoadingTodos(true);

    try {
      await deleteTodos(id);
      const newTodosList = todos.filter(todo => todo.id !== id);

      setTodos(newTodosList);
    } catch {
      handleErrorMessage('Unable to delete a todo');
    } finally {
      setLoadingTodos(false);
    }
  };

  const handleEditTodo = (todoEdited: Todo) => {
    setEditingTodo(todoEdited.id);
    setNewTitle(todoEdited.title);
  };

  const handleEditedTodoSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo =>
        todo.id === editingTodo ? (
          <div data-cy="Todo" className="todo" key={todo.id}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                readOnly
              />
            </label>

            <form onSubmit={handleEditedTodoSubmit}>
              <input
                autoFocus
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
            </form>

            <div
              data-cy="TodoLoader"
              className={classNames('modal', 'overlay', {
                'is-active': loadingTodos,
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ) : (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
            onDoubleClick={() => handleEditTodo(todo)}
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                readOnly
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => handleDeleteTodo(todo.id)}
              disabled={loadingTodos}
            >
              ×
            </button>

            <div
              data-cy="TodoLoader"
              className={classNames('modal', 'overlay', {
                'is-active': loadingTodos,
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ),
      )}
    </section>
  );
}

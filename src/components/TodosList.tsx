import cn from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { Todo } from '../types/Todo';
import { deleteTodos, updateTodos } from '../api/todos';

export const TodosList: React.FC = () => {
  const {
    todosAfterFiltering,
    setTodos,
  } = useContext(TodosContext);

  const handleChangeComplete = (todo: Todo) => {
    // eslint-disable-next-line no-param-reassign
    todo.completed = !todo.completed;

    updateTodos(todo)
      .then(data => setTodos((prev) => {
        return [
          ...prev
            .map(getTodo => (getTodo.id === todo.id ? data : getTodo)),
        ];
      }));
  };

  const handleDelete = (todoId: number) => {
    deleteTodos(todoId);
    setTodos((prev) => prev
      .filter(todo => todo.id !== todoId));
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosAfterFiltering.map((todo) => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.completed,
          })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleChangeComplete(todo)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};

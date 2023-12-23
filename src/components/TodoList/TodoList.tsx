import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TododsContext/TodosContext';
import { FilterOption } from '../../types/FilterOption';
import { deleteTodo } from '../../api/todos';

export const TodoList: React.FC = () => {
  const { todos, filterOption, setTodos } = useContext(TodosContext);

  const filteredTodos = todos.filter(todo => {
    switch (filterOption) {
      case FilterOption.Active:
        return !todo.completed;

      case FilterOption.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId);
    setTodos(curentTodos => curentTodos.filter(todo => todo.id !== todoId));
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', {
            completed: todo.completed,
          })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
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
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};

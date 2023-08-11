import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  todos: Todo[];
  filterBy: FilterOptions;
};

function getFilteredTodo(todos: Todo[], filterType: FilterOptions) {
  return todos.filter((todo) => {
    switch (filterType) {
      case FilterOptions.Active:
        return todo.completed === false;
      case FilterOptions.Completed:
        return todo.completed === true;

      default:
        return true;
    }
  });
}

export const TodoList: React.FC<Props> = ({
  todos,
  filterBy = FilterOptions.All,
}) => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const filteredTodos = (filterBy === FilterOptions.All)
    ? todos
    : getFilteredTodo(todos, filterBy);

  return (
    <section className="todoapp__main">
      {filteredTodos.map((todo, index) => {
        return (
          <div
            key={todo.id}
            className={cn(
              'todo',
              { completed: todo.completed },
            )}
            role="button"
            tabIndex={index}
            onDoubleClick={() => setSelectedTodoId(todo.id)}
            onKeyUp={() => {}}
          >
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => {}}
              />
            </label>

            {selectedTodoId !== todo.id ? (
              <span className="todo__title">{todo.title}</span>
            ) : (
              <form>
                <input
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={todo.title}
                />
              </form>
            )}

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove">×</button>

            {/* overlay will cover the todo while it is being updated */}
            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}

      {/* This todo is in loadind state */}
      <div className="todo">
        <label className="todo__status-label">
          <input type="checkbox" className="todo__status" />
        </label>

        <span className="todo__title">Todo is being saved now</span>
        <button type="button" className="todo__remove">×</button>

        {/* 'is-active' class puts this modal on top of the todo */}
        <div className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </section>
  );
};

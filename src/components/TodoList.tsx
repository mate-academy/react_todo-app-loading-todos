/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { CreatedContext } from './TodoContext';
import classNames from 'classnames';
import { FilterButtons } from '../types/FilterType';

export const TodoList = () => {
  const { state, dispatch } = useContext(CreatedContext);
  const { todos, filterButton } = state;

  const deleteTodo = (idNumber: number) => {
    dispatch({
      type: 'DELETE_TODO',
      id: idNumber,
    });
  };

  const filteredTodos = todos.filter(todo => {
    switch (filterButton) {
      case FilterButtons.Active:
        return !todo.completed;
      case FilterButtons.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.length > 0 &&
        filteredTodos?.map(todo => (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onClick={() => {
                  dispatch({
                    type: 'CHANGE_TODO_STATUS',
                    payload: todo.id,
                  });
                }}
              />
            </label>
            {!todo.editted && (
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => {
                  dispatch({
                    type: 'SET_EDITTED_TITLE',
                    id: todo.id,
                  });
                }}
              >
                {todo.title}
              </span>
            )}
            {todo.editted && (
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={todo.title}
                onKeyUp={e => {
                  if (e.key === 'Escape') {
                    dispatch({
                      type: 'ESCAPE_CHANGED_TITLE',
                      id: todo.id,
                    });
                  } else if (e.key === 'Enter') {
                    dispatch({
                      type: 'SET_EDITTED_TITLE',
                      id: todo.id,
                    });
                  }
                }}
                autoFocus
                onChange={e => {
                  dispatch({
                    type: 'TARGET_EDITTED_TITLE',
                    id: todo.id,
                    changedTitle: e.target.value,
                  });
                }}
                onBlur={() => {
                  dispatch({
                    type: 'SET_EDITTED_TITLE',
                    id: todo.id,
                  });
                }}
              />
            )}
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(todo.id)}
            >
              ×{' '}
            </button>
          </div>
        ))}
    </section>
  );
};

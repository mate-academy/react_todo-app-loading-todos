import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import '../styles/todo.scss';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <div className={classNames(`todo ${todo.completed ? 'completed' : ''}`)} key={todo.id}>
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span className="todo__title">{todo.title}</span>
          <button type="button" className="todo__remove">×</button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </>
  );
};

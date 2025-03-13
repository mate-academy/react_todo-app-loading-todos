import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  selectedTodos: number[];
  setSelectedTodos: (arg: number[]) => void;
  todos: Todo[];
  setAllTodos: (arg: Todo[]) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodos,
  setSelectedTodos,
  todos,
  setAllTodos,
}) => {
  const handleDeleteButton = () => {
    const deletedTodo = todo.id;
    const filteredList = todos.filter(todoItem => todoItem.id !== deletedTodo);

    setAllTodos(filteredList);
  };

  const handleToggleTodo = () => {
    //toggle completed or not todo
    if (selectedTodos.includes(todo.id) || todo.completed) {
      const filteredTodos = selectedTodos.filter(item => item !== todo.id);

      setSelectedTodos(filteredTodos);
    } else {
      const newSelected = [...selectedTodos, todo.id];

      setSelectedTodos(newSelected);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: selectedTodos.includes(todo.id) || todo.completed,
      })}
    >
      <label className="todo__status-label" aria-label="toggle todo completion">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className={classNames('todo__status')}
          checked={todo.completed}
          onChange={handleToggleTodo}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDeleteButton}
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

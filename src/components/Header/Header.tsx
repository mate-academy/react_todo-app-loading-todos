import React from 'react';
import { TodoContext } from '../../context/TodoContext';

export const Header: React.FC = () => {
  const {
    todos,
    todoTitle,
    handleTitleChange,
    handleToggleAll,
    handleSubmitNewTodo,
  } = React.useContext(TodoContext);

  const allTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        aria-label="Toggle all todos"
        onClick={() => handleToggleAll(todos)}
        className={`todoapp__toggle-all ${allTodosCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmitNewTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          value={todoTitle}
          onChange={handleTitleChange}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

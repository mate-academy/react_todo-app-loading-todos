import React from 'react';

interface Props {
  todos: { completed: boolean }[];
}

export const Footer: React.FC<Props> = ({ todos }) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {todos.filter(todo => !todo.completed).length} items left
    </span>

    {/* this button should be disabled if there are no completed todos */}
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!todos.some(todo => todo.completed)}
    >
      Clear completed
    </button>
  </footer>
);

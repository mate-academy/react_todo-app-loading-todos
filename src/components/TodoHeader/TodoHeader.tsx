import { useContext } from 'react';

import { TodoContext } from '../../context/TodoContext';

export const TodoHeader = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const toggleAll = () => {
    setTodos(currentTodos => {
      const todosCopy = [...currentTodos];

      return todosCopy.map(todo => ({
        ...todo,
        completed: !todo.completed,
      }));
    });
  };

  return (
    <header className="todoapp__header">
      {!!todos.filter(({ completed }) => !completed).length && (
        <button
          type="button"
          aria-label="toggle all"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

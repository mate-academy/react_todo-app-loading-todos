import { useState } from 'react';
import { Todo } from '../types/Todo';

interface ITodoHeader {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}

export const TodoHeader: React.FC<ITodoHeader> = ({ setTodos, todos }) => {
  const [value, setValue] = useState('');

  const isAllCompleted = todos.length > 0 && todos.every(t => t.completed);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={event => {
          event.preventDefault();

          if (!value.trim()) {
            return;
          }

          const newTodo = {
            id: 0,
            userId: 0,
            title: value.trim(),
            completed: false,
          };

          setTodos((prev: Todo[]) => [...prev, newTodo]);
          setValue('');
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          value={value}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </header>
  );
};

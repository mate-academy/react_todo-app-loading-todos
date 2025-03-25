import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID } from '../../api/todos';

type Props = {
  filteredTodos: Todo[];
};

export const Header: React.FC<Props> = ({ filteredTodos }) => {
  const hasAllTodosCompleted = filteredTodos.every(todo => todo.completed);
  const [title, setTitle] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_, setNewTodo] = useState<Partial<Todo>>({});

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleNewTodo = () => {
    const isoDate = new Date().toISOString();

    const newTodoItem = {
      userId: USER_ID,
      createdAt: isoDate,
      title,
      completed: false,
    };

    setNewTodo(newTodoItem);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${hasAllTodosCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleNewTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => handleTitle(event)}
        />
      </form>
    </header>
  );
};

import React, { FormEvent } from 'react';
import { Todo } from '../../types/Todo';
import cs from 'classnames';

interface Props {
  todos: Todo[];
}

// const [todos, setTodos] = useState<Todo[]>([]);

export const Header: React.FC<Props> = ({ todos }) => {
  // const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!!todos.length && (
        <button
          type="button"
          className={cs('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );
};

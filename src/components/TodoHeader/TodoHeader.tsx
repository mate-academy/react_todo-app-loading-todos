/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useState } from 'react';

interface TodoFHeaderProps {
  onToggleAll: () => void;
  active: boolean;
  onAddTodo: (title: string) => void;
}

export const TodoHeader: React.FC<TodoFHeaderProps> = (
  { onToggleAll, active, onAddTodo },
) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodoTitle.trim()) {
      onAddTodo(newTodoTitle.trim());
      setNewTodoTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className={
          classNames(
            'todoapp__toggle-all',
            { active },
          )
        }
        onClick={onToggleAll}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={event => setNewTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};

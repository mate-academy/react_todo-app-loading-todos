import { useState } from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type TodoHeaderProps = {
  onAdd: (title: string) => void;
  todos: Todo[];
};

export const TodoHeader: React.FC<TodoHeaderProps> = ({ onAdd, todos }) => {
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        // eslint-disable-next-line max-len
        className={cn('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => true}
        />
      </form>
    </header>
  );
};

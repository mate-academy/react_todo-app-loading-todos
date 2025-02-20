import { useState } from 'react';
import cn from 'classnames';

type Props = {
  isAllCompleted: boolean;
  addNewTodo: (title: string) => void;
};

export const Header: React.FC<Props> = ({ isAllCompleted, addNewTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addNewTodo(newTodo);
    setNewTodo('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: isAllCompleted })}
        data-cy="ToggleAllButton"
      />
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          value={newTodo}
          placeholder="What needs to be done?"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setNewTodo(event.target.value)
          }
        />
      </form>
    </header>
  );
};

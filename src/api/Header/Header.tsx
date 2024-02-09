/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { Dispatch, SetStateAction, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>
  todos: Todo[],
};

export const Header: React.FC<Props> = ({
  setTodos,
  todos,
}) => {
  const [query, setQuery] = useState('');

  const allTodosToggle = todos.every(todo => todo.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleToggleAll = () => {
    setTodos(prevTodos => prevTodos.map(todo => (
      { ...todo, completed: !allTodosToggle }
    )));
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: allTodosToggle })}
        data-cy="ToggleAllButton"
        onClick={handleToggleAll}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        // autoFocus
        />
      </form>
    </header>
  );
};

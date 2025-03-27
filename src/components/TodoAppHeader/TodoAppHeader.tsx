import { useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onAdd: (newTodo: Todo) => void;
  onToggleAll: (completeAll: boolean) => void;
};

export const TodoAppHeader: React.FC<Props> = ({
  todos,
  onAdd,
  onToggleAll,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const hasAllCompleted = todos.every(todo => !!todo.completed);

  const resetNewTodoForm = () => {
    setNewTodoTitle('');
  };

  const handleNewTodoFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: 1,
      userId: 1,
      title: newTodoTitle.trim(),
      completed: false,
    };

    onAdd(newTodo);
    resetNewTodoForm();
  };

  const handleNewTodoInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTodoTitle(event.target.value);
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: hasAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => onToggleAll(!hasAllCompleted)}
        />
      )}

      <form onSubmit={handleNewTodoFormSubmit} onReset={resetNewTodoForm}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={handleNewTodoInputChange}
          autoFocus
        />
      </form>
    </header>
  );
};

import * as React from 'react';
import classNames from 'classnames';
import { addTodo } from '../../api/todos';
import { IsActiveError } from '../../types/types';
import { Todo } from '../../types/Todo';

interface HeaderProps {
  todos: Todo[];
  setTodos: (arg: Todo[]) => void;
  setIsError: (arg: IsActiveError) => void;
}

export const Header: React.FC<HeaderProps> = ({
  todos,
  setTodos,
  setIsError,
}) => {
  const [query, setQuery] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);

  const IsAllCompleted = React.useMemo(() => {
    return todos.every(todo => todo.completed === true);
  }, [todos]);

  function handleAddTodoOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (query) {
      setIsDisabled(true);

      addTodo({ userId: 833, title: query.trim(), completed: false })
        .then(response => {
          setTodos([...todos, response]);
          setQuery('');
        })
        .catch(() => {
          setIsError(IsActiveError.Add);
        })
        .finally(() => {
          setIsDisabled(false);
        });
    } else {
      setIsError(IsActiveError.Empty);
    }
  }

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: IsAllCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={event => handleAddTodoOnSubmit(event)}>
        <input
          disabled={isDisabled}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value.trimStart())}
          autoFocus
        />
      </form>
    </header>
  );
};

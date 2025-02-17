import { useState } from 'react';
import { Button } from './Button';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const Header: React.FC<Props> = ({ todos }) => {
  const [query, setQuery] = useState('');
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) {
      return;
    }

    // const newTodo = {
    //   id: +new Date(),
    //   title: query,
    //   completed: false,
    // };

    setQuery('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <Button
        type="button"
        className={
          todos.every(todo => todo?.completed === true)
            ? 'todoapp__toggle-all active'
            : ' todoapp__toggle-all'
        }
        dataCy="ToggleAllButton"
        onClick={() => {} /*completeToggle()*/}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={e => handleSubmitForm(e)}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

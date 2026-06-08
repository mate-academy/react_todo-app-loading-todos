import { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { ToggleAllButton } from '../ToggleAllButton';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const NewTodo: React.FC<Props> = ({ todos, setTodos }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleChangeQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTodo: Todo = {
      id: Date.now(),
      title: query,
      completed: false,
      userId: 4304,
    };

    setTodos([...todos, newTodo]);
    setQuery('');
  }

  return (
    <header className="todoapp__header">
      <ToggleAllButton todos={todos} setTodos={setTodos} />
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={query}
          onChange={handleChangeQuery}
        />
      </form>
    </header>
  );
};

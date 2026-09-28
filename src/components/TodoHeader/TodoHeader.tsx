import * as client from '../../api/todos';
import { Todo } from '../../types/Todo';
import { Dispatch, SetStateAction } from 'react';

function createTodo(title: string): Omit<Todo, 'id'> {
  return {
    userId: client.USER_ID,
    title: title,
    completed: false,
  };
}

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setTodos: Dispatch<SetStateAction<Todo[] | undefined>>;
  setError: Dispatch<SetStateAction<string>>;
};

export const TodoHeader = ({ query, setQuery, setTodos, setError }: Props) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={event => {
          event.preventDefault();
          client
            .addTodo(createTodo(query))
            .then(newTodo =>
              setTodos(previousTodos =>
                previousTodos ? [...previousTodos, newTodo] : [newTodo],
              ),
            )
            .catch(() => setError('Unable to add a todo'));
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};

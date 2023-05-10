import { FC, useState } from 'react';
import { addTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  USER_ID: number;
}

export const HeaderTodoApp: FC<Props> = ({ todos, USER_ID }) => {
  const [query, setQuery] = useState('');

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {/* eslint-disable jsx-a11y/control-has-associated-label */}
      {todos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const maxId = todos.reduce((acum, { id }) => {
            if (acum < id) {
              return id;
            }

            return acum;
          }, 0) + 1;

          addTodo(USER_ID, {
            id: maxId,
            userId: USER_ID,
            title: query,
            completed: false,
          });

          setQuery('');
        }}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};

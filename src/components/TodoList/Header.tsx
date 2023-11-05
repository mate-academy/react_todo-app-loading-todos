import { useState } from 'react';
import { postTodo } from '../../api/todos';

// {
//   "title": "Learn JS",
//   "userId": 4,
//   "completed": false
// }

type Props = {
  userId: number;
};

export const Header: React.FC<Props> = ({ userId }) => {
  const [query, setQuery] = useState('');

  const createTodo = (event: React.KeyboardEvent<object>) => {
    event.preventDefault();
    postTodo({
      title: query,
      userId,
      completed: false,
    });
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        data-cy="ToggleAllButton"
        aria-label="toggle button"
        className="todoapp__toggle-all active"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setQuery(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              createTodo(event);
            }
          }}
        />
      </form>
    </header>
  );
};

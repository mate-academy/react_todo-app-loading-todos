// import { useContext, useState } from 'react';
// import { TodoContext } from '../contexts/TodoContext';

export const Header: React.FC = () => {
  // const [query, setQuery] = useState('');
  // const { todos, setTodos } = useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      {/* <button
        type="button"
        className="todoapp__toggle-all active"
        )}
        data-cy="ToggleAllButton"
        onClick={handleToggle}
      /> */}

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          name="newTodoName"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          // value={query}
          // onChange={(e) => {
          //   setQuery(e.target.value);
          // }}
        />
      </form>
    </header>
  );
};

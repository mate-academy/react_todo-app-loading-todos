import React, { useRef } from 'react';
// import { postTodos } from '../../api/todos';
// import { Todo } from '../../types/Todo';
// import { AuthContext } from '../Auth/AuthContext';

interface Props {
  selectAll: () => void,
  todoTitle: string,
  setTodoTitle: (title: string) => void,
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void
}

export const TodoHeader: React.FC<Props> = (props) => {
  const {
    selectAll, todoTitle, setTodoTitle, handleSubmit,
  } = props;
  // const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        aria-label="SELECT ALL"
        type="button"
        className="todoapp__toggle-all active"
        onClick={() => selectAll()}
      />

      <form
        onSubmit={handleSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          value={todoTitle}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

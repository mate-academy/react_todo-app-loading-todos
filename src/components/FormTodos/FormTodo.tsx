import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type FormTodoProps = {
  postTodos: (s: string) => void;
  changeComplite: () => void;
  todos: Todo[];
};

export const FormTodo: React.FC<FormTodoProps> = ({
  postTodos,
  changeComplite,
  todos,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const isAllCompleted = todos.every(todo => todo.completed);

    setIsActive(isAllCompleted);
  }, [todos]);

  function clear() {
    setSearchTerm('');
  }

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={
          isActive ? 'todoapp__toggle-all active' : 'todoapp__toggle-all'
        }
        data-cy="ToggleAllButton"
        onClick={() => {
          changeComplite();
        }}
      />

      <form
        onSubmit={e => {
          e.preventDefault();

          postTodos(searchTerm);

          clear();
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
        />
      </form>
    </header>
  );
};

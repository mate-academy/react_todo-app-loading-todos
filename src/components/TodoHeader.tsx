import React from 'react';

type Props = {
  addTodo: string;
  setAddTodo: (value: string) => void;
  handleAddTodo: () => void;
  haveTodos: boolean;
  setToggleAllButton: (value: boolean) => void;
  toggleAllButton: boolean;
};

export const TodoHeader: React.FC<Props> = ({
  addTodo,
  setAddTodo,
  handleAddTodo,
  haveTodos,
  setToggleAllButton,
  toggleAllButton,
}) => {
  return (
    <header className="todoapp__header">
      {haveTodos ? (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className={`todoapp__toggle-all ${toggleAllButton ? 'active' : ''}`}
          onClick={() => setToggleAllButton(true)}
        ></button>
      ) : null}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={addTodo}
          autoFocus
          onChange={e => setAddTodo(e.target.value)}
        />
      </form>
    </header>
  );
};

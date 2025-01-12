import React from 'react';

type Props = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

export const TodoHeader: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // console.log('enter');
    }
  };

  const handlesearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={searchQuery}
          onChange={handlesearchQueryChange}
          onKeyDown={handleAddTodo}
        />
      </form>
    </header>
  );
};

import React from 'react';

export const TodoForm: React.FC = () => {
  const inputPlaceholder = React.useMemo(
    () => 'What needs to be done?',
    [],
  );

  return (
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder={inputPlaceholder}
      />
    </form>
  );
};

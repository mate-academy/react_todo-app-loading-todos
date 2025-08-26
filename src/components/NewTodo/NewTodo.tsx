import React from 'react';

type Props = {
  disabled: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
};

export const NewTodo: React.FC<Props> = ({
  disabled,
  value = '',
  onChange,
  onSubmit,
}) => {
  return (
    <header className="todoapp__header">
      <form
        onSubmit={e => {
          e.preventDefault();
          if (onSubmit) {
            onSubmit();
          }
        }}
      >
        <input
          id="new-todo"
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          aria-label="New todo"
          disabled={disabled}
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />
      </form>
    </header>
  );
};

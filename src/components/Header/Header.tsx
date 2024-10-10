import React, { FormEvent, useState, useRef } from 'react';
import classNames from 'classnames';

type Props = {
  onSubmit: (textField: string) => void;
  onToggleAll: () => void;
  isToggleActive: boolean;
  isToggleVisible: boolean;
};

export const Header: React.FC<Props> = ({
  onSubmit,
  onToggleAll,
  isToggleActive,
  isToggleVisible,
}) => {
  const [textField, setTextField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const field = useRef<HTMLInputElement>(null);

  const handleTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextField(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(textField);
    setTextField(''); // Clear input field after submitting
    setIsSubmitting(false);
  };

  return (
    <header className="todoapp__header">
      {isToggleVisible && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isToggleActive,
          })}
          data-cy="ToggleAllButton"
          onClick={onToggleAll}
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={field}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={textField}
          onChange={handleTextField}
          disabled={isSubmitting}
        />
      </form>
    </header>
  );
};

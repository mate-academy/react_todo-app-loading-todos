import { useState } from 'react';

interface InputFormType {
  setAddTodoIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
}

export const InputForm: React.FC<InputFormType> = ({ setAddTodoIsClicked }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAddTodoIsClicked(true);
    setInputValue('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputValue}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={handleInputChange}
      />
    </form>
  );
};

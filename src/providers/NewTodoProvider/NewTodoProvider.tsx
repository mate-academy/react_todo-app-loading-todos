import { PropsWithChildren, createContext, useState } from 'react';

type NewTodoContextType = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, input: string) => void,
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errorEmptyTitle: boolean,
  todoInput: string,
};

export const NewTodoContext = createContext<NewTodoContextType>({
  handleSubmit: () => {},
  handleInput: () => {},
  errorEmptyTitle: false,
  todoInput: '',
});

export const NewTodoProvider = ({ children }: PropsWithChildren) => {
  const [errorEmptyTitle, setErrorEmptyTitle] = useState(false);
  const [todoInput, setTodoInput] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, input: string) => {
    e.preventDefault();
    if (input.length === 0) {
      setErrorEmptyTitle(true);
    }
  };

  return (
    <NewTodoContext.Provider value={{
      handleSubmit,
      handleInput,
      errorEmptyTitle,
      todoInput,
    }}
    >
      {children}
    </NewTodoContext.Provider>
  );
};

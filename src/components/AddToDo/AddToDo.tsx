import React from 'react';
import { Todo } from '../../types/Todo';
import { addTodos } from '../../api/todos';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleLoading: (id: number, state: boolean) => void;
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const AddTodos: React.FC<Props> = ({
  value,
  setValue,
  handleLoading,
  setErrorMesage,
  setTodos,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.trim());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value.trim()) {
      setErrorMesage('Title should not be empty');

      return;
    }

    setErrorMesage('');

    const newTodo: Todo = {
      title: value,
      id: Math.floor(Math.random() * 100000000),
      completed: false,
      userId: 2283,
    };

    try {
      const response = await addTodos(newTodo);

      handleLoading(response.id, true);

      setTodos(prev => {
        const newTodos = [...prev, response];

        localStorage.setItem('todosStorage', JSON.stringify(newTodos));

        return newTodos;
      });
    } catch {
      setErrorMesage('Unable to add todo');
    }

    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={handleOnChange}
        value={value}
      />
    </form>
  );
};

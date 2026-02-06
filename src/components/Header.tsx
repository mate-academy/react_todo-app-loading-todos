import { USER_ID } from '../api/todos';
import { client } from '../utils/fetchClient';
import { Todo } from '../types/Todo';
import { Form } from './Form';

interface HeaderProps {
  onError: (message: string) => void;
  onTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  formValue: string;
  changeFormValue: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onError,
  onTodos,
  formValue,
  changeFormValue,
}) => {
  const addTodo = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!formValue.trim()) {
      onError('Value is empty');

      return;
    }

    const newTodo = {
      title: formValue,
      userId: USER_ID,
      completed: false,
    };

    try {
      const addedTodo = await client.post<Todo>('todos/', newTodo);

      onTodos(current => [...current, addedTodo]);
      changeFormValue('');
    } catch {
      onError('Unable to add a new todo. Please try again.');
    }
  };

  return (
    <Form onSubmit={addTodo} fValue={formValue} onChange={changeFormValue} />
  );
};

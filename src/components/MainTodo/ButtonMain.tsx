import { FC, useContext } from 'react';
import { TodoContext, TodoDispatch } from '../../Context/TodoContext';
import { deleteTodo } from '../../api/todos';

interface IProps {
  id: string;
  showError: (err: string) => void;
}

export const ButtonMain: FC<IProps> = ({ id, showError }) => {
  const { handleFocusInput } = useContext(TodoContext);
  const dispatch = useContext(TodoDispatch);

  const handleDeleteClick = async () => {
    try {
      await deleteTodo(id);
      dispatch({ type: 'DELETE_TODO', payload: id });
      handleFocusInput();
    } catch (error) {
      showError('Unable to delete a todo');
    }
  };

  return (
    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
      onClick={handleDeleteClick}
    >
      ×
    </button>
  );
};

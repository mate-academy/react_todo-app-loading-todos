import { FC, useContext } from 'react';
import { TodoContext, TodoDispatch } from '../../Context/TodoContext';

interface IProps {
  id: string;
}

export const ButtonMain: FC<IProps> = ({ id }) => {
  const { handleFocusInput } = useContext(TodoContext);
  const dispatch = useContext(TodoDispatch);

  const handleDeleteClick = () => {
    dispatch({ type: 'DELETE_TODO', payload: id });
    handleFocusInput();
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

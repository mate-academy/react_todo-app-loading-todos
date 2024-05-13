import { FC, useContext } from 'react';
import { TodoContext, TodoDispatch } from '../../Context/TodoContext';

export const ButtonFooter: FC = () => {
  const { numberComplete, handleFocusInput } = useContext(TodoContext);
  const dispatch = useContext(TodoDispatch);

  const clearCompleted = () => {
    dispatch({ type: 'DELETE_COMPLETED_TODO' });
    handleFocusInput();
  };

  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={numberComplete === 0}
      onClick={clearCompleted}
    >
      Clear completed
    </button>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../../types/Todo';
import { updateTodos } from '../../api/todos';

type Props = {
  todo: Todo;
  handleLoading: (id: number, state: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>;
};

export const Complete: React.FC<Props> = ({
  todo,
  handleLoading,
  setTodos,
  setErrorMesage,
}) => {
  const handleComplete = async (item: Todo) => {
    const updatedTodo = { ...item, completed: !todo.completed };

    try {
      const updatedResponse: Todo = await updateTodos(todo.id, updatedTodo);

      handleLoading(item.id, true);

      setTodos(prev => {
        const updatedTodos = prev.map(el =>
          el.id === updatedResponse.id ? updatedResponse : el,
        );

        localStorage.setItem('todosStorage', JSON.stringify(updatedTodos));

        return updatedTodos;
      });
    } catch {
      setErrorMesage('Unable to update todo');
    }
  };

  return (
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        onChange={() => handleComplete(todo)}
        checked={todo.completed}
      />
    </label>
  );
};

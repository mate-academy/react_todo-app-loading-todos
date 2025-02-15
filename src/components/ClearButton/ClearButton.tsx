import React from 'react';
import { Todo } from '../../types/Todo';
import { removeTodos } from '../../api/todos';
type Props = {
  completedTodos: number;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const ClearButton: React.FC<Props> = ({
  completedTodos,
  todos,
  setTodos,
}) => {
  const storageTodos = JSON.parse(localStorage.getItem('todosStorage') || '[]');
  const clearCompleted = async () => {
    const completedIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    try {
      await Promise.all(completedIds.map(id => removeTodos(id)));
      const updatedTodos = storageTodos.filter((todo: Todo) => !todo.completed);

      localStorage.setItem('todosStorage', JSON.stringify(updatedTodos));
      setTodos((prev: Todo[]) => prev.filter((todo: Todo) => !todo.completed));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to delete', error);
    }
  };

  return (
    <button
      disabled={!completedTodos}
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      onClick={clearCompleted}
    >
      Clear completed
    </button>
  );
};

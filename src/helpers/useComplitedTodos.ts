import { useTodosContext } from '../components/store';

export const useComplitedTodos = () => {
  const { todos } = useTodosContext();

  return (
    todos.filter((todo) => todo.completed === true)
  );
};

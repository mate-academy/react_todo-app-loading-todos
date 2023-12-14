import { useTodosContext } from '../components/store';

export const useUncomplitedTodos = () => {
  const { todos } = useTodosContext();

  return (
    todos.filter((todo) => !todo.completed)
  );
};

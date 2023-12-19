import { Todo } from "./Todo";

export interface TodoContext {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: string;
  setFilter: (text: string) => void;
  completedTodo: (todoId: number) => void;
}

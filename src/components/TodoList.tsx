import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  visibleTodos: Todo[];
}

export const TodoList = ({ visibleTodos }: Props) =>
  visibleTodos.map(todo => <TodoItem todo={todo} key={todo.id} />);

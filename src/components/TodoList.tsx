import { Todo } from '../types/Todo';
import { TodoElement } from './TodoElement';

type Props = {
  visibleTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ visibleTodos }: Props) => {
  return visibleTodos.map(todo => <TodoElement todo={todo} key={todo.id} />);
};

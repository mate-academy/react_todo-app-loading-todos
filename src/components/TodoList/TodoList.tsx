import { Todo } from '../../types/Todo';
import { Header } from '../Header/Header';
import { TodoItem } from '../TodoItem/TodoItem';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[];
  activeTodos: Todo[],
  filterType: FilterType,
  setFilterType: (filter: FilterType) => void,
  completedTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({
  todos, activeTodos,
}) => {
  return (
    <section className="todoapp__main">
      <Header activeTodos={activeTodos} />
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

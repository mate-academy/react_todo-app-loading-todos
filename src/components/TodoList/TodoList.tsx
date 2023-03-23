import { Todo } from '../../types/Todo';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
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
  todos, activeTodos, filterType, setFilterType, completedTodos,
}) => {
  return (
    <section className="todoapp__main">
      <div className="todoapp__content">
        <Header activeTodos={activeTodos} />
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {todos
        && (
          <Footer
            activeTodos={activeTodos}
            filterType={filterType}
            setFilterType={setFilterType}
            completedTodos={completedTodos}
          />
        )}
      </div>
    </section>
  );
};

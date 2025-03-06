import { FilterType } from '../../types/FilterType';
import { TodoItem } from './../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  filterBy: FilterType;
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ filterBy, todos }) => {
  const filteredTodos = todos.filter(todo => {
    if (filterBy === 'active') {
      return !todo.completed;
    } else if (filterBy === 'completed') {
      return todo.completed;
    } else {
      return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem key={todo.id} title={todo.title} completed={todo.completed} />
      ))}
    </section>
  );
};

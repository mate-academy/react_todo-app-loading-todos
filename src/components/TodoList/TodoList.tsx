import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import { Task } from '../Task';

type Props = {
  todos: Todo[];
  filterTodos: FilterType;
};

export const TodoList = ({ todos, filterTodos }: Props) => {
  const visibleTodos = () => {
    if (filterTodos === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    if (filterTodos === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  };

  return (
    <section className="todoapp__main">
      {visibleTodos().map(todo => (
        <Task key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

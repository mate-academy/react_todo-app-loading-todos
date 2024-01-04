/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoItem } from './TodoItem';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[],
  filter: Filter,
}

export const TodoList: React.FC<Props> = ({ todos, filter }) => {
  const filteredTodos =
    todos.filter((todo) => {
      switch (filter) {
        case Filter.active:
          return !todo.completed;

        case Filter.completed:
          return todo.completed;

        case Filter.all:
          return todo;

        default:
          return true;
      }
    })

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todoItem={todo}
          />
        ))
      }
    </section>
  );
};

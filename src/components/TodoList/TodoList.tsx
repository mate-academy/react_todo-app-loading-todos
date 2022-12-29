import { FunctionComponent } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface TodoListProps {
  filteredStatus: Todo[];
}

export const TodoList: FunctionComponent<TodoListProps> = ({
  filteredStatus,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredStatus.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </section>
  );
};

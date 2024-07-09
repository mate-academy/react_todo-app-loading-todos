import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TodoItem } from '../TodoItem/TodoItem';
import { Status } from '../../types/statusTypes';
import { Todo } from '../../types/Todo';
import { getFilteredTodos } from '../../utils/filterTodo';

interface Props {
  todos: Todo[];
  selectedStatus: Status;
}

export const TodoList: FC<Props> = ({ todos, selectedStatus }) => {
  const filteredTodos = getFilteredTodos(todos, selectedStatus);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={uuidv4()} todo={todo} />
      ))}
    </section>
  );
};

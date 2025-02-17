import { FC } from 'react';

import TodoItem from './TodoItem';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { getFilteredTodos } from '../utils/getFilteredTodos';

interface Props {
  todos: Todo[];
  selectedStatus: Status;
}

const TodoList: FC<Props> = ({ todos, selectedStatus }) => {
  const filteredTodos = getFilteredTodos(todos, selectedStatus);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

export default TodoList;

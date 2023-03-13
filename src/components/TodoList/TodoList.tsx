import { FC, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Footer, FilteringMethod } from '../Footer';
import { TodoTask } from '../TodoTask';

type Props = {
  todos: Todo[];
};

const getVisibleTodos = (todos: Todo[], status: FilteringMethod): Todo[] => {
  if (status === 'Active') {
    return todos.filter(todo => !todo.completed);
  }

  if (status === 'Completed') {
    return todos.filter(todo => todo.completed);
  }

  return todos;
};

export const TodoList: FC<Props> = ({ todos }) => {
  const [filterStatus, changeFilterStatus] = useState<FilteringMethod>('All');

  const visibleTodos = getVisibleTodos(todos, filterStatus);
  const remainTodos = todos.filter(todo => !todo.completed).length;

  return (
    <>
      <section className="todoapp__main">
        {visibleTodos.map(todo => (
          <TodoTask key={todo.id} todo={todo} />
        ))}
      </section>

      <Footer
        status={filterStatus}
        onStatusChange={changeFilterStatus}
        remainTodos={remainTodos}
      />
    </>
  );
};

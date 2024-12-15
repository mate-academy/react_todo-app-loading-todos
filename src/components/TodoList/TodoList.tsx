import React from 'react';
import { Todo } from '../../types/Todo';
import TodoItem from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 &&
        todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </section>
  );
});

TodoList.displayName = 'TodoList';
export default TodoList;

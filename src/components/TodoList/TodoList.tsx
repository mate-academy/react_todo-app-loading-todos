import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface TodoListProps {
  tasks: Todo[] | null;
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {tasks && tasks.map(task => <TodoItem key={task.id} todo={task} />)}
    </section>
  );
};

export default React.memo(TodoList);

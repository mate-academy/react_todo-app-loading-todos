import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodoTask } from './TodoTask';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  if (todos.length === 0) {
    return <h2>Todo List is empty</h2>;
  }

  return (
    <>
      {todos.map((todo) => (
        <TodoTask todo={todo} key={todo.id} />
      ))}
    </>
  );
};

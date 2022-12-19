import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[],
  updatedTodo: (updateTodo: Todo, oldTodo: Todo) => void,
  removeTodo: (todoId: number) => void,
  loadingTodosId: number[],
  todoTitle: string,
  isAdding: boolean,
}

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos, updatedTodo, removeTodo, loadingTodosId, todoTitle, isAdding,
  } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          updatedTodo={updatedTodo}
          removeTodo={removeTodo}
          isLoad={loadingTodosId.includes(todo.id)}
        />
      ))}

      {isAdding
      && (
        <TodoInfo
          todo={
            {
              id: 0,
              userId: 0,
              title: todoTitle,
              completed: false,
            }
          }
          updatedTodo={updatedTodo}
          removeTodo={removeTodo}
          isLoad
        />
      )}
    </section>
  );
};

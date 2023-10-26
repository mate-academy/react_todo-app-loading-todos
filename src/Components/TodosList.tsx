import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[],
}

export const TodosList: React.FC<Props> = ({ todos }) => {
  const [todoList, setTodoList] = useState(todos);

  const onChange = (todoId: number) => {
    const upDateTodo = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodoList(upDateTodo);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">

      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onCheck={onChange}
        />
      ))}
    </section>
  );
};

import React from 'react';

import { TodoType } from '../../types/TodoType';

import Todo from '../Todo/Todo';

type Props = {
  todos: TodoType[];
};

const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        completed={todo.completed}
        title={todo.title}
      />
    ))}
  </ul>
);

export default TodoList;

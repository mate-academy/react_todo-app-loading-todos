import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
  inputTodo: string;
  setInputTodo: (value: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  inputTodo,
  setInputTodo,
}) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          inputTodo={inputTodo}
          setInputTodo={setInputTodo}
        />
      ))}
    </div>
  );
};

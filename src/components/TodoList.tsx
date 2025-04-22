import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  selectedTodos: number[];
  setSelectedTodos: (arg: number[]) => void;
  setAllTodos: (arg: Todo[]) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodos,
  setSelectedTodos,
  setAllTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          selectedTodos={selectedTodos}
          setSelectedTodos={setSelectedTodos}
          todos={todos}
          setAllTodos={setAllTodos}
        />
      ))}
    </section>
  );
};

import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  setTodos: (value: React.SetStateAction<Todo[]>) => void
}

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos = () => {},
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {
        todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
          />
        ))
      }

    </section>
  );
};

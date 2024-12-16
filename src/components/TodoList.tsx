import React from 'react';

import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  filteredTodos: Todo[];
  changeComplete: (todo: Todo) => void;
  setTodos: (todos: Todo[] | ((prevTodos: Todo[]) => Todo[])) => void;
};

const TodoList: React.FC<Props> = ({
  filteredTodos,
  changeComplete,
  setTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          changeComplete={changeComplete}
          setTodos={setTodos}
        />
      ))}
    </section>
  );
};

export default React.memo(TodoList);

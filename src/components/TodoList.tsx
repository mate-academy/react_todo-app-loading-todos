import React, { useContext } from 'react';

import { TodoItem } from './TodoItem';
import { TodosContext } from '../TodoContext/TodoContext';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </section>
  );
};

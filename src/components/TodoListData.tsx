import React, { useContext } from 'react';
import { TodoContext } from '../context/todo.context';
import TodoListItem from './TodoListItem';

const TodoListData: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <section className="todoapp__main">
      {
        todos.map(todo => (
          <TodoListItem todo={todo} key={todo.id} />
        ))
      }
    </section>
  );
};

export default TodoListData;

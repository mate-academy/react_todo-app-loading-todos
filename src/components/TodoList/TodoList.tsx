import React, { useContext } from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodosContext, TodosControlContext } from '../context/TodosContext';
import { getPreparedTodos } from '../../api/todos';

export const TodoList: React.FC = () => {
  const { todos, statusTodo, inputTodo } = useContext(TodosContext);
  const { setInputTodo } = useContext(TodosControlContext);

  const visibleTodos = getPreparedTodos(todos, { statusTodo });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <div>
        {visibleTodos.map(todo => (
          <TodoInfo
            key={todo.id}
            todo={todo}
            inputTodo={inputTodo}
            setInputTodo={setInputTodo}
          />
        ))}
      </div>
    </section>
  );
};

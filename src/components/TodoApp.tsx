import { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoAppHeader } from './TodoAppComponent/TodoAppHeader';
import { TodoList } from './TodoAppComponent/TodoList';
import { TodoAppFooter } from './TodoAppComponent/TodoAppFooter';

interface PropsTodoApp {
  todos: Todo[];
}

export const TodoApp = ({ todos }: PropsTodoApp) => {
  const [filtered, setFiltered] = useState('');

  let filteredTodos = todos;

  if (filtered === 'Active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (filtered === 'Completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  const isFooter = todos.length > 0;

  return (
    <div className="todoapp__content">
      <TodoAppHeader todos={todos} />

      <TodoList filteredTodos={filteredTodos} />

      {isFooter && (
        <TodoAppFooter
          todos={todos}
          filtered={filtered}
          setFiltered={setFiltered}
        />
      )}
    </div>
  );
};

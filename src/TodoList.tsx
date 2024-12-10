import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from './types/Todo';

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: FilterType;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, filter }) => {

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
    {filteredTodos.map(todo => (
      <TodoItem key={todo.id} todo={todo}/>
      ))}
    </section>
  );
}

import React from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, loading, setTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {loading ? (
        <div>
          <div className="loader"></div>
          <div className="loading">Loading...</div>
        </div>
      ) : (
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))
      )}
    </section>
  );
};

export default TodoList;

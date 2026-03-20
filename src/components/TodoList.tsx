import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: (Todo & { loading?: boolean; editing?: boolean })[];
  handleToggleTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: number) => void;
  handleStartEditing: (id: number) => void;
  handleSubmitRename: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
  handleBlurRename: (e: React.FocusEvent<HTMLInputElement>, id: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void;
};

export const TodoList: React.FC<Props> = props => {
  const {
    todos,
    handleToggleTodo,
    handleDeleteTodo,
    handleStartEditing,
    handleSubmitRename,
    handleBlurRename,
    handleKeyDown,
  } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleStartEditing={handleStartEditing}
          handleSubmitRename={handleSubmitRename}
          handleBlurRename={handleBlurRename}
          handleKeyDown={handleKeyDown}
        />
      ))}
    </section>
  );
};

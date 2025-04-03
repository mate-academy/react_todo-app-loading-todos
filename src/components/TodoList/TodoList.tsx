import React from 'react';
import { TodoComponent } from '../Todo/TodoComponent';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  handleUpdateCompleted: (data: Todo, bool?: boolean) => Todo;
  loading: boolean;
  selectedTodo: Todo | null;
  handleEdit: (data: Todo) => void;
  deleteTodo: (todoId: number) => Promise<void>;
  handleUpdateTitle: (data: Todo) => void;
  onNewTodoTitle: (key: string) => void;
  newTodoTitle: string;
  // editTitle: string;
  // onEditTitle: (key: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    handleUpdateCompleted,
    handleUpdateTitle,
    loading,
    selectedTodo,
    handleEdit,
    deleteTodo,
    newTodoTitle,
    // editTitle,
    // onEditTitle,
    onNewTodoTitle,
    inputRef,
  }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {/* This is a completed todo */}
        {todos.map(todo => (
          <TodoComponent
            key={todo.id}
            todo={todo}
            handleUpdateCompleted={handleUpdateCompleted}
            handleUpdateTitle={handleUpdateTitle}
            loading={loading}
            selectedTodo={selectedTodo}
            handleEdit={handleEdit}
            deleteTodo={deleteTodo}
            newTodoTitle={newTodoTitle}
            onNewTodoTitle={onNewTodoTitle}
            // onEditTitle={onEditTitle}
            inputRef={inputRef}
          />
        ))}
      </section>
    );
  },
);

TodoList.displayName = 'TodoList';

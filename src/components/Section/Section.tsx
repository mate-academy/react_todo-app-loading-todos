import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  handleDeleteTodo: (id: number) => void;
  tempTodo?: Todo | null;
  setLoading: (value: boolean) => void;
  loading: boolean;
  loadingId?: number[];
  handleUppCompleted: (todos: Todo) => void;
  newTitle: string;
  setNewTitle: (newTitle: string) => void;
  handleUppEdit: (todos: Todo) => Promise<void>;
};

export const Section: React.FC<Props> = ({
  tempTodo,
  todos,
  handleDeleteTodo,
  loading,
  loadingId = [],
  handleUppCompleted,
  newTitle,
  setNewTitle,
  handleUppEdit,
  setLoading,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          handleDeleteTodo={handleDeleteTodo}
          todo={todo}
          loading={loadingId.includes(todo.id)}
          handleUppCompleted={handleUppCompleted}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleUppEdit={handleUppEdit}
          setLoading={setLoading}
        />
      ))}
      {tempTodo && loading && (
        <TodoItem
          key={tempTodo.id}
          todo={tempTodo}
          handleDeleteTodo={handleDeleteTodo}
          loading={loading}
          handleUppCompleted={handleUppCompleted}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleUppEdit={handleUppEdit}
          setLoading={setLoading}
        />
      )}
    </section>
  );
};

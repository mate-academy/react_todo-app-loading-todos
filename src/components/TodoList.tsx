// import { Todo } from '../types/Todo';
// import { TodoItem } from './TodoItem';

// interface Props {
//   todos: Todo[];
//   onDelete: (id: number) => void;
//   onToggle: (todo: Todo) => void;
//   onEdit: (todo: Todo, title: string) => void;
// }

// export const TodoList: React.FC<Props> = ({ todos, onDelete, onToggle, onEdit }) => {
//   return (
//     <section className="todoapp__main" data-cy="TodoList">
//       {todos.map(todo => (
//         <TodoItem
//           key={todo.id}
//           todo={todo}
//           onDelete={onDelete}
//           onToggle={onToggle}
//           onEdit={onEdit}
//         />
//       ))}
//     </section>
//   );
// };

import { Todo } from '../types/Todo';
import React from 'react';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (todoId: number) => void;
  onUpdateTodo: (todoId: number, data: Partial<Todo>) => void;
  loading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDeleteTodo,
  onUpdateTodo,
  loading,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {loading ? (
        <div className="loader" />
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => onDeleteTodo(todo.id)}
            onUpdate={data => onUpdateTodo(todo.id, data)}
            loading={loading}
          />
        ))
      )}
    </section>
  );
};

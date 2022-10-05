import { useState } from 'react';
import { updatingTodo } from '../../api/todos';
import { TodoItem } from '../TodoItem/TodoItem';
import { Props } from './TodoListPropTypes';

export const TodoList : React.FC<Props> = ({
  todos,
  toggleStatus,
  setErrorMessage,
  deleteInVisibleTodos,
}) => {
  const [loadingTodoid, setloadingTodoId] = useState<number | null>(null);

  const toggleStatusOnServer = async (id: number, comleted: boolean) => {
    toggleStatus(id, comleted);
    setloadingTodoId(id);

    try {
      await updatingTodo(id, !comleted);
    } catch {
      setErrorMessage('update todo');
    } finally {
      setloadingTodoId(null);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            toggleStatusOnServer={toggleStatusOnServer}
            loadingTodoid={loadingTodoid}
            deleteInVisibleTodos={deleteInVisibleTodos}
          />
        );
      })}
    </section>
  );
};

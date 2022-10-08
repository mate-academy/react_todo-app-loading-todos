import { updatingTodo } from '../../api/todos';
import { TodoItem } from '../TodoItem/TodoItem';
import { Props } from './TodoListPropTypes';

export const TodoList : React.FC<Props> = ({
  todos,
  toggleStatus,
  setErrorMessage,
  setLoadingTodoId,
  loadingTodoId,
  deleteTodo,
  temporaryTodo,
  changeTitle,
}) => {
  const toggleStatusOnServer = async (id: number, comleted: boolean) => {
    setLoadingTodoId(id);

    try {
      await updatingTodo(id, !comleted);
      toggleStatus(id, comleted);
    } catch {
      setErrorMessage('update todo');
    } finally {
      setLoadingTodoId(null);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleStatusOnServer={toggleStatusOnServer}
            loadingTodoid={loadingTodoId}
            deleteTodo={deleteTodo}
            setloadingTodoId={setLoadingTodoId}
            setErrorMessage={setErrorMessage}
            changeTitle={changeTitle}
          />
        );
      })}

      {temporaryTodo && (
        <TodoItem
          todo={temporaryTodo}
          toggleStatusOnServer={toggleStatusOnServer}
          loadingTodoid={0}
          deleteTodo={deleteTodo}
          setloadingTodoId={setLoadingTodoId}
          setErrorMessage={setErrorMessage}
          changeTitle={changeTitle}
        />
      )}
    </section>
  );
};

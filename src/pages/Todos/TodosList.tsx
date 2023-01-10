import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import Todo from 'models/Todo';
import TodosAsync from 'store/todos/todosAsync';
import { todosActions } from 'store/todos/todosSlice';
import { selectFilteredTodos } from 'store/todos/todosSelectors';
import { selectCurrentUser } from 'store/users/usersSelectors';
import TodoItem from './TodoItem';

const TodosList:FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);
  const todos = useAppSelector(selectFilteredTodos);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(TodosAsync.fetchTodos(currentUser.id));
    }

    return () => {
      dispatch(todosActions.setInitialField('todos'));
    };
  }, []);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos?.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

export default TodosList;

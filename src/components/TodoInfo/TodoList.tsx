/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../../types/Todo';
import TodoListInfo from './TodoInfoList';

type Props = {
  todos: Todo[];
};

const TodoList = ({ todos }: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoListInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

export default TodoList;

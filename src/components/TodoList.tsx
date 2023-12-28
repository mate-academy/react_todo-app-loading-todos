import { FC, useContext } from 'react';
import cn from 'classnames';
import { SingleTodo } from './SingleTodo';
import { AppContext } from '../context/AppContext';

export const TodoList: FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <p>Context not provided.</p>;
  }

  const { filteredTodos } = context;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {
        filteredTodos.map(todo => (
          <div
            key={todo.id}
            data-cy="Todo"
            className={cn('todo', {
              completed: todo.completed,
            })}
          >
            <SingleTodo todo={todo} />
          </div>
        ))
      }
    </section>
  );
};

import { memo, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Todo } from '../Todo/Todo';

export const TodoMain: React.FC = memo(() => {
  const { state } = useContext(AppContext);
  const { filteredTodos } = state;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </section>
  );
});

TodoMain.displayName = 'TodoMain';

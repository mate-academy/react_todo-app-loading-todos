import { useCallback, useContext } from 'react';
import { Todo } from '../../libs/types';
import { TodoItem } from '../TodoItem';
import { Actions } from '../../libs/enums';
import { DispatchContext } from '../../libs/state';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const dispatch = useContext(DispatchContext);

  const handleDeleteTodo = useCallback((todoId: number) => {
    dispatch({
      type: Actions.delete,
      payload: { todoId },
    });
  }, [dispatch]);

  const handleUpdateTodo = useCallback((updatedTodo: Todo) => {
    dispatch({
      type: Actions.update,
      payload: { todo: updatedTodo },
    });
  }, [dispatch]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <div>
        {items.map(item => (
          <TodoItem
            key={item.id}
            item={item}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        ))}
      </div>
    </section>
  );
};

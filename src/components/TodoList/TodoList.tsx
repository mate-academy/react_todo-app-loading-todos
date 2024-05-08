import { useContext, FC } from 'react';
import { StateContext } from '../../store/todoReducer';
import { TodoItem } from '../Todo/TodoItem';
// import { Filter } from '../../types/state';
import { Todo } from '../../types/Todo';
import { TempTodo } from '../TempTodo';
import { filterTodos } from '../../helpers/filterTodos';

type Props = {
  onError: (message: string) => void;
  tempTodo: Todo | null;
  coverShow: number[];
  onCoverShow: React.Dispatch<React.SetStateAction<number[]>>;
};

export const TodoList: FC<Props> = ({
  onError,
  tempTodo,
  coverShow,
  onCoverShow,
}) => {
  const { todos, filter } = useContext(StateContext);

  const filteredTodos = filterTodos(todos, filter);

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        <ul>
          {filteredTodos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onError={onError}
              coverShow={coverShow}
              onCoverShow={onCoverShow}
            />
          ))}

          {tempTodo && <TempTodo todo={tempTodo} />}
        </ul>
      </section>
    </>
  );
};

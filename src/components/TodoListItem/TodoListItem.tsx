import { FC } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { useTodoContext } from '../../utils/hooks/useTodoContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const TodoListItem: FC = () => {
  const { filteredTodos } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {filteredTodos.map(todo => (
          <CSSTransition key={todo.id} timeout={300} classNames="item">
            <TodoItem todo={todo} key={todo.id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
};

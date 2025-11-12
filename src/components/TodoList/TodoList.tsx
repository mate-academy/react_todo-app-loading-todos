import React, { createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  visibleTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {visibleTodos.map((todo: Todo) => {
          const nodeRef = createRef<HTMLDivElement>();

          return (
            <CSSTransition
              key={todo.id}
              timeout={200}
              classNames="item"
              nodeRef={nodeRef}
            >
              <TodoItem todo={todo} nodeRef={nodeRef} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </section>
  );
};

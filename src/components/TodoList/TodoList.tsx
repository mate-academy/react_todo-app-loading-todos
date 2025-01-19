import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../../App.scss';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  onDelete: (todoId: number) => void;
  processings: number[];
  isTodoLoading: boolean;
  isTodoDeleting: boolean;
  creatingTodo: boolean;
};

export const TodoList: React.FC<Props> = props => {
  const {
    todos,
    tempTodo,
    onDelete,
    isTodoLoading,
    isTodoDeleting,
    creatingTodo,
    processings,
  } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {!creatingTodo &&
          todos.map(todo => (
            <CSSTransition key={todo.id} timeout={3000} classNames="item">
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                isTodoLoading={isTodoLoading}
                isTodoDeleting={isTodoDeleting}
                isProcessed={processings.includes(todo.id)}
              />
            </CSSTransition>
          ))}

        {tempTodo && (
          <CSSTransition key={0} timeout={3000} classNames="temp-item">
            <TodoItem
              todo={tempTodo}
              onDelete={() => {}}
              isTodoLoading={isTodoLoading}
              isTodoDeleting={isTodoDeleting}
              isProcessed={processings.includes(tempTodo.id)}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};

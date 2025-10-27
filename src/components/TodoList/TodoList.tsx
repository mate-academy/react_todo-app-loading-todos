import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface TodoListProps {
  todos: Todo[];
}
export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <TransitionGroup
      component="section"
      className="todoapp__main"
      data-cy="TodoList"
    >
      {todos.map(todo => (
        <CSSTransition key={todo.id} timeout={300} classNames="item">
          <TodoInfo todo={todo} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

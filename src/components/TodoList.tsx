import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './Todo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition key={todo.id} timeout={300} classNames="item">
            <TodoItem todo={todo} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
};

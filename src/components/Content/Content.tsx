import React from 'react';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  todos: Todo[];
  newTodo: React.RefObject<HTMLInputElement>;
  activeTodos: number;
  isTodo: boolean;
  todoFilter: TodoStatus;
  onTodoFilter: (filterStatus: TodoStatus) => void;
};

export const Content: React.FC<Props> = ({
  todos, newTodo, activeTodos, isTodo, todoFilter, onTodoFilter,
}) => (
  <div className="todoapp__content">
    <Header
      newTodo={newTodo}
      isTodo={isTodo}
    />

    {isTodo && (
      <>
        <TodoList
          todos={todos}
        />

        <Footer
          activeTodos={activeTodos}
          todoFilter={todoFilter}
          onTodoFilter={onTodoFilter}
        />
      </>
    )}
  </div>
);

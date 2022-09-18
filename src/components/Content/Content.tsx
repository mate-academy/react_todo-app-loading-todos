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
  completedTodos: number;
  todoFilter: TodoStatus;
  isTodos: boolean;
  onTodoFilter: (filterStatus: TodoStatus) => void;
};

export const Content: React.FC<Props> = ({
  todos,
  newTodo,
  activeTodos,
  completedTodos,
  isTodos,
  todoFilter,
  onTodoFilter,
}) => (
  <div className="todoapp__content">
    <Header
      newTodo={newTodo}
      todos={todos}
    />

    {isTodos && (
      <>
        <TodoList
          todos={todos}
        />

        <Footer
          activeTodos={activeTodos}
          completedTodos={completedTodos}
          todoFilter={todoFilter}
          onTodoFilter={onTodoFilter}
        />
      </>
    )}
  </div>
);

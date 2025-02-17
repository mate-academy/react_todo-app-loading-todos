/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (todoId: number) => void;
  fakeTodo: Todo | null;
  loadingTodoId: number[];
  toggleTodoCompleted: (todoId: number) => void;
  setEditingTodoId: (todoId: number | null) => void;
  setEditingTitle: (title: string) => void;
  updateTodo: (todo: Todo) => void;
  editingTodoId: number | null;
  editingTitle: string;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  fakeTodo,
  loadingTodoId,
  toggleTodoCompleted,
  setEditingTodoId,
  setEditingTitle,
  updateTodo,
  editingTodoId,
  editingTitle,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition key={todo.id} timeout={300} classNames="temp-item">
            <TodoItem
              deleteTodo={deleteTodo}
              todo={todo}
              isLoading={loadingTodoId.includes(todo.id)}
              toggleTodoCompleted={toggleTodoCompleted}
              setEditingTodoId={setEditingTodoId}
              setEditingTitle={setEditingTitle}
              updateTodo={updateTodo}
              editingTodoId={editingTodoId}
              editingTitle={editingTitle}
            />
          </CSSTransition>
        ))}
        {fakeTodo && (
          <CSSTransition key={0} timeout={300} classNames="temp-item">
            <TodoItem
              deleteTodo={deleteTodo}
              todo={fakeTodo}
              isLoading={loadingTodoId.includes(fakeTodo.id)}
              toggleTodoCompleted={() => {}}
              setEditingTodoId={() => {}}
              setEditingTitle={() => {}}
              updateTodo={() => {}}
              editingTodoId={null}
              editingTitle={''}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};

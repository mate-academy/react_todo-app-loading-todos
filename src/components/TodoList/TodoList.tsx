import React from 'react';

import { TodoItem } from '../TodoItem';
import { TodoLoadingItem } from '../TodoLoadingItem';

import { ErrorMessages } from '../../types/ErrorMessages';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  loadingTodoTitle: string,
  setErrorMessage: (value: ErrorMessages) => void,
  handleTodoDelete: (id: number) => void,
  handleTodoUpdate: (newTodo: Todo) => void,
  isAllCompleted: boolean | null,
  setIsAllCompleted: (value: boolean | null) => void,
  clearCompleted: boolean,
  setClearCompleted: (value: boolean) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  loadingTodoTitle,
  setErrorMessage,
  handleTodoDelete,
  handleTodoUpdate,
  isAllCompleted,
  setIsAllCompleted,
  clearCompleted,
  setClearCompleted,
}) => {
  return (
    <section className="todoapp__main">
      {/* This todo is not completed */}

      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setErrorMessage={setErrorMessage}
          handleTodoDelete={handleTodoDelete}
          handleTodoUpdate={handleTodoUpdate}
          isAllCompleted={isAllCompleted}
          setIsAllCompleted={setIsAllCompleted}
          clearCompleted={clearCompleted}
          setClearCompleted={setClearCompleted}
        />
      ))}

      {loadingTodoTitle && (
        <TodoLoadingItem title={loadingTodoTitle} />
      )}
    </section>
  );
};

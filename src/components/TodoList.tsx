/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable max-len */
import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  preparedTodos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
  setErrorMessage: (err: string) => void;
  updatedTitle: string;
  setUpdatedTitle: (title: string) => void;
  loadTodos: () => Promise<void>;
};

export const TodoList:React.FC<Props> = ({
  preparedTodos,
  setTodos,
  selectedTodo,
  setSelectedTodo,
  setErrorMessage,
  updatedTitle,
  setUpdatedTitle,
  loadTodos,
}) => {
  return (
    <>
      {preparedTodos && (
        <section className="todoapp__main">
          {/* This is a completed todo */}
          {preparedTodos.map(todo => (
            <TodoItem
              todo={todo}
              setTodos={setTodos}
              key={todo.id}
              updatedTitle={updatedTitle}
              loadTodos={loadTodos}
              setErrorMessage={setErrorMessage}
              setSelectedTodo={setSelectedTodo}
              setUpdatedTitle={setUpdatedTitle}
              selectedTodo={selectedTodo}
            />
          ))}
        </section>
      )}
    </>
  );
};

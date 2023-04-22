import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { deleteTodo } from '../api/todos';

type Props = {
  todos: Todo[],
  selectTodo: (todoId: number) => void,
  selectedTodoId: number | null,
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    selectedTodoId,
    selectTodo,
  },
) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleClickRemoveTodo={(event) => {
              event.preventDefault();
              selectTodo(todo.id);
              if (selectedTodoId === todo.id) {
                deleteTodo(selectedTodoId);
              }
            }}
          />
        );
      })}
    </section>

  );
};

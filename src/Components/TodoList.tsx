import React from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

type TodoListTypes = {
  todosToShow: Todo[];
  editIndex: number | null;
  editValue: string;
  loadingTodoId: number | null;
  completeTodo: (id: number, completed: boolean) => void;
  updateTodo: (
    id: number,
    title: string,
    e?: React.FormEvent<HTMLFormElement>,
  ) => void;
  deleteTodo: (id: number) => void;
  setEditValue: (value: string) => void;
  onDblClick: (data: { index: number; todo: Todo }) => void;
};

const TodoList: React.FC<TodoListTypes> = ({
  todosToShow,
  editIndex,
  editValue,
  loadingTodoId,
  completeTodo,
  updateTodo,
  deleteTodo,
  setEditValue,
  onDblClick,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToShow.map((todo, index) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            editIndex={editIndex}
            editValue={editValue}
            loadingTodoId={loadingTodoId}
            completeTodo={completeTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            setEditValue={setEditValue}
            onDblClick={onDblClick}
          />
        );
      })}
    </section>
  );
};

export default TodoList;

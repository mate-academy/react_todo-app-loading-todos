import React from 'react';
import { TodoItem } from '../TodoItem';

import { Todo } from '../../types/Todo';

type Props = {
  renderTodoList: Todo[]
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
  todoList: Todo[]
  loadingItems: number[]
  setUpdateError: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteError: React.Dispatch<React.SetStateAction<boolean>>
};

export const TodoList: React.FC<Props> = ({
  renderTodoList,
  todoList,
  setTodoList,
  loadingItems,
  setUpdateError,
  setDeleteError,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {renderTodoList.map(todo => (
        <div className="Todo__container" key={todo.id}>
          <TodoItem
            todo={todo}
            todoList={todoList}
            setTodoList={setTodoList}
            loadingItems={loadingItems}
            setUpdateError={setUpdateError}
            setDeleteError={setDeleteError}
          />
        </div>
      ))}
    </section>
  );
};

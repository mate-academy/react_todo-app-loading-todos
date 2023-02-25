import { Dispatch, SetStateAction } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
  onSetTodos: Dispatch<SetStateAction<Todo[]>>;
  creatingTodo: Todo | null;
  handleUpdateTodo: (todoId: number, todo: Todo) => void;
  onSetErrorMessage: (str: string) => void;
  isHasError: () => void;
  todosLoadingState: Todo[];
  setTodosLoadingState: Dispatch<SetStateAction<Todo[]>>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSetTodos,
  creatingTodo,
  handleUpdateTodo,
  onSetErrorMessage,
  isHasError,
  todosLoadingState,
  setTodosLoadingState,
}) => {
  return (
    <ul className="todoapp__main">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoInfo
              todo={todo}
              onSetTodos={onSetTodos}
              key={todo.id}
              todosLoadingState={todosLoadingState}
              setTodosLoadingState={setTodosLoadingState}
              handleUpdateTodo={handleUpdateTodo}
              onSetErrorMessage={onSetErrorMessage}
              isHasError={isHasError}
            />
          </CSSTransition>
        ))}

        {creatingTodo !== null && (
          <CSSTransition
            key={0}
            timeout={300}
            classNames="temp-item"
          >
            <TodoInfo
              todo={creatingTodo}
              onSetTodos={onSetTodos}
              todosLoadingState={todosLoadingState}
              setTodosLoadingState={setTodosLoadingState}
              handleUpdateTodo={handleUpdateTodo}
              onSetErrorMessage={onSetErrorMessage}
              isHasError={isHasError}
            />
          </CSSTransition>

        )}
      </TransitionGroup>
    </ul>
  );
};

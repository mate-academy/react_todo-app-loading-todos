import { Todo as TodoType } from '../../types/Todo';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }: { todos: TodoType[] }) => (
  <TransitionGroup
    component="section"
    className="todoapp__main"
    data-cy="TodoList"
  >
    {todos.map(todo => (
      <CSSTransition key={todo.id} timeout={300} classNames="item">
        <Todo todo={todo} />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

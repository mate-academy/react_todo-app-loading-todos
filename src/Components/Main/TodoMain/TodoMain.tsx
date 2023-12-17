import { TodoForRender } from '../TodoForRender/TodoForRender';

export const TodoMain = () => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoForRender />
    </section>
  );
};

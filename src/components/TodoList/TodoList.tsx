import { Todo } from '../Todo/Todo';

export const TodoList = () => {
  return (
    <section className="todoapp__main">
      {/* This is a completed todo */}
      <Todo completed title="complete" />

      {/* This todo is not completed */}
      <Todo title="not complete" />

      <Todo title="not complete" loading />

    </section>
  );
};

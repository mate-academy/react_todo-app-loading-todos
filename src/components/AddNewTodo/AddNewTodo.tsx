interface Props {
  // to be added
}

export const AddNewTodo: React.FC<Props> = () => {
  return (
    // Add a todo on form submit
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export const filteredTodos = todos.filter(task => {
  switch (status) {
    case Status.Active:
      return !task.completed;
    case Status.Completed:
      return task.completed;
    case Status.All:
    default:
      return true;
  }
});

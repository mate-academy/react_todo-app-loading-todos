# React Todo App Load Todos

It is the first part of the React Todo App with API. You will implement the
final app step by step and use the result of this task in the next tasks.

You are given the markup of the Todo App. Split it into components and
implement the functionality saving all the changes to [the API](https://mate-academy.github.io/fe-students-api/).

> Here is [the working example](https://mate-academy.github.io/react_todo-app-with-api/)

## General info

You have an implemented simple login form. Enter your email to create a user
or find an existing one in the API.

- tests are NOT implemented yet.
- load the user todos when the `App` is loaded;
  - use [the working example](https://mate-academy.github.io/react_todo-app-with-api/) to create TODOs to have test data
- hide everything except the `NewTodoField` if there are no todos yet;

## Error messages []

In case of any error show the notification with an appropriate message at the bottom (just remove the `hidden` class).

- the notification can be closed with the `close` button (add the `hidden` class);
- automatically hide the notification in 3 seconds;
- also hide the notification before any next request;
- use a wrong todos URL to test the error.

## Filtering todos [x]

Filter todos by status `All` / `Active` / `Completed`:

- an active filter link should be hightlighted;
- don't hide everything if todos are just filtered out.

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_todo-app-loading-todos/) and add it to the PR description.


# React Todo App Add and Delete

It is the second part of the React Todo App with API.

Take your code implemented for [Loading todos](https://github.com/mate-academy/react_todo-app-loading-todos)
and implement the ability to and nd remove todos.

> Here is [the working example](https://mate-academy.github.io/react_todo-app-with-api/)

### [API Documentation](https://mate-academy.github.io/fe-students-api/)

## Adding a todo

Add a todo with the entered title on `NewTodoField` form submit:

- if the title is empty show the `Title can't be empty` notification at the bottom;   [xx]
- disable the input until receiving the response from the API (use `isAdding` variable);
- manually add a temp todo with `id: 0` **after** the list while waiting for the response (don't add it to the array);
- show the loader on the added todo (see the styles of the 5th todo `Redux`);
- use your user id for the new todo;
- send the POST response to the API;
- in case of success and add the todo create by API to the array;
- in case of API error show `Unable to add a todo` notification at the bottom;
- the temp todo should be removed in any case;

> Don't try to implement smooth Todo adding or removing (at least until you implemented everything else).
> If you really fill confident to try, there is a hint at the end of the description.

## Deleting todos

Remove a todo on `TodoDeleteButton` click:

- covered the todo with the loader while wating for API response;
- remove the todo from the list on success;
- in case of API error show `Unable to delete a todo` notification at the bottom (the todo must stay in the list);

Remove all the completed todos after `Clear completed` button click:

- the button should be visible if there is at least 1 completed todo;
- the deletion should work as a several individual deletions running at the same time;

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_todo-app-add-and-delete/) and add it to the PR description.

# # IF you want to implement smooth animations

<details>
  <summary>Click here to see the hint</summary>

  Use [React Transition Group](https://reactcommunity.org/react-transition-group/transition-group)

  ```tsx
  <section className="todoapp__main" data-cy="TodoList">
    <TransitionGroup>
      {visibleTodos.map(todo => (
        <CSSTransition
          key={todo.id}
          timeout={300}
          classNames="item"
        >
          <TodoItem
            todo={todo}
            isProcessed={processings.includes(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onUpdate={updateTodo}
          />
        </CSSTransition>
      ))}

      {creating && (
        <CSSTransition
          key={0}
          timeout={300}
          classNames="temp-item"
        >
          <TodoItem
            todo={{
              id: Math.random(),
              title,
              completed: false,
              userId: user.id,
            }}
            isProcessed
          />
        </CSSTransition>
      )}
    </TransitionGroup>
  </section>
  ```

  Here are the styles used in this example
  ```css
  .item-enter {
    max-height: 0;
  }

  .item-enter-active {
    overflow: hidden;
    max-height: 58px;
    transition: max-height 0.3s ease-in-out;
  }

  .item-exit {
    max-height: 58px;
  }

  .item-exit-active {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
  }

  .temp-item-enter {
    max-height: 0;
  }

  .temp-item-enter-active {
    overflow: hidden;
    max-height: 58px;
    transition: max-height 0.3s ease-in-out;
  }

  .temp-item-exit {
    max-height: 58px;
  }

  .temp-item-exit-active {
    transform: translateY(-58px);
    max-height: 0;
    opacity: 0;
    transition: 0.3s ease-in-out;
    transition-property: opacity, max-height, transform;
  }

  .has-error .temp-item-exit-active {
    transform: translateY(0);
    overflow: hidden;
  }
  ```
</details>


# React Todo App with API (complete)

It is the third part of the React Todo App with API.

Take your code implemented for [Add and Delete](https://github.com/mate-academy/react_todo-app-add-and-delete)
and implement the ability to toggle and rename todos.

> Here is [the working example](https://mate-academy.github.io/react_todo-app-with-api/)

## Toggling a todo status

Toggle the `completed` status on `TodoStatus` change:

- covered the todo with a loader overlay while wating for API response;
- the status should be changed on success;
- show the `Unable to update a todo` notification in case of API error.

Add the ability to toggle the completed status of all the todos with the `toggleAll` checkbox:

- `toggleAll` button should have `active` class only if all the todos are completed;
- `toggleAll` click changes its status to the oppsite one, and set it to all the todos;
- it should work the same as several individual updates of the todos which statuses were actually changed;
- do send requests for the todos that were not changed;

## Renaming a todo

Implement the ability to rename a todo title on double click:

- show the `TodoTitleField` instead of the `TodoTitle` and `TodoDeleteButton`;
- saves changes on the form submit (just press `Enter`);
- save changes when the field loses focus (`onBlur`);
- if new title is the same as the old one just cancel editing;
- cancel editing on `Ecs` key `keydown`;
- if the new title is empty delete the todo the same way the `x` button does it;
- if the title was changed show the loader while waiting for the API response;
- update the todo title on success;
- show `Unable to update a todo` in case of API error
- or the deletion error message if we tried to delete the todo;

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_todo-app-with-api/) and add it to the PR description.

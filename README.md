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
- hide everything except the `NewTodoField` if there are no todos yet;

## Error messages

In case of any error show the notification with an appropriate message at the bottom (just remove the `hidden` class).

- the notification can be closed with the `close` button (add the `hidden` class);
- automatically hide the notification in 3 seconds;
- also hide the notification before any next request;
- use a wrong todos URL to test the error.

## Filtering todos

Filter todos by status `All` / `Active` / `Completed`:

- an active filter link should be hightlighted;
- don't hide everything if todos are just filtered out.

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_todo-app-loading-todos/) and add it to the PR description.

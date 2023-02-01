# React Todo App Load Todos

It is the first part of the React Todo App with API. You will implement the
final app step by step and use the result of this task in the next tasks.

You are given the markup of the Todo App. Split it into components and
implement the functionality saving all the changes to [the API](https://mate-academy.github.io/fe-students-api/).

> Here is [the working example](https://mate-academy.github.io/react_todo-app-with-api/)
# ❗️❗️❗️<br>Please implement ONLY todos loading, errors and filtering. <br><br>All the rest will be implemented in the next tasks<br>❗️❗️❗️

## General info

Learn the `src/utils/fetchClient.ts` to understand how to use it to interact with the API.

If you want to implement it yourself you can delete the `fetchClient`.

- get your userId [here](https://mate-academy.github.io/react_student-registration/);
- use the working example page to create some todos for testing;
- load your todos when the `App` is loaded (put your userId instead of `???`);
    ```
    https://mate.academy/students-api/todos?userId=???
    ```
- hide everything except the `NewTodoField` if there are no todos yet;

## Error messages

In case of any error show the notification with an appropriate message at the bottom

- the notification can be closed with the `close` button (add the `hidden` class);
- automatically hide the notification after 3 seconds;
- also hide the notification before any next request;
- use a wrong todos URL to test the error;
- there are no tests yet.

## Filtering todos

Filter todos by status `All` / `Active` / `Completed`:

- `all` is the default value;
- use the `selected` class to highlight a selected link;

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_todo-app-loading-todos/) and add it to the PR description.

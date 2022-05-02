CREATE DATABASE todo;

CREATE TABLE todolist(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
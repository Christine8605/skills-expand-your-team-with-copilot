# Mergington High School Activities

A website application that allows students and teachers to view and manage extracurricular activities at Mergington High School.

## Features

- View all available extracurricular activities
- Filter activities by category (Sports, Arts, Academic, Community, Technology)
- Filter activities by day of the week
- Filter activities by time (Before School, After School, Weekend)
- Filter activities by difficulty level (Beginner, Intermediate, Advanced)
- Search activities by name
- Sign up a student for an activity (requires teacher login)
- Unregister a student from an activity (requires teacher login)
- Teacher login and logout
- Dark mode toggle

## API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/activities` | Get all activities, with optional filters: `day`, `start_time`, `end_time`, `difficulty` |
| GET | `/activities/days` | Get a list of all days that have activities scheduled |
| POST | `/activities/{activity_name}/signup?email=student@mergington.edu&teacher_username=username` | Sign up a student for an activity (teacher authentication required) |
| POST | `/activities/{activity_name}/unregister?email=student@mergington.edu&teacher_username=username` | Remove a student from an activity (teacher authentication required) |
| POST | `/auth/login?username=user&password=pass` | Log in a teacher account |
| GET | `/auth/check-session?username=user` | Check if a teacher session is valid |

> [!NOTE]
> Activity data is stored in a MongoDB database and will persist across server restarts.

## Development Guide

For detailed setup and development instructions, please refer to our [Development Guide](../docs/how-to-develop.md).

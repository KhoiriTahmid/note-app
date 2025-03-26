# Tasks API

### Create a Task

**POST /tasks** "api/tasks"
**Request Body:**

```json
{
  "teks": "Complete assignment",
  "startTime": "08:00:00",
  "finishTime": "10:00:00",
  "status": "uncompleted" | "completed",
  "notesId": "2025-02-10",
  "accountId": "uuid"
}
```

**Response:**

```json
{
  "id": "generated-uuid",
  "message": "Task created successfully"
}
```

### update a Task

**POST /tasks** "api/tasks/:notesId"
**Request Body:**

```json
{
  "teks": "Complete assignment",
  "startTime": "08:00:00",
  "finishTime": "10:00:00",
  "notesId": "2025-02-10",
  "accountId": "uuid"
}
```

**Response:**

```json
{
  "id": "generated-uuid",
  "teks": "Complete assignment",
  "startTime": "08:00:00",
  "finishTime": "10:00:00",
  "message": "Task created successfully"
}
```

### Get a Task

**GET /tasks** "api/tasks/:notesId"
**Response:**

```json
[
  {
    "id": "task-uuid",
    "teks": "Complete assignment",
    "startTime": "08:00:00",
    "finishTime": "10:00:00",
    "status": "pending",
    "notesId": "2025-02-10",
    "accountId": "uuid"
  }
]
```

### Get a week Tasks

**GET /tasks** "api/tasks/week/:plus&minus" --> currentDay - number = senin => currentStartWeek. then from that date to 6 day later. if there is plus or minus it will operate w currentStartWeek, 1 equals to 7 days
then find by date (which is notesId)
**Response:**

```json
[
  {
    "id": "task-uuid",
    "teks": "Complete assignment",
    "startTime": "08:00:00",
    "finishTime": "10:00:00",
    "status": "pending",
    "notesId": "2025-02-10",
    "accountId": "uuid"
  },....
]
```

### Update Task Status

**PUT /tasks/{id}** "api/tasks/status/:notesId"  
**Request Body:**

```json
{
  "status": "completed"
}
```

**Response:**

```json
{
  "message": "Task updated successfully"
}
```

### Delete a Task

**DELETE /tasks/{id}** "api/tasks/:id"
**Response:**

```json
{
  "message": "Task deleted successfully"
}
```

---

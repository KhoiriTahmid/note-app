# Notes Repeated Tasks API

### Assign Repeated Task to a Notes

**POST /notes_repeated_tasks** "api/notes_repeated_tasks" => add a task to multi custome notes
**Request Body:**

```json
{
  "dates": ["2025-02-10",...],
  "repeatedTaskId": "repeated-task-uuid",
  "accountId": "uuid"
}
```

**Response:**

```json
{
  "message": "Repeated task assigned to note successfully"
}
```

### Get Repeated Task to a Note

**GET /notes_repeated_tasks** "api/notes_repeated_tasks:notesId" ==> one note can have multi tasks

**Response:**

```json
[
  {
    "date": "2025-02-10",
    "repeatedTaskId": "repeated-task-uuid",
    "status": "uncompleted"
  }
]
```

### Get Repeated Task to a Note IN A WEEK

**GET /notes_repeated_tasks** "api/notes_repeated_tasks:startDate&finishDate" ==> one note can have multi tasks

**Response:**

```json
[
  "monday":[
    {
        "date": "2025-02-10",
        "repeatedTaskId": "repeated-task-uuid",
        "status": "uncompleted"
    },...
  ],....
]
```

### Update Status of a Repeated Task in a Note

**PUT /notes_repeated_tasks/{date}/{repeatedTaskId}** "api/notes_repeated_tasks/{date}&{repeatedTaskId}"
==> find by date & repeatedTaskId
**Request Body:**

```json
{
  "status": "completed"
}
```

**Response:**

```json
{
  "message": "Status updated successfully"
}
```

### Delete a Repeated Task from a Note

**DELETE /notes_repeated_tasks/{date}/{repeatedTaskId}**  
**Response:**

```json
{
  "message": "Repeated task removed from note successfully"
}
```

---

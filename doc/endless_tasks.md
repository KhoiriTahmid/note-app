# Repeated Endless Tasks API

### Create a Repeated Endless Task

**POST /repeated_endless_tasks**  
**Request Body:**

```json
{
  "teks": "Drink water",
  "startTime": "08:00:00",
  "finishTime": "08:15:00",
  "startDate": "",
  "type": "daily",
  "accountId": "uuid"
}
```

**Response:**

```json
{
  "id": "generated-uuid",
  "message": "Repeated endless task created successfully"
}
```

### Get All Repeated Endless Tasks in one note

**GET /repeated_endless_tasks** :/date
**Response:**

```json
[
  {
    "id": "task-uuid",
    "teks": "Drink water",
    "startTime": "08:00:00",
    "finishTime": "08:15:00",
    "type": "daily",
    "startDate": "2025-02-10T08:00:00Z",
    "uncomplitedDates": ["", ""],
    "accountId": "user@example.com"
  }
]
```

### Delete a Repeated Endless Task

**DELETE /repeated_endless_tasks/{id}**  
**Response:**

```json
{
  "message": "Repeated endless task deleted successfully"
}
```

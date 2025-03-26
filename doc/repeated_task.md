# Repeated Tasks API

### Create a Repeated Task

**POST /repeated_tasks**  
**Request Body:**

```json
{
  "teks": "Morning exercise",
  "startTime": "06:00:00",
  "finishTime": "06:30:00"
}
```

**Response:**

```json
{
  "id": "generated-uuid",
  "message": "Repeated task created successfully"
}
```

### Get Repeated Tasks based on relation result

**POST /repeated_tasks**

**Request Body:**

```json
{
  "ids": ["id1","id2",...],
}
```

**Response:**

```json
[
  {
    "id": "task-uuid",
    "teks": "Morning exercise",
    "startTime": "06:00:00",
    "finishTime": "06:30:00"
  },....
]
```

### Delete a Repeated Task

**DELETE /repeated_tasks/{id}**  
**Response:**

```json
{
  "message": "Repeated task deleted successfully"
}
```

---

# Notes API Specification

## Endpoints

### Create Note

**POST** `/api/notes`

#### Request Body

```json
{
  "date": "YYYY-MM-DD",
  "label": "string",
  "title": "string",
  "value": "string",
  "files": "string",
  "accountId": "string"
}
```

#### Response

```json
{
  "date": "YYYY-MM-DD",
  "label": "string",
  "title": "string",
  "value": "string",
  "files": "string",
  "accountId": "string"
}
```

### Get Note by Date

**GET** `/api/notes/{date}`

#### Response

```json
{
  "date": "YYYY-MM-DD",
  "label": "string",
  "title": "string",
  "value": "string",
  "files": "string",
  "accountId": "string"
}
```

### Get a week notes

**GET /notes** "api/notes/week/:plus&minus" --> currentDay - number = senin => currentStartWeek. then from that date to 6 day later. if there is plus or minus it will operate w currentStartWeek, 1 equals to 7 days
**Response:**

```json
[
  {
  "date": "YYYY-MM-DD",
  "label": "string",
  "title": "string",
  "value": "string",
  "files": "string",
  "accountId": "string"
  },....
]
```

### Get a month notes

**GET /notes** "api/notes/month/:plus&minus" --> like week task but its month
**Response:**

````json
[
  {
  "date": "YYYY-MM-DD",
  "label": "string",
  "title": "string",
  "value": "string",
  "files": "string",
  "accountId": "string"
  },....
]

### Update Note

**PUT** `/api/notes/{date}`

#### Request Body

```json
{
  "label": "string",
  "title": "string",
  "value": "string",
  "files": "string"
}
````

#### Response

```json
{
  "message": "Note updated successfully"
}
```

### Delete Note

**DELETE** `/api/notes/{date}`

#### Response

```json
{
  "message": "Note deleted successfully"
}
```

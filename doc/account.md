# User API Specification

## 1️⃣ Register User

**Endpoint:** `POST /api/users/register`
**Description:** Register a new user.

**Request Body:**

```json
{
  "username": "faizhaidar",
  "email": "faiz@example.com",
  "password": "strongpassword"
}
```

**Response (201 Created):**

```json
{
  "message": "User registered successfully",
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## 2️⃣ Login User

**Endpoint:** `POST /api/users/login`
**Description:** Authenticate user and return access token.

**Request Body:**

```json
{
  "email": "faiz@example.com",
  "password": "strongpassword"
}
```

**Response (200 OK):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1..."
}
```

---

## 3️⃣ Get User Profile

**Endpoint:** `GET /api/users/me`
**Description:** Get current logged-in user profile.

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1..."
}
```

**Response (200 OK):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "faizhaidar",
  "email": "faiz@example.com",
  "role": "user",
  "createdAt": "2024-02-09T10:00:00Z"
}
```

---

## 4️⃣ Update User Profile

**Endpoint:** `PUT /api/users/me`
**Description:** Update username or email.

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1..."
}
```

**Request Body:**

```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

**Response (200 OK):**

```json
{
  "message": "User profile updated successfully"
}
```

---

## 5️⃣ Change Password

**Endpoint:** `PUT /api/users/change-password`
**Description:** Update user password.

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1..."
}
```

**Request Body:**

```json
{
  "oldPassword": "oldpassword",
  "newPassword": "newstrongpassword"
}
```

**Response (200 OK):**

```json
{
  "message": "Password updated successfully"
}
```

---

## 6️⃣ Delete User Account

**Endpoint:** `DELETE /api/users/me`
**Description:** Delete user account and related data.

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1..."
}
```

**Response (200 OK):**

```json
{
  "message": "User account deleted successfully"
}
```

# Vedaz Real-Time Chat Application - Requirements Spec

This document details the objective, features, and guidelines for building the real-time chat application.

---

## 📋 Objective

Build a real-time chat application using **React Native** (preferred) or **React** for the frontend, and **Node.js** + **Express** + **Socket.io** for the backend.

---

## 1. Frontend Requirements (Web/Mobile)

- **Framework**: React Native (preferred) or React (e.g., Next.js).
- **UI/UX**: Create a clean, modern, and user-friendly chat interface.
- **Core Features**:
  - Send messages to other users.
  - Receive messages instantly (real-time).
  - Persist and view chat history (messages should persist after refreshing).
  - Display timestamps for all messages.

---

## 2. Backend & Real-Time Communication

### REST APIs

The backend must implement the following endpoints:

- **Send Message**: API to receive and store a new message.
- **Fetch History**: API to retrieve the historical list of messages.

### Socket.io Integration

- **Real-time Delivery**: Deliver messages instantly without requiring a page refresh or polling.
- **Broadcasting**: Broadcast incoming messages to all connected users in real time.
- **Connection Lifecycle**: Gracefully handle user connections and disconnections.

> [!IMPORTANT]
> The use of **Socket.io** is mandatory. Alternative approaches such as polling, Firebase, or other third-party services will not be accepted.

---

## 3. Code Quality & Architecture

- **Organization**: Structure the codebase logically with a meaningful folder hierarchy.
- **Best Practices**: Follow clean architecture patterns and implement reusable code/components.
- **Resilience**: Handle API errors and Socket connection failures gracefully.
- **Maintainability**: Ensure code is clean, readable, and easily maintainable.

---

## 4. Documentation (README.md)

The repository must contain a comprehensive README that includes:

- Detailed project setup instructions.
- Step-by-step guides to run the frontend application.
- Step-by-step guides to run the backend server.
- Description of all required environment variables.
- Summary of design decisions and architecture.
- List of assumptions made during development.

---

## 5. Bonus Features (Optional)

If time permits, the following optional features can be implemented:

- **Authentication**: Dummy username-based login.
- **Typing Indicator**: Show when another user is typing.
- **User Status**: Display online/offline indicators for users.
- **Message Status**: Show read/delivered status for messages.
- **Database**: Persist messages in a database (e.g., MongoDB, SQLite, PostgreSQL).
- **Deployment**: Deploy the backend to a cloud hosting platform (e.g., Render, Railway) and provide the live API URL.

---

## 🛡️ Submission & Deadline

Please submit:

1. **GitHub Repository**: Link to the public or shared repository.
2. **Application Demo**:
   - An **APK file** (if React Native is used).
   - A **Screen Recording** of the working application (shared via Google Drive link) if an APK cannot be built.
3. **Setup Guide**: Completed README with instructions.

⏰ **Deadline**: 24 hours.

# Blogit - Blogging Application

A fully featured, secure CRUD Blogging Application built using **Node.js, Express, MongoDB (Mongoose), and EJS**. 

---

## Features

- **User Authentication**:
  - Secure registration & login with passwords hashed using `bcrypt`.
  - Session management using JSON Web Tokens (JWT) stored in HTTP-only cookies.
  - Role-based design (User/Admin).
- **Blog Management (CRUD)**:
  - **Create**: Write and publish new blogs with a title, content, and cover image upload support (via `multer`).
  - **Read**: Browse all blogs chronologically on the homepage with smart text truncation, or read the full details of a specific blog.
  - **Update**: Edit existing blog posts (Title, Content, and Cover Image). Old images are automatically deleted from server disk when replaced.
  - **Delete**: Remove blog posts. All associated uploaded cover images and database comments are automatically cleaned up.
  - **Ownership Authorization**: Only the creator of a blog post can edit or delete it.
- **Commenting System**:
  - Logged-in users can write comments on any blog post.
  - Comments display the commenter's profile picture and full name (or "Guest User" if details are unavailable).

---

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose ORM
- **Authentication**: JSON Web Tokens (JWT), Cookies, Bcrypt
- **File Uploads**: Multer
- **Frontend Template Engine**: EJS (Embedded JavaScript)
- **Styling**: Bootstrap 5

---

## Directory Structure

```text
├── controllers/          # Request handler functions (Blog, User, Comment)
├── middlewares/          # Custom express middleware (e.g. checkAuthentication)
├── models/               # MongoDB/Mongoose schemas (User, Blog, Comment)
├── public/               # Static assets (images, uploads directory)
├── routes/               # Express router configurations
├── services/             # Helper services (e.g. JWT token generation/validation)
├── views/                # EJS template views
│   ├── partials/         # EJS reusable layout sections (nav, head, scripts)
│   ├── addBlog.ejs       # Write blog post view
│   ├── editBlog.ejs      # Edit blog post view
│   ├── blog.ejs          # Single blog view
│   ├── home.ejs          # Homepage/blogs listing view
│   ├── signin.ejs        # Login form
│   └── signup.ejs        # Signup form
├── .env.example          # Template for environment variables
├── connection.js         # MongoDB connection helper
├── index.js              # Main server entrypoint
└── package.json          # Node dependencies and scripts
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on your machine.

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbhishekSohal/Blogging-Application.git
   cd Blogging-Application
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and copy the contents from `.env.example`:
   ```env
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/blogit
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Run the Application**:
   - For production / standard run:
     ```bash
     npm start
     ```
   - For development (with nodemon auto-restart):
     ```bash
     npm run dev
     ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## API Routes Overview

### User Routes (`/user`)
- `GET /user/signup` - Render register page.
- `POST /user/signup` - Register a new user.
- `GET /user/signin` - Render sign-in page.
- `POST /user/signin` - Login and receive JWT cookie.
- `GET /user/signout` - Clear cookie and logout.

### Blog Routes (`/blog`)
- `GET /blog/add` - Render blog creation form.
- `POST /blog/` - Create a new blog post.
- `GET /blog/:id` - View single blog post and comments.
- `GET /blog/edit/:id` - Render blog edit page (Authorized author only).
- `POST /blog/edit/:id` - Update a blog post (Authorized author only).
- `POST /blog/delete/:id` - Delete a blog post (Authorized author only).

### Comment Routes (`/blog/comment`)
- `POST /blog/comment/:blogId` - Add a comment to a blog post.
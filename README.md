# KolayVilla - Real Estate Listing Platform

A modern real estate listing platform built with Cloudflare Workers, D1 (SQLite), R2 (Object Storage), and Hono framework.

## Features

- **User Authentication**: JWT-based authentication with email and phone number
- **Two User Types**:
  - **Normal Users**: Can browse listings, create listings (if enabled), and message other users
  - **Agents**: Real estate agents with dedicated profile pages showing all their listings
- **Property Listings**: Full CRUD operations for property listings with image upload support
- **Messaging System**: Users can communicate with each other about properties
- **Admin Dashboard**: Manage users, toggle listing permissions, and moderate content
- **Search & Filter**: Search properties by location, price, type, etc.
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Backend**: Cloudflare Workers with Hono framework
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 for images
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: Vanilla JavaScript (SPA)

## Project Structure

```
/kolayvilla
├── /backend
│   ├── /models           # Data models (User, Listing, Message)
│   ├── /controllers      # Request handlers
│   ├── /routes           # API route definitions
│   ├── /middleware       # Authentication middleware
│   ├── /utils            # Utility functions (JWT)
│   └── worker.js         # Main Cloudflare Worker entry point
├── /migrations           # Database schema migrations
├── package.json          # Project dependencies
└── wrangler.toml         # Cloudflare Workers configuration
```

## Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account
- Wrangler CLI installed globally: `npm install -g wrangler`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Login to Cloudflare

```bash
wrangler login
```

### 3. Create D1 Database

```bash
wrangler d1 create kolayvilla-db
```

Copy the database ID from the output and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "kolayvilla-db"
database_id = "YOUR_DATABASE_ID_HERE"  # Replace with actual ID
```

### 4. Run Database Migrations

```bash
wrangler d1 execute kolayvilla-db --file=./migrations/0001_initial_schema.sql
```

For production:
```bash
wrangler d1 execute kolayvilla-db --file=./migrations/0001_initial_schema.sql --remote
```

### 5. Create R2 Bucket

```bash
wrangler r2 bucket create kolayvilla-images
```

### 6. Update Environment Variables

Update `wrangler.toml` with your JWT secret:

```toml
[vars]
JWT_SECRET = "your-secure-random-jwt-secret-here"  # Change this!
```

**IMPORTANT**: For production, use a strong, randomly generated secret:

```bash
# Generate a secure random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 7. Local Development

Start the development server:

```bash
npm run dev
# or
wrangler dev
```

The app will be available at `http://localhost:8787`

### 8. Deploy to Production

```bash
npm run deploy
# or
wrangler deploy
```

## API Documentation

### Authentication Endpoints

#### Register
- **POST** `/api/auth/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "phone_number": "+1234567890",
    "password": "password123",
    "user_type": "normal"  // or "agent"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- **Headers**: `Authorization: Bearer <token>`

### User Endpoints

- **GET** `/api/users/agents` - Get all agents (public)
- **GET** `/api/users/:id` - Get user by ID (public)
- **GET** `/api/users` - Get all users (admin only)
- **PUT** `/api/users/:id` - Update user (self or admin)
- **DELETE** `/api/users/:id` - Delete user (admin only)
- **POST** `/api/users/:id/toggle-listing` - Toggle user listing permission (admin only)
- **POST** `/api/users/:id/toggle-active` - Toggle user active status (admin only)

### Listing Endpoints

- **GET** `/api/listings` - Get all active listings (public)
- **GET** `/api/listings/search` - Search listings (public)
- **GET** `/api/listings/my` - Get current user's listings (protected)
- **GET** `/api/listings/agent/:id` - Get agent's listings (public)
- **GET** `/api/listings/:id` - Get listing by ID (public)
- **POST** `/api/listings` - Create listing (protected)
- **PUT** `/api/listings/:id` - Update listing (protected)
- **DELETE** `/api/listings/:id` - Delete listing (protected)
- **POST** `/api/listings/:id/images` - Upload image (protected)
- **DELETE** `/api/listings/:id/images/:imageId` - Delete image (protected)

### Message Endpoints

- **POST** `/api/messages` - Send message (protected)
- **GET** `/api/messages/inbox` - Get inbox (protected)
- **GET** `/api/messages/sent` - Get sent messages (protected)
- **GET** `/api/messages/unread-count` - Get unread count (protected)
- **GET** `/api/messages/conversation/:otherUserId` - Get conversation (protected)
- **GET** `/api/messages/listing/:listingId` - Get messages for listing (protected)
- **PUT** `/api/messages/:id/read` - Mark as read (protected)
- **DELETE** `/api/messages/:id` - Delete message (protected)

## Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique email address
- `phone_number` - Unique phone number
- `password_hash` - Hashed password
- `user_type` - 'normal' or 'agent'
- `can_list` - Whether user can create listings (1 or 0)
- `is_active` - Whether user account is active
- `is_admin` - Whether user has admin privileges
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Listings Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `title` - Property title
- `description` - Property description
- `price` - Property price
- `location` - Property location
- `property_type` - Type of property
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms
- `area` - Property area in m²
- `status` - 'active', 'sold', 'pending', or 'inactive'
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Listing Images Table
- `id` - Primary key
- `listing_id` - Foreign key to listings
- `image_url` - Image URL in R2
- `is_primary` - Whether this is the primary image
- `display_order` - Display order
- `created_at` - Timestamp

### Messages Table
- `id` - Primary key
- `sender_id` - Foreign key to users
- `recipient_id` - Foreign key to users
- `listing_id` - Optional foreign key to listings
- `subject` - Message subject
- `message` - Message content
- `is_read` - Whether message has been read
- `created_at` - Timestamp

## Creating an Admin User

To create an admin user, you'll need to directly update the database:

```bash
# First, register a normal user through the API or UI
# Then, update the user to be an admin

wrangler d1 execute kolayvilla-db --command "UPDATE users SET is_admin = 1 WHERE email = 'admin@example.com'"

# For production:
wrangler d1 execute kolayvilla-db --command "UPDATE users SET is_admin = 1 WHERE email = 'admin@example.com'" --remote
```

## Features by User Type

### Normal Users
- Browse all listings
- View agent profiles
- Register and create account
- Create listings (if `can_list = 1`)
- Send and receive messages
- Manage their own listings

### Agents
- All normal user features
- Dedicated agent profile page
- All their listings displayed on their profile
- Listed in the "Agents" directory

### Admins
- All user features
- Access to admin dashboard
- Manage all users
- Toggle user listing permissions
- Activate/deactivate user accounts
- Delete users and listings
- View all messages

## Troubleshooting

### Database Connection Issues
Make sure you've created the D1 database and updated the `database_id` in `wrangler.toml`.

### R2 Image Upload Issues
Ensure the R2 bucket exists and is properly configured in `wrangler.toml`.

### Authentication Issues
Verify that `JWT_SECRET` is set in `wrangler.toml` and matches between local and production environments.

### Migration Issues
If migrations fail, you can reset the database:
```bash
# Warning: This will delete all data!
wrangler d1 execute kolayvilla-db --command "DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS listings; DROP TABLE IF EXISTS listing_images; DROP TABLE IF EXISTS messages;"

# Then re-run migrations
wrangler d1 execute kolayvilla-db --file=./migrations/0001_initial_schema.sql
```

## Development Tips

### Testing API Endpoints
Use curl or Postman to test endpoints:

```bash
# Register a user
curl -X POST http://localhost:8787/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","phone_number":"+1234567890","password":"test123","user_type":"normal"}'

# Login
curl -X POST http://localhost:8787/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get listings
curl http://localhost:8787/api/listings
```

### Viewing Database Contents
```bash
# Local database
wrangler d1 execute kolayvilla-db --command "SELECT * FROM users"

# Production database
wrangler d1 execute kolayvilla-db --command "SELECT * FROM users" --remote
```

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

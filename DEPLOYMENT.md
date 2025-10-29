# KolayVilla Deployment Guide

This guide will walk you through deploying KolayVilla to Cloudflare Workers.

## Prerequisites

1. A Cloudflare account (free tier works)
2. Wrangler CLI installed: `npm install -g wrangler`
3. Node.js 18+ and npm installed

## Step-by-Step Deployment

### Step 1: Clone and Setup

```bash
cd kolayvilla
npm install
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open a browser window for you to authenticate with Cloudflare.

### Step 3: Create D1 Database

```bash
wrangler d1 create kolayvilla-db
```

**Output will look like:**
```
✅ Successfully created DB 'kolayvilla-db'

[[d1_databases]]
binding = "DB"
database_name = "kolayvilla-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Important:** Copy the `database_id` from the output.

### Step 4: Update wrangler.toml

Open `wrangler.toml` and update the database_id:

```toml
[[d1_databases]]
binding = "DB"
database_name = "kolayvilla-db"
database_id = "YOUR_ACTUAL_DATABASE_ID_HERE"  # ← Paste the ID here
```

### Step 5: Run Database Migrations

First, test locally:
```bash
wrangler d1 execute kolayvilla-db --local --file=./migrations/0001_initial_schema.sql
```

Then run on production:
```bash
wrangler d1 execute kolayvilla-db --remote --file=./migrations/0001_initial_schema.sql
```

### Step 6: Create R2 Bucket

```bash
wrangler r2 bucket create kolayvilla-images
```

This bucket is already configured in `wrangler.toml`.

### Step 7: Generate and Set JWT Secret

Generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Update `wrangler.toml` with the generated secret:

```toml
[vars]
JWT_SECRET = "paste-generated-secret-here"
```

### Step 8: Test Locally

```bash
npm run dev
```

Visit `http://localhost:8787` to test the application.

### Step 9: Deploy to Production

```bash
npm run deploy
```

**Output will show:**
```
Published kolayvilla (0.01 sec)
  https://kolayvilla.YOUR_SUBDOMAIN.workers.dev
```

Your application is now live! 🎉

### Step 10: Create First Admin User

1. Visit your deployed URL
2. Register a new user through the UI
3. Make that user an admin via command line:

```bash
wrangler d1 execute kolayvilla-db --remote --command "UPDATE users SET is_admin = 1 WHERE email = 'youradmin@example.com'"
```

## Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to Cloudflare Dashboard > Workers & Pages
2. Click on your worker (kolayvilla)
3. Go to "Triggers" tab
4. Click "Add Custom Domain"
5. Enter your domain (e.g., kolayvilla.com)
6. Follow DNS configuration instructions

### Environment Variables

For production, you may want to use secrets instead of vars for sensitive data:

```bash
wrangler secret put JWT_SECRET
# You'll be prompted to enter the secret value
```

Then update `wrangler.toml` to remove JWT_SECRET from [vars].

### Monitoring and Logs

View logs:
```bash
wrangler tail
```

Or view in the Cloudflare dashboard:
1. Go to Workers & Pages
2. Click on your worker
3. Go to "Logs" tab

## Database Management

### View Data

```bash
# List all users
wrangler d1 execute kolayvilla-db --remote --command "SELECT id, email, user_type, is_admin FROM users"

# List all listings
wrangler d1 execute kolayvilla-db --remote --command "SELECT id, title, price, location FROM listings"

# Count records
wrangler d1 execute kolayvilla-db --remote --command "SELECT (SELECT COUNT(*) FROM users) as users, (SELECT COUNT(*) FROM listings) as listings"
```

### Backup Database

```bash
wrangler d1 backup create kolayvilla-db
```

### Reset Database (DANGER!)

```bash
# This will delete ALL data!
wrangler d1 execute kolayvilla-db --remote --command "DROP TABLE IF EXISTS messages; DROP TABLE IF EXISTS listing_images; DROP TABLE IF EXISTS listings; DROP TABLE IF EXISTS users;"

# Then re-run migrations
wrangler d1 execute kolayvilla-db --remote --file=./migrations/0001_initial_schema.sql
```

## Testing API Endpoints

After deployment, test your API:

```bash
# Replace YOUR_WORKER_URL with your actual worker URL

# Health check
curl https://YOUR_WORKER_URL/health

# Register user
curl -X POST https://YOUR_WORKER_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone_number": "+1234567890",
    "password": "test123",
    "user_type": "normal"
  }'

# Login
curl -X POST https://YOUR_WORKER_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'

# Get listings
curl https://YOUR_WORKER_URL/api/listings
```

## Updating Your Application

### Deploy Updates

1. Make your code changes
2. Test locally with `npm run dev`
3. Deploy with `npm run deploy`

### Database Migrations

If you add new migration files:

```bash
wrangler d1 execute kolayvilla-db --remote --file=./migrations/XXXX_new_migration.sql
```

## Troubleshooting

### Error: "Database not found"
- Make sure you created the D1 database
- Verify the database_id in wrangler.toml matches your database

### Error: "R2 bucket not found"
- Create the R2 bucket: `wrangler r2 bucket create kolayvilla-images`
- Make sure the bucket name in wrangler.toml matches

### Error: "Authentication failed"
- Check that JWT_SECRET is set in wrangler.toml
- Try generating a new secret

### Images not loading
- Verify R2 bucket exists
- Check browser console for CORS errors
- Ensure image URLs are correct

### Can't login after deployment
- Clear browser localStorage
- Check that the database was migrated correctly
- Verify JWT_SECRET is the same across deployments

## Cost Estimation

Cloudflare's free tier includes:
- Workers: 100,000 requests/day
- D1: 5 GB storage, 5 million reads/day
- R2: 10 GB storage, 1 million Class A operations/month

This is sufficient for small to medium-sized applications. Monitor usage in the Cloudflare dashboard.

## Support

If you encounter issues:
1. Check Cloudflare Workers documentation
2. View logs with `wrangler tail`
3. Check the Cloudflare dashboard for errors
4. Open an issue on GitHub

## Next Steps

After deployment, you can:
1. Create your first admin user
2. Register some test users (normal and agent types)
3. Create sample listings
4. Test the messaging system
5. Customize the frontend styling
6. Add your custom domain
7. Set up monitoring and alerts

Congratulations on deploying KolayVilla! 🏠

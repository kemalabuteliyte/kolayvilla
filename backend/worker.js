import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createApiRoutes } from './routes/api.js';

const app = new Hono();

// CORS configuration
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount API routes
const apiRoutes = createApiRoutes();
app.route('/api', apiRoutes);

// Serve images from R2
app.get('/images/:filename', async (c) => {
  const filename = c.req.param('filename');

  try {
    const object = await c.env.IMAGES.get(filename);

    if (!object) {
      return c.json({ error: 'Image not found' }, 404);
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('cache-control', 'public, max-age=31536000');

    return new Response(object.body, {
      headers,
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return c.json({ error: 'Failed to serve image' }, 500);
  }
});

// Serve static frontend files
app.get('/*', async (c) => {
  const url = new URL(c.req.url);
  let path = url.pathname;

  // Default to index.html for root path
  if (path === '/') {
    path = '/index.html';
  }

  // Route frontend paths to index.html for SPA routing
  const frontendPaths = ['/login', '/register', '/listings', '/agents', '/dashboard', '/messages', '/admin'];
  if (frontendPaths.some(p => path.startsWith(p))) {
    path = '/index.html';
  }

  try {
    // Try to fetch from the frontend public directory
    // In production, these would be uploaded to R2 or Workers KV
    // For now, we'll serve inline HTML
    if (path === '/index.html') {
      return c.html(getIndexHTML());
    } else if (path === '/styles.css') {
      return new Response(getStylesCSS(), {
        headers: { 'Content-Type': 'text/css' },
      });
    } else if (path === '/app.js') {
      return new Response(getAppJS(), {
        headers: { 'Content-Type': 'application/javascript' },
      });
    }

    return c.json({ error: 'Not found' }, 404);
  } catch (error) {
    console.error('Error serving static file:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Helper functions to serve inline frontend code
function getIndexHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KolayVilla - Real Estate Platform</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div id="app">
        <nav class="navbar">
            <div class="container">
                <div class="nav-brand">
                    <h1>KolayVilla</h1>
                </div>
                <div class="nav-menu" id="navMenu">
                    <a href="/" class="nav-link">Home</a>
                    <a href="/listings" class="nav-link">Listings</a>
                    <a href="/agents" class="nav-link">Agents</a>
                    <div id="authLinks"></div>
                </div>
            </div>
        </nav>

        <main id="mainContent">
            <!-- Content will be dynamically loaded here -->
        </main>

        <footer class="footer">
            <div class="container">
                <p>&copy; 2024 KolayVilla. All rights reserved.</p>
            </div>
        </footer>
    </div>

    <script src="/app.js"></script>
</body>
</html>`;
}

function getStylesCSS() {
  return `/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navbar */
.navbar {
    background-color: #2c3e50;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-brand h1 {
    font-size: 1.5rem;
    color: #3498db;
}

.nav-menu {
    display: flex;
    gap: 1.5rem;
    align-items: center;
}

.nav-link {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-link:hover {
    color: #3498db;
}

/* Main Content */
main {
    min-height: calc(100vh - 200px);
    padding: 2rem 0;
}

/* Footer */
.footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-top: 3rem;
}

/* Buttons */
.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

.btn-primary:hover {
    background-color: #2980b9;
}

.btn-secondary {
    background-color: #95a5a6;
    color: white;
}

.btn-secondary:hover {
    background-color: #7f8c8d;
}

.btn-danger {
    background-color: #e74c3c;
    color: white;
}

.btn-danger:hover {
    background-color: #c0392b;
}

/* Forms */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-control:focus {
    outline: none;
    border-color: #3498db;
}

/* Cards */
.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.card-header {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #3498db;
}

/* Grid */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* Listing Card */
.listing-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.listing-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.listing-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background-color: #ecf0f1;
}

.listing-content {
    padding: 1.5rem;
}

.listing-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.listing-price {
    color: #3498db;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.listing-location {
    color: #7f8c8d;
    margin-bottom: 1rem;
}

.listing-details {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: #7f8c8d;
}

/* Alert */
.alert {
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.alert-error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.alert-info {
    background-color: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
}

/* Loading */
.loading {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
    color: #7f8c8d;
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
    color: white;
    padding: 4rem 0;
    text-align: center;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
}

/* Search Bar */
.search-bar {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin: -2rem auto 2rem;
    max-width: 800px;
}

.search-form {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 1rem;
}

@media (max-width: 768px) {
    .search-form {
        grid-template-columns: 1fr;
    }

    .nav-menu {
        flex-direction: column;
        gap: 0.5rem;
    }

    .hero h1 {
        font-size: 2rem;
    }
}`;
}

function getAppJS() {
  return `// App State
const state = {
    user: null,
    token: localStorage.getItem('token') || null,
    currentPage: window.location.pathname
};

// API Configuration
const API_BASE = '/api';

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (state.token) {
        headers['Authorization'] = \`Bearer \${state.token}\`;
    }

    const response = await fetch(\`\${API_BASE}\${endpoint}\`, {
        ...options,
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Request failed');
    }

    return data;
}

// Authentication functions
async function login(email, password) {
    const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });

    state.token = data.token;
    state.user = data.user;
    localStorage.setItem('token', data.token);
    return data;
}

async function register(email, phone_number, password, user_type) {
    const data = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, phone_number, password, user_type })
    });

    state.token = data.token;
    state.user = data.user;
    localStorage.setItem('token', data.token);
    return data;
}

function logout() {
    state.token = null;
    state.user = null;
    localStorage.removeItem('token');
    navigate('/');
}

async function getCurrentUser() {
    if (!state.token) return null;

    try {
        const data = await apiCall('/auth/me');
        state.user = data.user;
        return data.user;
    } catch (error) {
        console.error('Failed to get current user:', error);
        logout();
        return null;
    }
}

// Navigation
function navigate(path) {
    window.history.pushState({}, '', path);
    state.currentPage = path;
    router();
}

// Router
function router() {
    const path = window.location.pathname;
    const mainContent = document.getElementById('mainContent');

    if (path === '/' || path === '/index.html') {
        renderHome(mainContent);
    } else if (path === '/login') {
        renderLogin(mainContent);
    } else if (path === '/register') {
        renderRegister(mainContent);
    } else if (path === '/listings') {
        renderListings(mainContent);
    } else if (path === '/agents') {
        renderAgents(mainContent);
    } else if (path === '/dashboard') {
        renderDashboard(mainContent);
    } else if (path === '/messages') {
        renderMessages(mainContent);
    } else if (path === '/admin') {
        renderAdmin(mainContent);
    } else if (path.startsWith('/listing/')) {
        const id = path.split('/')[2];
        renderListingDetail(mainContent, id);
    } else if (path.startsWith('/agent/')) {
        const id = path.split('/')[2];
        renderAgentProfile(mainContent, id);
    } else {
        mainContent.innerHTML = '<div class="container"><h1>404 - Page Not Found</h1></div>';
    }

    updateNavigation();
}

// Update navigation based on auth state
function updateNavigation() {
    const authLinks = document.getElementById('authLinks');

    if (state.user) {
        authLinks.innerHTML = \`
            <a href="/dashboard" class="nav-link">Dashboard</a>
            <a href="/messages" class="nav-link">Messages</a>
            \${state.user.is_admin ? '<a href="/admin" class="nav-link">Admin</a>' : ''}
            <a href="#" onclick="logout(); return false;" class="nav-link">Logout</a>
        \`;
    } else {
        authLinks.innerHTML = \`
            <a href="/login" class="nav-link">Login</a>
            <a href="/register" class="nav-link">Register</a>
        \`;
    }
}

// Page Renderers
function renderHome(container) {
    container.innerHTML = \`
        <div class="hero">
            <div class="container">
                <h1>Find Your Dream Home</h1>
                <p>Discover the best properties in your area</p>
                <a href="/listings" class="btn btn-primary">Browse Listings</a>
            </div>
        </div>
        <div class="container">
            <div class="search-bar">
                <form class="search-form" onsubmit="handleSearch(event)">
                    <input type="text" class="form-control" placeholder="Search location..." id="searchLocation">
                    <input type="number" class="form-control" placeholder="Max price" id="searchPrice">
                    <button type="submit" class="btn btn-primary">Search</button>
                </form>
            </div>
            <h2 style="margin-top: 2rem;">Featured Listings</h2>
            <div id="featuredListings" class="grid">
                <div class="loading">Loading listings...</div>
            </div>
        </div>
    \`;

    loadFeaturedListings();
}

async function loadFeaturedListings() {
    try {
        const data = await apiCall('/listings?limit=6');
        const container = document.getElementById('featuredListings');

        if (data.listings.length === 0) {
            container.innerHTML = '<p>No listings available yet.</p>';
            return;
        }

        container.innerHTML = data.listings.map(listing => createListingCard(listing)).join('');
    } catch (error) {
        document.getElementById('featuredListings').innerHTML = \`
            <div class="alert alert-error">Failed to load listings: \${error.message}</div>
        \`;
    }
}

function createListingCard(listing) {
    const primaryImage = listing.images?.find(img => img.is_primary) || listing.images?.[0];
    const imageUrl = primaryImage ? primaryImage.image_url : '/placeholder.jpg';

    return \`
        <div class="listing-card" onclick="navigate('/listing/\${listing.id}')">
            <img src="\${imageUrl}" alt="\${listing.title}" class="listing-image" onerror="this.src='/placeholder.jpg'">
            <div class="listing-content">
                <h3 class="listing-title">\${listing.title}</h3>
                <div class="listing-price">$\${Number(listing.price).toLocaleString()}</div>
                <div class="listing-location">\${listing.location}</div>
                <div class="listing-details">
                    <span>\${listing.bedrooms || 0} beds</span>
                    <span>\${listing.bathrooms || 0} baths</span>
                    <span>\${listing.area || 0} m²</span>
                </div>
            </div>
        </div>
    \`;
}

function renderLogin(container) {
    if (state.user) {
        navigate('/dashboard');
        return;
    }

    container.innerHTML = \`
        <div class="container">
            <div class="card" style="max-width: 500px; margin: 2rem auto;">
                <h2 class="card-header">Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" id="loginEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" id="loginPassword" required>
                    </div>
                    <div id="loginError"></div>
                    <button type="submit" class="btn btn-primary">Login</button>
                    <p style="margin-top: 1rem;">Don't have an account? <a href="/register">Register here</a></p>
                </form>
            </div>
        </div>
    \`;

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');

    try {
        await login(email, password);
        navigate('/dashboard');
    } catch (error) {
        errorDiv.innerHTML = \`<div class="alert alert-error">\${error.message}</div>\`;
    }
}

function renderRegister(container) {
    if (state.user) {
        navigate('/dashboard');
        return;
    }

    container.innerHTML = \`
        <div class="container">
            <div class="card" style="max-width: 500px; margin: 2rem auto;">
                <h2 class="card-header">Register</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" id="regEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" class="form-control" id="regPhone" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" id="regPassword" required>
                    </div>
                    <div class="form-group">
                        <label>User Type</label>
                        <select class="form-control" id="regUserType">
                            <option value="normal">Normal User</option>
                            <option value="agent">Real Estate Agent</option>
                        </select>
                    </div>
                    <div id="registerError"></div>
                    <button type="submit" class="btn btn-primary">Register</button>
                    <p style="margin-top: 1rem;">Already have an account? <a href="/login">Login here</a></p>
                </form>
            </div>
        </div>
    \`;

    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

async function handleRegister(e) {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    const userType = document.getElementById('regUserType').value;
    const errorDiv = document.getElementById('registerError');

    try {
        await register(email, phone, password, userType);
        navigate('/dashboard');
    } catch (error) {
        errorDiv.innerHTML = \`<div class="alert alert-error">\${error.message}</div>\`;
    }
}

function renderListings(container) {
    container.innerHTML = \`
        <div class="container">
            <h1>All Listings</h1>
            <div id="listingsGrid" class="grid">
                <div class="loading">Loading listings...</div>
            </div>
        </div>
    \`;

    loadAllListings();
}

async function loadAllListings() {
    try {
        const data = await apiCall('/listings');
        const container = document.getElementById('listingsGrid');

        if (data.listings.length === 0) {
            container.innerHTML = '<p>No listings available yet.</p>';
            return;
        }

        container.innerHTML = data.listings.map(listing => createListingCard(listing)).join('');
    } catch (error) {
        document.getElementById('listingsGrid').innerHTML = \`
            <div class="alert alert-error">Failed to load listings: \${error.message}</div>
        \`;
    }
}

function renderAgents(container) {
    container.innerHTML = \`
        <div class="container">
            <h1>Our Agents</h1>
            <div id="agentsGrid" class="grid">
                <div class="loading">Loading agents...</div>
            </div>
        </div>
    \`;

    loadAgents();
}

async function loadAgents() {
    try {
        const data = await apiCall('/users/agents');
        const container = document.getElementById('agentsGrid');

        if (data.agents.length === 0) {
            container.innerHTML = '<p>No agents available yet.</p>';
            return;
        }

        container.innerHTML = data.agents.map(agent => \`
            <div class="card" onclick="navigate('/agent/\${agent.id}')" style="cursor: pointer;">
                <h3>\${agent.email}</h3>
                <p>Phone: \${agent.phone_number}</p>
                <a href="/agent/\${agent.id}" class="btn btn-primary">View Profile</a>
            </div>
        \`).join('');
    } catch (error) {
        document.getElementById('agentsGrid').innerHTML = \`
            <div class="alert alert-error">Failed to load agents: \${error.message}</div>
        \`;
    }
}

function renderDashboard(container) {
    if (!state.user) {
        navigate('/login');
        return;
    }

    container.innerHTML = \`
        <div class="container">
            <h1>Dashboard</h1>
            <div class="card">
                <h3>Welcome, \${state.user.email}</h3>
                <p>User Type: \${state.user.user_type}</p>
                <p>Can List Properties: \${state.user.can_list ? 'Yes' : 'No'}</p>
            </div>
            \${state.user.can_list ? '<a href="#" onclick="showCreateListing(); return false;" class="btn btn-primary">Create New Listing</a>' : ''}
            <h2 style="margin-top: 2rem;">My Listings</h2>
            <div id="myListings" class="grid">
                <div class="loading">Loading your listings...</div>
            </div>
        </div>
    \`;

    loadMyListings();
}

async function loadMyListings() {
    try {
        const data = await apiCall('/listings/my');
        const container = document.getElementById('myListings');

        if (data.listings.length === 0) {
            container.innerHTML = '<p>You haven\'t created any listings yet.</p>';
            return;
        }

        container.innerHTML = data.listings.map(listing => createListingCard(listing)).join('');
    } catch (error) {
        document.getElementById('myListings').innerHTML = \`
            <div class="alert alert-error">Failed to load listings: \${error.message}</div>
        \`;
    }
}

function renderMessages(container) {
    if (!state.user) {
        navigate('/login');
        return;
    }

    container.innerHTML = \`
        <div class="container">
            <h1>Messages</h1>
            <div class="card">
                <p>Messaging system coming soon!</p>
            </div>
        </div>
    \`;
}

function renderAdmin(container) {
    if (!state.user || !state.user.is_admin) {
        navigate('/');
        return;
    }

    container.innerHTML = \`
        <div class="container">
            <h1>Admin Dashboard</h1>
            <div class="card">
                <p>Admin features coming soon!</p>
            </div>
        </div>
    \`;
}

function renderListingDetail(container, id) {
    container.innerHTML = \`
        <div class="container">
            <div id="listingDetail">
                <div class="loading">Loading listing details...</div>
            </div>
        </div>
    \`;

    loadListingDetail(id);
}

async function loadListingDetail(id) {
    try {
        const data = await apiCall(\`/listings/\${id}\`);
        const listing = data.listing;

        document.getElementById('listingDetail').innerHTML = \`
            <div class="card">
                <h1>\${listing.title}</h1>
                <div class="listing-price">$\${Number(listing.price).toLocaleString()}</div>
                <div class="listing-location">\${listing.location}</div>
                <div class="listing-details">
                    <span>\${listing.bedrooms || 0} bedrooms</span>
                    <span>\${listing.bathrooms || 0} bathrooms</span>
                    <span>\${listing.area || 0} m²</span>
                    <span>Type: \${listing.property_type}</span>
                </div>
                <hr style="margin: 1rem 0;">
                <h3>Description</h3>
                <p>\${listing.description}</p>
            </div>
        \`;
    } catch (error) {
        document.getElementById('listingDetail').innerHTML = \`
            <div class="alert alert-error">Failed to load listing: \${error.message}</div>
        \`;
    }
}

function renderAgentProfile(container, id) {
    container.innerHTML = \`
        <div class="container">
            <div id="agentProfile">
                <div class="loading">Loading agent profile...</div>
            </div>
            <h2 style="margin-top: 2rem;">Agent Listings</h2>
            <div id="agentListings" class="grid">
                <div class="loading">Loading listings...</div>
            </div>
        </div>
    \`;

    loadAgentProfile(id);
}

async function loadAgentProfile(id) {
    try {
        const userData = await apiCall(\`/users/\${id}\`);
        const listingsData = await apiCall(\`/listings/agent/\${id}\`);

        document.getElementById('agentProfile').innerHTML = \`
            <div class="card">
                <h1>Agent Profile</h1>
                <p>Email: \${userData.user.email}</p>
                <p>Phone: \${userData.user.phone_number}</p>
            </div>
        \`;

        const listingsContainer = document.getElementById('agentListings');
        if (listingsData.listings.length === 0) {
            listingsContainer.innerHTML = '<p>This agent has no listings yet.</p>';
        } else {
            listingsContainer.innerHTML = listingsData.listings.map(listing => createListingCard(listing)).join('');
        }
    } catch (error) {
        document.getElementById('agentProfile').innerHTML = \`
            <div class="alert alert-error">Failed to load agent profile: \${error.message}</div>
        \`;
    }
}

// Initialize app
window.addEventListener('DOMContentLoaded', async () => {
    // Load current user if token exists
    if (state.token) {
        await getCurrentUser();
    }

    // Set up router
    window.addEventListener('popstate', router);

    // Set up link click handler
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
            e.preventDefault();
            navigate(new URL(e.target.href).pathname);
        }
    });

    // Initial route
    router();
});

// Make functions available globally
window.navigate = navigate;
window.logout = logout;
window.handleSearch = function(e) {
    e.preventDefault();
    const location = document.getElementById('searchLocation').value;
    const price = document.getElementById('searchPrice').value;
    navigate(\`/listings?location=\${location}&maxPrice=\${price}\`);
};`;
}

export default app;

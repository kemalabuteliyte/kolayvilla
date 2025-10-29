import { Hono } from 'hono';
import { AuthController } from '../controllers/AuthController.js';
import { UserController } from '../controllers/UserController.js';
import { ListingController } from '../controllers/ListingController.js';
import { MessageController } from '../controllers/MessageController.js';
import { authMiddleware, adminMiddleware, optionalAuthMiddleware } from '../middleware/auth.js';

export function createApiRoutes() {
  const api = new Hono();

  // Public routes - Authentication
  api.post('/auth/register', (c) => AuthController.register(c));
  api.post('/auth/login', (c) => AuthController.login(c));

  // Protected routes - User profile
  api.get('/auth/me', authMiddleware, (c) => AuthController.me(c));

  // User routes
  api.get('/users/agents', (c) => UserController.getAgents(c)); // Public - get all agents
  api.get('/users/:id', optionalAuthMiddleware, (c) => UserController.getById(c)); // Public/Protected
  api.get('/users', authMiddleware, adminMiddleware, (c) => UserController.getAll(c)); // Admin only
  api.put('/users/:id', authMiddleware, (c) => UserController.update(c)); // Self or admin
  api.delete('/users/:id', authMiddleware, adminMiddleware, (c) => UserController.delete(c)); // Admin only
  api.post('/users/:id/toggle-listing', authMiddleware, adminMiddleware, (c) => UserController.toggleListingPermission(c)); // Admin only
  api.post('/users/:id/toggle-active', authMiddleware, adminMiddleware, (c) => UserController.toggleActiveStatus(c)); // Admin only

  // Listing routes
  api.get('/listings', optionalAuthMiddleware, (c) => ListingController.getAll(c)); // Public
  api.get('/listings/search', optionalAuthMiddleware, (c) => ListingController.search(c)); // Public
  api.get('/listings/my', authMiddleware, (c) => ListingController.getMyListings(c)); // Protected
  api.get('/listings/agent/:id', (c) => ListingController.getByAgent(c)); // Public - agent's listings
  api.get('/listings/:id', optionalAuthMiddleware, (c) => ListingController.getById(c)); // Public
  api.post('/listings', authMiddleware, (c) => ListingController.create(c)); // Protected
  api.put('/listings/:id', authMiddleware, (c) => ListingController.update(c)); // Protected
  api.delete('/listings/:id', authMiddleware, (c) => ListingController.delete(c)); // Protected
  api.post('/listings/:id/images', authMiddleware, (c) => ListingController.uploadImage(c)); // Protected
  api.delete('/listings/:id/images/:imageId', authMiddleware, (c) => ListingController.deleteImage(c)); // Protected

  // Message routes
  api.post('/messages', authMiddleware, (c) => MessageController.send(c)); // Protected
  api.get('/messages/inbox', authMiddleware, (c) => MessageController.getInbox(c)); // Protected
  api.get('/messages/sent', authMiddleware, (c) => MessageController.getSent(c)); // Protected
  api.get('/messages/unread-count', authMiddleware, (c) => MessageController.getUnreadCount(c)); // Protected
  api.get('/messages/conversation/:otherUserId', authMiddleware, (c) => MessageController.getConversation(c)); // Protected
  api.get('/messages/listing/:listingId', authMiddleware, (c) => MessageController.getByListing(c)); // Protected
  api.put('/messages/:id/read', authMiddleware, (c) => MessageController.markAsRead(c)); // Protected
  api.delete('/messages/:id', authMiddleware, (c) => MessageController.delete(c)); // Protected

  return api;
}

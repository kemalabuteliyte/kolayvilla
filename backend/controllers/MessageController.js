import { Message } from '../models/Message.js';

export class MessageController {
  // Send a message
  static async send(c) {
    try {
      const db = c.env.DB;
      const sender_id = c.get('userId');
      const { recipient_id, listing_id, subject, message } = await c.req.json();

      // Validate required fields
      if (!recipient_id || !subject || !message) {
        return c.json({ error: 'Recipient, subject, and message are required' }, 400);
      }

      // Don't allow sending messages to yourself
      if (sender_id === recipient_id) {
        return c.json({ error: 'Cannot send message to yourself' }, 400);
      }

      const newMessage = await Message.create(db, {
        sender_id,
        recipient_id,
        listing_id,
        subject,
        message,
      });

      return c.json({
        message: 'Message sent successfully',
        data: newMessage,
      }, 201);
    } catch (error) {
      console.error('Send message error:', error);
      return c.json({ error: 'Failed to send message: ' + error.message }, 500);
    }
  }

  // Get inbox
  static async getInbox(c) {
    try {
      const db = c.env.DB;
      const userId = c.get('userId');
      const { limit = 20, offset = 0, unread_only = 'false' } = c.req.query();

      const messages = await Message.getInbox(db, userId, {
        limit: parseInt(limit),
        offset: parseInt(offset),
        unread_only: unread_only === 'true',
      });

      const unreadCount = await Message.getUnreadCount(db, userId);

      return c.json({
        messages,
        unreadCount,
        count: messages.length,
      });
    } catch (error) {
      console.error('Get inbox error:', error);
      return c.json({ error: 'Failed to get inbox' }, 500);
    }
  }

  // Get sent messages
  static async getSent(c) {
    try {
      const db = c.env.DB;
      const userId = c.get('userId');
      const { limit = 20, offset = 0 } = c.req.query();

      const messages = await Message.getSent(db, userId, {
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return c.json({
        messages,
        count: messages.length,
      });
    } catch (error) {
      console.error('Get sent messages error:', error);
      return c.json({ error: 'Failed to get sent messages' }, 500);
    }
  }

  // Get conversation with another user
  static async getConversation(c) {
    try {
      const db = c.env.DB;
      const userId = c.get('userId');
      const { otherUserId } = c.req.param();
      const { limit = 50, offset = 0 } = c.req.query();

      const messages = await Message.getConversation(db, userId, parseInt(otherUserId), {
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      // Mark messages from other user as read
      await Message.markAllAsRead(db, userId, parseInt(otherUserId));

      return c.json({
        messages,
        count: messages.length,
      });
    } catch (error) {
      console.error('Get conversation error:', error);
      return c.json({ error: 'Failed to get conversation' }, 500);
    }
  }

  // Get messages for a listing
  static async getByListing(c) {
    try {
      const db = c.env.DB;
      const userId = c.get('userId');
      const { listingId } = c.req.param();
      const { limit = 20, offset = 0 } = c.req.query();

      const messages = await Message.getByListing(db, parseInt(listingId), userId, {
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return c.json({
        messages,
        count: messages.length,
      });
    } catch (error) {
      console.error('Get listing messages error:', error);
      return c.json({ error: 'Failed to get listing messages' }, 500);
    }
  }

  // Mark message as read
  static async markAsRead(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();
      const userId = c.get('userId');

      const message = await Message.getById(db, parseInt(id));
      if (!message) {
        return c.json({ error: 'Message not found' }, 404);
      }

      // Only recipient can mark as read
      if (message.recipient_id !== userId) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

      await Message.markAsRead(db, parseInt(id));

      return c.json({ message: 'Message marked as read' });
    } catch (error) {
      console.error('Mark as read error:', error);
      return c.json({ error: 'Failed to mark as read' }, 500);
    }
  }

  // Get unread count
  static async getUnreadCount(c) {
    try {
      const db = c.env.DB;
      const userId = c.get('userId');

      const count = await Message.getUnreadCount(db, userId);

      return c.json({ count });
    } catch (error) {
      console.error('Get unread count error:', error);
      return c.json({ error: 'Failed to get unread count' }, 500);
    }
  }

  // Delete message
  static async delete(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();
      const userId = c.get('userId');

      const message = await Message.getById(db, parseInt(id));
      if (!message) {
        return c.json({ error: 'Message not found' }, 404);
      }

      // Only sender or recipient can delete
      if (message.sender_id !== userId && message.recipient_id !== userId) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

      await Message.delete(db, parseInt(id));

      return c.json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Delete message error:', error);
      return c.json({ error: 'Failed to delete message' }, 500);
    }
  }
}

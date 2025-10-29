import { User } from '../models/User.js';

export class UserController {
  // Get all users (admin only)
  static async getAll(c) {
    try {
      const db = c.env.DB;
      const { limit = 50, offset = 0, user_type } = c.req.query();

      const users = await User.getAll(db, {
        limit: parseInt(limit),
        offset: parseInt(offset),
        user_type,
      });

      return c.json({
        users: users.map(u => u.toSafeObject()),
        count: users.length,
      });
    } catch (error) {
      console.error('Get users error:', error);
      return c.json({ error: 'Failed to get users' }, 500);
    }
  }

  // Get all agents
  static async getAgents(c) {
    try {
      const db = c.env.DB;
      const { limit = 50, offset = 0 } = c.req.query();

      const agents = await User.getAgents(db, {
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return c.json({
        agents: agents.map(a => a.toSafeObject()),
        count: agents.length,
      });
    } catch (error) {
      console.error('Get agents error:', error);
      return c.json({ error: 'Failed to get agents' }, 500);
    }
  }

  // Get user by ID
  static async getById(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();

      const user = await User.getById(db, parseInt(id));
      if (!user) {
        return c.json({ error: 'User not found' }, 404);
      }

      return c.json({ user: user.toSafeObject() });
    } catch (error) {
      console.error('Get user error:', error);
      return c.json({ error: 'Failed to get user' }, 500);
    }
  }

  // Update user (admin or self)
  static async update(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();
      const updates = await c.req.json();
      const currentUserId = c.get('userId');
      const isAdmin = c.get('isAdmin');

      const userId = parseInt(id);

      // Check permissions
      if (userId !== currentUserId && !isAdmin) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

      // Remove sensitive fields from updates if not admin
      if (!isAdmin) {
        delete updates.is_admin;
        delete updates.user_type;
      }

      const user = await User.update(db, userId, updates);

      return c.json({
        message: 'User updated successfully',
        user: user.toSafeObject(),
      });
    } catch (error) {
      console.error('Update user error:', error);
      return c.json({ error: 'Failed to update user: ' + error.message }, 500);
    }
  }

  // Delete user (admin only)
  static async delete(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();

      const userId = parseInt(id);

      // Don't allow deleting yourself
      if (userId === c.get('userId')) {
        return c.json({ error: 'Cannot delete your own account' }, 400);
      }

      const success = await User.delete(db, userId);

      if (!success) {
        return c.json({ error: 'Failed to delete user' }, 500);
      }

      return c.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      return c.json({ error: 'Failed to delete user' }, 500);
    }
  }

  // Toggle user listing permission (admin only)
  static async toggleListingPermission(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();
      const { can_list } = await c.req.json();

      const userId = parseInt(id);

      const user = await User.update(db, userId, { can_list: can_list ? 1 : 0 });

      return c.json({
        message: 'Listing permission updated',
        user: user.toSafeObject(),
      });
    } catch (error) {
      console.error('Toggle listing permission error:', error);
      return c.json({ error: 'Failed to update permission' }, 500);
    }
  }

  // Toggle user active status (admin only)
  static async toggleActiveStatus(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();
      const { is_active } = await c.req.json();

      const userId = parseInt(id);

      // Don't allow disabling yourself
      if (userId === c.get('userId')) {
        return c.json({ error: 'Cannot disable your own account' }, 400);
      }

      const user = await User.update(db, userId, { is_active: is_active ? 1 : 0 });

      return c.json({
        message: 'User status updated',
        user: user.toSafeObject(),
      });
    } catch (error) {
      console.error('Toggle active status error:', error);
      return c.json({ error: 'Failed to update status' }, 500);
    }
  }
}

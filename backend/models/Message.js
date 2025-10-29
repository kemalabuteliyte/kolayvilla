export class Message {
  constructor(data) {
    this.id = data.id;
    this.sender_id = data.sender_id;
    this.recipient_id = data.recipient_id;
    this.listing_id = data.listing_id;
    this.subject = data.subject;
    this.message = data.message;
    this.is_read = data.is_read || 0;
    this.created_at = data.created_at;
  }

  // Create a new message
  static async create(db, messageData) {
    const { sender_id, recipient_id, listing_id, subject, message } = messageData;

    const result = await db
      .prepare(
        `INSERT INTO messages (sender_id, recipient_id, listing_id, subject, message)
         VALUES (?, ?, ?, ?, ?)`
      )
      .bind(sender_id, recipient_id, listing_id, subject, message)
      .run();

    if (!result.success) {
      throw new Error('Failed to create message');
    }

    return await this.getById(db, result.meta.last_row_id);
  }

  // Get message by ID
  static async getById(db, id) {
    const result = await db
      .prepare('SELECT * FROM messages WHERE id = ?')
      .bind(id)
      .first();

    return result ? new Message(result) : null;
  }

  // Get messages for a user (inbox)
  static async getInbox(db, user_id, { limit = 20, offset = 0, unread_only = false } = {}) {
    let query = `
      SELECT m.*,
             s.email as sender_email,
             s.phone_number as sender_phone,
             l.title as listing_title
      FROM messages m
      JOIN users s ON m.sender_id = s.id
      LEFT JOIN listings l ON m.listing_id = l.id
      WHERE m.recipient_id = ?
    `;

    const params = [user_id];

    if (unread_only) {
      query += ` AND m.is_read = 0`;
    }

    query += ` ORDER BY m.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const result = await db.prepare(query).bind(...params).all();

    return result.results;
  }

  // Get sent messages for a user
  static async getSent(db, user_id, { limit = 20, offset = 0 } = {}) {
    const result = await db
      .prepare(
        `SELECT m.*,
                r.email as recipient_email,
                r.phone_number as recipient_phone,
                l.title as listing_title
         FROM messages m
         JOIN users r ON m.recipient_id = r.id
         LEFT JOIN listings l ON m.listing_id = l.id
         WHERE m.sender_id = ?
         ORDER BY m.created_at DESC
         LIMIT ? OFFSET ?`
      )
      .bind(user_id, limit, offset)
      .all();

    return result.results;
  }

  // Get conversation between two users
  static async getConversation(db, user1_id, user2_id, { limit = 50, offset = 0 } = {}) {
    const result = await db
      .prepare(
        `SELECT m.*,
                s.email as sender_email,
                r.email as recipient_email
         FROM messages m
         JOIN users s ON m.sender_id = s.id
         JOIN users r ON m.recipient_id = r.id
         WHERE (m.sender_id = ? AND m.recipient_id = ?)
            OR (m.sender_id = ? AND m.recipient_id = ?)
         ORDER BY m.created_at ASC
         LIMIT ? OFFSET ?`
      )
      .bind(user1_id, user2_id, user2_id, user1_id, limit, offset)
      .all();

    return result.results;
  }

  // Get messages related to a listing
  static async getByListing(db, listing_id, user_id, { limit = 20, offset = 0 } = {}) {
    const result = await db
      .prepare(
        `SELECT m.*,
                s.email as sender_email,
                r.email as recipient_email
         FROM messages m
         JOIN users s ON m.sender_id = s.id
         JOIN users r ON m.recipient_id = r.id
         WHERE m.listing_id = ?
           AND (m.sender_id = ? OR m.recipient_id = ?)
         ORDER BY m.created_at DESC
         LIMIT ? OFFSET ?`
      )
      .bind(listing_id, user_id, user_id, limit, offset)
      .all();

    return result.results;
  }

  // Mark message as read
  static async markAsRead(db, id) {
    const result = await db
      .prepare('UPDATE messages SET is_read = 1 WHERE id = ?')
      .bind(id)
      .run();

    return result.success;
  }

  // Mark all messages from a sender as read
  static async markAllAsRead(db, recipient_id, sender_id) {
    const result = await db
      .prepare(
        'UPDATE messages SET is_read = 1 WHERE recipient_id = ? AND sender_id = ?'
      )
      .bind(recipient_id, sender_id)
      .run();

    return result.success;
  }

  // Get unread count for a user
  static async getUnreadCount(db, user_id) {
    const result = await db
      .prepare(
        'SELECT COUNT(*) as count FROM messages WHERE recipient_id = ? AND is_read = 0'
      )
      .bind(user_id)
      .first();

    return result ? result.count : 0;
  }

  // Delete message
  static async delete(db, id) {
    const result = await db
      .prepare('DELETE FROM messages WHERE id = ?')
      .bind(id)
      .run();

    return result.success;
  }
}

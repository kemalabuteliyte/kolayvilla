import bcrypt from 'bcryptjs';

export class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.phone_number = data.phone_number;
    this.password_hash = data.password_hash;
    this.user_type = data.user_type || 'normal';
    this.can_list = data.can_list !== undefined ? data.can_list : 1;
    this.is_active = data.is_active !== undefined ? data.is_active : 1;
    this.is_admin = data.is_admin !== undefined ? data.is_admin : 0;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Create a new user
  static async create(db, { email, phone_number, password, user_type = 'normal' }) {
    const password_hash = await bcrypt.hash(password, 10);

    const result = await db
      .prepare(
        `INSERT INTO users (email, phone_number, password_hash, user_type)
         VALUES (?, ?, ?, ?)`
      )
      .bind(email, phone_number, password_hash, user_type)
      .run();

    if (!result.success) {
      throw new Error('Failed to create user');
    }

    return await this.getById(db, result.meta.last_row_id);
  }

  // Get user by ID
  static async getById(db, id) {
    const result = await db
      .prepare('SELECT * FROM users WHERE id = ?')
      .bind(id)
      .first();

    return result ? new User(result) : null;
  }

  // Get user by email
  static async getByEmail(db, email) {
    const result = await db
      .prepare('SELECT * FROM users WHERE email = ?')
      .bind(email)
      .first();

    return result ? new User(result) : null;
  }

  // Get user by phone number
  static async getByPhone(db, phone_number) {
    const result = await db
      .prepare('SELECT * FROM users WHERE phone_number = ?')
      .bind(phone_number)
      .first();

    return result ? new User(result) : null;
  }

  // Verify password
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password_hash);
  }

  // Update user
  static async update(db, id, updates) {
    const allowedFields = ['email', 'phone_number', 'user_type', 'can_list', 'is_active'];
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error('No valid fields to update');
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

    const result = await db.prepare(query).bind(...values).run();

    if (!result.success) {
      throw new Error('Failed to update user');
    }

    return await this.getById(db, id);
  }

  // Get all users (admin only)
  static async getAll(db, { limit = 50, offset = 0, user_type = null } = {}) {
    let query = 'SELECT * FROM users';
    const params = [];

    if (user_type) {
      query += ' WHERE user_type = ?';
      params.push(user_type);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const result = await db.prepare(query).bind(...params).all();

    return result.results.map(row => new User(row));
  }

  // Get agents only
  static async getAgents(db, { limit = 50, offset = 0 } = {}) {
    const result = await db
      .prepare(
        `SELECT * FROM users
         WHERE user_type = 'agent' AND is_active = 1
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`
      )
      .bind(limit, offset)
      .all();

    return result.results.map(row => new User(row));
  }

  // Delete user
  static async delete(db, id) {
    const result = await db
      .prepare('DELETE FROM users WHERE id = ?')
      .bind(id)
      .run();

    return result.success;
  }

  // Convert to safe object (without password)
  toSafeObject() {
    const { password_hash, ...safeData } = this;
    return safeData;
  }
}

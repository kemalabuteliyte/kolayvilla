export class Listing {
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.location = data.location;
    this.property_type = data.property_type;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.area = data.area;
    this.status = data.status || 'active';
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Create a new listing
  static async create(db, listingData) {
    const {
      user_id,
      title,
      description,
      price,
      location,
      property_type,
      bedrooms,
      bathrooms,
      area,
    } = listingData;

    const result = await db
      .prepare(
        `INSERT INTO listings (user_id, title, description, price, location, property_type, bedrooms, bathrooms, area)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(user_id, title, description, price, location, property_type, bedrooms, bathrooms, area)
      .run();

    if (!result.success) {
      throw new Error('Failed to create listing');
    }

    return await this.getById(db, result.meta.last_row_id);
  }

  // Get listing by ID
  static async getById(db, id) {
    const result = await db
      .prepare('SELECT * FROM listings WHERE id = ?')
      .bind(id)
      .first();

    return result ? new Listing(result) : null;
  }

  // Get all active listings
  static async getAll(db, { limit = 20, offset = 0, status = 'active' } = {}) {
    const result = await db
      .prepare(
        `SELECT l.*, u.email as owner_email, u.phone_number as owner_phone, u.user_type as owner_type
         FROM listings l
         JOIN users u ON l.user_id = u.id
         WHERE l.status = ?
         ORDER BY l.created_at DESC
         LIMIT ? OFFSET ?`
      )
      .bind(status, limit, offset)
      .all();

    return result.results;
  }

  // Get listings by user ID
  static async getByUserId(db, user_id, { limit = 20, offset = 0 } = {}) {
    const result = await db
      .prepare(
        `SELECT * FROM listings
         WHERE user_id = ?
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`
      )
      .bind(user_id, limit, offset)
      .all();

    return result.results.map(row => new Listing(row));
  }

  // Get listings by agent (for agent profile pages)
  static async getByAgent(db, agent_id, { limit = 20, offset = 0 } = {}) {
    const result = await db
      .prepare(
        `SELECT l.* FROM listings l
         JOIN users u ON l.user_id = u.id
         WHERE l.user_id = ? AND u.user_type = 'agent' AND l.status = 'active'
         ORDER BY l.created_at DESC
         LIMIT ? OFFSET ?`
      )
      .bind(agent_id, limit, offset)
      .all();

    return result.results.map(row => new Listing(row));
  }

  // Search listings
  static async search(db, { query = '', location = '', minPrice = 0, maxPrice = null, property_type = '', limit = 20, offset = 0 } = {}) {
    let sql = `
      SELECT l.*, u.email as owner_email, u.phone_number as owner_phone, u.user_type as owner_type
      FROM listings l
      JOIN users u ON l.user_id = u.id
      WHERE l.status = 'active'
    `;
    const params = [];

    if (query) {
      sql += ` AND (l.title LIKE ? OR l.description LIKE ?)`;
      params.push(`%${query}%`, `%${query}%`);
    }

    if (location) {
      sql += ` AND l.location LIKE ?`;
      params.push(`%${location}%`);
    }

    if (minPrice > 0) {
      sql += ` AND l.price >= ?`;
      params.push(minPrice);
    }

    if (maxPrice) {
      sql += ` AND l.price <= ?`;
      params.push(maxPrice);
    }

    if (property_type) {
      sql += ` AND l.property_type = ?`;
      params.push(property_type);
    }

    sql += ` ORDER BY l.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const result = await db.prepare(sql).bind(...params).all();

    return result.results;
  }

  // Update listing
  static async update(db, id, updates) {
    const allowedFields = [
      'title',
      'description',
      'price',
      'location',
      'property_type',
      'bedrooms',
      'bathrooms',
      'area',
      'status',
    ];
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

    const query = `UPDATE listings SET ${fields.join(', ')} WHERE id = ?`;

    const result = await db.prepare(query).bind(...values).run();

    if (!result.success) {
      throw new Error('Failed to update listing');
    }

    return await this.getById(db, id);
  }

  // Delete listing
  static async delete(db, id) {
    const result = await db
      .prepare('DELETE FROM listings WHERE id = ?')
      .bind(id)
      .run();

    return result.success;
  }

  // Add image to listing
  static async addImage(db, listing_id, image_url, is_primary = 0) {
    const result = await db
      .prepare(
        `INSERT INTO listing_images (listing_id, image_url, is_primary)
         VALUES (?, ?, ?)`
      )
      .bind(listing_id, image_url, is_primary)
      .run();

    return result.success;
  }

  // Get images for listing
  static async getImages(db, listing_id) {
    const result = await db
      .prepare(
        `SELECT * FROM listing_images
         WHERE listing_id = ?
         ORDER BY is_primary DESC, display_order ASC`
      )
      .bind(listing_id)
      .all();

    return result.results;
  }

  // Delete image
  static async deleteImage(db, image_id) {
    const result = await db
      .prepare('DELETE FROM listing_images WHERE id = ?')
      .bind(image_id)
      .run();

    return result.success;
  }
}

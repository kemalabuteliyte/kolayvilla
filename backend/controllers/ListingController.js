import { Listing } from '../models/Listing.js';
import { User } from '../models/User.js';

export class ListingController {
  // Create new listing
  static async create(c) {
    try {
      const db = c.env.DB;
      const userId = c.get('userId');

      // Check if user can create listings
      const user = await User.getById(db, userId);
      if (!user.can_list) {
        return c.json({ error: 'You do not have permission to create listings' }, 403);
      }

      const listingData = await c.req.json();

      // Validate required fields
      const requiredFields = ['title', 'description', 'price', 'location', 'property_type'];
      for (const field of requiredFields) {
        if (!listingData[field]) {
          return c.json({ error: `${field} is required` }, 400);
        }
      }

      // Add user_id to listing data
      listingData.user_id = userId;

      const listing = await Listing.create(db, listingData);

      return c.json({
        message: 'Listing created successfully',
        listing,
      }, 201);
    } catch (error) {
      console.error('Create listing error:', error);
      return c.json({ error: 'Failed to create listing: ' + error.message }, 500);
    }
  }

  // Get all listings
  static async getAll(c) {
    try {
      const db = c.env.DB;
      const { limit = 20, offset = 0, status = 'active' } = c.req.query();

      const listings = await Listing.getAll(db, {
        limit: parseInt(limit),
        offset: parseInt(offset),
        status,
      });

      // Get images for each listing
      const listingsWithImages = await Promise.all(
        listings.map(async (listing) => {
          const images = await Listing.getImages(db, listing.id);
          return { ...listing, images };
        })
      );

      return c.json({
        listings: listingsWithImages,
        count: listingsWithImages.length,
      });
    } catch (error) {
      console.error('Get listings error:', error);
      return c.json({ error: 'Failed to get listings' }, 500);
    }
  }

  // Get listing by ID
  static async getById(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();

      const listing = await Listing.getById(db, parseInt(id));
      if (!listing) {
        return c.json({ error: 'Listing not found' }, 404);
      }

      const images = await Listing.getImages(db, listing.id);

      return c.json({
        listing: { ...listing, images },
      });
    } catch (error) {
      console.error('Get listing error:', error);
      return c.json({ error: 'Failed to get listing' }, 500);
    }
  }

  // Get user's own listings
  static async getMyListings(c) {
    try {
      const db = c.env.DB;
      const userId = c.get('userId');
      const { limit = 20, offset = 0 } = c.req.query();

      const listings = await Listing.getByUserId(db, userId, {
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      // Get images for each listing
      const listingsWithImages = await Promise.all(
        listings.map(async (listing) => {
          const images = await Listing.getImages(db, listing.id);
          return { ...listing, images };
        })
      );

      return c.json({
        listings: listingsWithImages,
        count: listingsWithImages.length,
      });
    } catch (error) {
      console.error('Get my listings error:', error);
      return c.json({ error: 'Failed to get listings' }, 500);
    }
  }

  // Get listings by agent
  static async getByAgent(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();
      const { limit = 20, offset = 0 } = c.req.query();

      const listings = await Listing.getByAgent(db, parseInt(id), {
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      // Get images for each listing
      const listingsWithImages = await Promise.all(
        listings.map(async (listing) => {
          const images = await Listing.getImages(db, listing.id);
          return { ...listing, images };
        })
      );

      return c.json({
        listings: listingsWithImages,
        count: listingsWithImages.length,
      });
    } catch (error) {
      console.error('Get agent listings error:', error);
      return c.json({ error: 'Failed to get agent listings' }, 500);
    }
  }

  // Search listings
  static async search(c) {
    try {
      const db = c.env.DB;
      const {
        query = '',
        location = '',
        minPrice = 0,
        maxPrice,
        property_type = '',
        limit = 20,
        offset = 0,
      } = c.req.query();

      const listings = await Listing.search(db, {
        query,
        location,
        minPrice: parseFloat(minPrice),
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        property_type,
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      // Get images for each listing
      const listingsWithImages = await Promise.all(
        listings.map(async (listing) => {
          const images = await Listing.getImages(db, listing.id);
          return { ...listing, images };
        })
      );

      return c.json({
        listings: listingsWithImages,
        count: listingsWithImages.length,
      });
    } catch (error) {
      console.error('Search listings error:', error);
      return c.json({ error: 'Failed to search listings' }, 500);
    }
  }

  // Update listing
  static async update(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();
      const userId = c.get('userId');
      const isAdmin = c.get('isAdmin');
      const updates = await c.req.json();

      const listingId = parseInt(id);

      // Get existing listing
      const existingListing = await Listing.getById(db, listingId);
      if (!existingListing) {
        return c.json({ error: 'Listing not found' }, 404);
      }

      // Check permissions
      if (existingListing.user_id !== userId && !isAdmin) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

      const listing = await Listing.update(db, listingId, updates);

      return c.json({
        message: 'Listing updated successfully',
        listing,
      });
    } catch (error) {
      console.error('Update listing error:', error);
      return c.json({ error: 'Failed to update listing: ' + error.message }, 500);
    }
  }

  // Delete listing
  static async delete(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();
      const userId = c.get('userId');
      const isAdmin = c.get('isAdmin');

      const listingId = parseInt(id);

      // Get existing listing
      const existingListing = await Listing.getById(db, listingId);
      if (!existingListing) {
        return c.json({ error: 'Listing not found' }, 404);
      }

      // Check permissions
      if (existingListing.user_id !== userId && !isAdmin) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

      const success = await Listing.delete(db, listingId);

      if (!success) {
        return c.json({ error: 'Failed to delete listing' }, 500);
      }

      return c.json({ message: 'Listing deleted successfully' });
    } catch (error) {
      console.error('Delete listing error:', error);
      return c.json({ error: 'Failed to delete listing' }, 500);
    }
  }

  // Upload image
  static async uploadImage(c) {
    try {
      const db = c.env.DB;
      const { id } = c.req.param();
      const userId = c.get('userId');
      const isAdmin = c.get('isAdmin');

      const listingId = parseInt(id);

      // Get existing listing
      const existingListing = await Listing.getById(db, listingId);
      if (!existingListing) {
        return c.json({ error: 'Listing not found' }, 404);
      }

      // Check permissions
      if (existingListing.user_id !== userId && !isAdmin) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

      const formData = await c.req.formData();
      const file = formData.get('image');

      if (!file) {
        return c.json({ error: 'No image file provided' }, 400);
      }

      // Upload to R2
      const fileName = `${listingId}_${Date.now()}_${file.name}`;
      await c.env.IMAGES.put(fileName, file);

      // Save to database
      const imageUrl = `/images/${fileName}`;
      const is_primary = formData.get('is_primary') === 'true' ? 1 : 0;

      await Listing.addImage(db, listingId, imageUrl, is_primary);

      return c.json({
        message: 'Image uploaded successfully',
        imageUrl,
      });
    } catch (error) {
      console.error('Upload image error:', error);
      return c.json({ error: 'Failed to upload image: ' + error.message }, 500);
    }
  }

  // Delete image
  static async deleteImage(c) {
    try {
      const db = c.env.DB;
      const { id, imageId } = c.req.param();
      const userId = c.get('userId');
      const isAdmin = c.get('isAdmin');

      const listingId = parseInt(id);

      // Get existing listing
      const existingListing = await Listing.getById(db, listingId);
      if (!existingListing) {
        return c.json({ error: 'Listing not found' }, 404);
      }

      // Check permissions
      if (existingListing.user_id !== userId && !isAdmin) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

      const success = await Listing.deleteImage(db, parseInt(imageId));

      if (!success) {
        return c.json({ error: 'Failed to delete image' }, 500);
      }

      return c.json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Delete image error:', error);
      return c.json({ error: 'Failed to delete image' }, 500);
    }
  }
}

import { User } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

export class AuthController {
  // Register new user
  static async register(c) {
    try {
      const { email, phone_number, password, user_type } = await c.req.json();

      // Validate input
      if (!email || !phone_number || !password) {
        return c.json({ error: 'Email, phone number, and password are required' }, 400);
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return c.json({ error: 'Invalid email format' }, 400);
      }

      // Validate phone number format (basic validation)
      const phoneRegex = /^\+?[\d\s-()]+$/;
      if (!phoneRegex.test(phone_number)) {
        return c.json({ error: 'Invalid phone number format' }, 400);
      }

      // Validate password strength
      if (password.length < 6) {
        return c.json({ error: 'Password must be at least 6 characters long' }, 400);
      }

      // Validate user type
      const validUserTypes = ['normal', 'agent'];
      const finalUserType = user_type && validUserTypes.includes(user_type) ? user_type : 'normal';

      const db = c.env.DB;

      // Check if email already exists
      const existingEmail = await User.getByEmail(db, email);
      if (existingEmail) {
        return c.json({ error: 'Email already registered' }, 400);
      }

      // Check if phone number already exists
      const existingPhone = await User.getByPhone(db, phone_number);
      if (existingPhone) {
        return c.json({ error: 'Phone number already registered' }, 400);
      }

      // Create user
      const user = await User.create(db, {
        email,
        phone_number,
        password,
        user_type: finalUserType,
      });

      // Generate JWT token
      const token = await generateToken(
        {
          userId: user.id,
          email: user.email,
          user_type: user.user_type,
        },
        c.env.JWT_SECRET
      );

      return c.json({
        message: 'User registered successfully',
        token,
        user: user.toSafeObject(),
      }, 201);
    } catch (error) {
      console.error('Registration error:', error);
      return c.json({ error: 'Registration failed: ' + error.message }, 500);
    }
  }

  // Login
  static async login(c) {
    try {
      const { email, password } = await c.req.json();

      if (!email || !password) {
        return c.json({ error: 'Email and password are required' }, 400);
      }

      const db = c.env.DB;

      // Get user by email
      const user = await User.getByEmail(db, email);
      if (!user) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      // Check if user is active
      if (!user.is_active) {
        return c.json({ error: 'Account is disabled' }, 403);
      }

      // Verify password
      const isValidPassword = await user.verifyPassword(password);
      if (!isValidPassword) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      // Generate JWT token
      const token = await generateToken(
        {
          userId: user.id,
          email: user.email,
          user_type: user.user_type,
          is_admin: user.is_admin,
        },
        c.env.JWT_SECRET
      );

      return c.json({
        message: 'Login successful',
        token,
        user: user.toSafeObject(),
      });
    } catch (error) {
      console.error('Login error:', error);
      return c.json({ error: 'Login failed: ' + error.message }, 500);
    }
  }

  // Get current user profile
  static async me(c) {
    try {
      const userId = c.get('userId');
      const db = c.env.DB;

      const user = await User.getById(db, userId);
      if (!user) {
        return c.json({ error: 'User not found' }, 404);
      }

      return c.json({ user: user.toSafeObject() });
    } catch (error) {
      console.error('Get profile error:', error);
      return c.json({ error: 'Failed to get profile' }, 500);
    }
  }
}

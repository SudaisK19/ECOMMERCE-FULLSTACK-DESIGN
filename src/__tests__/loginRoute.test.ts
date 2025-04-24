import { POST } from '@/app/api/auth/login/route';
import { NextRequest } from 'next/server';
beforeAll(() => {
  process.env.JWT_SECRET = 'testsecret';
});
// Setup Mocks
const mockSelect = jest.fn();
const mockSetCookie = jest.fn();

jest.mock('@/dbConfig/dbConfig', () => ({
  connect: jest.fn().mockResolvedValue(undefined),
}));

// ✅ Inline mockFindOne inside the mock factory to avoid initialization error
jest.mock('@/models/Users', () => {
  const mockSelect = jest.fn();
  const mockFindOne = jest.fn(() => ({ select: mockSelect }));

  return {
    __esModule: true,
    default: {
      findOne: mockFindOne,
    },
    // Exporting for test access
    __mockSelect: mockSelect,
    __mockFindOne: mockFindOne,
  };
});

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockToken'),
}));

jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server');
  return {
    ...actual,
    NextResponse: {
      json: jest.fn().mockImplementation((body, options) => ({
        status: options.status,
        body,
        cookies: { set: mockSetCookie },
      })),
    },
  };
});

describe('POST /api/auth/login', () => {
  let mockSelect: jest.Mock;
  let mockFindOne: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ Get access to inlined mocks via require
    const Users = require('@/models/Users');
    mockSelect = Users.__mockSelect;
    mockFindOne = Users.__mockFindOne;
  });

  it('should return 200 and token for valid credentials', async () => {
    const mockUser = {
      _id: '1',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      name: 'Test User',
    };

    mockSelect.mockResolvedValue(mockUser);

    const req = {
      json: jest.fn().mockResolvedValue({
        email: 'test@example.com',
        password: 'password123',
      }),
    } as unknown as NextRequest;

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(mockSetCookie).toHaveBeenCalledWith({
      name: 'authToken',
      value: 'mockToken',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });
    expect(res.body).toEqual({
      message: 'Login successful',
      success: true,
      user: {
        _id: '1',
        role: 'user',
        name: 'Test User',
        email: 'test@example.com',
      },
    });
  });

  it('should return 401 for invalid credentials', async () => {
    const mockUser = {
      _id: '1',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      name: 'Test User',
    };

    mockSelect.mockResolvedValue(mockUser);

    const req = {
      json: jest.fn().mockResolvedValue({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    } as unknown as NextRequest;

    const res = await POST(req);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Invalid email or password' });
  });

  it('should return 404 when user not found', async () => {
    mockSelect.mockResolvedValue(null);

    const req = {
      json: jest.fn().mockResolvedValue({
        email: 'missing@example.com',
        password: 'any',
      }),
    } as unknown as NextRequest;

    const res = await POST(req);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });
});

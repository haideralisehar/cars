import { User } from '../types';

// This is a simple in-memory store for users
// In production, this would be replaced with actual backend API calls
class UsersStore {
  private users: User[] = [
    {
      id: 'user-1',
      email: 'superadmin@autolounge.com',
      password: 'admin123',
      name: 'Super Administrator',
      role: 'Super Admin',
      status: 'Active',
      createdAt: '2025-01-01',
    },
    {
      id: 'user-2',
      email: 'admin@autolounge.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'Admin',
      status: 'Active',
      createdAt: '2025-01-01',
    },
    {
      id: 'user-3',
      email: 'investor@autolounge.com',
      password: 'investor123',
      name: 'Ahmed Al-Hassan',
      role: 'Investor',
      status: 'Active',
      investorId: 'inv-1',
      createdAt: '2026-01-01',
      createdBy: 'user-1',
    },
    {
      id: 'user-4',
      email: 'sara@autolounge.com',
      password: 'investor123',
      name: 'Sara Mohammed',
      role: 'Investor',
      status: 'Active',
      investorId: 'inv-2',
      createdAt: '2025-12-15',
      createdBy: 'user-1',
    },
  ];

  private listeners: (() => void)[] = [];

  getUsers(): User[] {
    return [...this.users];
  }

  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  authenticate(email: string, password: string): User | null {
    const user = this.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && 
           u.password === password && 
           u.status === 'Active'
    );
    return user || null;
  }

  addUser(user: User): void {
    this.users = [user, ...this.users];
    this.notifyListeners();
  }

  updateUser(id: string, updates: Partial<User>): void {
    this.users = this.users.map(u => 
      u.id === id ? { ...u, ...updates } : u
    );
    this.notifyListeners();
  }

  deleteUser(id: string): void {
    this.users = this.users.filter(u => u.id !== id);
    this.notifyListeners();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const usersStore = new UsersStore();

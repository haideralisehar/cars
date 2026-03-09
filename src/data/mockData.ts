import { Car, Expense, Installment, Alert, Reminder } from '../types';

export const mockCars: Car[] = [
 
];

export const mockExpenses: Expense[] = [
  {
    id: 'exp-1',
    carId: '1',
    type: 'Maintenance',
    amount: 1200,
    date: '2025-01-20',
    description: 'Oil change and brake service',
    receipt: 'receipt-1.pdf',
  },
  {
    id: 'exp-2',
    carId: '1',
    type: 'Repair',
    amount: 850,
    date: '2025-01-25',
    description: 'Front bumper repair',
    receipt: 'receipt-2.pdf',
  },
  {
    id: 'exp-3',
    carId: '4',
    type: 'Detailing',
    amount: 300,
    date: '2025-01-22',
    description: 'Full interior and exterior detailing',
  },
];

export const mockInstallments: Installment[] = [
  {
    id: 'inst-1',
    carId: '3',
    type: 'Sale',
    amount: 8000,
    dueDate: '2026-02-01',
    status: 'Pending',
  },
  {
    id: 'inst-2',
    carId: '3',
    type: 'Sale',
    amount: 8000,
    dueDate: '2026-03-01',
    status: 'Pending',
  },
  {
    id: 'inst-3',
    carId: '3',
    type: 'Sale',
    amount: 8000,
    dueDate: '2026-01-01',
    paidDate: '2026-01-05',
    status: 'Paid',
  },
  {
    id: 'inst-4',
    carId: '2',
    type: 'Lease',
    amount: 1200,
    dueDate: '2026-02-01',
    status: 'Pending',
  },
  {
    id: 'inst-5',
    carId: '2',
    type: 'Lease',
    amount: 1200,
    dueDate: '2026-01-15',
    status: 'Overdue',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'Insurance',
    carId: '2',
    carName: 'Mercedes-Benz C-Class 2022',
    personName: 'Ahmed Al-Hassan',
    dueDate: '2026-01-10',
    isOverdue: true,
  },
  {
    id: 'alert-2',
    type: 'LeaseRent',
    carId: '2',
    carName: 'Mercedes-Benz C-Class 2022',
    personName: 'Sara Mohammed',
    dueDate: '2026-01-15',
    isOverdue: true,
  },
  {
    id: 'alert-3',
    type: 'Registration',
    carId: '1',
    carName: 'BMW X5 2023',
    personName: 'Auto Lounge',
    dueDate: '2026-02-20',
    isOverdue: false,
  },
  {
    id: 'alert-4',
    type: 'Installment',
    carId: '3',
    carName: 'Audi A6 2023',
    personName: 'Khalid Ibrahim',
    dueDate: '2026-02-01',
    isOverdue: false,
  },
  {
    id: 'alert-5',
    type: 'Insurance',
    carId: '5',
    carName: 'Lexus ES 350 2023',
    personName: 'Auto Lounge',
    dueDate: '2026-02-05',
    isOverdue: false,
  },
];

export const mockReminders: Reminder[] = [
  {
    id: 'rem-1',
    text: 'Follow up with Sara Mohammed for lease payment',
    date: '2026-02-04',
    done: false,
    createdAt: '2026-02-03',
  },
  {
    id: 'rem-2',
    text: 'Renew insurance for BMW X5',
    date: '2026-02-15',
    done: false,
    createdAt: '2026-02-03',
  },
  {
    id: 'rem-3',
    text: 'Contact potential buyer for Porsche Cayenne',
    date: '2026-02-05',
    done: false,
    createdAt: '2026-02-03',
  },
];

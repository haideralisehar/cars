export type MoneyRecordCategory = 
  | 'Expense' 
  | 'Service' 
  | 'Parts' 
  | 'Insurance' 
  | 'Registration' 
  | 'Fuel' 
  | 'Commission' 
  | 'Other';

export type MoneyRecordStatus = 'Pending' | 'Paid' | 'Received';

export interface MoneyRecord {
  id: string;
  title: string;
  category: MoneyRecordCategory;
  otherCategory?: string;
  description?: string;
  linkedToType: 'None' | 'Car' | 'Client' | 'Investor';
  linkedToId?: string;
  linkedToName?: string;
  
  // Payable Section
  isPayable: boolean;
  payableTo?: string;
  payableAmount?: number;
  payableDate?: string;
  payableStatus: 'Pending' | 'Paid';
  receiptUrl?: string;
  
  // Receivable Section
  isReceivable: boolean;
  receivableFrom?: string;
  receivableAmount?: number;
  receivableDueDate?: string;
  receivableStatus: 'Pending' | 'Received';
  
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
  activityLog: ActivityLogEntry[];
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  timestamp: string;
  user: string;
}

export const mockMoneyRecords: MoneyRecord[] = [
  {
    id: 'rec-1',
    title: 'Engine Oil Change - Toyota Camry',
    category: 'Expense',
    linkedToType: 'Car',
    linkedToId: 'car-1',
    linkedToName: '2022 Toyota Camry',
    isPayable: true,
    payableTo: 'Quick Fix Garage',
    payableAmount: 150,
    payableDate: '2026-02-01',
    payableStatus: 'Paid',
    isReceivable: false,
    receivableStatus: 'Pending',
    createdAt: '2026-02-01T10:00:00Z',
    createdBy: 'Admin User',
    activityLog: [
      { id: 'log-1', action: 'Created record', timestamp: '2026-02-01T10:00:00Z', user: 'Admin User' },
      { id: 'log-2', action: 'Marked as Paid', timestamp: '2026-02-01T14:00:00Z', user: 'Admin User' }
    ]
  },
  {
    id: 'rec-2',
    title: 'Car Sale - BMW X5',
    category: 'Commission',
    linkedToType: 'Car',
    linkedToId: 'car-2',
    linkedToName: '2021 BMW X5',
    isPayable: false,
    payableStatus: 'Pending',
    isReceivable: true,
    receivableFrom: 'John Doe',
    receivableAmount: 2500,
    receivableDueDate: '2026-02-15',
    receivableStatus: 'Pending',
    createdAt: '2026-02-03T09:00:00Z',
    createdBy: 'Sales Manager',
    activityLog: [
      { id: 'log-3', action: 'Created record', timestamp: '2026-02-03T09:00:00Z', user: 'Sales Manager' }
    ]
  },
  {
    id: 'rec-3',
    title: 'Showroom Rent - Feb 2026',
    category: 'Expense',
    linkedToType: 'None',
    isPayable: true,
    payableTo: 'Real Estate Co',
    payableAmount: 5000,
    payableDate: '2026-02-01',
    payableStatus: 'Pending',
    isReceivable: false,
    receivableStatus: 'Pending',
    createdAt: '2026-02-01T08:00:00Z',
    createdBy: 'Super Admin',
    activityLog: [
      { id: 'log-4', action: 'Created record', timestamp: '2026-02-01T08:00:00Z', user: 'Super Admin' }
    ]
  }
];

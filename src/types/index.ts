export type CarStatus = 'Available' | 'Sold' | 'Leased';
export type CarSource = 'Company Car' | 'Investor' | 'Customer';
export type PaymentType = 'Full' | 'Installment';
export type LeaseType = 'Daily' | 'Monthly';
export type UserRole = 'Admin' | 'SuperAdmin' | 'User' | 'Operations' | 'Driver' | 'Investor';
export type AlertType = 'Insurance' | 'Registration' | 'LeaseRent' | 'Installment';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  registrationNumber: string;
  status: CarStatus;
  carSource: CarSource;
  images: string[];
  
  // Financial details
  buyingPrice: number;
  askingPrice: number;
  sellingPrice?: number;
  paymentType?: PaymentType;
  
  // Lease details
  leaseEnabled: boolean;
  leaseType?: LeaseType;
  leaseAmount?: number;
  
  // Related
  investorId?: string;
  customerId?: string;
  sellerId?: string;
  
  // Documents
  documents: {
    registration?: string;
    cpr?: string;
    insurance?: string;
    additional?: string[];
  };
  
  // Dates
  insuranceExpiry?: string;
  registrationExpiry?: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  customCategory?: string; // for "Other" category
  amount: number;
  description: string;
  linkedCarId?: string; // if linked to a car
  linkedCarName?: string;
  receiptUrl?: string;
  isAssetExpense: boolean; // true if linked to car
}

export interface Installment {
  id: string;
  carId: string;
  type: 'Sale' | 'Lease';
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'Pending' | 'Paid' | 'Overdue';
}

export interface Alert {
  id: string;
  type: AlertType;
  carId: string;
  carName: string;
  personName: string;
  dueDate: string;
  isOverdue: boolean;
}

export interface Reminder {
  id: string;
  text: string;
  date: string;
  done: boolean;
  createdAt: string;
}

export interface DashboardData {
  totalCars: number;
  carsAvailable: number;
  carsSold: number;
  activeLeases: number;
  paymentPending: number;
  leaseRentPending: number;
  totalExpenses: number;
  netProfit: number;
  commission: number;
}

export interface TimelineEvent {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
}

// Cash Flow Types
export type AllocationStatus = 'Not Allocated' | 'Partially Allocated' | 'Fully Allocated';
export type TransactionSource = 'Sale' | 'Lease' | 'Other';
export type UsageType = 'Expense' | 'Car Purchase' | 'Returned to Investor' | 'VAT' | 'Keep as Balance';
export type Destination = 'Company Balance' | 'Investor Balance' | 'Customer Payout' | 'VAT';

export interface IncomingTransaction {
  id: string;
  date: string;
  amount: number;
  source: TransactionSource;
  reference: string;
  paymentMode: 'Cash' | 'Transfer';
  allocationStatus: AllocationStatus;
  allocations?: Allocation[];
}

export interface Allocation {
  id: string;
  destination: Destination;
  amount: number;
  usageType: UsageType;
  reference: string;
  createdAt: string;
  createdBy: string;
}

export interface AllocationHistory {
  transactionId: string;
  allocations: Allocation[];
  editedBy: string;
  editedAt: string;
}

export interface OutgoingTransaction {
  id: string;
  date: string;
  amount: number;
  usageType: string;
  reference: string;
  sourceTransaction: string;
}

export interface ReinvestmentTrace {
  saleTransactionId: string;
  saleAmount: number;
  saleCar: string;
  allocations: {
    destination: string;
    amount: number;
    usage: string;
    linkedCarId?: string;
    linkedCarName?: string;
  }[];
}

// Investor Types
export interface InvestmentEntry {
  id: string;
  amount: number;
  date: string;
}

export interface Investor {
  id: string;
  name: string;
  contactNumber: string;
  cprNumber: string;
  cprDocument?: string;
  status: 'Active' | 'Closed';
  investments: InvestmentEntry[];
  totalInvested: number;
  currentBalance: number;
  totalProfit: number;
  profitLastWeek: number;
  profitLastMonth: number;
  roi: number;
  activeCars: string[]; // Car IDs funded by this investor
  createdAt: string;
}

export interface InvestorProfitBreakdown {
  grossProfit: number;
  autoLoungeCommission: number;
  vat: number;
  netInvestorProfit: number;
}

// Sales and Lease Types
export interface Sale {
  id: string;
  date: string;
  carId: string;
  carName: string;
  carSource: CarSource;
  soldPrice: number;
  paymentType: PaymentType;
  status: 'Completed' | 'Pending' | 'Installment Active';
  purchaserName: string;
  purchaserCpr: string;
  commission?: number;
  commissionType?: 'Fixed' | 'Percentage';
}

export interface Lease {
  id: string;
  carId: string;
  carName: string;
  lesseeName: string;
  lesseeCpr: string;
  leaseType: LeaseType;
  rentAmount: number;
  startDate: string;
  duration: number; // days or months
  nextDueDate: string;
  status: 'Active' | 'Overdue' | 'Completed';
}

// Expense Types
export type ExpenseCategory = 'Office' | 'Grocery' | 'Maintenance' | 'Repair' | 'Detailing' | 'Insurance' | 'Registration' | 'Other';

export interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  customCategory?: string; // for "Other" category
  amount: number;
  description: string;
  linkedCarId?: string; // if linked to a car
  linkedCarName?: string;
  receiptUrl?: string;
  isAssetExpense: boolean; // true if linked to car
}

// User Types
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  investorId?: string; // Link to investor profile if role is Investor
  createdAt: string;
  createdBy?: string; // User ID who created this account
}
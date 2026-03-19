import React, { useState } from 'react';
import { ThemeProvider } from '@/app/components/theme-provider';
import { Dashboard } from '@/app/components/dashboard';
import { CarsInventory } from '@/app/components/cars-inventory';
import { AddCarWizard } from '@/app/components/add-car-wizard';
import { EditCarForm } from '@/app/components/edit-car-form';
import { CarDetails } from '@/app/components/car-details';
import { CashFlow } from '@/app/components/cash-flow';
import { Investors } from '@/app/components/investors';
import { InvestorPortal } from '@/app/components/investor-portal';
import { UserManagement } from '@/app/components/user-management';
import { SalesList } from '@/app/components/sales-list';
import { LeaseList } from '@/app/components/lease-list';
import { ExpensesList } from '@/app/components/expenses-list';
import { SellCarModal, LeaseCarModal, AddExpenseModal } from '@/app/components/modals';
import { Button } from '@/app/components/ui/button';
import { DocumentCenter } from '@/app/components/document-center';
import { Reports } from '@/app/components/reports';
import { AdminPanel } from '@/app/components/admin-panel';
import { MoneyRecordsList } from '@/app/components/money-records-list';
import { CreateMoneyRecord } from '@/app/components/create-money-record';
import { MoneyRecordDetails } from '@/app/components/money-record-details';
import { mockMoneyRecords } from '@/types/money-record';
import { mockCars } from '@/data/mockData';
import { refreshToken } from "./api/Auth/refresh";
import { 
  LayoutDashboard, 
  Car as CarIcon, 
  User as UserIcon, 
  DollarSign, 
  Users, 
  TrendingUp,
  TrendingDown,
  FileText,
  FilePlus,
  BarChart3,
  ShieldAlert,
  Wallet,
  ArrowRightLeft,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield
} from 'lucide-react';

// Mock investors data
const mockInvestors = [
  {
    id: 'inv-1',
    name: 'Ahmed Al-Hassan',
    contactNumber: '+973 3333 4444',
    cprNumber: '920101234',
    status: 'Active',
    investments: [
      { id: 'ie-1', amount: 50000, date: '2026-01-01' },
      { id: 'ie-2', amount: 25000, date: '2026-01-15' },
    ],
    totalInvested: 75000,
    currentBalance: 82500,
    totalProfit: 7500,
    profitLastWeek: 1200,
    profitLastMonth: 4800,
    roi: 10.0,
    activeCars: ['car-1', 'car-2'],
    createdAt: '2026-01-01',
  },
  {
    id: 'inv-2',
    name: 'Sara Mohammed',
    contactNumber: '+973 3344 5566',
    cprNumber: '930202345',
    status: 'Active',
    investments: [
      { id: 'ie-3', amount: 100000, date: '2025-12-15' },
    ],
    totalInvested: 100000,
    currentBalance: 115000,
    totalProfit: 15000,
    profitLastWeek: 800,
    profitLastMonth: 3500,
    roi: 15.0,
    activeCars: ['car-3', 'car-4', 'car-5'],
    createdAt: '2025-12-15',
  },
];

export default function AuthenticatedApp({ user, onLogout }) {
  // Set initial view based on user role
  const getInitialView = () => {
    if (user.role === 'Investor') return 'investor-portal';
    return 'dashboard';
  };

  

  const [currentView, setCurrentView] = useState(getInitialView());
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [selectedMoneyRecordId, setSelectedMoneyRecordId] = useState(null);
  const [moneyRecordInitialTab, setMoneyRecordInitialTab] = useState('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoadingCar, setIsLoadingCar] = useState(false);
  
  // Modal states
  const [sellCarModal, setSellCarModal] = useState({
    isOpen: false,
    car: null
  });

  const [leaseCarModal, setLeaseCarModal] = useState({
    isOpen: false,
    car: null
  });
  
  const [expenseModal, setExpenseModal] = useState({
    isOpen: false,
    carId: null,
  });

  const handleNavigateToCar = (car) => {
    setIsLoadingCar(true);
    setSelectedCar(car);
    setSelectedCarId(car.id);
    setCurrentView('car-details');
    setIsLoadingCar(false);
  };

  const handleSellCar = (car) => {
    setSellCarModal({
      isOpen: true,
      car: car
    });
  };

  const handleLeaseCar = (car) => {
    setLeaseCarModal({
      isOpen: true,
      car: car
    });
  };

  const handleAddExpense = (carId) => {
    setMoneyRecordInitialTab('expenses');
    setCurrentView('create-money-record');
  };

  const getSelectedCar = (carId) => {
    return mockCars.find((car) => car.id === carId);
  };

  const handleRefresh = async () => {
    const newToken = await refreshToken();

    if (newToken) {
      console.log("New access token:", newToken);
    } else {
      console.log("User must login again");
    }
  };

  const sellCar = getSelectedCar(sellCarModal.car?.id);
  const leaseCar = getSelectedCar(leaseCarModal.car?.id);
  const expenseCar = getSelectedCar(expenseModal.carId);

  // Investor-specific filtering
  const isInvestor = user.role === 'Investor';
  const filteredCars = isInvestor && user.investorId
    ? mockCars.filter(car => {
        const investor = mockInvestors.find(inv => inv.id === user.investorId);
        return investor?.activeCars.includes(car.id);
      })
    : mockCars;

  // If investor role, show only investor portal
  if (isInvestor) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          {/* Simple Header for Investor */}
          <div className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border px-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-primary">Auto Lounge</h2>
              <p className="text-xs text-muted-foreground">Investor Portal</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="pt-16">
            <InvestorPortal 
              investorId={user.investorId} 
              investors={mockInvestors}
              cars={mockCars}
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Regular dashboard for other roles
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Sidebar Navigation */}
        <div className={`fixed left-0 top-0 h-full bg-card border-r border-border p-4 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
          {/* Header with Toggle */}
          <div className={`mb-8 px-2 flex items-center justify-between ${sidebarCollapsed ? 'flex-col gap-4' : ''}`}>
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-1">Auto Lounge</h2>
                <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase opacity-70">Management System</p>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="text-2xl font-bold text-primary">AL</div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8 shrink-0"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1 flex-1 overflow-y-auto pr-1">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentView('dashboard')}
            >
              <LayoutDashboard className="h-4 w-4 mr-3" />
              {!sidebarCollapsed && 'Dashboard'}
            </Button>

            <Button
              variant={currentView === 'cars' || currentView === 'add-car' || currentView === 'edit-car' || currentView === 'car-details' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentView('cars')}
            >
              <CarIcon className="h-4 w-4 mr-3" />
              {!sidebarCollapsed && 'Cars Inventory'}
            </Button>

            {/* <button onClick={handleRefresh}>refresh</button> */}

            {(user.role === 'Admin' || user.role === 'SuperAdmin') && (
              <Button
                variant={currentView === 'money-records' || currentView === 'create-money-record' || currentView === 'money-record-details' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentView('money-records')}
              >
                <ArrowRightLeft className="h-4 w-4 mr-3" />
                {!sidebarCollapsed && 'Money Records'}
              </Button>
            )}

            {(user.role === 'Admin' || user.role === 'SuperAdmin') && (
              <Button
                variant={currentView === 'cash-flow' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentView('cash-flow')}
              >
                <DollarSign className="h-4 w-4 mr-3" />
                {!sidebarCollapsed && 'Cash Flow'}
              </Button>
            )}

            {(user.role === 'Admin' || user.role === 'SuperAdmin') && (
              <Button
                variant={currentView === 'investors' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentView('investors')}
              >
                <Users className="h-4 w-4 mr-3" />
                {!sidebarCollapsed && 'Investors'}
              </Button>
            )}

            <Button
              variant={currentView === 'sales' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentView('sales')}
            >
              <TrendingUp className="h-4 w-4 mr-3" />
              {!sidebarCollapsed && 'Sales'}
            </Button>

            <Button
              variant={currentView === 'lease' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentView('lease')}
            >
              <TrendingDown className="h-4 w-4 mr-3" />
              {!sidebarCollapsed && 'Lease'}
            </Button>

            <Button
              variant={currentView === 'documents' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentView('documents')}
            >
              <FileText className="h-4 w-4 mr-3" />
              {!sidebarCollapsed && 'Documents'}
            </Button>

            {(user.role === 'Admin' || user.role === 'SuperAdmin') && (
              <Button
                variant={currentView === 'reports' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentView('reports')}
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                {!sidebarCollapsed && 'Reports'}
              </Button>
            )}

            {user.role === 'SuperAdmin' && (
              <Button
                variant={currentView === 'admin' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentView('admin')}
              >
                <ShieldAlert className="h-4 w-4 mr-3" />
                {!sidebarCollapsed && 'Admin Panel'}
              </Button>
            )}

            {user.role === 'SuperAdmin' && (
              <Button
                variant={currentView === 'user-management' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentView('user-management')}
              >
                <Shield className="h-4 w-4 mr-3" />
                {!sidebarCollapsed && 'User Management'}
              </Button>
            )}
          </div>

          {/* User Profile at Bottom */}
          <div className="pt-4 border-t border-border mt-4">
            {!sidebarCollapsed ? (
              <>
                <div className="flex items-center gap-3 p-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="font-semibold text-sm truncate text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={onLogout} className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                  <UserIcon className="h-5 w-5 text-primary" />
                </div>
                <Button variant="ghost" size="icon" onClick={onLogout} className="w-10 h-10 mx-auto text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          {currentView === 'dashboard' && <Dashboard userRole={user.role} onNavigateToCar={handleNavigateToCar} />}
          {currentView === 'cars' && (
            <CarsInventory 
              userRole={user.role} 
              onCarClick={handleNavigateToCar}
              onAddNewCar={() => setCurrentView('add-car')}
              onSellCar={handleSellCar}
              onLeaseCar={handleLeaseCar}
              onAddExpense={handleAddExpense}
            />
          )}
          {currentView === 'add-car' && (
            <AddCarWizard 
              onComplete={() => setCurrentView('cars')}
              onCancel={() => setCurrentView('cars')}
            />
          )}
          {currentView === 'edit-car' && selectedCar && (
            <EditCarForm 
              car={selectedCar}
              onSave={(updatedCar) => {
                console.log('Saving car updates:', updatedCar);
                setSelectedCar(updatedCar);
                setCurrentView('car-details');
              }}
              onCancel={() => setCurrentView('car-details')}
            />
          )}
          {currentView === 'car-details' && (
            isLoadingCar ? (
              <div className="flex justify-center items-center h-screen">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : selectedCar && (
              <CarDetails 
                car={selectedCar}
                onBack={() => {
                  setCurrentView('cars');
                  setSelectedCar(null);
                }} 
                onEdit={() => setCurrentView('edit-car')}
                onViewRecord={(id) => {
                  setSelectedMoneyRecordId(id);
                  setCurrentView('money-record-details');
                }}
                onSellCar={handleSellCar}
                onLeaseCar={handleLeaseCar}
                onAddExpense={handleAddExpense}
                userRole={user.role}
              />
            )
          )}
          {currentView === 'cash-flow' && <CashFlow userRole={user.role} />}
          {currentView === 'investors' && <Investors userRole={user.role} />}
          {currentView === 'sales' && <SalesList onCarClick={handleNavigateToCar} />}
          {currentView === 'lease' && <LeaseList onCarClick={handleNavigateToCar} />}
          {currentView === 'documents' && <DocumentCenter userRole={user.role} />}
          {currentView === 'reports' && <Reports userRole={user.role} />}
          {currentView === 'admin' && user.role === 'SuperAdmin' && <AdminPanel userRole={user.role} />}
          {currentView === 'user-management' && user.role === 'SuperAdmin' && (
            <UserManagement userRole={user.role} investors={mockInvestors} />
          )}
          
          {currentView === 'money-records' && (
            <MoneyRecordsList 
              userRole={user.role} 
              onViewDetails={(id) => {
                setSelectedMoneyRecordId(id);
                setCurrentView('money-record-details');
              }} 
              onAddRecord={() => setCurrentView('create-money-record')} 
            />
          )}
          {currentView === 'create-money-record' && (
            <CreateMoneyRecord 
              userRole={user.role} 
              onBack={() => setCurrentView('money-records')} 
              initialTab={moneyRecordInitialTab} 
            />
          )}
          {currentView === 'money-record-details' && selectedMoneyRecordId && (
            <MoneyRecordDetails 
              recordId={selectedMoneyRecordId} 
              userRole={user.role} 
              onBack={() => setCurrentView('money-records')} 
            />
          )}
        </div>

        {/* Modals */}
        {sellCarModal.car && (
          <SellCarModal
            carId={sellCarModal.car.id}
            isOpen={sellCarModal.isOpen}
            onClose={() => setSellCarModal({ isOpen: false, car: null })}
            car={sellCarModal.car}
            userRole={user.role}
          />
        )}
        {leaseCarModal.car && (
          <LeaseCarModal
           carId={leaseCarModal.car.id}
            isOpen={leaseCarModal.isOpen}
            onClose={() => setLeaseCarModal({ isOpen: false, car: null })}
            car={leaseCarModal.car}
            userRole={user.role}
          />
        )}
        {expenseCar && (
          <AddExpenseModal
            isOpen={expenseModal.isOpen}
            onClose={() => setExpenseModal({ isOpen: false, carId: null })}
            car={expenseCar}
            userRole={user.role}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
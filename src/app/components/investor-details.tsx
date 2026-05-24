import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Investor, InvestorProfitBreakdown } from '@/types';
import { 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  Percent,
  Calendar,
  Car,
  ShoppingCart,
  TrendingDown,
  Edit,
  Wifi,
  WifiOff,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface InvestorDetailsProps {
  investor: Investor;
  userRole: 'Admin' | 'SuperAdmin' | 'User' | 'Operations' | 'Driver' | 'Investor';
  onBack: () => void;
}

export function InvestorDetails({ investor, userRole, onBack }: InvestorDetailsProps) {
  const [detailedData, setDetailedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);
  
  const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
  const isSuperAdmin = userRole === 'SuperAdmin';

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (error) {
        fetchInvestorDetails();
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setError('No internet connection. Please check your network and try again.');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [error]);

  // Fetch investor details
  const fetchInvestorDetails = async () => {
    if (!isOnline) {
      setError('No internet connection. Please check your network and try again.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const API_BASE_URL = 'https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net';
      const response = await fetch(`${API_BASE_URL}/api/Investors/${investor.id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();
      setDetailedData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching investor details:', err);
      setError('Failed to load investor details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (investor?.id) {
      fetchInvestorDetails();
    }
  }, [investor.id, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">You do not have permission to view detailed investor profiles.</p>
        <Button onClick={onBack}>Return to List</Button>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 w-32 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !detailedData) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  {!isOnline ? (
                    <WifiOff className="h-8 w-8 text-red-600" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-red-900 dark:text-red-100">
                  {!isOnline ? 'Connection Error' : 'Failed to Load Data'}
                </h3>
                <p className="text-red-700 dark:text-red-300 max-w-md">
                  {error || 'Unable to fetch investor details. Please try again.'}
                </p>
                {!isOnline && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <WifiOff className="h-4 w-4" />
                    <span>You are currently offline</span>
                  </div>
                )}
                <Button onClick={handleRetry} className="mt-4">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Use API data
  const data = detailedData;

  // Transform API data to match the component's expected format
  const investorData = {
    ...investor,
    name: data.investorName || investor.name,
    status: data.isActive ? 'Active' : 'Inactive',
    contactNumber: data.contactNumber || investor.contactNumber,
    totalInvested: data.totalInvested ?? investor.totalInvested,
    currentBalance: data.currentBalance ?? investor.currentBalance,
    totalProfit: data.totalProfit ?? investor.totalProfit,
    roi: data.roi ?? investor.roi,
    profitLastWeek: data.profitLastWeek ?? investor.profitLastWeek,
    profitLastMonth: data.profitLastMonth ?? investor.profitLastMonth,
  };

  // Prepare timeline events from API data
  const timelineEvents = data.moneyUsageTimeline?.map((event: any) => ({
    id: event.id || Math.random().toString(),
    type: event.type?.toLowerCase() || 'purchase',
    description: event.title || '',
    date: event.date,
    carId: event.carId,
    amount: event.amount,
    status: event.status,
  })) || [];

  // Prepare active assets from API data (using activeAssets array from API)
  // IMPORTANT: Using currentValue directly from activeAssets
  const activeCars = data.activeAssets?.map((asset: any) => ({
    id: asset.id,
    name: `${asset.make} ${asset.model} ${asset.year}`,
    status: asset.status === 'Available' ? 'Available' : asset.status === 'Leased' ? 'Leased' : 'Invested',
    investedAmount: asset.investedAmount || 0,
    currentValue: asset.currentValue || 0, // Using currentValue from activeAssets
    companyCommission: asset.companyCommission || 0,
    carImagePath: asset.carImagePath || [],
    make: asset.make,
    model: asset.model,
    year: asset.year,
    color: asset.color,
  })) || [];

  // Also include cars that are not sold (fallback if activeAssets is empty)
  const allActiveCars = activeCars.length > 0 ? activeCars : 
    data.cars?.filter((car: any) => car.status !== 'Sold').map((car: any) => ({
      id: car.id,
      name: `${car.make} ${car.model} ${car.year}`,
      status: car.status === 'Available' ? 'Available' : car.status === 'Leased' ? 'Leased' : 'Invested',
      investedAmount: car.amountUsed || car.buyingPrice,
      currentValue: car.sale?.sellingPrice || car.askingPrice || car.buyingPrice,
      companyCommission: car.companyCommission || 0,
      carImagePath: car.carImagePath || [],
    })) || [];

  // Prepare transactions from API data
  const transactions = data.transactions?.map((tx: any) => ({
    date: new Date(tx.createdAt).toISOString().split('T')[0],
    desc: tx.description,
    amount: tx.amount,
    type: tx.type === 'Credit' ? (tx.description.includes('Lease') ? 'Lease Income' : 
            tx.description.includes('sold') ? 'Return' : 'Credit') : 
            tx.type === 'Debit' ? (tx.description.includes('purchase') ? 'Investment' : 'Expense') : 'Other',
  })) || [];

  // Prepare money trail data
  const moneyTrail = data.moneyTrail || {
    investorFunds: data.totalInvested,
    inventoryAcquisition: data.cars?.reduce((sum: number, car: any) => sum + (car.amountUsed || car.buyingPrice), 0) || 0,
    holdingAccount: data.currentBalance || 0,
    reinvested: data.reinvested || 0,
    returned: data.returned || 0,
    totalFlowTracked: data.totalFlowTracked || 0,
  };

  // Prepare profit breakdown
  const profitBreakdownData = data.profitBreakdown || {
    grossProfit: data.totalProfit || 0,
    autoLoungeCommission: (data.totalProfit || 0) * 0.15,
    vat: (data.totalProfit || 0) * 0.1,
    netInvestorProfit: data.totalProfit || 0,
  };

  // Calculate allocation percentages
  const allocationTotal = moneyTrail.inventoryAcquisition || 1;
  const totalInvestments = data.investments?.reduce((sum: number, inv: any) => sum + inv.amount, 0) || data.totalInvested || 0;
  const totalExpenses = data.transactions?.filter((tx: any) => tx.type === 'Debit' && tx.description.includes('Expense'))
    .reduce((sum: number, tx: any) => sum + tx.amount, 0) || 0;
  const reinvestmentAmount = moneyTrail.reinvested || 0;
  
  const carPurchasePercent = ((totalInvestments - totalExpenses) / allocationTotal) * 100;
  const leaseExpensesPercent = (totalExpenses / allocationTotal) * 100;
  const reinvestmentPercent = (reinvestmentAmount / allocationTotal) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Online/Offline Status Indicator */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-lg ${
            isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isOnline ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{investorData.name}</h1>
                <Badge variant={investorData.status === 'Active' ? 'default' : 'secondary'}>
                  {investorData.status}
                </Badge>
                {!isOnline && detailedData && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    <WifiOff className="h-3 w-3 mr-1" />
                    Cached
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mt-1">{investorData.contactNumber}</p>
              {data.email && (
                <p className="text-sm text-muted-foreground">{data.email}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {isSuperAdmin && (
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            <Button variant="outline" onClick={fetchInvestorDetails} disabled={!isOnline}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Total Invested</p>
              </div>
              <p className="text-2xl font-bold">BHD {investorData.totalInvested?.toLocaleString() || 0}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
              </div>
              <p className="text-2xl font-bold text-primary">
                BHD {investorData.currentBalance?.toLocaleString() || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Total Profit</p>
              </div>
              <p className="text-2xl font-bold text-primary">
                BHD {investorData.totalProfit?.toLocaleString() || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Percent className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">ROI</p>
              </div>
              <p className="text-2xl font-bold text-primary">{investorData.roi?.toFixed(2) || 0}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Profit Period Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Profit - Last 7 Days</p>
                  <p className="text-3xl font-bold text-primary">
                    BHD {investorData.profitLastWeek?.toLocaleString() || 0}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Profit - Last 30 Days</p>
                  <p className="text-3xl font-bold text-primary">
                    BHD {investorData.profitLastMonth?.toLocaleString() || 0}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="timeline" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="timeline">Money Usage Timeline</TabsTrigger>
            <TabsTrigger value="assets">Active Assets</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="money-trail">Money Trail</TabsTrigger>
            <TabsTrigger value="breakdown">Profit Breakdown</TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Money Usage Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {timelineEvents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No timeline events found</p>
                ) : (
                  timelineEvents.map((event: any, index: number) => (
                    <div key={event.id} className="relative">
                      {/* Timeline connector */}
                      {index < timelineEvents.length - 1 && (
                        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border" />
                      )}

                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              event.type === 'purchase'
                                ? 'bg-secondary'
                                : event.type === 'lease'
                                ? 'bg-primary/10'
                                : event.type === 'sale'
                                ? 'bg-primary/20'
                                : 'bg-destructive/10'
                            }`}
                          >
                            {event.type === 'purchase' && <ShoppingCart className="h-5 w-5" />}
                            {event.type === 'lease' && <Car className="h-5 w-5 text-primary" />}
                            {event.type === 'sale' && <TrendingUp className="h-5 w-5 text-primary" />}
                            {event.type === 'expense' && <TrendingDown className="h-5 w-5 text-destructive" />}
                          </div>
                        </div>

                        <div className="flex-1 pb-6">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-medium">{event.description}</p>
                            <div className="flex gap-2">
                              {event.amount && (
                                <Badge variant={event.type === 'sale' || event.type === 'lease' ? 'default' : 'secondary'}>
                                  {event.type === 'sale' || event.type === 'lease' ? '+' : '-'} BHD {event.amount.toLocaleString()}
                                </Badge>
                              )}
                              <Badge variant="outline" className="ml-2">
                                {event.type}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          {event.status && (
                            <p className="text-xs text-muted-foreground mt-1">Status: {event.status}</p>
                          )}
                          <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                            View Details →
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Assets Tab - Using currentValue from API */}
          <TabsContent value="assets">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Active Assets ({allActiveCars.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {allActiveCars.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No active assets found</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allActiveCars.map((car: any) => (
                      <Card key={car.id} className="bg-secondary/30 border-border hover:border-primary/30 transition-all cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Car className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium group-hover:text-primary transition-colors">{car.name}</p>
                                <Badge
                                  variant={
                                    car.status === 'Available'
                                      ? 'default'
                                      : car.status === 'Leased'
                                      ? 'secondary'
                                      : 'outline'
                                  }
                                  className="mt-1"
                                >
                                  {car.status}
                                </Badge>
                              </div>
                            </div>
                            {car.carImagePath && car.carImagePath[0] && (
                              <img 
                                src={car.carImagePath[0]} 
                                alt={car.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            )}
                          </div>

                          {/* {car.color && (
                            <p className="text-sm text-muted-foreground mb-2">Color: {car.color}</p>
                          )} */}

                          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
                            <div>
                              <p className="text-xs text-muted-foreground">Invested Amount</p>
                              <p className="font-medium text-sm">BHD {car.investedAmount?.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Current Value</p>
                              <p className="font-medium text-sm text-primary">
                                BHD {car.currentValue?.toLocaleString()} {/* Displaying currentValue from API */}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Our Comm.</p>
                              <p className="font-medium text-sm">
                                BHD {car.companyCommission?.toLocaleString() || ((car.currentValue - car.investedAmount) * 0.15).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Profit/Loss Indicator based on currentValue */}
                          {/* {car.currentValue > 0 && (
                            <div className="mt-3 pt-2 border-t border-border/50">
                              <div className={`text-xs ${car.currentValue > car.investedAmount ? 'text-green-600' : car.currentValue < car.investedAmount ? 'text-red-600' : 'text-muted-foreground'}`}>
                                {car.currentValue > car.investedAmount ? (
                                  <span>+ BHD {(car.currentValue - car.investedAmount).toLocaleString()} profit potential</span>
                                ) : car.currentValue < car.investedAmount ? (
                                  <span>- BHD {(car.investedAmount - car.currentValue).toLocaleString()} loss potential</span>
                                ) : (
                                  <span>Break even</span>
                                )}
                              </div>
                            </div>
                          )} */}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Transaction History ({transactions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No transactions found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                          <th className="text-center py-3 px-4 font-medium text-muted-foreground">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tx: any, i: number) => (
                          <tr key={i} className="border-b border-border/50 hover:bg-secondary/20">
                            <td className="py-3 px-4">{tx.date}</td>
                            <td className="py-3 px-4">{tx.desc}</td>
                            <td className={`py-3 px-4 text-right font-bold ${tx.type === 'Investment' ? 'text-foreground' : 'text-primary'}`}>
                              BHD {tx.amount?.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={tx.type === 'Investment' || tx.type === 'Expense' ? 'destructive' : 'default'}>
                                {tx.type}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Money Trail Tab */}
          <TabsContent value="money-trail">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Money Trail Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8 py-4">
                  <div className="flex items-center gap-8">
                    <div className="w-1/3 p-4 bg-secondary rounded-xl border border-border text-center">
                      <p className="text-xs text-muted-foreground uppercase font-bold mb-2">Investor Funds</p>
                      <p className="text-xl font-bold">BHD {moneyTrail.investorFunds?.toLocaleString()}</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-2">
                      <div className="h-0.5 bg-primary flex-1" />
                      <div className="p-2 rounded-full bg-primary/20">
                        <ArrowLeft className="h-4 w-4 text-primary rotate-180" />
                      </div>
                      <div className="h-0.5 bg-primary flex-1" />
                    </div>
                    <div className="w-1/3 p-4 bg-primary/10 rounded-xl border border-primary/20 text-center">
                      <p className="text-xs text-muted-foreground uppercase font-bold mb-2">Inventory Acquisition</p>
                      <p className="text-xl font-bold text-primary">BHD {moneyTrail.inventoryAcquisition?.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8">
                    <div className="p-6 bg-card border border-border rounded-xl">
                      <h4 className="font-bold text-sm mb-4">Allocation</h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Car Purchase</span>
                          <span className="font-medium">{Math.abs(carPurchasePercent).toFixed(1)}%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Lease Expenses</span>
                          <span className="font-medium">{leaseExpensesPercent.toFixed(1)}%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Reinvestment</span>
                          <span className="font-medium">{reinvestmentPercent.toFixed(1)}%</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 bg-card border border-border rounded-xl">
                      <h4 className="font-bold text-sm mb-4">Proceeds Destination</h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Holding Account</span>
                          <span className="font-medium">BHD {moneyTrail.holdingAccount?.toLocaleString()}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Reinvested</span>
                          <span className="font-medium">BHD {moneyTrail.reinvested?.toLocaleString()}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Returned</span>
                          <span className="font-medium">BHD {moneyTrail.returned?.toLocaleString()}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col justify-center">
                      <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Total Flow Tracked</p>
                      <p className="text-2xl font-black text-primary">BHD {moneyTrail.totalFlowTracked?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profit Breakdown Tab (Admin Only) */}
          {isAdmin && (
            <TabsContent value="breakdown">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Profit Breakdown (Admin Only)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-foreground" />
                        <span className="font-medium">Gross Profit</span>
                      </div>
                      <span className="text-lg font-bold">
                        BHD {profitBreakdownData.grossProfit?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-3">
                        <TrendingDown className="h-5 w-5 text-destructive" />
                        <div>
                          <p className="font-medium">Auto Lounge Commission</p>
                          <p className="text-xs text-muted-foreground">
                            {profitBreakdownData.grossProfit > 0 
                              ? ((profitBreakdownData.autoLoungeCommission / profitBreakdownData.grossProfit) * 100).toFixed(1) 
                              : 0}% of gross
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-destructive">
                        - BHD {profitBreakdownData.autoLoungeCommission?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-3">
                        <Percent className="h-5 w-5 text-destructive" />
                        <div>
                          <p className="font-medium">VAT (10%)</p>
                          <p className="text-xs text-muted-foreground">Deducted from gross profit</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-destructive">
                        - BHD {profitBreakdownData.vat?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg">Net Investor Profit</span>
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        BHD {profitBreakdownData.netInvestorProfit?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Breakdown Summary */}
                  <div className="mt-6 p-4 bg-secondary rounded-lg">
                    <h4 className="font-medium mb-3">Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gross Profit:</span>
                        <span className="font-medium">100%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Our Commission:</span>
                        <span className="font-medium">
                          {profitBreakdownData.grossProfit > 0 
                            ? ((profitBreakdownData.autoLoungeCommission / profitBreakdownData.grossProfit) * 100).toFixed(1) 
                            : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">VAT:</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="font-medium">Investor Share:</span>
                        <span className="font-bold text-primary">
                          {profitBreakdownData.grossProfit > 0 
                            ? ((profitBreakdownData.netInvestorProfit / profitBreakdownData.grossProfit) * 100).toFixed(1) 
                            : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
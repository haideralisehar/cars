import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { getMyInvestor } from '@/app/api/Investors/getSpecificInvestor';
import Cookies from "js-cookie";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Car as CarIcon,
  Wallet,
  PieChart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye
} from 'lucide-react';

export function InvestorPortal() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [investorData, setInvestorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = Cookies.get("token");

  const fetchMyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMyInvestor(token);
      console.log("API Response:", response);
      
      if (response) {
        setInvestorData(response);
      } else {
        setError("No investor data found");
      }
    } catch (error) {
      console.error("Error fetching investor data:", error);
      setError(error.message || "Failed to fetch investor data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="bg-card border-border max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading investor data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !investorData) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="bg-card border-border max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-500 mb-4">
              {error || "Investor profile not found"}
            </p>
            <Button onClick={fetchMyData} variant="outline" className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'BHD0';
    return `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate portfolio metrics from API data
  const investorCars = investorData.cars || [];
  const availableCars = investorCars.filter(car => car.status === 'Available').length;
  const soldCars = investorCars.filter(car => car.status === 'Sold').length;
  const leasedCars = investorCars.filter(car => car.status === 'Leased').length;

  const Available_Cars = availableCars + leasedCars;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Auto Lounge</h1>
            <p className="text-muted-foreground mt-1">Investor Portal</p>
          </div>
          <Badge variant="default" className="text-sm px-4 py-2">
            Welcome, {investorData.investorName || investorData.name}
          </Badge>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {formatCurrency(investorData.totalInvested)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {formatCurrency(investorData.currentBalance)}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {investorData.currentBalance >= investorData.totalInvested ? (
                  <>
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500 font-medium">
                      +{formatCurrency(investorData.currentBalance - investorData.totalInvested)}
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-red-500 font-medium">
                      {formatCurrency(investorData.currentBalance - investorData.totalInvested)}
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              {investorData.totalProfit >= 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
              
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${investorData.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(investorData.totalProfit)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                ROI: {investorData.totalInvested > 0 ? ((investorData.totalProfit / investorData.totalInvested) * 100).toFixed(2) : '0'}%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Cars</CardTitle>
              <CarIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{Available_Cars}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {availableCars} Available, {soldCars} Sold, {leasedCars} Leased
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profit - Last Week</CardTitle>
              {investorData.profitLastWeek >= 0 ? <TrendingUp className="h-4 w-4 text-primary" />: <TrendingDown className="h-4 w-4 text-red-500" />}
              
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${investorData.profitLastWeek >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(investorData.profitLastWeek)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profit - Last Month</CardTitle>
              {investorData.profitLastMonth >= 0 ? <TrendingUp className="h-4 w-4 text-primary" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
              
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${investorData.profitLastMonth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(investorData.profitLastMonth)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment History & Car Portfolio */}
        <Tabs defaultValue="cars" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cars" className="flex items-center gap-2">
              <CarIcon className="h-4 w-4" />
              My Car Portfolio
            </TabsTrigger>
            <TabsTrigger value="investments" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Investment History
            </TabsTrigger>
          </TabsList>

          {/* Car Portfolio Tab */}
          <TabsContent value="cars">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CarIcon className="h-5 w-5 text-primary" />
                  Cars Funded by Your Investment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  {investorCars.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <CarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No cars in your portfolio yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {investorCars.map((car) => (
                        <div
                          key={car.id}
                          className="p-4 bg-secondary rounded-lg border border-border hover:border-primary transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                {car.carImagePath && (
                                  <img 
                                    src={car.carImagePath} 
                                    alt={`${car.make} ${car.model}`}
                                    className="w-16 h-16 object-cover rounded-md"
                                  />
                                )}
                                <div>
                                  <h3 className="font-semibold text-foreground text-lg">
                                    {car.year} {car.make} {car.model}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    Amount Used: {formatCurrency(car.amountUsed)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant={
                                car.status === 'Available' ? 'default' :
                                car.status === 'Sold' ? 'secondary' : 'outline'
                              }>
                                {car.status}
                              </Badge>
                              {car.enableLease && (
                                <Badge variant="outline">Lease Available</Badge>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-3">
                            <div>
                              <p className="text-muted-foreground text-xs">Color</p>
                              <p className="font-medium text-foreground">{car.color || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Sold Price</p>
                              <p className="font-medium text-foreground">{formatCurrency(car.askingPrice)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Company Commission</p>
                              <p className="font-medium text-foreground">{formatCurrency(car.companyCommission)}</p>
                            </div>
                          </div>

                          {car.status === 'Sold' && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Created At:</span>
                                <span className="text-sm font-medium text-foreground">
                                  {formatDate(car.createdAt)}
                                </span>
                              </div>
                            </div>
                          )}

                          {car.enableLease && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Lease Details:</span>
                                <span className="text-sm font-medium text-primary">
                                  {formatCurrency(car.leaseAmount)} / {car.leaseType}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investment History Tab */}
          <TabsContent value="investments">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Investment Contributions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  {!investorData.investments || investorData.investments.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No investment records yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {investorData.investments.map((investment, index) => (
                        <div
                          key={investment.id}
                          className="p-4 bg-secondary rounded-lg border border-border"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-foreground text-lg">
                                {formatCurrency(investment.amount)}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(investment.investmentDate)}
                                </p>
                              </div>
                              {investment.paymentMethod && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Payment Method: {investment.paymentMethod}
                                </p>
                              )}
                            </div>
                            <Badge variant="outline">
                              Investment #{investorData.investments.length - index}
                            </Badge>
                          </div>
                        </div>
                      ))}

                      {/* Summary */}
                      <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Total Contributions:</span>
                            <span className="text-lg font-bold text-foreground">
                              {formatCurrency(investorData.totalContributions || investorData.totalInvested)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Number of Investments:</span>
                            <span className="text-lg font-bold text-foreground">
                              {investorData.numberOfInvestments || investorData.investments.length}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-primary/20">
                            <span className="text-sm text-muted-foreground">First Investment:</span>
                            <span className="text-sm font-medium text-foreground">
                              {formatDate(investorData.firstInvestmentDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Account Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Investor Name</p>
                <p className="font-medium text-foreground">{investorData.investorName || investorData.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact Number</p>
                <p className="font-medium text-foreground">{investorData.contactNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CPR Number</p>
                <p className="font-medium text-foreground">{investorData.cprNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <Badge variant={investorData.isActive ? 'default' : 'secondary'}>
                  {investorData.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              {investorData.email && (
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{investorData.email}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
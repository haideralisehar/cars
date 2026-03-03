import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Investor, Car } from '@/types';
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

interface InvestorPortalProps {
  investorId: string;
  investors: Investor[];
  cars: Car[];
}

export function InvestorPortal({ investorId, investors, cars }: InvestorPortalProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Find the investor data
  const investor = investors.find(inv => inv.id === investorId);

  if (!investor) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="bg-card border-border max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Investor profile not found. Please contact the administrator.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter cars that belong to this investor
  const investorCars = cars.filter(car => investor.activeCars.includes(car.id));

  // Calculate portfolio metrics
  const totalCarValue = investorCars.reduce((sum, car) => sum + (car.sellingPrice || car.askingPrice), 0);
  const availableCars = investorCars.filter(car => car.status === 'Available').length;
  const soldCars = investorCars.filter(car => car.status === 'Sold').length;
  const leasedCars = investorCars.filter(car => car.status === 'Leased').length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Investor Portal</h1>
            <p className="text-muted-foreground mt-1">Welcome, {investor.name}</p>
          </div>
          <Badge variant="default" className="text-sm px-4 py-2">
            {investor.status}
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
                ${investor.totalInvested.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${investor.currentBalance.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {investor.currentBalance >= investor.totalInvested ? (
                  <>
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500 font-medium">
                      +${(investor.currentBalance - investor.totalInvested).toLocaleString()}
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-red-500 font-medium">
                      -${(investor.totalInvested - investor.currentBalance).toLocaleString()}
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                ${investor.totalProfit.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                ROI: {investor.roi.toFixed(2)}%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Cars</CardTitle>
              <CarIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{investorCars.length}</div>
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
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${investor.profitLastWeek.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profit - Last Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${investor.profitLastMonth.toLocaleString()}
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
                            <div>
                              <h3 className="font-semibold text-foreground text-lg">
                                {car.year} {car.make} {car.model}
                              </h3>
                              <p className="text-sm text-muted-foreground">VIN: {car.vin}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant={
                                car.status === 'Available' ? 'default' :
                                car.status === 'Sold' ? 'secondary' : 'outline'
                              }>
                                {car.status}
                              </Badge>
                              <Badge variant="outline">{car.source}</Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground text-xs">Color</p>
                              <p className="font-medium text-foreground">{car.color}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Registration</p>
                              <p className="font-medium text-foreground">{car.registrationNumber}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Buying Price</p>
                              <p className="font-medium text-foreground">${car.buyingPrice.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">
                                {car.status === 'Sold' ? 'Sold Price' : 'Asking Price'}
                              </p>
                              <p className="font-medium text-foreground">
                                ${(car.sellingPrice || car.askingPrice).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {car.status === 'Sold' && car.sellingPrice && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Profit from Sale:</span>
                                <span className={`text-sm font-semibold ${
                                  car.sellingPrice > car.buyingPrice ? 'text-green-500' : 'text-red-500'
                                }`}>
                                  {car.sellingPrice > car.buyingPrice ? '+' : ''}
                                  ${(car.sellingPrice - car.buyingPrice).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          )}

                          {car.leaseEnabled && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Lease Available:</span>
                                <span className="text-sm font-medium text-primary">
                                  ${car.leaseAmount?.toLocaleString()} / {car.leaseType}
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
                  {investor.investments.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No investment records yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {investor.investments.map((investment, index) => (
                        <div
                          key={investment.id}
                          className="p-4 bg-secondary rounded-lg border border-border"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-foreground text-lg">
                                ${investment.amount.toLocaleString()}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  {new Date(investment.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline">
                              Investment #{investor.investments.length - index}
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
                              ${investor.totalInvested.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Number of Investments:</span>
                            <span className="text-lg font-bold text-foreground">
                              {investor.investments.length}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-primary/20">
                            <span className="text-sm text-muted-foreground">First Investment:</span>
                            <span className="text-sm font-medium text-foreground">
                              {new Date(investor.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
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
                <p className="font-medium text-foreground">{investor.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact Number</p>
                <p className="font-medium text-foreground">{investor.contactNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CPR Number</p>
                <p className="font-medium text-foreground">{investor.cprNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <Badge variant={investor.status === 'Active' ? 'default' : 'secondary'}>
                  {investor.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

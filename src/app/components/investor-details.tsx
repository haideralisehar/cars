import { useState } from 'react';
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
  Edit
} from 'lucide-react';

interface InvestorDetailsProps {
  investor: Investor;
  userRole: 'Admin' | 'SuperAdmin' | 'User' | 'Operations' | 'Driver' | 'Investor';
  onBack: () => void;
}

export function InvestorDetails({ investor, userRole, onBack }: InvestorDetailsProps) {
  const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
  const isSuperAdmin = userRole === 'SuperAdmin';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">You do not have permission to view detailed investor profiles.</p>
        <Button onClick={onBack}>Return to List</Button>
      </div>
    );
  }

  // Mock data for timeline and active assets
  const timelineEvents = [
    {
      id: 'te-1',
      type: 'purchase',
      description: 'Used 25,000 BHD to buy Toyota Camry 2024',
      date: '2026-02-01',
      carId: 'car-1',
    },
    {
      id: 'te-2',
      type: 'lease',
      description: 'Camry leased – monthly income of 800 BHD',
      date: '2026-02-05',
      carId: 'car-1',
    },
    {
      id: 'te-3',
      type: 'sale',
      description: 'Camry sold – profit realized: 3,500 BHD',
      date: '2026-02-15',
      carId: 'car-1',
    },
    {
      id: 'te-4',
      type: 'purchase',
      description: 'Used 18,000 BHD to buy Honda Accord 2023',
      date: '2026-01-20',
      carId: 'car-2',
    },
  ];

  const activeCars = [
    {
      id: 'car-1',
      name: 'BMW X5 2024',
      status: 'Available' as const,
      investedAmount: 35000,
      currentValue: 38000,
    },
    {
      id: 'car-2',
      name: 'Mercedes C300 2023',
      status: 'Leased' as const,
      investedAmount: 28000,
      currentValue: 30000,
    },
  ];

  // Mock profit breakdown
  const profitBreakdown: InvestorProfitBreakdown = {
    grossProfit: 15000,
    autoLoungeCommission: 2250, // 15%
    vat: 1500, // 10%
    netInvestorProfit: 11250,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{investor.name}</h1>
                <Badge variant={investor.status === 'Active' ? 'default' : 'secondary'}>
                  {investor.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">{investor.contactNumber}</p>
            </div>
          </div>
          {isSuperAdmin && (
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
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
              <p className="text-2xl font-bold">BHD {investor.totalInvested.toLocaleString()}</p>
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
                BHD {investor.currentBalance.toLocaleString()}
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
                BHD {investor.totalProfit.toLocaleString()}
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
              <p className="text-2xl font-bold text-primary">{investor.roi}%</p>
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
                    BHD {investor.profitLastWeek.toLocaleString()}
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
                    BHD {investor.profitLastMonth.toLocaleString()}
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
                {timelineEvents.map((event, index) => (
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
                              : 'bg-primary/20'
                          }`}
                        >
                          {event.type === 'purchase' && <ShoppingCart className="h-5 w-5" />}
                          {event.type === 'lease' && <Car className="h-5 w-5 text-primary" />}
                          {event.type === 'sale' && <TrendingUp className="h-5 w-5 text-primary" />}
                        </div>
                      </div>

                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-medium">{event.description}</p>
                          <Badge variant="outline" className="ml-2">
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                          View Details →
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Assets Tab */}
          <TabsContent value="assets">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Active Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeCars.map((car) => (
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
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
                          <div>
                            <p className="text-xs text-muted-foreground">Invested Amount</p>
                            <p className="font-medium text-sm">BHD {car.investedAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Current Value</p>
                            <p className="font-medium text-sm text-primary">
                              BHD {car.currentValue.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Our Comm.</p>
                            <p className="font-medium text-sm">
                              BHD {( (car.currentValue - car.investedAmount) * 0.15 ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
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
                      {[
                        { date: '2026-02-15', desc: 'Return of investment (Toyota Camry)', amount: 28500, type: 'Return' },
                        { date: '2026-02-10', desc: 'Lease Income - Mercedes C300', amount: 800, type: 'Lease Income' },
                        { date: '2026-02-01', desc: 'New Investment - BMW X5', amount: 35000, type: 'Investment' },
                        { date: '2026-01-20', desc: 'Maintenance Expense - Mercedes', amount: 150, type: 'Expense' },
                      ].map((tx, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-secondary/20">
                          <td className="py-3 px-4">{tx.date}</td>
                          <td className="py-3 px-4">{tx.desc}</td>
                          <td className={`py-3 px-4 text-right font-bold ${tx.type === 'Investment' ? 'text-foreground' : 'text-primary'}`}>
                            BHD {tx.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge variant="outline">{tx.type}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                      <p className="text-xl font-bold">BHD {investor.totalInvested.toLocaleString()}</p>
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
                      <p className="text-xl font-bold text-primary">BHD 63,000</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8">
                    <div className="p-6 bg-card border border-border rounded-xl">
                      <h4 className="font-bold text-sm mb-4">Allocation</h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Car Purchase</span>
                          <span className="font-medium">85%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Lease Expenses</span>
                          <span className="font-medium">10%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Reinvestment</span>
                          <span className="font-medium">5%</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 bg-card border border-border rounded-xl">
                      <h4 className="font-bold text-sm mb-4">Proceeds Destination</h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Holding Account</span>
                          <span className="font-medium">BHD 12,400</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Reinvested</span>
                          <span className="font-medium">BHD 45,000</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Returned</span>
                          <span className="font-medium">BHD 25,000</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col justify-center">
                      <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Total Flow Tracked</p>
                      <p className="text-2xl font-black text-primary">BHD 82,400</p>
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
                        BHD {profitBreakdown.grossProfit.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-3">
                        <TrendingDown className="h-5 w-5 text-destructive" />
                        <div>
                          <p className="font-medium">Auto Lounge Commission</p>
                          <p className="text-xs text-muted-foreground">
                            {((profitBreakdown.autoLoungeCommission / profitBreakdown.grossProfit) * 100).toFixed(1)}% of gross
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-destructive">
                        - BHD {profitBreakdown.autoLoungeCommission.toLocaleString()}
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
                        - BHD {profitBreakdown.vat.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg">Net Investor Profit</span>
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        BHD {profitBreakdown.netInvestorProfit.toLocaleString()}
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
                          {((profitBreakdown.autoLoungeCommission / profitBreakdown.grossProfit) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">VAT:</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="font-medium">Investor Share:</span>
                        <span className="font-bold text-primary">
                          {((profitBreakdown.netInvestorProfit / profitBreakdown.grossProfit) * 100).toFixed(1)}%
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

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

  console.log('Rendering InvestorDetails for:', investor);

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
                <h1 className="text-3xl font-bold">{investor.investorName}</h1>
                <Badge variant={investor.isActive  ? 'default' : 'secondary'}>
                  {investor.isActive ? "Active" : "Inactive"}
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
                    BHD {investor.thisWeek.toLocaleString()}
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
                    BHD {investor.thisMonth.toLocaleString()}
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
        
        
      </div>
    </div>
  );
}

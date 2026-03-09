  import { useState } from 'react';
  import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
  import { Button } from '@/app/components/ui/button';
  import { Badge } from '@/app/components/ui/badge';
  import { Input } from '@/app/components/ui/input';
  import { AddEditInvestorModal } from '@/app/components/add-edit-investor-modal';
  import { InvestorDetails } from '@/app/components/investor-details';
  import { Investor } from '@/types';
  import { 
    Plus, 
    TrendingUp, 
    TrendingDown, 
    DollarSign, 
    Search,
    ArrowUpRight,
    ArrowDownRight,
    Users
  } from 'lucide-react';

  interface InvestorsProps {
    userRole: 'Admin' | 'SuperAdmin' | 'User' | 'Operations' | 'Driver' | 'Investor';
  }

  export function Investors({ userRole }: InvestorsProps) {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
    const [viewingDetails, setViewingDetails] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
    const isSuperAdmin = userRole === 'SuperAdmin';
    const isInvestor = userRole === 'Investor';

    // Mock data
    const mockInvestors: Investor[] = [
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
      {
        id: 'inv-3',
        name: 'Khalid Ibrahim',
        contactNumber: '+973 3355 6677',
        cprNumber: '940303456',
        status: 'Active',
        investments: [
          { id: 'ie-4', amount: 30000, date: '2026-01-20' },
        ],
        totalInvested: 30000,
        currentBalance: 31200,
        totalProfit: 1200,
        profitLastWeek: 500,
        profitLastMonth: 1200,
        roi: 4.0,
        activeCars: ['car-6'],
        createdAt: '2026-01-20',
      },
    ];

    const filteredInvestors = mockInvestors.filter((investor) =>
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.contactNumber.includes(searchQuery) ||
      investor.cprNumber.includes(searchQuery)
    );

    const handleInvestorClick = (investor: Investor) => {
      setSelectedInvestor(investor);
      setViewingDetails(true);
    };

    const handleBackToList = () => {
      setViewingDetails(false);
      setSelectedInvestor(null);
    };

    if (viewingDetails && selectedInvestor) {
      return (
        <InvestorDetails 
          investor={selectedInvestor} 
          userRole={userRole}
          onBack={handleBackToList}
        />
      );
    }

    // Investor Dashboard View
    if (isInvestor) {
      const investorData = mockInvestors[0]; // Self only
      return (
        <div className="min-h-screen bg-background p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-foreground">My Investment Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
                  <p className="text-2xl font-bold">BHD {investorData.totalInvested.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Active Assets</p>
                  <p className="text-2xl font-bold">{investorData.activeCars.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Profit (Net)</p>
                  <p className="text-2xl font-bold text-primary">BHD {investorData.totalProfit.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">After commission</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total ROI</p>
                  <p className="text-2xl font-bold text-primary">{investorData.roi}%</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle>Profit Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end gap-4 px-4">
                  {[45, 60, 45, 75, 55, 90, 85].map((val, i) => (
                    <div key={i} className="flex-1 bg-primary/20 rounded-t relative group">
                      <div 
                        className="absolute bottom-0 w-full bg-primary rounded-t transition-all hover:bg-primary/80" 
                        style={{ height: `${val}%` }}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border p-1 rounded text-xs whitespace-nowrap">
                        BHD {(val * 10).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                  <span>Week 5</span>
                  <span>Week 6</span>
                  <span>Week 7</span>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-xl font-bold mb-4">My Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {investorData.activeCars.map((carId, idx) => (
                <Card key={carId} className="bg-card border-border cursor-default">
                  <div className="h-32 bg-secondary rounded-t overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop`} className="w-full h-full object-cover" alt="Asset" />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-bold">BMW X5 2024</p>
                    <p className="text-sm text-muted-foreground mb-3">Leased</p>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">My Net Profit</span>
                      <span className="font-bold text-primary">BHD {(1200 + idx * 300).toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Investors</h1>
              <p className="text-muted-foreground">Manage investor partnerships and track performance</p>
            </div>
            {isSuperAdmin && (
              <Button onClick={() => setAddModalOpen(true)}>
                <Plus className="h-5 w-5 mr-2" />
                Add Investor
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search investors by name, CPR, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input-background"
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Investors</p>
                    <p className="text-2xl font-bold">{mockInvestors.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Invested</p>
                    <p className="text-2xl font-bold">
                      BHD {mockInvestors.reduce((sum, inv) => sum + inv.totalInvested, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Profit</p>
                    <p className="text-2xl font-bold text-primary">
                      BHD {mockInvestors.reduce((sum, inv) => sum + inv.totalProfit, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-2xl font-bold">
                      BHD {mockInvestors.reduce((sum, inv) => sum + inv.currentBalance, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInvestors.map((investor) => (
              <Card
                key={investor.id}
                className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => handleInvestorClick(investor)}
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{investor.name}</h3>
                      <p className="text-sm text-muted-foreground">{investor.contactNumber}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={investor.status === 'Active' ? 'default' : 'secondary'}>
                        {investor.status}
                      </Badge>
                      {isSuperAdmin && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInvestor(investor);
                            setAddModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Invested</span>
                      <span className="font-medium">BHD {investor.totalInvested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Assets</span>
                      <span className="font-medium">{investor.activeCars.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Net Profit</span>
                      <span className="font-bold text-primary">
                        BHD {investor.totalProfit.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Profit Metrics */}
                  <div className="border-t border-border pt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">This Week</span>
                        {investor.profitLastWeek > 0 ? (
                          <ArrowUpRight className="h-3 w-3 text-primary" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-destructive" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-primary">
                        BHD {investor.profitLastWeek.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">This Month</span>
                        {investor.profitLastMonth > 0 ? (
                          <ArrowUpRight className="h-3 w-3 text-primary" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-destructive" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-primary">
                        BHD {investor.profitLastMonth.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">ROI</span>
                      <span className="text-lg font-bold text-primary">{investor.roi}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInvestors.length === 0 && (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No investors found</p>
                <Button className="mt-4" onClick={() => setAddModalOpen(true)}>
                  <Plus className="h-5 w-5 mr-2" />
                  Add First Investor
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Add/Edit Investor Modal */}
        <AddEditInvestorModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          investor={null}
        />
      </div>
    );
  }

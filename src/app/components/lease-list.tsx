import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Lease } from '@/types';
import { Search, Calendar, DollarSign, Car, AlertCircle } from 'lucide-react';

interface LeaseListProps {
  onCarClick: (carId: string) => void;
}

export function LeaseList({ onCarClick }: LeaseListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockLeases: Lease[] = [
    {
      id: 'lease-1',
      carId: '6',
      carName: 'Toyota Corolla 2024',
      lesseeName: 'Ali Mohammed',
      lesseeCpr: '910101234',
      leaseType: 'Daily',
      rentAmount: 25,
      startDate: '2026-01-15',
      duration: 30,
      nextDueDate: '2026-02-14',
      status: 'Overdue',
    },
    {
      id: 'lease-2',
      carId: '7',
      carName: 'Honda Civic 2023',
      lesseeName: 'Fatima Hassan',
      lesseeCpr: '920202345',
      leaseType: 'Monthly',
      rentAmount: 450,
      startDate: '2026-02-01',
      duration: 6,
      nextDueDate: '2026-03-01',
      status: 'Active',
    },
    {
      id: 'lease-3',
      carId: '8',
      carName: 'Nissan Altima 2024',
      lesseeName: 'Ahmed Ali',
      lesseeCpr: '930303456',
      leaseType: 'Daily',
      rentAmount: 20,
      startDate: '2026-02-01',
      duration: 15,
      nextDueDate: '2026-02-16',
      status: 'Active',
    },
    {
      id: 'lease-4',
      carId: '9',
      carName: 'Mazda 6 2023',
      lesseeName: 'Sara Ibrahim',
      lesseeCpr: '940404567',
      leaseType: 'Monthly',
      rentAmount: 400,
      startDate: '2026-01-01',
      duration: 12,
      nextDueDate: '2026-02-10',
      status: 'Overdue',
    },
    {
      id: 'lease-5',
      carId: '10',
      carName: 'Hyundai Elantra 2024',
      lesseeName: 'Khalid Ahmed',
      lesseeCpr: '950505678',
      leaseType: 'Daily',
      rentAmount: 18,
      startDate: '2026-02-02',
      duration: 20,
      nextDueDate: '2026-02-22',
      status: 'Active',
    },
    {
      id: 'lease-6',
      carId: '11',
      carName: 'Kia Optima 2023',
      lesseeName: 'Mariam Hassan',
      lesseeCpr: '960606789',
      leaseType: 'Monthly',
      rentAmount: 380,
      startDate: '2025-12-15',
      duration: 12,
      nextDueDate: '2026-01-15',
      status: 'Completed',
    },
  ];

  const filteredLeases = mockLeases.filter((lease) =>
    lease.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lease.lesseeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lease.leaseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate totals
  const totalLeases = mockLeases.filter(l => l.status !== 'Completed').length;
  const activeLeases = mockLeases.filter(l => l.status === 'Active').length;
  const overdueLeases = mockLeases.filter(l => l.status === 'Overdue').length;
  const totalRevenue = mockLeases
    .filter(l => l.status !== 'Completed')
    .reduce((sum, lease) => {
      const amount = lease.leaseType === 'Daily' 
        ? lease.rentAmount * lease.duration 
        : lease.rentAmount * lease.duration;
      return sum + amount;
    }, 0);

  const getStatusVariant = (status: Lease['status']) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Overdue':
        return 'destructive';
      case 'Completed':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getLeaseTypeColor = (leaseType: Lease['leaseType']) => {
    return leaseType === 'Daily' ? 'text-blue-400' : 'text-purple-400';
  };

  const isOverdue = (nextDueDate: string, status: Lease['status']) => {
    if (status === 'Completed') return false;
    return new Date(nextDueDate) < new Date() || status === 'Overdue';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Leases</h1>
          <p className="text-muted-foreground">Manage active vehicle leases and rental agreements</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Leases</p>
                  <p className="text-2xl font-bold">{totalLeases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">{activeLeases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold">{overdueLeases}</p>
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
                  <p className="text-sm text-muted-foreground">Expected Revenue</p>
                  <p className="text-2xl font-bold">BHD {totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by car, lessee, or lease type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
        </div>

        {/* Leases Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>All Leases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Car Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Lessee Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Lease Type</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rent Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Next Due Date</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeases.map((lease) => (
                    <tr
                      key={lease.id}
                      className="border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                      onClick={() => onCarClick(lease.carId)}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{lease.carName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{lease.lesseeName}</p>
                          <p className="text-xs text-muted-foreground">{lease.lesseeCpr}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-medium ${getLeaseTypeColor(lease.leaseType)}`}>
                          {lease.leaseType}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-bold text-primary">
                            BHD {lease.rentAmount.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            per {lease.leaseType === 'Daily' ? 'day' : 'month'}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {isOverdue(lease.nextDueDate, lease.status) && (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                          <div>
                            <p className={`text-sm ${isOverdue(lease.nextDueDate, lease.status) ? 'text-destructive font-medium' : ''}`}>
                              {new Date(lease.nextDueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={getStatusVariant(lease.status)}>
                          {lease.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeases.length === 0 && (
                <div className="text-center py-12">
                  <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No leases found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
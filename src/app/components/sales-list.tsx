import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Sale } from '@/types';
import { Search, Calendar, DollarSign, TrendingUp } from 'lucide-react';

interface SalesListProps {
  onCarClick: (carId: string) => void;
}

export function SalesList({ onCarClick }: SalesListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockSales: Sale[] = [
    {
      id: 'sale-1',
      date: '2026-02-01',
      carId: '1',
      carName: 'BMW X5 2024',
      carSource: 'Company',
      soldPrice: 38000,
      paymentType: 'Full',
      status: 'Completed',
      purchaserName: 'Mohammed Ali',
      purchaserCpr: '920101234',
      commission: 2000,
      commissionType: 'Fixed',
    },
    {
      id: 'sale-2',
      date: '2026-02-02',
      carId: '2',
      carName: 'Mercedes C300 2023',
      carSource: 'Investor',
      soldPrice: 32000,
      paymentType: 'Installment',
      status: 'Installment Active',
      purchaserName: 'Ahmed Hassan',
      purchaserCpr: '930202345',
      commission: 15,
      commissionType: 'Percentage',
    },
    {
      id: 'sale-3',
      date: '2026-01-28',
      carId: '3',
      carName: 'Toyota Camry 2024',
      carSource: 'Customer',
      soldPrice: 18500,
      paymentType: 'Full',
      status: 'Completed',
      purchaserName: 'Sara Mohammed',
      purchaserCpr: '940303456',
      commission: 1500,
      commissionType: 'Fixed',
    },
    {
      id: 'sale-4',
      date: '2026-01-25',
      carId: '4',
      carName: 'Honda Accord 2023',
      carSource: 'Company',
      soldPrice: 16000,
      paymentType: 'Installment',
      status: 'Installment Active',
      purchaserName: 'Khalid Ibrahim',
      purchaserCpr: '950404567',
      commission: 10,
      commissionType: 'Percentage',
    },
    {
      id: 'sale-5',
      date: '2026-01-20',
      carId: '5',
      carName: 'Lexus ES 2024',
      carSource: 'Investor',
      soldPrice: 45000,
      paymentType: 'Full',
      status: 'Completed',
      purchaserName: 'Fatima Ali',
      purchaserCpr: '960505678',
      commission: 3000,
      commissionType: 'Fixed',
    },
  ];

  const filteredSales = mockSales.filter((sale) =>
    sale.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.purchaserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.carSource.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate totals
  const totalSales = mockSales.length;
  const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.soldPrice, 0);
  const completedSales = mockSales.filter(s => s.status === 'Completed').length;
  const activeSales = mockSales.filter(s => s.status === 'Installment Active').length;

  const getStatusVariant = (status: Sale['status']) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Installment Active':
        return 'secondary';
      case 'Pending':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getSourceColor = (source: Sale['carSource']) => {
    switch (source) {
      case 'Company':
        return 'text-primary';
      case 'Investor':
        return 'text-blue-400';
      case 'Customer':
        return 'text-purple-400';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Sales</h1>
          <p className="text-muted-foreground">Track all vehicle sales and transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold">{totalSales}</p>
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
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">BHD {totalRevenue.toLocaleString()}</p>
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
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedSales}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Installments</p>
                  <p className="text-2xl font-bold">{activeSales}</p>
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
              placeholder="Search by car, purchaser, or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
        </div>

        {/* Sales Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>All Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Car Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sold Price</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment Type</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                      onClick={() => onCarClick(sale.carId)}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(sale.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{sale.carName}</p>
                          <p className="text-sm text-muted-foreground">{sale.purchaserName}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-medium ${getSourceColor(sale.carSource)}`}>
                          {sale.carSource}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-primary">
                          BHD {sale.soldPrice.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm">{sale.paymentType}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={getStatusVariant(sale.status)}>
                          {sale.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredSales.length === 0 && (
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No sales found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
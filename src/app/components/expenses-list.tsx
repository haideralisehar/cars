import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { AddEditExpenseModal } from '@/app/components/add-edit-expense-modal';
import { Expense } from '@/types';
import { Search, Plus, Calendar, DollarSign, FileText, Receipt, TrendingDown } from 'lucide-react';

export function ExpensesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Mock data
  const mockExpenses: Expense[] = [
    {
      id: 'exp-1',
      date: '2026-02-01',
      category: 'Office',
      amount: 150,
      description: 'Office supplies and stationery',
      isAssetExpense: false,
    },
    {
      id: 'exp-2',
      date: '2026-02-02',
      category: 'Maintenance',
      amount: 350,
      description: 'Oil change and brake pad replacement',
      linkedCarId: 'car-1',
      linkedCarName: 'BMW X5 2024',
      isAssetExpense: true,
      receiptUrl: '/receipts/exp-2.pdf',
    },
    {
      id: 'exp-3',
      date: '2026-02-02',
      category: 'Grocery',
      amount: 75,
      description: 'Coffee, tea, and refreshments',
      isAssetExpense: false,
    },
    {
      id: 'exp-4',
      date: '2026-01-31',
      category: 'Repair',
      amount: 1200,
      description: 'Engine repair and diagnostics',
      linkedCarId: 'car-2',
      linkedCarName: 'Mercedes C300 2023',
      isAssetExpense: true,
      receiptUrl: '/receipts/exp-4.pdf',
    },
    {
      id: 'exp-5',
      date: '2026-01-30',
      category: 'Detailing',
      amount: 180,
      description: 'Full interior and exterior detailing',
      linkedCarId: 'car-3',
      linkedCarName: 'Toyota Camry 2024',
      isAssetExpense: true,
      receiptUrl: '/receipts/exp-5.pdf',
    },
    {
      id: 'exp-6',
      date: '2026-01-28',
      category: 'Other',
      customCategory: 'Marketing',
      amount: 500,
      description: 'Social media advertising campaign',
      isAssetExpense: false,
    },
    {
      id: 'exp-7',
      date: '2026-01-25',
      category: 'Insurance',
      amount: 800,
      description: 'Annual comprehensive insurance',
      linkedCarId: 'car-4',
      linkedCarName: 'Honda Accord 2023',
      isAssetExpense: true,
      receiptUrl: '/receipts/exp-7.pdf',
    },
  ];

  const filteredExpenses = mockExpenses.filter((expense) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      expense.category.toLowerCase().includes(searchLower) ||
      expense.description.toLowerCase().includes(searchLower) ||
      expense.linkedCarName?.toLowerCase().includes(searchLower) ||
      expense.customCategory?.toLowerCase().includes(searchLower)
    );
  });

  // Calculate totals
  const totalExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const assetExpenses = mockExpenses.filter(e => e.isAssetExpense).reduce((sum, exp) => sum + exp.amount, 0);
  const nonAssetExpenses = mockExpenses.filter(e => !e.isAssetExpense).reduce((sum, exp) => sum + exp.amount, 0);
  const expenseCount = mockExpenses.length;

  const getCategoryIcon = (category: Expense['category']) => {
    switch (category) {
      case 'Office':
      case 'Grocery':
        return <FileText className="h-4 w-4" />;
      case 'Maintenance':
      case 'Repair':
      case 'Detailing':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Expenses</h1>
            <p className="text-muted-foreground">Track business and vehicle-related expenses</p>
          </div>
          <Button onClick={() => setAddModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-destructive">
                    BHD {totalExpenses.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <FileText className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Count</p>
                  <p className="text-2xl font-bold">{expenseCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Asset Expenses</p>
                  <p className="text-2xl font-bold">BHD {assetExpenses.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <FileText className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Non-Asset</p>
                  <p className="text-2xl font-bold">BHD {nonAssetExpenses.toLocaleString()}</p>
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
              placeholder="Search by category, car, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
        </div>

        {/* Expenses Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Linked To</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                      onClick={() => handleEditExpense(expense)}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(expense.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(expense.category)}
                          <div>
                            <p className="font-medium">
                              {expense.category === 'Other' && expense.customCategory
                                ? expense.customCategory
                                : expense.category}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-xs">
                              {expense.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-destructive">
                          BHD {expense.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {expense.isAssetExpense && expense.linkedCarName ? (
                          <div>
                            <Badge variant="secondary" className="mb-1">
                              Car
                            </Badge>
                            <p className="text-sm font-medium">{expense.linkedCarName}</p>
                          </div>
                        ) : (
                          <Badge variant="outline">None</Badge>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {expense.receiptUrl ? (
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            console.log('View receipt:', expense.receiptUrl);
                          }}>
                            <Receipt className="h-4 w-4 text-primary" />
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredExpenses.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No expenses found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Expense Modal */}
      <AddEditExpenseModal
        isOpen={addModalOpen}
        onClose={handleCloseModal}
        expense={editingExpense}
      />
    </div>
  );
}

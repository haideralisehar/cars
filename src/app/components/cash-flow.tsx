import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { AllocationHistoryModal } from '@/app/components/allocation-history-modal';
import { ReinvestmentTraceModal } from '@/app/components/reinvestment-trace-modal';
import { IncomingTransaction } from '@/types';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  Plus, 
  X,
  Edit,
  Eye,
  ArrowRight,
  History,
  GitBranch,
  Check
} from 'lucide-react';

interface CashFlowProps {
  userRole: 'Admin' | 'Super Admin' | 'User' | 'Operations' | 'Driver' | 'Investor';
}

type AllocationStatus = 'Not Allocated' | 'Partially Allocated' | 'Fully Allocated';
type TransactionSource = 'Sale' | 'Lease' | 'Other';
type UsageType = 'Expense' | 'Car Purchase' | 'Returned to Investor' | 'VAT' | 'Keep as Balance';
type Destination = 'Company Balance' | 'Investor Balance' | 'Customer Payout' | 'VAT';

interface IncomingTransaction {
  id: string;
  date: string;
  amount: number;
  source: TransactionSource;
  reference: string;
  paymentMode: 'Cash' | 'Transfer';
  allocationStatus: AllocationStatus;
}

interface OutgoingTransaction {
  id: string;
  date: string;
  amount: number;
  usageType: string;
  reference: string;
  sourceTransaction: string;
}

interface AllocationRow {
  id: string;
  destination: Destination;
  amount: string;
  usageType: UsageType;
  reference: string;
}

export function CashFlow({ userRole }: CashFlowProps) {
  const [filterType, setFilterType] = useState<'All' | TransactionSource>('All');
  const [allocationPanelOpen, setAllocationPanelOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<IncomingTransaction | null>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [traceModalOpen, setTraceModalOpen] = useState(false);
  const [allocationRows, setAllocationRows] = useState<AllocationRow[]>([
    {
      id: '1',
      destination: 'Company Balance',
      amount: '',
      usageType: 'Keep as Balance',
      reference: '',
    },
  ]);

  // Mock data
  const incomingTransactions: IncomingTransaction[] = [
    {
      id: 'inc-1',
      date: '2026-02-01',
      amount: 25000,
      source: 'Sale',
      reference: 'BMW X5 2024',
      paymentMode: 'Transfer',
      allocationStatus: 'Fully Allocated',
    },
    {
      id: 'inc-2',
      date: '2026-02-02',
      amount: 1500,
      source: 'Lease',
      reference: 'Mercedes C300',
      paymentMode: 'Cash',
      allocationStatus: 'Not Allocated',
    },
    {
      id: 'inc-3',
      date: '2026-02-03',
      amount: 18000,
      source: 'Sale',
      reference: 'Audi A4 2023',
      paymentMode: 'Transfer',
      allocationStatus: 'Partially Allocated',
    },
  ];

  const outgoingTransactions: OutgoingTransaction[] = [
    {
      id: 'out-1',
      date: '2026-02-01',
      amount: 15000,
      usageType: 'Car Purchase',
      reference: 'Toyota Camry 2024',
      sourceTransaction: 'BMW X5 Sale',
    },
    {
      id: 'out-2',
      date: '2026-02-01',
      amount: 2500,
      usageType: 'VAT',
      reference: 'Q1 VAT Payment',
      sourceTransaction: 'BMW X5 Sale',
    },
    {
      id: 'out-3',
      date: '2026-02-02',
      amount: 500,
      usageType: 'Expense',
      reference: 'Car Detailing',
      sourceTransaction: 'Mercedes Lease',
    },
  ];

  const balances = {
    companyBalance: 125000,
    investorBalance: 85000,
    vatPayable: 12500,
    unallocated: 1500,
  };

  const handleOpenAllocationPanel = (transaction: IncomingTransaction) => {
    setSelectedTransaction(transaction);
    setAllocationRows([
      {
        id: '1',
        destination: 'Company Balance',
        amount: '',
        usageType: 'Keep as Balance',
        reference: '',
      },
    ]);
    setAllocationPanelOpen(true);
  };

  const handleAddAllocationRow = () => {
    setAllocationRows([
      ...allocationRows,
      {
        id: Date.now().toString(),
        destination: 'Company Balance',
        amount: '',
        usageType: 'Keep as Balance',
        reference: '',
      },
    ]);
  };

  const handleRemoveAllocationRow = (id: string) => {
    if (allocationRows.length > 1) {
      setAllocationRows(allocationRows.filter((row) => row.id !== id));
    }
  };

  const handleUpdateAllocationRow = (id: string, field: keyof AllocationRow, value: string) => {
    setAllocationRows(
      allocationRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const calculateRemaining = () => {
    if (!selectedTransaction) return 0;
    const allocated = allocationRows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);
    return selectedTransaction.amount - allocated;
  };

  const handleSaveAllocation = () => {
    console.log('Saving allocation:', allocationRows);
    setAllocationPanelOpen(false);
    setSelectedTransaction(null);
  };

  const filteredIncoming = incomingTransactions.filter(
    (t) => filterType === 'All' || t.source === filterType
  );

  const remaining = calculateRemaining();
  const isAllocationValid = remaining === 0 && allocationRows.every((r) => r.usageType && r.amount);

  // Check if user has access
  const hasAccess = userRole === 'Admin' || userRole === 'Super Admin';

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                You don't have permission to access Cash Flow module
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Cash Flow</h1>
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-40 bg-input-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Sale">Sales</SelectItem>
                <SelectItem value="Lease">Lease</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Balance Summary - Horizontal on Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Company Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${balances.companyBalance.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Investor Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${balances.investorBalance.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">VAT Payable</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${balances.vatPayable.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border border-destructive/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unallocated</CardTitle>
              <DollarSign className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                ${balances.unallocated.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Incoming Money Table */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Incoming Money
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Source
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Reference
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Payment Mode
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIncoming.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-border hover:bg-secondary/50">
                          <td className="py-3 px-4 text-sm">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold">
                            ${transaction.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline">{transaction.source}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{transaction.reference}</td>
                          <td className="py-3 px-4 text-sm">{transaction.paymentMode}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge
                              variant={
                                transaction.allocationStatus === 'Fully Allocated'
                                  ? 'default'
                                  : transaction.allocationStatus === 'Partially Allocated'
                                  ? 'secondary'
                                  : 'outline'
                              }
                            >
                              {transaction.allocationStatus}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex gap-2">
                              {transaction.allocationStatus === 'Not Allocated' ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleOpenAllocationPanel(transaction)}
                                >
                                  Allocate
                                </Button>
                              ) : (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleOpenAllocationPanel(transaction)}
                                    title="Edit Allocation"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => {
                                      setSelectedTransaction(transaction);
                                      setHistoryModalOpen(true);
                                    }}
                                    title="View History"
                                  >
                                    <History className="h-4 w-4" />
                                  </Button>
                                  {transaction.source === 'Sale' && (
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => {
                                        setSelectedTransaction(transaction);
                                        setTraceModalOpen(true);
                                      }}
                                      title="View Reinvestment Trace"
                                    >
                                      <GitBranch className="h-4 w-4" />
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Outgoing Money Table */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-destructive" />
                  Utilized / Outgoing Money
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Usage Type
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Reference
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Source Transaction
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {outgoingTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-border hover:bg-secondary/50">
                          <td className="py-3 px-4 text-sm">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold text-destructive">
                            ${transaction.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline">{transaction.usageType}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{transaction.reference}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {transaction.sourceTransaction}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Allocation Side Panel */}
      {allocationPanelOpen && selectedTransaction && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setAllocationPanelOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-2xl bg-card border-l border-border overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Split & Use Money</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose where this money goes and how it is used
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAllocationPanelOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Transaction Summary */}
              <Card className="bg-secondary border-border">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Received</p>
                      <p className="text-2xl font-bold text-primary">
                        ${selectedTransaction.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Source</p>
                      <p className="text-sm font-medium">{selectedTransaction.source}</p>
                      <p className="text-xs text-muted-foreground">{selectedTransaction.reference}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Allocation Rows */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Split Money</h3>
                  <Button size="sm" variant="outline" onClick={handleAddAllocationRow}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Split
                  </Button>
                </div>

                {allocationRows.map((row, index) => (
                  <Card key={row.id} className="bg-secondary border-border">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Split {index + 1}</span>
                        {allocationRows.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveAllocationRow(row.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Destination</Label>
                          <Select
                            value={row.destination}
                            onValueChange={(value) =>
                              handleUpdateAllocationRow(row.id, 'destination', value)
                            }
                          >
                            <SelectTrigger className="bg-input-background">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Company Balance">Company Balance</SelectItem>
                              <SelectItem value="Investor Balance">Investor Balance</SelectItem>
                              <SelectItem value="Customer Payout">Customer Payout</SelectItem>
                              <SelectItem value="VAT">VAT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-xs">Amount</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={row.amount}
                            onChange={(e) =>
                              handleUpdateAllocationRow(row.id, 'amount', e.target.value)
                            }
                            className="bg-input-background"
                          />
                        </div>
                      </div>

                      <div className="border-t border-border pt-3">
                        <Label className="text-xs">Usage Type</Label>
                        <Select
                          value={row.usageType}
                          onValueChange={(value) =>
                            handleUpdateAllocationRow(row.id, 'usageType', value)
                          }
                        >
                          <SelectTrigger className="bg-input-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Keep as Balance">Keep as Balance</SelectItem>
                            <SelectItem value="Expense">Used for Expense</SelectItem>
                            <SelectItem value="Car Purchase">Used to Buy Car</SelectItem>
                            <SelectItem value="Returned to Investor">
                              Returned to Investor
                            </SelectItem>
                            <SelectItem value="VAT">VAT Payment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {row.usageType !== 'Keep as Balance' && (
                        <div>
                          <Label className="text-xs">Reference</Label>
                          <Input
                            placeholder="Select or enter reference"
                            value={row.reference}
                            onChange={(e) =>
                              handleUpdateAllocationRow(row.id, 'reference', e.target.value)
                            }
                            className="bg-input-background"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Remaining Amount Indicator */}
              <Card
                className={`border-2 ${
                  remaining === 0
                    ? 'bg-primary/10 border-primary'
                    : 'bg-destructive/10 border-destructive'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Remaining to Allocate</span>
                    <span
                      className={`text-2xl font-bold ${
                        remaining === 0 ? 'text-primary' : 'text-destructive'
                      }`}
                    >
                      ${remaining.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setAllocationPanelOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSaveAllocation}
                  disabled={!isAllocationValid}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Save Allocation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Allocation History Modal */}
      <AllocationHistoryModal
        isOpen={historyModalOpen}
        onClose={() => {
          setHistoryModalOpen(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
      />

      {/* Reinvestment Trace Modal */}
      <ReinvestmentTraceModal
        isOpen={traceModalOpen}
        onClose={() => {
          setTraceModalOpen(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
      />
    </div>
  );
}
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { IncomingTransaction, Allocation } from '@/types';
import { Clock, User, ArrowRight, X } from 'lucide-react';

interface AllocationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: IncomingTransaction | null;
}

export function AllocationHistoryModal({ isOpen, onClose, transaction }: AllocationHistoryModalProps) {
  if (!transaction) return null;

  // Mock allocation history data
  const allocationHistory: Array<{
    timestamp: string;
    user: string;
    allocations: Array<{
      destination: string;
      amount: number;
      usageType: string;
      reference: string;
    }>;
  }> = [
    {
      timestamp: '2026-02-01 10:30 AM',
      user: 'Admin User',
      allocations: [
        {
          destination: 'Company Balance',
          amount: 15000,
          usageType: 'Used to Buy Car',
          reference: 'Toyota Camry 2024',
        },
        {
          destination: 'VAT',
          amount: 2500,
          usageType: 'VAT Payment',
          reference: 'Q1 VAT Payment',
        },
        {
          destination: 'Company Balance',
          amount: 7500,
          usageType: 'Keep as Balance',
          reference: '-',
        },
      ],
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Allocation History</DialogTitle>
          <DialogDescription>
            View the complete allocation history for this transaction
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Summary */}
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Transaction ID</p>
                  <p className="text-sm font-medium">{transaction.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="text-sm font-bold text-primary">
                    BHD {transaction.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>
                  <Badge variant="outline">{transaction.source}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reference</p>
                  <p className="text-sm font-medium">{transaction.reference}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="space-y-4">
            {allocationHistory.map((entry, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < allocationHistory.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border" />
                )}

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">{entry.user}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
                      </div>
                      {index === 0 && (
                        <Badge variant="default">Current</Badge>
                      )}
                    </div>

                    {/* Allocations */}
                    <div className="ml-15 space-y-3">
                      {entry.allocations.map((allocation, allocIndex) => (
                        <div
                          key={allocIndex}
                          className="p-3 bg-secondary/50 rounded-lg border border-border"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <ArrowRight className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">
                                {allocation.destination}
                              </span>
                            </div>
                            <span className="text-sm font-bold">
                              BHD {allocation.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="ml-6 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Usage:</span>
                              <span className="font-medium">{allocation.usageType}</span>
                            </div>
                            {allocation.reference !== '-' && (
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Reference:</span>
                                <span className="font-medium">{allocation.reference}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

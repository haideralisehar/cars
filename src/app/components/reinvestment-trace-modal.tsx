import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { IncomingTransaction } from '@/types';
import { ArrowRight, DollarSign, ShoppingCart, TrendingUp, Building2 } from 'lucide-react';

interface ReinvestmentTraceModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: IncomingTransaction | null;
}

export function ReinvestmentTraceModal({ isOpen, onClose, transaction }: ReinvestmentTraceModalProps) {
  if (!transaction) return null;

  // Mock reinvestment trace data
  const reinvestmentTrace = {
    originalSale: {
      carName: transaction.reference,
      amount: transaction.amount,
      date: transaction.date,
    },
    allocations: [
      {
        destination: 'Company Balance',
        amount: 15000,
        usage: 'Used to Buy Car',
        linkedCar: {
          id: 'car-new-1',
          name: 'Toyota Camry 2024',
          status: 'Available',
          currentValue: 16500,
        },
      },
      {
        destination: 'VAT',
        amount: 2500,
        usage: 'VAT Payment',
      },
      {
        destination: 'Company Balance',
        amount: 7500,
        usage: 'Keep as Balance',
      },
    ],
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reinvestment Trace</DialogTitle>
          <DialogDescription>
            Track how the money from this sale was utilized
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Sale */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Original Sale</p>
                  <p className="text-xl font-bold">{reinvestmentTrace.originalSale.carName}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(reinvestmentTrace.originalSale.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Sale Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    BHD {reinvestmentTrace.originalSale.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flow Visualization */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            
            <div className="space-y-6 relative">
              {/* Arrow Down */}
              <div className="flex justify-center">
                <div className="bg-background p-2 rounded-full border border-border">
                  <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                </div>
              </div>

              {/* Allocations */}
              {reinvestmentTrace.allocations.map((allocation, index) => (
                <div key={index} className="relative">
                  <Card
                    className={`${
                      allocation.linkedCar
                        ? 'bg-primary/5 border-primary/20'
                        : 'bg-card border-border'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          {allocation.linkedCar ? (
                            <ShoppingCart className="h-6 w-6 text-primary" />
                          ) : allocation.destination === 'VAT' ? (
                            <DollarSign className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <Building2 className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{allocation.destination}</Badge>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{allocation.usage}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold">
                              BHD {allocation.amount.toLocaleString()}
                            </p>
                          </div>

                          {/* Linked Car Details */}
                          {allocation.linkedCar && (
                            <div className="mt-4 p-4 bg-background rounded-lg border border-border">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="text-sm text-muted-foreground">Purchased Car</p>
                                  <p className="font-medium">{allocation.linkedCar.name}</p>
                                </div>
                                <Badge
                                  variant={
                                    allocation.linkedCar.status === 'Available'
                                      ? 'default'
                                      : 'secondary'
                                  }
                                >
                                  {allocation.linkedCar.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                  <p className="text-xs text-muted-foreground">Purchase Cost</p>
                                  <p className="text-sm font-medium">
                                    BHD {allocation.amount.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Current Value</p>
                                  <p className="text-sm font-medium text-primary">
                                    BHD {allocation.linkedCar.currentValue.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t border-border">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">Potential Profit</span>
                                  <span className="text-sm font-bold text-primary">
                                    BHD{' '}
                                    {(
                                      allocation.linkedCar.currentValue - allocation.amount
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Arrow connector */}
                  {index < reinvestmentTrace.allocations.length - 1 && (
                    <div className="flex justify-center my-4">
                      <ArrowRight className="h-5 w-5 text-border rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Reinvestment Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Total Allocated</p>
                  <p className="text-lg font-bold">
                    BHD{' '}
                    {reinvestmentTrace.allocations
                      .reduce((sum, a) => sum + a.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cars Purchased</p>
                  <p className="text-lg font-bold">
                    {reinvestmentTrace.allocations.filter((a) => a.linkedCar).length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Potential Profit</p>
                  <p className="text-lg font-bold text-primary">
                    BHD{' '}
                    {reinvestmentTrace.allocations
                      .filter((a) => a.linkedCar)
                      .reduce((sum, a) => sum + (a.linkedCar!.currentValue - a.amount), 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent } from '@/app/components/ui/card';
import { Expense, ExpenseCategory } from '@/types';
import { Check, Upload, AlertCircle } from 'lucide-react';

interface AddEditExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
}

export function AddEditExpenseModal({ isOpen, onClose, expense }: AddEditExpenseModalProps) {
  const [expenseData, setExpenseData] = useState({
    category: 'Office' as ExpenseCategory,
    customCategory: '',
    amount: '',
    date: '',
    description: '',
    linkedCarId: '',
  });

  useEffect(() => {
    if (expense) {
      setExpenseData({
        category: expense.category,
        customCategory: expense.customCategory || '',
        amount: expense.amount.toString(),
        date: expense.date,
        description: expense.description,
        linkedCarId: expense.linkedCarId || 'none',
      });
    } else {
      setExpenseData({
        category: 'Office',
        customCategory: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        linkedCarId: 'none',
      });
    }
  }, [expense, isOpen]);

  // Mock car list
  const availableCars = [
    { id: 'car-1', name: 'BMW X5 2024' },
    { id: 'car-2', name: 'Mercedes C300 2023' },
    { id: 'car-3', name: 'Toyota Camry 2024' },
    { id: 'car-4', name: 'Honda Accord 2023' },
    { id: 'car-5', name: 'Lexus ES 2024' },
  ];

  const handleSave = () => {
    console.log('Saving expense:', expenseData);
    // Here you would save to localStorage or backend
    onClose();
  };

  const isAssetExpense = expenseData.linkedCarId !== 'none';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
          <DialogDescription>
            {expense ? 'Update expense details' : 'Record a new business or vehicle expense'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-secondary/30 border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-medium text-lg mb-4">Expense Details</h3>

              {/* Category */}
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={expenseData.category}
                  onValueChange={(value: ExpenseCategory) =>
                    setExpenseData({ ...expenseData, category: value })
                  }
                >
                  <SelectTrigger className="bg-input-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Grocery">Grocery</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Repair">Repair</SelectItem>
                    <SelectItem value="Detailing">Detailing</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Registration">Registration</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Category (if Other) */}
              {expenseData.category === 'Other' && (
                <div>
                  <Label htmlFor="custom-category">Custom Category *</Label>
                  <Input
                    id="custom-category"
                    placeholder="Enter category name"
                    value={expenseData.customCategory}
                    onChange={(e) =>
                      setExpenseData({ ...expenseData, customCategory: e.target.value })
                    }
                    className="bg-input-background"
                  />
                </div>
              )}

              {/* Amount and Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount (BHD) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={expenseData.amount}
                    onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={expenseData.date}
                    onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter expense details"
                  value={expenseData.description}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, description: e.target.value })
                  }
                  className="bg-input-background"
                  rows={3}
                />
              </div>

              {/* Receipt Upload */}
              <div>
                <Label htmlFor="receipt">Upload Receipt (Optional)</Label>
                <div className="mt-2">
                  <Input
                    id="receipt"
                    type="file"
                    accept="image/*,.pdf"
                    className="bg-input-background"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload receipt or invoice document (PDF or image)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Link to Car */}
          <Card className="bg-secondary/30 border-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1">Link to Vehicle (Optional)</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Link this expense to a specific car. This will automatically add it to the car's
                    buying cost.
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="linked-car">Select Car</Label>
                <Select
                  value={expenseData.linkedCarId}
                  onValueChange={(value) =>
                    setExpenseData({ ...expenseData, linkedCarId: value === 'none' ? '' : value })
                  }
                >
                  <SelectTrigger className="bg-input-background">
                    <SelectValue placeholder="None - General expense" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None - General expense</SelectItem>
                    {availableCars.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Info Banner */}
              {isAssetExpense ? (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Asset Expense</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This expense will be added to the selected car's buying cost, affecting
                        profit calculations when the car is sold.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Non-Asset Expense</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This is a general business expense not linked to any specific vehicle.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              <Check className="h-4 w-4 mr-2" />
              {expense ? 'Update Expense' : 'Add Expense'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
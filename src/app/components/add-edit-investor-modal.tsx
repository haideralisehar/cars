import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent } from '@/app/components/ui/card';
import { Investor, InvestmentEntry } from '@/types';
import { Plus, X, Check, Upload } from 'lucide-react';

interface AddEditInvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  investor: Investor | null;
}

export function AddEditInvestorModal({ isOpen, onClose, investor }: AddEditInvestorModalProps) {
  const [investorData, setInvestorData] = useState({
    name: investor?.name || '',
    contactNumber: investor?.contactNumber || '',
    cprNumber: investor?.cprNumber || '',
    notes: '',
  });

  const [investments, setInvestments] = useState<Array<{ amount: string; date: string; method: string; remarks: string }>>(
    investor?.investments.map(inv => ({ 
      amount: inv.amount.toString(), 
      date: inv.date,
      method: 'Bank Transfer',
      remarks: ''
    })) || 
    [{ amount: '', date: '', method: 'Bank Transfer', remarks: '' }]
  );

  const handleAddInvestment = () => {
    setInvestments([...investments, { amount: '', date: '', method: 'Bank Transfer', remarks: '' }]);
  };

  const handleInvestmentChange = (index: number, field: 'amount' | 'date' | 'method' | 'remarks', value: string) => {
    const updated = [...investments];
    updated[index][field] = value;
    setInvestments(updated);
  };

  const handleSave = () => {
    console.log('Saving investor:', { investorData, investments });
    // Here you would save to localStorage or backend
    onClose();
  };

  const totalInvestment = investments.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{investor ? 'Edit Investor' : 'Add New Investor'}</DialogTitle>
          <DialogDescription>
            {investor ? 'Update investor information and investment entries' : 'Enter investor details and initial investment'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-secondary/30 border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-medium text-lg mb-4">Investor Information</h3>

              <div>
                <Label htmlFor="investor-name">Investor Name *</Label>
                <Input
                  id="investor-name"
                  placeholder="Enter full name"
                  value={investorData.name}
                  onChange={(e) => setInvestorData({ ...investorData, name: e.target.value })}
                  className="bg-input-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-number">Contact Number *</Label>
                  <Input
                    id="contact-number"
                    placeholder="+973 XXXX XXXX"
                    value={investorData.contactNumber}
                    onChange={(e) => setInvestorData({ ...investorData, contactNumber: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
                <div>
                  <Label htmlFor="cpr-number">CPR Number *</Label>
                  <Input
                    id="cpr-number"
                    placeholder="Enter CPR number"
                    value={investorData.cprNumber}
                    onChange={(e) => setInvestorData({ ...investorData, cprNumber: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  placeholder="Additional information"
                  value={investorData.notes}
                  onChange={(e) => setInvestorData({ ...investorData, notes: e.target.value })}
                  className="bg-input-background"
                />
              </div>

              <div>
                <Label htmlFor="cpr-upload">Upload CPR Document</Label>
                <div className="mt-2">
                  <Input
                    id="cpr-upload"
                    type="file"
                    accept="image/*,.pdf"
                    className="bg-input-background"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload a copy of the investor's CPR (ID card)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Entries */}
          <Card className="bg-secondary/30 border-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Investment Entries</h3>
                <Button size="sm" variant="outline" onClick={handleAddInvestment}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              </div>

              <div className="space-y-3">
                {investments.map((investment, index) => (
                  <div
                    key={index}
                    className="space-y-3 p-4 bg-background rounded-lg border border-border"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Investment #{index + 1}</h4>
                      {investments.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setInvestments(investments.filter((_, i) => i !== index))}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`amount-${index}`} className="text-xs">
                          Amount (BHD) *
                        </Label>
                        <Input
                          id={`amount-${index}`}
                          type="number"
                          placeholder="0.000"
                          value={investment.amount}
                          onChange={(e) => handleInvestmentChange(index, 'amount', e.target.value)}
                          className="bg-input-background"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`date-${index}`} className="text-xs">
                          Date *
                        </Label>
                        <Input
                          id={`date-${index}`}
                          type="date"
                          value={investment.date}
                          onChange={(e) => handleInvestmentChange(index, 'date', e.target.value)}
                          className="bg-input-background"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`method-${index}`} className="text-xs">
                          Payment Method
                        </Label>
                        <Input
                          id={`method-${index}`}
                          placeholder="e.g. Bank Transfer"
                          value={investment.method}
                          onChange={(e) => handleInvestmentChange(index, 'method', e.target.value)}
                          className="bg-input-background"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`remarks-${index}`} className="text-xs">
                          Remarks
                        </Label>
                        <Input
                          id={`remarks-${index}`}
                          placeholder="Reference number etc."
                          value={investment.remarks}
                          onChange={(e) => handleInvestmentChange(index, 'remarks', e.target.value)}
                          className="bg-input-background"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Investment Summary */}
              <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Investment</span>
                  <span className="text-xl font-bold text-primary">
                    BHD {totalInvestment.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              <Check className="h-4 w-4 mr-2" />
              {investor ? 'Update Investor' : 'Add Investor'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

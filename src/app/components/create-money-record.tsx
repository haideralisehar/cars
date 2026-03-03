import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/app/components/ui/select';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  DollarSign, 
  Info,
  Calendar,
  Link as LinkIcon
} from 'lucide-react';
import { MoneyRecordCategory } from '@/types/money-record';
import { mockCars } from '@/data/mockData';
import { Sale } from '@/types';

interface CreateMoneyRecordProps {
  onBack: () => void;
  onSave?: (record: any) => void;
  userRole: string;
  initialTab?: string;
}

// Mock investors (matches AuthenticatedApp data)
const mockInvestors = [
  {
    id: 'inv-1',
    name: 'Ahmed Al-Hassan',
    contactNumber: '+973 3333 4444',
    cprNumber: '920101234',
  },
  {
    id: 'inv-2',
    name: 'Sara Mohammed',
    contactNumber: '+973 3344 5566',
    cprNumber: '930202345',
  },
];

// Mock sales data (clients)
const mockSales: Sale[] = [
  {
    id: 'sale-1',
    date: '2026-02-01',
    carId: '1',
    carName: 'BMW X5 2024',
    carSource: 'Company',
    soldPrice: 52000,
    paymentType: 'Full',
    status: 'Completed',
    purchaserName: 'Mohammed Ali',
    purchaserCpr: '920304567',
  },
  {
    id: 'sale-2',
    date: '2026-01-28',
    carId: '3',
    carName: 'Audi A6 2023',
    carSource: 'Customer',
    soldPrice: 48000,
    paymentType: 'Installment',
    status: 'Installment Active',
    purchaserName: 'Fatima Hassan',
    purchaserCpr: '930405678',
  },
  {
    id: 'sale-3',
    date: '2026-01-25',
    carId: '5',
    carName: 'Lexus ES 2023',
    carSource: 'Investor',
    soldPrice: 42000,
    paymentType: 'Full',
    status: 'Completed',
    purchaserName: 'Ali Khalifa',
    purchaserCpr: '940506789',
  },
];

export function CreateMoneyRecord({ onBack, onSave = () => {}, userRole, initialTab = 'all' }: CreateMoneyRecordProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Expense' as MoneyRecordCategory,
    otherCategory: '',
    description: '',
    linkedToType: 'None' as 'None' | 'Car' | 'Client' | 'Investor',
    linkedToId: '',
    
    // Payable
    isPayable: initialTab === 'expenses' || initialTab === 'payables',
    payableTo: '',
    payableAmount: '',
    payableDate: new Date().toISOString().split('T')[0],
    
    // Receivable
    isReceivable: initialTab === 'receivables',
    receivableFrom: '',
    receivableAmount: '',
    receivableDueDate: '',
  });

  useEffect(() => {
    if (initialTab === 'expenses' || initialTab === 'payables') {
      setFormData(prev => ({ ...prev, isPayable: true, category: initialTab === 'expenses' ? 'Expense' : prev.category }));
    } else if (initialTab === 'receivables') {
      setFormData(prev => ({ ...prev, isReceivable: true, isPayable: false }));
    }
  }, [initialTab]);

  const categories: MoneyRecordCategory[] = [
    'Expense', 'Service', 'Parts', 'Insurance', 'Registration', 'Fuel', 'Commission', 'Other'
  ];

  const isAdmin = userRole === 'Admin' || userRole === 'Super Admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Create Money Record</h1>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-70">Single entry for all financial flows</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Details */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-black uppercase tracking-widest">Entry Basics</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase">Define the core of this transaction</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Title (Required)</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Engine Repair - VIN 123" 
                  className="bg-secondary/50 border-border h-11 text-sm font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(val: MoneyRecordCategory) => setFormData({...formData, category: val})}
                >
                  <SelectTrigger className="bg-secondary/50 border-border h-11 text-sm font-medium">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat} className="text-sm font-medium">{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.category === 'Other' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <Label htmlFor="otherCategory" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Specify Category</Label>
                <Input 
                  id="otherCategory" 
                  placeholder="Enter category name" 
                  className="bg-secondary/50 border-border h-11 text-sm font-medium"
                  value={formData.otherCategory}
                  onChange={(e) => setFormData({...formData, otherCategory: e.target.value})}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Additional details about this record..." 
                className="bg-secondary/50 border-border min-h-[100px] text-sm font-medium resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Link Record To (Mandatory Linking Logic)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(['None', 'Car', 'Client', 'Investor'] as const).map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={formData.linkedToType === type ? 'default' : 'outline'}
                    className={`text-[10px] font-black uppercase h-9 shadow-sm ${
                      formData.linkedToType === type 
                        ? 'bg-primary text-white border-primary shadow-primary/20' 
                        : 'border-border bg-secondary/30 hover:bg-secondary'
                    }`}
                    onClick={() => setFormData({...formData, linkedToType: type, linkedToId: ''})}
                  >
                    <LinkIcon className="h-3 w-3 mr-1.5" />
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {formData.linkedToType !== 'None' && (
              <div className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <Label htmlFor="linkedToId" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Select {formData.linkedToType}
                </Label>
                
                {formData.linkedToType === 'Car' && (
                  <Select 
                    value={formData.linkedToId} 
                    onValueChange={(val) => setFormData({...formData, linkedToId: val})}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border h-11 text-sm font-medium">
                      <SelectValue placeholder="Select a car from inventory..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border max-h-[300px]">
                      {mockCars.map(car => (
                        <SelectItem key={car.id} value={car.id} className="text-sm font-medium py-3">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold">{car.make} {car.model} {car.year}</span>
                            <span className="text-xs text-muted-foreground">VIN: {car.vin} • {car.registrationNumber}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {formData.linkedToType === 'Client' && (
                  <Select 
                    value={formData.linkedToId} 
                    onValueChange={(val) => setFormData({...formData, linkedToId: val})}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border h-11 text-sm font-medium">
                      <SelectValue placeholder="Select a client..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border max-h-[300px]">
                      {mockSales.map(sale => (
                        <SelectItem key={sale.id} value={sale.purchaserCpr} className="text-sm font-medium py-3">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold">{sale.purchaserName}</span>
                            <span className="text-xs text-muted-foreground">CPR: {sale.purchaserCpr} • {sale.carName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {formData.linkedToType === 'Investor' && (
                  <Select 
                    value={formData.linkedToId} 
                    onValueChange={(val) => setFormData({...formData, linkedToId: val})}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border h-11 text-sm font-medium">
                      <SelectValue placeholder="Select an investor..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border max-h-[300px]">
                      {mockInvestors.map(investor => (
                        <SelectItem key={investor.id} value={investor.id} className="text-sm font-medium py-3">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold">{investor.name}</span>
                            <span className="text-xs text-muted-foreground">CPR: {investor.cprNumber} • {investor.contactNumber}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 2: Payable */}
          <Card className={`bg-card border-border transition-all duration-300 ${
            formData.isPayable 
              ? 'ring-1 ring-destructive/50 shadow-xl shadow-destructive/5' 
              : 'opacity-50 grayscale-[0.5]'
          }`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.isPayable ? 'bg-destructive/10' : 'bg-secondary'}`}>
                    <DollarSign className={`h-4 w-4 ${formData.isPayable ? 'text-destructive' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xs font-black uppercase tracking-widest">Payable</CardTitle>
                    <CardDescription className="text-[9px] font-bold uppercase">Money leaving the business</CardDescription>
                  </div>
                </div>
                <Switch 
                  checked={formData.isPayable} 
                  onCheckedChange={(val) => setFormData({...formData, isPayable: val})}
                  className="data-[state=checked]:bg-destructive"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Payable To</Label>
                <Input 
                  placeholder="e.g., Garage Name, Supplier" 
                  className="bg-secondary/50 border-border h-10 text-sm"
                  disabled={!formData.isPayable}
                  value={formData.payableTo}
                  onChange={(e) => setFormData({...formData, payableTo: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount (BHD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-muted-foreground">BHD</span>
                  <Input 
                    type="number"
                    placeholder="0.00" 
                    className="pl-12 bg-secondary/50 border-border h-10 text-sm font-black"
                    disabled={!formData.isPayable}
                    value={formData.payableAmount}
                    onChange={(e) => setFormData({...formData, payableAmount: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Payable Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="date"
                    className="pl-10 bg-secondary/50 border-border h-10 text-sm"
                    disabled={!formData.isPayable}
                    value={formData.payableDate}
                    onChange={(e) => setFormData({...formData, payableDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="pt-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Receipt Document</Label>
                <div className={`border-2 border-dashed rounded-lg p-5 text-center transition-all ${
                  formData.isPayable 
                    ? 'border-border hover:border-destructive/50 cursor-pointer bg-secondary/10' 
                    : 'border-border/50 cursor-not-allowed bg-transparent'
                }`}>
                  <Upload className={`h-5 w-5 mx-auto mb-2 ${formData.isPayable ? 'text-destructive' : 'text-muted-foreground'}`} />
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Drop Image or PDF</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Receivable */}
          <Card className={`bg-card border-border transition-all duration-300 ${
            formData.isReceivable 
              ? 'ring-1 ring-primary/50 shadow-xl shadow-primary/5' 
              : 'opacity-50 grayscale-[0.5]'
          }`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.isReceivable ? 'bg-primary/10' : 'bg-secondary'}`}>
                    <DollarSign className={`h-4 w-4 ${formData.isReceivable ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xs font-black uppercase tracking-widest">Receivable</CardTitle>
                    <CardDescription className="text-[9px] font-bold uppercase">Money entering the business</CardDescription>
                  </div>
                </div>
                <Switch 
                  checked={formData.isReceivable} 
                  onCheckedChange={(val) => setFormData({...formData, isReceivable: val})}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Receivable From</Label>
                <Input 
                  placeholder="e.g., Client Name, Investor" 
                  className="bg-secondary/50 border-border h-10 text-sm"
                  disabled={!formData.isReceivable}
                  value={formData.receivableFrom}
                  onChange={(e) => setFormData({...formData, receivableFrom: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount (BHD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-muted-foreground">BHD</span>
                  <Input 
                    type="number"
                    placeholder="0.00" 
                    className="pl-12 bg-secondary/50 border-border h-10 text-sm font-black"
                    disabled={!formData.isReceivable}
                    value={formData.receivableAmount}
                    onChange={(e) => setFormData({...formData, receivableAmount: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Due Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="date"
                    className="pl-10 bg-secondary/50 border-border h-10 text-sm"
                    disabled={!formData.isReceivable}
                    value={formData.receivableDueDate}
                    onChange={(e) => setFormData({...formData, receivableDueDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Info className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] text-primary font-black uppercase tracking-widest leading-tight">Smart Entry System</p>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 leading-normal">
                      Toggle both Payable and Receivable for complex transactions like Towing where you pay a vendor and charge a client.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
          <Button type="button" variant="ghost" onClick={onBack} className="text-xs font-bold uppercase tracking-widest px-6">Discard</Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-white min-w-[180px] h-11 font-black uppercase tracking-widest shadow-xl shadow-primary/20">
            <Save className="h-4 w-4 mr-2" />
            Create Record
          </Button>
        </div>
      </form>
    </div>
  );
}

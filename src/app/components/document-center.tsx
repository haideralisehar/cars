import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Eye, 
  Upload,
  Printer
} from 'lucide-react';
import { toast } from 'sonner';

interface LineItem {
  id: string;
  description: string;
  amount: number;
}

export function DocumentCenter() {
  const [docType, setDocType] = useState('invoice');
  const [recipient, setRecipient] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', amount: 0 }
  ]);
  const [vatEnabled, setVatEnabled] = useState(true);
  const [vatPercentage, setVatPercentage] = useState(15);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: '', amount: 0 }
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const subtotal = lineItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const vatAmount = vatEnabled ? subtotal * (vatPercentage / 100) : 0;
  const total = subtotal + vatAmount;

  const handleDownload = () => {
    toast.success('Document downloaded successfully');
  };

  const handleUpload = () => {
    toast.info('Opening file uploader...');
  };

  const handlePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Document Center</h1>
            <p className="text-muted-foreground mt-1">Create and manage professional documents</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewOpen ? 'Edit Document' : 'Preview'}
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {!isPreviewOpen ? (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Create New Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-type">Document Type</Label>
                  <Select value={docType} onValueChange={setDocType}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary border-border">
                      <SelectItem value="invoice">Invoice</SelectItem>
                      <SelectItem value="quotation">Quotation</SelectItem>
                      <SelectItem value="custom">Custom Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Name</Label>
                  <Input
                    id="recipient"
                    placeholder="Enter recipient name"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Line Items</Label>
                  <Button variant="outline" size="sm" onClick={addLineItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
                
                {lineItems.map((item, index) => (
                  <div key={item.id} className="flex gap-4 items-end animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs text-muted-foreground">Description</Label>
                      <Input
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label className="text-xs text-muted-foreground">Amount (BHD)</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={item.amount || ''}
                        onChange={(e) => updateLineItem(item.id, 'amount', parseFloat(e.target.value))}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive mb-[2px]"
                      onClick={() => removeLineItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="vat-toggle"
                        checked={vatEnabled}
                        onCheckedChange={setVatEnabled}
                      />
                      <Label htmlFor="vat-toggle">Apply VAT</Label>
                    </div>
                    {vatEnabled && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={vatPercentage}
                          onChange={(e) => setVatPercentage(parseFloat(e.target.value) || 0)}
                          className="w-20 bg-secondary border-border"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm text-muted-foreground">Subtotal: {subtotal.toLocaleString()} BHD</div>
                    {vatEnabled && (
                      <div className="text-sm text-muted-foreground">VAT ({vatPercentage}%): {vatAmount.toLocaleString()} BHD</div>
                    )}
                    <div className="text-xl font-bold text-primary">Total: {total.toLocaleString()} BHD</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border pt-6 mt-6">
              <div className="text-xs text-muted-foreground italic">
                Note: This document will be generated with standard Auto Lounge branding.
              </div>
            </CardFooter>
          </Card>
        ) : (
          <div className="bg-white text-black p-12 rounded-lg shadow-2xl min-h-[842px] relative overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Document Header */}
            <div className="flex justify-between border-b-2 border-primary pb-8 mb-8">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-2 uppercase italic">Auto Lounge</h2>
                <p className="text-sm font-medium">Premium Car Dealership</p>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold uppercase">{docType}</h3>
                <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">No: {docType.substring(0, 3).toUpperCase()}-{Math.floor(Math.random() * 10000)}</p>
              </div>
            </div>

            {/* Recipient */}
            <div className="mb-12">
              <p className="text-xs font-bold uppercase text-gray-400 mb-2">To:</p>
              <p className="text-xl font-bold">{recipient || 'Valued Customer'}</p>
              <p className="text-sm text-gray-500">Kingdom of Bahrain</p>
            </div>

            {/* Table */}
            <div className="mb-12">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="py-4 font-bold uppercase text-sm">Description</th>
                    <th className="py-4 font-bold uppercase text-sm text-right">Amount (BHD)</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-4 text-sm">{item.description || 'No description provided'}</td>
                      <td className="py-4 text-sm text-right">{(Number(item.amount) || 0).toLocaleString(undefined, { minimumFractionDigits: 3 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-24">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{subtotal.toLocaleString(undefined, { minimumFractionDigits: 3 })} BHD</span>
                </div>
                {vatEnabled && (
                  <div className="flex justify-between text-sm">
                    <span>VAT ({vatPercentage}%):</span>
                    <span>{vatAmount.toLocaleString(undefined, { minimumFractionDigits: 3 })} BHD</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-black pt-2">
                  <span>Total:</span>
                  <span>{total.toLocaleString(undefined, { minimumFractionDigits: 3 })} BHD</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-12 left-12 right-12 border-t pt-8">
              <div className="grid grid-cols-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                <div>
                  <p>Auto Lounge W.L.L</p>
                  <p>CR: 176932-1</p>
                </div>
                <div className="text-center">
                  <p>Kingdom of Bahrain</p>
                  <p>Contact: 39150003</p>
                </div>
                <div className="text-right">
                  <p>Authorized Signature</p>
                  <div className="mt-4 border-b border-gray-200 w-32 ml-auto"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/app/components/ui/card';
// import { Button } from '@/app/components/ui/button';
// import { Input } from '@/app/components/ui/input';
// import { Label } from '@/app/components/ui/label';
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/app/components/ui/select';
// import { Switch } from '@/app/components/ui/switch';
// import { 
//   FileText, 
//   Plus, 
//   Trash2, 
//   Download, 
//   Eye, 
//   Upload,
//   Printer
// } from 'lucide-react';
// import { toast } from 'sonner';

// interface DocumentCenterProps {
//   userRole: 'Admin' | 'Super Admin' | 'User' | 'Operations' | 'Driver' | 'Investor';
// }

// interface LineItem {
//   id: string;
//   description: string;
//   amount: number;
// }

// export function DocumentCenter({ userRole }: DocumentCenterProps) {
//   const [docType, setDocType] = useState('invoice');
//   const [recipient, setRecipient] = useState('');
//   const [lineItems, setLineItems] = useState<LineItem[]>([
//     { id: '1', description: '', amount: 0 }
//   ]);
//   const [vatEnabled, setVatEnabled] = useState(true);
//   const [vatPercentage, setVatPercentage] = useState(15);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   const addLineItem = () => {
//     setLineItems([
//       ...lineItems,
//       { id: Date.now().toString(), description: '', amount: 0 }
//     ]);
//   };

//   const removeLineItem = (id: string) => {
//     if (lineItems.length > 1) {
//       setLineItems(lineItems.filter(item => item.id !== id));
//     }
//   };

//   const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
//     setLineItems(lineItems.map(item => 
//       item.id === id ? { ...item, [field]: value } : item
//     ));
//   };

//   const subtotal = lineItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
//   const vatAmount = vatEnabled ? subtotal * (vatPercentage / 100) : 0;
//   const total = subtotal + vatAmount;

//   const handleDownload = () => {
//     toast.success('Document downloaded successfully');
//   };

//   const handleUpload = () => {
//     toast.info('Opening file uploader...');
//   };

//   const handlePreview = () => {
//     setIsPreviewOpen(!isPreviewOpen);
//   };

//   return (
//     <div className="p-6 bg-background min-h-screen">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Document Center</h1>
//             <p className="text-muted-foreground mt-1">Create and manage professional documents</p>
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" onClick={handlePreview}>
//               <Eye className="h-4 w-4 mr-2" />
//               {isPreviewOpen ? 'Edit Document' : 'Preview'}
//             </Button>
//             <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleDownload}>
//               <Download className="h-4 w-4 mr-2" />
//               Download PDF
//             </Button>
//           </div>
//         </div>

//         {!isPreviewOpen ? (
//           <Card className="bg-card border-border">
//             <CardHeader>
//               <CardTitle>Create New Document</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="doc-type">Document Type</Label>
//                   <Select value={docType} onValueChange={setDocType}>
//                     <SelectTrigger className="bg-secondary border-border">
//                       <SelectValue placeholder="Select type" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-secondary border-border">
//                       <SelectItem value="invoice">Invoice</SelectItem>
//                       <SelectItem value="quotation">Quotation</SelectItem>
//                       <SelectItem value="custom">Custom Document</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="recipient">Recipient Name</Label>
//                   <Input
//                     id="recipient"
//                     placeholder="Enter recipient name"
//                     value={recipient}
//                     onChange={(e) => setRecipient(e.target.value)}
//                     className="bg-secondary border-border"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <Label className="text-lg font-semibold">Line Items</Label>
//                   <Button variant="outline" size="sm" onClick={addLineItem}>
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Item
//                   </Button>
//                 </div>
                
//                 {lineItems.map((item, index) => (
//                   <div key={item.id} className="flex gap-4 items-end animate-in fade-in slide-in-from-top-2 duration-300">
//                     <div className="flex-1 space-y-2">
//                       <Label className="text-xs text-muted-foreground">Description</Label>
//                       <Input
//                         placeholder="Item description"
//                         value={item.description}
//                         onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
//                         className="bg-secondary border-border"
//                       />
//                     </div>
//                     <div className="w-32 space-y-2">
//                       <Label className="text-xs text-muted-foreground">Amount (BHD)</Label>
//                       <Input
//                         type="number"
//                         placeholder="0.00"
//                         value={item.amount || ''}
//                         onChange={(e) => updateLineItem(item.id, 'amount', parseFloat(e.target.value))}
//                         className="bg-secondary border-border"
//                       />
//                     </div>
//                     <Button 
//                       variant="ghost" 
//                       size="icon" 
//                       className="text-destructive mb-[2px]"
//                       onClick={() => removeLineItem(item.id)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>

//               <div className="pt-6 border-t border-border space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                       <Switch
//                         id="vat-toggle"
//                         checked={vatEnabled}
//                         onCheckedChange={setVatEnabled}
//                       />
//                       <Label htmlFor="vat-toggle">Apply VAT</Label>
//                     </div>
//                     {vatEnabled && (
//                       <div className="flex items-center gap-2">
//                         <Input
//                           type="number"
//                           min="0"
//                           max="100"
//                           step="0.1"
//                           value={vatPercentage}
//                           onChange={(e) => setVatPercentage(parseFloat(e.target.value) || 0)}
//                           className="w-20 bg-secondary border-border"
//                         />
//                         <span className="text-sm text-muted-foreground">%</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="text-right space-y-1">
//                     <div className="text-sm text-muted-foreground">Subtotal: {subtotal.toLocaleString()} BHD</div>
//                     {vatEnabled && (
//                       <div className="text-sm text-muted-foreground">VAT ({vatPercentage}%): {vatAmount.toLocaleString()} BHD</div>
//                     )}
//                     <div className="text-xl font-bold text-primary">Total: {total.toLocaleString()} BHD</div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-end border-t border-border pt-6 mt-6">
//               <div className="text-xs text-muted-foreground italic">
//                 Note: This document will be generated with standard Auto Lounge branding.
//               </div>
//             </CardFooter>
//           </Card>
//         ) : (
//           <div className="bg-white text-black p-12 rounded-lg shadow-2xl min-h-[842px] relative overflow-hidden animate-in zoom-in-95 duration-300">
//             {/* Document Header */}
//             <div className="flex justify-between border-b-2 border-primary pb-8 mb-8">
//               <div>
//                 <h2 className="text-4xl font-bold text-primary mb-2 uppercase italic">Auto Lounge</h2>
//                 <p className="text-sm font-medium">Premium Car Dealership</p>
//               </div>
//               <div className="text-right">
//                 <h3 className="text-2xl font-bold uppercase">{docType}</h3>
//                 <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
//                 <p className="text-sm text-gray-500">No: {docType.substring(0, 3).toUpperCase()}-{Math.floor(Math.random() * 10000)}</p>
//               </div>
//             </div>

//             {/* Recipient */}
//             <div className="mb-12">
//               <p className="text-xs font-bold uppercase text-gray-400 mb-2">To:</p>
//               <p className="text-xl font-bold">{recipient || 'Valued Customer'}</p>
//               <p className="text-sm text-gray-500">Kingdom of Bahrain</p>
//             </div>

//             {/* Table */}
//             <div className="mb-12">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="border-b-2 border-black">
//                     <th className="py-4 font-bold uppercase text-sm">Description</th>
//                     <th className="py-4 font-bold uppercase text-sm text-right">Amount (BHD)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {lineItems.map((item) => (
//                     <tr key={item.id} className="border-b border-gray-100">
//                       <td className="py-4 text-sm">{item.description || 'No description provided'}</td>
//                       <td className="py-4 text-sm text-right">{(Number(item.amount) || 0).toLocaleString(undefined, { minimumFractionDigits: 3 })}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Totals */}
//             <div className="flex justify-end mb-24">
//               <div className="w-64 space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span>Subtotal:</span>
//                   <span>{subtotal.toLocaleString(undefined, { minimumFractionDigits: 3 })} BHD</span>
//                 </div>
//                 {vatEnabled && (
//                   <div className="flex justify-between text-sm">
//                     <span>VAT ({vatPercentage}%):</span>
//                     <span>{vatAmount.toLocaleString(undefined, { minimumFractionDigits: 3 })} BHD</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between text-lg font-bold border-t border-black pt-2">
//                   <span>Total:</span>
//                   <span>{total.toLocaleString(undefined, { minimumFractionDigits: 3 })} BHD</span>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="absolute bottom-12 left-12 right-12 border-t pt-8">
//               <div className="grid grid-cols-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
//                 <div>
//                   <p>Auto Lounge W.L.L</p>
//                   <p>CR: 176932-1</p>
//                 </div>
//                 <div className="text-center">
//                   <p>Kingdom of Bahrain</p>
//                   <p>Contact: 39150003</p>
//                 </div>
//                 <div className="text-right">
//                   <p>Authorized Signature</p>
//                   <div className="mt-4 border-b border-gray-200 w-32 ml-auto"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useMemo } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
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
  Plus, 
  Trash2, 
  Download, 
  Eye 
} from 'lucide-react';
import { toast } from 'sonner';

interface DocumentCenterProps {
  userRole: 'Admin' | 'Super Admin' | 'User' | 'Operations' | 'Driver' | 'Investor';
}

interface LineItem {
  id: string;
  description: string;
  amount: number;
}

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#f37318',
    paddingBottom: 20,
    marginBottom: 30,
  },
  companySection: {
    flex: 1,
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f37318',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  companySubtitle: {
    fontSize: 10,
    color: '#666666',
  },
  docInfoSection: {
    alignItems: 'flex-end',
  },
  docType: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  docInfoText: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  recipientSection: {
    marginBottom: 30,
  },
  recipientLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#999999',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  recipientName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  recipientAddress: {
    fontSize: 10,
    color: '#666666',
  },
  table: {
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderDesc: {
    flex: 2,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableHeaderAmount: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    borderBottomStyle: 'dashed',
    paddingVertical: 8,
  },
  tableRowDesc: {
    flex: 2,
    fontSize: 10,
  },
  tableRowAmount: {
    flex: 1,
    fontSize: 10,
    textAlign: 'right',
  },
  totalsSection: {
    alignItems: 'flex-end',
    marginBottom: 80,
  },
  totalsBox: {
    width: 200,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 10,
  },
  totalValue: {
    fontSize: 10,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 5,
    marginTop: 5,
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  grandTotalValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerSection: {
    flex: 1,
  },
  footerText: {
    fontSize: 8,
    color: '#999999',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    width: 80,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});

// PDF Document Component
const InvoicePDF = ({ docType, recipient, lineItems, vatEnabled, vatPercentage, subtotal, vatAmount, total }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companySection}>
          <Text style={styles.companyName}>Auto Lounge</Text>
          <Text style={styles.companySubtitle}>Premium Car Dealership</Text>
        </View>
        <View style={styles.docInfoSection}>
          <Text style={styles.docType}>{docType}</Text>
          <Text style={styles.docInfoText}>Date: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.docInfoText}>No: {docType.substring(0, 3).toUpperCase()}-{Math.floor(Math.random() * 10000)}</Text>
        </View>
      </View>

      {/* Recipient */}
      <View style={styles.recipientSection}>
        <Text style={styles.recipientLabel}>To:</Text>
        <Text style={styles.recipientName}>{recipient || 'Valued Customer'}</Text>
        <Text style={styles.recipientAddress}>Kingdom of Bahrain</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderDesc}>Description</Text>
          <Text style={styles.tableHeaderAmount}>Amount (BHD)</Text>
        </View>
        {lineItems.map((item: any) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.tableRowDesc}>{item.description || 'No description provided'}</Text>
            <Text style={styles.tableRowAmount}>
              {(Number(item.amount) || 0).toLocaleString(undefined, { minimumFractionDigits: 3 })}
            </Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totalsSection}>
        <View style={styles.totalsBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{subtotal.toLocaleString(undefined, { minimumFractionDigits: 3 })} BHD</Text>
          </View>
          {vatEnabled && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>VAT ({vatPercentage}%):</Text>
              <Text style={styles.totalValue}>{vatAmount.toLocaleString(undefined, { minimumFractionDigits: 3 })} BHD</Text>
            </View>
          )}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total:</Text>
            <Text style={styles.grandTotalValue}>{total.toLocaleString(undefined, { minimumFractionDigits: 3 })} BHD</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>Auto Lounge W.L.L</Text>
          <Text style={styles.footerText}>CR: 176932-1</Text>
        </View>
        <View style={[styles.footerSection, { textAlign: 'center' }]}>
          <Text style={styles.footerText}>Kingdom of Bahrain</Text>
          <Text style={styles.footerText}>Contact: 39150003</Text>
        </View>
        <View style={[styles.footerSection, { alignItems: 'flex-end' }]}>
          <Text style={styles.footerText}>Authorized Signature</Text>
          <View style={styles.signatureLine} />
        </View>
      </View>
    </Page>
  </Document>
);

export function DocumentCenter({ userRole }: DocumentCenterProps) {
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

  // Validation function
  const isFormValid = useMemo(() => {
    // Check if recipient name is not empty
    if (!recipient.trim()) {
      return false;
    }
    
    // Check if at least one line item has description and amount > 0
    const hasValidLineItem = lineItems.some(item => 
      item.description.trim() !== '' && Number(item.amount) > 0
    );
    
    if (!hasValidLineItem) {
      return false;
    }
    
    return true;
  }, [recipient, lineItems]);

  const handlePreview = () => {
    if (!isFormValid) {
      toast.error('Please fill in all required fields before previewing');
      return;
    }
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Center</h1>
            <p className="text-gray-600 mt-1">Create and manage professional documents</p>
          </div>
          <div className="flex gap-2">
            <Button 
              style={{backgroundColor:"white", color:"black"}} 
              variant="outline" 
              onClick={handlePreview}
              disabled={!isFormValid}
              title={!isFormValid ? "Please fill in recipient name and at least one line item with description and amount" : ""}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewOpen ? 'Edit Document' : 'Preview'}
            </Button>
            {isPreviewOpen && (
              <PDFDownloadLink
                document={
                  <InvoicePDF
                    docType={docType}
                    recipient={recipient}
                    lineItems={lineItems}
                    vatEnabled={vatEnabled}
                    vatPercentage={vatPercentage}
                    subtotal={subtotal}
                    vatAmount={vatAmount}
                    total={total}
                  />
                }
                fileName={`${docType}_${new Date().toISOString().split('T')[0]}.pdf`}
              >
                {({ loading, error }) => (
                  <Button 
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    disabled={loading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {loading ? 'Generating...' : 'Download PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
            )}
          </div>
        </div>

        {/* Form Section */}
        {!isPreviewOpen && (
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-xl font-semibold text-gray-900">Create New Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-type" className="text-gray-700">Document Type</Label>
                  <Select value={docType} onValueChange={setDocType}>
                    <SelectTrigger style={{backgroundColor:"white", color:"black"}} className="bg-white border border-gray-300">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invoice">Invoice</SelectItem>
                      <SelectItem value="quotation">Quotation</SelectItem>
                      <SelectItem value="custom">Custom Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-gray-700">
                    Recipient Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    style={{backgroundColor:"white", color:"black"}}
                    id="recipient"
                    placeholder="Enter recipient name"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className={`bg-white border ${!recipient.trim() && recipient !== '' ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {!recipient.trim() && recipient !== '' && (
                    <p className="text-xs text-red-500">Recipient name is required</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div style={{backgroundColor:"white", color:"black"}} className="flex items-center justify-between">
                  <Label className="text-lg font-semibold text-gray-900">
                    Line Items <span className="text-red-500 text-sm">*</span>
                  </Label>
                  <Button style={{backgroundColor:"white", color:"black"}} variant="outline" size="sm" onClick={addLineItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
                
                {lineItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs text-gray-600">Description</Label>
                      <Input
                        style={{backgroundColor:"white", color:"black"}}
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                        className={`bg-white border ${!item.description.trim() && item.description !== '' ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label className="text-xs text-gray-600">Amount (BHD)</Label>
                      <Input
                        style={{backgroundColor:"white", color:"black"}}
                        type="number"
                        placeholder="0.00"
                        value={item.amount || ''}
                        onChange={(e) => updateLineItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                        className={`bg-white border ${Number(item.amount) <= 0 && item.amount !== 0 ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-600 mb-1 hover:text-red-700"
                      onClick={() => removeLineItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {/* Validation message for line items */}
                {!lineItems.some(item => item.description.trim() !== '' && Number(item.amount) > 0) && (
                  <p style={{fontWeight:"bold"}} className="text-xs text-red-500 mt-2">
                    Note: All fields are required.
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="vat-toggle"
                        checked={vatEnabled}
                        onCheckedChange={setVatEnabled}
                      />
                      <Label htmlFor="vat-toggle" className="text-gray-700">Apply VAT</Label>
                    </div>
                    {vatEnabled && (
                      <div className="flex items-center gap-2">
                        <Input
                          style={{backgroundColor:"white", color:"black"}}
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={vatPercentage}
                          onChange={(e) => setVatPercentage(parseFloat(e.target.value) || 0)}
                          className="w-20"
                        />
                        <span className="text-sm text-gray-600">%</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm text-gray-600">Subtotal: <span className="font-medium">{subtotal.toLocaleString()} BHD</span></div>
                    {vatEnabled && (
                      <div className="text-sm text-gray-600">VAT ({vatPercentage}%): <span className="font-medium">{vatAmount.toLocaleString()} BHD</span></div>
                    )}
                    <div className="text-xl font-bold text-blue-600">Total: {total.toLocaleString()} BHD</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-gray-200 pt-6">
              <div className="text-xs text-gray-500 italic">
                Note: Please fill in recipient name and at least one line item with description and amount to enable preview
              </div>
            </CardFooter>
          </Card>
        )}

        {/* PDF Preview Section - Shows actual PDF */}
        {isPreviewOpen && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">PDF Preview</h3>
                <p className="text-sm text-gray-600">This is exactly how your PDF will look</p>
              </div>
              <div style={{ height: '800px', width: '100%' }}>
                <PDFViewer width="100%" height="100%" showToolbar={true}>
                  <InvoicePDF
                    docType={docType}
                    recipient={recipient}
                    lineItems={lineItems}
                    vatEnabled={vatEnabled}
                    vatPercentage={vatPercentage}
                    subtotal={subtotal}
                    vatAmount={vatAmount}
                    total={total}
                  />
                </PDFViewer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// import { useState, useEffect, useCallback, useRef } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
// import { Button } from '@/app/components/ui/button';
// import { Input } from '@/app/components/ui/input';
// import { Label } from '@/app/components/ui/label';
// import { Textarea } from '@/app/components/ui/textarea';
// import { Switch } from '@/app/components/ui/switch';
// import { uploadImage } from "@/app/api/UploadImage/uploadImage";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/app/components/ui/select';
// import { 
//   ArrowLeft, 
//   Save, 
//   Upload, 
//   DollarSign, 
//   Info,
//   Calendar,
//   LinkIcon,
//   Loader2,
//   Search,
//   AlertCircle,
//   X,
//   FileText,
//   Image as ImageIcon,
//   File,
//   CheckCircle,
//   AlertTriangle,
//   Trash2,
//   Eye
// } from 'lucide-react';
// import { MoneyRecordCategory } from '@/types/money-record';
// import { getInventory } from '@/app/api/CarInventory/getcarinventory';

// import { Sale } from '@/types';
// import { createMoneyRecord } from '../api/MoneyRecords/createRecord';

// // Add Car interface based on your API response
// interface Car {
//   id: string;
//   make: string;
//   model: string;
//   year: number;
//   vin: string;
//   registrationNumber?: string;
// }

// // Document interface
// interface Document {
//   id: string;
//   file?: File;
//   url: string;
//   name: string;
//   size: number;
//   type: string;
//   uploadProgress?: number;
//   status: 'pending' | 'uploading' | 'success' | 'error';
//   error?: string;
// }

// interface CreateMoneyRecordProps {
//   onBack: () => void;
//   onSave?: (record: any) => void;
//   userRole: string;
//   initialTab?: string;
// }

// // Mock investors (matches AuthenticatedApp data)
// const mockInvestors = [
//   {
//     id: 'inv-1',
//     name: 'Ahmed Al-Hassan',
//     contactNumber: '+973 3333 4444',
//     cprNumber: '920101234',
//   },
//   {
//     id: 'inv-2',
//     name: 'Sara Mohammed',
//     contactNumber: '+973 3344 5566',
//     cprNumber: '930202345',
//   },
// ];

// // Mock sales data (clients)
// const mockSales: Sale[] = [
//   {
//     id: 'sale-1',
//     date: '2026-02-01',
//     carId: '1',
//     carName: 'BMW X5 2024',
//     carSource: 'Company Car',
//     soldPrice: 52000,
//     paymentType: 'Full',
//     status: 'Completed',
//     purchaserName: 'Mohammed Ali',
//     purchaserCpr: '920304567',
//   },
//   {
//     id: 'sale-2',
//     date: '2026-01-28',
//     carId: '3',
//     carName: 'Audi A6 2023',
//     carSource: 'Customer',
//     soldPrice: 48000,
//     paymentType: 'Installment',
//     status: 'Installment Active',
//     purchaserName: 'Fatima Hassan',
//     purchaserCpr: '930405678',
//   },
//   {
//     id: 'sale-3',
//     date: '2026-01-25',
//     carId: '5',
//     carName: 'Lexus ES 2023',
//     carSource: 'Investor',
//     soldPrice: 42000,
//     paymentType: 'Full',
//     status: 'Completed',
//     purchaserName: 'Ali Khalifa',
//     purchaserCpr: '940506789',
//   },
// ];

// export function CreateMoneyRecord({ onBack, onSave = () => {}, userRole, initialTab = 'all' }: CreateMoneyRecordProps) {
//   const [formData, setFormData] = useState({
//     title: '',
//     category: 'Expense' as MoneyRecordCategory,
//     otherCategory: '',
//     description: '',
//     linkedToType: 'None' as 'None' | 'Car' | 'Client' | 'Investor',
//     linkedToId: '',
    
//     // Payable
//     isPayable: initialTab === 'expenses' || initialTab === 'payables',
//     payableTo: '',
//     payableAmount: '',
//     payableDate: new Date().toISOString().split('T')[0],
//     payableDocuments: [] as Document[],
//     receiptPath: '',
    
//     // Receivable
//     isReceivable: initialTab === 'receivables',
//     receivableFrom: '',
//     receivableAmount: '',
//     receivableDueDate: '',
//     receivableDocuments: [] as Document[],
//   });

//   // Separate loading states for payable and receivable uploads
//   const [payableUploading, setPayableUploading] = useState(false);
//   const [receivableUploading, setReceivableUploading] = useState(false);
//   const [formSubmitting, setFormSubmitting] = useState(false);
  
//   const payableFileInputRef = useRef<HTMLInputElement>(null);
//   const receivableFileInputRef = useRef<HTMLInputElement>(null);

//   // Car dropdown states
//   const [cars, setCars] = useState<Car[]>([]);
//   const [carsLoading, setCarsLoading] = useState(false);
//   const [carsError, setCarsError] = useState<string | null>(null);
//   const [carSearchTerm, setCarSearchTerm] = useState('');
//   const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false);
//   const carSelectTriggerRef = useRef<HTMLButtonElement>(null);

//   // Filter cars based on search term
//   const filteredCars = cars.filter(car => {
//     const searchLower = carSearchTerm.toLowerCase();
//     return (
//       car.make?.toLowerCase().includes(searchLower) ||
//       car.model?.toLowerCase().includes(searchLower) ||
//       car.vin?.toLowerCase().includes(searchLower) ||
//       car.registrationNumber?.toLowerCase().includes(searchLower) ||
//       `${car.make} ${car.model} ${car.year} ${car.registrationNumber}`.toLowerCase().includes(searchLower)
//     );
//   });

//   // Function to fetch cars from API
//   const fetchCars = useCallback(async () => {
//     if (cars.length > 0) return;
    
//     setCarsLoading(true);
//     setCarsError(null);
    
//     try {
//       const data = await getInventory();
//       if (data && Array.isArray(data)) {
//         setCars(data);
//         if (data.length === 0) {
//           setCarsError('No cars available in inventory');
//         }
//       } else {
//         setCars([]);
//         setCarsError('No cars available in inventory');
//       }
//     } catch (error) {
//       console.error('Failed to fetch cars:', error);
//       setCarsError('Failed to load cars. Please try again.');
//       setCars([]);
//     } finally {
//       setCarsLoading(false);
//     }
//   }, [cars.length]);

//   // Handle dropdown open state
//   const handleCarDropdownOpenChange = (open: boolean) => {
//     setIsCarDropdownOpen(open);
//     if (open) {
//       fetchCars();
//       setCarSearchTerm('');
//     }
//   };

//   // Handle file upload for Payable documents
//   const handlePayableFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     if (files.length === 0) return;

//     for (const file of files) {
//       // Validate file size (max 10MB)
//       if (file.size > 10 * 1024 * 1024) {
//         console.error('File too large:', file.name);
//         continue;
//       }

//       // Validate file type
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
//       if (!allowedTypes.includes(file.type)) {
//         console.error('Invalid file type:', file.type);
//         continue;
//       }

//       const newDoc: Document = {
//         id: `${Date.now()}-${Math.random()}`,
//         file,
//         url: '',
//         name: file.name,
//         size: file.size,
//         type: file.type,
//         status: 'uploading'
//       };

//       // Add document to state with uploading status
//       setFormData(prev => ({
//         ...prev,
//         payableDocuments: [...prev.payableDocuments, newDoc]
//       }));

//       try {
//         setPayableUploading(true);
//         // Upload the file
//         const fileUrl = await uploadImage(file);
        
//         // Update document with successful upload
//         setFormData(prev => ({
//           ...prev,
//           payableDocuments: prev.payableDocuments.map(doc =>
//             doc.id === newDoc.id
//               ? { ...doc, url: fileUrl, status: 'success' }
//               : doc
//           ),
//           receiptPath: fileUrl // Store the main receipt path
//         }));
//       } catch (error) {
//         console.error('Upload failed:', error);
//         // Update document with error status
//         setFormData(prev => ({
//           ...prev,
//           payableDocuments: prev.payableDocuments.map(doc =>
//             doc.id === newDoc.id
//               ? { ...doc, status: 'error', error: 'Upload failed' }
//               : doc
//           )
//         }));
//       } finally {
//         setPayableUploading(false);
//       }
//     }

//     // Reset file input
//     if (payableFileInputRef.current) {
//       payableFileInputRef.current.value = '';
//     }
//   };

//   // Handle file upload for Receivable documents
//   const handleReceivableFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     if (files.length === 0) return;

//     for (const file of files) {
//       // Validate file size (max 10MB)
//       if (file.size > 10 * 1024 * 1024) {
//         console.error('File too large:', file.name);
//         continue;
//       }

//       // Validate file type
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
//       if (!allowedTypes.includes(file.type)) {
//         console.error('Invalid file type:', file.type);
//         continue;
//       }

//       const newDoc: Document = {
//         id: `${Date.now()}-${Math.random()}`,
//         file,
//         url: '',
//         name: file.name,
//         size: file.size,
//         type: file.type,
//         status: 'uploading'
//       };

//       setFormData(prev => ({
//         ...prev,
//         receivableDocuments: [...prev.receivableDocuments, newDoc]
//       }));

//       try {
//         setReceivableUploading(true);
//         const fileUrl = await uploadImage(file);
        
//         setFormData(prev => ({
//           ...prev,
//           receiptPath: fileUrl, // Store the main receipt path for receivable
           
          
//         }));
//       } catch (error) {
//         console.error('Upload failed:', error);
//         setFormData(prev => ({
//           ...prev,
//           receivableDocuments: prev.receivableDocuments.map(doc =>
//             doc.id === newDoc.id
//               ? { ...doc, status: 'error', error: 'Upload failed' }
//               : doc
//           )
//         }));
//       } finally {
//         setReceivableUploading(false);
//       }
//     }

//     if (receivableFileInputRef.current) {
//       receivableFileInputRef.current.value = '';
//     }
//   };

//   // Remove document from Payable
//   const removePayableDocument = (docId: string) => {
//     setFormData(prev => ({
//       ...prev,
//       payableDocuments: prev.payableDocuments.filter(doc => doc.id !== docId)
//     }));
//   };

//   // Remove document from Receivable
//   const removeReceivableDocument = (docId: string) => {
//     setFormData(prev => ({
//       ...prev,
//       receivableDocuments: prev.receivableDocuments.filter(doc => doc.id !== docId)
//     }));
//   };

//   // Get file icon based on file type
//   const getFileIcon = (fileType: string) => {
//     if (fileType.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
//     if (fileType === 'application/pdf') return <FileText className="h-4 w-4" />;
//     return <File className="h-4 w-4" />;
//   };

//   // Format file size
//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const AddRecord = async () => {
//     // Check if there are any uploading documents
//     const hasUploadingPayableDocs = formData.payableDocuments.some(doc => doc.status === 'uploading');
//     const hasUploadingReceivableDocs = formData.receivableDocuments.some(doc => doc.status === 'uploading');
    
//     if (hasUploadingPayableDocs || hasUploadingReceivableDocs) {
//       alert('Please wait for all documents to finish uploading before submitting.');
//       return;
//     }

//     setFormSubmitting(true);
    
//     try {
//       const payload = {
//         title: formData.title,
//         category: formData.category,
//         description: formData.description,

//         // Linking
//         linkType: formData.linkedToType.toLowerCase(),
//         carId: formData.linkedToType === 'Car' ? formData.linkedToId : null,
//         customerId: formData.linkedToType === 'Client' ? formData.linkedToId : null,
//         investorId: formData.linkedToType === 'Investor' ? formData.linkedToId : null,

//         // Payable
//         payableAmount: formData.isPayable ? Number(formData.payableAmount) : null,
//         payableDate: formData.isPayable ? new Date(formData.payableDate).toISOString() : null,
//         payableTo: formData.isPayable ? formData.payableTo : null,
//         // payableReceiptPath: formData.payableReceiptPath,
//         payableDocuments: formData.payableDocuments.filter(doc => doc.status === 'success').map(doc => doc.url),

//         // Receivable
//         receivableAmount: formData.isReceivable ? Number(formData.receivableAmount) : null,
//         dueDate: formData.isReceivable ? new Date(formData.receivableDueDate).toISOString() : null,
//         receivableFrom: formData.isReceivable ? formData.receivableFrom : null,
        

//         // Optional
//         receiptPath: formData.receiptPath || null
//       };

//       console.log("Payload:", payload);
      
//       const response = await createMoneyRecord(payload);

//       if(response){
//         alert("Record created successfully!");
//         onSave(response);
//         onBack();
//       }

//       console.log("Response:", response);
//     } catch (error) { 
//       console.error("Error preparing record data:", error);
//       alert("Failed to create record. Please try again.");
//     } finally {
//       setFormSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     if (initialTab === 'expenses' || initialTab === 'payables') {
//       setFormData(prev => ({ ...prev, isPayable: true, category: initialTab === 'expenses' ? 'Expense' : prev.category }));
//     } else if (initialTab === 'receivables') {
//       setFormData(prev => ({ ...prev, isReceivable: true, isPayable: false }));
//     }
//   }, [initialTab]);

//   const categories: MoneyRecordCategory[] = [
//     'Expense', 'Service', 'Parts', 'Insurance', 'Registration', 'Fuel', 'Commission', 'Other'
//   ];

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     AddRecord();
//   };

//   // Drag and drop handlers for payable
//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handlePayableDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0 && payableFileInputRef.current) {
//       const dataTransfer = new DataTransfer();
//       files.forEach(file => dataTransfer.items.add(file));
//       payableFileInputRef.current.files = dataTransfer.files;
//       const event = new Event('change', { bubbles: true });
//       payableFileInputRef.current.dispatchEvent(event);
//     }
//   };

//   const handleReceivableDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0 && receivableFileInputRef.current) {
//       const dataTransfer = new DataTransfer();
//       files.forEach(file => dataTransfer.items.add(file));
//       receivableFileInputRef.current.files = dataTransfer.files;
//       const event = new Event('change', { bubbles: true });
//       receivableFileInputRef.current.dispatchEvent(event);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       <div className="flex items-center gap-4">
//         <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground hover:text-primary transition-colors">
//           <ArrowLeft className="h-5 w-5" />
//         </Button>
//         <div>
//           <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Create Money Record</h1>
//           <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-70">Single entry for all financial flows</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Section 1: Basic Details */}
//         <Card className="bg-card border-border shadow-sm">
//           <CardHeader className="pb-4">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <Info className="h-4 w-4 text-primary" />
//               </div>
//               <div>
//                 <CardTitle className="text-sm font-black uppercase tracking-widest">Entry Basics</CardTitle>
//                 <CardDescription className="text-[10px] font-bold uppercase">Define the core of this transaction</CardDescription>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="space-y-2">
//                 <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Title (Required)</Label>
//                 <Input 
//                   id="title" 
//                   placeholder="e.g., Engine Repair - VIN 123" 
//                   className="bg-secondary/50 border-border h-11 text-sm font-medium"
//                   value={formData.title}
//                   onChange={(e) => setFormData({...formData, title: e.target.value})}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</Label>
//                 <Select 
//                   value={formData.category} 
//                   onValueChange={(val: MoneyRecordCategory) => setFormData({...formData, category: val})}
//                 >
//                   <SelectTrigger className="bg-secondary/50 border-border h-11 text-sm font-medium">
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-card border-border">
//                     {categories.map(cat => (
//                       <SelectItem key={cat} value={cat} className="text-sm font-medium">{cat}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {formData.category === 'Other' && (
//               <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
//                 <Label htmlFor="otherCategory" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Specify Category</Label>
//                 <Input 
//                   id="otherCategory" 
//                   placeholder="Enter category name" 
//                   className="bg-secondary/50 border-border h-11 text-sm font-medium"
//                   value={formData.otherCategory}
//                   onChange={(e) => setFormData({...formData, otherCategory: e.target.value})}
//                 />
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</Label>
//               <Textarea 
//                 id="description" 
//                 placeholder="Additional details about this record..." 
//                 className="bg-secondary/50 border-border min-h-[100px] text-sm font-medium resize-none"
//                 value={formData.description}
//                 onChange={(e) => setFormData({...formData, description: e.target.value})}
//               />
//             </div>

//             <div className="space-y-3">
//               <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Link Record To (Mandatory Linking Logic)</Label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                 {(['None', 'Car', 'Client', 'Investor'] as const).map((type) => (
//                   <Button
//                     key={type}
//                     type="button"
//                     variant={formData.linkedToType === type ? 'default' : 'outline'}
//                     className={`text-[10px] font-black uppercase h-9 shadow-sm ${
//                       formData.linkedToType === type 
//                         ? 'bg-primary text-white border-primary shadow-primary/20' 
//                         : 'border-border bg-secondary/30 hover:bg-secondary'
//                     }`}
//                     onClick={() => setFormData({...formData, linkedToType: type, linkedToId: ''})}
//                   >
//                     <LinkIcon className="h-3 w-3 mr-1.5" />
//                     {type}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             {formData.linkedToType !== 'None' && (
//               <div className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
//                 <Label htmlFor="linkedToId" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
//                   Select {formData.linkedToType}
//                 </Label>
                
//                 {formData.linkedToType === 'Car' && (
//                   <div className="space-y-2">
//                     <Select 
//                       value={formData.linkedToId} 
//                       onValueChange={(val) => setFormData({...formData, linkedToId: val})}
//                       open={isCarDropdownOpen}
//                       onOpenChange={handleCarDropdownOpenChange}
//                     >
//                       <SelectTrigger 
//                         ref={carSelectTriggerRef}
//                         className="bg-secondary/50 border-border h-11 text-sm font-medium"
//                       >
//                         <SelectValue placeholder={
//                           carsLoading ? "Loading cars..." : 
//                           carsError ? "Error loading cars" : 
//                           "Select a car from inventory..."
//                         } />
//                       </SelectTrigger>
//                       <SelectContent className="bg-card border-border max-h-[400px]">
//                         {cars.length > 0 && (
//                           <div className="sticky top-0 bg-card border-b border-border p-2">
//                             <div className="relative">
//                               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
//                               <Input
//                                 placeholder="Search cars by make, model, or VIN..."
//                                 value={carSearchTerm}
//                                 onChange={(e) => setCarSearchTerm(e.target.value)}
//                                 className="pl-8 h-9 text-sm bg-secondary/30"
//                                 onClick={(e) => e.stopPropagation()}
//                               />
//                             </div>
//                           </div>
//                         )}
                        
//                         {carsLoading && (
//                           <div className="flex flex-col items-center justify-center py-8 gap-2">
//                             <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                             <p className="text-xs font-medium text-muted-foreground">Loading cars...</p>
//                           </div>
//                         )}
                        
//                         {!carsLoading && carsError && (
//                           <div className="flex flex-col items-center justify-center py-8 gap-2">
//                             <AlertCircle className="h-8 w-8 text-destructive" />
//                             <p className="text-xs font-medium text-destructive text-center px-4">{carsError}</p>
//                             <Button 
//                               type="button"
//                               variant="outline" 
//                               size="sm"
//                               onClick={() => fetchCars()}
//                               className="mt-2 text-xs"
//                             >
//                               Try Again
//                             </Button>
//                           </div>
//                         )}
                        
//                         {!carsLoading && !carsError && cars.length === 0 && (
//                           <div className="flex flex-col items-center justify-center py-8 gap-2">
//                             <AlertCircle className="h-8 w-8 text-muted-foreground" />
//                             <p className="text-xs font-medium text-muted-foreground">No cars available</p>
//                           </div>
//                         )}
                        
//                         {!carsLoading && !carsError && filteredCars.length === 0 && carSearchTerm && (
//                           <div className="flex flex-col items-center justify-center py-8 gap-2">
//                             <Search className="h-8 w-8 text-muted-foreground" />
//                             <p className="text-xs font-medium text-muted-foreground">No matching cars found</p>
//                             <p className="text-[10px] text-muted-foreground">Try a different search term</p>
//                           </div>
//                         )}
                        
//                         {!carsLoading && !carsError && filteredCars.map((car) => (
//                           <SelectItem key={car.id} value={car.id} className="text-sm font-medium py-3">
//                             <div className="flex flex-col gap-0.5">
//                               <span className="font-bold">{car.make} {car.model} {car.year}</span>
//                               <span className="text-xs text-muted-foreground">
//                                 VIN: {car.vin} {car.registrationNumber && `• ${car.registrationNumber}`}
//                               </span>
//                             </div>
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
                    
//                     {formData.linkedToId && (
//                       <div className="mt-2 p-2 bg-primary/5 rounded-lg border border-primary/10">
//                         <p className="text-[10px] font-black uppercase tracking-widest text-primary">Selected Car</p>
//                         <p className="text-xs font-medium">
//                           {cars.find(c => c.id === formData.linkedToId)?.make} {' - '}
//                           {cars.find(c => c.id === formData.linkedToId)?.model} {' - '}
//                           {cars.find(c => c.id === formData.linkedToId)?.year} {' - '}
//                           {cars.find(c => c.id === formData.linkedToId)?.registrationNumber}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {formData.linkedToType === 'Client' && (
//                   <Select 
//                     value={formData.linkedToId} 
//                     onValueChange={(val) => setFormData({...formData, linkedToId: val})}
//                   >
//                     <SelectTrigger className="bg-secondary/50 border-border h-11 text-sm font-medium">
//                       <SelectValue placeholder="Select a client..." />
//                     </SelectTrigger>
//                     <SelectContent className="bg-card border-border max-h-[300px]">
//                       {mockSales.map(sale => (
//                         <SelectItem key={sale.id} value={sale.purchaserCpr} className="text-sm font-medium py-3">
//                           <div className="flex flex-col gap-0.5">
//                             <span className="font-bold">{sale.purchaserName}</span>
//                             <span className="text-xs text-muted-foreground">CPR: {sale.purchaserCpr} • {sale.carName}</span>
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 )}

//                 {formData.linkedToType === 'Investor' && (
//                   <Select 
//                     value={formData.linkedToId} 
//                     onValueChange={(val) => setFormData({...formData, linkedToId: val})}
//                   >
//                     <SelectTrigger className="bg-secondary/50 border-border h-11 text-sm font-medium">
//                       <SelectValue placeholder="Select an investor..." />
//                     </SelectTrigger>
//                     <SelectContent className="bg-card border-border max-h-[300px]">
//                       {mockInvestors.map(investor => (
//                         <SelectItem key={investor.id} value={investor.id} className="text-sm font-medium py-3">
//                           <div className="flex flex-col gap-0.5">
//                             <span className="font-bold">{investor.name}</span>
//                             <span className="text-xs text-muted-foreground">CPR: {investor.cprNumber} • {investor.contactNumber}</span>
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Section 2: Payable */}
//           <Card className={`bg-card border-border transition-all duration-300 ${
//             formData.isPayable 
//               ? 'ring-1 ring-destructive/50 shadow-xl shadow-destructive/5' 
//               : 'opacity-50 grayscale-[0.5]'
//           }`}>
//             <CardHeader className="pb-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.isPayable ? 'bg-destructive/10' : 'bg-secondary'}`}>
//                     <DollarSign className={`h-4 w-4 ${formData.isPayable ? 'text-destructive' : 'text-muted-foreground'}`} />
//                   </div>
//                   <div>
//                     <CardTitle className="text-xs font-black uppercase tracking-widest">Payable</CardTitle>
//                     <CardDescription className="text-[9px] font-bold uppercase">Money leaving the business</CardDescription>
//                   </div>
//                 </div>
//                 <Switch 
//                   checked={formData.isPayable} 
//                   onCheckedChange={(val) => setFormData({...formData, isPayable: val})}
//                   className="data-[state=checked]:bg-destructive"
//                 />
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Payable To</Label>
//                 <Input 
//                   placeholder="e.g., Garage Name, Supplier" 
//                   className="bg-secondary/50 border-border h-10 text-sm"
//                   disabled={!formData.isPayable}
//                   value={formData.payableTo}
//                   onChange={(e) => setFormData({...formData, payableTo: e.target.value})}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount (BHD)</Label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-muted-foreground">BHD</span>
//                   <Input 
//                     type="number"
//                     placeholder="0.00" 
//                     className="pl-12 bg-secondary/50 border-border h-10 text-sm font-black"
//                     disabled={!formData.isPayable}
//                     value={formData.payableAmount}
//                     onChange={(e) => setFormData({...formData, payableAmount: e.target.value})}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Payable Date</Label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     type="date"
//                     className="pl-10 bg-secondary/50 border-border h-10 text-sm"
//                     disabled={!formData.isPayable}
//                     value={formData.payableDate}
//                     onChange={(e) => setFormData({...formData, payableDate: e.target.value})}
//                   />
//                 </div>
//               </div>
              
//               {/* Document Upload Section for Payable */}
//              <div className="pt-2">
//   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Receipt Documents</Label>
  
//   {/* Hidden file input - remove 'multiple' attribute */}
//   <input
//     ref={payableFileInputRef}
//     type="file"
//     accept="image/jpeg,image/png,image/jpg,application/pdf"
//     onChange={handlePayableFileUpload}
//     className="hidden"
//     disabled={!formData.isPayable || payableUploading || formData.payableDocuments.length >= 1}
//   />
  
//   {/* Upload Area - disabled when document exists */}
//   <div
//     onClick={() => formData.isPayable && !payableUploading && formData.payableDocuments.length === 0 && payableFileInputRef.current?.click()}
//     onDragOver={handleDragOver}
//     onDrop={handlePayableDrop}
//     className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
//       formData.isPayable && !payableUploading && formData.payableDocuments.length === 0
//         ? 'border-border hover:border-destructive/50 cursor-pointer bg-secondary/10 hover:bg-secondary/20' 
//         : 'border-border/50 cursor-not-allowed bg-transparent'
//     }`}
//   >
//     {payableUploading ? (
//       <div className="flex flex-col items-center gap-2">
//         <Loader2 className="h-8 w-8 animate-spin text-destructive" />
//         <p className="text-[10px] font-bold uppercase text-muted-foreground">Uploading document...</p>
//       </div>
//     ) : (
//       <>
//         <Upload className={`h-8 w-8 mx-auto mb-2 ${formData.isPayable && formData.payableDocuments.length === 0 ? 'text-destructive' : 'text-muted-foreground'}`} />
//         <p className="text-[10px] font-bold uppercase text-muted-foreground">
//           {formData.payableDocuments.length >= 1 ? 'Document uploaded' : 'Click or drag & drop to upload'}
//         </p>
//         <p className="text-[8px] text-muted-foreground mt-1">
//           Supported: JPG, PNG, PDF (Max 10MB)
//         </p>
//       </>
//     )}
//   </div>

//   {/* Document List - will only show max 1 document */}
//   {formData.payableDocuments.length > 0 && (
//     <div className="mt-4 space-y-2">
//       <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
//         Uploaded Documents ({formData.payableDocuments.length})
//       </p>
//       <div className="space-y-2 max-h-[200px] overflow-y-auto">
//         {formData.payableDocuments.map((doc) => (
//           <div
//             key={doc.id}
//             className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
//           >
//             <div className="flex items-center gap-2 flex-1 min-w-0">
//               {getFileIcon(doc.type)}
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs font-medium truncate">{doc.name}</p>
//                 <p className="text-[9px] text-muted-foreground">
//                   {formatFileSize(doc.size)}
//                 </p>
//               </div>
//               {doc.status === 'uploading' && (
//                 <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
//               )}
//               {doc.status === 'success' && (
//                 <CheckCircle className="h-3 w-3 text-green-500" />
//               )}
//               {doc.status === 'error' && (
//                 <AlertTriangle className="h-3 w-3 text-destructive" />
//               )}
//             </div>
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               className="h-6 w-6 p-0"
//               onClick={() => removePayableDocument(doc.id)}
//               disabled={doc.status === 'uploading'}
//             >
//               <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )}
// </div>
//             </CardContent>
//           </Card>

//           {/* Section 3: Receivable */}
//           <Card className={`bg-card border-border transition-all duration-300 ${
//             formData.isReceivable 
//               ? 'ring-1 ring-primary/50 shadow-xl shadow-primary/5' 
//               : 'opacity-50 grayscale-[0.5]'
//           }`}>
//             <CardHeader className="pb-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.isReceivable ? 'bg-primary/10' : 'bg-secondary'}`}>
//                     <DollarSign className={`h-4 w-4 ${formData.isReceivable ? 'text-primary' : 'text-muted-foreground'}`} />
//                   </div>
//                   <div>
//                     <CardTitle className="text-xs font-black uppercase tracking-widest">Receivable</CardTitle>
//                     <CardDescription className="text-[9px] font-bold uppercase">Money entering the business</CardDescription>
//                   </div>
//                 </div>
//                 <Switch 
//                   checked={formData.isReceivable} 
//                   onCheckedChange={(val) => setFormData({...formData, isReceivable: val})}
//                   className="data-[state=checked]:bg-primary"
//                 />
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Receivable From</Label>
//                 <Input 
//                   placeholder="e.g., Client Name, Investor" 
//                   className="bg-secondary/50 border-border h-10 text-sm"
//                   disabled={!formData.isReceivable}
//                   value={formData.receivableFrom}
//                   onChange={(e) => setFormData({...formData, receivableFrom: e.target.value})}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount (BHD)</Label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-muted-foreground">BHD</span>
//                   <Input 
//                     type="number"
//                     placeholder="0.00" 
//                     className="pl-12 bg-secondary/50 border-border h-10 text-sm font-black"
//                     disabled={!formData.isReceivable}
//                     value={formData.receivableAmount}
//                     onChange={(e) => setFormData({...formData, receivableAmount: e.target.value})}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Due Date</Label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     type="date"
//                     className="pl-10 bg-secondary/50 border-border h-10 text-sm"
//                     disabled={!formData.isReceivable}
//                     value={formData.receivableDueDate}
//                     onChange={(e) => setFormData({...formData, receivableDueDate: e.target.value})}
//                   />
//                 </div>
//               </div>
              
//               {/* Receivable Document Upload */}
//               {/* <div className="pt-2">
//                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Supporting Documents</Label>
                
//                 <input
//                   ref={receivableFileInputRef}
//                   type="file"
//                   multiple
//                   accept="image/jpeg,image/png,image/jpg,application/pdf"
//                   onChange={handleReceivableFileUpload}
//                   className="hidden"
//                   disabled={!formData.isReceivable || receivableUploading}
//                 />
                
//                 <div
//                   onClick={() => formData.isReceivable && !receivableUploading && receivableFileInputRef.current?.click()}
//                   onDragOver={handleDragOver}
//                   onDrop={handleReceivableDrop}
//                   className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
//                     formData.isReceivable && !receivableUploading
//                       ? 'border-border hover:border-primary/50 cursor-pointer bg-secondary/10 hover:bg-secondary/20' 
//                       : 'border-border/50 cursor-not-allowed bg-transparent'
//                   }`}
//                 >
//                   {receivableUploading ? (
//                     <div className="flex flex-col items-center gap-2">
//                       <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                       <p className="text-[10px] font-bold uppercase text-muted-foreground">Uploading document...</p>
//                     </div>
//                   ) : (
//                     <>
//                       <Upload className={`h-8 w-8 mx-auto mb-2 ${formData.isReceivable ? 'text-primary' : 'text-muted-foreground'}`} />
//                       <p className="text-[10px] font-bold uppercase text-muted-foreground">
//                         Upload Documents
//                       </p>
//                       <p className="text-[8px] text-muted-foreground mt-1">
//                         JPG, PNG, PDF (Max 10MB)
//                       </p>
//                     </>
//                   )}
//                 </div>

//                 {formData.receivableDocuments.length > 0 && (
//                   <div className="mt-4 space-y-2">
//                     <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
//                       Uploaded Documents ({formData.receivableDocuments.length})
//                     </p>
//                     <div className="space-y-2 max-h-[200px] overflow-y-auto">
//                       {formData.receivableDocuments.map((doc) => (
//                         <div
//                           key={doc.id}
//                           className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
//                         >
//                           <div className="flex items-center gap-2 flex-1 min-w-0">
//                             {getFileIcon(doc.type)}
//                             <div className="flex-1 min-w-0">
//                               <p className="text-xs font-medium truncate">{doc.name}</p>
//                               <p className="text-[9px] text-muted-foreground">
//                                 {formatFileSize(doc.size)}
//                               </p>
//                             </div>
//                             {doc.status === 'uploading' && (
//                               <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
//                             )}
//                             {doc.status === 'success' && (
//                               <CheckCircle className="h-3 w-3 text-green-500" />
//                             )}
//                             {doc.status === 'error' && (
//                               <AlertTriangle className="h-3 w-3 text-destructive" />
//                             )}
//                           </div>
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             className="h-6 w-6 p-0"
//                             onClick={() => removeReceivableDocument(doc.id)}
//                             disabled={doc.status === 'uploading'}
//                           >
//                             <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
//                           </Button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div> */}

//               <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
//                 <div className="flex items-start gap-3">
//                   <div className="mt-0.5">
//                     <Info className="h-3 w-3 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-[9px] text-primary font-black uppercase tracking-widest leading-tight">Smart Entry System</p>
//                     <p className="text-[10px] font-bold text-muted-foreground mt-1 leading-normal">
//                       Toggle both Payable and Receivable for complex transactions like Towing where you pay a vendor and charge a client.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
//           <Button 
//             type="button" 
//             variant="ghost" 
//             onClick={onBack} 
//             className="text-xs font-bold uppercase tracking-widest px-6"
//             disabled={formSubmitting}
//           >
//             Discard
//           </Button>
//           <Button 
//             type="submit" 
//             className="bg-primary hover:bg-primary/90 text-white min-w-[180px] h-11 font-black uppercase tracking-widest shadow-xl shadow-primary/20"
//             disabled={formSubmitting || payableUploading || receivableUploading}
//           >
//             {formSubmitting ? (
//               <>
//                 <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 Creating Record...
//               </>
//             ) : (
//               <>
//                 <Save className="h-4 w-4 mr-2" />
//                 Create Record
//               </>
//             )}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { uploadImage } from "@/app/api/UploadImage/uploadImage";
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
  LinkIcon,
  Loader2,
  Search,
  AlertCircle,
  X,
  FileText,
  Image as ImageIcon,
  File,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Eye
} from 'lucide-react';
import { MoneyRecordCategory } from '@/types/money-record';
import { getInventory } from '@/app/api/CarInventory/getcarinventory';

import { Sale } from '@/types';
import { createMoneyRecord } from '../api/MoneyRecords/createRecord';
import { ScrollArea } from './ui/scroll-area';

// Add Car interface based on your API response
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  registrationNumber?: string;
}

// Customer interface
interface Customer {
  id: string;
  customerName: string;
  contactNumber: string;
  cprNumber: string;
  notes?: string;
  cprDocumentPath?: string;
  createdAt?: string;
}

// Investor interface
interface Investor {
  id: string;
  name: string;
  cprNumber: string;
  contactNumber: string;
  email: string;
  status: string;
}

// Document interface
interface Document {
  id: string;
  file?: File;
  url: string;
  name: string;
  size: number;
  type: string;
  uploadProgress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface CreateMoneyRecordProps {
  onBack: () => void;
  onSave?: (record: any) => void;
  userRole: string;
  initialTab?: string;
}

// Searchable Customer Select Component
interface SearchableCustomerSelectProps {
  value: string;
  onChange: (value: string) => void;
  customers: Customer[];
  loading: boolean;
  onOpen?: () => void;
}

const SearchableCustomerSelect = ({ value, onChange, customers, loading, onOpen }: SearchableCustomerSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const filteredCustomers = customers.filter((customer: Customer) => 
    customer.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.cprNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCustomer = customers.find((c: Customer) => c.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className="flex h-11 w-full items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedCustomer ? (
          <span className="flex-1 text-left font-medium">
            {selectedCustomer.customerName} - CPR: {selectedCustomer.cprNumber}
          </span>
        ) : (
          <span className="flex-1 text-left text-muted-foreground">
            Select customer profile
          </span>
        )}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 rounded-md border border-border bg-card text-popover-foreground shadow-md">
          <div className="flex items-center border-b border-border px-3">
            <Search className="h-4 w-4 shrink-0 opacity-50" />
            <input
              autoComplete="off"
              type="text"
              placeholder="Search by name, CPR, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              autoFocus
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="opacity-50 hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <ScrollArea className="max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">Loading customers...</span>
              </div>
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer: Customer) => (
                <button
                  key={customer.id}
                  type="button"
                  onClick={() => {
                    onChange(customer.id);
                    handleClose();
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 ${
                    value === customer.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-secondary'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-2">
                      <span className={`font-medium ${
                        value === customer.id ? 'text-primary' : ''
                      }`}>
                        {customer.customerName}
                      </span>
                    </div>
                    <div className={`flex flex-row items-center gap-2 text-xs ${
                      value === customer.id 
                        ? 'text-primary/70' 
                        : 'text-muted-foreground'
                    }`}>
                      <span>CPR: {customer.cprNumber}</span>
                      <span>|</span>
                      <span>Phone: {customer.contactNumber}</span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                No customers available
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

// Searchable Investor Select Component
interface SearchableInvestorSelectProps {
  value: string;
  onChange: (value: string) => void;
  investors: Investor[];
  loading: boolean;
  onOpen?: () => void;
}

const SearchableInvestorSelect = ({ value, onChange, investors, loading, onOpen }: SearchableInvestorSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const filteredInvestors = investors.filter((investor: Investor) => 
    investor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.cprNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.contactNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedInvestor = investors.find((i: Investor) => i.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className="flex h-11 w-full items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedInvestor ? (
          <span className="flex-1 text-left font-medium">
            {selectedInvestor.name} - CPR: {selectedInvestor.cprNumber}
          </span>
        ) : (
          <span className="flex-1 text-left text-muted-foreground">
            Select investor profile
          </span>
        )}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 rounded-md border border-border bg-card text-popover-foreground shadow-md">
          <div className="flex items-center border-b border-border px-3">
            <Search className="h-4 w-4 shrink-0 opacity-50" />
            <input
              autoComplete="off"
              type="text"
              placeholder="Search by name or CPR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              autoFocus
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="opacity-50 hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <ScrollArea className="max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">Loading investors...</span>
              </div>
            ) : filteredInvestors.length > 0 ? (
              filteredInvestors.map((investor: Investor) => (
                <button
                  key={investor.id}
                  type="button"
                  onClick={() => {
                    onChange(investor.id);
                    handleClose();
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 ${
                    value === investor.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-secondary'
                  }`}
                >
                  <div className="flex flex-row items-center gap-2">
                    <span className="font-medium">{investor.name}</span>
                    <span className="text-xs text-muted-foreground">
                      CPR: {investor.cprNumber} | {investor.contactNumber}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                No investors available
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

// Helper component for ChevronDown (since it wasn't imported)
const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

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
    payableDocuments: [] as Document[],
    receiptPath: '',
    
    // Receivable
    isReceivable: initialTab === 'receivables',
    receivableFrom: '',
    receivableAmount: '',
    receivableDueDate: '',
    receivableDocuments: [] as Document[],
  });

  // Separate loading states for payable and receivable uploads
  const [payableUploading, setPayableUploading] = useState(false);
  const [receivableUploading, setReceivableUploading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  const payableFileInputRef = useRef<HTMLInputElement>(null);
  const receivableFileInputRef = useRef<HTMLInputElement>(null);

  // Car dropdown states
  const [cars, setCars] = useState<Car[]>([]);
  const [carsLoading, setCarsLoading] = useState(false);
  const [carsError, setCarsError] = useState<string | null>(null);
  const [carSearchTerm, setCarSearchTerm] = useState('');
  const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false);
  const carSelectTriggerRef = useRef<HTMLButtonElement>(null);

  // Customer states
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersLoading, setCustomersLoading] = useState(false);
  
  // Investor states
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [investorsLoading, setInvestorsLoading] = useState(false);

  // Filter cars based on search term
  const filteredCars = cars.filter(car => {
    const searchLower = carSearchTerm.toLowerCase();
    return (
      car.make?.toLowerCase().includes(searchLower) ||
      car.model?.toLowerCase().includes(searchLower) ||
      car.vin?.toLowerCase().includes(searchLower) ||
      car.registrationNumber?.toLowerCase().includes(searchLower) ||
      `${car.make} ${car.model} ${car.year} ${car.registrationNumber}`.toLowerCase().includes(searchLower)
    );
  });

  // Function to fetch cars from API
  const fetchCars = useCallback(async () => {
    if (cars.length > 0) return;
    
    setCarsLoading(true);
    setCarsError(null);
    
    try {
      const data = await getInventory();
      if (data && Array.isArray(data)) {
        setCars(data);
        if (data.length === 0) {
          setCarsError('No cars available in inventory');
        }
      } else {
        setCars([]);
        setCarsError('No cars available in inventory');
      }
    } catch (error) {
      console.error('Failed to fetch cars:', error);
      setCarsError('Failed to load cars. Please try again.');
      setCars([]);
    } finally {
      setCarsLoading(false);
    }
  }, [cars.length]);

  // Function to fetch customers from API
  const fetchCustomers = useCallback(async () => {
    if (customersLoading || customers.length > 0) return;
    
    setCustomersLoading(true);
    try {
      const response = await fetch('https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Customers');
      const data = await response.json();
      
      let customersData: any[] = [];
      
      if (Array.isArray(data)) {
        customersData = data;
      } else if (data.data && Array.isArray(data.data)) {
        customersData = data.data;
      } else if (data.customers && Array.isArray(data.customers)) {
        customersData = data.customers;
      }
      
      const formattedCustomers = customersData
        .filter((customer: any) => customer != null)
        .map((customer: any) => ({
          id: customer.id || customer.customerId || customer._id,
          customerName: customer.customerName || 'Unknown',
          contactNumber: customer.contactNumber || 'N/A',
          cprNumber: customer.cprNumber || 'N/A',
          notes: customer.notes || '',
          cprDocumentPath: customer.cprDocumentPath || '',
          createdAt: customer.createdAt || ''
        }));
      
      setCustomers(formattedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    } finally {
      setCustomersLoading(false);
    }
  }, [customers.length, customersLoading]);

  // Function to fetch investors from API
  const fetchInvestors = useCallback(async () => {
    if (investorsLoading || investors.length > 0) return;
    
    setInvestorsLoading(true);
    try {
      const response = await fetch('https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Investors');
      const data = await response.json();
      
      let investorsData: any[] = [];
      
      if (Array.isArray(data)) {
        investorsData = data;
      } else if (data.data && Array.isArray(data.data)) {
        investorsData = data.data;
      } else if (data.investors && Array.isArray(data.investors)) {
        investorsData = data.investors;
      }
      
      const formattedInvestors = investorsData
        .filter((inv: any) => inv != null)
        .map((inv: any) => ({
          id: inv.id || inv.investorId || inv._id,
          name: inv.investorName || inv.name || 'Unknown',
          cprNumber: inv.cprNumber || 'N/A',
          contactNumber: inv.contactNumber || 'N/A',
          email: inv.email || '',
          status: inv.isActive ? 'Active' : 'Inactive',
        }));
      
      setInvestors(formattedInvestors);
    } catch (error) {
      console.error('Error fetching investors:', error);
      setInvestors([]);
    } finally {
      setInvestorsLoading(false);
    }
  }, [investors.length, investorsLoading]);

  // Handle dropdown open state
  const handleCarDropdownOpenChange = (open: boolean) => {
    setIsCarDropdownOpen(open);
    if (open) {
      fetchCars();
      setCarSearchTerm('');
    }
  };

  // Handle file upload for Payable documents
  const handlePayableFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        console.error('File too large:', file.name);
        continue;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        console.error('Invalid file type:', file.type);
        continue;
      }

      const newDoc: Document = {
        id: `${Date.now()}-${Math.random()}`,
        file,
        url: '',
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading'
      };

      // Add document to state with uploading status
      setFormData(prev => ({
        ...prev,
        payableDocuments: [...prev.payableDocuments, newDoc]
      }));

      try {
        setPayableUploading(true);
        // Upload the file
        const fileUrl = await uploadImage(file);
        
        // Update document with successful upload
        setFormData(prev => ({
          ...prev,
          payableDocuments: prev.payableDocuments.map(doc =>
            doc.id === newDoc.id
              ? { ...doc, url: fileUrl, status: 'success' }
              : doc
          ),
          receiptPath: fileUrl // Store the main receipt path
        }));
      } catch (error) {
        console.error('Upload failed:', error);
        // Update document with error status
        setFormData(prev => ({
          ...prev,
          payableDocuments: prev.payableDocuments.map(doc =>
            doc.id === newDoc.id
              ? { ...doc, status: 'error', error: 'Upload failed' }
              : doc
          )
        }));
      } finally {
        setPayableUploading(false);
      }
    }

    // Reset file input
    if (payableFileInputRef.current) {
      payableFileInputRef.current.value = '';
    }
  };

  // Handle file upload for Receivable documents
  const handleReceivableFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        console.error('File too large:', file.name);
        continue;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        console.error('Invalid file type:', file.type);
        continue;
      }

      const newDoc: Document = {
        id: `${Date.now()}-${Math.random()}`,
        file,
        url: '',
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading'
      };

      setFormData(prev => ({
        ...prev,
        receivableDocuments: [...prev.receivableDocuments, newDoc]
      }));

      try {
        setReceivableUploading(true);
        const fileUrl = await uploadImage(file);
        
        setFormData(prev => ({
          ...prev,
          receiptPath: fileUrl, // Store the main receipt path for receivable
        }));
      } catch (error) {
        console.error('Upload failed:', error);
        setFormData(prev => ({
          ...prev,
          receivableDocuments: prev.receivableDocuments.map(doc =>
            doc.id === newDoc.id
              ? { ...doc, status: 'error', error: 'Upload failed' }
              : doc
          )
        }));
      } finally {
        setReceivableUploading(false);
      }
    }

    if (receivableFileInputRef.current) {
      receivableFileInputRef.current.value = '';
    }
  };

  // Remove document from Payable
  const removePayableDocument = (docId: string) => {
    setFormData(prev => ({
      ...prev,
      payableDocuments: prev.payableDocuments.filter(doc => doc.id !== docId)
    }));
  };

  // Remove document from Receivable
  const removeReceivableDocument = (docId: string) => {
    setFormData(prev => ({
      ...prev,
      receivableDocuments: prev.receivableDocuments.filter(doc => doc.id !== docId)
    }));
  };

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    if (fileType === 'application/pdf') return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const AddRecord = async () => {
    // Check if there are any uploading documents
    const hasUploadingPayableDocs = formData.payableDocuments.some(doc => doc.status === 'uploading');
    const hasUploadingReceivableDocs = formData.receivableDocuments.some(doc => doc.status === 'uploading');
    
    if (hasUploadingPayableDocs || hasUploadingReceivableDocs) {
      alert('Please wait for all documents to finish uploading before submitting.');
      return;
    }

    if (formData.linkedToType !== 'None' && !formData.linkedToId) {
      alert(`Please select a ${formData.linkedToType.toLowerCase()} to link this record to.`);
      return;
    }

    if (formData.isPayable || formData.isReceivable) {
      if (formData.isPayable) {
        if (!formData.payableAmount || isNaN(Number(formData.payableAmount)) || Number(formData.payableAmount) <= 0) {
          alert('Please enter a valid payable amount greater than 0.');
          return;
        }
        if (!formData.payableTo.trim()) {
          alert('Please enter who the payable is to.');
          return;
        }
        if (!formData.payableDate) {
          alert('Please select a payable date.');
          return;
        }
      }

      if (formData.isReceivable) {
        if (!formData.receivableAmount || isNaN(Number(formData.receivableAmount)) || Number(formData.receivableAmount) <= 0) {
          alert('Please enter a valid receivable amount greater than 0.');
          return;
        }
        if (!formData.receivableFrom.trim()) {
          alert('Please enter who the receivable is from.');
          return;
        }
        if (!formData.receivableDueDate) {
          alert('Please select a receivable due date.');
          return;
        }
      }
    }

    setFormSubmitting(true);
    
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        description: formData.description,

        // Linking
        linkType: formData.linkedToType.toLowerCase(),
        carId: formData.linkedToType === 'Car' ? formData.linkedToId : null,
        customerId: formData.linkedToType === 'Client' ? formData.linkedToId : null,
        investorId: formData.linkedToType === 'Investor' ? formData.linkedToId : null,

        // Payable
        payableAmount: formData.isPayable ? Number(formData.payableAmount) : null,
        payableDate: formData.isPayable ? new Date(formData.payableDate).toISOString() : null,
        payableTo: formData.isPayable ? formData.payableTo : null,
        payableDocuments: formData.payableDocuments.filter(doc => doc.status === 'success').map(doc => doc.url),

        // Receivable
        receivableAmount: formData.isReceivable ? Number(formData.receivableAmount) : null,
        dueDate: formData.isReceivable ? new Date(formData.receivableDueDate).toISOString() : null,
        receivableFrom: formData.isReceivable ? formData.receivableFrom : null,

        // Optional
        receiptPath: formData.receiptPath || null
      };

      console.log("Payload:", payload);
      console.log(formData.isPayable, formData.isReceivable);
      
      const response = await createMoneyRecord(payload);

      if(response){
        alert("Record created successfully!");
        onSave(response);
        onBack();
      }

      console.log("Response:", response);
    } catch (error) { 
      console.error("Error preparing record data:", error);
      alert("Failed to create record. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AddRecord();
  };

  // Drag and drop handlers for payable
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handlePayableDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && payableFileInputRef.current) {
      const dataTransfer = new DataTransfer();
      files.forEach(file => dataTransfer.items.add(file));
      payableFileInputRef.current.files = dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      payableFileInputRef.current.dispatchEvent(event);
    }
  };

  const handleReceivableDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && receivableFileInputRef.current) {
      const dataTransfer = new DataTransfer();
      files.forEach(file => dataTransfer.items.add(file));
      receivableFileInputRef.current.files = dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      receivableFileInputRef.current.dispatchEvent(event);
    }
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
                  <div className="space-y-2">
                    <Select 
                      value={formData.linkedToId} 
                      onValueChange={(val) => setFormData({...formData, linkedToId: val})}
                      open={isCarDropdownOpen}
                      onOpenChange={handleCarDropdownOpenChange}
                    >
                      <SelectTrigger 
                        ref={carSelectTriggerRef}
                        className="bg-secondary/50 border-border h-11 text-sm font-medium"
                      >
                        <SelectValue placeholder={
                          carsLoading ? "Loading cars..." : 
                          carsError ? "Error loading cars" : 
                          "Select a car from inventory..."
                        } />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border max-h-[400px]">
                        {cars.length > 0 && (
                          <div className="sticky top-0 bg-card border-b border-border p-2">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                              <Input
                                placeholder="Search cars by make, model, or VIN..."
                                value={carSearchTerm}
                                onChange={(e) => setCarSearchTerm(e.target.value)}
                                className="pl-8 h-9 text-sm bg-secondary/30"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>
                        )}
                        
                        {carsLoading && (
                          <div className="flex flex-col items-center justify-center py-8 gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-xs font-medium text-muted-foreground">Loading cars...</p>
                          </div>
                        )}
                        
                        {!carsLoading && carsError && (
                          <div className="flex flex-col items-center justify-center py-8 gap-2">
                            <AlertCircle className="h-8 w-8 text-destructive" />
                            <p className="text-xs font-medium text-destructive text-center px-4">{carsError}</p>
                            <Button 
                              type="button"
                              variant="outline" 
                              size="sm"
                              onClick={() => fetchCars()}
                              className="mt-2 text-xs"
                            >
                              Try Again
                            </Button>
                          </div>
                        )}
                        
                        {!carsLoading && !carsError && cars.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-8 gap-2">
                            <AlertCircle className="h-8 w-8 text-muted-foreground" />
                            <p className="text-xs font-medium text-muted-foreground">No cars available</p>
                          </div>
                        )}
                        
                        {!carsLoading && !carsError && filteredCars.length === 0 && carSearchTerm && (
                          <div className="flex flex-col items-center justify-center py-8 gap-2">
                            <Search className="h-8 w-8 text-muted-foreground" />
                            <p className="text-xs font-medium text-muted-foreground">No matching cars found</p>
                            <p className="text-[10px] text-muted-foreground">Try a different search term</p>
                          </div>
                        )}
                        
                        {!carsLoading && !carsError && filteredCars.map((car) => (
                          <SelectItem key={car.id} value={car.id} className="text-sm font-medium py-3">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-bold">{car.make} {car.model} {car.year}</span>
                              <span className="text-xs text-muted-foreground">
                                VIN: {car.vin} {car.registrationNumber && `• ${car.registrationNumber}`}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {formData.linkedToId && (
                      <div className="mt-2 p-2 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Selected Car</p>
                        <p className="text-xs font-medium">
                          {cars.find(c => c.id === formData.linkedToId)?.make} {' - '}
                          {cars.find(c => c.id === formData.linkedToId)?.model} {' - '}
                          {cars.find(c => c.id === formData.linkedToId)?.year} {' - '}
                          {cars.find(c => c.id === formData.linkedToId)?.registrationNumber}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {formData.linkedToType === 'Client' && (
                  <SearchableCustomerSelect
                    value={formData.linkedToId}
                    onChange={(value: string) => setFormData({...formData, linkedToId: value})}
                    customers={customers}
                    loading={customersLoading}
                    onOpen={fetchCustomers}
                  />
                )}

                {formData.linkedToType === 'Investor' && (
                  <SearchableInvestorSelect
                    value={formData.linkedToId}
                    onChange={(value: string) => setFormData({...formData, linkedToId: value})}
                    investors={investors}
                    loading={investorsLoading}
                    onOpen={fetchInvestors}
                  />
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
              
              {/* Document Upload Section for Payable */}
             <div className="pt-2">
  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Receipt Documents</Label>
  
  {/* Hidden file input - remove 'multiple' attribute */}
  <input
    ref={payableFileInputRef}
    type="file"
    accept="image/jpeg,image/png,image/jpg,application/pdf"
    onChange={handlePayableFileUpload}
    className="hidden"
    disabled={!formData.isPayable || payableUploading || formData.payableDocuments.length >= 1}
  />
  
  {/* Upload Area - disabled when document exists */}
  <div
    onClick={() => formData.isPayable && !payableUploading && formData.payableDocuments.length === 0 && payableFileInputRef.current?.click()}
    onDragOver={handleDragOver}
    onDrop={handlePayableDrop}
    className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
      formData.isPayable && !payableUploading && formData.payableDocuments.length === 0
        ? 'border-border hover:border-destructive/50 cursor-pointer bg-secondary/10 hover:bg-secondary/20' 
        : 'border-border/50 cursor-not-allowed bg-transparent'
    }`}
  >
    {payableUploading ? (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-destructive" />
        <p className="text-[10px] font-bold uppercase text-muted-foreground">Uploading document...</p>
      </div>
    ) : (
      <>
        <Upload className={`h-8 w-8 mx-auto mb-2 ${formData.isPayable && formData.payableDocuments.length === 0 ? 'text-destructive' : 'text-muted-foreground'}`} />
        <p className="text-[10px] font-bold uppercase text-muted-foreground">
          {formData.payableDocuments.length >= 1 ? 'Document uploaded' : 'Click or drag & drop to upload'}
        </p>
        <p className="text-[8px] text-muted-foreground mt-1">
          Supported: JPG, PNG, PDF (Max 10MB)
        </p>
      </>
    )}
  </div>

  {/* Document List - will only show max 1 document */}
  {formData.payableDocuments.length > 0 && (
    <div className="mt-4 space-y-2">
      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
        Uploaded Documents ({formData.payableDocuments.length})
      </p>
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {formData.payableDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {getFileIcon(doc.type)}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{doc.name}</p>
                <p className="text-[9px] text-muted-foreground">
                  {formatFileSize(doc.size)}
                </p>
              </div>
              {doc.status === 'uploading' && (
                <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
              )}
              {doc.status === 'success' && (
                <CheckCircle className="h-3 w-3 text-green-500" />
              )}
              {doc.status === 'error' && (
                <AlertTriangle className="h-3 w-3 text-destructive" />
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => removePayableDocument(doc.id)}
              disabled={doc.status === 'uploading'}
            >
              <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )}
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
              
              {/* Receivable Document Upload */}
              {/* <div className="pt-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Supporting Documents</Label>
                
                <input
                  ref={receivableFileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  onChange={handleReceivableFileUpload}
                  className="hidden"
                  disabled={!formData.isReceivable || receivableUploading}
                />
                
                <div
                  onClick={() => formData.isReceivable && !receivableUploading && receivableFileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleReceivableDrop}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                    formData.isReceivable && !receivableUploading
                      ? 'border-border hover:border-primary/50 cursor-pointer bg-secondary/10 hover:bg-secondary/20' 
                      : 'border-border/50 cursor-not-allowed bg-transparent'
                  }`}
                >
                  {receivableUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Uploading document...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className={`h-8 w-8 mx-auto mb-2 ${formData.isReceivable ? 'text-primary' : 'text-muted-foreground'}`} />
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">
                        Upload Documents
                      </p>
                      <p className="text-[8px] text-muted-foreground mt-1">
                        JPG, PNG, PDF (Max 10MB)
                      </p>
                    </>
                  )}
                </div>

                {formData.receivableDocuments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                      Uploaded Documents ({formData.receivableDocuments.length})
                    </p>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {formData.receivableDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {getFileIcon(doc.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{doc.name}</p>
                              <p className="text-[9px] text-muted-foreground">
                                {formatFileSize(doc.size)}
                              </p>
                            </div>
                            {doc.status === 'uploading' && (
                              <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                            )}
                            {doc.status === 'success' && (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            )}
                            {doc.status === 'error' && (
                              <AlertTriangle className="h-3 w-3 text-destructive" />
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => removeReceivableDocument(doc.id)}
                            disabled={doc.status === 'uploading'}
                          >
                            <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div> */}

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
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onBack} 
            className="text-xs font-bold uppercase tracking-widest px-6"
            disabled={formSubmitting}
          >
            Discard
          </Button>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white min-w-[180px] h-11 font-black uppercase tracking-widest shadow-xl shadow-primary/20"
            disabled={formSubmitting || payableUploading || receivableUploading}
          >
            {formSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Record...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Record
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
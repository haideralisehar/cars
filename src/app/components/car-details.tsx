// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
// import { Badge } from '@/app/components/ui/badge';
// import { Button } from '@/app/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
// import { Input } from '@/app/components/ui/input';
// import { mockMoneyRecords } from '@/types/money-record';
// import { mockInstallments } from '@/data/mockData';
// import { ArrowLeft, Edit, FileText, Download, Wallet, Calendar, Upload, X } from 'lucide-react';
// import { leaseCar } from '../api/CarInventory/leaseCar';
// import { getInventory } from '@/app/api/CarInventory/getById';
// import { Car, UserRole } from '@/types';

// interface CarDetailsProps {
//   car?: Car;
//   userRole: UserRole;
//   onBack: () => void;
//   onEdit?: () => void;
//   onViewRecord?: (record: any) => void;
//   onSellCar?: (car: Car) => void;
//   onLeaseCar?: (car: Car) => void;
//   onAddExpense?: (car: Car) => void;
// }

// export function CarDetails({ 
//   car, 
//   userRole, 
//   onBack, 
//   onEdit, 
//   onViewRecord, 
//   onSellCar, 
//   onLeaseCar, 
//   onAddExpense 
// }: CarDetailsProps) {
  
//   const carMoneyRecords = mockMoneyRecords.filter((r) => r.linkedToId === car?.id);
//   const carExpenses = carMoneyRecords.filter(r => r.isPayable && r.category === 'Expense');
//   const carInstallments = mockInstallments.filter((i) => i.carId === car?.id);
  
//   // Document state
//   const [documents, setDocuments] = useState(car?.documents || {});
//   const [uploadingDoc, setUploadingDoc] = useState(null);
//   const [isAddingOther, setIsAddingOther] = useState(false);
//   const [newDocName, setNewDocName] = useState('');
//   const [cars, setCars] = useState(null);
//   const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
  
//   const handleDocumentUpload = (docType, file) => {
//     setUploadingDoc(docType);
    
//     // Simulate file upload
//     setTimeout(() => {
//       setDocuments(prev => ({
//         ...prev,
//         [docType]: file.name
//       }));
//       setUploadingDoc(null);
//       setIsAddingOther(false);
//       setNewDocName('');
//     }, 1000);
//   };

 
//    console.log("Current documents state:", car);
//    console.log(typeof car);

//    // Fetch Cars
//      useEffect(() => {
//       if(typeof car === 'string') {
//         getCar();
//       }
//      }, [car?.id]);

//    const getCar = async () => {
//     try {
//       // const Id = "0fc1f9ff-6059-4bbd-bdd9-1980daf0cf3a"
//       const response = await getInventory(car);
//       setCars(response);
//       console.log("Fetched car details:", response);
     
//     } catch (error) {
//       console.error("Error fetching car details:", error);
//     }
//   };
  
//   const handleDocumentRemove = (docType) => {
//     setDocuments(prev => {
//       const updated = { ...prev };
//       delete updated[docType];
//       return updated;
//     });
//   };
  

//   if (!car || !isAdmin) {
//     return (
//       <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
//         <div className="bg-card p-8 rounded-xl border border-border text-center max-w-md">
//           <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
//           <p className="text-muted-foreground mb-6">
//             Detailed vehicle views are only available to Administrative roles. Please contact your manager if you require access.
//           </p>
//           <Button onClick={onBack}>Return to Inventory</Button>
//         </div>
//       </div>
//     );
//   }

//   const totalExpenses = carExpenses.reduce((sum, exp) => sum + (exp.payableAmount || 0), 0);
//   const totalBuyingCost = car.buyingPrice + totalExpenses;
//   const estimatedProfit = car.askingPrice - totalBuyingCost;

//   const timelineEvents = [
//     { id: '1', type: 'Created', description: 'Car added to inventory', timestamp: car.createdAt, user: 'Admin' },
//     { id: '2', type: 'Expense', description: 'Oil change and brake service - $1,200', timestamp: '2025-01-20', user: 'Admin' },
//     { id: '3', type: 'Expense', description: 'Front bumper repair - $850', timestamp: '2025-01-25', user: 'Technician' },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Available':
//         return 'bg-primary text-primary-foreground';
//       case 'Sold':
//         return 'bg-green-600 text-white';
//       case 'Leased':
//         return 'bg-blue-600 text-white';
//       default:
//         return 'bg-muted text-muted-foreground';
//     }
//   };

//   const handleDownload = (url) => {
//   window.open(url, "_blank");
// };

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <Button variant="ghost" onClick={onBack}>
//             <ArrowLeft className="h-5 w-5 mr-2" />
//             Back to Inventory
//           </Button>
//           {isAdmin && onEdit && (
//             <Button onClick={onEdit}>
//               <Edit className="h-4 w-4 mr-2" />
//               Edit Car
//             </Button>
//           )}
//         </div>

//         {/* Top Section */}
//         <Card className="bg-card border-border mb-6">
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Image */}
//               <div className="relative h-80 bg-secondary rounded-lg overflow-hidden">
//                 <img
//                   src={typeof car === 'string'? cars?.carImagePath : car?.carImagePath}
//                   alt={`${cars?.make} ${cars?.model}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Info */}
//               <div className="space-y-4">
//                 <div>
//                   <h1 className="text-3xl font-bold text-foreground mb-2">
//                     {cars?.make} {cars?.model}
//                   </h1>
//                   <div className="flex gap-2">
//                     <Badge className={getStatusColor(cars?.status)}>{cars?.status}</Badge>
//                     <Badge variant="outline">{cars?.carSource}</Badge>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 pt-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Year</p>
//                     <p className="font-medium">{car.year}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground">Color</p>
//                     <p className="font-medium">{car.color}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground">VIN</p>
//                     <p className="font-medium text-sm">{car.vin}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground">Registration</p>
//                     <p className="font-medium">{car.registrationNumber}</p>
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-border">
//                   <p className="text-sm text-muted-foreground mb-1">Asking Price</p>
//                   <p className="text-3xl font-bold text-primary">
//                     BD {" "}{car?.financialDetails?.askingPrice}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Tabs */}
//         <Tabs defaultValue="overview" className="space-y-4">
//           <TabsList className="bg-card">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             {isAdmin && (
//               <TabsTrigger value="financials">Financials</TabsTrigger>
//             )}
//             <TabsTrigger value="installments">Installments</TabsTrigger>
//             <TabsTrigger value="expenses">Expenses</TabsTrigger>
//             <TabsTrigger value="documents">Documents</TabsTrigger>
//             <TabsTrigger value="timeline">Timeline</TabsTrigger>
//           </TabsList>

//           {/* Overview Tab */}
//           <TabsContent value="overview">
//             <Card className="bg-card border-border">
//               <CardHeader>
//                 <CardTitle>Vehicle Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h4 className="font-medium mb-3">Basic Details</h4>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Make:</span>
//                         <span className="font-medium">{car.make}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Model:</span>
//                         <span className="font-medium">{car.model}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Year:</span>
//                         <span className="font-medium">{car.year}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Color:</span>
//                         <span className="font-medium">{car.color}</span>
//                       </div>
//                       {/* <div className="flex justify-between">
//                         <span className="text-muted-foreground">Mileage:</span>
//                         <span className="font-medium">{car.mileage?.toLocaleString()} km</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Engine:</span>
//                         <span className="font-medium">{car.engine}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Transmission:</span>
//                         <span className="font-medium">{car.transmission}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Fuel Type:</span>
//                         <span className="font-medium">{car.fuelType}</span>
//                       </div> */}
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="font-medium mb-3">Source Information</h4>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Source:</span>
//                         <span className="font-medium">{car.carSource}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Status:</span>
//                         <span className="font-medium">{car.status}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Added:</span>
//                         <span className="font-medium">
//                           {new Date(car.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                       {car.carSource === 'Investor' && car.investorId && (
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Investor ID:</span>
//                           <span className="font-medium">{car.investorId}</span>
//                         </div>
//                       )}
//                     </div>

//                     {/* <h4 className="font-medium mb-3 mt-6">Purchase Details</h4>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Buying Price:</span>
//                         <span className="font-medium">${car.buyingPrice?.toLocaleString()}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Purchase Date:</span>
//                         <span className="font-medium">
//                           {car.purchaseDate ? new Date(car.purchaseDate).toLocaleDateString() : 'N/A'}
//                         </span>
//                       </div>
//                     </div> */}
//                   </div>
//                 </div>
              

//                 {car?.financialDetails?.enableLease && (
//                   <div className="mt-6 pt-6 border-t border-border">
//                     <h4 className="font-medium mb-3">Lease Details</h4>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Lease Type:</span>
//                         <span className="font-medium">{car?.financialDetails?.leaseType}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Lease Amount:</span>
//                         <span className="font-medium">${car?.financialDetails?.leaseAmount?.toLocaleString()}</span>
//                       </div>
//                       {/* <div className="flex justify-between">
//                         <span className="text-muted-foreground">Lease Duration:</span>
//                         <span className="font-medium">{car?.financialDetails?.leaseDuration} months</span>
//                       </div> */}
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Financials Tab */}
//           {isAdmin && (
//             <TabsContent value="financials">
//               <Card className="bg-card border-border">
//                 <CardHeader>
//                   <CardTitle>Financial Overview</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div className="p-4 bg-secondary rounded-lg">
//                         <p className="text-sm text-muted-foreground mb-1">Buying Cost (Base)</p>
//                         <p className="text-2xl font-bold">BHD {car?.financialDetails?.buyingPrice?.toLocaleString()}</p>
//                       </div>
//                       <div className="p-4 bg-secondary rounded-lg">
//                         <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
//                         <p className="text-2xl font-bold text-destructive">
//                           BHD {totalExpenses.toLocaleString()}
//                         </p>
//                       </div>
//                       <div className="p-4 bg-secondary rounded-lg border border-primary/20">
//                         <p className="text-sm text-muted-foreground mb-1">Final Cost</p>
//                         <p className="text-2xl font-bold">BHD {car?.financialDetails?.buyingPrice?.toLocaleString()}</p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="p-4 bg-secondary rounded-lg">
//                         <p className="text-sm text-muted-foreground mb-1">Selling Price</p>
//                         <p className="text-2xl font-bold text-primary">
//                           BHD {car?.financialDetails?.askingPrice?.toLocaleString()}
//                         </p>
//                       </div>
//                       <div className="p-4 bg-secondary rounded-lg">
//                         <p className="text-sm text-muted-foreground mb-1">Gross Profit</p>
//                         <p className="text-2xl font-bold text-primary">
//                           BHD {car?.financialDetails?.askingPrice - car?.financialDetails?.buyingPrice}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="pt-4 border-t border-border">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <div className="space-y-3">
//                           <div className="flex justify-between items-center">
//                             <span className="text-muted-foreground text-sm">VAT (10%):</span>
//                             <span className="font-medium">
//                               BHD {(10 / 100) * (car?.financialDetails?.askingPrice - car?.financialDetails?.buyingPrice)}
//                             </span>
//                           </div>
//                           <div className="flex justify-between items-center">
//                             <span className="text-muted-foreground text-sm">Lease Income (Total):</span>
//                             <span className="font-medium text-green-500">
//                               BHD {(car.leaseEnabled && car.leaseAmount ? car.leaseAmount * (car.leaseDuration || 1) : 0).toLocaleString()}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 flex flex-col justify-center items-center">
//                           <span className="text-muted-foreground text-xs uppercase font-bold tracking-widest mb-1">Total Net Profit</span>
//                           <span className="text-4xl font-black text-primary">
//                             BHD {(car?.financialDetails?.askingPrice - car?.financialDetails?.buyingPrice) - (10 / 100) * (car?.financialDetails?.askingPrice - car?.financialDetails?.buyingPrice)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           )}

//           {/* Installments Tab */}
//           <TabsContent value="installments">
//             <Card className="bg-card border-border">
//               <CardHeader>
//                 <CardTitle>Payment Installments</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {carInstallments.length > 0 ? (
//                   <div className="space-y-3">
//                     {carInstallments.map((inst) => (
//                       <div
//                         key={inst.id}
//                         className="flex items-center justify-between p-4 bg-secondary rounded-lg"
//                       >
//                         <div>
//                           <p className="font-medium">
//                             {inst.type} Installment
//                           </p>
//                           <p className="text-sm text-muted-foreground">
//                             Due: {new Date(inst.dueDate).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-bold">${inst.amount.toLocaleString()}</p>
//                           <Badge
//                             variant={
//                               inst.status === 'Paid'
//                                 ? 'default'
//                                 : inst.status === 'Overdue'
//                                 ? 'destructive'
//                                 : 'secondary'
//                             }
//                           >
//                             {inst.status}
//                           </Badge>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-center text-muted-foreground py-8">
//                     No installments for this car
//                   </p>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Expenses Tab */}
//           <TabsContent value="expenses">
//             <Card className="bg-card border-border">
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <div>
//                   <CardTitle>Expense History</CardTitle>
//                   <CardDescription>Filtered money records for this vehicle</CardDescription>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-muted-foreground">Total Expenses</p>
//                   <p className="text-xl font-bold text-destructive">${totalExpenses.toLocaleString()}</p>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 {carExpenses.length > 0 ? (
//                   <div className="space-y-3">
//                     {carExpenses.map((record) => (
//                       <div
//                         key={record.id}
//                         className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:ring-1 hover:ring-primary/30 transition-all cursor-pointer group"
//                         onClick={() => onViewRecord && onViewRecord(record.id)}
//                       >
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2">
//                             <p className="font-bold text-foreground group-hover:text-primary transition-colors">{record.title}</p>
//                             <Badge variant="outline" className="text-[10px] bg-background">
//                               {record.payableStatus}
//                             </Badge>
//                           </div>
//                           <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
//                             <Calendar className="h-3 w-3" />
//                             {new Date(record.payableDate || record.createdAt).toLocaleDateString()}
//                             <span className="mx-1">•</span>
//                             <Wallet className="h-3 w-3" />
//                             {record.category}
//                           </p>
//                         </div>
//                         <div className="text-right ml-4">
//                           <p className="font-black text-lg text-foreground">${record.payableAmount?.toLocaleString()}</p>
//                           <Button variant="ghost" size="sm" className="h-7 text-[10px] mt-1">
//                             Details
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-center text-muted-foreground py-8 italic">
//                     No expense records found for this car.
//                   </p>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Documents Tab */}
//           <TabsContent value="documents">
//             <Card className="bg-card border-border">
//               <CardHeader>
//                 <CardTitle>Documents</CardTitle>
//                 <CardDescription>Upload and manage vehicle documents</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {/* Registration Document */}
//                   <div className="p-4 bg-secondary rounded-lg">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center gap-3">
//                         <FileText className="h-5 w-5 text-primary" />
//                         <div>
//                           <p className="font-medium">Registration Card</p>
//                           {car?.registrationCardPath && (
//                             <p className="text-sm text-muted-foreground">Registration Document</p>
//                           )}
//                         </div>
//                       </div>
//                       {car?.registrationCardPath && (
//                         <div className="flex items-center gap-2">
//                           <Button 
//                           onClick={() => handleDownload(car?.registrationCardPath)}
                          
//                           variant="ghost" size="sm">
//                             <Download className="h-4 w-4" />
//                           </Button>
//                           {isAdmin && (
//                             <Button 
//                               variant="ghost" 
//                               size="sm"
//                               onClick={() => handleDocumentRemove('registration')}
//                             >
//                               <X className="h-4 w-4 text-destructive" />
//                             </Button>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {!car?.registrationCardPath && isAdmin && (
//                       <div className="mt-2">
//                         <Input
//                           type="file"
//                           accept=".pdf,.jpg,.jpeg,.png"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) handleDocumentUpload('registration', file);
//                           }}
//                           disabled={uploadingDoc === 'registration'}
//                           className="cursor-pointer"
//                         />
//                         {uploadingDoc === 'registration' && (
//                           <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* CPR Document */}
//                   <div className="p-4 bg-secondary rounded-lg">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center gap-3">
//                         <FileText className="h-5 w-5 text-primary" />
//                         <div>
//                           <p className="font-medium">CPR Document</p>
//                           {car?.cprDocumentPath && (
//                             <p className="text-sm text-muted-foreground">CPR Document</p>
//                           )}
//                         </div>
//                       </div>
//                       {car?.cprDocumentPath && (
//                         <div className="flex items-center gap-2">
//                           <Button 
//                             variant="ghost" 
//                             size="sm"
//                             onClick={() => handleDownload(car?.cprDocumentPath)}
//                           >
//                             <Download className="h-4 w-4" />
//                           </Button>
//                           {isAdmin && (
//                             <Button 
//                               variant="ghost" 
//                               size="sm"
//                               onClick={() => handleDocumentRemove('cpr')}
//                             >
//                               <X className="h-4 w-4 text-destructive" />
//                             </Button>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {!car?.cprDocumentPath && isAdmin && (
//                       <div className="mt-2">
//                         <Input
//                           type="file"
//                           accept=".pdf,.jpg,.jpeg,.png"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) handleDocumentUpload('cpr', file);
//                           }}
//                           disabled={uploadingDoc === 'cpr'}
//                           className="cursor-pointer"
//                         />
//                         {uploadingDoc === 'cpr' && (
//                           <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* Insurance Document */}
//                   <div className="p-4 bg-secondary rounded-lg">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center gap-3">
//                         <FileText className="h-5 w-5 text-primary" />
//                         <div>
//                           <p className="font-medium">Insurance</p>
//                           {car?.insuranceDocumentPath && (
//                             <p className="text-sm text-muted-foreground">Insurance Document</p>
//                           )}
//                         </div>
//                       </div>
//                       {car?.insuranceDocumentPath && (
//                         <div className="flex items-center gap-2">
//                           <Button 
//                             variant="ghost" 
//                             size="sm"
//                             onClick={() => handleDownload(car?.insuranceDocumentPath)}
//                           >
//                             <Download className="h-4 w-4" />
//                           </Button>
//                           {isAdmin && (
//                             <Button 
//                               variant="ghost" 
//                               size="sm"
//                               onClick={() => handleDocumentRemove('insurance')}
//                             >
//                               <X className="h-4 w-4 text-destructive" />
//                             </Button>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {!car?.insuranceDocumentPath && isAdmin && (
//                       <div className="mt-2">
//                         <Input
//                           type="file"
//                           accept=".pdf,.jpg,.jpeg,.png"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) handleDocumentUpload('insurance', file);
//                           }}
//                           disabled={uploadingDoc === 'insurance'}
//                           className="cursor-pointer"
//                         />
//                         {uploadingDoc === 'insurance' && (
//                           <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* Additional Documents */}
//                   {Object.keys(documents)
//                     .filter(key => !['registration', 'cpr', 'insurance'].includes(key))
//                     .map(key => (
//                       <div key={key} className="p-4 bg-secondary rounded-lg">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <FileText className="h-5 w-5 text-primary" />
//                             <div>
//                               <p className="font-medium capitalize">{key.replace(/-/g, ' ')}</p>
//                               <p className="text-sm text-muted-foreground">{documents[key]}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Button variant="ghost" size="sm">
//                               <Download className="h-4 w-4" />
//                             </Button>
//                             {isAdmin && (
//                               <Button 
//                                 variant="ghost" 
//                                 size="sm"
//                                 onClick={() => handleDocumentRemove(key)}
//                               >
//                                 <X className="h-4 w-4 text-destructive" />
//                               </Button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}

//                   {/* Add More Button */}
//                   {isAdmin && (
//                     <div className="pt-2">
//                       {!isAddingOther ? (
//                         <Button 
//                           variant="outline" 
//                           className="w-full border-dashed border-primary/50 text-primary hover:bg-primary/5"
//                           onClick={() => setIsAddingOther(true)}
//                         >
//                           <Upload className="h-4 w-4 mr-2" />
//                           Upload More Document (Optional)
//                         </Button>
//                       ) : (
//                         <Card className="bg-background border-primary/30 p-4">
//                           <div className="space-y-4">
//                             <div>
//                               <label className="text-sm font-medium mb-1.5 block">Document Name</label>
//                               <Input 
//                                 placeholder="e.g. Export Certificate, Service History..." 
//                                 value={newDocName}
//                                 onChange={(e) => setNewDocName(e.target.value)}
//                                 className="bg-secondary"
//                               />
//                             </div>
//                             <div>
//                               <label className="text-sm font-medium mb-1.5 block">Select File</label>
//                               <Input
//                                 type="file"
//                                 accept=".pdf,.jpg,.jpeg,.png"
//                                 onChange={(e) => {
//                                   const file = e.target.files?.[0];
//                                   if (file && newDocName) {
//                                     handleDocumentUpload(newDocName.toLowerCase().replace(/\s+/g, '-'), file);
//                                   }
//                                 }}
//                                 disabled={!newDocName || uploadingDoc !== null}
//                                 className="cursor-pointer"
//                               />
//                             </div>
//                             <div className="flex justify-end">
//                               <Button variant="ghost" size="sm" onClick={() => setIsAddingOther(false)}>
//                                 Cancel
//                               </Button>
//                             </div>
//                           </div>
//                         </Card>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Timeline Tab */}
//           <TabsContent value="timeline">
//             <Card className="bg-card border-border">
//               <CardHeader>
//                 <CardTitle>Activity Timeline</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {timelineEvents.map((event) => (
//                     <div key={event.id} className="flex gap-4">
//                       <div className="flex flex-col items-center">
//                         <div className="w-3 h-3 rounded-full bg-primary"></div>
//                         <div className="w-0.5 h-full bg-border"></div>
//                       </div>
//                       <div className="flex-1 pb-4">
//                         <div className="flex items-center gap-2 mb-1">
//                           <Badge variant="outline">{event.type}</Badge>
//                           <span className="text-xs text-muted-foreground">
//                             {new Date(event.timestamp).toLocaleDateString()}
//                           </span>
//                         </div>
//                         <p className="text-sm">{event.description}</p>
//                         <p className="text-xs text-muted-foreground mt-1">by {event.user}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Input } from '@/app/components/ui/input';
import { mockMoneyRecords } from '@/types/money-record';
import { mockInstallments } from '@/data/mockData';
import { ArrowLeft, Edit, FileText, Download, Wallet, Calendar, Upload, X, Loader2 } from 'lucide-react';
import { leaseCar } from '../api/CarInventory/leaseCar';
import { getInventory } from '@/app/api/CarInventory/getById';
import { Car, UserRole } from '@/types';
import { CarImageGallery } from '@/app/components/carGallary';
import {uploadAdditoinal} from "@/app/api/AdditionalDocx/additional";
import { uploadImage } from "@/app/api/UploadImage/uploadImage";
import { add, set } from 'date-fns';

interface CarDetailsProps {
  car?: Car | string;  // Can be Car object or string ID
  userRole: UserRole;
  onBack: () => void;
 onEdit?: (carData: Car) => void;  // Add car parameter
  onViewRecord?: (record: any) => void;
  onSellCar?: (car: Car) => void;
  onLeaseCar?: (car: Car) => void;
  onAddExpense?: (car: Car) => void;
}

export function CarDetails({ 
  car, 
  userRole, 
  onBack, 
  onEdit, 
  onViewRecord, 
  onSellCar, 
  onLeaseCar, 
  onAddExpense 
}: CarDetailsProps) {
  
  // State for loading and car data
  const [isLoading, setIsLoading] = useState(false);
  const [carData, setCarData] = useState<Car | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
   const [imageUploading, setImageUploading] = useState(false);

  console.log("Car prop received in CarDetails:", carData);
  
  // Determine if we have a car object or need to fetch
  const isCarObject = car && typeof car === 'object' && 'id' in car;
  const carId = isCarObject ? car.id : (typeof car === 'string' ? car : null);
  
  // Effect to fetch car data if ID is provided as string
  useEffect(() => {
    
    
    fetchCarData();
  }, [car]); // Re-run when car prop changes

  const fetchCarData = async () => {
      if (typeof car === 'string' && car) {
        setIsLoading(true);
        setFetchError(null);
        try {
          const response = await getInventory(car);
          setCarData(response);
          console.log("Fetched car details:", response);
        } catch (error) {
          console.error("Error fetching car details:", error);
          setFetchError("Failed to load car details. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else if (isCarObject) {
        // If car is already an object, use it directly
        setCarData(car as Car);
        console.log("Using provided car object:", car);
      }
    };
  
  const carMoneyRecords = mockMoneyRecords.filter((r) => r.linkedToId === carData?.id);
  const carExpenses = carMoneyRecords.filter(r => r.isPayable && r.category === 'Expense');
  const carInstallments = mockInstallments.filter((i) => i.carId === carData?.id);
  
  // Document state
  const [documents, setDocuments] = useState(carData?.documents || {});
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const [isAddingOther, setIsAddingOther] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
  
  // Update documents when carData changes
  useEffect(() => {
    if (carData?.documents) {
      setDocuments(carData.documents);
    }
  }, [carData]);

  const uploadAdditionalDocument = async (docType: string, file: File) => {
    setUploadingDoc(docType);
    try {
      const response = await uploadAdditoinal(carData?.id || '', docType, file);
      if (response.success) {
        setDocuments(prev => ({
          ...prev,
          [docType]: response.documentUrl
        }));
      } else {
        console.error("Failed to upload document:", response.message);
        alert("Failed to upload document. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("An error occurred while uploading. Please try again.");
    } finally {
      setUploadingDoc(null);
      setIsAddingOther(false);
      setNewDocName('');
    }
  };


  
  // const handleDocumentUpload = (docType: any, file: any) => {
  //   setUploadingDoc(docType);
    
  //   // Simulate file upload
  //   setTimeout(() => {
  //     setDocuments(prev => ({
  //       ...prev,
  //       [docType]: file.name
  //     }));
  //     setUploadingDoc(null);
  //     setIsAddingOther(false);
  //     setNewDocName('');
  //   }, 1000);
  // };
  
  const handleDocumentUpload = async (docType: any, file: any) => {
  setUploadingDoc(docType);
  setImageUploading(true);
  
  try {
    // Step 1: Upload the image first
    const uploadResult = await uploadImage(file);
    
    // Get the URL from upload result
    const documentUrl = uploadResult?.url || uploadResult;
    console.log("Image uploaded, URL:", documentUrl);
    
    if (!documentUrl) {
      throw new Error("Failed to get image URL");
    }
    
    // Step 2: Call your additional document API
    const requestBody = {
      carId: car, // Make sure 'car' variable exists (maybe rename to carId)
      documentName: docType,
      documentUrl: documentUrl
    };

    console.log("Sending request:", requestBody);
    
    // This now returns the parsed response, not the fetch Response object
    const result = await uploadAdditoinal(requestBody);
    
    // If we get here, upload was successful
    console.log("Upload successful:", result);
    
    // Step 3: Update UI state on success
    setDocuments(prev => ({
      ...prev,
      [docType]: file.name
    }));
    
    setIsAddingOther(false);
    setNewDocName('');
    
    // Optional: Show success message
    alert("Document uploaded successfully!");
    setImageUploading(false);
     fetchCarData();
    
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Failed to upload document. Please try again.");
    setImageUploading(false);
  } finally {
    setUploadingDoc(null);
    setImageUploading(false);
  }
};
  const handleDocumentRemove = (docType: any) => {
    setDocuments(prev => {
      const updated = { ...prev };
      delete updated[docType];
      return updated;
    });
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
        <div className="bg-card p-8 rounded-xl border border-border text-center max-w-md">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Loading Car Details</h2>
          <p className="text-muted-foreground">
            Please wait while we fetch the vehicle information...
          </p>
        </div>
      </div>
    );
  }

{imageUploading && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-700 font-medium">Uploading document...</p>
      <p className="text-gray-500 text-sm mt-2">Please wait</p>
    </div>
  </div>
)}
  
  // Error state
  if (fetchError) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
        <div className="bg-card p-8 rounded-xl border border-border text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-destructive">Error Loading Car</h2>
          <p className="text-muted-foreground mb-6">{fetchError}</p>
          <Button onClick={onBack}>Return to Inventory</Button>
        </div>
      </div>
    );
  }
  
  // Check if we have car data to display
  if (!carData || !isAdmin) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
        <div className="bg-card p-8 rounded-xl border border-border text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
          <p className="text-muted-foreground mb-6">
            Detailed vehicle views are only available to Administrative roles. Please contact your manager if you require access.
          </p>
          <Button onClick={onBack}>Return to Inventory</Button>
        </div>
      </div>
    );
  }

  const totalExpenses = carExpenses.reduce((sum, exp) => sum + (exp.payableAmount || 0), 0);
  const totalBuyingCost = (carData.financialDetails?.buyingPrice || 0) + totalExpenses;
  const estimatedProfit = (carData.financialDetails?.askingPrice || 0) - totalBuyingCost;

  // const timelineEvents = [
  //   { id: '1', type: 'Created', description: 'Car added to inventory', timestamp: carData.createdAt, user: 'Admin' },
  //   { id: '2', type: 'Expense', description: 'Oil change and brake service - $1,200', timestamp: '2025-01-20', user: 'Admin' },
  //   { id: '3', type: 'Expense', description: 'Front bumper repair - $850', timestamp: '2025-01-25', user: 'Technician' },
  // ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-primary text-primary-foreground';
      case 'Sold':
        return 'bg-green-600 text-white';
      case 'Leased':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleDownload = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

        // Helper function to generate timeline events from car data
      const generateTimelineEvents = (carData: any) => {
        const events = [];

        // 1. Car Added to Inventory
        if (carData.createdAt) {
          events.push({
            id: `created-${carData.id}`,
            type: "Car Added",
            description: `Car added to inventory: ${carData.make} ${carData.model} (${carData.year})`,
            timestamp: carData.createdAt,
            user: "Admin",
            category: "inventory"
          });
        }

        // 2. Purchase Installments Events
        if (carData.purchaseInstallments && carData.purchaseInstallments.length > 0) {
          carData.purchaseInstallments.forEach((installment: any) => {
            if (installment.paidDate) {
              events.push({
                id: `purchase-installment-${installment.id}`,
                type: "Purchase Payment",
                description: `Purchase installment #${installment.installmentNumber} paid: ${installment.amount.toLocaleString()}`,
                timestamp: installment.paidDate,
                user: "Admin",
                category: "expense",
                amount: installment.amount
              });
            }
          });
        }

        // 3. Lease Events - FIXED: Don't require "Completed" status
        if (carData.lease) {
          // Only show active/completed leases, not pending/cancelled
          if (carData.lease.status !== "Pending" && carData.lease.status !== "Cancelled") {
            
            // Lease created event (when agreement was made)
            if (carData.lease.createdAt) {
              events.push({
                id: `lease-created-${carData.lease.id}`,
                type: "Lease Created",
                description: `Lease agreement created for ${carData.lease.fullName} (${carData.lease.leaseType} lease, ${carData.lease.durationDays} days)`,
                timestamp: carData.lease.createdAt,
                user: "Admin",
                category: "lease",
                amount: carData.lease.totalLeaseValue
              });
            }

            // Lease start event (when car was handed over)
            if (carData.lease.leaseStartDate) {
              events.push({
                id: `lease-start-${carData.lease.id}`,
                type: "Lease Started",
                description: `Lease started for ${carData.lease.fullName} - Rate: ${carData.lease.leaseRate}/day`,
                timestamp: carData.lease.leaseStartDate,
                user: "System",
                category: "lease"
              });
            }

            // First lease payment (show separately if needed)
            if (carData.lease.payments && carData.lease.payments.length > 0) {
              // Show all payments
              carData.lease.payments.forEach((payment: any, index: number) => {
                if (payment.paymentDate) {
                  events.push({
                    id: `lease-payment-${carData.lease.id}-${index}`,
                    type: index === 0 ? "First Lease Payment" : "Lease Payment",
                    description: `${index === 0 ? "First " : ""}Lease payment received: ${payment.amount.toLocaleString()} (${payment.paymentMethod})`,
                    timestamp: payment.paymentDate,
                    user: "Customer",
                    category: "income",
                    amount: payment.amount,
                    paymentMethod: payment.paymentMethod
                  });
                }
              });
            }

            // Lease end event (when completed or ended)
            if (carData.lease.leaseEndDate && carData.lease.status === "Completed") {
              events.push({
                id: `lease-end-${carData.lease.id}`,
                type: "Lease Completed",
                description: `Lease completed successfully - Total value: ${carData.lease.totalLeaseValue.toLocaleString()}`,
                timestamp: carData.lease.leaseEndDate,
                user: "System",
                category: "lease"
              });
            }
          }
        }

        // 4. Sale Events - FIXED: Don't require "Completed" status
        if (carData.sale) {
          // Only show active/completed sales, not pending/cancelled
          if (carData.sale.status !== "Pending" && carData.sale.status !== "Cancelled") {
            
            // Sale created event (when sale agreement was made)
            if (carData.sale.createdAt) {
              events.push({
                id: `sale-created-${carData.sale.id}`,
                type: "Car Sold",
                description: `Car sold to ${carData.sale.purchaserName} for ${carData.sale.sellingPrice.toLocaleString()}`,
                timestamp: carData.sale.createdAt,
                user: "Admin",
                category: "sale",
                amount: carData.sale.sellingPrice,
                profit: carData.sale.profit
              });
            }

            // Sale installments payments
            if (carData.sale.installments && carData.sale.installments.length > 0) {
              carData.sale.installments.forEach((installment: any) => {
                if (installment.paidDate) {
                  // Mark first installment specially
                  const isFirstInstallment = installment.installmentNumber === 1;
                  events.push({
                    id: `sale-installment-${installment.id}`,
                    type: isFirstInstallment ? "First Sale Payment" : "Sale Payment",
                    description: `${isFirstInstallment ? "First " : ""}Sale installment #${installment.installmentNumber} received: ${installment.amount.toLocaleString()}`,
                    timestamp: installment.paidDate,
                    user: "Customer",
                    category: "income",
                    amount: installment.amount,
                    installmentNumber: installment.installmentNumber
                  });
                }
              });
            }

            // Sale completion event
            if (carData.sale.completedAt && carData.sale.status === "Completed") {
              events.push({
                id: `sale-completed-${carData.sale.id}`,
                type: "Sale Completed",
                description: `Sale completed. Total paid: ${carData.sale.sellingPrice.toLocaleString()}`,
                timestamp: carData.sale.completedAt,
                user: "System",
                category: "sale"
              });
            }
          }
        }

        // 5. Money Records (Expenses)
        if (carData.moneyRecords && carData.moneyRecords.length > 0) {
          carData.moneyRecords.forEach((record: any) => {
            if (record.createdAt) {
              const isExpense = record.payableAmount;
              events.push({
                id: `money-record-${record.id}`,
                type: isExpense ? "Expense" : "Income",
                description: `${isExpense ? "Expense" : "Income"}: ${record.description || 'Transaction'} - ${Math.abs(record.payableAmount).toLocaleString()}`,
                timestamp: record.createdAt,
                user: record.createdBy || "Admin",
                category: isExpense ? "expense" : "income",
                amount: record.payableAmount,
                payableAmount: record.payableAmount || null
              });
            }
          });
        }

        // Sort events by timestamp (oldest to newest for proper timeline order)
        events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        return events;
      };

//   // Helper function to generate timeline events from car data
// const generateTimelineEvents = (carData: any) => {
//   const events = [];

//   // 1. Car Added to Inventory
//   if (carData.createdAt) {
//     events.push({
//       id: `created-${carData.id}`,
//       type: "Car Added",
//       description: `Car added to inventory: ${carData.make} ${carData.model} (${carData.year})`,
//       timestamp: carData.createdAt,
//       user: "Admin",
//       category: "inventory"
//     });
//   }

//   // 2. Purchase Installments Events
//   if (carData.purchaseInstallments && carData.purchaseInstallments.length > 0) {
//     carData.purchaseInstallments.forEach((installment: any) => {
//       if (installment.paidDate) {
//         events.push({
//           id: `purchase-installment-${installment.id}`,
//           type: "Purchase Payment",
//           description: `Purchase installment #${installment.installmentNumber} paid: ${installment.amount.toLocaleString()}`,
//           timestamp: installment.paidDate,
//           user: "Admin",
//           category: "expense",
//           amount: installment.amount
//         });
//       }
//     });
//   }

//   // 3. Lease Events
//   if (carData.lease && carData.lease.status === "Completed") {
//     // Lease created event
//     if (carData.lease.createdAt) {
//       events.push({
//         id: `lease-created-${carData.lease.id}`,
//         type: "Lease Created",
//         description: `Lease agreement created for ${carData.lease.fullName} (${carData.lease.leaseType} lease, ${carData.lease.durationDays} days)`,
//         timestamp: carData.lease.createdAt,
//         user: "Admin",
//         category: "lease",
//         amount: carData.lease.totalLeaseValue
//       });
//     }

//     // Lease start event
//     if (carData.lease.leaseStartDate) {
//       events.push({
//         id: `lease-start-${carData.lease.id}`,
//         type: "Lease Started",
//         description: `Lease started for ${carData.lease.fullName} - Rate: ${carData.lease.leaseRate}/day`,
//         timestamp: carData.lease.leaseStartDate,
//         user: "System",
//         category: "lease"
//       });
//     }

//     // Lease payments
//     if (carData.lease.payments && carData.lease.payments.length > 0) {
//       carData.lease.payments.forEach((payment: any, index: number) => {
//         if (payment.paymentDate) {
//           events.push({
//             id: `lease-payment-${carData.lease.id}-${index}`,
//             type: "Lease Payment",
//             description: `Lease payment received: ${payment.amount.toLocaleString()} (${payment.paymentMethod})`,
//             timestamp: payment.paymentDate,
//             user: "Customer",
//             category: "income",
//             amount: payment.amount,
//             paymentMethod: payment.paymentMethod
//           });
//         }
//       });
//     }

//     // Lease end event
//     if (carData.lease.leaseEndDate) {
//       events.push({
//         id: `lease-end-${carData.lease.id}`,
//         type: "Lease Completed",
//         description: `Lease completed successfully - Total value: ${carData.lease.totalLeaseValue.toLocaleString()}`,
//         timestamp: carData.lease.leaseEndDate,
//         user: "System",
//         category: "lease"
//       });
//     }
//   }

//   // 4. Sale Events
//   if (carData.sale && carData.sale.status === "Completed") {
//     // Sale created event
//     if (carData.sale.createdAt) {
//       events.push({
//         id: `sale-created-${carData.sale.id}`,
//         type: "Car Sold",
//         description: `Car sold to ${carData.sale.purchaserName} for ${carData.sale.sellingPrice.toLocaleString()} `,
//         timestamp: carData.sale.createdAt,
//         user: "Admin",
//         category: "sale",
//         amount: carData.sale.sellingPrice,
//         profit: carData.sale.profit
//       });
//     }

//     // Sale installments payments
//     if (carData.sale.installments && carData.sale.installments.length > 0) {
//       carData.sale.installments.forEach((installment: any) => {
//         if (installment.paidDate) {
//           events.push({
//             id: `sale-installment-${installment.id}`,
//             type: "Sale Payment",
//             description: `Sale installment #${installment.installmentNumber} received: ${installment.amount.toLocaleString()}`,
//             timestamp: installment.paidDate,
//             user: "Customer",
//             category: "income",
//             amount: installment.amount,
//             installmentNumber: installment.installmentNumber
//           });
//         }
//       });
//     }
//   }

//   // 5. Money Records (Expenses)
//   if (carData.moneyRecords && carData.moneyRecords.length > 0) {
//     carData.moneyRecords.forEach((record: any) => {
//       if (record.createdAt) {
//         const isExpense = record.payableAmount;
//         events.push({
//           id: `money-record-${record.id}`,
//           type: isExpense ? "Expense" : "Income",
//           description: `${isExpense ? "Expense" : "Income"}: ${record.description || 'Transaction'} - ${Math.abs(record.payableAmount).toLocaleString()}`,
//           timestamp: record.createdAt,
//           user: record.createdBy || "Admin",
//           category: isExpense ? "expense" : "income",
//           amount: record.payableAmount,
//           payableAmount: record.payableAmount || null
//         });
//       }
//     });
//   }

//   // Sort events by timestamp (oldest to newest for proper timeline order)
//   events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

//   return events;
// };

 
          const timelineEvents = generateTimelineEvents(carData);

          // const imageUrls = carData?.carImagePath?.split(',').filter(url => url?.trim()) || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Inventory
        
          </Button>
          {isAdmin && onEdit && (
             <Button onClick={() => onEdit(carData)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Car
            </Button>
          )}
        </div>

        {/* Top Section */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image */}
              <div className="relative h-80 bg-secondary rounded-lg overflow-hidden">
                <img
                  src={carData?.carImagePath?.[0] || '/placeholder-car.jpg'}
                  alt={`${carData?.make} ${carData?.model}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-car.jpg';
                  }}
                />
                {/* <CarImageGallery 
                  images={carData.carImagePath} 
                  alt={`${carData.make} ${carData.model}`}
                /> */}
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {carData?.make} {carData?.model}
                  </h1>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(carData?.status)}>{carData?.status}</Badge>
                    <Badge variant="outline">{carData?.carSource}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{carData?.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-medium">{carData?.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">VIN</p>
                    <p className="font-medium text-sm">{carData?.vin ? carData.vin : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registration</p>
                    <p className="font-medium">{carData?.registrationNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                  <p className="text-sm text-muted-foreground mb-1">Asking Price</p>
                  <p className="text-3xl font-bold text-primary">
                    BHD {carData?.financialDetails?.askingPrice?.toLocaleString()}
                  </p>
                  </div>

                  {
                    carData?.sale && (
                
                   <div>
                  <p className="text-sm text-muted-foreground mb-1">Sold Price</p>
                  <p className="text-3xl font-bold text-primary">
                    BHD {carData?.sale?.sellingPrice?.toLocaleString()}
                  </p>
                  </div>
                    )
}

                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-card">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="financials">Financials</TabsTrigger>
            )}
            <TabsTrigger value="installments">Installments</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Basic Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Make:</span>
                        <span className="font-medium">{carData?.make}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Model:</span>
                        <span className="font-medium">{carData?.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year:</span>
                        <span className="font-medium">{carData?.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Color:</span>
                        <span className="font-medium">{carData?.color}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Source Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Source:</span>
                        <span className="font-medium">{carData?.carSource}</span>
                      </div>
                       <div className="flex justify-between">
                        <span className="text-muted-foreground">{carData?.carSource === "Company Car" ? "Company Name:" : carData?.carSource === "Investor" ? "Investor Name:" : carData.carSource === "Customer" ? "Customer Name:" : "Source Name"}</span>
                        <span className="font-medium">{carData?.company?.name || carData?.investor?.investorName || carData?.customer?.customerName || carData?.carSource}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium">{carData?.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Added:</span>
                        <span className="font-medium">
                          {carData?.createdAt ? new Date(carData.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      {carData?.carSource === 'Investor' && carData?.investorId && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investor ID:</span>
                          <span className="font-medium">{carData.investorId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              
                {carData?.financialDetails?.enableLease && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-medium mb-3">Lease Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lease Type:</span>
                        <span className="font-medium">{carData?.lease?.leaseType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lease Amount:</span>
                        <span className="font-medium">BHD {carData?.financialDetails?.leaseAmount?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financials Tab */}
          {isAdmin && (
            <TabsContent value="financials">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Buying Cost (Base)</p>
                        <p className="text-2xl font-bold">BHD {carData?.financialDetails?.buyingPrice?.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                        <p className="text-2xl font-bold text-destructive">
                          BHD {carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">Final Cost</p>
                        <p className="text-2xl font-bold">BHD {carData?.financialDetails?.buyingPrice + carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Asking Price</p>
                        <p className="text-2xl font-bold text-primary">
                          BHD {carData?.financialDetails?.askingPrice?.toLocaleString()}
                        </p>
                      </div>

                       {
                    carData?.sale && (
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Sold Price</p>
                        <p className="text-2xl font-bold text-primary">
                         BHD {carData?.sale?.sellingPrice?.toLocaleString()}
                        </p>
                      </div>
                
                  
                    )
}
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Gross Profit</p>
                        { carData?.sale ?
                        <p className="text-2xl font-bold text-primary">
                          BHD {(carData?.sale?.sellingPrice || 0) - (carData?.financialDetails?.buyingPrice + carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0))}
                        </p>
                        : 
                       <p className="text-2xl font-bold text-primary">
                          BHD {(carData?.financialDetails?.askingPrice || 0) - (carData?.financialDetails?.buyingPrice + carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0))}
                        </p>
}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground text-sm">VAT (10%):</span>
                            {carData?.sale ?  

                            <span className="font-medium">
                              BHD {(10 / 100) * ((carData?.sale?.sellingPrice || 0) - (carData?.financialDetails?.buyingPrice + carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0)))}
                            </span>


                              :
                            <span className="font-medium">
                              BHD {(10 / 100) * ((carData?.financialDetails?.askingPrice || 0) - (carData?.financialDetails?.buyingPrice + carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0)))}
                            </span>
}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground text-sm">Lease Income (Total):</span>
                            {carData?.lease && carData?.lease?.payments ? 
                            <span className="font-medium text-green-500">
                              BHD {carData.lease.payments.reduce((sum, payment) => sum + (payment.amount || 0), 0).toLocaleString()}
                            </span>

                            :
                            <span className="font-medium text-green-500">
                              BHD {(carData?.financialDetails?.enableLease && carData?.financialDetails?.leaseAmount ? 
                                carData.financialDetails.leaseAmount * (carData.financialDetails.leaseDuration || 1) : 0).toLocaleString()}
                            </span>


// {carData.lease.payments.reduce((sum, payment) => sum + (payment.amount || 0), 0).toLocaleString()}
                            
                          
                          }
                            
                          </div>
                        </div>
                        <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 flex flex-col justify-center items-center">
                          <span className="text-muted-foreground text-xs uppercase font-bold tracking-widest mb-1">Est. Total Net Profit</span>
                          {carData?.sale ?  
                            <span className="text-4xl font-black text-primary">
                              BHD {((carData?.sale?.sellingPrice || 0) - (carData?.financialDetails?.buyingPrice + carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0))) - 
                                (10 / 100) * ((carData?.sale?.sellingPrice || 0) - (carData?.financialDetails?.buyingPrice + carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0)))  } 
                            </span>
                            :
                            <span className="text-4xl font-black text-primary">
                              BHD {((carData?.financialDetails?.askingPrice || 0) - (carData?.financialDetails?.buyingPrice + carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0))) - 
                                (10 / 100) * ((carData?.financialDetails?.askingPrice || 0) - (carData?.financialDetails?.buyingPrice + carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0)))}
                            </span>
                          }
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Rest of your tabs remain the same but use carData instead of car */}
          {/* Installments Tab */}
           <TabsContent value="installments">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Payment Installments</CardTitle>
              </CardHeader>
              <CardContent>
                {carData.purchaseInstallments.length > 0 ? (
                  <div className="space-y-3">
                    {carData.purchaseInstallments.map((inst) => (
                      <div
                        key={inst.id}
                        className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {inst.type} Installment
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {inst.isPaid? "Paid on " + new Date(inst.paidDate!).toLocaleDateString() : "Due: " + new Date(inst.dueDate).toLocaleDateString()} 
                            
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">BHD {inst.amount.toLocaleString()}</p>
                          <Badge
                            variant={
                              inst.isPaid 
                                ? 'default'
                                : 'destructive'
                               
                            }
                          >
                            {inst.isPaid? "Paid" : "Unpaid"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No installments for this car
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent> 

          {/* Expenses Tab */}
          <TabsContent value="expenses">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Expense History</CardTitle>
                  <CardDescription>Filtered money records for this vehicle</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-xl font-bold text-destructive">BHD {carData?.moneyRecords.reduce((total, record) => total + (record.payableAmount || 0), 0).toLocaleString()}</p>
                </div>
              </CardHeader>
              <CardContent>
                {carData?.moneyRecords.length > 0 ? (
                  <div className="space-y-3">
                    {carData?.moneyRecords.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:ring-1 hover:ring-primary/30 transition-all cursor-pointer group"
                        onClick={() => onViewRecord && onViewRecord(record)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">{record.title}</p>
                            <Badge variant="outline" className="text-[10px] bg-background">
                              {record.payableStatus}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(record.payableDate || record.createdAt).toLocaleDateString()}
                            <span className="mx-1">•</span>
                            <Wallet className="h-3 w-3" />
                            {record.category}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-black text-lg text-foreground">BHD {record.payableAmount?.toLocaleString()}</p>
                          {/* <Button variant="ghost" size="sm" className="h-7 text-[10px] mt-1">
                            Details
                          </Button> */}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8 italic">
                    No expense records found for this car.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab - Update to use carData */}
          <TabsContent value="documents">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Upload and manage vehicle documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Registration Document */}
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Registration Card</p>
                          {carData?.registrationCardPath && (
                            <p className="text-sm text-muted-foreground">Registration Document</p>
                          )}
                        </div>
                      </div>
                      {carData?.registrationCardPath && (
                        <div className="flex items-center gap-2">
                          <Button 
                            onClick={() => handleDownload(carData?.registrationCardPath)}
                            variant="ghost" 
                            size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {/* {isAdmin && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDocumentRemove('registration')}
                            >
                              <X className="h-4 w-4 text-destructive" />
                            </Button>
                          )} */}
                        </div>
                      )}
                    </div>
                    {!carData?.registrationCardPath && isAdmin && (
                      <div className="mt-2">
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleDocumentUpload('registration', file);
                          }}
                          disabled={uploadingDoc === 'registration'}
                          className="cursor-pointer"
                        />
                        {uploadingDoc === 'registration' && (
                          <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CPR Document */}
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">CPR Document</p>
                          {carData?.cprDocumentPath && (
                            <p className="text-sm text-muted-foreground">CPR Document</p>
                          )}
                        </div>
                      </div>
                      {carData?.cprDocumentPath && (
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownload(carData?.cprDocumentPath)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          {/* {isAdmin && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDocumentRemove('cpr')}
                            >
                              <X className="h-4 w-4 text-destructive" />
                            </Button>
                          )} */}
                        </div>
                      )}
                    </div>
                    {!carData?.cprDocumentPath && isAdmin && (
                      <div className="mt-2">
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleDocumentUpload('cpr', file);
                          }}
                          disabled={uploadingDoc === 'cpr'}
                          className="cursor-pointer"
                        />
                        {uploadingDoc === 'cpr' && (
                          <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Insurance Document */}
                  {/* <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Insurance</p>
                          {carData?.insuranceDocumentPath && (
                            <p className="text-sm text-muted-foreground">Insurance Document</p>
                          )}
                        </div>
                      </div>
                      {carData?.insuranceDocumentPath && (
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownload(carData?.insuranceDocumentPath)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          {isAdmin && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDocumentRemove('insurance')}
                            >
                              <X className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    {!carData?.insuranceDocumentPath && isAdmin && (
                      <div className="mt-2">
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleDocumentUpload('insurance', file);
                          }}
                          disabled={uploadingDoc === 'insurance'}
                          className="cursor-pointer"
                        />
                        {uploadingDoc === 'insurance' && (
                          <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
                        )}
                      </div>
                    )}
                  </div> */}
<p className="font-medium capitalize">Additional Documents</p>
                  {/* Additional Documents */}
                  {carData?.additionalDocuments
  .filter(doc => !['registration', 'cpr',].includes(doc.documentName))
  .map(doc => (
    <div key={doc.id} className="p-4 bg-secondary rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium capitalize">{doc.documentName.replace(/-/g, ' ')}</p>
            <p className="text-sm text-muted-foreground">
              Uploaded: {new Date(doc.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.open(doc.documentUrl, '_blank')}
          >
            <Download className="h-4 w-4" />
          </Button>
          {/* {isAdmin && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleDocumentRemove(doc.id)}
            >
              <X className="h-4 w-4 text-destructive" />
            </Button>
          )} */}
        </div>
      </div>
    </div>
  ))}

{carData?.sale && (
  <>
    <p className="font-medium capitalize">Purchaser Document</p>
    <div  className="p-4 bg-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium capitalize">CPR Document</p>
                <p className="text-sm text-muted-foreground">
                  CPR No: {carData?.sale?.cpr}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open(carData?.sale?.cprDocumentUploadPath, '_blank')}
              >
                <Download className="h-4 w-4" />
              </Button>
              {/* {isAdmin && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDocumentRemove(doc.id)}
                >
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              )} */}
            </div>
          </div>
        </div>
        </>
)}



                  {/* Add More Button */}
                  {isAdmin && (
                    <div className="pt-2">
                      {!isAddingOther ? (
                        <Button 
                          variant="outline" 
                          className="w-full border-dashed border-primary/50 text-primary hover:bg-primary/5"
                          onClick={() => setIsAddingOther(true)}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload More Document (Optional)
                        </Button>
                      ) : (
                        <Card className="bg-background border-primary/30 p-4">
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Document Name</label>
                              <Input 
                                placeholder="e.g. Export Certificate, Service History..." 
                                value={newDocName}
                                onChange={(e) => setNewDocName(e.target.value)}
                                className="bg-secondary"
                              />
                            </div>
                            {/* <div>
                              <label className="text-sm font-medium mb-1.5 block">Select File</label>
                              <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file && newDocName) {
                                    handleDocumentUpload(newDocName.toLowerCase().replace(/\s+/g, '-'), file);
                                  }
                                }}
                                disabled={!newDocName || uploadingDoc !== null}
                                className="cursor-pointer"
                              />
                            </div> */}
<div>
                            <label className="text-sm font-medium mb-1.5 block">Select File</label>
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file && newDocName) {
                                  // Pass both the document name (from input) and the file
                                  handleDocumentUpload(newDocName.toLowerCase().replace(/\s+/g, '-'), file);
                                }
                              }}
                              disabled={!newDocName || uploadingDoc !== null}
                              className="cursor-pointer"
                            />
                            </div>
                            <div className="flex justify-end">
                              <Button variant="ghost" size="sm" onClick={() => setIsAddingOther(false)}>
                               {imageUploading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-4"></div> : "Cancel"} 
                              </Button>
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          {/* <TabsContent value="timeline">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timelineEvents.map((event) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <div className="w-0.5 h-full bg-border"></div>
                      </div>

                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{event.type}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {event.timestamp ? new Date(event.timestamp).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                        <p className="text-sm">{event.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">by {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

         


<TabsContent value="timeline">
  <Card className="bg-card border-border">
    <CardHeader>
      <CardTitle>Activity Timeline</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {timelineEvents.map((event) => (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                event.category === 'expense' ? 'bg-red-500' : 
                event.category === 'income' ? 'bg-green-500' : 
                event.category === 'sale' ? 'bg-blue-500' :
                event.category === 'lease' ? 'bg-purple-500' : 'bg-primary'
              }`}></div>
              <div className="w-0.5 h-full bg-border"></div>
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className={
                  event.category === 'expense' ? 'border-red-500 text-red-500' :
                  event.category === 'income' ? 'border-green-500 text-green-500' :
                  event.category === 'sale' ? 'border-blue-500 text-blue-500' :
                  event.category === 'lease' ? 'border-purple-500 text-purple-500' :
                  ''
                }>
                  {event.type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm">{event.description}</p>
              {event.amount && (
                <p className="text-xs font-semibold mt-1">
                  Amount: <span className={
                    event.category === 'expense' ? 'text-red-500' :
                    event.category === 'income' ? 'text-green-500' : ''
                  }>BHD {Math.abs(event.amount).toLocaleString()}</span>
                </p>
              )}
              {event.payableAmount && (
                <p className="text-xs text-muted-foreground mt-1">
                  Payable Amount: BHD {event.payableAmount.toLocaleString()}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">by {event.user}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
// import { Input } from '@/app/components/ui/input';
// import { Badge } from '@/app/components/ui/badge';
// import { Sale } from '@/types';
// import { Search, Calendar, DollarSign, TrendingUp } from 'lucide-react';

// interface SalesListProps {
//   onCarClick: (carId: string) => void;
// }

// export function SalesList({ onCarClick }: SalesListProps) {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Mock data
//   const mockSales: Sale[] = [
//     {
//       id: 'sale-1',
//       date: '2026-02-01',
//       carId: '1',
//       carName: 'BMW X5 2024',
//       carSource: 'Company',
//       soldPrice: 38000,
//       paymentType: 'Full',
//       status: 'Completed',
//       purchaserName: 'Mohammed Ali',
//       purchaserCpr: '920101234',
//       commission: 2000,
//       commissionType: 'Fixed',
//     },
//     {
//       id: 'sale-2',
//       date: '2026-02-02',
//       carId: '2',
//       carName: 'Mercedes C300 2023',
//       carSource: 'Investor',
//       soldPrice: 32000,
//       paymentType: 'Installment',
//       status: 'Installment Active',
//       purchaserName: 'Ahmed Hassan',
//       purchaserCpr: '930202345',
//       commission: 15,
//       commissionType: 'Percentage',
//     },
//     {
//       id: 'sale-3',
//       date: '2026-01-28',
//       carId: '3',
//       carName: 'Toyota Camry 2024',
//       carSource: 'Customer',
//       soldPrice: 18500,
//       paymentType: 'Full',
//       status: 'Completed',
//       purchaserName: 'Sara Mohammed',
//       purchaserCpr: '940303456',
//       commission: 1500,
//       commissionType: 'Fixed',
//     },
//     {
//       id: 'sale-4',
//       date: '2026-01-25',
//       carId: '4',
//       carName: 'Honda Accord 2023',
//       carSource: 'Company',
//       soldPrice: 16000,
//       paymentType: 'Installment',
//       status: 'Installment Active',
//       purchaserName: 'Khalid Ibrahim',
//       purchaserCpr: '950404567',
//       commission: 10,
//       commissionType: 'Percentage',
//     },
//     {
//       id: 'sale-5',
//       date: '2026-01-20',
//       carId: '5',
//       carName: 'Lexus ES 2024',
//       carSource: 'Investor',
//       soldPrice: 45000,
//       paymentType: 'Full',
//       status: 'Completed',
//       purchaserName: 'Fatima Ali',
//       purchaserCpr: '960505678',
//       commission: 3000,
//       commissionType: 'Fixed',
//     },
//   ];

//   const filteredSales = mockSales.filter((sale) =>
//     sale.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     sale.purchaserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     sale.carSource.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Calculate totals
//   const totalSales = mockSales.length;
//   const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.soldPrice, 0);
//   const completedSales = mockSales.filter(s => s.status === 'Completed').length;
//   const activeSales = mockSales.filter(s => s.status === 'Installment Active').length;

//   const getStatusVariant = (status: Sale['status']) => {
//     switch (status) {
//       case 'Completed':
//         return 'default';
//       case 'Installment Active':
//         return 'secondary';
//       case 'Pending':
//         return 'outline';
//       default:
//         return 'outline';
//     }
//   };

//   const getSourceColor = (source: Sale['carSource']) => {
//     switch (source) {
//       case 'Company':
//         return 'text-primary';
//       case 'Investor':
//         return 'text-blue-400';
//       case 'Customer':
//         return 'text-purple-400';
//       default:
//         return 'text-foreground';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold mb-1">Sales</h1>
//           <p className="text-muted-foreground">Track all vehicle sales and transactions</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   <TrendingUp className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Sales</p>
//                   <p className="text-2xl font-bold">{totalSales}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   {/* <DollarSign className="h-6 w-6 text-primary" /> */}
//                    <h4>BD</h4>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Revenue</p>
//                   <p className="text-2xl font-bold">{totalRevenue.toLocaleString()}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
//                   <Calendar className="h-6 w-6 text-green-500" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Completed</p>
//                   <p className="text-2xl font-bold">{completedSales}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
//                   <Calendar className="h-6 w-6 text-foreground" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Active Installments</p>
//                   <p className="text-2xl font-bold">{activeSales}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search */}
//         <div className="mb-6">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//             <Input
//               placeholder="Search by car, purchaser, or source..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 bg-input-background"
//             />
//           </div>
//         </div>

//         {/* Sales Table */}
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle>All Sales</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border">
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Car Name</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Source</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sold Price</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment Type</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSales.map((sale) => (
//                     <tr
//                       key={sale.id}
//                       className="border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors"
//                       onClick={() => onCarClick(sale.carId)}
//                     >
//                       <td className="py-4 px-4">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-sm">
//                             {new Date(sale.date).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'short',
//                               day: 'numeric',
//                             })}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div>
//                           <p className="font-medium">{sale.carName}</p>
//                           <p className="text-sm text-muted-foreground">{sale.purchaserName}</p>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className={`font-medium ${getSourceColor(sale.carSource)}`}>
//                           {sale.carSource}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className="font-bold text-primary">
//                           BHD {sale.soldPrice.toLocaleString()}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className="text-sm">{sale.paymentType}</span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <Badge variant={getStatusVariant(sale.status)}>
//                           {sale.status}
//                         </Badge>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {filteredSales.length === 0 && (
//                 <div className="text-center py-12">
//                   <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
//                   <p className="text-muted-foreground">No sales found</p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
// import { Input } from '@/app/components/ui/input';
// import { Badge } from '@/app/components/ui/badge';
// import { Search, Calendar, DollarSign, TrendingUp, Loader2, MoreVertical } from 'lucide-react';
// import { getSales } from '@/app/api/Sell/getSell';

// // Add these imports for dropdown menu
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/app/components/ui/dropdown-menu';
// import { Button } from '@/app/components/ui/button';

// interface SalesListProps {
//   onCarClick: (carId: string) => void;
// }

// export function SalesList({ onCarClick }: SalesListProps) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sales, setSales] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSale, setSelectedSale] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);

//   // Fetch sales data on component mount
//   useEffect(() => {
//     fetchSales();
//   }, []);

//   const fetchSales = async () => {
//     setLoading(true);
//     setError(null);

//     try{
//       const result = await getSales();
//       console.log("sales: ", result)
//       setSales(result);
//       setLoading(false);
//     }catch(e){
//       setError(e || 'Failed to load sales data');
//       setLoading(false);
//     }finally{
//       setLoading(false);
//     }
//   };

//   // Handle pay installment action
//   const handlePayInstallment = (sale) => {
//     setSelectedSale(sale);
//     setShowPaymentModal(true);
//   };

//   // Handle installment payment submission
//   const submitInstallmentPayment = async (paymentData) => {
//     try {
//       // Here you would call your API to submit the installment payment
//       // For example:
//       // const response = await payInstallment(selectedSale.id, paymentData);
//       console.log('Paying installment for:', selectedSale.id, paymentData);
//       setShowPaymentModal(false);
//       setSelectedSale(null);
//       // Refresh sales data to update remaining amounts
//       await fetchSales();
//     } catch (error) {
//       console.error('Error paying installment:', error);
//     }
//   };

//   // Filter sales based on search query
//   const filteredSales = sales.filter((sale) => {
//     const carName = `${sale.car?.make || ''} ${sale.car?.model || ''}`.toLowerCase();
//     const purchaserName = (sale.purchaserName || '').toLowerCase();
//     const carSource = (sale.car?.carSource || '').toLowerCase();
//     const query = searchQuery.toLowerCase();
    
//     return carName.includes(query) || 
//            purchaserName.includes(query) || 
//            carSource.includes(query);
//   });

//   // Calculate totals
//   const totalSales = sales.length;
//   const totalRevenue = sales.reduce((sum, sale) => sum + (sale.sellingPrice || 0), 0);
//   const completedSales = sales.filter(sale => sale.paymentType === 'Full').length;
//   const activeSales = sales.filter(sale => sale.paymentType === 'Installment').length;

//   const getStatusVariant = (paymentType) => {
//     switch (paymentType) {
//       case 'Full':
//         return 'default';
//       case 'Installment':
//         return 'secondary';
//       default:
//         return 'outline';
//     }
//   };

//   const getStatusText = (paymentType) => {
//     return paymentType === 'Full' ? 'Completed' : 'Installment Active';
//   };

//   const getSourceColor = (source) => {
//     switch (source) {
//       case 'Company':
//         return 'text-primary';
//       case 'Investor':
//         return 'text-blue-400';
//       case 'Customer':
//         return 'text-purple-400';
//       default:
//         return 'text-foreground';
//     }
//   };

//   // Loading state
// if (loading) {
//   return (
//     <div className="h-screen bg-background">
//       <div className="flex items-center justify-center h-full">
//         <Loader2 className="h-12 w-12 animate-spin text-primary" />
//         <span className="ml-2 text-muted-foreground">Loading sales...</span>
//       </div>
//     </div>
//   );
// }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-background p-6">
//         <div className="max-w-7xl mx-auto">
//           <Card className="bg-destructive/10 border-destructive">
//             <CardContent className="p-6">
//               <div className="text-center">
//                 <p className="text-destructive font-semibold">Error loading sales</p>
//                 <p className="text-sm text-muted-foreground mt-2">{error}</p>
//                 <button
//                   onClick={fetchSales}
//                   className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold mb-1">Sales</h1>
//           <p className="text-muted-foreground">Track all vehicle sales and transactions</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   <TrendingUp className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Sales</p>
//                   <p className="text-2xl font-bold">{totalSales}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   {/* <DollarSign className="h-6 w-6 text-primary" /> */}
//                   <h4>BD</h4>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Revenue</p>
//                   <p className="text-2xl font-bold"> {totalRevenue.toLocaleString()}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
//                   <Calendar className="h-6 w-6 text-green-500" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Completed</p>
//                   <p className="text-2xl font-bold">{completedSales}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
//                   <Calendar className="h-6 w-6 text-foreground" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Active Installments</p>
//                   <p className="text-2xl font-bold">{activeSales}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search */}
//         <div className="mb-6">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//             <Input
//               placeholder="Search by car, purchaser, or source..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 bg-input-background"
//             />
//           </div>
//         </div>

//         {/* Sales Table */}
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle>All Sales</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border">
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Car Name</th>
//                       <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Source</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sold Price</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment Type</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSales.map((sale) => (
//                     <tr
//                       key={sale.id}
//                       className="border-b border-border hover:bg-secondary/50 transition-colors"
//                     >
//                       <td className="py-4 px-4">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" className="h-8 w-8 p-0">
//                               <MoreVertical className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="start">
//                             {sale.paymentType === 'Installment' && (
//                               <DropdownMenuItem onClick={() => handlePayInstallment(sale)}>
//                                 Pay Installment
//                               </DropdownMenuItem>
//                             )}

//                              <DropdownMenuItem>
//                                 View Details
//                               </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </td>
                      
//                       <td 
//                         className="py-4 px-4 cursor-pointer"
//                         // onClick={() => onCarClick(sale.carId)}
//                       >
//                         <div>
//                           <p className="font-medium">
//                             {sale.car?.make} {sale.car?.model} {sale.car?.year}
//                           </p>
//                           <p className="text-sm text-muted-foreground">{sale.purchaserName}</p>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-sm">
//                             {new Date(sale.saleDate).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'short',
//                               day: 'numeric',
//                             })}
//                           </span>
//                         </div>
//                       </td>
//                       <td 
//                         className="py-4 px-4 cursor-pointer"
//                         onClick={() => onCarClick(sale.carId)}
//                       >
//                         <span className={`font-medium ${getSourceColor(sale.car?.carSource)}`}>
//                           {sale.car?.carSource || 'N/A'}
//                         </span>
//                       </td>
//                       <td 
//                         className="py-4 px-4 cursor-pointer"
//                         onClick={() => onCarClick(sale.carId)}
//                       >
//                         <span className="font-bold text-primary">
//                           BHD {sale.sellingPrice?.toLocaleString() || 0}
//                         </span>
//                       </td>
//                       <td 
//                         className="py-4 px-4 cursor-pointer"
//                         onClick={() => onCarClick(sale.carId)}
//                       >
//                         <span className="text-sm">{sale.paymentType}</span>
//                       </td>
//                       <td 
//                         className="py-4 px-4 cursor-pointer"
//                         onClick={() => onCarClick(sale.carId)}
//                       >
//                         <Badge variant={getStatusVariant(sale.paymentType)}>
//                           {getStatusText(sale.paymentType)}
//                         </Badge>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {filteredSales.length === 0 && (
//                 <div className="text-center py-12">
//                   <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
//                   <p className="text-muted-foreground">No sales found</p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Payment Modal */}
//       {showPaymentModal && selectedSale && (
//         <InstallmentPaymentModal
//           sale={selectedSale}
//           onClose={() => setShowPaymentModal(false)}
//           onSubmit={submitInstallmentPayment}
//         />
//       )}
//     </div>
//   );
// }

// // Installment Payment Modal Component
// function InstallmentPaymentModal({ sale, onClose, onSubmit }) {
//   const [paymentAmount, setPaymentAmount] = useState('');
//   const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     await onSubmit({
//       amount: parseFloat(paymentAmount),
//       date: paymentDate,
//       saleId: sale.id,
//       remainingAmount: sale.remainingAmount - parseFloat(paymentAmount),
//     });
//     setLoading(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <Card className="w-full max-w-md mx-4">
//         <CardHeader>
//           <CardTitle>Pay Installment</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="text-sm font-medium mb-2 block">Car</label>
//               <p className="text-sm text-muted-foreground">
//                 {sale.car?.make} {sale.car?.model} {sale.car?.year}
//               </p>
//             </div>
//             <div>
//               <label className="text-sm font-medium mb-2 block">Purchaser</label>
//               <p className="text-sm text-muted-foreground">{sale.purchaserName}</p>
//             </div>
//             <div>
//               <label className="text-sm font-medium mb-2 block">Remaining Amount</label>
//               <p className="text-lg font-bold text-primary">
//                 BHD {sale.remainingAmount?.toLocaleString() || 0}
//               </p>
//             </div>
//             <div>
//               <label className="text-sm font-medium mb-2 block">Per Installment Amount</label>
//               <p className="text-sm text-muted-foreground">
//                 BHD {sale.perInstallmentAmount?.toLocaleString() || 0}
//               </p>
//             </div>
//             <div>
//               <label className="text-sm font-medium mb-2 block">Payment Amount *</label>
//               <Input
//                 type="number"
//                 value={paymentAmount}
//                 onChange={(e) => setPaymentAmount(e.target.value)}
//                 placeholder="Enter payment amount"
//                 required
//                 step="0.01"
//                 min="0"
//                 max={sale.remainingAmount}
//               />
//               {sale.perInstallmentAmount && (
//                 <p className="text-xs text-muted-foreground mt-1">
//                   Recommended: BHD {sale.perInstallmentAmount}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label className="text-sm font-medium mb-2 block">Payment Date *</label>
//               <Input
//                 type="date"
//                 value={paymentDate}
//                 onChange={(e) => setPaymentDate(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="flex gap-2 justify-end pt-4">
//               <Button type="button" variant="outline" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={loading}>
//                 {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 Pay Installment
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
// import { Input } from '@/app/components/ui/input';
// import { Badge } from '@/app/components/ui/badge';
// import { Search, Calendar, DollarSign, TrendingUp, Loader2, MoreVertical } from 'lucide-react';
// import { getSales } from '@/app/api/Sell/getSell';
// import { getInstallments } from '@/app/api/Sell/getInstallments'; // Add this import

// // Add these imports for dropdown menu
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/app/components/ui/dropdown-menu';
// import { Button } from '@/app/components/ui/button';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/app/components/ui/select'; // Add this import

// interface SalesListProps {
//   onCarClick: (carId: string) => void;
// }

// export function SalesList({ onCarClick }: SalesListProps) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sales, setSales] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSale, setSelectedSale] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);

//   // Fetch sales data on component mount
//   useEffect(() => {
//     fetchSales();
//   }, []);

//   const fetchSales = async () => {
//     setLoading(true);
//     setError(null);

//     try{
//       const result = await getSales();
//       console.log("sales: ", result)
//       setSales(result);
//       setLoading(false);
//     }catch(e){
//       setError(e || 'Failed to load sales data');
//       setLoading(false);
//     }finally{
//       setLoading(false);
//     }
//   };

//   // Handle pay installment action
//   const handlePayInstallment = (sale) => {
//     setSelectedSale(sale);
//     setShowPaymentModal(true);
//   };

//   // Handle installment payment submission
//   const submitInstallmentPayment = async (paymentData) => {
//     try {
//       // Here you would call your API to submit the installment payment
//       // For example:
//       // const response = await payInstallment(selectedSale.id, paymentData);
//       console.log('Paying installment for:', selectedSale.id, paymentData);
//       setShowPaymentModal(false);
//       setSelectedSale(null);
//       // Refresh sales data to update remaining amounts
//       await fetchSales();
//     } catch (error) {
//       console.error('Error paying installment:', error);
//     }
//   };

//   // Filter sales based on search query
//   const filteredSales = sales.filter((sale) => {
//     const carName = `${sale.car?.make || ''} ${sale.car?.model || ''}`.toLowerCase();
//     const purchaserName = (sale.purchaserName || '').toLowerCase();
//     const carSource = (sale.car?.carSource || '').toLowerCase();
//     const query = searchQuery.toLowerCase();
    
//     return carName.includes(query) || 
//            purchaserName.includes(query) || 
//            carSource.includes(query);
//   });

//   // Calculate totals
//   const totalSales = sales.length;
//   const totalRevenue = sales.reduce((sum, sale) => sum + (sale.sellingPrice || 0), 0);
//   const completedSales = sales.filter(sale => sale.paymentType === 'Full').length;
//   const activeSales = sales.filter(sale => sale.paymentType === 'Installment').length;

//   const getStatusVariant = (paymentType) => {
//     switch (paymentType) {
//       case 'Full':
//         return 'default';
//       case 'Installment':
//         return 'secondary';
//       default:
//         return 'outline';
//     }
//   };

//   const getStatusText = (paymentType) => {
//     return paymentType === 'Full' ? 'Completed' : 'Installment Active';
//   };

//   const getSourceColor = (source) => {
//     switch (source) {
//       case 'Company':
//         return 'text-primary';
//       case 'Investor':
//         return 'text-blue-400';
//       case 'Customer':
//         return 'text-purple-400';
//       default:
//         return 'text-foreground';
//     }
//   };

//   // Loading state
// if (loading) {
//   return (
//     <div className="h-screen bg-background">
//       <div className="flex items-center justify-center h-full">
//         <Loader2 className="h-12 w-12 animate-spin text-primary" />
//         <span className="ml-2 text-muted-foreground">Loading sales...</span>
//       </div>
//     </div>
//   );
// }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-background p-6">
//         <div className="max-w-7xl mx-auto">
//           <Card className="bg-destructive/10 border-destructive">
//             <CardContent className="p-6">
//               <div className="text-center">
//                 <p className="text-destructive font-semibold">Error loading sales</p>
//                 <p className="text-sm text-muted-foreground mt-2">{error}</p>
//                 <button
//                   onClick={fetchSales}
//                   className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold mb-1">Sales</h1>
//           <p className="text-muted-foreground">Track all vehicle sales and transactions</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   <TrendingUp className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Sales</p>
//                   <p className="text-2xl font-bold">{totalSales}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   {/* <DollarSign className="h-6 w-6 text-primary" /> */}
//                   <h4>BD</h4>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Revenue</p>
//                   <p className="text-2xl font-bold"> {totalRevenue.toLocaleString()}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
//                   <Calendar className="h-6 w-6 text-green-500" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Completed</p>
//                   <p className="text-2xl font-bold">{completedSales}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
//                   <Calendar className="h-6 w-6 text-foreground" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Active Installments</p>
//                   <p className="text-2xl font-bold">{activeSales}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search */}
//         <div className="mb-6">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//             <Input
//               placeholder="Search by car, purchaser, or source..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 bg-input-background"
//             />
//           </div>
//         </div>

//         {/* Sales Table */}
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle>All Sales</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border">
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Car Name</th>
//                       <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Source</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sold Price</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment Type</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSales.map((sale) => (
//                     <tr
//                       key={sale.id}
//                       className="border-b border-border hover:bg-secondary/50 transition-colors"
//                     >
//                       <td className="py-4 px-4">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" className="h-8 w-8 p-0">
//                               <MoreVertical className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="start">
//                             {sale.paymentType === 'installment' && (
//                               <DropdownMenuItem onClick={() => handlePayInstallment(sale)}>
//                                 Pay Installment
//                               </DropdownMenuItem>
//                             )}

//                              <DropdownMenuItem>
//                                 View Details
//                               </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </td>
                      
//                       <td 
//                         className="py-4 px-4 cursor-pointer"
//                         // onClick={() => onCarClick(sale.carId)}
//                       >
//                         <div>
//                           <p className="font-medium">
//                             {sale.car?.make} {sale.car?.model} {sale.car?.year}
//                           </p>
//                           <p className="text-sm text-muted-foreground">{sale.purchaserName}</p>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-sm">
//                             {new Date(sale.saleDate).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'short',
//                               day: 'numeric',
//                             })}
//                           </span>
//                         </div>
//                       </td>
//                       <td 
//                         className="py-4 px-4 cursor-pointer"
//                         onClick={() => onCarClick(sale.carId)}
//                       >
//                         <span className={`font-medium ${getSourceColor(sale.car?.carSource)}`}>
//                           {sale.car?.carSource || 'N/A'}
//                         </span>
//                       </td>
//                       <td 
//                         className="py-4 px-4 cursor-pointer"
//                         onClick={() => onCarClick(sale.carId)}
//                       >
//                         <span className="font-bold text-primary">
//                           BHD {sale.sellingPrice?.toLocaleString() || 0}
//                         </span>
//                       </td>
//                       <td 
//                         className="py-4 px-4 cursor-pointer"
//                         onClick={() => onCarClick(sale.carId)}
//                       >
//                         <span className="text-sm">{sale.paymentType}</span>
//                       </td>
//                       <td 
//                         className="py-4 px-4 cursor-pointer"
//                         onClick={() => onCarClick(sale.carId)}
//                       >
//                         <Badge variant={getStatusVariant(sale.paymentType)}>
//                           {getStatusText(sale.paymentType)}
//                         </Badge>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {filteredSales.length === 0 && (
//                 <div className="text-center py-12">
//                   <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
//                   <p className="text-muted-foreground">No sales found</p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Payment Modal */}
//       {showPaymentModal && selectedSale && (
//         <InstallmentPaymentModal
//           sale={selectedSale}
//           onClose={() => setShowPaymentModal(false)}
//           onSubmit={submitInstallmentPayment}
//         />
//       )}
//     </div>
//   );
// }

// // Installment Payment Modal Component
// function InstallmentPaymentModal({ sale, onClose, onSubmit }) {
//   const [paymentAmount, setPaymentAmount] = useState('');
//   const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
//   const [loading, setLoading] = useState(false);
//   const [installments, setInstallments] = useState([]);
//   const [selectedInstallment, setSelectedInstallment] = useState(null);
//   const [loadingInstallments, setLoadingInstallments] = useState(false);

//   // Fetch installments when modal opens
//   useEffect(() => {
//     if (sale?.id) {
//       fetchInstallments();
//     }
//   }, [sale?.id]);

//   const fetchInstallments = async () => {
//     setLoadingInstallments(true);
//     try {
//       const response = await getInstallments(sale.id);
//       setInstallments(response);
//       console.log("Installments: ", response);
//     } catch (error) {
//       console.error("Error fetching installments:", error);
//     } finally {
//       setLoadingInstallments(false);
//     }
//   };

//   const handleInstallmentSelect = (installmentId) => {
//     const selected = installments.find(inst => inst.id === installmentId);
//     setSelectedInstallment(selected);
//     // Set the payment amount to the selected installment's amount
//     if (selected) {
//       setPaymentAmount(selected.amount?.toString() || '');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     await onSubmit({
//       amount: parseFloat(paymentAmount),
//       date: paymentDate,
//       saleId: sale.id,
//       installmentId: selectedInstallment?.id, // Store selected installment ID
//       remainingAmount: sale.remainingAmount - parseFloat(paymentAmount),
//     });
//     setLoading(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <Card className="w-full max-w-md mx-4">
//         <CardHeader>
//           <CardTitle>Pay Installment</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="text-sm font-medium mb-2 block">Car</label>
//               <p className="text-sm text-muted-foreground">
//                 {sale.car?.make} {sale.car?.model} {sale.car?.year}
//               </p>
//             </div>
//             <div>
//               <label className="text-sm font-medium mb-2 block">Purchaser</label>
//               <p className="text-sm text-muted-foreground">{sale.purchaserName}</p>
//             </div>
            
//             {/* Installment Dropdown */}
//             <div>
//               <label className="text-sm font-medium mb-2 block">Select Installment *</label>
//               <Select onValueChange={handleInstallmentSelect} disabled={loadingInstallments}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder={
//                     loadingInstallments ? 
//                     "Loading installments..." : 
//                     "Select an installment"
//                   } />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {installments.map((installment) => (
//                     <SelectItem key={installment.id} value={installment.id}>
//                       Installment #{installment.installmentNumber || installment.id} - BHD {installment.amount?.toLocaleString()}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Show selected installment details */}
//             {selectedInstallment && (
//               <div className="bg-secondary/20 p-3 rounded-md">
//                 <div className="flex justify-between mb-2">
//                   <span className="text-sm font-medium">Installment Number:</span>
//                   <span className="text-sm">{selectedInstallment.installmentNumber || 'N/A'}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm font-medium">Installment Amount:</span>
//                   <span className="text-sm font-bold text-primary">
//                     BHD {selectedInstallment.amount?.toLocaleString()}
//                   </span>
//                 </div>
//                 {selectedInstallment.dueDate && (
//                   <div className="flex justify-between mt-2">
//                     <span className="text-sm font-medium">Due Date:</span>
//                     <span className="text-sm">
//                       {new Date(selectedInstallment.dueDate).toLocaleDateString()}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             )}

//             <div>
//               <label className="text-sm font-medium mb-2 block">Remaining Amount</label>
//               <p className="text-lg font-bold text-primary">
//                 BHD {sale.remainingAmount?.toLocaleString() || 0}
//               </p>
//             </div>

//             <div>
//               <label className="text-sm font-medium mb-2 block">Per Installment Amount</label>
//               <p className="text-sm text-muted-foreground">
//                 BHD {sale.perInstallmentAmount?.toLocaleString() || 0}
//               </p>
//             </div>

//             <div>
//               <label className="text-sm font-medium mb-2 block">Payment Amount *</label>
//               <Input
//                 type="number"
//                 value={paymentAmount}
//                 onChange={(e) => setPaymentAmount(e.target.value)}
//                 placeholder="Enter payment amount"
//                 required
//                 step="0.01"
//                 min="0"
//                 max={sale.remainingAmount}
//               />
//               {selectedInstallment?.amount && (
//                 <p className="text-xs text-muted-foreground mt-1">
//                   Selected installment amount: BHD {selectedInstallment.amount}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="text-sm font-medium mb-2 block">Payment Date *</label>
//               <Input
//                 type="date"
//                 value={paymentDate}
//                 onChange={(e) => setPaymentDate(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="flex gap-2 justify-end pt-4">
//               <Button type="button" variant="outline" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={loading || !selectedInstallment}>
//                 {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 Pay Installment
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Search, Calendar, DollarSign, TrendingUp, Loader2, MoreVertical, CheckCircle, Clock, Wallet  } from 'lucide-react';
// import { TrendingUp, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { getSales } from '@/app/api/Sell/getSell';
import { getInstallments } from '@/app/api/Sell/getInstallments';
import {payInstallment} from  '@/app/api/Sell/payInstallment'

// Add these imports for dropdown menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Button } from '@/app/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

// Define TypeScript interfaces
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  carSource: string;
}

interface Sale {
  id: string;
  carId: string;
  car?: Car;
  purchaserName: string;
  saleDate: string;
  sellingPrice: number;
  paymentType: 'Full' | 'Installment';
  remainingAmount?: number;
  perInstallmentAmount?: number;
  installments: Installment[];  // Array of installments
  status?: string;
}

interface Installment {
  id: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  paidAmount?: number;
  status?: string;
  isPaid?: boolean;
  paidDate?: string;
}

interface SalesListProps {
  onCarClick: (carId: string) => void;
}

interface InstallmentPaymentModalProps {
  sale: Sale;
  onClose: () => void;
  onSubmit: (paymentData: any) => Promise<void>;
}

export function SalesList({ onCarClick }: SalesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Fetch sales data on component mount
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    setLoading(true);
    setError(null);

    try{
      const result = await getSales();
      console.log("sales: ", result)
      setSales(result);
    }catch(e: any){
      setError(e?.message || 'Failed to load sales data');
    }finally{
      setLoading(false);
    }
  };

  // Handle pay installment action
  const handlePayInstallment = (sale: Sale) => {
    setSelectedSale(sale);
    setShowPaymentModal(true);
  };

  // Handle installment payment submission
  const submitInstallmentPayment = async (paymentData: any) => {
    try {
      // Here you would call your API to submit the installment payment
      // For example:
      const response = await payInstallment(paymentData.installmentId);
      

    if(paymentData.remainingAmount === 0){
    alert(`Congratulations! You have completed your all installments.`);
    }
      alert(`Installment payed successfully. Your remaining amount is: ${paymentData.remainingAmount}`);
      setShowPaymentModal(false);
      setSelectedSale(null);
      // Refresh sales data to update remaining amounts
      await fetchSales();
        
    } catch (error) {
      console.error('Error paying installment:', error);
    }
  };

  // Filter sales based on search query
  const filteredSales = sales.filter((sale) => {
    const carName = `${sale.car?.make || ''} ${sale.car?.model || ''}`.toLowerCase();
    const purchaserName = (sale.purchaserName || '').toLowerCase();
    const carSource = (sale.car?.carSource || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return carName.includes(query) || 
           purchaserName.includes(query) || 
           carSource.includes(query);
  });

  // Calculate totals
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.sellingPrice || 0), 0);
  const completedSales = sales.filter(sale => sale.status === 'Completed').length;
  const activeSales = sales.filter(sale => sale.status === 'Pending').length;

  const getStatusVariant = (paymentType: string) => {
    switch (paymentType) {
      case 'Full':
        return 'default';
      case 'Installment':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusText = (paymentType: string) => {
    return paymentType === 'Full' ? 'Completed' : 'Installment Active';
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Company':
        return 'text-primary';
      case 'Investor':
        return 'text-blue-400';
      case 'Customer':
        return 'text-purple-400';
      default:
        return 'text-foreground';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen bg-background">
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading sales...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-destructive/10 border-destructive">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-destructive font-semibold">Error loading sales</p>
                <p className="text-sm text-muted-foreground mt-2">{error}</p>
                <button
                  onClick={fetchSales}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Try Again
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Sales</h1>
          <p className="text-muted-foreground">Track all vehicle sales and transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <Card className="bg-card border-border">
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Sales</p>
          <p className="text-2xl font-bold">{totalSales}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className="bg-card border-border">
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Wallet  className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold">{totalRevenue.toLocaleString()}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className="bg-card border-border">
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold">{completedSales}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className="bg-card border-border">
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
          <Clock className="h-6 w-6 text-secondary-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Active Installments</p>
          <p className="text-2xl font-bold">{activeSales}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by car, purchaser, or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
        </div>

        {/* Sales Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>All Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Car Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sold Price</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment Type</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="border-b border-border hover:bg-secondary/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            {/* sale.installments.some(installment => installment.isPaid === false) */}
                            {sale.status === "Pending" && (
                              <DropdownMenuItem onClick={() => handlePayInstallment(sale)}>
                                Pay Installment
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      
                      <td 
                        className="py-4 px-4 cursor-pointer"
                        // onClick={() => onCarClick(sale.carId)}
                      >
                        <div>
                          <p className="font-medium">
                            {sale.car?.make} {sale.car?.model} {sale.car?.year}
                          </p>
                          <p className="text-sm text-muted-foreground">{sale.purchaserName}</p>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(sale.saleDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </td>
                      
                      <td 
                        className="py-4 px-4 cursor-pointer"
                        onClick={() => onCarClick(sale.carId)}
                      >
                        <span className={`font-medium ${getSourceColor(sale.car?.carSource || '')}`}>
                          {sale.car?.carSource || 'N/A'}
                        </span>
                      </td>
                      
                      <td 
                        className="py-4 px-4 cursor-pointer"
                        onClick={() => onCarClick(sale.carId)}
                      >
                        <span className="font-bold text-primary">
                          BHD {sale.sellingPrice?.toLocaleString() || 0}
                        </span>
                      </td>
                      
                      <td 
                        className="py-4 px-4 cursor-pointer"
                        onClick={() => onCarClick(sale.carId)}
                      >
                        <span className="text-sm">{sale.paymentType}</span>
                      </td>
                      
                      <td 
                        className="py-4 px-4 cursor-pointer"
                        onClick={() => onCarClick(sale.carId)}
                      >
                        <Badge variant={sale.status === "Pending"? getStatusVariant("Installment") : getStatusVariant("Full")}>
                          {sale.status === "Pending"? getStatusText("Installment") : getStatusText("Full")}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredSales.length === 0 && (
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No sales found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedSale && (
        <InstallmentPaymentModal
          sale={selectedSale}
          onClose={() => setShowPaymentModal(false)}
          onSubmit={submitInstallmentPayment}
        />
      )}
    </div>
  );
}


// Installment Payment Modal Component
// Installment Payment Modal Component
function InstallmentPaymentModal({ sale, onClose, onSubmit }: InstallmentPaymentModalProps) {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [selectedInstallment, setSelectedInstallment] = useState<Installment | null>(null);
  const [loadingInstallments, setLoadingInstallments] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch installments when dropdown is opened
  const handleDropdownOpenChange = async (open: boolean) => {
    setDropdownOpen(open);
    
    // Only fetch if dropdown is opening and we haven't loaded installments yet
    if (open && installments.length === 0 && !loadingInstallments) {
      await fetchInstallments();
    }
  };

  const fetchInstallments = async () => {
    setLoadingInstallments(true);
    try {
      const response = await getInstallments(sale.id);
      setInstallments(response);
      console.log("Installments: ", response);
    } catch (error) {
      console.error("Error fetching installments:", error);
    } finally {
      setLoadingInstallments(false);
    }
  };

  const handleInstallmentSelect = (installmentId: string) => {
    const selected = installments.find(inst => inst.id === installmentId);
    setSelectedInstallment(selected || null);
    // Set the payment amount to the selected installment's amount
    if (selected) {
      setPaymentAmount(selected.amount?.toString() || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({
      
      amount: parseFloat(paymentAmount),
      date: paymentDate,
      saleId: sale.id,
      installmentId: selectedInstallment?.id,
      remainingAmount: (sale.remainingAmount || 0) - parseFloat(paymentAmount),
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Pay Installment</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Car</label>
              <p className="text-sm text-muted-foreground">
                {sale.car?.make} {sale.car?.model} {sale.car?.year}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Purchaser</label>
              <p className="text-sm text-muted-foreground">{sale.purchaserName}</p>
            </div>
            
            {/* Installment Dropdown */}
            <div>
              <label className="text-sm font-medium mb-2 block">Select Installment *</label>
              <Select 
                onValueChange={handleInstallmentSelect} 
                onOpenChange={handleDropdownOpenChange}
                disabled={loadingInstallments}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an installment" />
                </SelectTrigger>
                <SelectContent>
                  {loadingInstallments ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="ml-2 text-sm text-muted-foreground">Loading installments...</span>
                    </div>
                  ) : installments.length === 0 ? (
                    <div className="text-center py-6 text-sm text-muted-foreground">
                      No installments found
                    </div>
                  ) : (
                    installments.map((installment) => (
                      <SelectItem key={installment.id} value={installment.id} disabled={installment.isPaid}>
                       
                        Installment #{installment.installmentNumber} - BHD {installment.amount?.toLocaleString()} {installment.isPaid? ` - Paid on ${installment.paidDate?.split('T')[0]}`: ""}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Show selected installment details */}
            {selectedInstallment && (
              <div className="bg-secondary/20 p-3 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Installment Number:</span>
                  <span className="text-sm">{selectedInstallment.installmentNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Installment Amount:</span>
                  <span className="text-sm font-bold text-primary">
                    BHD {selectedInstallment.amount?.toLocaleString()}
                  </span>
                </div>
                {selectedInstallment.dueDate && (
                  <div className="flex justify-between mt-2">
                    <span className="text-sm font-medium">Due Date:</span>
                    <span className="text-sm">
                      {new Date(selectedInstallment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">Remaining Amount</label>
              <p className="text-lg font-bold text-primary">
                BHD {sale.remainingAmount?.toLocaleString() || 0}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Per Installment Amount</label>
              <p className="text-sm text-muted-foreground">
                BHD {sale.perInstallmentAmount?.toLocaleString() || 0}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Payment Amount *</label>
              <Input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter payment amount"
                required
                step="0.01"
                min="0"
                max={sale.remainingAmount}
              />
              {selectedInstallment?.amount && (
                <p className="text-xs text-muted-foreground mt-1">
                  Selected installment amount: BHD {selectedInstallment.amount}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Payment Date *</label>
              <Input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-2 justify-end pt-4 sticky bottom-0 bg-card pb-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !selectedInstallment}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Pay Installment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
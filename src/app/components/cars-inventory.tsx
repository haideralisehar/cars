// import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import { Card, CardContent } from '@/app/components/ui/card';
// import { Badge } from '@/app/components/ui/badge';
// import { Button } from '@/app/components/ui/button';
// import { Plus, ShoppingCart, Key, DollarSign, Edit } from 'lucide-react';
// import { getInventory } from "@/app/api/CarInventory/getcarinventory";

// export function CarsInventory({
//   onAddNewCar,
//   onCarClick,
//   onSellCar,
//   onLeaseCar,
//   onAddExpense,
//   userRole,
// }) {

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
//   const canAddExpense = isAdmin || userRole === 'Operations' || userRole === 'Driver';

//   // Fetch Cars
//   useEffect(() => {
//     fetchCars();
//   }, []);

//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       const data = await getInventory();
//       setCars(data);
//       console.log("Car Data:", data);
//     } catch (error) {
//       console.error("Failed to fetch cars:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   const getSourceColor = (source) => {
//     switch (source) {
//       case 'Company Car':
//         return 'bg-orange-600 text-white';
//       case 'Investor':
//         return 'bg-purple-600 text-white';
//       case 'Customer':
//         return 'bg-cyan-600 text-white';
//       default:
//         return 'bg-muted text-muted-foreground';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Cars Inventory</h1>
//             <p className="text-muted-foreground mt-1">{cars.length} total vehicles</p>
//           </div>

//           {isAdmin && (
//             <Button onClick={onAddNewCar} size="lg">
//               <Plus className="h-5 w-5 mr-2" />
//               Add New Car
//             </Button>
//           )}
//         </div>

//         {/* Cars Grid */}
//         {cars.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {cars.map((car) => (
//               <Card
//                 key={car.id}
//                 className={`bg-card border-border overflow-hidden transition-all group ${
//                   isAdmin ? 'hover:border-primary cursor-pointer' : 'cursor-default'
//                 }`}
//               >
//                 {/* Image */}
//                 <div
//                   onClick={() => isAdmin && onCarClick(car)}
//                   className="relative h-48 bg-secondary overflow-hidden"
//                 >
//                 <img
//   src={car.carImagePath || '/placeholder-car.png'}
//   alt={`${car.make} ${car.model}`}
//   className={`w-full h-full object-cover transition-transform ${
//     isAdmin ? 'group-hover:scale-105' : ''
//   }`}
//   onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//     const target = e.target as HTMLImageElement;
//     target.src = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
//     target.onerror = null; // Prevents infinite loop if fallback also fails
//   }}
//   loading="lazy" // Add lazy loading for better performance
// />

//                   <div className="absolute top-3 right-3 flex gap-2">
//                     <Badge className={getStatusColor(car.status)}>
//                       {car.status}
//                     </Badge>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <CardContent
//                   className="p-4"
//                   onClick={() => isAdmin && onCarClick(car)}
//                 >
//                   <div className="space-y-3">
//                     <div>
//                       <h3 className="font-semibold text-lg text-foreground">
//                         {car.make} {car.model}
//                       </h3>

//                       <p className="text-sm text-muted-foreground">
//                         {car.year} • {car.color}
//                       </p>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <Badge
//                         className={getSourceColor(car.carSource)}
//                         variant="secondary"
//                       >
//                         {car.carSource}
//                       </Badge>

//                       <p className="text-sm text-muted-foreground">
//                         {car.registrationNumber}
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>

//                 {/* Actions */}
//                 <div className="px-4 pb-4 flex flex-wrap gap-2">
//                   {car.status === 'Available' && isAdmin && (
//                     <>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="flex-1"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onSellCar(car);
//                         }}
//                       >
//                         <ShoppingCart className="h-4 w-4 mr-1" />
//                         Sell
//                       </Button>

//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="flex-1"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onLeaseCar(car);
//                         }}
//                       >
//                         <Key className="h-4 w-4 mr-1" />
//                         Lease
//                       </Button>
//                     </>
//                   )}

//                   {isAdmin && (
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="flex-shrink-0"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onCarClick(car);
//                       }}
//                     >
//                       <Edit className="h-4 w-4 text-primary" />
//                     </Button>
//                   )}

//                   {canAddExpense && (
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className={!isAdmin ? "w-full" : "flex-shrink-0"}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onAddExpense(car.id);
//                       }}
//                     >
//                       <DollarSign className="h-4 w-4 mr-1" />
//                       {!isAdmin && "Add Expense"}
//                     </Button>
//                   )}
//                 </div>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-64">
//             <p className="text-lg font-medium text-muted-foreground">
//               No Records Found...
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import { Card, CardContent } from '@/app/components/ui/card';
// import { Badge } from '@/app/components/ui/badge';
// import { Button } from '@/app/components/ui/button';
// import { Plus, ShoppingCart, Key, DollarSign, Edit, Search, Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
// import { getInventory } from "@/app/api/CarInventory/getcarinventory";
// import { Input } from '@/app/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/components/ui/select";

// export function CarsInventory({
//   onAddNewCar,
//   onCarClick,
//   onSellCar,
//   onLeaseCar,
//   onAddExpense,
//   userRole,
// }) {

//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sourceFilter, setSourceFilter] = useState('all');

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
//   const canAddExpense = isAdmin || userRole === 'Operations' || userRole === 'Driver';

//   // Fetch Cars
//   useEffect(() => {
//     fetchCars();
//   }, []);

//   // Filter cars whenever searchTerm, sourceFilter, or cars change
//   useEffect(() => {
//     filterCars();
//   }, [searchTerm, sourceFilter, cars]);

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, sourceFilter]);

//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       const data = await getInventory();
//       setCars(data);
//       console.log("Car Data:", data);
//     } catch (error) {
//       console.error("Failed to fetch cars:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterCars = () => {
//     let filtered = [...cars];

//     // Filter by search term (car name/make/model and registration number)
//     if (searchTerm.trim() !== '') {
//       const searchLower = searchTerm.toLowerCase();
//       filtered = filtered.filter(car => 
//         car.make?.toLowerCase().includes(searchLower) ||
//         car.model?.toLowerCase().includes(searchLower) ||
//         `${car.make} ${car.model}`.toLowerCase().includes(searchLower) ||
//         car.registrationNumber?.toLowerCase().includes(searchLower)
//       );
//     }

//     // Filter by car source
//     if (sourceFilter !== 'all') {
//       filtered = filtered.filter(car => car.carSource === sourceFilter);
//     }

//     setFilteredCars(filtered);
//   };

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

//   // Pagination handlers
//   const goToFirstPage = () => setCurrentPage(1);
//   const goToLastPage = () => setCurrentPage(totalPages);
//   const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
//   const goToPage = (page) => setCurrentPage(page);

//   // Generate page numbers to display
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxPagesToShow = 5;

//     if (totalPages <= maxPagesToShow) {
//       // Show all pages
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       // Show pages with ellipsis
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) {
//           pageNumbers.push(i);
//         }
//         pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pageNumbers.push(1);
//         pageNumbers.push('...');
//         for (let i = totalPages - 3; i <= totalPages; i++) {
//           pageNumbers.push(i);
//         }
//       } else {
//         pageNumbers.push(1);
//         pageNumbers.push('...');
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//           pageNumbers.push(i);
//         }
//         pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       }
//     }

//     return pageNumbers;
//   };

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

//   const getSourceColor = (source) => {
//     switch (source) {
//       case 'Company Car':
//         return 'bg-orange-600 text-white';
//       case 'Investor':
//         return 'bg-purple-600 text-white';
//       case 'Customer':
//         return 'bg-cyan-600 text-white';
//       default:
//         return 'bg-muted text-muted-foreground';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Cars Inventory</h1>
//             <p className="text-muted-foreground mt-1">{filteredCars.length} total vehicles</p>
//           </div>

//           {isAdmin && (
//             <Button onClick={onAddNewCar} size="lg">
//               <Plus className="h-5 w-5 mr-2" />
//               Add New Car
//             </Button>
//           )}
//         </div>

//         {/* Search and Filter Section */}
//         <div className="mb-6 flex flex-col sm:flex-row gap-4">
//           {/* Search Input */}
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search by car name or registration number..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>

//           {/* Filter Dropdown */}
//           <div className="sm:w-64">
//             <Select value={sourceFilter} onValueChange={setSourceFilter}>
//               <SelectTrigger className="w-full">
//                 <div className="flex items-center gap-2">
//                   <Filter className="h-4 w-4 text-muted-foreground" />
//                   <SelectValue placeholder="Filter by source" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Sources</SelectItem>
//                 <SelectItem value="Company Car">Company Car</SelectItem>
//                 <SelectItem value="Investor">Investor</SelectItem>
//                 <SelectItem value="Customer">Customer</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Cars Grid */}
//         {currentCars.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//               {currentCars.map((car) => (
//                 <Card
//                   key={car.id}
//                   className={`bg-card border-border overflow-hidden transition-all group ${
//                     isAdmin ? 'hover:border-primary cursor-pointer' : 'cursor-default'
//                   }`}
//                 >
//                   {/* Image */}
//                   <div
//                     onClick={() => isAdmin && onCarClick(car)}
//                     className="relative h-48 bg-secondary overflow-hidden"
//                   >
//                     <img
//                       src={car.carImagePath || '/placeholder-car.png'}
//                       alt={`${car.make} ${car.model}`}
//                       className={`w-full h-full object-cover transition-transform ${
//                         isAdmin ? 'group-hover:scale-105' : ''
//                       }`}
//                       onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
//                         target.onerror = null;
//                       }}
//                       loading="lazy"
//                     />

//                     <div className="absolute top-3 right-3 flex gap-2">
//                       <Badge className={getStatusColor(car.status)}>
//                         {car.status}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <CardContent
//                     className="p-4"
//                     onClick={() => isAdmin && onCarClick(car)}
//                   >
//                     <div className="space-y-3">
//                       <div>
//                         <h3 className="font-semibold text-lg text-foreground">
//                           {car.make} {car.model}
//                         </h3>

//                         <p className="text-sm text-muted-foreground">
//                           {car.year} • {car.color}
//                         </p>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <Badge
//                           className={getSourceColor(car.carSource)}
//                           variant="secondary"
//                         >
//                           {car.carSource}
//                         </Badge>

//                         <p className="text-sm text-muted-foreground">
//                           {car.registrationNumber}
//                         </p>
//                       </div>
//                     </div>
//                   </CardContent>

//                   {/* Actions */}
//                   <div className="px-4 pb-4 flex flex-wrap gap-2">
//                     {car.status === 'Available' && isAdmin && (
//                       <>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="flex-1"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onSellCar(car);
//                           }}
//                         >
//                           <ShoppingCart className="h-4 w-4 mr-1" />
//                           Sell
//                         </Button>

//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="flex-1"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onLeaseCar(car);
//                           }}
//                         >
//                           <Key className="h-4 w-4 mr-1" />
//                           Lease
//                         </Button>
//                       </>
//                     )}

//                     {isAdmin && (
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="flex-shrink-0"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onCarClick(car);
//                         }}
//                       >
//                         <Edit className="h-4 w-4 text-primary" />
//                       </Button>
//                     )}

//                     {canAddExpense && (
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className={!isAdmin ? "w-full" : "flex-shrink-0"}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onAddExpense(car.id);
//                         }}
//                       >
//                         <DollarSign className="h-4 w-4 mr-1" />
//                         {!isAdmin && "Add Expense"}
//                       </Button>
//                     )}
//                   </div>
//                 </Card>
//               ))}
//             </div>

//             {/* Pagination - Only show if total pages > 1 */}
//             {totalPages && (
//               <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//                 {/* Items per page selector */}
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-muted-foreground">Show:</span>
//                   <Select value={itemsPerPage.toString()} onValueChange={(value) => {
//                     setItemsPerPage(Number(value));
//                     setCurrentPage(1);
//                   }}>
//                     <SelectTrigger className="w-20">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="10">10</SelectItem>
//                       <SelectItem value="20">20</SelectItem>
//                       <SelectItem value="50">50</SelectItem>
//                       <SelectItem value="100">100</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <span className="text-sm text-muted-foreground">per page</span>
//                 </div>

//                 {/* Pagination controls */}
//                 <div className="flex items-center gap-2">
//                   {/* First page button */}
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={goToFirstPage}
//                     disabled={currentPage === 1}
//                     className="h-8 w-8 p-0"
//                   >
//                     <ChevronsLeft className="h-4 w-4" />
//                   </Button>

//                   {/* Previous page button */}
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={goToPreviousPage}
//                     disabled={currentPage === 1}
//                     className="h-8 w-8 p-0"
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </Button>

//                   {/* Page numbers */}
//                   <div className="flex items-center gap-1">
//                     {getPageNumbers().map((page, index) => (
//                       page === '...' ? (
//                         <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
//                           ...
//                         </span>
//                       ) : (
//                         <Button
//                           key={page}
//                           variant={currentPage === page ? "default" : "outline"}
//                           size="sm"
//                           onClick={() => goToPage(page)}
//                           className={`h-8 w-8 p-0 ${currentPage === page ? 'bg-primary text-primary-foreground' : ''}`}
//                         >
//                           {page}
//                         </Button>
//                       )
//                     ))}
//                   </div>

//                   {/* Next page button */}
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={goToNextPage}
//                     disabled={currentPage === totalPages}
//                     className="h-8 w-8 p-0"
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>

//                   {/* Last page button */}
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={goToLastPage}
//                     disabled={currentPage === totalPages}
//                     className="h-8 w-8 p-0"
//                   >
//                     <ChevronsRight className="h-4 w-4" />
//                   </Button>
//                 </div>

//                 {/* Page info */}
//                 <div className="text-sm text-muted-foreground">
//                   Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCars.length)} of {filteredCars.length} vehicles
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-64">
//             <p className="text-lg font-medium text-muted-foreground">
//               No Records Found...
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Plus, ShoppingCart, Key, DollarSign, Edit, Search, Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RotateCcw, Loader2 } from 'lucide-react';
import { getInventory } from "@/app/api/CarInventory/getcarinventory";
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { getCarInstallments } from '@/app/api/CarInventory/GetCarInstallment';
import { payCarInstallment } from '@/app/api/CarInventory/payCarInstallments';



// Define props interface
interface CarsInventoryProps {
  onAddNewCar: () => void;
  onCarClick: (car: any) => void;
  onSellCar: (car: any, fetchCars: () => void) => void;
  onLeaseCar: (car: any, fetchCars: () => void) => void;
  onAddExpense: (carId: string) => void;
  userRole: string;
}

export function CarsInventory({
  onAddNewCar,
  onCarClick,
  onSellCar,
  onLeaseCar,
  onAddExpense,
  userRole,
}: CarsInventoryProps) {

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Installment payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCarForPayment, setSelectedCarForPayment] = useState(null);
  const [selectedSaleForPayment, setSelectedSaleForPayment] = useState(null);

  const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
  const canAddExpense = isAdmin || userRole === 'Operations' || userRole === 'Driver';

  // Fetch Cars
  useEffect(() => {
    fetchCars();
  }, []);

  // Filter cars whenever searchTerm, sourceFilter, statusFilter, or cars change
  useEffect(() => {
    filterCars();
  }, [searchTerm, sourceFilter, statusFilter, cars]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sourceFilter, statusFilter]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await getInventory();
      setCars(data);
      console.log("Car Data:", data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCars = () => {
    let filtered = [...cars];

    // Filter by search term (car name/make/model and registration number)
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(car =>
        car.make?.toLowerCase().includes(searchLower) ||
        car.model?.toLowerCase().includes(searchLower) ||
        `${car.make} ${car.model}`.toLowerCase().includes(searchLower) ||
        car.registrationNumber?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by car source
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(car => car.carSource === sourceFilter);
    }

    // Filter by car status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(car => car.status === statusFilter);
    }

    setFilteredCars(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSourceFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToPage = (page) => setCurrentPage(page);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const getStatusColor = (status) => {
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

  const getSourceColor = (source) => {
    switch (source) {
      case 'Company Car':
        return 'bg-orange-600 text-white';
      case 'Investor':
        return 'bg-purple-600 text-white';
      case 'Customer':
        return 'bg-cyan-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Handle Pay Installment click
  const handlePayInstallment = (car) => {
    
    
  
      setSelectedCarForPayment(car);
      setSelectedSaleForPayment(car);
      setShowPaymentModal(true);
   
  };

  // Submit installment payment
  const submitInstallmentPayment = async (paymentData: any) => {
    try {
      const response = await payCarInstallment(paymentData.id);
      
      if (response.remaining === 0) {
        alert(`Congratulations! You have completed all your installments.`);
      } else {
        alert(`Installment paid successfully. Your remaining amount is: ${response.remaining}`);
      }
      
      setShowPaymentModal(false);
      setSelectedCarForPayment(null);
      setSelectedSaleForPayment(null);
      
      // Refresh the inventory to update the car's status
      await fetchCars();
      
    } catch (error) {
      console.error('Error paying installment:', error);
      alert('Failed to process installment payment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cars Inventory</h1>
            <p className="text-muted-foreground mt-1">{filteredCars.length} total vehicles</p>
          </div>

          {isAdmin && (
            <Button onClick={onAddNewCar} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add New Car
            </Button>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by car name or registration number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Source Filter Dropdown */}
          <div className="sm:w-48">
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by source" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Company Car">Company Car</SelectItem>
                <SelectItem value="Investor">Investor</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter Dropdown */}
          <div className="sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
                <SelectItem value="Leased">Leased</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters Button */}
          <Button
            variant="outline"
            onClick={resetFilters}
            className="sm:w-auto"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        </div>

        {/* Cars Grid */}
        {currentCars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentCars.map((car) => (
                <Card
                  key={car.id}
                  className={`bg-card border-border overflow-hidden transition-all group ${isAdmin ? 'hover:border-primary cursor-pointer' : 'cursor-default'
                    }`}
                >
                  {/* Image */}
                  <div
                    onClick={() => isAdmin && onCarClick(car)}
                    className="relative h-48 bg-secondary overflow-hidden"
                  >
                    <img
                      src={car.carImagePath || '/placeholder-car.png'}
                      alt={`${car.make} ${car.model}`}
                      className={`w-full h-full object-cover transition-transform ${isAdmin ? 'group-hover:scale-105' : ''
                        }`}
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
                        target.onerror = null;
                      }}
                      loading="lazy"
                    />

                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge className={getStatusColor(car.status)}>
                        {car.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent
                    className="p-4"
                    onClick={() => isAdmin && onCarClick(car)}
                  >
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">
                          {car.make} {car.model}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          {car.year} • {car.color}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Badge
                            className={getSourceColor(car.carSource)}
                            variant="secondary"
                          >
                            {car.carSource}
                          </Badge>
                          {car.financialDetails?.purchaseStatus === 'Pending' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePayInstallment(car);
                              }}
                              style={{ backgroundColor: "red", borderRadius: "5px", color: "white", padding: "2px 5px", marginLeft: "10px", fontSize: "12px", cursor: "pointer" }}
                            >
                              Pay Installment
                            </button>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {car.registrationNumber}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  {/* Actions */}
                  <div className="px-4 pb-4 flex flex-wrap gap-2">
                    {car.status === 'Available' && isAdmin && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSellCar(car, fetchCars);
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Sell
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            onLeaseCar(car, fetchCars);
                          }}
                        >
                          <Key className="h-4 w-4 mr-1" />
                          Lease
                        </Button>
                      </>
                    )}

                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCarClick(car);
                        }}
                      >
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                    )}

                    {canAddExpense && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={!isAdmin ? "w-full" : "flex-shrink-0"}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddExpense(car.id);
                        }}
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        {!isAdmin && "Add Expense"}
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination - Only show if total pages > 1 */}
            {totalPages && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Items per page selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show:</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">per page</span>
                </div>

                {/* Pagination controls */}
                <div className="flex items-center gap-2">
                  {/* First page button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>

                  {/* Previous page button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page)}
                          className={`h-8 w-8 p-0 ${currentPage === page ? 'bg-primary text-primary-foreground' : ''}`}
                        >
                          {page}
                        </Button>
                      )
                    ))}
                  </div>

                  {/* Next page button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  {/* Last page button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Page info */}
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCars.length)} of {filteredCars.length} vehicles
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg font-medium text-muted-foreground">
              No Records Found...
            </p>
          </div>
        )}
      </div>

      {/* Installment Payment Modal */}
      {showPaymentModal && selectedSaleForPayment && (
        <InstallmentPaymentModal
          sale={selectedSaleForPayment}
          car={selectedCarForPayment}
          onClose={() => setShowPaymentModal(false)}
          onSubmit={submitInstallmentPayment}
        />
      )}
    </div>
  );
}

// Installment Payment Modal Component
// Installment Payment Modal Component
function InstallmentPaymentModal({ sale, car, onClose, onSubmit }) {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [installments, setInstallments] = useState([]);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [loadingInstallments, setLoadingInstallments] = useState(false);

  // Fetch installments when modal opens
  useEffect(() => {
    fetchInstallments();
  }, [sale.id]);

  const fetchInstallments = async () => {
    setLoadingInstallments(true);
    try {
      const response = await getCarInstallments(car.id);
      console.log("Installments response: ", response);
      
      // Handle different response formats
      let installmentsArray = [];
      if (Array.isArray(response)) {
        installmentsArray = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        installmentsArray = response.data;
      } else if (response && response.installments && Array.isArray(response.installments)) {
        installmentsArray = response.installments;
      } else {
        installmentsArray = [];
        console.warn("Unexpected response format:", response);
      }
      
      setInstallments(installmentsArray);
    } catch (error) {
      console.error("Error fetching installments:", error);
      setInstallments([]);
    } finally {
      setLoadingInstallments(false);
    }
  };

  const handleInstallmentSelect = (installmentId) => {
    const selected = installments.find(inst => inst.id === installmentId);
    setSelectedInstallment(selected || null);
    // Set the payment amount to the selected installment's amount
    if (selected) {
      setPaymentAmount(selected.amount?.toString() || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // alert(selectedInstallment?.id);
    if (!selectedInstallment) {
      alert("Please select an installment to pay");
      return;
    }
    
    setLoading(true);
    await onSubmit({
      id: selectedInstallment.id,
    //   amount: parseFloat(paymentAmount),
    //   date: paymentDate,
    //   saleId: sale.id,
    //   installmentId: selectedInstallment?.id,
    //   remainingAmount: (sale.remainingAmount || 0) - parseFloat(paymentAmount),
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Pay Installment</CardTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Car</label>
              <p className="text-sm text-muted-foreground">
                {car?.make} {car?.model} {car?.year}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Registration Number</label>
              <p className="text-sm text-muted-foreground">{car?.registrationNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Purchaser</label>
              <p className="text-sm text-muted-foreground">{sale.purchaserName}</p>
            </div>
            
            {/* Installment Dropdown */}
            <div>
              <label className="text-sm font-medium mb-2 block">Select Installment *</label>
              <Select onValueChange={handleInstallmentSelect} disabled={loadingInstallments}>
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
                      <SelectItem 
                        key={installment.id} 
                        value={installment.id} 
                        disabled={installment.isPaid}
                      >
                        Installment #{installment.installmentNumber} - BHD {installment.amount?.toLocaleString()} 
                        {installment.isPaid ? ` - Paid on ${installment.paidDate?.split('T')[0]}` : 
                         installment.dueDate ? ` - Due: ${new Date(installment.dueDate).toLocaleDateString()}` : ""}
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
                {selectedInstallment.isPaid && selectedInstallment.paidDate && (
                  <div className="flex justify-between mt-2">
                    <span className="text-sm font-medium">Paid Date:</span>
                    <span className="text-sm text-green-600">
                      {new Date(selectedInstallment.paidDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">Remaining Amount</label>
              <p className="text-lg font-bold text-primary">
                BHD {car?.financialDetails?.remainingAmount.toLocaleString() || 0}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Per Installment Amount</label>
              <p className="text-sm text-muted-foreground">
                BHD {car?.financialDetails?.perInstallmentAmount?.toLocaleString() || 0}
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
              <Button type="submit" disabled={loading || !selectedInstallment || selectedInstallment.isPaid}>
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
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
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Plus, ShoppingCart, Key, DollarSign, Edit, Search, Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RotateCcw } from 'lucide-react';
import { getInventory } from "@/app/api/CarInventory/getcarinventory";
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export function CarsInventory({
  onAddNewCar,
  onCarClick,
  onSellCar,
  onLeaseCar,
  onAddExpense,
  userRole,
}) {

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
                  className={`bg-card border-border overflow-hidden transition-all group ${
                    isAdmin ? 'hover:border-primary cursor-pointer' : 'cursor-default'
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
                      className={`w-full h-full object-cover transition-transform ${
                        isAdmin ? 'group-hover:scale-105' : ''
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
                        <Badge
                          className={getSourceColor(car.carSource)}
                          variant="secondary"
                        >
                          {car.carSource}
                        </Badge>

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
                            onSellCar(car);
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
                            onLeaseCar(car);
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
    </div>
  );
}
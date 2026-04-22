// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
// import { Input } from '@/app/components/ui/input';
// import { Badge } from '@/app/components/ui/badge';
// import { Lease } from '@/types';
// import { Search, Calendar, DollarSign, Car, AlertCircle } from 'lucide-react';

// interface LeaseListProps {
//   onCarClick: (carId: string) => void;
// }

// export function LeaseList({ onCarClick }: LeaseListProps) {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Mock data
//   const mockLeases: Lease[] = [
//     {
//       id: 'lease-1',
//       carId: '6',
//       carName: 'Toyota Corolla 2024',
//       lesseeName: 'Ali Mohammed',
//       lesseeCpr: '910101234',
//       leaseType: 'Daily',
//       rentAmount: 25,
//       startDate: '2026-01-15',
//       duration: 30,
//       nextDueDate: '2026-02-14',
//       status: 'Overdue',
//     },
//     {
//       id: 'lease-2',
//       carId: '7',
//       carName: 'Honda Civic 2023',
//       lesseeName: 'Fatima Hassan',
//       lesseeCpr: '920202345',
//       leaseType: 'Monthly',
//       rentAmount: 450,
//       startDate: '2026-02-01',
//       duration: 6,
//       nextDueDate: '2026-03-01',
//       status: 'Active',
//     },
//     {
//       id: 'lease-3',
//       carId: '8',
//       carName: 'Nissan Altima 2024',
//       lesseeName: 'Ahmed Ali',
//       lesseeCpr: '930303456',
//       leaseType: 'Daily',
//       rentAmount: 20,
//       startDate: '2026-02-01',
//       duration: 15,
//       nextDueDate: '2026-02-16',
//       status: 'Active',
//     },
//     {
//       id: 'lease-4',
//       carId: '9',
//       carName: 'Mazda 6 2023',
//       lesseeName: 'Sara Ibrahim',
//       lesseeCpr: '940404567',
//       leaseType: 'Monthly',
//       rentAmount: 400,
//       startDate: '2026-01-01',
//       duration: 12,
//       nextDueDate: '2026-02-10',
//       status: 'Overdue',
//     },
//     {
//       id: 'lease-5',
//       carId: '10',
//       carName: 'Hyundai Elantra 2024',
//       lesseeName: 'Khalid Ahmed',
//       lesseeCpr: '950505678',
//       leaseType: 'Daily',
//       rentAmount: 18,
//       startDate: '2026-02-02',
//       duration: 20,
//       nextDueDate: '2026-02-22',
//       status: 'Active',
//     },
//     {
//       id: 'lease-6',
//       carId: '11',
//       carName: 'Kia Optima 2023',
//       lesseeName: 'Mariam Hassan',
//       lesseeCpr: '960606789',
//       leaseType: 'Monthly',
//       rentAmount: 380,
//       startDate: '2025-12-15',
//       duration: 12,
//       nextDueDate: '2026-01-15',
//       status: 'Completed',
//     },
//   ];

//   const filteredLeases = mockLeases.filter((lease) =>
//     lease.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     lease.lesseeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     lease.leaseType.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Calculate totals
//   const totalLeases = mockLeases.filter(l => l.status !== 'Completed').length;
//   const activeLeases = mockLeases.filter(l => l.status === 'Active').length;
//   const overdueLeases = mockLeases.filter(l => l.status === 'Overdue').length;
//   const totalRevenue = mockLeases
//     .filter(l => l.status !== 'Completed')
//     .reduce((sum, lease) => {
//       const amount = lease.leaseType === 'Daily' 
//         ? lease.rentAmount * lease.duration 
//         : lease.rentAmount * lease.duration;
//       return sum + amount;
//     }, 0);

//   const getStatusVariant = (status: Lease['status']) => {
//     switch (status) {
//       case 'Active':
//         return 'default';
//       case 'Overdue':
//         return 'destructive';
//       case 'Completed':
//         return 'outline';
//       default:
//         return 'outline';
//     }
//   };

//   const getLeaseTypeColor = (leaseType: Lease['leaseType']) => {
//     return leaseType === 'Daily' ? 'text-blue-400' : 'text-purple-400';
//   };

//   const isOverdue = (nextDueDate: string, status: Lease['status']) => {
//     if (status === 'Completed') return false;
//     return new Date(nextDueDate) < new Date() || status === 'Overdue';
//   };

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold mb-1">Leases</h1>
//           <p className="text-muted-foreground">Manage active vehicle leases and rental agreements</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   <Car className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Leases</p>
//                   <p className="text-2xl font-bold">{totalLeases}</p>
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
//                   <p className="text-sm text-muted-foreground">Active</p>
//                   <p className="text-2xl font-bold">{activeLeases}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
//                   <AlertCircle className="h-6 w-6 text-destructive" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Overdue</p>
//                   <p className="text-2xl font-bold">{overdueLeases}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   <DollarSign className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Expected Revenue</p>
//                   <p className="text-2xl font-bold">BHD {totalRevenue.toLocaleString()}</p>
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
//               placeholder="Search by car, lessee, or lease type..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 bg-input-background"
//             />
//           </div>
//         </div>

//         {/* Leases Table */}
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle>All Leases</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border">
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Car Name</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Lessee Name</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Lease Type</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rent Amount</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Next Due Date</th>
//                     <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredLeases.map((lease) => (
//                     <tr
//                       key={lease.id}
//                       className="border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors"
//                       onClick={() => onCarClick(lease.carId)}
//                     >
//                       <td>

//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex items-center gap-2">
//                           <Car className="h-4 w-4 text-muted-foreground" />
//                           <span className="font-medium">{lease.carName}</span>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div>
//                           <p className="font-medium">{lease.lesseeName}</p>
//                           <p className="text-xs text-muted-foreground">{lease.lesseeCpr}</p>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className={`font-medium ${getLeaseTypeColor(lease.leaseType)}`}>
//                           {lease.leaseType}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div>
//                           <p className="font-bold text-primary">
//                             BHD {lease.rentAmount.toLocaleString()}
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             per {lease.leaseType === 'Daily' ? 'day' : 'month'}
//                           </p>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex items-center gap-2">
//                           {isOverdue(lease.nextDueDate, lease.status) && (
//                             <AlertCircle className="h-4 w-4 text-destructive" />
//                           )}
//                           <div>
//                             <p className={`text-sm ${isOverdue(lease.nextDueDate, lease.status) ? 'text-destructive font-medium' : ''}`}>
//                               {new Date(lease.nextDueDate).toLocaleDateString('en-US', {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric',
//                               })}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <Badge variant={getStatusVariant(lease.status)}>
//                           {lease.status}
//                         </Badge>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {filteredLeases.length === 0 && (
//                 <div className="text-center py-12">
//                   <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
//                   <p className="text-muted-foreground">No leases found</p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Lease } from '@/types';
import { Search, Calendar, DollarSign, Car, AlertCircle, Loader2, CheckCircle, X, MoreVertical, Wallet } from 'lucide-react';
import { getLeases } from '@/app/api/Leases/getLeases'; // Adjust the import path as needed
import {createLease} from '@/app/api/Leases/postLease';
import {Check} from 'lucide-react';

interface LeaseListProps {
  onCarClick: (carId: string) => void;
   userRole: 'Admin' | 'SuperAdmin' | 'User' | 'Operations' | 'Driver' | 'Investor';
}


// Rent Payment Modal Component
function RentPaymentModal({ 
  lease, 
  isOpen, 
  onClose, 
  onConfirm ,
  onPaymentSuccess  // New prop for refreshing data
}: { 
  lease: Lease | null; 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: (leaseId: string, amount: number) => void;
  onPaymentSuccess?: () => Promise<void>; // Optional callback for refreshing data;
}) {
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash');
  const [notes, setNotes] = useState<string>('');
   const [solding, setsolding] = useState(false);

  useEffect(() => {
    if (lease) {
      setPaymentAmount(lease.rentAmount);
    }
  }, [lease]);

  if (!isOpen || !lease) return null;



  const postLease = async () => {

      const isValid = paymentAmount !== 0 || paymentAmount < 0 && paymentDate !== '' && paymentMethod !== '';

      if(!isValid){
        alert("All fileds are required except note.")
      }

      try {

        setsolding(true);

        const payload = {
        leaseId: lease.id,
        amount: paymentAmount,
        paymentMethod: paymentMethod,
        notes: notes,

      }

        const response = await createLease(payload);
        console.log("Car Data:", payload);
        console.log("Api Response: ", response)
         // Call onConfirm to update local state
        onConfirm(lease.id, paymentAmount);
      
        // Call onPaymentSuccess to refresh the entire leases list
        if (onPaymentSuccess) {
          await onPaymentSuccess();
        }
        setsolding(false);
        onClose();

      } catch (error) {
        console.error("Failed to fetch cars:", error);
        setsolding(false);
      } finally {
        setsolding(false);
        
      }
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-bold">Record Rent Payment</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-secondary/50 p-4 rounded-lg mb-4">
            <p className="text-sm text-muted-foreground">Lease Details</p>
            <p className="font-semibold">{lease.carName}</p>
            <p className="text-sm">{lease.lesseeName} - {lease.lesseeCpr}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Payment Amount (BHD)</label>
            <Input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              className="w-full"
              min={0}
              step={0.1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Payment Date</label>
            <Input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Check">Check</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="Add any additional notes..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {
            solding ? (
                <Button disabled>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </Button>
              ) : (
                <Button onClick={postLease}>
                  <Check className="h-4 w-4 mr-2" />
            Confirm Payment
          </Button>
                
              )

          }

          
          
        </div>
      </div>
    </div>
  );
}

// Dropdown Menu Component
function ActionMenu({ lease, onRentPaid, onViewDetails, onCarClick, isAdmin }: { 
  lease: Lease; 
  onRentPaid: (lease: Lease, e: React.MouseEvent) => void;
  onViewDetails: (carId: string) => void;
  onCarClick: (carId: string) => void;
  isAdmin: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    
    switch (action) {
      case 'rentPaid':
        onRentPaid(lease, e);
        break;
      case 'viewDetails':
        onViewDetails(lease.carId);
        break;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
      
      {isOpen && (
  <div className="absolute left-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-10">
    <div className="py-1">
     {
      isAdmin &&
      ( <button
        onClick={(e) => handleAction('rentPaid', e)}
        disabled={lease.status === 'Completed'}
        className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 transition-colors flex items-center gap-2 ${
          lease.status === 'Completed' ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <CheckCircle className="h-4 w-4 text-green-500" />
        Pay Lease
      </button>)
     }
      <button
        onClick={(e) => handleAction('viewDetails', e)}
        className="w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 transition-colors flex items-center gap-2"
      >
        <Car className="h-4 w-4" />
        View Car Details
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export function LeaseList({ onCarClick, userRole }: LeaseListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLease, setSelectedLease] = useState<Lease | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

   const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
    const isSuperAdmin = userRole === 'SuperAdmin';
    const isInvestor = userRole === 'Investor';
  

   const fetchLeases = async () => {
      try {
        setLoading(true);
        const data = await getLeases();

        
        // Transform API data to match your Lease type
        const transformedLeases: Lease[] = data.map((item: any) => ({
          id: item.leaseId,
          carId: item.carId || item.leaseId,
          carName: item.carName,
          lesseeName: item.lesseeName,
          lesseeCpr: item.cprNumber,
          leaseType: item.leaseType,
          rentAmount: item.rentAmount,
          startDate: item.startDate || new Date().toISOString().split('T')[0],
          duration: item.duration || 0,
          nextDueDate: item.nextDueDate ? item.nextDueDate.split('T')[0] : '',
          status: item.status,
        }));
        
        setLeases(transformedLeases);
        console.log(transformedLeases)
        setError(null);
      } catch (err) {
        console.error('Error fetching leases:', err);
        setError('Failed to load leases. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

  // Fetch leases from API
  useEffect(() => {

    fetchLeases();
  }, []);

  const handleRentPaid = (leaseId: string, amount: number) => {
    // Here you would typically make an API call to record the payment
    console.log(`Payment recorded for lease ${leaseId}: BHD ${amount}`);
    
    // Show success message
    setSuccessMessage(`Payment of BHD ${amount} recorded successfully!`);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
    
    // Update the lease's next due date (example logic)
    setLeases(prevLeases => 
      prevLeases.map(lease => {
        if (lease.id === leaseId) {
          // Calculate next due date based on lease type
          const currentDueDate = new Date(lease.nextDueDate);
          let nextDueDate = new Date(currentDueDate);
          
          if (lease.leaseType === 'Monthly') {
            nextDueDate.setMonth(nextDueDate.getMonth() + 1);
          } else {
            // Daily lease - add duration days
            nextDueDate.setDate(nextDueDate.getDate() + (lease.duration || 30));
          }
          
          return {
            ...lease,
            nextDueDate: nextDueDate.toISOString().split('T')[0],
            status: 'Active' // Reset status to active if it was overdue
          };
        }
        return lease;
      })
    );
  };

  const openPaymentModal = (lease: Lease, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLease(lease);
    setIsModalOpen(true);
  };

  const handleViewDetails = (carId: string) => {
    onCarClick(carId);
  };

  const filteredLeases = leases.filter((lease) =>
    lease.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lease.lesseeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lease.leaseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate totals
  // const totalLeases = leases.filter(l => l.status !== 'Completed').length;
  const totalLeases = leases.length;
  const activeLeases = leases.filter(l => l.status === 'Active').length;
  const overdueLeases = leases.filter(l => l.status === 'Overdue').length;
  const totalRevenue = leases
    .filter(l => l.status !== 'Completed')
    .reduce((sum, lease) => {
      const amount = lease.leaseType === 'Daily' 
        ? lease.rentAmount * (lease.duration || 1) 
        : lease.rentAmount * (lease.duration || 1);
      return sum + amount;
    }, 0);

  const getStatusVariant = (status: Lease['status']) => {
    switch (status) {
      case 'Active':
        return 'outline';
      case 'Overdue':
        return 'destructive';
      case 'Completed':
        return 'default';
      // default:
      //   return 'outline';
    }
  };

  const getLeaseTypeColor = (leaseType: Lease['leaseType']) => {
    return leaseType === 'Daily' ? 'text-blue-400' : 'text-purple-400';
  };

  const isOverdue = (nextDueDate: string, status: Lease['status']) => {
    if (status === 'Completed') return false;
    if (!nextDueDate) return false;
    return new Date(nextDueDate) < new Date() || status === 'Overdue';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading leases...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <p className="text-destructive mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Success Toast */}
        {successMessage && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Leases</h1>
          <p className="text-muted-foreground">Manage active vehicle leases and rental agreements</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Leases</p>
                  <p className="text-2xl font-bold">{totalLeases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">{activeLeases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold">{overdueLeases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-primary" />
                  {/* <h4>BD</h4> */}
                  
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Revenue</p>
                  <p className="text-2xl font-bold">{totalRevenue.toLocaleString() + '.00'}</p>
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
          <p className="text-2xl font-bold">{totalLeases}</p>
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
              placeholder="Search by car, lessee, or lease type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
        </div>

        {/* Leases Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>All Leases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground w-16">Actions</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Car Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Lessee Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Lease Type</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rent Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Next Due Date</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                   </tr>
                </thead>
                <tbody>
                  {filteredLeases.map((lease) => (
                    <tr
                      key={lease.id}
                      className="border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                      // onClick={() => onCarClick(lease.carId)}
                    >
                      <td className="py-4 px-4 ml-30" onClick={(e) => e.stopPropagation()}>
                        <ActionMenu 
                          lease={lease}
                          onRentPaid={openPaymentModal}
                          onViewDetails={handleViewDetails}
                          onCarClick={onCarClick}
                          isAdmin={isSuperAdmin}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{lease.carName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{lease.lesseeName}</p>
                          <p className="text-xs text-muted-foreground">{lease.lesseeCpr}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-medium ${getLeaseTypeColor(lease.leaseType)}`}>
                          {lease.leaseType}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-bold text-primary">
                            BHD {lease.rentAmount.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            per {lease.leaseType === 'Daily' ? 'day' : 'month'}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {isOverdue(lease.nextDueDate, lease.status) && (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                          <div>
                            <p className={`text-sm ${isOverdue(lease.nextDueDate, lease.status) ? 'text-destructive font-medium' : ''}`}>
                              {lease.nextDueDate ? new Date(lease.nextDueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }) : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={getStatusVariant(lease.status)}>
                          {lease.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeases.length === 0 && (
                <div className="text-center py-12">
                  <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No leases found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rent Payment Modal */}
      <RentPaymentModal
        lease={selectedLease}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLease(null);
        }}
        onConfirm={handleRentPaid}
        onPaymentSuccess={fetchLeases}  // Pass the fetchLeases function here
      />
    </div>
  );
}
// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { ScrollArea } from './ui/scroll-area';
// import { usersStore } from '@/data/usersStore';
// import { getUsers } from "@/app/api/Users/getallusers";
// import { toggleUserStatus } from "@/app/api/Users/toggleuser";
// import { createUser } from "@/app/api/Users/addusers";
// import { 
//   Plus, 
//   Search,
//   UserPlus,
//   Shield,
//   Users,
//   Eye,
//   EyeOff,
//   Mail,
//   Phone,
//   Calendar,
//   CheckCircle2,
//   XCircle,
//   Edit
// } from 'lucide-react';

// export function UserManagement({ userRole }) {  // Removed investors from props since we'll fetch them
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isAddUserOpen, setIsAddUserOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [investors, setInvestors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [investorsLoading, setInvestorsLoading] = useState(false);
//   const [togglingUserId, setTogglingUserId] = useState(null);
//   const [addinguser, setAddinguser] = useState(false);

//   // Fetch investors from API
//   const fetchInvestors = async () => {
//     setInvestorsLoading(true);
//     try {
//       const response = await fetch('https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Investors');
//       const data = await response.json();
      
//       // Handle different response structures
//       let investorsData = [];
      
//       if (Array.isArray(data)) {
//         investorsData = data;
//       } else if (data.data && Array.isArray(data.data)) {
//         investorsData = data.data;
//       } else if (data.investors && Array.isArray(data.investors)) {
//         investorsData = data.investors;
//       }
      
//       // Filter out any null/undefined values and map to consistent format
//       const formattedInvestors = investorsData
//         .filter(inv => inv != null)
//         .map(inv => ({
//           id: inv.id || inv.investorId || inv._id,
//           name: inv.investorName || 'Unknown',
//           cprNumber: inv.cprNumber || inv.cpr || inv.CPRNumber || 'N/A',
//           contactNumber: inv.contactNumber || inv.phone || inv.mobile || 'N/A',
//           email: inv.email || inv.Email || '',
//           status: inv.status || inv.isActive || 'Active'
//         }));
      
//       setInvestors(formattedInvestors);
//     } catch (error) {
//       console.error('Error fetching investors:', error);
//       setInvestors([]);
//     } finally {
//       setInvestorsLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const data = await getUsers();
//       setUsers(Array.isArray(data) ? data.filter(user => user != null) : []);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch both users and investors on component mount
//   useEffect(() => {
//     fetchUsers();
//     fetchInvestors();
//   }, []);

//   // Subscribe to changes in the users store
//   useEffect(() => {
//     const unsubscribe = usersStore.subscribe(() => {
//       const storeUsers = usersStore.getUsers();
//       setUsers(Array.isArray(storeUsers) ? storeUsers.filter(user => user != null) : []);
//     });
//     return unsubscribe;
//   }, []);

//   const [newUser, setNewUser] = useState({
//     email: '',
//     password: '',
//     name: '',
//     role: 'Investor',
//     investorId: '',
//   });

//   // Safe filtering with optional chaining and null checks
//   const filteredUsers = (Array.isArray(users) ? users : []).filter((user) => {
//     if (!user) return false;
    
//     const searchLower = searchQuery.toLowerCase();
    
//     const nameMatch = user.name?.toLowerCase().includes(searchLower) || false;
//     const emailMatch = user.email?.toLowerCase().includes(searchLower) || false;
//     const roleMatch = user.roleName?.toLowerCase().includes(searchLower) || false;
    
//     return nameMatch || emailMatch || roleMatch;
//   });

//   const handleAddUser = async () => {
//     if (!newUser.email || !newUser.password || !newUser.name || !newUser.role) {
//       alert('Please fill all required fields');
//       return;
//     }

//     if (newUser.role === 'Investor' && !newUser.investorId) {
//       alert('Please select an investor profile');
//       return;
//     }

//     setAddinguser(true);

//     const payload = {
//       email: newUser.email,
//       password: newUser.password,
//       fullName: newUser.name,
//       roleName: newUser.role,
//       investorProfileId: newUser.role === 'Investor' ? newUser.investorId : null,
//     };

//     const response = await createUser(payload);
//     setAddinguser(false);
    
//     console.log("Create User Payload:", payload);
//     console.log("API Response:", response);
    
//     setNewUser({
//       email: '',
//       password: '',
//       name: '',
//       role: 'Investor',
//       investorId: '',
//     });
//     setIsAddUserOpen(false);
//     alert(response?.message || 'User created successfully');
//     fetchUsers();
//   };
  
//   const handleToggleStatus = async (userId) => {
//     try {
//       setTogglingUserId(userId);
//       await toggleUserStatus(userId);
//       fetchUsers();
//     } catch (error) {
//       alert("Failed to update user status");
//     } finally {
//       setTogglingUserId(null);
//     }
//   };

//   const getRoleBadgeVariant = (role) => {
//     switch (role) {
//       case 'Super Admin':
//         return 'default';
//       case 'Admin':
//         return 'secondary';
//       case 'Investor':
//         return 'outline';
//       default:
//         return 'outline';
//     }
//   };

//   const getInvestorName = (investorId) => {
//     if (!investorId) return null;
//     const investor = investors?.find(i => i.id === investorId);
//     return investor ? investor.name : 'Unknown Investor';
//   };

//   // Safe count calculations
//   const activeUsersCount = (Array.isArray(users) ? users : []).filter(u => u?.status === 1).length;
//   const investorCount = (Array.isArray(users) ? users : []).filter(u => u?.roleName === 'Investor').length;
//   const adminCount = (Array.isArray(users) ? users : []).filter(u => u?.roleName === 'Admin' || u?.roleName === 'SuperAdmin').length;

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
//               <Shield className="h-8 w-8 text-primary" />
//               User Management
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Manage system users and investor account access
//             </p>
//           </div>
//           <Button onClick={() => setIsAddUserOpen(true)} className="gap-2">
//             <UserPlus className="h-4 w-4" />
//             Create New User
//           </Button>
//         </div>

//         {/* Stats Cards - Same as before */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {/* ... stats cards remain the same ... */}
//           <Card className="bg-card border-border">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//               <Users className="h-4 w-4 text-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">
//                 {Array.isArray(users) ? users.length : 0}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">Active Users</CardTitle>
//               <CheckCircle2 className="h-4 w-4 text-green-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">
//                 {activeUsersCount}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">Investor Accounts</CardTitle>
//               <Users className="h-4 w-4 text-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">
//                 {investorCount}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
//               <Shield className="h-4 w-4 text-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">
//                 {adminCount}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search by name, email, or role..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10 bg-card"
//           />
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
//             <p className="mt-2 text-muted-foreground">Loading users...</p>
//           </div>
//         )}

//         {/* Users List - Same as before */}
//         {!loading && (
//           <Card className="bg-card border-border">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Users className="h-5 w-5 text-primary" />
//                 System Users ({filteredUsers.length})
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ScrollArea className="h-[600px] pr-4">
//                 <div className="space-y-3">
//                   {filteredUsers.length > 0 ? (
//                     filteredUsers.map((user) => (
//                       <div
//                         key={user.id}
//                         className="p-4 bg-secondary rounded-lg border border-border hover:border-primary transition-colors"
//                       >
//                         {/* ... user card content remains the same ... */}
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-3 mb-2">
//                               <h3 className="font-semibold text-foreground text-lg">{user.fullName || 'No Name'}</h3>
//                               <Badge variant={getRoleBadgeVariant(user.role)}>
//                                 {user.roleName || 'Unknown'}
//                               </Badge>
//                               <Badge variant={user.status === 1 ? 'default' : 'secondary'}>
//                                 {user.status === 1 ? 'Active' : 'Inactive'}
//                               </Badge>
//                             </div>
                            
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
//                               <div className="flex items-center gap-2 text-muted-foreground">
//                                 <Mail className="h-4 w-4" />
//                                 <span>{user.email || 'No Email'}</span>
//                               </div>
                              
//                               <div className="flex items-center gap-2 text-muted-foreground">
//                                 <Calendar className="h-4 w-4" />
//                                 <span>Created: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
//                               </div>

//                               {user.role === 'Investor' && user.investorId && (
//                                 <div className="flex items-center gap-2 text-muted-foreground col-span-2">
//                                   <Users className="h-4 w-4" />
//                                   <span>Linked to: {getInvestorName(user.investorId)}</span>
//                                 </div>
//                               )}
//                             </div>

//                             {!user.password && (
//                               <div className="mt-3 pt-3 border-t border-border">
//                                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                                   <span className="font-mono bg-muted px-2 py-1 rounded">
//                                     Password: {user.password || "*********"}
//                                   </span>
//                                 </div>
//                               </div>
//                             )}
//                           </div>

//                           <div className="flex gap-2">
//                             <Button
//                               variant={user.status === 1 ? 'destructive' : 'default'}
//                               size="sm"
//                               onClick={() => handleToggleStatus(user.id)}
//                             >
//                               {togglingUserId === user.id ? (
//                                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                               ) : user.status === 1 ? (
//                                 <>
//                                   <XCircle className="h-4 w-4 mr-1" />
//                                   Deactivate
//                                 </>
//                               ) : (
//                                 <>
//                                   <CheckCircle2 className="h-4 w-4 mr-1" />
//                                   Activate
//                                 </>
//                               )}
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-8 text-muted-foreground">
//                       No users found
//                     </div>
//                   )}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         )}

//         {/* Add User Modal */}
//         <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
//           <DialogContent className="bg-card max-w-2xl max-h-[90vh] flex flex-col">
//             <DialogHeader className="flex-shrink-0">
//               <DialogTitle className="flex items-center gap-2">
//                 <UserPlus className="h-5 w-5 text-primary" />
//                 Create New User Account
//               </DialogTitle>
//               <DialogDescription>
//                 Create a new user account with specific role and permissions. For investors, link to their investor profile.
//               </DialogDescription>
//             </DialogHeader>

//             {/* Scrollable content area */}
//             <div className="flex-1 overflow-y-auto px-1 py-4">
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full Name *</Label>
//                   <Input
//                     id="name"
//                     placeholder="Enter full name"
//                     value={newUser.name}
//                     onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                     className="bg-input-background"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email Address *</Label>
//                   <Input
//                     autoComplete='off'
//                     id="email"
//                     type="email"
//                     placeholder="user@example.com"
//                     value={newUser.email}
//                     onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                     className="bg-input-background"
//                   />
//                 </div>

//                 {/* Password */}
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password *</Label>
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       type={showPassword ? 'text' : 'password'}
//                       placeholder="Enter secure password"
//                       value={newUser.password}
//                       onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//                       className="bg-input-background pr-10"
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4 text-muted-foreground" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-muted-foreground" />
//                       )}
//                     </Button>
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     Password will be visible to you and can be shared with the user
//                   </p>
//                 </div>

//                 {/* Role */}
//                 <div className="space-y-2">
//                   <Label htmlFor="role">User Role *</Label>
//                   <Select 
//                     value={newUser.role} 
//                     onValueChange={(value) => setNewUser({ ...newUser, role: value, investorId: '' })}
//                   >
//                     <SelectTrigger className="bg-input-background">
//                       <SelectValue placeholder="Select role" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Investor">Investor - Portal Access Only</SelectItem>
//                       <SelectItem value="SuperAdmin">SuperAdmin - Full Management Access</SelectItem>
//                       <SelectItem value="Admin">Admin - Full Management Access</SelectItem>
//                       <SelectItem value="Operations">Operations - Operational Tasks</SelectItem>
//                       <SelectItem value="Driver">Driver - Limited Access</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Investor Selection - Only for Investor Role */}
//                 {newUser.role === 'Investor' && (
//                   <div className="space-y-2">
//                     <Label htmlFor="investorId">Link to Investor Profile *</Label>
//                     {investorsLoading ? (
//                       <div className="flex items-center justify-center py-4">
//                         <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
//                         <span className="ml-2 text-sm text-muted-foreground">Loading investors...</span>
//                       </div>
//                     ) : (
//                       <Select 
//                         value={newUser.investorId} 
//                         onValueChange={(value) => setNewUser({ ...newUser, investorId: value })}
//                       >
//                         <SelectTrigger className="bg-input-background">
//                           <SelectValue placeholder="Select investor profile" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {investors && Array.isArray(investors) && investors.length > 0 ? (
//                             investors
//                               .filter(inv => {
//                                 // Filter out investors that already have active user accounts
//                                 const hasActiveUser = users.some(
//                                   u => u?.investorId === inv?.id && u?.status === 1
//                                 );
//                                 return !hasActiveUser;
//                               })
//                               .map((investor) => (
//                                 <SelectItem key={investor?.id} value={investor?.id}>
//                                   <div className="flex flex-row items-center gap-2">

//                                     <span className="font-medium">{investor?.name}</span>
//                                     <span className="text-xs text-muted-foreground">
//                                       CPR: {investor?.cprNumber} | {investor?.contactNumber}
//                                     </span>
//                                   </div>
//                                 </SelectItem>
//                               ))
//                           ) : (
//                             <SelectItem value="no-investors" disabled>
//                               No investors available
//                             </SelectItem>
//                           )}
//                         </SelectContent>
//                       </Select>
//                     )}
                    
//                     {/* Show selected investor details */}
//                     {newUser.investorId && (
//                       <div className="mt-2 p-3 bg-muted rounded-lg">
//                         <p className="text-sm font-medium">Selected Investor:</p>
//                         <p className="text-sm text-muted-foreground">
//                           {investors.find(i => i.id === newUser.investorId)?.name}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           CPR: {investors.find(i => i.id === newUser.investorId)?.cprNumber}
//                         </p>
//                       </div>
//                     )}
                    
//                     <p className="text-xs text-muted-foreground">
//                       This user will only see data related to the selected investor profile
//                     </p>
//                   </div>
//                 )}

//                 {/* Warning for Investor Role */}
//                 {newUser.role === 'Investor' && (
//                   <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
//                     <div className="flex gap-3">
//                       <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />
//                       <div className="text-sm">
//                         <p className="font-semibold text-blue-500 mb-1">Investor Account Restrictions</p>
//                         <ul className="text-muted-foreground space-y-1 list-disc list-inside">
//                           <li>Can only view their own investment portfolio</li>
//                           <li>Can see cars they have invested in</li>
//                           <li>Can view their profit/loss statements</li>
//                           <li>Cannot see other investors' data</li>
//                           <li>Cannot access system-wide financials</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex gap-3 justify-end flex-shrink-0 pt-4 border-t">
//               <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
//                 Cancel
//               </Button>
//               {addinguser ? (
//                 <Button disabled>
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 </Button>
//               ) : (
//                 <Button onClick={handleAddUser}>
//                   <UserPlus className="h-4 w-4 mr-2" />
//                   Create User
//                 </Button>
//               )}
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { usersStore } from '@/data/usersStore';
import { getUsers } from "@/app/api/Users/getallusers";
import { toggleUserStatus } from "@/app/api/Users/toggleuser";
import { createUser } from "@/app/api/Users/addusers";
import { 
  Plus, 
  Search,
  UserPlus,
  Shield,
  Users,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  Edit,
  ChevronDown,
  X
} from 'lucide-react';

// Custom Searchable Select Component
// Custom Searchable Select Component
const SearchableInvestorSelect = ({ value, onChange, investors, loading, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        handleClose();
      }
    };

    const handleEscape = (e) => {
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

  const filteredInvestors = investors.filter(investor => 
    investor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.cprNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.contactNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedInvestor = investors.find(i => i.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input  px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedInvestor ? (
          <span className="flex-1 text-left">
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
        <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md">
          {/* Search Input */}
          <div className="flex items-center border-b px-3">
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

          {/* Options */}
          <ScrollArea className="max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <span className="ml-2 text-sm text-muted-foreground">Loading investors...</span>
              </div>
            ) : filteredInvestors.length > 0 ? (
              filteredInvestors.map((investor) => (
                <button
                  key={investor.id}
                  type="button"
                  onClick={() => {
                    onChange(investor.id);
                    handleClose();
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                    value === investor.id ? 'bg-accent' : ''
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

export function UserManagement({ userRole }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [investorsLoading, setInvestorsLoading] = useState(false);
  const [togglingUserId, setTogglingUserId] = useState(null);
  const [addinguser, setAddinguser] = useState(false);

  // Fetch investors from API - only called when needed
  const fetchInvestors = async () => {
    // Don't fetch if already loading or if we already have investors
    if (investorsLoading || investors.length > 0) return;
    
    setInvestorsLoading(true);
    try {
      const response = await fetch('https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Investors');
      const data = await response.json();
      
      // Handle different response structures
      let investorsData = [];
      
      if (Array.isArray(data)) {
        investorsData = data;
      } else if (data.data && Array.isArray(data.data)) {
        investorsData = data.data;
      } else if (data.investors && Array.isArray(data.investors)) {
        investorsData = data.investors;
      }
      
      // Filter out any null/undefined values and map to consistent format
      const formattedInvestors = investorsData
        .filter(inv => inv != null)
        .map(inv => ({
          id: inv.id || inv.investorId || inv._id,
          name: inv.investorName  || 'Unknown',
          cprNumber: inv.cprNumber  || 'N/A',
          contactNumber: inv.contactNumber  || 'N/A',
          email: inv.email  || '',
          status:  inv.isActive ? 'Active' : 'Inactive',
        }));
      
      setInvestors(formattedInvestors);
    } catch (error) {
      console.error('Error fetching investors:', error);
      setInvestors([]);
    } finally {
      setInvestorsLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data.filter(user => user != null) : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Subscribe to changes in the users store
  useEffect(() => {
    const unsubscribe = usersStore.subscribe(() => {
      const storeUsers = usersStore.getUsers();
      setUsers(Array.isArray(storeUsers) ? storeUsers.filter(user => user != null) : []);
    });
    return unsubscribe;
  }, []);

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    name: '',
    role: 'Investor',
    investorId: '',
  });

  // Safe filtering with optional chaining and null checks
  const filteredUsers = (Array.isArray(users) ? users : []).filter((user) => {
    if (!user) return false;
    
    const searchLower = searchQuery.toLowerCase();
    
    const nameMatch = user.name?.toLowerCase().includes(searchLower) || false;
    const emailMatch = user.email?.toLowerCase().includes(searchLower) || false;
    const roleMatch = user.roleName?.toLowerCase().includes(searchLower) || false;
    
    return nameMatch || emailMatch || roleMatch;
  });

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.password || !newUser.name || !newUser.role) {
      alert('Please fill all required fields');
      return;
    }

    if (newUser.role === 'Investor' && !newUser.investorId) {
      alert('Please select an investor profile');
      return;
    }

    setAddinguser(true);

    const payload = {
      email: newUser.email,
      password: newUser.password,
      fullName: newUser.name,
      roleName: newUser.role,
      investorProfileId: newUser.role === 'Investor' ? newUser.investorId : null,
    };

    const response = await createUser(payload);
    setAddinguser(false);
    
    console.log("Create User Payload:", payload);
    console.log("API Response:", response);
    
    setNewUser({
      email: '',
      password: '',
      name: '',
      role: 'Investor',
      investorId: '',
    });
    setIsAddUserOpen(false);
    alert(response?.message || 'User created successfully');
    fetchUsers();
  };
  
  const handleToggleStatus = async (userId) => {
    try {
      setTogglingUserId(userId);
      await toggleUserStatus(userId);
      fetchUsers();
    } catch (error) {
      alert("Failed to update user status");
    } finally {
      setTogglingUserId(null);
    }
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'Super Admin':
        return 'default';
      case 'Admin':
        return 'secondary';
      case 'Investor':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getInvestorName = (investorId) => {
    if (!investorId) return null;
    const investor = investors?.find(i => i.id === investorId);
    return investor ? investor.name : 'Unknown Investor';
  };

  // Safe count calculations
  const activeUsersCount = (Array.isArray(users) ? users : []).filter(u => u?.status === 1).length;
  const investorCount = (Array.isArray(users) ? users : []).filter(u => u?.roleName === 'Investor').length;
  const adminCount = (Array.isArray(users) ? users : []).filter(u => u?.roleName === 'Admin' || u?.roleName === 'SuperAdmin').length;

  // Filter out investors that already have active user accounts
  const availableInvestors = investors.filter(inv => {
    const hasActiveUser = users.some(
      u => u?.investorId === inv?.id && u?.status === 1
    );
    return !hasActiveUser;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              User Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage system users and investor account access
            </p>
          </div>
          <Button onClick={() => setIsAddUserOpen(true)} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Create New User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {Array.isArray(users) ? users.length : 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {activeUsersCount}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Investor Accounts</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {investorCount}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {adminCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
          id='searchname'
            autoComplete="off"
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-2 text-muted-foreground">Loading users...</p>
          </div>
        )}

        {/* Users List */}
        {!loading && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                System Users ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="p-4 bg-secondary rounded-lg border border-border hover:border-primary transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground text-lg">{user.fullName || 'No Name'}</h3>
                              <Badge variant={getRoleBadgeVariant(user.role)}>
                                {user.roleName || 'Unknown'}
                              </Badge>
                              <Badge variant={user.status === 1 ? 'default' : 'secondary'}>
                                {user.status === 1 ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>{user.email || 'No Email'}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Created: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
                              </div>

                              {user.role === 'Investor' && user.investorId && (
                                <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                                  <Users className="h-4 w-4" />
                                  <span>Linked to: {getInvestorName(user.investorId)}</span>
                                </div>
                              )}
                            </div>

                            {!user.password && (
                              <div className="mt-3 pt-3 border-t border-border">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span className="font-mono bg-muted px-2 py-1 rounded">
                                    Password: {user.password || "*********"}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant={user.status === 1 ? 'destructive' : 'default'}
                              size="sm"
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {togglingUserId === user.id ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              ) : user.status === 1 ? (
                                <>
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Activate
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No users found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Add User Modal */}
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogContent className="bg-card max-w-2xl max-h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Create New User Account
              </DialogTitle>
              <DialogDescription>
                Create a new user account with specific role and permissions. For investors, link to their investor profile.
              </DialogDescription>
            </DialogHeader>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto px-1 py-4">
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="bg-input-background"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    autoComplete="off"
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="bg-input-background"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter secure password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="bg-input-background pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password will be visible to you and can be shared with the user
                  </p>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">User Role *</Label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value) => setNewUser({ ...newUser, role: value, investorId: '' })}
                  >
                    <SelectTrigger className="bg-input-background">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin - Full Management Access</SelectItem>
                      <SelectItem value="Investor">Investor - Portal Access Only</SelectItem>
                      <SelectItem value="SuperAdmin">SuperAdmin - Full Management Access</SelectItem>
                      <SelectItem value="Operations">Operations - Operational Tasks</SelectItem>
                      <SelectItem value="Driver">Driver - Limited Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Investor Selection - Only for Investor Role */}
                {newUser.role === 'Investor' && (
                  <div className="space-y-2">
                    <Label htmlFor="investorId">Link to Investor Profile *</Label>
                    
                    {/* Searchable Investor Dropdown */}
                    <SearchableInvestorSelect
                      value={newUser.investorId}
                      onChange={(value) => setNewUser({ ...newUser, investorId: value })}
                      investors={availableInvestors}
                      loading={investorsLoading}
                      onOpen={fetchInvestors}
                    />
                    
                    {/* Show selected investor details */}
                    {newUser.investorId && (
                      <div className="mt-2 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">Selected Investor:</p>
                        <p className="text-sm text-muted-foreground">
                          {investors.find(i => i.id === newUser.investorId)?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          CPR: {investors.find(i => i.id === newUser.investorId)?.cprNumber}
                        </p>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      This user will only see data related to the selected investor profile
                    </p>
                  </div>
                )}

                {/* Warning for Investor Role */}
                {newUser.role === 'Investor' && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex gap-3">
                      <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold text-blue-500 mb-1">Investor Account Restrictions</p>
                        <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Can only view their own investment portfolio</li>
                          <li>Can see cars they have invested in</li>
                          <li>Can view their profit/loss statements</li>
                          <li>Cannot see other investors' data</li>
                          <li>Cannot access system-wide financials</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-end flex-shrink-0 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              {addinguser ? (
                <Button disabled>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </Button>
              ) : (
                <Button onClick={handleAddUser}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create User
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
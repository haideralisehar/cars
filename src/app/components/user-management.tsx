import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { User, UserRole, Investor } from '@/types';
import { usersStore } from '@/data/usersStore';
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
  Edit
} from 'lucide-react';

interface UserManagementProps {
  userRole: 'SuperAdmin';
  investors: Investor[];
}

export function UserManagement({ userRole, investors }: UserManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState<User[]>(usersStore.getUsers());

  // Subscribe to changes in the users store
  useEffect(() => {
    const unsubscribe = usersStore.subscribe(() => {
      setUsers(usersStore.getUsers());
    });
    return unsubscribe;
  }, []);

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    name: '',
    role: 'Investor' as UserRole,
    investorId: '',
  });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.email || !newUser.password || !newUser.name || !newUser.role) {
      alert('Please fill all required fields');
      return;
    }

    // Check if email already exists
    if (usersStore.getUserByEmail(newUser.email)) {
      alert('A user with this email already exists');
      return;
    }

    if (newUser.role === 'Investor' && !newUser.investorId) {
      alert('Please select an investor profile');
      return;
    }

    const user: User = {
      id: `user-${Date.now()}`,
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      role: newUser.role,
      status: 'Active',
      investorId: newUser.role === 'Investor' ? newUser.investorId : undefined,
      createdAt: new Date().toISOString(),
      createdBy: 'user-1', // Current super admin ID
    };

    usersStore.addUser(user);
    setNewUser({
      email: '',
      password: '',
      name: '',
      role: 'Investor',
      investorId: '',
    });
    setIsAddUserOpen(false);
  };

  const handleToggleStatus = (userId: string) => {
    const user = usersStore.getUserById(userId);
    if (user) {
      usersStore.updateUser(userId, {
        status: user.status === 'Active' ? 'Inactive' : 'Active'
      });
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
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

  const getInvestorName = (investorId?: string) => {
    if (!investorId) return null;
    const investor = investors.find(i => i.id === investorId);
    return investor ? investor.name : 'Unknown Investor';
  };

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
              <div className="text-2xl font-bold text-foreground">{users.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {users.filter(u => u.status === 'Active').length}
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
                {users.filter(u => u.role === 'Investor').length}
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
                {users.filter(u => u.role === 'Admin' || u.role === 'Super Admin').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>

        {/* Users List */}
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
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 bg-secondary rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground text-lg">{user.name}</h3>
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Created: {new Date(user.createdAt).toLocaleDateString()}</span>
                          </div>

                          {user.role === 'Investor' && user.investorId && (
                            <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                              <Users className="h-4 w-4" />
                              <span>Linked to: {getInvestorName(user.investorId)}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-mono bg-muted px-2 py-1 rounded">
                              Password: {user.password}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant={user.status === 'Active' ? 'destructive' : 'default'}
                          size="sm"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === 'Active' ? (
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
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

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
            onValueChange={(value) => setNewUser({ ...newUser, role: value as UserRole, investorId: '' })}
          >
            <SelectTrigger className="bg-input-background">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Investor">Investor - Portal Access Only</SelectItem>
              <SelectItem value="Admin">Admin - Full Management Access</SelectItem>
              <SelectItem value="Operations">Operations - Operational Tasks</SelectItem>
              <SelectItem value="Driver">Driver - Limited Access</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {newUser.role === 'Investor' && 'Investor users can only see their own portfolio'}
            {newUser.role === 'Admin' && 'Admin users have full access except user management'}
            {newUser.role === 'Operations' && 'Operations users can manage daily operations'}
            {newUser.role === 'Driver' && 'Driver users have limited access to specific features'}
          </p>
        </div>

        {/* Investor Selection - Only for Investor Role */}
        {newUser.role === 'Investor' && (
          <div className="space-y-2">
            <Label htmlFor="investorId">Link to Investor Profile *</Label>
            <Select 
              value={newUser.investorId} 
              onValueChange={(value) => setNewUser({ ...newUser, investorId: value })}
            >
              <SelectTrigger className="bg-input-background">
                <SelectValue placeholder="Select investor profile" />
              </SelectTrigger>
              <SelectContent>
                {investors
                  .filter(inv => !users.some(u => u.investorId === inv.id && u.status === 'Active'))
                  .map((investor) => (
                    <SelectItem key={investor.id} value={investor.id}>
                      {investor.name} - {investor.contactNumber}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
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
      <Button onClick={handleAddUser}>
        <UserPlus className="h-4 w-4 mr-2" />
        Create User
      </Button>
    </div>
  </DialogContent>
</Dialog>
      </div>
    </div>
  );
}
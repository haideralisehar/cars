import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Check, Trash2, Building2, Mail, Phone, MapPin, DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { 
  Plus, 
  Search,
  Users,
  FileText,
  IdCard,
  ArrowLeft,
  Edit,
  X
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  currentBalance: number;
  totalIncome: number;
  totalExpense: number;
  totalProfit: number;
  createdAt: string;
}

interface CompaniesProps {
  userRole: 'Admin' | 'SuperAdmin' | 'User' | 'Operations' | 'Driver' | 'Customer';
}

export function Company({ userRole }: CompaniesProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [viewingDetails, setViewingDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    currentBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    totalProfit: 0
  });

  const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
  const isSuperAdmin = userRole === 'SuperAdmin' || userRole === 'Admin';
  const isCustomer = userRole === 'Customer';

  // Fetch Companies
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/company');
      const data = await response.json();
      setCompanies(data);
      console.log("Company Data:", data);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.phone?.includes(searchQuery) ||
    company.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setViewingDetails(true);
    setEditMode(false);
  };

  const handleBackToList = () => {
    clearFormData();
    setViewingDetails(false);
    setSelectedCompany(null);
    setEditMode(false);
  };

  const handleEditClick = () => {
    if (selectedCompany) {
      setFormData({
        name: selectedCompany.name,
        email: selectedCompany.email,
        phone: selectedCompany.phone,
        address: selectedCompany.address,
        currentBalance: selectedCompany.currentBalance,
        totalIncome: selectedCompany.totalIncome,
        totalExpense: selectedCompany.totalExpense,
        totalProfit: selectedCompany.totalProfit
      });
      setEditMode(true);
    }
  };

  const handleSaveEdit = async () => {
    const isValid = formData.name.trim() !== "" && 
                    formData.email.trim() !== "" && 
                    formData.phone.trim() !== "" &&
                    formData.address.trim() !== "";

    if (!isValid) {
      alert('Please fill out all fields.');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/company/${selectedCompany?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        await fetchCompanies();
        setSaving(false);
        setEditMode(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          currentBalance: 0,
          totalIncome: 0,
          totalExpense: 0,
          totalProfit: 0
        });
        handleBackToList();
      } else {
        alert('Failed to update company');
        setSaving(false);
      }
    } catch (error) {
      console.error("Failed to update company:", error);
      alert('An error occurred while updating the company');
      setSaving(false);
    }
  };

  const handleAddCompany = async () => {
    const isValid = formData.name.trim() !== "" && 
                    formData.email.trim() !== "" && 
                    formData.phone.trim() !== "" &&
                    formData.address.trim() !== "";

    if (!isValid) {
      alert('Please fill out all fields.');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          currentBalance: formData.currentBalance,
          totalIncome: 0,
          totalExpense: 0,
          totalProfit: 0
        }),
      });
      //wewe
      
      if (response.ok) {
        await fetchCompanies();
        setAddModalOpen(false);
        clearFormData();
        setSaving(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          currentBalance: 0,
          totalIncome: 0,
          totalExpense: 0,
          totalProfit: 0
        });
      } else {
        alert('Failed to add company');
        setSaving(false);
      }
    } catch (error) {
      console.error("Failed to add company:", error);
      alert('An error occurred while adding the company');
      setSaving(false);
    }
  };


  const clearFormData = () => {
    setEditMode(false);
    setAddModalOpen(false)
    setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          currentBalance: 0,
          totalIncome: 0,
          totalExpense: 0,
          totalProfit: 0
        });
    };

  const handleDeleteCompany = async (companyId: string, companyName: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${companyName}? This action cannot be undone.`);
    
    if (!confirmDelete) return;
    
    setDeleting(true);
    try {
      const response = await fetch(`https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/company/${companyId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchCompanies();
        
        if (selectedCompany?.id === companyId) {
          handleBackToList();
        }
        
        alert('Company deleted successfully!');
      } else {
        alert('Failed to delete company. Please try again.');
      }
    } catch (error) {
      console.error("Failed to delete company:", error);
      alert('An error occurred while deleting the company.');
    } finally {
      setDeleting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BHD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Company Details View
  if (viewingDetails && selectedCompany) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={handleBackToList} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Companies
            </Button>
            {isSuperAdmin && !editMode && (
              <Button onClick={handleEditClick} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Company
              </Button>
            )}
          </div>

          {editMode ? (
            // Edit Form
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Edit Company</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Company Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone *</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Company Balance *</label>
                  <Input
                    value={formData.currentBalance}
                    onChange={(e) => setFormData({...formData, currentBalance: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Address *</label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md bg-input-background"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div className="flex gap-2 pt-4 justify-end">
                  {saving ? (
                    <Button disabled>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </Button>
                  ) : (
                    <Button onClick={handleSaveEdit}>Save Changes</Button>
                  )}
                  <Button variant="outline" onClick={() => clearFormData()}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            // View Details
            <>
              <Card className="bg-card border-border mb-6">
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Company Name</p>
                      <p className="text-lg font-semibold">{selectedCompany.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="text-lg font-semibold">{selectedCompany.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="text-lg font-semibold">{selectedCompany.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Address</p>
                      <p className="text-lg font-semibold">{selectedCompany.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Created At</p>
                      <p className="text-lg font-semibold">
                        {new Date(selectedCompany.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Wallet className="h-4 w-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                      </div>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(selectedCompany.currentBalance)}</p>
                    </div>
                    <div className="p-4 bg-green-500/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <p className="text-sm text-muted-foreground">Total Income</p>
                      </div>
                      <p className="text-2xl font-bold text-green-500">{formatCurrency(selectedCompany.totalIncome)}</p>
                    </div>
                    <div className="p-4 bg-red-500/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-4 w-4 text-red-500" />
                        <p className="text-sm text-muted-foreground">Total Expense</p>
                      </div>
                      <p className="text-2xl font-bold text-red-500">{formatCurrency(selectedCompany.totalExpense)}</p>
                    </div>
                    <div className="p-4 bg-blue-500/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-blue-500" />
                        <p className="text-sm text-muted-foreground">Total Profit</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-500">{formatCurrency(selectedCompany.totalProfit)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    );
  }

  // Main Companies List View
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Companies</h1>
            <p className="text-muted-foreground">Manage company information and records</p>
          </div>
          {isSuperAdmin && (
            <Button onClick={() => setAddModalOpen(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Add Company
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search companies by name, email, phone, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Companies</p>
                  <p className="text-2xl font-bold">{companies.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(companies.reduce((sum, c) => sum + c.currentBalance, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Profit</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(companies.reduce((sum, c) => sum + c.totalProfit, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <Card
              key={company.id}
              className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => handleCompanyClick(company)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <p>{company.email}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Phone className="h-3 w-3" />
                      <p>{company.phone}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <p className="line-clamp-1">{company.address}</p>
                    </div>
                  </div>
                  {isSuperAdmin && (
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCompany(company.id, company.name);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Balance</p>
                      <p className="text-sm font-semibold text-primary">{formatCurrency(company.currentBalance)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Profit</p>
                      <p className="text-sm font-semibold text-blue-500">{formatCurrency(company.totalProfit)}</p>
                    </div>
                  </div>
                </div>

                {company.totalProfit > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
                      Profitable
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No companies found</p>
              {isSuperAdmin && (
                <Button className="mt-4" onClick={() => setAddModalOpen(true)}>
                  <Plus className="h-5 w-5 mr-2" />
                  Add First Company
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Company Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Add New Company</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => clearFormData()}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Company Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone *</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                  <label className="text-sm font-medium mb-2 block">Company Balance *</label>
                  <Input
                    value={formData.currentBalance}
                    onChange={(e) => setFormData({...formData, currentBalance: parseFloat(e.target.value) || 0})}
                  />
                </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Address *</label>
                <textarea
                  className="w-full min-h-[80px] p-2 border rounded-md bg-input-background"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter company address"
                />
              </div>
              <div className="flex gap-2 pt-4 justify-end">
                {saving ? (
                  <Button disabled>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </Button>
                ) : (
                  <Button onClick={handleAddCompany} className="flex-1">Add Company</Button>
                )}
                <Button variant="outline" onClick={() => clearFormData()}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
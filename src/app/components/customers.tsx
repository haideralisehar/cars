import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { getCustomers } from "@/app/api/Customers/getCustomers";
import {uploadImage } from "@/app/api/UploadImage/uploadImage";
import { Label } from '@/app/components/ui/label';
import {Check, Trash2 } from 'lucide-react';
import { 
  Plus, 
  Search,
  Users,
  FileText,
  Phone,
  IdCard,
  ArrowLeft,
  Edit,
  X
} from 'lucide-react';

interface Customer {
  id: string;
  customerName: string;
  contactNumber: string;
  cprNumber: string;
  notes?: string;
  cprDocumentPath?: string;
}

interface CustomersProps {
  userRole: 'Admin' | 'SuperAdmin' | 'User' | 'Operations' | 'Driver' | 'Customer';
}

export function Customers({ userRole }: CustomersProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewingDetails, setViewingDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editMode, setEditMode] = useState(false);
   const [imageUploading, setImageUploading] = useState(false);
    const [carPhoto, setCarPhoto] = useState(null);
     const [solding, setsolding] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    contactNumber: '',
    cprNumber: '',
    notes: '',
    cprDocumentPath: ''
  });

  const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
  const isSuperAdmin = userRole === 'SuperAdmin' || userRole === 'Admin';
  const isCustomer = userRole === 'Customer';

  // Fetch Customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
      console.log("Customer Data:", data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contactNumber?.includes(searchQuery) ||
    customer.cprNumber?.includes(searchQuery)
  );

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setViewingDetails(true);
    setEditMode(false);
  };

  const handleBackToList = () => {
    setViewingDetails(false);
    setSelectedCustomer(null);
    setEditMode(false);
  };

  const handleEditClick = () => {
    if (selectedCustomer) {
      setFormData({
        customerName: selectedCustomer.customerName,
        contactNumber: selectedCustomer.contactNumber,
        cprNumber: selectedCustomer.cprNumber,
        notes: selectedCustomer.notes || '',
        cprDocumentPath: selectedCustomer.cprDocumentPath || ''
      });
      setEditMode(true);
    }
  };

  const handleSaveEdit = async () => {
     const isValid = formData.contactNumber.trim() !== "" && formData.cprNumber.trim() !== ""
    && formData.customerName.trim() !== "" ;

    const document = formData.cprDocumentPath.trim() !== "";

     if (!isValid) {
      alert('Please fill out all fields.');
      return;
    }

    if (!document) {
      alert('CPR Document is Required.');
      return;
    }

    setsolding(true);
    try {
      const response = await fetch(`https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Customers/${selectedCustomer?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        await fetchCustomers();
        setsolding(false);
        setEditMode(false);
        setFormData({
          customerName: '',
          contactNumber: '',
          cprNumber: '',
          notes: '',
          cprDocumentPath: ''
        });
        // const updatedCustomer = customers.find(c => c.id === selectedCustomer?.id);
        // if (updatedCustomer) {
        //   setSelectedCustomer(updatedCustomer);
        // }
         // Return to main customer page after successful edit
      handleBackToList();
        
      }
    } catch (error) {
      console.error("Failed to update customer:", error);
    }
  };

  const handleFileChange = async (e, type) => {
      const file = e.target.files?.[0];
      if (!file) return;
    
      try {
        setImageUploading(true);
    
        const fileUrl = await uploadImage(file);
    
        if (type === "cprDocument") {
          setCarPhoto(fileUrl);
    
          setFormData((prev) => ({
            ...prev,
            cprDocumentPath: fileUrl
          }));
    
          return;
        }
    
    
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setImageUploading(false);
      }
    };

  const handleAddCustomer = async () => {

    const isValid = formData.contactNumber.trim() !== "" && formData.cprNumber.trim() !== ""
    && formData.customerName.trim() !== "" ;

    const document = formData.cprDocumentPath.trim() !== "";

     if (!isValid) {
      alert('Please fill out all fields.');
      return;
    }

    if (!document) {
      alert('CPR Document is Required.');
      return;
    }

    setsolding(true);
    try {
      const response = await fetch('https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },


        body: JSON.stringify({
          customerName: formData.customerName,
          contactNumber: formData.contactNumber,
          cprNumber: formData.cprNumber,
          notes: formData.notes,
          cprDocumentPath: formData.cprDocumentPath
        }),
      });

      
      
      if (response.ok) {
        await fetchCustomers();
        setAddModalOpen(false);
        setsolding(false);
        setFormData({
          customerName: '',
          contactNumber: '',
          cprNumber: '',
          notes: '',
          cprDocumentPath: ''
        });
        fetchCustomers();
      }
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  };

  const [deleting, setDeleting] = useState(false);

const handleDeleteCustomer = async (customerId: string, customerName: string) => {
  const confirmDelete = window.confirm(`Are you sure you want to delete ${customerName}? This action cannot be undone.`);
  
  if (!confirmDelete) return;
  
  setDeleting(true);
  try {
    const response = await fetch(`https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Customers/${customerId}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      // Refresh the customer list
      await fetchCustomers();
      
      // If we were viewing the deleted customer's details, go back to list
      if (selectedCustomer?.id === customerId) {
        handleBackToList();
      }
      
      // Show success message (optional)
      alert('Customer deleted successfully!');
    } else {
      alert('Failed to delete customer. Please try again.');
    }
  } catch (error) {
    console.error("Failed to delete customer:", error);
    alert('An error occurred while deleting the customer.');
  } finally {
    setDeleting(false);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Customer Dashboard View (Self View)
  if (isCustomer) {
    const customerData = customers[0];
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-foreground">My Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Name</p>
                    <p className="text-xl font-bold">{customerData?.customerName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Number</p>
                    <p className="text-xl font-bold">{customerData?.contactNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <IdCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CPR Number</p>
                    <p className="text-xl font-bold">{customerData?.cprNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {customerData?.notes && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{customerData.notes}</p>
              </CardContent>
            </Card>
          )}

          {customerData?.cprDocumentPath && (
            <Card className="bg-card border-border mt-4">
              <CardHeader>
                <CardTitle>CPR Document</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={customerData.cprDocumentPath} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Document
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Customer Details View
  if (viewingDetails && selectedCustomer) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={handleBackToList} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Customers
            </Button>
            {isSuperAdmin && !editMode && (
              <Button onClick={handleEditClick} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Customer
              </Button>
            )}
          </div>

          {editMode ? (
            // Edit Form
            <Card className="bg-card border-border">
                 {imageUploading && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-black">Uploading document...</p>
    </div>
  </div>
)}
              <CardHeader>
                <CardTitle>Edit Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Customer Name</label>
                  <Input
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Contact Number</label>
                  <Input
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                  />
                </div>


                <div>
                  <label className="text-sm font-medium mb-2 block">CPR Number</label>
                  <Input
                    value={formData.cprNumber}
                    onChange={(e) => setFormData({...formData, cprNumber: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Notes</label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md bg-input-background"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="cpr-upload">Upload CPR Document (ID Card)</Label>
                  <Input
                    id="cpr-upload"
                    type="file"
                    disabled={imageUploading}
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "cprDocument")}
                    className="bg-input-background mt-1"
                  />
                 {formData.cprDocumentPath && (
                      <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
                    )}
                </div>

                {/* <div>
                  <label className="text-sm font-medium mb-2 block">CPR Document Path</label>
                  <Input
                    value={formData.cprDocumentPath}
                    onChange={(e) => setFormData({...formData, cprDocumentPath: e.target.value})}
                    placeholder="https://..."
                  />
                </div> */}
                <div className="flex gap-2 pt-4 justify-end">
                    {solding ? (
                <Button disabled>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </Button>
              ) : (
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              )}

                  
                  <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            // View Details
            <>
              <Card className="bg-card border-border mb-6">
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
                      <p className="text-lg font-semibold">{selectedCustomer.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Contact Number</p>
                      <p className="text-lg font-semibold">{selectedCustomer.contactNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">CPR Number</p>
                      <p className="text-lg font-semibold">{selectedCustomer.cprNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedCustomer.notes && (
                <Card className="bg-card border-border mb-6">
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{selectedCustomer.notes}</p>
                  </CardContent>
                </Card>
              )}

              {selectedCustomer.cprDocumentPath && (
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>CPR Document</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={selectedCustomer.cprDocumentPath} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-2"
                    >
                      View Document
                      <FileText className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // Main Customers List View
  return (
    <div className="min-h-screen bg-background p-6">
        {imageUploading && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-black">Uploading document...</p>
    </div>
  </div>
)}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Customers</h1>
            <p className="text-muted-foreground">Manage customer information and records</p>
          </div>
          {isSuperAdmin && (
            <Button onClick={() => setAddModalOpen(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Add Customer
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search customers by name, CPR, or phone..."
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
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">With Notes</p>
                  <p className="text-2xl font-bold">
                    {customers.filter(c => c.notes).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <IdCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">With CPR Document</p>
                  <p className="text-2xl font-bold">
                    {customers.filter(c => c.cprDocumentPath).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <Card
              key={customer.id}
              className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => handleCustomerClick(customer)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{customer.customerName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <p>{customer.contactNumber}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <IdCard className="h-3 w-3" />
                      <p>{customer.cprNumber}</p>
                    </div>
                  </div>
                </div>

                {customer.notes && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {customer.notes}
                      </p>
                    </div>
                  </div>
                )}

                {customer.cprDocumentPath && (
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      CPR Document Available
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div> */}


        {/* Customer Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredCustomers.map((customer) => (
    <Card
      key={customer.id}
      className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
      onClick={() => handleCustomerClick(customer)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{customer.customerName}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3 w-3" />
              <p>{customer.contactNumber}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <IdCard className="h-3 w-3" />
              <p>{customer.cprNumber}</p>
            </div>
          </div>
          {isSuperAdmin && (
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              {/* <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCustomer(customer);
                  setAddModalOpen(true);
                }}
              >
                
                <Edit className="h-4 w-4" />
              </Button> */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCustomer(customer.id, customer.customerName);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* {customer.notes && ( */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground line-clamp-2">
                {customer.notes || "Blanked Notes."}
              </p>
            </div>
          </div>
        {/* )} */}

        {customer.cprDocumentPath && (
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              CPR Document Available
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  ))}
</div>

        {filteredCustomers.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No customers found</p>
              {isSuperAdmin && (
                <Button className="mt-4" onClick={() => setAddModalOpen(true)}>
                  <Plus className="h-5 w-5 mr-2" />
                  Add First Customer
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Customer Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Add New Customer</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setAddModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Customer Name *</label>
                <Input
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Contact Number *</label>
                <Input
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                  placeholder="Enter contact number"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">CPR Number *</label>
                <Input
                  value={formData.cprNumber}
                  onChange={(e) => setFormData({...formData, cprNumber: e.target.value})}
                  placeholder="Enter CPR number"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Notes</label>
                <textarea
                  className="w-full min-h-[80px] p-2 border rounded-md bg-input-background"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Optional notes..."
                />
              </div>
              <div>
                  <Label htmlFor="cpr-upload">Upload CPR Document (ID Card)</Label>
                  <Input
                    id="cpr-upload"
                    type="file"
                    disabled={imageUploading}
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "cprDocument")}
                    className="bg-input-background mt-1"
                  />
                 {formData.cprDocumentPath && (
                      <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
                    )}
                </div>
              {/* <div>
                <label className="text-sm font-medium mb-2 block">CPR Document Path</label>
                <Input
                  value={formData.cprDocumentPath}
                  onChange={(e) => setFormData({...formData, cprDocumentPath: e.target.value})}
                  placeholder="https://... (optional)"
                />
              </div> */}
              <div className="flex gap-2 pt-4 justify-end">
                {solding ? (
                <Button disabled>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </Button>
              ) : (
                <Button onClick={handleAddCustomer} className="flex-1">Add Customer</Button>
              )}
                
                <Button variant="outline" onClick={() => setAddModalOpen(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
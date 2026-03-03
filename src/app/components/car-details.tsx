import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Input } from '@/app/components/ui/input';
import { MoneyRecord, mockMoneyRecords } from '@/types/money-record';
import { Car } from '@/types';
import { mockCars, mockInstallments } from '@/data/mockData';
import { ArrowLeft, Edit, FileText, Download, Wallet, Calendar, Upload, X } from 'lucide-react';

interface CarDetailsProps {
  carId: string;
  userRole: 'Admin' | 'Super Admin' | 'User' | 'Operations' | 'Driver' | 'Investor';
  onBack: () => void;
  onEdit?: () => void;
  onViewRecord?: (id: string) => void;
  onSellCar?: (carId: string) => void;
  onLeaseCar?: (carId: string) => void;
  onAddExpense?: (carId: string) => void;
}

export function CarDetails({ carId, userRole, onBack, onEdit, onViewRecord, onSellCar, onLeaseCar, onAddExpense }: CarDetailsProps) {
  const car = mockCars.find((c) => c.id === carId);
  const carMoneyRecords = mockMoneyRecords.filter((r) => r.linkedToId === carId);
  const carExpenses = carMoneyRecords.filter(r => r.isPayable && r.category === 'Expense');
  const carInstallments = mockInstallments.filter((i) => i.carId === carId);
  
  // Document state
  const [documents, setDocuments] = useState<{ [key: string]: string }>(car?.documents || {});
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const [isAddingOther, setIsAddingOther] = useState(false);
  const [newDocName, setNewDocName] = useState('');

  const isAdmin = userRole === 'Admin' || userRole === 'Super Admin';
  
  const handleDocumentUpload = (docType: string, file: File) => {
    setUploadingDoc(docType);
    
    // Simulate file upload
    setTimeout(() => {
      setDocuments(prev => ({
        ...prev,
        [docType]: file.name
      }));
      setUploadingDoc(null);
      setIsAddingOther(false);
      setNewDocName('');
    }, 1000);
  };
  
  const handleDocumentRemove = (docType: string) => {
    setDocuments(prev => {
      const updated = { ...prev };
      delete updated[docType];
      return updated;
    });
  };

  if (!car || !isAdmin) {
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
  const totalBuyingCost = car.buyingPrice + totalExpenses;
  const estimatedProfit = car.askingPrice - totalBuyingCost;

  const timelineEvents = [
    { id: '1', type: 'Created', description: 'Car added to inventory', timestamp: car.createdAt, user: 'Admin' },
    { id: '2', type: 'Expense', description: 'Oil change and brake service - $1,200', timestamp: '2025-01-20', user: 'Admin' },
    { id: '3', type: 'Expense', description: 'Front bumper repair - $850', timestamp: '2025-01-25', user: 'Technician' },
  ];

  const getStatusColor = (status: Car['status']) => {
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Inventory
          </Button>
          {(userRole === 'Admin' || userRole === 'Super Admin') && onEdit && (
            <Button onClick={onEdit}>
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
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {car.make} {car.model}
                  </h1>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(car.status)}>{car.status}</Badge>
                    <Badge variant="outline">{car.source}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{car.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-medium">{car.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">VIN</p>
                    <p className="font-medium text-sm">{car.vin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registration</p>
                    <p className="font-medium">{car.registrationNumber}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">Asking Price</p>
                  <p className="text-3xl font-bold text-primary">
                    ${car.askingPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-card">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {(userRole === 'Admin' || userRole === 'Super Admin') && (
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
                        <span className="font-medium">{car.make}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Model:</span>
                        <span className="font-medium">{car.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year:</span>
                        <span className="font-medium">{car.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Color:</span>
                        <span className="font-medium">{car.color}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Source Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Source:</span>
                        <span className="font-medium">{car.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium">{car.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Added:</span>
                        <span className="font-medium">
                          {new Date(car.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {car.leaseEnabled && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-medium mb-3">Lease Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lease Type:</span>
                        <span className="font-medium">{car.leaseType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lease Amount:</span>
                        <span className="font-medium">${car.leaseAmount}</span>
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
                        <p className="text-2xl font-bold">BHD {car.buyingPrice.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                        <p className="text-2xl font-bold text-destructive">
                          BHD {totalExpenses.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">Final Cost</p>
                        <p className="text-2xl font-bold">BHD {totalBuyingCost.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Selling Price</p>
                        <p className="text-2xl font-bold text-primary">
                          BHD {car.askingPrice.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Gross Profit</p>
                        <p className="text-2xl font-bold text-primary">
                          BHD {estimatedProfit.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground text-sm">VAT (10%):</span>
                            <span className="font-medium">
                              BHD {(estimatedProfit * 0.1).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground text-sm">Lease Income (Total):</span>
                            <span className="font-medium text-green-500">
                              BHD {(car.leaseEnabled ? car.leaseAmount * 5 : 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 flex flex-col justify-center items-center">
                          <span className="text-muted-foreground text-xs uppercase font-bold tracking-widest mb-1">Total Net Profit</span>
                          <span className="text-4xl font-black text-primary">
                            BHD {(estimatedProfit * 0.9).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Installments Tab */}
          <TabsContent value="installments">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Payment Installments</CardTitle>
              </CardHeader>
              <CardContent>
                {carInstallments.length > 0 ? (
                  <div className="space-y-3">
                    {carInstallments.map((inst) => (
                      <div
                        key={inst.id}
                        className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {inst.type} Installment
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(inst.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${inst.amount.toLocaleString()}</p>
                          <Badge
                            variant={
                              inst.status === 'Paid'
                                ? 'default'
                                : inst.status === 'Overdue'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {inst.status}
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
                  <p className="text-xl font-bold text-destructive">${totalExpenses.toLocaleString()}</p>
                </div>
              </CardHeader>
              <CardContent>
                {carExpenses.length > 0 ? (
                  <div className="space-y-3">
                    {carExpenses.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:ring-1 hover:ring-primary/30 transition-all cursor-pointer group"
                        onClick={() => onViewRecord && onViewRecord(record.id)}
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
                          <p className="font-black text-lg text-foreground">${record.payableAmount?.toLocaleString()}</p>
                          <Button variant="ghost" size="sm" className="h-7 text-[10px] mt-1">
                            Details
                          </Button>
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

          {/* Documents Tab */}
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
                          {documents.registration && (
                            <p className="text-sm text-muted-foreground">{documents.registration}</p>
                          )}
                        </div>
                      </div>
                      {documents.registration && (
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {isAdmin && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDocumentRemove('registration')}
                            >
                              <X className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    {!documents.registration && isAdmin && (
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
                          {documents.cpr && (
                            <p className="text-sm text-muted-foreground">{documents.cpr}</p>
                          )}
                        </div>
                      </div>
                      {documents.cpr && (
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {isAdmin && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDocumentRemove('cpr')}
                            >
                              <X className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    {!documents.cpr && isAdmin && (
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
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Insurance</p>
                          {documents.insurance && (
                            <p className="text-sm text-muted-foreground">{documents.insurance}</p>
                          )}
                        </div>
                      </div>
                      {documents.insurance && (
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
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
                    {!documents.insurance && isAdmin && (
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
                  </div>

                  {/* Additional Documents */}
                  {Object.keys(documents)
                    .filter(key => !['registration', 'cpr', 'insurance'].includes(key))
                    .map(key => (
                      <div key={key} className="p-4 bg-secondary rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium capitalize">{key.replace(/-/g, ' ')}</p>
                              <p className="text-sm text-muted-foreground">{documents[key]}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            {isAdmin && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDocumentRemove(key)}
                              >
                                <X className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

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
                            <div>
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
                            </div>
                            <div className="flex justify-end">
                              <Button variant="ghost" size="sm" onClick={() => setIsAddingOther(false)}>
                                Cancel
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
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <div className="w-0.5 h-full bg-border"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{event.type}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(event.timestamp).toLocaleDateString()}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
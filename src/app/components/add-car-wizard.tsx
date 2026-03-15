import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { Building2, User, Users, ArrowLeft, ArrowRight, Check, ChevronDown, Search } from 'lucide-react';
import { CarSource, PaymentType, LeaseType } from '@/types';
import { addInventory } from "@/app/api/CarInventory/addcarinventory";
import { ScrollArea } from './ui/scroll-area';
import { 
 
  X
} from 'lucide-react';

interface AddCarWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

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

export function AddCarWizard({ onComplete, onCancel }: AddCarWizardProps) {
  const [step, setStep] = useState(1);
  const [investors, setInvestors] = useState([]);
  const [investorsLoading, setInvestorsLoading] = useState(false);
  const [carSource, setCarSource] = useState<CarSource | null>(null);
  const [vehicleInfo, setVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    color: '',
    registrationNumber: '',
    insuranceExpiry: '',
  });
  const [financialDetails, setFinancialDetails] = useState({
    buyingPrice: '',
    askingPrice: '',
    paymentType: 'Full' as PaymentType,
    investorId: null,
    investorAmount: '',
    customerName: '',
    commission: '',
    MonthlyDueDate: '10', // New field for monthly due date
    commissionType: 'Fixed' as 'Fixed' | 'Percentage',
    leaseEnabled: false,
    leaseType: 'Daily' as LeaseType,
    leaseAmount: '',
    installmentDueDate: '5', // Default 5th of month
    installments: [] as { amount: string; dueDate: string }[],
  });

  // Add this near your other state declarations
  const [documents, setDocuments] = useState({
    registration: null,
    cpr: null,
    insurance: null,
    additional: null
  });

  const sourceOptions: { value: CarSource; label: string; icon: any; description: string }[] = [
    {
      value: 'Company Car',
      label: 'Company Car',
      icon: Building2,
      description: 'Vehicle owned by the company',
    },
    {
      value: 'Investor',
      label: 'Investor Car',
      icon: Users,
      description: 'Vehicle from investor partnership',
    },
    {
      value: 'Customer',
      label: 'Customer Car',
      icon: User,
      description: 'Consignment vehicle',
    },
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    try {

      const isVehicleInfoValid =
        vehicleInfo.make &&
        vehicleInfo.model &&
        vehicleInfo.year &&
        vehicleInfo.vin &&
        vehicleInfo.color &&
        vehicleInfo.registrationNumber &&
        vehicleInfo.insuranceExpiry;

      if (!isVehicleInfoValid) {
        alert("Please complete all vehicle information");
        return;
      }

      const isDocumentsValid =
        documents.registration &&
        documents.cpr &&
        documents.insurance;

      if (!isDocumentsValid) {
        alert("Please upload all required documents");
        return;
      }

      const isFinancialValid =
        financialDetails.buyingPrice &&
        financialDetails.askingPrice;

      const isFinancialValidInvestor =
        financialDetails.investorAmount &&
        financialDetails.askingPrice &&
        financialDetails.commission;

      if (carSource === "Company Car" && !isFinancialValid) {
        alert("Please complete financial details");
        return;
      }

      if (carSource === "Investor" && !isFinancialValidInvestor) {
        alert("Please complete financial details");
        return;
      }

      if (financialDetails.leaseEnabled) {
        if (!financialDetails.leaseAmount || !financialDetails.leaseType) {
          alert("Lease information is required");
          return;
        }
      }

      const carData = {
        carSource: carSource,

        investorId: carSource === "Investor" ? financialDetails.investorId : null,
        customerId: carSource === "Customer" ? financialDetails.customerName : null,

        make: vehicleInfo.make,
        model: vehicleInfo.model,
        year: Number(vehicleInfo.year),
        vin: vehicleInfo.vin,
        color: vehicleInfo.color,
        registrationNumber: vehicleInfo.registrationNumber,

        insuranceExpiryDate: vehicleInfo.insuranceExpiry,

        buyingPrice:
          carSource === "Company Car"
            ? Number(financialDetails.buyingPrice)
            : null,

        askingPrice: Number(financialDetails.askingPrice),

        paymentType:
          carSource === "Company Car"
            ? financialDetails.paymentType
            
            : "null",

        enableLease: financialDetails.leaseEnabled,

        leaseType: financialDetails.leaseEnabled
          ? financialDetails.leaseType
          : null,

        leaseAmount: financialDetails.leaseEnabled
          ? Number(financialDetails.leaseAmount)
          : null,

        monthlyRentDueDate: financialDetails.leaseEnabled
          ? Number(financialDetails.installmentDueDate)
          : null,

        MonthlyDueDate: financialDetails.paymentType === "Installment"
          ? financialDetails.MonthlyDueDate :
          null,

        registrationCard: documents.registration,
        cprDocument: documents.cpr,
        insuranceDocument: documents.insurance,
        additionalDocument: documents.additional
      };

      console.log("Car Data:", carData);

      const response = await addInventory(carData);

      console.log("API Response:", response);

      onComplete();
      

    } catch (error) {

      console.error("Error adding inventory:", error);

      alert(
        error?.message ||
        "Something went wrong while adding the car."
      );

    }
  };

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

  // Filter out investors that already have active user accounts
  // const availableInvestors = investors.filter(inv => {
  //   const hasActiveUser = users.some(
  //     u => u?.investorId === inv?.id && u?.status === 1
  //   );
  //   return !hasActiveUser;
  // });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${s === step
                    ? 'bg-primary text-primary-foreground'
                    : s < step
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary text-muted-foreground'
                    }`}
                >
                  {s < step ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 ${s < step ? 'bg-primary' : 'bg-secondary'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-20 mt-2">
            <span className="text-xs text-muted-foreground">Car Source</span>
            <span className="text-xs text-muted-foreground">Vehicle Info</span>
            <span className="text-xs text-muted-foreground">Financial</span>
          </div>
        </div>

        {/* Step 1: Car Source */}
        {step === 1 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Where is this car coming from?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sourceOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all ${carSource === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                        }`}
                      onClick={() => setCarSource(option.value)}
                    >
                      <CardContent className="p-6 text-center">
                        <Icon className="h-12 w-12 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold mb-1">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button onClick={handleNext} disabled={!carSource}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Vehicle Info */}
        {step === 2 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Form Section - Distinct Background */}
              <div className="p-6 rounded-lg border border-border" style={{ backgroundColor: 'var(--form-section)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="make">Make</Label>
                    <Input
                      id="make"
                      placeholder="e.g., BMW"
                      value={vehicleInfo.make}
                      onChange={(e) => setVehicleInfo({ ...vehicleInfo, make: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      placeholder="e.g., X5"
                      value={vehicleInfo.model}
                      onChange={(e) => setVehicleInfo({ ...vehicleInfo, model: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="2024"
                      value={vehicleInfo.year}
                      onChange={(e) => setVehicleInfo({ ...vehicleInfo, year: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      placeholder="e.g., Black"
                      value={vehicleInfo.color}
                      onChange={(e) => setVehicleInfo({ ...vehicleInfo, color: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vin">VIN / Chassis</Label>
                    <Input
                      id="vin"
                      placeholder="Vehicle identification number"
                      value={vehicleInfo.vin}
                      onChange={(e) => setVehicleInfo({ ...vehicleInfo, vin: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="registration">Registration Number</Label>
                    <Input
                      id="registration"
                      placeholder="e.g., ABC-1234"
                      value={vehicleInfo.registrationNumber}
                      onChange={(e) =>
                        setVehicleInfo({ ...vehicleInfo, registrationNumber: e.target.value })
                      }
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceExpiry">Insurance Expiry Date</Label>
                    <Input
                      id="insuranceExpiry"
                      type="date"
                      value={vehicleInfo.insuranceExpiry}
                      onChange={(e) =>
                        setVehicleInfo({ ...vehicleInfo, insuranceExpiry: e.target.value })
                      }
                      className="bg-input-background"
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload Section - Distinct Background */}
              {/* <div className="mt-6 p-6 rounded-lg border border-border" style={{ backgroundColor: 'var(--form-section)' }}>
                <h4 className="font-medium mb-3">Document Upload</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Registration Card (Required)</Label>
                    <Input type="file" className="bg-input-background mt-1" />
                  </div>
                  <div>
                    <Label>CPR Document (Required)</Label>
                    <Input type="file" className="bg-input-background mt-1" />
                  </div>
                  <div>
                    <Label>Insurance (Optional)</Label>
                    <Input type="file" className="bg-input-background mt-1" />
                  </div>
                  <div>
                    <Label>Additional Documents (Optional)</Label>
                    <Input type="file" multiple className="bg-input-background mt-1" />
                  </div>
                </div>
              </div> */}

              {/* Document Upload Section */}
              <div className="mt-6 p-6 rounded-lg border border-border" style={{ backgroundColor: 'var(--form-section)' }}>
                <h4 className="font-medium mb-3">Document Upload</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Registration Card (Required)</Label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setDocuments({ ...documents, registration: file });
                      }}
                      className="bg-input-background mt-1"
                    />
                    {documents.registration && (
                      <p className="text-xs text-green-500 mt-1">✓ {documents.registration.name}</p>
                    )}
                  </div>

                  <div>
                    <Label>CPR Document (Required)</Label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setDocuments({ ...documents, cpr: file });
                      }}
                      className="bg-input-background mt-1"
                    />
                    {documents.cpr && (
                      <p className="text-xs text-green-500 mt-1">✓ {documents.cpr.name}</p>
                    )}
                  </div>

                  <div>
                    <Label>Insurance (Optional)</Label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setDocuments({ ...documents, insurance: file });
                      }}
                      className="bg-input-background mt-1"
                    />
                    {documents.insurance && (
                      <p className="text-xs text-green-500 mt-1">✓ {documents.insurance.name}</p>
                    )}
                  </div>

                  <div>
                    <Label>Additional Documents (Optional)</Label>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const files = e.target.files ? Array.from(e.target.files) : [];
                        setDocuments({ ...documents, additional: files });
                      }}
                      className="bg-input-background mt-1"
                    />
                    {documents.additional?.length > 0 && (
                      <p className="text-xs text-green-500 mt-1">✓ {documents.additional.length} file(s) selected</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3 mt-6">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Financial Details */}
        {step === 3 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Company Car Fields */}
                {carSource === 'Company Car' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="buyingPrice">Buying Price (BHD)</Label>
                        <Input
                          id="buyingPrice"
                          type="number"
                          placeholder="0.000"
                          value={financialDetails.buyingPrice}
                          onChange={(e) =>
                            setFinancialDetails({ ...financialDetails, buyingPrice: e.target.value })
                          }
                          className="bg-input-background"
                        />
                      </div>
                      <div>
                        <Label htmlFor="askingPrice">Asking Price (BHD)</Label>
                        <Input
                          id="askingPrice"
                          type="number"
                          placeholder="0.000"
                          value={financialDetails.askingPrice}
                          onChange={(e) =>
                            setFinancialDetails({ ...financialDetails, askingPrice: e.target.value })
                          }
                          className="bg-input-background"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="paymentType">Payment Type</Label>
                        <Select
                          value={financialDetails.paymentType}
                          onValueChange={(value: PaymentType) =>
                            setFinancialDetails({ ...financialDetails, paymentType: value })
                          }
                        >
                          <SelectTrigger className="bg-input-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full">Full Payment</SelectItem>
                            <SelectItem value="Installment">Installment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {financialDetails.paymentType === 'Installment' && (
                        <div>
                          <Label htmlFor="dueDate">Monthly Due Date</Label>
                          <Select
                            value={financialDetails.MonthlyDueDate}
                            onValueChange={(value) =>
                              setFinancialDetails({ ...financialDetails, MonthlyDueDate: value })
                            }
                          >
                            <SelectTrigger className="bg-input-background">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 5, 10, 15, 20, 25, 28].map((day) => (
                                <SelectItem key={day} value={day.toString()}>
                                  Day {day} of month
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Investor Car Fields */}
                {carSource === 'Investor' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="investor">Select Investor</Label>
                      <SearchableInvestorSelect
                      value={financialDetails.investorId}
                      onChange={(value) => setFinancialDetails({ ...financialDetails, investorId: value })}
                      investors={investors}
                      loading={investorsLoading}
                      onOpen={fetchInvestors}
                    />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="investorAmount">Amount Used (BHD)</Label>
                        <Input
                          id="investorAmount"
                          type="number"
                          placeholder="0.000"
                          value={financialDetails.investorAmount}
                          onChange={(e) => setFinancialDetails({ ...financialDetails, investorAmount: e.target.value })}
                          className="bg-input-background"
                        />
                      </div>
                      <div>
                        <Label htmlFor="askingPrice">Asking Price (BHD)</Label>
                        <Input
                          id="askingPrice"
                          type="number"
                          placeholder="0.000"
                          value={financialDetails.askingPrice}
                          onChange={(e) =>
                            setFinancialDetails({ ...financialDetails, askingPrice: e.target.value })
                          }
                          className="bg-input-background"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Auto Lounge Commission (BHD)</Label>
                      <Input
                        type="number"
                        placeholder="Fixed commission for company"
                        value={financialDetails.commission}
                        onChange={(e) => setFinancialDetails({ ...financialDetails, commission: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>
                  </div>
                )}

                {/* Customer Car Fields */}
                {carSource === 'Customer' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customerName">Customer Details (Consignor)</Label>
                      <Input
                        id="customerName"
                        placeholder="Customer full name"
                        value={financialDetails.customerName}
                        onChange={(e) => setFinancialDetails({ ...financialDetails, customerName: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="askingPrice">Asking Price (BHD)</Label>
                        <Input
                          id="askingPrice"
                          type="number"
                          placeholder="0.000"
                          value={financialDetails.askingPrice}
                          onChange={(e) =>
                            setFinancialDetails({ ...financialDetails, askingPrice: e.target.value })
                          }
                          className="bg-input-background"
                        />
                      </div>
                      <div>
                        <Label>Auto Lounge Commission (BHD)</Label>
                        <Input
                          type="number"
                          placeholder="0.000"
                          value={financialDetails.commission}
                          onChange={(e) => setFinancialDetails({ ...financialDetails, commission: e.target.value })}
                          className="bg-input-background"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Lease Toggle (Common) */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label htmlFor="leaseEnabled">Enable Lease</Label>
                      <p className="text-sm text-muted-foreground">
                        Make this car available for lease
                      </p>
                    </div>
                    <Switch
                      id="leaseEnabled"
                      checked={financialDetails.leaseEnabled}
                      onCheckedChange={(checked) =>
                        setFinancialDetails({ ...financialDetails, leaseEnabled: checked })
                      }
                    />
                  </div>

                  {financialDetails.leaseEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="leaseType">Lease Type</Label>
                        <Select
                          value={financialDetails.leaseType}
                          onValueChange={(value: LeaseType) =>
                            setFinancialDetails({ ...financialDetails, leaseType: value })
                          }
                        >
                          <SelectTrigger className="bg-input-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Daily">Daily</SelectItem>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="leaseAmount">Lease Amount (BHD)</Label>
                        <Input
                          id="leaseAmount"
                          type="number"
                          placeholder="0.000"
                          value={financialDetails.leaseAmount}
                          onChange={(e) =>
                            setFinancialDetails({ ...financialDetails, leaseAmount: e.target.value })
                          }
                          className="bg-input-background"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rentDueDate">Monthly Rent Due Date</Label>
                        <Select
                          value={financialDetails.installmentDueDate}
                          onValueChange={(value) =>
                            setFinancialDetails({ ...financialDetails, installmentDueDate: value })
                          }
                        >
                          <SelectTrigger className="bg-input-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 5, 10, 15, 20, 25, 28].map((day) => (
                              <SelectItem key={day} value={day.toString()}>
                                Day {day} of month
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-3 mt-6">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleComplete}>
                  <Check className="mr-2 h-4 w-4" /> Save Car
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
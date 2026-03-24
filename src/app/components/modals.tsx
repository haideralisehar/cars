import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent } from '@/app/components/ui/card';
import { Car, PaymentType, LeaseType } from '@/types';
import { FileText, Check, ArrowLeft, ArrowRight, Download, Eye, UserPlus } from 'lucide-react';
import { soldCar } from '@/app/api/CarInventory/sellCar';
import { leaseCar } from "@/app/api/CarInventory/leaseCar";
import {uploadImage } from "@/app/api/UploadImage/uploadImage";

interface SellCarModalProps {
  carId: string;
  isOpen: boolean;
  onClose: () => void;
  car: Car;
  userRole: 'Admin' | 'SuperAdmin' | 'User' | 'Operations' | 'Driver' | 'Investor';
}

export function SellCarModal({ carId, isOpen, onClose, car, userRole }: SellCarModalProps) {
  const [step, setStep] = useState(1);
   const [solding, setsolding] = useState(false);

  
  
  // Step 1: Purchaser Details
  const [purchaserDetails, setPurchaserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    cpr: '',
    cprDocument: null,
    address: '',
  });

  // Step 2: Payment Terms
  const [paymentTerms, setPaymentTerms] = useState({
    sellingPrice: '',
    paymentType: 'Full' as PaymentType,
    advanceAmount: '',
    installmentCount: '6',
    installmentAmount: '',
    commission: '',
    commissionType: 'Fixed' as 'Fixed' | 'Percentage',
  });

  useEffect(() => {
  const totalPrice = parseFloat(paymentTerms.sellingPrice) || 0;
  const advance = parseFloat(paymentTerms.advanceAmount) || 0;
  const count = parseInt(paymentTerms.installmentCount) || 1;

  if (paymentTerms.paymentType === 'Installment' && totalPrice > 0) {
    const installment = ((totalPrice - advance) / count).toFixed(2);

    setPaymentTerms(prev => ({
      ...prev,
      installmentAmount: installment
    }));
  }
}, [
  paymentTerms.sellingPrice,
  paymentTerms.advanceAmount,
  paymentTerms.installmentCount,
  paymentTerms.paymentType
]);





  // Step 3: Review
  const [agreementGenerated, setAgreementGenerated] = useState(false);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
   const [imageUploading, setImageUploading] = useState(false);
    const [carPhoto, setCarPhoto] = useState(null);

   const handleFileChange = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    try {
      setImageUploading(true);
  
      const fileUrl = await uploadImage(file);
  
      if (type === "cprDocument") {
        setCarPhoto(fileUrl);
  
        setPurchaserDetails((prev) => ({
          ...prev,
          cprDocument: fileUrl
        }));
  
        return;
      }
  
  
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirmSale = async () => {

    // Email validation helper function
      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };  

    const isStepOneValid = purchaserDetails.name.trim() !== '' && purchaserDetails.cpr.trim() !== '' && purchaserDetails.phone.trim() !== '';
    const isStepTwoValid = paymentTerms.sellingPrice.trim() !== '' && parseFloat(paymentTerms.sellingPrice) > 0 ;
    const isInstallmentValid = paymentTerms.advanceAmount.trim() !== '' && parseFloat(paymentTerms.advanceAmount) >= 0 && parseFloat(paymentTerms.advanceAmount) <= parseFloat(paymentTerms.sellingPrice);

    const isCommissionValid =
  paymentTerms.commission.trim() !== '' &&
  parseFloat(paymentTerms.commission) >= 0 ;

    const isemail = isValidEmail(purchaserDetails.email);

    if(!isemail && purchaserDetails.email.trim() !== '') {
      alert('Please enter a valid email address.');
      setStep(1);
      return;
    }

    if (!isStepOneValid) {
      alert('Please enter a valid purchaser details.');
      setStep(1);
      return;
    }
    if (!isStepTwoValid) {
      alert('Please enter a valid selling price.');
      setStep(2);
      return;
    }

    if(paymentTerms.paymentType === 'Installment' && !isInstallmentValid) {
      alert('Please enter a valid advance amount.');
      setStep(2);
      return;
    }

    if (paymentTerms.commissionType === 'Fixed' && !isCommissionValid) {
      alert('Please enter a valid commission amount.');
      setStep(2);
      return;
    }

    if (paymentTerms.commissionType === 'Percentage' && (parseFloat(paymentTerms.commission) < 0 || parseFloat(paymentTerms.commission) > 100)) {
      alert('Please enter a valid commission percentage (0-100).');
      setStep(2);
      return;
    }

    setsolding(true);

    try {

    const payload = {
      carId: carId,
      purchaserName: purchaserDetails.name,
      cpr: purchaserDetails.cpr,
      phone: purchaserDetails.phone,
      email: purchaserDetails.email,
      address: purchaserDetails.address,
      sellingPrice: parseFloat(paymentTerms.sellingPrice),

      paymentType: paymentTerms.paymentType,
      advanceAmount: paymentTerms.paymentType === 'Installment' ?  parseFloat(paymentTerms.advanceAmount) : null,
      numberOfInstallments: paymentTerms.paymentType === 'Installment' ?  parseInt(paymentTerms.installmentCount) : null,
      commissionType: paymentTerms.commissionType,
      commissionAmount: paymentTerms.commissionType === 'Percentage' ?  (parseFloat(paymentTerms.sellingPrice) * parseFloat(paymentTerms.commission) / 100).toFixed(2) : parseFloat(paymentTerms.commission).toFixed(2)
    }

      
    console.log('Sale confirmed', payload);

    const response = await soldCar(payload);

      console.log("API Response:", response);
      setsolding(false);

      alert('Car sold successfully!');

    onClose();
    // Reset state
    setStep(1);
    setPurchaserDetails({ name: '', email: '', phone: '', cpr: '', cprDocument: null, address: '' });
    setPaymentTerms({ 
      sellingPrice: '', 
      paymentType: 'Full', 
      advanceAmount: '', 
      installmentCount: '6', 
      installmentAmount: '',
      commission: '',
      commissionType: 'Fixed'
    });

    } catch (error) { 
      setsolding(false);
      console.error('Error confirming sale:', error);
      alert('An error occurred while confirming the sale. Please try again.');
    } finally {
      setsolding(false);
    }
  };

  const handleGenerateAgreement = () => {
    console.log('Generating agreement...');
    setAgreementGenerated(true);
  };

  const handleGenerateInvoice = () => {
    console.log('Generating invoice...');
    setInvoiceGenerated(true);
  };

  const calculateInstallmentAmount = () => {
    const totalPrice = parseFloat(paymentTerms.sellingPrice) || 0;
    const advance = parseFloat(paymentTerms.advanceAmount) || 0;
    const count = parseInt(paymentTerms.installmentCount) || 1;
    return ((totalPrice - advance) / count).toFixed(2);
  };

  const remainingAmount = () => {
    const totalPrice = parseFloat(paymentTerms.sellingPrice) || 0;
    const advance = parseFloat(paymentTerms.advanceAmount) || 0;
    return (totalPrice - advance).toFixed(2);
  };

  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sell Car</DialogTitle>
          <DialogDescription>
            Complete the sale process for this vehicle
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="mb-6">
           {imageUploading && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-black">Uploading document...</p>
    </div>
  </div>
)}
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                    s === step
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
                    className={`w-16 h-1 ${
                      s < step ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-3">
            <p className={`text-xs ${step === 1 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              Purchaser Details
            </p>
            <p className={`text-xs ${step === 2 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              Payment Terms
            </p>
            <p className={`text-xs ${step === 3 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              Review & Confirm
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-secondary/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Vehicle</p>
            <p className="font-medium">{car.make} {car.model} {car.year}</p>
          </div>

          {/* Step 1: Purchaser Details */}
          {step === 1 && (
            <Card className="bg-secondary/30 border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium text-lg mb-4">Purchaser Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchaser-name">Full Name *</Label>
                    <Input
                      id="purchaser-name"
                      placeholder="Enter purchaser name"
                      value={purchaserDetails.name}
                      onChange={(e) => setPurchaserDetails({ ...purchaserDetails, name: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="purchaser-cpr">CPR Number *</Label>
                    <Input
                      id="purchaser-cpr"
                      placeholder="Enter CPR number"
                      value={purchaserDetails.cpr}
                      onChange={(e) => setPurchaserDetails({ ...purchaserDetails, cpr: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
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
                 {purchaserDetails.cprDocument && (
                      <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchaser-email">Email</Label>
                    <Input
                      id="purchaser-email"
                      type="email"
                      placeholder="email@example.com"
                      value={purchaserDetails.email}
                      onChange={(e) => setPurchaserDetails({ ...purchaserDetails, email: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="purchaser-phone">Phone Number *</Label>
                    <Input
                      id="purchaser-phone"
                      placeholder="+973 XXXX XXXX"
                      value={purchaserDetails.phone}
                      onChange={(e) => setPurchaserDetails({ ...purchaserDetails, phone: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="purchaser-address">Address</Label>
                  <Textarea
                    id="purchaser-address"
                    placeholder="Enter complete address"
                    value={purchaserDetails.address}
                    onChange={(e) => setPurchaserDetails({ ...purchaserDetails, address: e.target.value })}
                    className="bg-input-background"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment Terms */}
          {step === 2 && (
            <Card className="bg-secondary/30 border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium text-lg mb-4">Payment Terms</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="selling-price">Selling Price *</Label>
                    <Input
                      id="selling-price"
                      type="number"
                      placeholder='0'
                      value={paymentTerms.sellingPrice}
                      onChange={(e) => setPaymentTerms({ ...paymentTerms, sellingPrice: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment-type">Payment Type *</Label>
                    <Select 
                      value={paymentTerms.paymentType} 
                      onValueChange={(value: PaymentType) => setPaymentTerms({ ...paymentTerms, paymentType: value })}
                    >
                      <SelectTrigger className="bg-input-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full">Full Payment</SelectItem>
                        <SelectItem value="Installment">Installment Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {paymentTerms.paymentType === 'Installment' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="advance-amount">Advance Amount</Label>
                        <Input
                          id="advance-amount"
                          type="number"
                          placeholder="0"
                          value={paymentTerms.advanceAmount}
                          onChange={(e) => setPaymentTerms({ ...paymentTerms, advanceAmount: e.target.value })}
                          className="bg-input-background"
                        />
                      </div>
                      <div>
                        <Label htmlFor="installment-count">Number of Installments</Label>
                        <Input
                          id="installment-count"
                          type="number"
                          value={paymentTerms.installmentCount}
                          onChange={(e) => setPaymentTerms({ ...paymentTerms, installmentCount: e.target.value })}
                          className="bg-input-background"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Remaining Amount</p>
                          <p className="text-lg font-bold text-primary">BHD {remainingAmount()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Per Installment</p>
                          <p className="text-lg font-bold text-primary">BHD {paymentTerms.installmentAmount}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {(userRole === 'Admin' || userRole === 'SuperAdmin') && (
                  <>
                    <div className="border-t border-border pt-4">
                      <Label htmlFor="commission-type">Commission Type</Label>
                      <Select
                        value={paymentTerms.commissionType}
                        onValueChange={(value: 'Fixed' | 'Percentage') =>
                          setPaymentTerms({ ...paymentTerms, commissionType: value })
                        }
                      >
                        <SelectTrigger className="bg-input-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fixed">Fixed Amount (BHD)</SelectItem>
                          <SelectItem value="Percentage">Percentage (%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="commission">
                        Our Commission {paymentTerms.commissionType === 'Percentage' && '(%)'}
                      </Label>
                      <Input
                        id="commission"
                        type="number"
                        placeholder="0"
                        value={paymentTerms.commission}
                        onChange={(e) => setPaymentTerms({ ...paymentTerms, commission: e.target.value })}
                        className="bg-input-background"
                      />
                      {paymentTerms.commission && paymentTerms.commissionType === 'Percentage' && (
                        <p className="text-xs text-muted-foreground mt-1">
                          = BHD{' '}
                          {(
                            (parseFloat(paymentTerms.sellingPrice) || 0) *
                            (parseFloat(paymentTerms.commission) / 100)
                          ).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="space-y-4">
              <Card className="bg-secondary/30 border-border">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-medium text-lg mb-4">Sale Summary</h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Purchaser Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Name:</span>
                          <span className="text-sm font-medium">{purchaserDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">CPR:</span>
                          <span className="text-sm font-medium">{purchaserDetails.cpr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Phone:</span>
                          <span className="text-sm font-medium">{purchaserDetails.phone}</span>
                        </div>
                        {purchaserDetails.email && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Email:</span>
                            <span className="text-sm font-medium">{purchaserDetails.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Payment Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Selling Price:</span>
                          <span className="text-sm font-medium">BHD {paymentTerms.sellingPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Payment Type:</span>
                          <span className="text-sm font-medium">{paymentTerms.paymentType}</span>
                        </div>
                        {paymentTerms.paymentType === 'Installment' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Advance:</span>
                              <span className="text-sm font-medium">BHD {paymentTerms.advanceAmount || '0'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Installments:</span>
                              <span className="text-sm font-medium">
                                {paymentTerms.installmentCount} × BHD {calculateInstallmentAmount()}
                              </span>
                            </div>
                          </>
                        )}
                        {(userRole === 'Admin' || userRole === 'SuperAdmin') && paymentTerms.commission && (
                          <div className="flex justify-between pt-2 border-t border-border">
                            <span className="text-sm text-muted-foreground">Commission:</span>
                            <span className="text-sm font-medium text-primary">BHD {paymentTerms.commissionType === 'Percentage' ? (parseFloat(paymentTerms.sellingPrice) * parseFloat(paymentTerms.commission) / 100).toFixed(2) : parseFloat(paymentTerms.commission).toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Generation */}
              <Card className="bg-secondary/30 border-border">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-medium text-lg mb-4">Documents</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={agreementGenerated ? 'default' : 'outline'}
                      onClick={handleGenerateAgreement}
                      className="h-auto py-3"
                    >
                      <div className="flex flex-col items-center gap-2">
                        {agreementGenerated ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                        <span className="text-sm">
                          {agreementGenerated ? 'Agreement Generated' : 'Generate Agreement'}
                        </span>
                      </div>
                    </Button>

                    <Button
                      variant={invoiceGenerated ? 'default' : 'outline'}
                      onClick={handleGenerateInvoice}
                      className="h-auto py-3"
                    >
                      <div className="flex flex-col items-center gap-2">
                        {invoiceGenerated ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                        <span className="text-sm">
                          {invoiceGenerated ? 'Invoice Generated' : 'Generate Invoice'}
                        </span>
                      </div>
                    </Button>
                  </div>

                  {(agreementGenerated || invoiceGenerated) && (
                    <div className="flex gap-2 pt-2">
                      {agreementGenerated && (
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download Agreement
                        </Button>
                      )}
                      {invoiceGenerated && (
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download Invoice
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            
            <Button variant="outline" className="ml-auto" onClick={onClose}>
              Cancel
            </Button>

            {step < 3 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              // <Button onClick={handleConfirmSale}>
              //   <Check className="h-4 w-4 mr-2" />
              //   Confirm Sale
              // </Button>

              solding ? (
                <Button disabled>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </Button>
              ) : (
                <Button onClick={handleConfirmSale}>
                  <Check className="h-4 w-4 mr-2" />
                  Confirm Sale
                </Button>
              )
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface LeaseCarModalProps {
  carId: string;
  isOpen: boolean;
  onClose: () => void;
  car: Car;
  userRole: 'Admin' | 'SuperAdmin' | 'User' | 'Operations' | 'Driver' | 'Investor';
}

export function LeaseCarModal({carId, isOpen, onClose, car, userRole }: LeaseCarModalProps) {
  const [step, setStep] = useState(1);
  const [solding, setsolding] = useState(false);
  
  // Step 1: Lessee Details
  const [lesseeDetails, setLesseeDetails] = useState({
    name: '',
    email: '',
    phone: '',
    cpr: '',
    licenseNumber: '',
    address: '',
  });

  // Step 2: Lease Terms
  const [leaseTerms, setLeaseTerms] = useState({
    leaseType: 'Daily' as LeaseType,
    leaseRate: car?.leaseAmount?.toString() || '',
    duration: '',
    advanceAmount: '',
    securityDeposit: '',
    commission: '',
    commissionType: 'Fixed' as 'Fixed' | 'Percentage',
  });

  // Step 3: Review
  const [agreementGenerated, setAgreementGenerated] = useState(false);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirmLease = async () => {

    //Email validation helper function
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isStepOneValid = lesseeDetails.name.trim() !== '' && lesseeDetails.cpr.trim() !== '' && lesseeDetails.phone.trim() !== '' && lesseeDetails.licenseNumber.trim() !== '' && lesseeDetails.address.trim() !== '';
    const isStepTwoValid = leaseTerms.leaseType.trim() !== '' && leaseTerms.leaseRate.trim() !== '' && leaseTerms.duration.trim() !== '' && leaseTerms.advanceAmount.trim() !== '' && leaseTerms.securityDeposit.trim() !== '';


    const isCommissionValid =
      leaseTerms.commission.trim() !== '' &&
      parseFloat(leaseTerms.commission) >= 0 || null;

    const isemail = isValidEmail(lesseeDetails.email);

    if (!isemail && lesseeDetails.email.trim() !== '') {
      alert('Please enter a valid email address.');
      setStep(1);
      return;
    }

    if (!isStepOneValid) {
      alert('Please enter all the lease information details.');
      setStep(1);
      return;
    }

    if (!isStepTwoValid) {
      alert('Please enter all the lease terms details.');
      setStep(2);
      return;

    }

    if (!isCommissionValid) {
      alert('Please enter a valid commission amount.');
      setStep(2);
      return;
    }



    if (leaseTerms.commissionType === 'Percentage' && (parseFloat(leaseTerms.commission) < 0 || parseFloat(leaseTerms.commission) > 100)) {
      alert('Please enter a valid commission percentage (0-100).');
      setStep(2);
      return;
    }

    setsolding(true);

    try {

      const payload = {
        // Lease Information
        carId: carId,
        fullName: lesseeDetails.name,
        cprNumber: lesseeDetails.cpr,
        phoneNumber: lesseeDetails.phone,
        email: lesseeDetails.email,
        address: lesseeDetails.address,
        drivingLicenseNumber: lesseeDetails.licenseNumber,
//hjkgg
        // Leaser Terms
        leaseType: leaseTerms.leaseType,
        leaseRate: parseFloat(leaseTerms.leaseRate),
        duration: parseInt(leaseTerms.duration),
        advanceAmount: parseFloat(leaseTerms.advanceAmount),
        securityDeposit: parseFloat(leaseTerms.securityDeposit),

        commissionType: leaseTerms.commissionType,
        commissionAmount: leaseTerms.commissionType === 'Percentage' ? (parseFloat(leaseTerms.leaseRate) * parseInt(leaseTerms.duration) * parseFloat(leaseTerms.commission) / 100).toFixed(2) : parseFloat(leaseTerms.commission).toFixed(2)

      }


      console.log('Sale confirmed', payload);

      const response = await leaseCar(payload);

      console.log("API Response:", response);
      setsolding(false);

      alert('Car leased successfully!');

      onClose();
      setStep(1);
      setLesseeDetails({ name: '', email: '', phone: '', cpr: '', licenseNumber: '', address: '' });
      setLeaseTerms({ 
        leaseType: 'Daily', 
        leaseRate: car?.leaseAmount?.toString() || '', 
        duration: '', 
        advanceAmount: '',
        securityDeposit: '',
        commission: '',
        commissionType: 'Fixed'
      });
      

  } catch (error) {
    setsolding(false);
    console.error('Error confirming sale:', error);
    alert('An error occurred while confirming the lease. Please try again.');
  } finally {
    setsolding(false);
  }
};

  // const handleConfirmLease = () => {
  //   console.log('Lease confirmed', { lesseeDetails, leaseTerms });
  //   onClose();
  //   // Reset state
  //   setStep(1);
  //   setLesseeDetails({ name: '', email: '', phone: '', cpr: '', licenseNumber: '', address: '' });
  //   setLeaseTerms({ 
  //     leaseType: 'Daily', 
  //     leaseRate: car?.leaseAmount?.toString() || '', 
  //     duration: '', 
  //     advanceAmount: '',
  //     securityDeposit: '',
  //     commission: '',
  //     commissionType: 'Fixed'
  //   });
  // };

  const handleGenerateAgreement = () => {
    console.log('Generating lease agreement...');
    setAgreementGenerated(true);
  };

  const handleGenerateInvoice = () => {
    console.log('Generating lease invoice...');
    setInvoiceGenerated(true);
  };

  const calculateTotalAmount = () => {
    const rate = parseFloat(leaseTerms.leaseRate) || 0;
    const duration = parseInt(leaseTerms.duration) || 0;
    return (rate * duration).toFixed(2);
  };

  const calculateRemainingAmount = () => {
    const total = parseFloat(calculateTotalAmount()) || 0;
    const advance = parseFloat(leaseTerms.advanceAmount) || 0;
    return (total - advance).toFixed(2);
  };

  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lease Car</DialogTitle>
          <DialogDescription>
            Complete the lease process for this vehicle
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                    s === step
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
                    className={`w-16 h-1 ${
                      s < step ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-3">
            <p className={`text-xs ${step === 1 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              Lessee Details
            </p>
            <p className={`text-xs ${step === 2 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              Lease Terms
            </p>
            <p className={`text-xs ${step === 3 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              Review & Confirm
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-secondary/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Vehicle</p>
            <p className="font-medium">{car.make} {car.model} {car.year}</p>
          </div>

          {/* Step 1: Lessee Details */}
          {step === 1 && (
            <Card className="bg-secondary/30 border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium text-lg mb-4">Lessee Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lessee-name">Full Name *</Label>
                    <Input
                      id="lessee-name"
                      placeholder="Enter lessee name"
                      value={lesseeDetails.name}
                      onChange={(e) => setLesseeDetails({ ...lesseeDetails, name: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lessee-cpr">CPR Number *</Label>
                    <Input
                      id="lessee-cpr"
                      placeholder="Enter CPR number"
                      value={lesseeDetails.cpr}
                      onChange={(e) => setLesseeDetails({ ...lesseeDetails, cpr: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lessee-email">Email</Label>
                    <Input
                      id="lessee-email"
                      type="email"
                      placeholder="email@example.com"
                      value={lesseeDetails.email}
                      onChange={(e) => setLesseeDetails({ ...lesseeDetails, email: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lessee-phone">Phone Number *</Label>
                    <Input
                      id="lessee-phone"
                      placeholder="+973 XXXX XXXX"
                      value={lesseeDetails.phone}
                      onChange={(e) => setLesseeDetails({ ...lesseeDetails, phone: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lessee-license">Driving License Number *</Label>
                  <Input
                    id="lessee-license"
                    placeholder="Enter license number"
                    value={lesseeDetails.licenseNumber}
                    onChange={(e) => setLesseeDetails({ ...lesseeDetails, licenseNumber: e.target.value })}
                    className="bg-input-background"
                  />
                </div>

                <div>
                  <Label htmlFor="lessee-address">Address</Label>
                  <Textarea
                    id="lessee-address"
                    placeholder="Enter complete address"
                    value={lesseeDetails.address}
                    onChange={(e) => setLesseeDetails({ ...lesseeDetails, address: e.target.value })}
                    className="bg-input-background"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Lease Terms */}
          {step === 2 && (
            <Card className="bg-secondary/30 border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium text-lg mb-4">Lease Terms</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lease-type">Lease Type *</Label>
                    <Select 
                      value={leaseTerms.leaseType} 
                      onValueChange={(value: LeaseType) => setLeaseTerms({ ...leaseTerms, leaseType: value })}
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
                    <Label htmlFor="lease-rate">Lease Rate (BHD) *</Label>
                    <Input
                      id="lease-rate"
                      type="number"
                      value={leaseTerms.leaseRate}
                      onChange={(e) => setLeaseTerms({ ...leaseTerms, leaseRate: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lease-duration">Duration ({leaseTerms.leaseType === 'Daily' ? 'Days' : 'Months'}) *</Label>
                    <Input
                      id="lease-duration"
                      type="number"
                      placeholder="Enter duration"
                      value={leaseTerms.duration}
                      onChange={(e) => setLeaseTerms({ ...leaseTerms, duration: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="advance-payment">Advance Payment</Label>
                    <Input
                      id="advance-payment"
                      type="number"
                      placeholder="0"
                      value={leaseTerms.advanceAmount}
                      onChange={(e) => setLeaseTerms({ ...leaseTerms, advanceAmount: e.target.value })}
                      className="bg-input-background"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="security-deposit">Security Deposit (Refundable)</Label>
                  <Input
                    id="security-deposit"
                    type="number"
                    placeholder="0"
                    value={leaseTerms.securityDeposit}
                    onChange={(e) => setLeaseTerms({ ...leaseTerms, securityDeposit: e.target.value })}
                    className="bg-input-background"
                  />
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Lease Value</p>
                      <p className="text-lg font-bold text-primary">BHD {calculateTotalAmount()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Remaining Payment</p>
                      <p className="text-lg font-bold text-primary">BHD {calculateRemainingAmount()}</p>
                    </div>
                  </div>
                </div>

                {(userRole === 'Admin' || userRole === 'SuperAdmin') && (
                  <>
                    <div className="border-t border-border pt-4">
                      <Label htmlFor="lease-commission-type">Commission Type</Label>
                      <Select
                        value={leaseTerms.commissionType}
                        onValueChange={(value: 'Fixed' | 'Percentage') =>
                          setLeaseTerms({ ...leaseTerms, commissionType: value })
                        }
                      >
                        <SelectTrigger className="bg-input-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fixed">Fixed Amount (BHD)</SelectItem>
                          <SelectItem value="Percentage">Percentage (%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="lease-commission">
                        Our Commission {leaseTerms.commissionType === 'Percentage' && '(%)'}
                      </Label>
                      <Input
                        id="lease-commission"
                        type="number"
                        placeholder="0"
                        value={leaseTerms.commission}
                        onChange={(e) => setLeaseTerms({ ...leaseTerms, commission: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="space-y-4">
              <Card className="bg-secondary/30 border-border">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-medium text-lg mb-4">Lease Summary</h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Lessee Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Name:</span>
                          <span className="text-sm font-medium">{lesseeDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">CPR:</span>
                          <span className="text-sm font-medium">{lesseeDetails.cpr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Phone:</span>
                          <span className="text-sm font-medium">{lesseeDetails.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Lease Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total:</span>
                          <span className="text-sm font-medium">BHD {calculateTotalAmount()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rate:</span>
                          <span className="text-sm font-medium">BHD {leaseTerms.leaseRate}/{leaseTerms.leaseType === 'Daily' ? 'day' : 'month'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Duration:</span>
                          <span className="text-sm font-medium">{leaseTerms.duration} {leaseTerms.leaseType === 'Daily' ? 'days' : 'months'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Generation */}
              <Card className="bg-secondary/30 border-border">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-medium text-lg mb-4">Documents</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={agreementGenerated ? 'default' : 'outline'}
                      onClick={handleGenerateAgreement}
                      className="h-auto py-3"
                    >
                      <div className="flex flex-col items-center gap-2">
                        {agreementGenerated ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                        <span className="text-sm">
                          {agreementGenerated ? 'Agreement Generated' : 'Generate Agreement'}
                        </span>
                      </div>
                    </Button>

                    <Button
                      variant={invoiceGenerated ? 'default' : 'outline'}
                      onClick={handleGenerateInvoice}
                      className="h-auto py-3"
                    >
                      <div className="flex flex-col items-center gap-2">
                        {invoiceGenerated ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                        <span className="text-sm">
                          {invoiceGenerated ? 'Invoice Generated' : 'Generate Invoice'}
                        </span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            
            <Button variant="outline" className="ml-auto" onClick={onClose}>
              Cancel
            </Button>

            {step < 3 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              solding ? (
                <Button disabled>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </Button>
              ) : (
                <Button onClick={handleConfirmLease}>
                  <Check className="h-4 w-4 mr-2" />
                  Confirm Lease
                </Button>
              )
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
}

export function AddExpenseModal({ isOpen, onClose, car }: AddExpenseModalProps) {
  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExpense = () => {
    console.log('Expense added', { expenseType, amount, date, description });
    onClose();
  };

  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card max-w-md">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Configure the expense details for this vehicle
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Vehicle</p>
            <p className="font-medium">{car.make} {car.model} {car.year}</p>
          </div>

          <div>
            <Label htmlFor="expenseType">Expense Type</Label>
            <Select value={expenseType} onValueChange={setExpenseType}>
              <SelectTrigger className="bg-input-background">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Repair">Repair</SelectItem>
                <SelectItem value="Detailing">Detailing</SelectItem>
                <SelectItem value="Insurance">Insurance</SelectItem>
                <SelectItem value="Registration">Registration</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount (BHD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-input-background"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-input-background"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-input-background"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleAddExpense}>
              Add Expense
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

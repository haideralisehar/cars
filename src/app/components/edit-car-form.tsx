// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
// import { Button } from '@/app/components/ui/button';
// import { Input } from '@/app/components/ui/input';
// import { Label } from '@/app/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
// import { Switch } from '@/app/components/ui/switch';
// import { ArrowLeft, Save } from 'lucide-react';

// export function EditCarForm({ car, onSave, onCancel }) {
//   console.log("EditCarForm received car:", car);

//   const [formData, setFormData] = useState({
//     make: '',
//     model: '',
//     year: '',
//     vin: '',
//     color: '',
//     registrationNumber: '',
//     buyingPrice: '',
//     askingPrice: '',
//     insuranceExpiry: '',
//     registrationExpiry: '',
//     leaseEnabled: false,
//     leaseType: 'Daily',
//     leaseAmount: '',
//   });

//   // Helper function to format date for input field (YYYY-MM-DD)
//   const formatDateForInput = (value) => {
//     if (!value) return '';
    
//     try {
//       // Create date object from the ISO string
//       const date = new Date(value);
      
//       // Check if date is valid
//       if (isNaN(date.getTime())) return '';
      
//       // Format as YYYY-MM-DD for the input field
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
      
//       return `${year}-${month}-${day}`;
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return '';
//     }
//   };

//   // Load car data when component mounts or car prop changes
//   useEffect(() => {
//     if (car) {
//       setFormData({
//         make: car.make || '',
//         model: car.model || '',
//         year: car.year?.toString() || '',
//         vin: car.vin || '',
//         color: car.color || '',
//         registrationNumber: car.registrationNumber || '',
//         buyingPrice: car.financialDetails?.buyingPrice?.toString() ||  '',
//         askingPrice: car.financialDetails?.askingPrice?.toString() || '',
//         insuranceExpiry: car.insuranceExpiryDate || '',
//         registrationExpiry: car.registrationExpiry || '',
//         leaseEnabled: car?.financialDetails?.enableLease,
//         leaseType: car?.financialDetails?.leaseType || 'Daily',
//         leaseAmount: car?.financialDetails?.leaseAmount?.toString() || '',
//       });
//     }
//   }, [car]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const updatedCar = {
//        id: car.id, // Make sure to include the ID
//       carSource: car.carSource || "",
//       investorId: car.investorId || null,
//       customerId: car.customerId || null,

//       carImage: car.carImagePath || "",
//       make: formData.make,
//       model: formData.model,
//       year: parseInt(formData.year),
//       vin: formData.vin,
//       color: formData.color,
//       registrationNumber: formData.registrationNumber,
//       insuranceExpiryDate: formData.insuranceExpiry.toString(),

     
//       buyingPrice: parseFloat(formData.buyingPrice),
//       askingPrice: parseFloat(formData.askingPrice),

//             amountUsed: car.financialDetails?.amountUsed || 0,
//       companyCommission: car.financialDetails?.companyCommission || 0,

//       paymentType: car.financialDetails?.paymentType || "Full",

//       monthlyDueDate: car.financialDetails?.monthlyDueDate || 1,



//       monthlyRentDueDate:
//         car.financialDetails?.monthlyRentDueDate || 25,

//       registrationCard: car.registrationCardPath || "",
//       cprDocument: car.cprDocumentPath || "",
//       insuranceDocument: car.insuranceDocumentPath || "",
//       additionalDocument: car.additionalDocumentPath || "",
    
      
//       registrationExpiry: formData.registrationExpiry,
//       leaseEnabled: formData.leaseEnabled,
//       leaseType: formData.leaseType,
//       leaseAmount: formData.leaseAmount ? parseFloat(formData.leaseAmount) : undefined,
//     };
//     console.log("Submitting updated car:", updatedCar);
//     // onSave(updatedCar);
//   };

//   const handleChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold mb-1">Edit Vehicle</h1>
//             <p className="text-muted-foreground">Update vehicle information</p>
//           </div>
//           <Button variant="ghost" onClick={onCancel}>
//             <ArrowLeft className="h-5 w-5 mr-2" />
//             Cancel
//           </Button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <Card className="bg-card border-border mb-6">
//             <CardHeader>
//               <CardTitle>Vehicle Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Basic Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="make">Make *</Label>
//                   <Input
//                     id="make"
//                     value={formData.make}
//                     onChange={(e) => handleChange('make', e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="model">Model *</Label>
//                   <Input
//                     id="model"
//                     value={formData.model}
//                     onChange={(e) => handleChange('model', e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="year">Year *</Label>
//                   <Input
//                     id="year"
//                     type="number"
//                     value={formData.year}
//                     onChange={(e) => handleChange('year', e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="color">Color *</Label>
//                   <Input
//                     id="color"
//                     value={formData.color}
//                     onChange={(e) => handleChange('color', e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="vin">VIN *</Label>
//                   <Input
//                     id="vin"
//                     value={formData.vin}
//                     onChange={(e) => handleChange('vin', e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="registrationNumber">Registration Number *</Label>
//                   <Input
//                     id="registrationNumber"
//                     value={formData.registrationNumber}
//                     onChange={(e) => handleChange('registrationNumber', e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border mb-6">
//             <CardHeader>
//               <CardTitle>Financial Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="buyingPrice">Buying Price (BHD) *</Label>
//                   <Input
//                     id="buyingPrice"
//                     type="number"
//                     step="0.01"
//                     value={formData.buyingPrice}
//                     onChange={(e) => handleChange('buyingPrice', e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="askingPrice">Asking Price (BHD) *</Label>
//                   <Input
//                     id="askingPrice"
//                     type="number"
//                     step="0.01"
//                     value={formData.askingPrice}
//                     onChange={(e) => handleChange('askingPrice', e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border mb-6">
//             <CardHeader>
//               <CardTitle>Document Expiry Dates</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
//                   <Input
//                     id="insuranceExpiry"
//                     type="date"
//                     value={formData.insuranceExpiry} // Ensure only date part is used
//                     onChange={(e) => handleChange('insuranceExpiry', e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="registrationExpiry">Registration Expiry</Label>
//                   <Input
//                     id="registrationExpiry"
//                     type="date"
//                     value={formData.registrationExpiry}
//                     onChange={(e) => handleChange('registrationExpiry', e.target.value)}
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-card border-border mb-6">
//             <CardHeader>
//               <CardTitle>Lease Options</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Enable Lease</Label>
//                   <p className="text-sm text-muted-foreground">Allow this vehicle to be leased</p>
//                 </div>
//                 <Switch
//                   checked={formData.leaseEnabled}
//                   onCheckedChange={(checked) => handleChange('leaseEnabled', checked)}
//                 />
//               </div>

//               {formData.leaseEnabled && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
//                   <div className="space-y-2">
//                     <Label htmlFor="leaseType">Lease Type</Label>
//                     <Select
//                       value={formData.leaseType}
//                       onValueChange={(value) => handleChange('leaseType', value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Daily">Daily</SelectItem>
//                         <SelectItem value="Monthly">Monthly</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="leaseAmount">Lease Amount (BHD)</Label>
//                     <Input
//                       id="leaseAmount"
//                       type="number"
//                       step="0.01"
//                       value={formData.leaseAmount}
//                       onChange={(e) => handleChange('leaseAmount', e.target.value)}
//                       placeholder="0.00"
//                     />
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Action Buttons */}
//           <div className="flex items-center justify-end gap-3">
//             <Button type="button" variant="outline" onClick={onCancel}>
//               Cancel
//             </Button>
//             <Button type="submit">
//               <Save className="h-4 w-4 mr-2" />
//               Save Changes
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { ArrowLeft, Check, Save } from 'lucide-react';
import { editInventory } from '@/app/api/CarInventory/editCarInventory'

export function EditCarForm({ car, onSave, onCancel }) {
  console.log("EditCarForm received car:", car);
  const [addingCar, setaddingCar] = useState(false);

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    color: '',
    registrationNumber: '',
    buyingPrice: '',
    askingPrice: '',
    insuranceExpiryDate: '',
    registrationExpiry: '',
    enableLease: false,
    leaseType: 'Monthly',
    leaseAmount: '',
  });

  // Helper function to format ISO date for input field (YYYY-MM-DD)
  const formatDateForInput = (isoDateString) => {
    if (!isoDateString) return '';
    
    try {
      // Create date object from the ISO string
      const date = new Date(isoDateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) return '';
      
      // Format as YYYY-MM-DD for the input field
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // Helper function to format date for API (ISO string with timezone)
  const formatDateForApi = (dateString) => {
    if (!dateString) return null;
    
    try {
      // Create date object from the input date (YYYY-MM-DD)
      // Set to noon UTC to avoid timezone issues
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
      
      // Check if date is valid
      if (isNaN(date.getTime())) return null;
      
      // Return ISO string format with timezone
      return date.toISOString();
    } catch (error) {
      console.error('Error formatting date for API:', error);
      return null;
    }
  };

  // Load car data when component mounts or car prop changes
  useEffect(() => {
    if (car) {
      console.log("Loading car data:", car);
      console.log("Insurance expiry from car:", car.insuranceExpiryDate);
      console.log("Formatted for input:", formatDateForInput(car.insuranceExpiryDate));
      
      setFormData({
        make: car.make || '',
        model: car.model || '',
        year: car.year?.toString() || '',
        vin: car.vin || '',
        color: car.color || '',
        registrationNumber: car.registrationNumber || '',
        buyingPrice: car.financialDetails?.buyingPrice?.toString() || '',
        askingPrice: car.financialDetails?.askingPrice?.toString() || '',
        insuranceExpiryDate: formatDateForInput(car.insuranceExpiryDate) || '',
        registrationExpiry: formatDateForInput(car.registrationExpiry) || '',
        enableLease: car.financialDetails?.enableLease || false,
        leaseType: car.financialDetails?.leaseType || 'Monthly',
        leaseAmount: car.financialDetails?.leaseAmount?.toString() || '',
      });
    }
  }, [car]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data to see what's being submitted
    // console.log("Form data being submitted:", formData);
    setaddingCar(true);

    const updatedCar = {
      id: car.id,
      
      // Basic car info
      make: formData.make || car.make || "",
      model: formData.model || car.model || "",
      year: formData.year ? parseInt(formData.year) : car.year || 0,
      color: formData.color || car.color || "",
      vin: formData.vin || car.vin || "",
      registrationNumber: formData.registrationNumber || car.registrationNumber || "",
      
      // Source and IDs
      carSource: car.carSource || "",
      investorId: car.investorId || null,
      customerId: car.customerId || null,

      // Images and documents
      carImage: car.carImagePath || "",
      registrationCard: car.registrationCardPath || "",
      cprDocument: car.cprDocumentPath || "",
      insuranceDocument: car.insuranceDocumentPath || "",
      additionalDocument: car.additionalDocumentPath || "",

      // Dates - Using the correct field name: insuranceExpiryDate
      insuranceExpiryDate: 
        new Date(formData.insuranceExpiryDate).toISOString(),
       

      registrationExpiry: formData.registrationExpiry
        ? formatDateForApi(formData.registrationExpiry)
        : car.registrationExpiry || null,

      // Financial details
      buyingPrice: formData.buyingPrice
        ? parseFloat(formData.buyingPrice)
        : car.financialDetails?.buyingPrice || 0,

      askingPrice: formData.askingPrice
        ? parseFloat(formData.askingPrice)
        : car.financialDetails?.askingPrice || 0,

      amountUsed: car.financialDetails?.amountUsed || 0,
      companyCommission: car.financialDetails?.companyCommission || 0,
      paymentType: car.financialDetails?.paymentType || "Full",
      monthlyDueDate: car.financialDetails?.monthlyDueDate || 1,

      // Lease details
      enableLease: formData.enableLease,
      leaseType: formData.leaseType || car.financialDetails?.leaseType || "Monthly",
      leaseAmount: formData.leaseAmount
        ? parseFloat(formData.leaseAmount)
        : car.financialDetails?.leaseAmount || 0,

      monthlyRentDueDate: car.financialDetails?.monthlyRentDueDate || 25,
    };

    console.log("Submitting updated car:", updatedCar);

    try {
      const response = await editInventory(car.id, updatedCar);
      console.log("API response:", response);

      if (onSave) onSave(response);
      setaddingCar(false);
    } catch (error) {
      console.error("Update failed:", error);
      setaddingCar(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Edit Vehicle</h1>
            <p className="text-muted-foreground">Update vehicle information</p>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make *</Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => handleChange('make', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleChange('model', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color *</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleChange('color', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vin">VIN *</Label>
                  <Input
                    id="vin"
                    value={formData.vin}
                    onChange={(e) => handleChange('vin', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => handleChange('registrationNumber', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buyingPrice">Buying Price (BHD) *</Label>
                  <Input
                    id="buyingPrice"
                    type="number"
                    step="0.01"
                    value={formData.buyingPrice}
                    onChange={(e) => handleChange('buyingPrice', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="askingPrice">Asking Price (BHD) *</Label>
                  <Input
                    id="askingPrice"
                    type="number"
                    step="0.01"
                    value={formData.askingPrice}
                    onChange={(e) => handleChange('askingPrice', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle>Document Expiry Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceExpiryDate">Insurance Expiry</Label>
                  <Input
                    id="insuranceExpiryDate"
                    type="date"
                    value={formData.insuranceExpiryDate}
                    onChange={(e) => handleChange('insuranceExpiryDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationExpiry">Registration Expiry</Label>
                  <Input
                    id="registrationExpiry"
                    type="date"
                    value={formData.registrationExpiry}
                    onChange={(e) => handleChange('registrationExpiry', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle>Lease Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Lease</Label>
                  <p className="text-sm text-muted-foreground">Allow this vehicle to be leased</p>
                </div>
                <Switch
                  checked={formData.enableLease}
                  onCheckedChange={(checked) => handleChange('enableLease', checked)}
                />
              </div>

              {formData.enableLease && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Label htmlFor="leaseType">Lease Type</Label>
                    <Select
                      value={formData.leaseType}
                      onValueChange={(value) => handleChange('leaseType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaseAmount">Lease Amount (BHD)</Label>
                    <Input
                      id="leaseAmount"
                      type="number"
                      step="0.01"
                      value={formData.leaseAmount}
                      onChange={(e) => handleChange('leaseAmount', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            {
                addingCar ? (
                <Button disabled>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </Button>
              ) : (
                <Button type='submit'>
                  <Check className="mr-2 h-4 w-4" /> Save Car
                </Button>
              )}
            {/* <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
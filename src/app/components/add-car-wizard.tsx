// import { useEffect, useRef, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
// import { Button } from '@/app/components/ui/button';
// import { Input } from '@/app/components/ui/input';
// import { Label } from '@/app/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
// import { Switch } from '@/app/components/ui/switch';
// import { Building2, User, Users, ArrowLeft, ArrowRight, Check, ChevronDown, Search } from 'lucide-react';
// import { CarSource, PaymentType, LeaseType } from '@/types';
// import { addInventory } from "@/app/api/CarInventory/addcarinventory";
// import { ScrollArea } from './ui/scroll-area';
// import {uploadImage } from "@/app/api/UploadImage/uploadImage";
// import { 
 
//   X
// } from 'lucide-react';
// import { set } from 'date-fns';

// interface AddCarWizardProps {
//   onComplete: () => void;
//   onCancel: () => void;
// }

// const SearchableInvestorSelect = ({ value, onChange, investors, loading, onOpen }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);
//   const buttonRef = useRef(null);
  


//   const handleOpen = () => {
//     setIsOpen(true);
//     if (onOpen) onOpen();
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     setSearchTerm('');
//   };

//   // Handle click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           buttonRef.current && !buttonRef.current.contains(event.target)) {
//         handleClose();
//       }
//     };

//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         handleClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//       document.addEventListener('keydown', handleEscape);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [isOpen]);

//   const filteredInvestors = investors.filter(investor => 
//     investor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     investor.cprNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     investor.contactNumber?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const selectedInvestor = investors.find(i => i.id === value);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         ref={buttonRef}
//         type="button"
//         onClick={handleOpen}
//         className="flex h-10 w-full items-center justify-between rounded-md border border-input  px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//       >
//         {selectedInvestor ? (
//           <span className="flex-1 text-left">
//             {selectedInvestor.name} - CPR: {selectedInvestor.cprNumber}
//           </span>
//         ) : (
//           <span className="flex-1 text-left text-muted-foreground">
//             Select investor profile
//           </span>
//         )}
//         <ChevronDown className="h-4 w-4 opacity-50" />
//       </button>

//       {isOpen && (
//         <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md">
//           {/* Search Input */}
//           <div className="flex items-center border-b px-3">
//             <Search className="h-4 w-4 shrink-0 opacity-50" />
//             <input
//             autoComplete="off"
//               type="text"
//               placeholder="Search by name or CPR..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
//               autoFocus
//             />
//             {searchTerm && (
//               <button onClick={() => setSearchTerm('')} className="opacity-50 hover:opacity-100">
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>

//           {/* Options */}
//           <ScrollArea className="max-h-[300px] overflow-y-auto">
//             {loading ? (
//               <div className="flex items-center justify-center py-8">
//                 <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
//                 <span className="ml-2 text-sm text-muted-foreground">Loading investors...</span>
//               </div>
//             ) : filteredInvestors.length > 0 ? (
//               filteredInvestors.map((investor) => (
//                 <button
//                   key={investor.id}
//                   type="button"
//                   onClick={() => {
//                     onChange(investor.id);
//                     handleClose();
//                   }}
//                   className={`w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
//                     value === investor.id ? 'bg-accent' : ''
//                   }`}
//                 >
//                   <div className="flex flex-row items-center gap-2">
//                     <span className="font-medium">{investor.name}</span>
//                     <span className="text-xs text-muted-foreground">
//                       CPR: {investor.cprNumber} | {investor.contactNumber}
//                     </span>
//                   </div>
//                 </button>
//               ))
//             ) : (
//               <div className="px-3 py-8 text-center text-sm text-muted-foreground">
//                 No investors available
//               </div>
//             )}
//           </ScrollArea>
//         </div>
//       )}
//     </div>
//   );
// };

// export function AddCarWizard({ onComplete, onCancel }: AddCarWizardProps) {
//   const [step, setStep] = useState(1);
//   const [investors, setInvestors] = useState([]);
//   const [investorsLoading, setInvestorsLoading] = useState(false);
//   const [carSource, setCarSource] = useState<CarSource | null>(null);
//   const [addingCar, setaddingCar] = useState(false);

//   const [imageUploading, setImageUploading] = useState(false);

//       const [carPhoto, setCarPhoto] = useState(null);

      

//   const [vehicleInfo, setVehicleInfo] = useState({
//     carimg:'',
//     make: '',
//     model: '',
//     year: '',
//     vin: '',
//     color: '',
//     registrationNumber: '',
//     insuranceExpiry: '',
//   });
//   const [financialDetails, setFinancialDetails] = useState({
//     buyingPrice: '',
//     askingPrice: '',
//     paymentType: 'Full' as PaymentType,
//     investorId: null,
//     investorAmount: '',
//     customerName: '',
//     commission: '',
//     MonthlyDueDate: '10', // New field for monthly due date
//     commissionType: 'Fixed' as 'Fixed' | 'Percentage',
//     leaseEnabled: false,
//     leaseType: 'Daily' as LeaseType,
//     leaseAmount: '',
//     installmentDueDate: '5', // Default 5th of month
//     installments: [] as { amount: string; dueDate: string }[],
//   });

//   // Add this near your other state declarations
//     const [documents, setDocuments] = useState({
//     registration: null,
//     cpr: null,
//     insurance: null,
//     additional: null
//   });



//   const sourceOptions: { value: CarSource; label: string; icon: any; description: string }[] = [
//     {
//       value: 'Company Car',
//       label: 'Company Car',
//       icon: Building2,
//       description: 'Vehicle owned by the company',
//     },
//     {
//       value: 'Investor',
//       label: 'Investor Car',
//       icon: Users,
//       description: 'Vehicle from investor partnership',
//     },
//     {
//       value: 'Customer',
//       label: 'Customer Car',
//       icon: User,
//       description: 'Consignment vehicle',
//     },
//   ];

//   // const handleFileChange = async (e) => {
//   //     const file = e.target.files?.[0];
//   //     if (!file) return;

//   //     try {
//   //       setImageUploading(true);

//   //       const imageUrl = await uploadImage(file);

//   //       setCarPhoto(imageUrl);

//   //         setVehicleInfo((prev) => ({
//   //       ...prev,
//   //       carimg: imageUrl
//   //     }));

//   //       console.log("Uploaded Image:", carPhoto);
//   //       console.log("Vehicle Info with Image:", vehicleInfo);
//   //     } catch (error) {
//   //       console.error("Image upload failed:", error);
//   //     } finally {
//   //       setImageUploading(false);
//   //     }
//   //   };

//   const handleFileChange = async (e, type) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   try {
//     setImageUploading(true);

//     const fileUrl = await uploadImage(file);

//     if (type === "carimg") {
//       setCarPhoto(fileUrl);

//       setVehicleInfo((prev) => ({
//         ...prev,
//         carimg: fileUrl
//       }));

//       return;
//     }

//     setDocuments((prev) => ({
//       ...prev,
//       [type]: fileUrl
//     }));

//   } catch (error) {
//     console.error("Upload failed:", error);
//   } finally {
//     setImageUploading(false);
//   }
// };
//   const handleNext = () => {
//     if (step < 3) setStep(step + 1);
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleComplete = async () => {
//     try {

//       const isVehicleInfoValid =
//         vehicleInfo.make &&
//         vehicleInfo.model &&
//         vehicleInfo.year &&
//         vehicleInfo.vin &&
//         vehicleInfo.color &&
//         vehicleInfo.registrationNumber &&
//         vehicleInfo.insuranceExpiry;

//       if (!isVehicleInfoValid) {
//         alert("Please complete all vehicle information");
//         return;
//       }

//       const isDocumentsValid =
//         documents.registration &&
//         documents.cpr &&
//         documents.insurance;

//       if (!isDocumentsValid) {
//         alert("Please upload all required documents");
//         return;
//       }

//       const isFinancialValid =
//         financialDetails.buyingPrice &&
//         financialDetails.askingPrice;

//       const isFinancialValidInvestor =
//         financialDetails.investorAmount &&
//         financialDetails.askingPrice &&
//         financialDetails.commission;

//       if (carSource === "Company Car" && !isFinancialValid) {
//         alert("Please complete financial details");
//         return;
//       }

//       if (carSource === "Investor" && !isFinancialValidInvestor) {
//         alert("Please complete financial details");
//         return;
//       }

//       if (financialDetails.leaseEnabled) {
//         if (!financialDetails.leaseAmount || !financialDetails.leaseType) {
//           alert("Lease information is required");
//           return;
//         }
//       }

//       setaddingCar(true);

//       const carData = {
//         carSource: carSource,
//         CarImage: carPhoto,
//         investorId: carSource === "Investor" ? financialDetails.investorId : null,
//         customerId: carSource === "Customer" ? financialDetails.customerName : null,

//         make: vehicleInfo.make,
//         model: vehicleInfo.model,
//         year: Number(vehicleInfo.year),
//         vin: vehicleInfo.vin,
//         color: vehicleInfo.color,
//         registrationNumber: vehicleInfo.registrationNumber,

//         insuranceExpiryDate: vehicleInfo.insuranceExpiry,

//         buyingPrice:
//           carSource === "Company Car"
//             ? Number(financialDetails.buyingPrice)
//             : null,

//         askingPrice: Number(financialDetails.askingPrice),

//         paymentType:
//           carSource === "Company Car"
//             ? financialDetails.paymentType
            
//             : "null",
//         AmountUsed: carSource === "Investor" ? Number(financialDetails.investorAmount) : null,
//         CompanyCommission: carSource === "Investor" ? Number(financialDetails.commission) : null,

//         enableLease: financialDetails.leaseEnabled,

//         leaseType: financialDetails.leaseEnabled
//           ? financialDetails.leaseType
//           : null,

//         leaseAmount: financialDetails.leaseEnabled
//           ? Number(financialDetails.leaseAmount)
//           : null,

//         monthlyRentDueDate: financialDetails.leaseEnabled
//           ? Number(financialDetails.installmentDueDate)
//           : null,

//         MonthlyDueDate: financialDetails.paymentType === "Installment"
//           ? financialDetails.MonthlyDueDate :
//           null,

//         // ✅ Correct fields
//             registrationCard: documents.registration || null,
//       cprDocument: documents.cpr,
//       insuranceDocument: documents.insurance,
//       additionalDocument: documents.additional
//       };

//       console.log("Car Data:", carData);

//       const response = await addInventory(carData);

//       console.log("API Response:", response);
//       setaddingCar(false);
//       onComplete();

      

//     } catch (error) {
//       setaddingCar(false);
//       console.error("Error adding inventory:", error);

//       alert(
//         error?.message ||
//         "Something went wrong while adding the car."
//       );

//     }
//   };

//   const fetchInvestors = async () => {
//     // Don't fetch if already loading or if we already have investors
//     if (investorsLoading || investors.length > 0) return;
    
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
//           name: inv.investorName  || 'Unknown',
//           cprNumber: inv.cprNumber  || 'N/A',
//           contactNumber: inv.contactNumber  || 'N/A',
//           email: inv.email  || '',
//           status:  inv.isActive ? 'Active' : 'Inactive',
//         }));
      
//       setInvestors(formattedInvestors);
//     } catch (error) {
//       console.error('Error fetching investors:', error);
//       setInvestors([]);
//     } finally {
//       setInvestorsLoading(false);
//     }
//   };

//   // Filter out investors that already have active user accounts
//   // const availableInvestors = investors.filter(inv => {
//   //   const hasActiveUser = users.some(
//   //     u => u?.investorId === inv?.id && u?.status === 1
//   //   );
//   //   return !hasActiveUser;
//   // });

  

//   return (

    
//     <div className="min-h-screen bg-background p-6">
//       {imageUploading && (
//   <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
//     <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
//       <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
//       <p className="text-sm font-medium text-black">Uploading image...</p>
//     </div>
//   </div>
// )}
//       <div className="max-w-4xl mx-auto">
//         {/* Progress Indicator */}
//         <div className="mb-8">
//           <div className="flex items-center justify-center gap-4">
//             {[1, 2, 3].map((s) => (
//               <div key={s} className="flex items-center">
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${s === step
//                     ? 'bg-primary text-primary-foreground'
//                     : s < step
//                       ? 'bg-primary/20 text-primary'
//                       : 'bg-secondary text-muted-foreground'
//                     }`}
//                 >
//                   {s < step ? <Check className="h-5 w-5" /> : s}
//                 </div>
//                 {s < 3 && (
//                   <div
//                     className={`w-16 h-1 ${s < step ? 'bg-primary' : 'bg-secondary'
//                       }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-center gap-20 mt-2">
//             <span className="text-xs text-muted-foreground">Car Source</span>
//             <span className="text-xs text-muted-foreground">Vehicle Info</span>
//             <span className="text-xs text-muted-foreground">Financial</span>
//           </div>
//         </div>

//         {/* Step 1: Car Source */}
//         {step === 1 && (
//           <Card className="bg-card border-border">
//             <CardHeader>
//               <CardTitle>Where is this car coming from?</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {sourceOptions.map((option) => {
//                   const Icon = option.icon;
//                   return (
//                     <Card
//                       key={option.value}
//                       className={`cursor-pointer transition-all ${carSource === option.value
//                         ? 'border-primary bg-primary/10'
//                         : 'border-border hover:border-primary/50'
//                         }`}
//                       onClick={() => setCarSource(option.value)}
//                     >
//                       <CardContent className="p-6 text-center">
//                         <Icon className="h-12 w-12 mx-auto mb-3 text-primary" />
//                         <h3 className="font-semibold mb-1">{option.label}</h3>
//                         <p className="text-sm text-muted-foreground">{option.description}</p>
//                       </CardContent>
//                     </Card>
//                   );
//                 })}
//               </div>
//               <div className="flex justify-end gap-3 mt-6">
//                 <Button variant="outline" onClick={onCancel}>
//                   Cancel
//                 </Button>
//                 <Button onClick={handleNext} disabled={!carSource}>
//                   Next <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Step 2: Vehicle Info */}
//         {step === 2 && (
//           <Card className="bg-card border-border">
//             <CardHeader>
//               <CardTitle>Vehicle Information</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {/* Form Section - Distinct Background */}
//               <div className="p-6 rounded-lg border border-border" style={{ backgroundColor: 'var(--form-section)' }}>
//                  <div>
//                 <Label>Car Photo</Label>
//                 <Input
//                   type="file"
//                   accept=".jpg,.jpeg,.png"
//                   disabled={imageUploading}
//                   onChange={(e) => handleFileChange(e, "carimg")}
//                   className="bg-input-background mt-1 mb-3"
//                 />

//                 {carPhoto && (
//                   <p className="text-xs text-green-500 mt-1">
//                     ✓ Image uploaded successfully
//                   </p>
//                 )}
//               </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              

//                   <div>
//                     <Label htmlFor="make">Make</Label>
//                     <Input
//                       id="make"
//                       placeholder="e.g., BMW"
//                       value={vehicleInfo.make}
//                       onChange={(e) => setVehicleInfo({ ...vehicleInfo, make: e.target.value })}
//                       className="bg-input-background"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="model">Model</Label>
//                     <Input
//                       id="model"
//                       placeholder="e.g., X5"
//                       value={vehicleInfo.model}
//                       onChange={(e) => setVehicleInfo({ ...vehicleInfo, model: e.target.value })}
//                       className="bg-input-background"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="year">Year</Label>
//                     <Input
//                       id="year"
//                       type="number"
//                       placeholder="2024"
//                       value={vehicleInfo.year}
//                       onChange={(e) => setVehicleInfo({ ...vehicleInfo, year: e.target.value })}
//                       className="bg-input-background"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="color">Color</Label>
//                     <Input
//                       id="color"
//                       placeholder="e.g., Black"
//                       value={vehicleInfo.color}
//                       onChange={(e) => setVehicleInfo({ ...vehicleInfo, color: e.target.value })}
//                       className="bg-input-background"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="vin">VIN / Chassis</Label>
//                     <Input
//                       id="vin"
//                       placeholder="Vehicle identification number"
//                       value={vehicleInfo.vin}
//                       onChange={(e) => setVehicleInfo({ ...vehicleInfo, vin: e.target.value })}
//                       className="bg-input-background"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="registration">Registration Number</Label>
//                     <Input
//                       id="registration"
//                       placeholder="e.g., ABC-1234"
//                       value={vehicleInfo.registrationNumber}
//                       onChange={(e) =>
//                         setVehicleInfo({ ...vehicleInfo, registrationNumber: e.target.value })
//                       }
//                       className="bg-input-background"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="insuranceExpiry">Insurance Expiry Date</Label>
//                     <Input
//                       id="insuranceExpiry"
//                       type="date"
//                       value={vehicleInfo.insuranceExpiry}
//                       onChange={(e) =>
//                         setVehicleInfo({ ...vehicleInfo, insuranceExpiry: e.target.value })
//                       }
//                       className="bg-input-background"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Document Upload Section - Distinct Background */}
//               {/* <div className="mt-6 p-6 rounded-lg border border-border" style={{ backgroundColor: 'var(--form-section)' }}>
//                 <h4 className="font-medium mb-3">Document Upload</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div>
//                     <Label>Registration Card (Required)</Label>
//                     <Input type="file" className="bg-input-background mt-1" />
//                   </div>
//                   <div>
//                     <Label>CPR Document (Required)</Label>
//                     <Input type="file" className="bg-input-background mt-1" />
//                   </div>
//                   <div>
//                     <Label>Insurance (Optional)</Label>
//                     <Input type="file" className="bg-input-background mt-1" />
//                   </div>
//                   <div>
//                     <Label>Additional Documents (Optional)</Label>
//                     <Input type="file" multiple className="bg-input-background mt-1" />
//                   </div>
//                 </div>
//               </div> */}

//               {/* Document Upload Section */}
//               <div className="mt-6 p-6 rounded-lg border border-border" style={{ backgroundColor: 'var(--form-section)' }}>
//                 <h4 className="font-medium mb-3">Document Upload</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div>
//                     <Label>Registration Card (Required)</Label>
//                     <Input
//                       type="file"
//                       accept=".pdf,.jpg,.jpeg,.png"
//                       onChange={(e) => handleFileChange(e, "registration")}
//                       className="bg-input-background mt-1"
//                     />
//                     {documents.registration && (
//                       <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
//                     )}
//                   </div>

//                   <div>
//                     <Label>CPR Document (Required)</Label>
//                     <Input
//                       type="file"
//                       accept=".pdf,.jpg,.jpeg,.png"
//                        onChange={(e) => handleFileChange(e, "cpr")}
//                       className="bg-input-background mt-1"
//                     />
//                     {documents.cpr && (
//                       <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
//                     )}
//                   </div>

//                   <div>
//                     <Label>Insurance (Optional)</Label>
//                     <Input
//                       type="file"
//                       accept=".pdf,.jpg,.jpeg,.png"
//                       onChange={(e) => handleFileChange(e, "insurance")}
//                       className="bg-input-background mt-1"
//                     />
//                     {documents.insurance && (
//                       <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
//                     )}
//                   </div>

//                   <div>
//                     <Label>Additional Documents (Optional)</Label>
//                     <Input
//                       type="file"
//                       multiple
//                       accept=".pdf,.jpg,.jpeg,.png"
//                       onChange={(e) => handleFileChange(e, "additional")}
//                       className="bg-input-background mt-1"
//                     />
//                     {documents.additional && (
//                       <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-between gap-3 mt-6">
//                 <Button variant="outline" onClick={handleBack}>
//                   <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                 </Button>
//                 <Button onClick={handleNext}>
//                   Next <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Step 3: Financial Details */}
//         {step === 3 && (
//           <Card className="bg-card border-border">
//             <CardHeader>
//               <CardTitle>Financial Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-6">
//                 {/* Company Car Fields */}
//                 {carSource === 'Company Car' && (
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="buyingPrice">Buying Price (BHD)</Label>
//                         <Input
//                           id="buyingPrice"
//                           type="number"
//                           placeholder="0.000"
//                           value={financialDetails.buyingPrice}
//                           onChange={(e) =>
//                             setFinancialDetails({ ...financialDetails, buyingPrice: e.target.value })
//                           }
//                           className="bg-input-background"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="askingPrice">Asking Price (BHD)</Label>
//                         <Input
//                           id="askingPrice"
//                           type="number"
//                           placeholder="0.000"
//                           value={financialDetails.askingPrice}
//                           onChange={(e) =>
//                             setFinancialDetails({ ...financialDetails, askingPrice: e.target.value })
//                           }
//                           className="bg-input-background"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="paymentType">Payment Type</Label>
//                         <Select
//                           value={financialDetails.paymentType}
//                           onValueChange={(value: PaymentType) =>
//                             setFinancialDetails({ ...financialDetails, paymentType: value })
//                           }
//                         >
//                           <SelectTrigger className="bg-input-background">
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="Full">Full Payment</SelectItem>
//                             <SelectItem value="Installment">Installment</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       {financialDetails.paymentType === 'Installment' && (
//                         <div>
//                           <Label htmlFor="dueDate">Monthly Due Date</Label>
//                           <Select
//                             value={financialDetails.MonthlyDueDate}
//                             onValueChange={(value) =>
//                               setFinancialDetails({ ...financialDetails, MonthlyDueDate: value })
//                             }
//                           >
//                             <SelectTrigger className="bg-input-background">
//                               <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {[1, 5, 10, 15, 20, 25, 28].map((day) => (
//                                 <SelectItem key={day} value={day.toString()}>
//                                   Day {day} of month
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Investor Car Fields */}
//                 {carSource === 'Investor' && (
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="investor">Select Investor</Label>
//                       <SearchableInvestorSelect
//                       value={financialDetails.investorId}
//                       onChange={(value) => setFinancialDetails({ ...financialDetails, investorId: value })}
//                       investors={investors}
//                       loading={investorsLoading}
//                       onOpen={fetchInvestors}
//                     />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="investorAmount">Amount Used (BHD)</Label>
//                         <Input
//                           id="investorAmount"
//                           type="number"
//                           placeholder="0.000"
//                           value={financialDetails.investorAmount}
//                           onChange={(e) => setFinancialDetails({ ...financialDetails, investorAmount: e.target.value })}
//                           className="bg-input-background"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="askingPrice">Asking Price (BHD)</Label>
//                         <Input
//                           id="askingPrice"
//                           type="number"
//                           placeholder="0.000"
//                           value={financialDetails.askingPrice}
//                           onChange={(e) =>
//                             setFinancialDetails({ ...financialDetails, askingPrice: e.target.value })
//                           }
//                           className="bg-input-background"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label>Auto Lounge Commission (BHD)</Label>
//                       <Input
//                         type="number"
//                         placeholder="Fixed commission for company"
//                         value={financialDetails.commission}
//                         onChange={(e) => setFinancialDetails({ ...financialDetails, commission: e.target.value })}
//                         className="bg-input-background"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Customer Car Fields */}
//                 {carSource === 'Customer' && (
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="customerName">Customer Details (Consignor)</Label>
//                       <Input
//                         id="customerName"
//                         placeholder="Customer full name"
//                         value={financialDetails.customerName}
//                         onChange={(e) => setFinancialDetails({ ...financialDetails, customerName: e.target.value })}
//                         className="bg-input-background"
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="askingPrice">Asking Price (BHD)</Label>
//                         <Input
//                           id="askingPrice"
//                           type="number"
//                           placeholder="0.000"
//                           value={financialDetails.askingPrice}
//                           onChange={(e) =>
//                             setFinancialDetails({ ...financialDetails, askingPrice: e.target.value })
//                           }
//                           className="bg-input-background"
//                         />
//                       </div>
//                       <div>
//                         <Label>Auto Lounge Commission (BHD)</Label>
//                         <Input
//                           type="number"
//                           placeholder="0.000"
//                           value={financialDetails.commission}
//                           onChange={(e) => setFinancialDetails({ ...financialDetails, commission: e.target.value })}
//                           className="bg-input-background"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Lease Toggle (Common) */}
//                 <div className="border-t border-border pt-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <div>
//                       <Label htmlFor="leaseEnabled">Enable Lease</Label>
//                       <p className="text-sm text-muted-foreground">
//                         Make this car available for lease
//                       </p>
//                     </div>
//                     <Switch
//                       id="leaseEnabled"
//                       checked={financialDetails.leaseEnabled}
//                       onCheckedChange={(checked) =>
//                         setFinancialDetails({ ...financialDetails, leaseEnabled: checked })
//                       }
//                     />
//                   </div>

//                   {financialDetails.leaseEnabled && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="leaseType">Lease Type</Label>
//                         <Select
//                           value={financialDetails.leaseType}
//                           onValueChange={(value: LeaseType) =>
//                             setFinancialDetails({ ...financialDetails, leaseType: value })
//                           }
//                         >
//                           <SelectTrigger className="bg-input-background">
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="Daily">Daily</SelectItem>
//                             <SelectItem value="Monthly">Monthly</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div>
//                         <Label htmlFor="leaseAmount">Lease Amount (BHD)</Label>
//                         <Input
//                           id="leaseAmount"
//                           type="number"
//                           placeholder="0.000"
//                           value={financialDetails.leaseAmount}
//                           onChange={(e) =>
//                             setFinancialDetails({ ...financialDetails, leaseAmount: e.target.value })
//                           }
//                           className="bg-input-background"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="rentDueDate">Monthly Rent Due Date</Label>
//                         <Select
//                           value={financialDetails.installmentDueDate}
//                           onValueChange={(value) =>
//                             setFinancialDetails({ ...financialDetails, installmentDueDate: value })
//                           }
//                         >
//                           <SelectTrigger className="bg-input-background">
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {[1, 5, 10, 15, 20, 25, 28].map((day) => (
//                               <SelectItem key={day} value={day.toString()}>
//                                 Day {day} of month
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-between gap-3 mt-6">
//                 <Button variant="outline" onClick={handleBack}>
//                   <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                 </Button>
//                 {
//                 addingCar ? (
//                 <Button disabled>
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 </Button>
//               ) : (
//                 <Button onClick={handleComplete}>
//                   <Check className="mr-2 h-4 w-4" /> Save Car
//                 </Button>
//               )}
            
                
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { Building2, User, Users, ArrowLeft, ArrowRight, Check, ChevronDown, Search, X } from 'lucide-react';
import { CarSource, PaymentType, LeaseType } from '@/types';
import { addInventory } from "@/app/api/CarInventory/addcarinventory";
import { ScrollArea } from './ui/scroll-area';
import { uploadImage } from "@/app/api/UploadImage/uploadImage";

interface AddCarWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

interface Customer {
  id: string;
  customerName: string;
  contactNumber: string;
  cprNumber: string;
  notes?: string;
  cprDocumentPath?: string;
  createdAt?: string;
}

interface Investor {
  id: string;
  name: string;
  cprNumber: string;
  contactNumber: string;
  email: string;
  status: string;
}



const SearchableInvestorSelect = ({ value, onChange, investors, loading, onOpen }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
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

  const filteredInvestors = investors.filter((investor: Investor) => 
    investor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.cprNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.contactNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedInvestor = investors.find((i: Investor) => i.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              filteredInvestors.map((investor: Investor) => (
                <button
                  key={investor.id}
                  type="button"
                  onClick={() => {
                    onChange(investor.id);
                    handleClose();
                  }}
                 className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 ${
                    value === investor.id 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground' // Selected state with light/dark support
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800' // Hover state for both modes
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

const SearchableCompanySelect = ({ value, onChange, companies, loading, onOpen }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
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

  const filteredCompanies = companies.filter((company: any) => 
    company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.crNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCompany = companies.find((c: any) => c.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedCompany ? (
          <span className="flex-1 text-left">
            {selectedCompany.name} - CR: {selectedCompany.crNumber}
          </span>
        ) : (
          <span className="flex-1 text-left text-muted-foreground">
            Select company profile
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
              placeholder="Search by name or CR number..."
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
                <span className="ml-2 text-sm text-muted-foreground">Loading companies...</span>
              </div>
            ) : filteredCompanies.length > 0 ? (
              filteredCompanies.map((company: any) => (
                <button
                  key={company.id}
                  type="button"
                  onClick={() => {
                    onChange(company.id);
                    handleClose();
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 ${
                    value === company.id 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex flex-row items-center gap-2">
                    <span className="font-medium">{company.name}</span>
                    <span className="text-xs text-muted-foreground">
                      CR: {company.email} | {company.contactNumber}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                No companies available
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

const SearchableCustomerSelect = ({ value, onChange, customers, loading, onOpen }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
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

  const filteredCustomers = customers.filter((customer: Customer) => 
    customer.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.cprNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCustomer = customers.find((c: Customer) => c.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedCustomer ? (
          <span className="flex-1 text-left">
            {selectedCustomer.customerName} - CPR: {selectedCustomer.cprNumber}
          </span>
        ) : (
          <span className="flex-1 text-left text-muted-foreground">
            Select customer profile
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
              placeholder="Search by name, CPR, or phone..."
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
                <span className="ml-2 text-sm text-muted-foreground">Loading customers...</span>
              </div>
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer: Customer) => (
                <button
                  key={customer.id}
                  type="button"
                  onClick={() => {
                    onChange(customer.id);
                    handleClose();
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 ${
                    value === customer.id 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground' // Selected state with light/dark support
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800' // Hover state for both modes
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-2">
                      <span className={`font-medium ${
                        value === customer.id ? 'text-primary dark:text-primary-foreground' : ''
                      }`}>
                        {customer.customerName}
                      </span>
                    </div>
                    <div className={`flex flex-row items-center gap-2 text-xs ${
                      value === customer.id 
                        ? 'text-primary/70 dark:text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      <span>CPR: {customer.cprNumber}</span>
                      <span>|</span>
                      <span>Phone: {customer.contactNumber}</span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                No customers available
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
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [investorsLoading, setInvestorsLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [carSource, setCarSource] = useState<CarSource | null>(null);
  const [addingCar, setaddingCar] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [carPhoto, setCarPhoto] = useState(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState(false);

  const [vehicleInfo, setVehicleInfo] = useState({
    carimg: '',
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
    advance: '',
    companyUsedAmount: '',
    CompanyId: null,
    no_installments: '1',
    paymentType: 'Full' as PaymentType,
    investorId: null,
    customerId: null,
    investorAmount: '',
    customerName: '',
    commission: '',
    MonthlyDueDate: '10',
    commissionType: 'Fixed' as 'Fixed' | 'Percentage',
    leaseEnabled: false,
    leaseType: 'Daily' as LeaseType,
    leaseAmount: '',
    installmentDueDate: '5',
    installments: [] as { amount: string; dueDate: string }[],
  });

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

  const handleFileChange = async (e: any, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImageUploading(true);
      const fileUrl = await uploadImage(file);

      if (type === "carimg") {
        setCarPhoto(fileUrl);
        setVehicleInfo((prev) => ({
          ...prev,
          carimg: fileUrl
        }));
        return;
      }

      setDocuments((prev) => ({
        ...prev,
        [type]: fileUrl
      }));
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
        documents.cpr ;
        // &&
        // documents.insurance;

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

      if (carSource === "Customer" && !financialDetails.askingPrice) {
        alert("Please complete financial details");
        return;
      }

      if (financialDetails.leaseEnabled) {
        if (!financialDetails.leaseAmount || !financialDetails.leaseType) {
          alert("Lease information is required");
          return;
        }
      }

      setaddingCar(true);

      const carData = {
        carSource: carSource,
        CarImage: carPhoto,
        investorId: carSource === "Investor" ? financialDetails.investorId : null,
        customerId: carSource === "Customer" ? financialDetails.customerId : null,
        CompanyId: carSource === "Company Car" ? financialDetails.CompanyId : null,
        make: vehicleInfo.make,
        model: vehicleInfo.model,
        year: Number(vehicleInfo.year),
        vin: vehicleInfo.vin,
        color: vehicleInfo.color,
        registrationNumber: vehicleInfo.registrationNumber,
        insuranceExpiryDate: vehicleInfo.insuranceExpiry,
        buyingPrice: carSource === "Company Car" ? parseFloat(financialDetails.buyingPrice) : carSource === "Investor" ? parseFloat(financialDetails.investorAmount) : carSource === "Customer" ? parseFloat(financialDetails.buyingPrice) : null,
        askingPrice: parseFloat(financialDetails.askingPrice),
        NumberOfInstallments: financialDetails.paymentType === "Installment" ? Number(financialDetails.no_installments) : null,
        AdvanceAmount: financialDetails.paymentType === "Installment" ? parseFloat(financialDetails.advance) : null,
        paymentType:  financialDetails.paymentType,
        AmountUsed: carSource === "Investor" ? parseFloat(financialDetails.investorAmount) : carSource === "Company Car" ? parseFloat(financialDetails.companyUsedAmount) : null,
        CompanyCommission: carSource !== "Company Car" ? parseFloat(financialDetails.commission) : null,
        enableLease: financialDetails.leaseEnabled,
        leaseType: financialDetails.leaseEnabled ? financialDetails.leaseType : null,
        leaseAmount: financialDetails.leaseEnabled ? parseFloat(financialDetails.leaseAmount) : null,
        monthlyRentDueDate: financialDetails.leaseEnabled ? parseFloat(financialDetails.installmentDueDate) : null,
        MonthlyDueDate: financialDetails.paymentType === "Installment" ? parseFloat(financialDetails.MonthlyDueDate) : null,
        registrationCard: documents.registration || null,
        cprDocument: documents.cpr,
        insuranceDocument: documents.insurance,
        additionalDocument: documents.additional
      };

      console.log("Car Data:", carData);

      const response = await addInventory(carData);
      console.log("API Response:", response);
      setaddingCar(false);
      onComplete();
    } catch (error) {
      setaddingCar(false);
      console.error("Error adding inventory:", error);
      alert(error?.message || "Something went wrong while adding the car.");
    }
  };

  const fetchCompanies = async () => {
  if (companiesLoading || companies.length > 0) return;
  
  setCompaniesLoading(true);
  try {
    const response = await fetch('https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Company');
    const data = await response.json();

    console.log("Raw Company Data:", data);
    
    let companiesData = [];
    
    if (Array.isArray(data)) {
      companiesData = data;
    } else if (data.data && Array.isArray(data.data)) {
      companiesData = data.data;
    } else if (data.companies && Array.isArray(data.companies)) {
      companiesData = data.companies;
    }
    
    const formattedCompanies = companiesData
      .filter(company => company != null)
      .map(company => ({
        id: company.id || company.companyId || company._id,
        name: company.companyName || company.name || 'Unknown',
        crNumber: company.crNumber || 'N/A',
        contactNumber: company.phone || 'N/A',
        email: company.email || '',
      }));
    
    setCompanies(formattedCompanies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    setCompanies([]);
  } finally {
    setCompaniesLoading(false);
  }
};

  const fetchInvestors = async () => {
    if (investorsLoading || investors.length > 0) return;
    
    setInvestorsLoading(true);
    try {
      const response = await fetch('https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Investors');
      const data = await response.json();
      
      let investorsData = [];
      
      if (Array.isArray(data)) {
        investorsData = data;
      } else if (data.data && Array.isArray(data.data)) {
        investorsData = data.data;
      } else if (data.investors && Array.isArray(data.investors)) {
        investorsData = data.investors;
      }
      
      const formattedInvestors = investorsData
        .filter(inv => inv != null)
        .map(inv => ({
          id: inv.id || inv.investorId || inv._id,
          name: inv.investorName || 'Unknown',
          cprNumber: inv.cprNumber || 'N/A',
          contactNumber: inv.contactNumber || 'N/A',
          email: inv.email || '',
          status: inv.isActive ? 'Active' : 'Inactive',
        }));
      
      setInvestors(formattedInvestors);
    } catch (error) {
      console.error('Error fetching investors:', error);
      setInvestors([]);
    } finally {
      setInvestorsLoading(false);
    }
  };

  const fetchCustomers = async () => {
    if (customersLoading || customers.length > 0) return;
    
    setCustomersLoading(true);
    try {
      const response = await fetch('https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Customers');
      const data = await response.json();
      
      let customersData = [];
      
      if (Array.isArray(data)) {
        customersData = data;
      } else if (data.data && Array.isArray(data.data)) {
        customersData = data.data;
      } else if (data.customers && Array.isArray(data.customers)) {
        customersData = data.customers;
      }
      
      const formattedCustomers = customersData
        .filter(customer => customer != null)
        .map(customer => ({
          id: customer.id || customer.customerId || customer._id,
          customerName: customer.customerName || 'Unknown',
          contactNumber: customer.contactNumber || 'N/A',
          cprNumber: customer.cprNumber || 'N/A',
          notes: customer.notes || '',
          cprDocumentPath: customer.cprDocumentPath || '',
          createdAt: customer.createdAt || ''
        }));
      
      setCustomers(formattedCustomers);
      console.log("Customer Data:", formattedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    } finally {
      setCustomersLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {imageUploading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-black">Uploading image...</p>
          </div>
        </div>
      )}
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
                    className={`w-16 h-1 ${s < step ? 'bg-primary' : 'bg-secondary'}`}
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
              <div className="p-6 rounded-lg border border-border" style={{ backgroundColor: 'var(--form-section)' }}>
                <div>
                  <Label>Car Photo</Label>
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    disabled={imageUploading}
                    onChange={(e) => handleFileChange(e, "carimg")}
                    className="bg-input-background mt-1 mb-3"
                  />
                  {carPhoto && (
                    <p className="text-xs text-green-500 mt-1">
                      ✓ Image uploaded successfully
                    </p>
                  )}
                </div>
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

              {/* Document Upload Section */}
              <div className="mt-6 p-6 rounded-lg border border-border" style={{ backgroundColor: 'var(--form-section)' }}>
                <h4 className="font-medium mb-3">Document Upload</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Registration Card (Required)</Label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "registration")}
                      className="bg-input-background mt-1"
                    />
                    {documents.registration && (
                      <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
                    )}
                  </div>

                  <div>
                    <Label>CPR Document (Required)</Label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "cpr")}
                      className="bg-input-background mt-1"
                    />
                    {documents.cpr && (
                      <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
                    )}
                  </div>

                  <div>
                    <Label>Insurance (Optional)</Label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "insurance")}
                      className="bg-input-background mt-1"
                    />
                    {documents.insurance && (
                      <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
                    )}
                  </div>

                  <div>
                    <Label>Additional Documents (Optional)</Label>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "additional")}
                      className="bg-input-background mt-1"
                    />
                    {documents.additional && (
                      <p className="text-xs text-green-500 mt-1">✓ File Uploaded</p>
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
                    <div>
      <Label htmlFor="company">Select Company</Label>
      <SearchableCompanySelect
        value={financialDetails.CompanyId}
        onChange={(value) => setFinancialDetails({ ...financialDetails, CompanyId: value })}
        companies={companies}
        loading={companiesLoading}
        onOpen={fetchCompanies}
      />
    </div>
                    
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
                    <div>
                        <Label htmlFor="investorAmount">Amount Used (BHD)</Label>
                        <Input
                          id="investorAmount"
                          type="number"
                          placeholder="0.000"
                          value={financialDetails.companyUsedAmount}
                          onChange={(e) => setFinancialDetails({ ...financialDetails, companyUsedAmount: e.target.value })}
                          className="bg-input-background"
                        />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {financialDetails.paymentType === 'Installment' && (

                    <div>
                      <Label>Number Of Installments</Label>
                      <Input
                        type="number"
                        placeholder="Number of installments"
                        value={financialDetails.no_installments}
                        onChange={(e) => setFinancialDetails({ ...financialDetails, no_installments: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>
                     )}

                    {financialDetails.paymentType === 'Installment' && (
                      

                     <div>
                      <Label>Advance Amount</Label>
                      <Input
                        type="number"
                        placeholder="advance amount"
                        value={financialDetails.advance}
                        onChange={(e) => setFinancialDetails({ ...financialDetails, advance: e.target.value })}
                        className="bg-input-background"
                      />
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
                     {financialDetails.paymentType === 'Installment' && (

                    <div>
                      <Label>Number Of Installments</Label>
                      <Input
                        type="number"
                        placeholder="Number of installments"
                        value={financialDetails.no_installments}
                        onChange={(e) => setFinancialDetails({ ...financialDetails, no_installments: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>
                     )}

                    {financialDetails.paymentType === 'Installment' && (
                      

                     <div>
                      <Label>Advance Amount</Label>
                      <Input
                        type="number"
                        placeholder="advance amount"
                        value={financialDetails.advance}
                        onChange={(e) => setFinancialDetails({ ...financialDetails, advance: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>
                    )}
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
                      <Label htmlFor="customer">Select Customer</Label>
                      <SearchableCustomerSelect
                        value={financialDetails.customerId}
                        onChange={(value) => setFinancialDetails({ ...financialDetails, customerId: value })}
                        customers={customers}
                        loading={customersLoading}
                        onOpen={fetchCustomers}
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

                        {financialDetails.paymentType === 'Installment' && (

                    <div>
                      <Label>Number Of Installments</Label>
                      <Input
                        type="number"
                        placeholder="Number of installments"
                        value={financialDetails.no_installments}
                        onChange={(e) => setFinancialDetails({ ...financialDetails, no_installments: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>
                     )}

                    {financialDetails.paymentType === 'Installment' && (
                      

                     <div>
                      <Label>Advance Amount</Label>
                      <Input
                        type="number"
                        placeholder="advance amount"
                        value={financialDetails.advance}
                        onChange={(e) => setFinancialDetails({ ...financialDetails, advance: e.target.value })}
                        className="bg-input-background"
                      />
                    </div>
                    )}

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
                {addingCar ? (
                  <Button disabled>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </Button>
                ) : (
                  <Button onClick={handleComplete}>
                    <Check className="mr-2 h-4 w-4" /> Save Car
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
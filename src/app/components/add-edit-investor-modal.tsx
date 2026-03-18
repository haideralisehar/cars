import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Plus, X, Check } from 'lucide-react';
import { createInvestor } from "@/app/api/Investors/addInvestor";
import {uploadImage } from "@/app/api/UploadImage/uploadImage";
import { editInvestor } from "@/app/api/Investors/editInvestor";

export function AddEditInvestorModal({ isOpen, onClose, investor, onEditSuccess }) {

useEffect(() => {
  console.log("Investor prop changed:", investor);
    
    });

  const [addingInvestor, setAddingInvestor] = useState(false);
   const [imageUploading, setImageUploading] = useState(false);
   const [carPhoto, setCarPhoto] = useState(null);
  const [investorData, setInvestorData] = useState({
    name: investor?.investorName || '',
    contactNumber: investor?.contactNumber || '',
    cprNumber: investor?.cprNumber || '',
    notes: '',
    cprDocumentPath: investor?.cprDocumentPath || ''
  });

  const [investments, setInvestments] = useState(
    investor?.investments?.map(inv => ({ 
      amount: inv.amount.toString(), 
      date: inv.date,
      method: 'Bank Transfer',
      remarks: ''
    })) || 
    [{ amount: '', date: '', method: 'Bank Transfer', remarks: '' }]
  );

   // Initialize form when investor prop changes or modal opens
  useEffect(() => {
    console.log("Investor prop in modal:", investor);
    
    if (investor) {
      // Editing existing investor
      setInvestorData({
        name: investor.investorName || '',
        contactNumber: investor.contactNumber || '',
        cprNumber: investor.cprNumber || '',
        notes: investor.notes || '',
        cprDocumentPath: investor.cprDocumentPath || ''
      });

      // Map investment entries
      if (investor.investmentEntries && investor.investmentEntries.length > 0) {
        setInvestments(
          investor.investmentEntries.map(entry => ({
            amount: entry.amount?.toString() || '',
            date: entry.investmentDate ? entry.investmentDate.split('T')[0] : '',
            method: entry.paymentMethod || 'Bank Transfer',
            remarks: entry.remarks || ''
          }))
        );
      } else {
        setInvestments([{ amount: '', date: '', method: 'Bank Transfer', remarks: '' }]);
      }
    } else {
      // Reset form for new investor
      setInvestorData({
        name: '',
        contactNumber: '',
        cprNumber: '',
        notes: '',
        cprDocumentPath: ''
      });
      setInvestments([{ amount: '', date: '', method: 'Bank Transfer', remarks: '' }]);
    }
  }, [investor, isOpen]); // Re-run when investor changes or modal opens

  const handleAddInvestment = () => {
    setInvestments([...investments, { amount: '', date: '', method: 'Bank Transfer', remarks: '' }]);
  };

  const handleInvestmentChange = (index, field, value) => {
    const updated = [...investments];
    updated[index][field] = value;
    setInvestments(updated);
  };

  //   console.log('Saving investor:', { investorData, investments });
  //   // Here you would save to localStorage or backend
  //   console.log('Investor saved successfully');
  //   onClose();
  // };

//   const handleSave = async () => {
//   try {
//     const payload = {
//       investorName: investorData.name,
//       email: "", // add email field if you want
//       contactNumber: investorData.contactNumber,
//       cprNumber: investorData.cprNumber,
//       notes: investorData.notes,

//       investmentEntries: investments.map((inv) => ({
//         amount: parseFloat(inv.amount),
//         investmentDate: new Date(inv.date).toISOString(),
//         paymentMethod: inv.method,
//         remarks: inv.remarks,
//       })),
//     };

//     await createInvestor(payload);

//     alert("Investor added successfully");

//     onClose();
//   } catch (error) {
//     alert("Failed to add investor");
//   }
// };

 const handleFileChange = async (e, type) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setImageUploading(true);

    const fileUrl = await uploadImage(file);

    if (type === "cprDocumentPath") {
      setCarPhoto(fileUrl);

      setInvestorData((prev) => ({
        ...prev,
        cprDocumentPath: fileUrl
      }));
      console.log("Uploaded file URL:", investorData);

      return investorData;
    }

    

  } catch (error) {
    console.error("Upload failed:", error);
  } finally {
    setImageUploading(false);
  }
};

// const handleSave = async () => {
//   // Basic fields validation
//   if (
//     !investorData.name.trim() ||
//     !investorData.contactNumber.trim() ||
//     !investorData.cprNumber.trim()
//   ) {
//     alert("Please fill all required investor fields");
//     return;
//   }

//   // Investment validation
//   const invalidInvestment = investments.some(
//     (inv) => !inv.amount || !inv.date || !inv.method
//   );

//   if (invalidInvestment) {
//     alert("Please fill all required investment fields");
//     return;
//   }

//   try {
//     setAddingInvestor(true);
//     const payload = {
//       investorName: investorData.name,
//       email: "",
//       contactNumber: investorData.contactNumber,
//       cprNumber: investorData.cprNumber,
//       notes: investorData.notes,
//       cprDocumentPath: investorData.cprDocumentPath,

//       investmentEntries: investments.map((inv) => ({
//         id: investor? investor?.id : undefined, // Include ID for existing investments when editing
//         amount: parseFloat(inv.amount),
//         investmentDate: new Date(inv.date).toISOString(),
//         paymentMethod: inv.method,
//         remarks: inv.remarks,
//       })),
//     };

    

//      const response = await createInvestor(payload);
//      setAddingInvestor(false);
//     console.log("Payload sent to API:", payload);
//     console.log("API Response:", response);

//     // ✅ Clear investor fields
//     setInvestorData({
//       name: "",
//       contactNumber: "",
//       cprNumber: "",
//       notes: "",
//       cprDocumentPath: ""
//     });

//     // ✅ Reset investments
//     setInvestments([
//       { amount: "", date: "", method: "", remarks: "" },
//     ]);

//     alert("Investor added successfully");

//     onClose();
//   } catch (error) {
//     alert("Failed to add investor");
//   }
// };
  
// const handleSave = async () => {
//     // Basic fields validation
//     if (
//       !investorData.name.trim() ||
//       !investorData.contactNumber.trim() ||
//       !investorData.cprNumber.trim() ||
//       !investorData.cprDocumentPath.trim()
//     ) {
//       alert("Please fill all required investor fields");
//       return;
//     }

//     // Investment validation
//     const invalidInvestment = investments.some(
//       (inv) => !inv.amount || !inv.date || !inv.method
//     );

//     if (invalidInvestment) {
//       alert("Please fill all required investment fields");
//       return;
//     }

//     try {
//       setAddingInvestor(true);
      
//       const payload = {
//         investorName: investorData.name,
//         email: "",
//         contactNumber: investorData.contactNumber,
//         cprNumber: investorData.cprNumber,
//         notes: investorData.notes,
//         cprDocumentPath: investorData.cprDocumentPath,
//         investmentEntries: investments.map((inv) => ({
//           id: investor ? investor.id : undefined, // Include ID for existing investments when editing
//           amount: parseFloat(inv.amount),
//           investmentDate: new Date(inv.date).toISOString(),
//           paymentMethod: inv.method,
//           remarks: inv.remarks,
//         })),
//       };

//       let response;
      
//       if (investor) {
//         // Edit existing investor
//         console.log("Editing investor with ID:", investor.id);
//         console.log("Edit payload:", payload);
//         response = await editInvestor(investor.id, payload);
//         console.log("Edit Response:", response);
//         alert("Investor updated successfully");
//       } else {
//         // Create new investor
//         console.log("Create payload:", payload);
//         response = await createInvestor(payload);
//         console.log("Create Response:", response);
//         alert("Investor added successfully");
//       }

//       // Clear form
//       setInvestorData({
//         name: "",
//         contactNumber: "",
//         cprNumber: "",
//         notes: "",
//         cprDocumentPath: ""
//       });
//       setInvestments([
//         { amount: "", date: "", method: "Bank Transfer", remarks: "" },
//       ]);

     

//       onClose();
//       onEditSuccess(); // Refresh list after edit or add

//     } catch (error) {
//       console.error("Failed to save investor:", error);
//       alert(investor ? "Failed to update investor" : "Failed to add investor");
//     } finally {
//       setAddingInvestor(false);
//     }
//   };


const handleSave = async () => {
  // Basic fields validation
  if (
    !investorData.name.trim() ||
    !investorData.contactNumber.trim() ||
    !investorData.cprNumber.trim()
  ) {
    alert("Please fill all required investor fields");
    return;
  }

  // Only require CPR document for new investors
  if (!investor && !investorData.cprDocumentPath.trim()) {
    alert("Please upload CPR document");
    return;
  }

  // Investment validation
  const invalidInvestment = investments.some(
    (inv) => !inv.amount || !inv.date || !inv.method
  );

  if (invalidInvestment) {
    alert("Please fill all required investment fields");
    return;
  }

  try {
    setAddingInvestor(true);
    
    const payload = {
      investorName: investorData.name,
      email: "",
      contactNumber: investorData.contactNumber,
      cprNumber: investorData.cprNumber,
      notes: investorData.notes,
      cprDocumentPath: investorData.cprDocumentPath,
      investmentEntries: investments.map((inv, index) => {
        // Get the existing investment entry ID if available
        let entryId = undefined;
        if (investor?.investmentEntries?.[index]?.id) {
          entryId = investor.investmentEntries[index].id;
        }
        
        return {
          id: entryId, // Use existing ID for updates, undefined for new entries
          amount: parseFloat(inv.amount),
          investmentDate: new Date(inv.date).toISOString(),
          paymentMethod: inv.method,
          remarks: inv.remarks,
        };
      }),
    };

    console.log("Sending payload:", JSON.stringify(payload, null, 2));
    
    let response;
    
    if (investor) {
      // Edit existing investor
      console.log("Editing investor with ID:", investor.id);
      response = await editInvestor(investor.id, payload);
      console.log("Edit Response:", response);
      
      if (response && !response.error) {
        alert("Investor updated successfully");
      } else {
        throw new Error(response?.message || "Update failed");
      }
    } else {
      // Create new investor
      console.log("Create payload:", payload);
      response = await createInvestor(payload);
      console.log("Create Response:", response);
      
      if (response && !response.error) {
        alert("Investor added successfully");
      } else {
        throw new Error(response?.message || "Creation failed");
      }
    }

    // Clear form
    setInvestorData({
      name: "",
      contactNumber: "",
      cprNumber: "",
      notes: "",
      cprDocumentPath: ""
    });
    setInvestments([
      { amount: "", date: "", method: "Bank Transfer", remarks: "" },
    ]);

    onClose();
    if (onEditSuccess) {
      onEditSuccess(); // Refresh list after edit or add
    }

  } catch (error) {
    console.error("Failed to save investor:", error);
    alert(error.message || (investor ? "Failed to update investor" : "Failed to add investor"));
  } finally {
    setAddingInvestor(false);
  }
};
const totalInvestment = investments.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);

  return (
    <Dialog open={isOpen}  onOpenChange={onClose}>
      {imageUploading && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-black">Uploading</p>
    </div>
  </div>
)}


      <DialogContent className="bg-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{investor ? 'Edit Investor' : 'Add New Investor'}</DialogTitle>
          <DialogDescription>
            {investor ? 'Update investor information and investment entries' : 'Enter investor details and initial investment'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-secondary/30 border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-medium text-lg mb-4">Investor Information</h3>

              <div>
                <Label htmlFor="investor-name">Investor Name *</Label>
                <Input
                required
                  id="investor-name"
                  placeholder="Enter full name"
                  value={investorData.name}
                  onChange={(e) => setInvestorData({ ...investorData, name: e.target.value })}
                  className="bg-input-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-number">Contact Number *</Label>
                  <Input
                  required
                    id="contact-number"
                    placeholder="+973 XXXX XXXX"
                    value={investorData.contactNumber}
                    onChange={(e) => setInvestorData({ ...investorData, contactNumber: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
                <div>
                  <Label htmlFor="cpr-number">CPR Number *</Label>
                  <Input
                  required
                    id="cpr-number"
                    placeholder="Enter CPR number"
                    value={investorData.cprNumber}
                    onChange={(e) => setInvestorData({ ...investorData, cprNumber: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  placeholder="Additional information"
                  value={investorData.notes}
                  onChange={(e) => setInvestorData({ ...investorData, notes: e.target.value })}
                  className="bg-input-background"
                />
              </div>

              <div>
                <Label htmlFor="cpr-upload">Upload CPR Document (ID CARD)*</Label>
                <div className="mt-2">
                  <Input
                    id="cpr-upload"
                    type="file"
                    disabled={imageUploading}
                     onChange={(e) => handleFileChange(e, "cprDocumentPath")}
                    accept="image/*,.pdf"
                    className="bg-input-background"
                  />
                  <p className={`text-xs mt-1 ${
                    investorData.cprDocumentPath 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {investorData.cprDocumentPath ? "✓ File Uploaded " : "✗ No file uploaded "}
                  </p>

                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Entries */}
          <Card className="bg-secondary/30 border-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Investment Entries</h3>
                {investor? null :
                <Button size="sm" variant="outline" onClick={handleAddInvestment}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
}
              </div>
                
              <div className="space-y-3">
                {investments.map((investment, index) => (
                  <div
                    key={index}
                    className="space-y-3 p-4 bg-background rounded-lg border border-border"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Investment #{index + 1}</h4>
                      {investments.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setInvestments(investments.filter((_, i) => i !== index))}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`amount-${index}`} className="text-xs">
                          Amount (BHD) *
                        </Label>
                        <Input
                        required
                          id={`amount-${index}`}
                          type="number"
                          placeholder="0.000"
                          value={investment.amount}
                          onChange={(e) => handleInvestmentChange(index, 'amount', e.target.value)}
                          className="bg-input-background"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`date-${index}`} className="text-xs">
                          Date *
                        </Label>
                        <Input
                        required
                          id={`date-${index}`}
                          type="date"
                          value={investment.date}
                          onChange={(e) => handleInvestmentChange(index, 'date', e.target.value)}
                          className="bg-input-background"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`method-${index}`} className="text-xs">
                          Payment Method
                        </Label>
                        <Input
                        required
                          id={`method-${index}`}
                          placeholder="e.g. Bank Transfer"
                          value={investment.method}
                          onChange={(e) => handleInvestmentChange(index, 'method', e.target.value)}
                          className="bg-input-background"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`remarks-${index}`} className="text-xs">
                          Remarks
                        </Label>
                        <Input
                          id={`remarks-${index}`}
                          placeholder="Reference number etc."
                          value={investment.remarks}
                          onChange={(e) => handleInvestmentChange(index, 'remarks', e.target.value)}
                          className="bg-input-background"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Investment Summary */}
              <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Investment</span>
                  <span className="text-xl font-bold text-primary">
                    BHD {totalInvestment.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              
              {addingInvestor ? <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </> :  
                   
              investor ? <><Check className="h-4 w-4 mr-2" /> edit Investor</> : <><Check className="h-4 w-4 mr-2" /> add Investor</>}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
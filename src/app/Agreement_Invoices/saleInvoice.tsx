// import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, Image } from '@react-pdf/renderer';
// import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
// import { Button } from '@/app/components/ui/button';
// import { Download, Eye } from 'lucide-react';
// import { useState } from 'react';

// // Types for Lease Data
// export interface LeaseData {
//   agreementRef?: string;
//   currentDate?: string;
//   lesseeName: string;
//   lesseeCpr: string;
//   lesseeContact: string;
//   vehicleModel: string;
//   vehicleYear: string;
//   vehicleColor: string;
//   vehicleVin: string;
//   monthlyRent: number;
//   securityDeposit: number;
//   leaseDuration: string;
//   paymentCycle: 'Monthly' | 'Weekly';
//   paymentStatus: 'Active' | 'Pending' | 'Overdue';
//   startDate?: string;
//   endDate?: string;
// }

// // Static Lease Data
// const staticLeaseData = {
//   agreementRef: 'LA-0001',
//   currentDate: '14-05-2026',
//   lesseeName: 'Ahmed Khalid Al-Mansoori',
//   lesseeCpr: '123456789',
//   lesseeContact: '+973 39876543',
//   vehicleModel: 'Toyota Land Cruiser',
//   vehicleYear: '2024',
//   vehicleColor: 'Pearl White',
//   vehicleVin: 'JTEXXXXXX1234567',
//   monthlyRent: 450,
//   securityDeposit: 900,
//   leaseDuration: '12 Months',
//   paymentCycle: 'Monthly',
//   paymentStatus: 'Active'
// };

// // PDF Styles - Exactly matching HTML/CSS table structure
// const styles = StyleSheet.create({
//   page: {
//     paddingLeft: 32,
//     paddingRight: 32,
//     paddingTop: 42,
//     fontSize: 12,
//     fontFamily: 'Helvetica',
//     backgroundColor: '#ffffff',
//   },
//   // HEADER
//   header: {
//     backgroundColor: '#1f1f1f',
//     borderRadius: 18,
//     padding: 28,
//     marginBottom: 16,
//     position: 'relative',
//   },
//   logo: {
//     fontSize: 52,
//     fontWeight: 900,
//     color: '#ffffff',
//     marginBottom: 4,
//   },
//   logoOrange: {
//     color: '#ff7a1a',
//   },
//   companyName: {
//     fontSize: 16,
//     fontWeight: 700,
//     color: '#ffffff',
//     letterSpacing: 2,
//     marginBottom: 4,
//   },
//   tagline: {
//     fontSize: 10,
//     color: '#bbbbbb',
//     letterSpacing: 4,
//   },
//   documentBox: {
//     position: 'absolute',
//     right: 28,
//     top: 30,
//     textAlign: 'right',
//   },
//   documentTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#ff7a1a',
//     marginBottom: 4,
//   },
//   documentRef: {
//     fontSize: 10,
//     color: '#ffffff',
//     marginBottom: 2,
//   },
//   documentDate: {
//     fontSize: 10,
//     color: '#ffffff',
//   },
//   // SECTION
//   section: {
//     borderWidth: 1,
//     borderColor: '#e2e2e2',
//     borderRadius: 14,
//     marginTop: 13,
//     overflow: 'hidden',
//     paddingTop: 5,
//   },
//   sectionTitle: {
//     backgroundColor: '#111111',
//     color: '#ffffff',
//     paddingTop: 12,
//     paddingBottom: 12,
//     paddingLeft: 18,
//     paddingRight: 18,
//     fontSize: 13,
//     fontWeight: 700,
//     borderLeftWidth: 6,
//     borderLeftColor: '#ff7a1a',
//     textTransform: 'uppercase',
//   },
//   sectionContent: {
//     padding: 18,
//   },
//   // TABLE STYLES
//   table: {
//     width: '100%',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e2e2e2',
    
//   },
//   tableCell: {
//     flex: 1,
//     padding: 10,
//     fontSize: 10,
//     borderRightWidth: 1,
//     borderRightColor: '#e2e2e2',
//     color: '#434343',
//   },

//    tableCells: {
//     flex: 2,
//     padding: 10,
//     fontSize: 10,
//     borderRightWidth: 1,
//     borderRightColor: '#e2e2e2',
//     color: '#434343',
//     textAlign: 'left',
    
//   },
//   tableCellss: {
//     paddingTop: 1,
//     paddingBottom: 10,
//     paddingRight: 20,
//     fontSize: 10,
//    fontWeight: 'bold',
//     color: '#e07117',
//     textAlign: 'right',
    
//   },

//   tableHeaderCells: {
//     flex: 2,
//     padding: 10,
//     fontSize: 10,
//     fontWeight: 'bold',
//     backgroundColor: '#fafafa',
//     borderRightWidth: 1,
//     borderRightColor: '#e2e2e2',
//   },
//    tableHeaderCell: {
//     flex: 1,
//     padding: 10,
//     fontSize: 10,
//     fontWeight: 'bold',
//     backgroundColor: '#fafafa',
//     borderRightWidth: 1,
//     borderRightColor: '#e2e2e2',
//   },
//   // BADGE
//   badge: {
//     backgroundColor: '#ff7a1a',
//     color: '#ffffff',
//     paddingTop: 5,
//     paddingBottom: 5,
//     paddingLeft: 12,
//     paddingRight: 12,
//     borderRadius: 30,
//     fontSize: 10,
//     fontWeight: 700,
//     marginBottom: 8,
//     alignSelf: 'flex-start',
//   },
//   // PARTIES TABLE
//   partiesTable: {
//     width: '100%',
//   },
//   partiesRow: {
//     flexDirection: 'row',
//   },
//   partiesCell: {
//     flex: 1,
//     padding: 10,
//   },
//   partyText: {
//     fontSize: 10,
//     marginBottom: 4,
//     lineHeight: 1.5,
//     color: '#434343',
//   },
//   partyTextBold: {
//     fontSize: 10,
//     marginBottom: 4,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   // PAYMENT TABLE
//   paymentTable: {
//     width: '100%',
//   },
//   paymentRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e2e2e2',
//   },
//   paymentLabel: {
//     flex: 1,
//     padding: 10,
//     fontSize: 10,
//     fontWeight: 'bold',
//     borderRightWidth: 1,
//     borderRightColor: '#e2e2e2',
//   },
//   paymentValue: {
//     flex: 1,
//     padding: 10,
//     fontSize: 10,
//   },
//   // TERMS
//   termsList: {
//     paddingLeft: 18,
//   },
//   termItem: {
//     fontSize: 10,
//     marginBottom: 10,
//     lineHeight: 1.5,
//     color: '#434343',
//   },
//   // SIGNATURES
//   signatures: {
//     flexDirection: 'row',
//     marginTop: 15,
//     gap: 20,
//   },
//   sigBox: {
//     width: '48%',
//     borderWidth: 1,
//     borderColor: '#dddddd',
//     borderRadius: 16,
//     padding: 22,
//     backgroundColor: '#ffffff',
//   },
//   sigIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: 'rgba(255, 122, 26, 0.12)',
//     marginBottom: 10,
//     fontSize: 20,
//     color: '#bf5000',
//     textAlign: 'center',
//     // lineHeight: 42,
//   },
//   sigTitle: {
//     fontSize: 14,
//     fontWeight: 700,
//     marginBottom: 4,
//   },
//   sigSub: {
//     fontSize: 11,
//     color: '#777777',
//     marginBottom: 55,
//   },
//   sigLine: {
//     borderTopWidth: 2,
//     borderTopColor: '#111111',
//     paddingTop: 8,
//     fontSize: 11,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   logoImage: {
//     width: 200,
//     height: 60,
//     marginLeft: -25,
//     objectFit: 'contain',
//   },
//   // FOOTER
//   footers: {
//     marginTop: 30,
//     textAlign: 'center',
//     fontSize: 10,
//     color: '#888888',
//     borderTopWidth: 1,
//     borderTopColor: '#dddddd',
//     paddingTop: 12,
//   },

//   // FOOTER - Matching the image exactly
//   footer: {
//     marginTop: 30,
//     borderTopWidth: 1,
//     borderTopColor: '#dddddd',
//     paddingTop: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   footerLeft: {
//     flex: 1,
//   },
//   footerCenter: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   footerRight: {
//     flex: 1,
//     alignItems: 'flex-end',
//   },
//   footerText: {
//     fontSize: 9,
//     color: '#666666',
//     marginBottom: 4,
//   },
//   footerLink: {
//     fontSize: 9,
//     color: '#ff7a1a',
//     marginBottom: 4,
//   },
//   footerBold: {
//     fontSize: 9,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 4,
//   },
//   footerSocial: {
//     fontSize: 9,
//     color: '#ff7a1a',
//     marginBottom: 4,
//   },
//   footerBottom: {
//     marginTop: 12,
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#eeeeee',
//     textAlign: 'center',
//     fontSize: 8,
//     color: '#999999',
//   },
// });

// // Lease Agreement PDF Component with props
// export const LeaseAgreementPDF = ({ leaseData }: { leaseData: any }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <View>
//           <Image src="/assets/logo.png" style={styles.logoImage} />
//           <Text style={styles.companyName}>AUTO LOUNGE W.L.L {leaseData.type}</Text>
//           <Text style={styles.tagline}>BUY | SELL | LEASE</Text>
//         </View>
//         <View style={styles.documentBox}>
//           <Text style={styles.documentTitle}>INVOICE</Text>
//           <Text style={styles.documentRef}>Ref: {leaseData.agreementRef || 'REF' + Math.floor(100000 + Math.random() * 900000)}</Text>
//           <Text style={styles.documentDate}>Date: {leaseData.currentDate || new Date().toLocaleDateString()}</Text>
         
//             <Text style={styles.documentDate}>Invoice Ref: {leaseData.ref }</Text>
          
//         </View>
//       </View>

//       {/* PARTIES INFORMATION - Using Table Structure */}
//       <View style={styles.section}>
//         <View style={styles.sectionTitle}>
//           <Text>Parties Information</Text>
//         </View>
//         <View style={styles.sectionContent}>
//           <View style={styles.partiesTable}>
//             <View style={styles.partiesRow}>
//               <View style={styles.partiesCell}>
//                 <Text style={styles.badge}>BILLED FROM</Text>
//                 <Text style={styles.partyTextBold}>Auto Lounge W.L.L</Text>
//                 <Text style={styles.partyText}>CR No: 176932-1</Text>
//                 {/* <Text style={styles.partyText}>Contact: +973 39150003</Text> */}
             
//                 {/* <Text style={styles.partyText}>Bahrain</Text> */}
                
//               </View>
//               <View style={styles.partiesCell}>
//                 <Text style={styles.badge}>BILLED TO</Text>
//                 <Text style={styles.partyTextBold}>{leaseData.purchaserName}</Text>
//                 <Text style={styles.partyText}>CPR No: {leaseData.purchaserCpr}</Text>
//                 {/* <Text style={styles.partyText}>Contact: {leaseData.lesseeContact}</Text> */}
//                 {/* <Text style={styles.partyText}>Bahrain</Text> */}
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* VEHICLE DETAILS - HTML Table Structure */}
//       <View style={styles.section}>
//         <View style={styles.sectionTitle}>
//           <Text>Vehicle Details</Text>
//         </View>
//         <View style={styles.sectionContent}>
//           <View style={styles.table}>
//             {/* Table Header */}
//             <View style={styles.tableRow}>
//               <Text style={styles.tableHeaderCells}>Description</Text>
//               <Text style={styles.tableHeaderCell}>Quantity</Text>
//               <Text style={styles.tableHeaderCell}>Amount</Text>
//               {/* <Text style={styles.tableHeaderCell}>VIN / Plate</Text> */}
//             </View>
//             {/* Table Row */}
//             <View style={styles.tableRow}>
//               <Text style={styles.tableCells}>{leaseData.vehicleModel}</Text>
//               <Text style={styles.tableCell}>{leaseData.vehicleYear}</Text>
//               <Text style={styles.tableCell}>{leaseData.sellingPrice}</Text>
//               {/* <Text style={styles.tableCell}>{leaseData.vehicleVin}</Text> */}
//             </View>
//           </View>
//         </View>
//         <Text style={styles.tableCellss}> Total Invoice Value: {leaseData.sellingPrice} BHD</Text>
//       </View>

//       {/* RENTAL DETAILS - Payment Table Structure */}
//       <View style={styles.section}>
//         <View style={styles.sectionTitle}>
//           <Text>Payment Summary</Text>
//         </View>
//         <View style={styles.sectionContent}>
//                   <View style={styles.paymentTable}>
//                     <View style={styles.paymentRow}>
//                       <Text style={styles.paymentLabel}>Total Price</Text>
//                       <Text style={styles.paymentValue}>{leaseData.sellingPrice} BHD</Text>
//                     </View>
//                     {/* <View style={styles.paymentRow}>
//                       <Text style={styles.paymentLabel}>Payment Type</Text>
//                       <Text style={styles.paymentValue}>{leaseData.paymentType}</Text>
//                     </View> */}
//                     <View style={styles.paymentRow}>
//                       <Text style={styles.paymentLabel}>Down Payment Received</Text>
//                       <Text style={styles.paymentValue}>{leaseData.downPayment} BHD</Text>
//                     </View>
//                     <View style={styles.paymentRow}>
//                       <Text style={styles.paymentLabel}>Remaining Balance</Text>
//                       <Text style={styles.paymentValue}>{leaseData.remainingAmount} BHD</Text>
//                     </View>
//                     {/* <View style={styles.paymentRow}>
//                       <Text style={styles.paymentLabel}>Installment Plan</Text>
//                       <Text style={styles.paymentValue}>{leaseData.installmentPlan}</Text>
//                     </View> */}
//                     <View style={styles.paymentRow}>
//                       <Text style={styles.paymentLabel}>Status</Text>
//                       <Text style={styles.paymentValue}>{leaseData.status}</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>

//       <View style={styles.footer}>
//         <View style={styles.footerLeft}>
//           <Text style={styles.footerSocial}>@Autoloungebh</Text>
//           <Text style={styles.footerText}>operations@autolounge.com</Text>
//         </View>
        
//         <View style={styles.footerCenter}>
//           <Text style={styles.footerLink}>www.autolounge.com.bh</Text>
//           <Text style={styles.footerText}>+973 3951 0003</Text>
//         </View>
        
//         <View style={styles.footerRight}>
//           <Text style={styles.footerBold}>CR 176932-1</Text>
//         </View>
//       </View>

//       {/* FOOTER */}
//       <View style={styles.footers}>
//         <Text>AUTO LOUNGE W.L.L • INSTALLMENT INVOICE • BAHRAIN</Text>
//       </View>
//     </Page>
//   </Document>
// );

// // Helper function to download PDF directly
// export const downloadSaleInvoicePDF = async (leaseData: any) => {
//   const { pdf } = await import('@react-pdf/renderer');
//   try {
//     const blob = await pdf(<LeaseAgreementPDF leaseData={leaseData} />).toBlob();
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `sale_invoice_${Date.now()}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//     return true;
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     throw error;
//   }
// };

// export function DocumentCenter() {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Lease Agreement</h1>
//             <p className="text-gray-600 mt-1">Generate professional lease agreements</p>
//           </div>
//           <div className="flex gap-2">
//             <Button 
//               style={{backgroundColor:"white", color:"black"}} 
//               variant="outline" 
//               onClick={() => setIsPreviewOpen(!isPreviewOpen)}
//             >
//               <Eye className="h-4 w-4 mr-2" />
//               {isPreviewOpen ? 'Hide Preview' : 'Show Preview'}
//             </Button>
            
//             <PDFDownloadLink
//               document={<LeaseAgreementPDF leaseData={staticLeaseData} />}
//               fileName={`lease_agreement_${staticLeaseData.agreementRef}.pdf`}
//             >
//               {({ loading }) => (
//                 <Button 
//                   className="bg-blue-600 text-white hover:bg-blue-700"
//                   disabled={loading}
//                 >
//                   <Download className="h-4 w-4 mr-2" />
//                   {loading ? 'Generating...' : 'Download PDF'}
//                 </Button>
//               )}
//             </PDFDownloadLink>
//           </div>
//         </div>

//         {/* Lease Details Card */}
//         <Card className="bg-white border border-gray-200 shadow-lg">
//           <CardHeader className="border-b border-gray-200">
//             <CardTitle className="text-xl font-semibold text-gray-900">Lease Agreement Summary</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-3">Lessee Information</h3>
//                 <div className="space-y-2 text-sm">
//                   <p><span className="text-gray-600">Name:</span> {staticLeaseData.lesseeName}</p>
//                   <p><span className="text-gray-600">CPR No:</span> {staticLeaseData.lesseeCpr}</p>
//                   <p><span className="text-gray-600">Contact:</span> {staticLeaseData.lesseeContact}</p>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-3">Vehicle Details</h3>
//                 <div className="space-y-2 text-sm">
//                   <p><span className="text-gray-600">Make/Model:</span> {staticLeaseData.vehicleModel}</p>
//                   <p><span className="text-gray-600">Year:</span> {staticLeaseData.vehicleYear}</p>
//                   <p><span className="text-gray-600">Color:</span> {staticLeaseData.vehicleColor}</p>
//                   <p><span className="text-gray-600">VIN/Plate:</span> {staticLeaseData.vehicleVin}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 pt-4 border-t border-gray-200">
//               <h3 className="font-semibold text-gray-900 mb-3">Rental Summary</h3>
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 <div>
//                   <p className="text-xs text-gray-600">Monthly Rent</p>
//                   <p className="text-lg font-bold text-blue-600">{staticLeaseData.monthlyRent} BHD</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600">Security Deposit</p>
//                   <p className="text-lg font-bold text-blue-600">{staticLeaseData.securityDeposit} BHD</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600">Duration</p>
//                   <p className="font-semibold">{staticLeaseData.leaseDuration}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600">Payment Cycle</p>
//                   <p className="font-semibold">{staticLeaseData.paymentCycle}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600">Status</p>
//                   <p className="font-semibold text-green-600">{staticLeaseData.paymentStatus}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <p className="text-xs text-gray-500">
//                 Reference: {staticLeaseData.agreementRef} | Issue Date: {staticLeaseData.currentDate}
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* PDF Preview */}
//         {isPreviewOpen && (
//           <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
//             <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">Lease Agreement Preview</h3>
//               <p className="text-sm text-gray-600">This is exactly how your PDF will look</p>
//             </div>
//             <div style={{ height: '800px', width: '100%' }}>
//               <PDFViewer width="100%" height="100%" showToolbar={true}>
//                 <LeaseAgreementPDF leaseData={staticLeaseData} />
//               </PDFViewer>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, Image } from '@react-pdf/renderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { useState } from 'react';

// Types for Lease Data
export interface LeaseData {
  agreementRef?: string;
  currentDate?: string;
  lesseeName: string;
  lesseeCpr: string;
  lesseeContact: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehicleVin: string;
  monthlyRent: number;
  securityDeposit: number;
  leaseDuration: string;
  paymentCycle: 'Monthly' | 'Weekly';
  paymentStatus: 'Active' | 'Pending' | 'Overdue';
  startDate?: string;
  endDate?: string;
  paymentType?: 'Full Payment' | 'Installment'; // Updated to 'Full Payment' and 'Installment'
  sellingPrice?: number;
  downPayment?: number;
  remainingAmount?: number;
  status?: string;
  purchaserName?: string;
  purchaserCpr?: string;
  ref?: string;
  type?: string;
  numberOfInstallments?: number;
  installmentAmount?: number;
}

// Helper function to get next month's date
const getNextMonthDate = (currentDateStr?: string) => {
  let currentDate;
  
  if (currentDateStr) {
    const [day, month, year] = currentDateStr.split('-').map(Number);
    currentDate = new Date(year, month - 1, day);
  } else {
    currentDate = new Date();
  }
  
  // Validate date
  if (isNaN(currentDate.getTime())) {
    currentDate = new Date();
  }
  
  // Move to next month
  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(currentDate.getMonth() + 1);
  
  // Format as DD-MM-YYYY
  return `${String(nextMonthDate.getDate()).padStart(2, '0')}-${String(nextMonthDate.getMonth() + 1).padStart(2, '0')}-${nextMonthDate.getFullYear()}`;
};

// Helper function to generate installment schedule
const generateInstallmentSchedule = (startDate: string, numberOfInstallments: number, amountPerInstallment: number) => {
  const schedule = [];
  
  // Parse the start date
  const [day, month, year] = startDate.split('-').map(Number);
  const startDateObj = new Date(year, month - 1, day);
  
  // Validate date
  if (isNaN(startDateObj.getTime())) {
    console.error('Invalid start date:', startDate);
    return schedule;
  }
  
  for (let i = 0; i < numberOfInstallments; i++) {
    const installmentDate = new Date(startDateObj);
    installmentDate.setMonth(startDateObj.getMonth() + i);
    
    schedule.push({
      month: `Month ${i + 1}`,
      dueDate: `${String(installmentDate.getDate()).padStart(2, '0')}-${String(installmentDate.getMonth() + 1).padStart(2, '0')}-${installmentDate.getFullYear()}`,
      amount: amountPerInstallment,
      status: 'Pending'
    });
  }
  
  return schedule;
};

// PDF Styles
const styles = StyleSheet.create({
  page: {
    paddingLeft: 10,
    paddingRight: 10,
    // paddingTop: 42,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#1f1f1f',
    borderRadius: 18,
    padding: 28,
    marginTop: 10,
    marginBottom: 16,
    position: 'relative',
  },
  logo: {
    fontSize: 52,
    fontWeight: 900,
    color: '#ffffff',
    marginBottom: 4,
  },
  logoOrange: {
    color: '#ff7a1a',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 10,
    color: '#bbbbbb',
    letterSpacing: 4,
  },
  documentBox: {
    position: 'absolute',
    right: 28,
    top: 30,
    textAlign: 'right',
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff7a1a',
    marginBottom: 4,
  },
  documentRef: {
    fontSize: 10,
    color: '#ffffff',
    marginBottom: 2,
  },
  documentDate: {
    fontSize: 10,
    color: '#ffffff',
  },
  section1: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 14,
    marginTop: 13,
    overflow: 'hidden',
    paddingTop: 5,
  },
  section2: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 14,
    marginTop: 13,
    overflow: 'hidden',
    paddingTop: 5,
  },
  section3: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 14,
    marginTop: 13,
    overflow: 'hidden',
    paddingTop: 5,
  },

   sections: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 14,
    marginTop: 28,
    overflow: 'hidden',
    paddingTop: 5,
  },
  sectionTitle: {
    backgroundColor: '#111111',
    color: '#ffffff',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18,
    fontSize: 13,
    fontWeight: 700,
    borderLeftWidth: 6,
    borderLeftColor: '#ff7a1a',
    textTransform: 'uppercase',
  },
  sectionContent: {
    padding: 18,
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: '#e2e2e2',
    color: '#434343',
  },
  tableCells: {
    flex: 2,
    padding: 10,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: '#e2e2e2',
    color: '#434343',
    textAlign: 'left',
  },
  tableCellss: {
    paddingTop: 1,
    paddingBottom: 10,
    paddingRight: 20,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#e07117',
    textAlign: 'right',
  },
  tableHeaderCells: {
    flex: 2,
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#fafafa',
    borderRightWidth: 1,
    borderRightColor: '#e2e2e2',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#fafafa',
    borderRightWidth: 1,
    borderRightColor: '#e2e2e2',
  },
  installmentTable: {
    width: '100%',
    marginTop: 0,
  },
  installmentHeaderCell: {
    flex: 1,
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#fafafa',
    textAlign: 'center',
  },
  installmentCell: {
    flex: 1,
    padding: 10,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: '#e2e2e2',
    color: '#434343',
    textAlign: 'center',
  },
  statusPending: {
    color: '#e07117',
    fontWeight: 'bold',
  },

  statusPaid:{
     color: '#87f007',
    fontWeight: 'bold',

  },
  badge: {
    backgroundColor: '#ff7a1a',
    color: '#ffffff',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 30,
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  partiesTable: {
    width: '100%',
  },
  partiesRow: {
    flexDirection: 'row',
  },
  partiesCell: {
    flex: 1,
    padding: 10,
  },
  partyText: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.5,
    color: '#434343',
  },
  partyTextBold: {
    fontSize: 10,
    marginBottom: 4,
    fontWeight: 'bold',
    marginTop: 8,
  },
  paymentTable: {
    width: '100%',
  },
  paymentRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  paymentLabel: {
    flex: 1,
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
    borderRightWidth: 1,
    borderRightColor: '#e2e2e2',
  },
  paymentValue: {
    flex: 1,
    padding: 10,
    fontSize: 10,
  },
   footerContainer: {
  position: 'absolute',
  bottom: 55,
  left: 50,
  right: 50,
  marginBottom:10,

  borderTopWidth: 1,
  borderTopColor: '#6e6e6e',

  paddingTop: 18,

  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
},

footerColumn: {
  flexDirection: 'column',
  gap: 14,
},

footerItem: {
  flexDirection: 'row',
  alignItems: 'center',
},

footerIcon: {
  width: 22,
  height: 22,
  marginRight: 12,
  objectFit: 'contain',
},

footerText: {
  fontSize: 11,
  color: '#4a4a4a',
  fontWeight: 500,
},

/* Bottom Orange Bar */
bottomOrangeBar: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: 32,
  backgroundColor: '#ff6b00',
},

/* Black Curved Section */
bottomBlackCurve: {
  position: 'absolute',
  bottom: 0,
  right: 0,

  width: 360,
  height: 40,

  backgroundColor: '#000',

  borderTopLeftRadius: 40,

  justifyContent: 'center',
  alignItems: 'flex-end',

  paddingRight: 35,
  paddingTop: 5,
},

/* CR Text */
bottomCRText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

  footers: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#888888',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingTop: 12,
  },
  logoImage: {
    width: 200,
    height: 60,
    marginLeft: -25,
    objectFit: 'contain',
  },
});


const InstallmentScheduleTables = ({ schedule }: { schedule: any[] }) => {
  // Sort installments by due date (lowest to highest)
  const sortedSchedule = [...schedule].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <View style={styles.sections}>
      <View style={styles.sectionTitle}>
        <Text>Installment Schedule</Text>
      </View>
      <View style={styles.sectionContent}>
        <View style={styles.installmentTable}>
          <View style={styles.tableRow}>
            <Text style={styles.installmentHeaderCell}>Installment #</Text>
            <Text style={styles.installmentHeaderCell}>Due Date</Text>
            <Text style={styles.installmentHeaderCell}>Amount</Text>
            <Text style={styles.installmentHeaderCell}>Status</Text>
            <Text style={styles.installmentHeaderCell}>Payment Date</Text>
          </View>
          {sortedSchedule.map((installment, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.installmentCell}>{installment.installmentNumber}</Text>
              <Text style={styles.installmentCell}>
                {new Date(installment.dueDate).toLocaleDateString('en-GB')}
              </Text>
              <Text style={styles.installmentCell}>{installment.amount} BHD</Text>
              <Text style={[
                styles.installmentCell, 
                installment.isPaid ? styles.statusPaid : styles.statusPending
              ]}>
                {installment.isPaid ? 'Paid' : 'Pending'}
              </Text>
              <Text style={styles.installmentCell}>
                {installment.isPaid && installment.paidDate 
                  ? new Date(installment.paidDate).toLocaleDateString('en-GB') 
                  : '-'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const InstallmentScheduleTabless = ({ schedule }: { schedule: any[] }) => {
 

  return (
    <View style={styles.sections}>
      <View style={styles.sectionTitle}>
        <Text>Payment History</Text>
      </View>
      <View style={styles.sectionContent}>
        <View style={styles.installmentTable}>
          <View style={styles.tableRow}>
            <Text style={styles.installmentHeaderCell}>Note: Full payment was payed in Advance.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Installment Schedule Component
const InstallmentScheduleTable = ({ schedule }: { schedule: any[] }) => (
  <View style={styles.sections}>
    <View style={styles.sectionTitle}>
      <Text>Installment Schedule</Text>
    </View>
    <View style={styles.sectionContent}>
      <View style={styles.installmentTable}>
        <View style={styles.tableRow}>
          <Text style={styles.installmentHeaderCell}>Month</Text>
          <Text style={styles.installmentHeaderCell}>Due Date</Text>
          <Text style={styles.installmentHeaderCell}>Amount</Text>
          <Text style={styles.installmentHeaderCell}>Status</Text>
        </View>
        {schedule.map((installment, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.installmentCell}>{installment.month}</Text>
            <Text style={styles.installmentCell}>{installment.dueDate}</Text>
            <Text style={styles.installmentCell}>{installment.amount} BHD</Text>
            <Text style={[styles.installmentCell, styles.statusPending]}>{installment.status}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

// Lease Agreement PDF Component with props
export const LeaseAgreementPDF = ({ leaseData }: { leaseData: any }) => {
  // Get the current date from leaseData or use today's date
  const currentDate = leaseData.currentDate || new Date().toLocaleDateString('en-GB');
  
  // Auto-calculate installment start date from current date (next month)
  const installmentStartDate = getNextMonthDate(currentDate);
  
  // Calculate number of installments (default to 4 if not provided)
  const numberOfInstallments = leaseData.numberOfInstallments || 4;
  
  // Calculate installment amount (auto-calculate if not provided)
  const installmentAmount = leaseData.installmentAmount || Math.ceil(leaseData.remainingAmount / numberOfInstallments);
  
  // Generate installment schedule only for Installment payment type
  const installmentSchedule = leaseData.paymentType === "Installment" && leaseData.remainingAmount > 0
    ? generateInstallmentSchedule(installmentStartDate, numberOfInstallments, installmentAmount)
    : [];

  // Determine invoice title based on payment type
  const invoiceTitle =  "SALE INVOICE";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Image src="/assets/logo.png" style={styles.logoImage} />
            {/* <Text style={styles.companyName}>AUTO LOUNGE W.L.L {leaseData.type}</Text>
            <Text style={styles.tagline}>BUY | SELL | LEASE</Text> */}
          </View>
          <View style={styles.documentBox}>
            <Text style={styles.documentTitle}>{invoiceTitle}</Text>
            <Text style={styles.documentRef}>Ref: {leaseData.agreementRef || 'REF' + Math.floor(100000 + Math.random() * 900000)}</Text>
            <Text style={styles.documentDate}>Date: {currentDate}</Text>
            <Text style={styles.documentDate}>Invoice Ref: {leaseData.ref}</Text>
          </View>
        </View>

        {/* PARTIES INFORMATION */}
        <View style={styles.section1}>
          <View style={styles.sectionTitle}>
            <Text>Parties Information</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.partiesTable}>
              <View style={styles.partiesRow}>
                <View style={styles.partiesCell}>
                  <Text style={styles.badge}>BILLED FROM</Text>
                  <Text style={styles.partyTextBold}>Auto Lounge W.L.L</Text>
                  <Text style={styles.partyText}>CR No: 176932-1</Text>
                </View>
                <View style={styles.partiesCell}>
                  <Text style={styles.badge}>BILLED TO</Text>
                  <Text style={styles.partyTextBold}>{leaseData.purchaserName}</Text>
                  <Text style={styles.partyText}>CPR No: {leaseData.purchaserCpr}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* VEHICLE DETAILS */}
        <View style={styles.section2}>
          <View style={styles.sectionTitle}>
            <Text>Vehicle Details</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeaderCells}>Description</Text>
                <Text style={styles.tableHeaderCell}>Quantity</Text>
                <Text style={styles.tableHeaderCell}>Amount</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCells}>{leaseData.vehicleModel}</Text>
                <Text style={styles.tableCell}>{leaseData.vehicleYear}</Text>
                <Text style={styles.tableCell}>{leaseData.sellingPrice} BHD</Text>
              </View>
            </View>
          </View>
          <Text style={styles.tableCellss}> Total Invoice Value: {leaseData.sellingPrice} BHD</Text>
        </View>

        {/* PAYMENT SUMMARY */}
        <View style={styles.section3}>
          <View style={styles.sectionTitle}>
            <Text>Payment Summary</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.paymentTable}>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Total Price</Text>
                <Text style={styles.paymentValue}>{leaseData.sellingPrice} BHD</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Payment Type</Text>
                <Text style={styles.paymentValue}>{leaseData.paymentType || 'Full Payment'}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Down Payment Received</Text>
                <Text style={styles.paymentValue}>{leaseData.downPayment} BHD</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Remaining Balance</Text>
                <Text style={styles.paymentValue}>{leaseData.remainingAmount} BHD</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Status</Text>
                <Text style={styles.paymentValue}>{leaseData.status}</Text>
              </View>
            </View>
          </View>
        </View>

        {leaseData.paymentType === "Installment" && leaseData?.sale && (
      <InstallmentScheduleTables schedule={leaseData?.sale.installments} />
    )}

     {leaseData.paymentType === "Full"  && (
      <InstallmentScheduleTabless schedule={leaseData} />
    )}

        {/* INSTALLMENT SCHEDULE - Only show if paymentType is "Installment" */}
        {leaseData.paymentType === "Installment" && installmentSchedule.length > 0 && leaseData.isShow && (
          
          <InstallmentScheduleTable schedule={installmentSchedule} />
        )}

        <View style={styles.footerContainer}>
        
          {/* Left Side */}
          <View style={styles.footerColumn}>
        
            <View style={styles.footerItem}>
              <Image src="/assets/ins.png" style={styles.footerIcon} />
              <Text style={styles.footerText}>@AutoLoungebh</Text>
            </View>
        
            <View style={styles.footerItem}>
              <Image src="/assets/net.png" style={styles.footerIcon} />
              <Text style={styles.footerText}>www.autolounge.com.bh</Text>
            </View>
        
          </View>
        
          {/* Right Side */}
          <View style={styles.footerColumn}>
        
            <View style={styles.footerItem}>
              <Image src="/assets/gmail.png" style={styles.footerIcon} />
              <Text style={styles.footerText}>operations@autolounge.com</Text>
            </View>
        
            <View style={styles.footerItem}>
              <Image src="/assets/phone.png" style={styles.footerIcon} />
              <Text style={styles.footerText}>+973 3951 0003</Text>
            </View>
        
          </View>
        
        </View>
        
        {/* Bottom Design */}
        <View style={styles.bottomOrangeBar} />
        
        <View style={styles.bottomBlackCurve}>
          <Text style={styles.bottomCRText}>CR 176932-1</Text>
        </View>
      </Page>
    </Document>
  );
};

// Helper function to download PDF directly
export const downloadSaleInvoicePDF = async (leaseData: any) => {
  const { pdf } = await import('@react-pdf/renderer');
  try {
    const blob = await pdf(<LeaseAgreementPDF leaseData={leaseData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sale_invoice_${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Example data for Full Payment
const fullPaymentData = {
  vehicleModel: 'Toyota Land Cruiser',
  vehicleYear: '2024',
  vehicleColor: 'Pearl White',
  vehicleVin: 'JTEXXXXXX1234567',
  paymentType: 'Full Payment',
  sellingPrice: 12000,
  downPayment: 12000,
  remainingAmount: 0,
  status: 'Paid',
  purchaserName: 'Ahmed Khalid Al-Mansoori',
  purchaserCpr: '123456789',
  ref: 'INV-001',
  type: 'SALE',
  currentDate: '14-05-2026'
};

// Example data for Installment
const installmentData = {
  vehicleModel: 'Toyota Land Cruiser',
  vehicleYear: '2024',
  vehicleColor: 'Pearl White',
  vehicleVin: 'JTEXXXXXX1234567',
  paymentType: 'Installment',
  sellingPrice: 12000,
  downPayment: 2000,
  remainingAmount: 10000,
  status: 'Active',
  purchaserName: 'Ahmed Khalid Al-Mansoori',
  purchaserCpr: '123456789',
  ref: 'INV-002',
  type: 'SALE',
  currentDate: '14-05-2026',
  numberOfInstallments: 5, // Optional: defaults to 4
};

export function DocumentCenter() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<'Full Payment' | 'Installment'>('Full Payment');

  const currentSaleData = paymentType === 'Full Payment' ? fullPaymentData : installmentData;

  const getInstallmentScheduleForUI = () => {
    if (paymentType !== 'Installment') return [];
    const startDate = getNextMonthDate(currentSaleData.currentDate);
    const numberOfInstallments = currentSaleData.numberOfInstallments || 4;
    const installmentAmount = Math.ceil(currentSaleData.remainingAmount / numberOfInstallments);
    return generateInstallmentSchedule(startDate, numberOfInstallments, installmentAmount);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sale Invoice</h1>
            <p className="text-gray-600 mt-1">Generate professional sale invoices</p>
          </div>
          <div className="flex gap-2">
            {/* Payment Type Selector */}
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as 'Full Payment' | 'Installment')}
            >
              <option value="Full Payment">Full Payment</option>
              <option value="Installment">Installment</option>
            </select>
            
            <Button 
              style={{backgroundColor:"white", color:"black"}} 
              variant="outline" 
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewOpen ? 'Hide Preview' : 'Show Preview'}
            </Button>
            
            <PDFDownloadLink
              document={<LeaseAgreementPDF leaseData={currentSaleData} />}
              fileName={`sale_invoice_${currentSaleData.ref}.pdf`}
            >
              {({ loading }) => (
                <Button 
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  disabled={loading}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {loading ? 'Generating...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        {/* Sale Details Card */}
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-900">Sale Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Purchaser Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Name:</span> {currentSaleData.purchaserName}</p>
                  <p><span className="text-gray-600">CPR No:</span> {currentSaleData.purchaserCpr}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Vehicle Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Make/Model:</span> {currentSaleData.vehicleModel}</p>
                  <p><span className="text-gray-600">Year:</span> {currentSaleData.vehicleYear}</p>
                  <p><span className="text-gray-600">Color:</span> {currentSaleData.vehicleColor}</p>
                  <p><span className="text-gray-600">VIN/Plate:</span> {currentSaleData.vehicleVin}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Total Price</p>
                  <p className="text-lg font-bold text-blue-600">{currentSaleData.sellingPrice} BHD</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Payment Type</p>
                  <p className="font-semibold">{currentSaleData.paymentType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Down Payment</p>
                  <p className="font-semibold">{currentSaleData.downPayment} BHD</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Remaining Balance</p>
                  <p className={`font-semibold ${currentSaleData.remainingAmount === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                    {currentSaleData.remainingAmount} BHD
                  </p>
                </div>
              </div>
            </div>

            {/* Installment Schedule Display in UI - Only for Installment */}
            {paymentType === 'Installment' && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Installment Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Month</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Due Date</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Amount</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getInstallmentScheduleForUI().map((installment, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2 text-sm text-gray-700">{installment.month}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{installment.dueDate}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{installment.amount} BHD</td>
                          <td className="px-4 py-2 text-sm text-orange-600 font-medium">{installment.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * First installment starts from: {getNextMonthDate(currentSaleData.currentDate)}
                </p>
              </div>
            )}

            {/* Full Payment Message */}
            {paymentType === 'Full Payment' && currentSaleData.remainingAmount === 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 font-medium text-sm">
                    ✓ Full payment received. No installments required.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Reference: {currentSaleData.ref} | Issue Date: {currentSaleData.currentDate}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* PDF Preview */}
        {isPreviewOpen && (
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Sale Invoice Preview</h3>
              <p className="text-sm text-gray-600">This is exactly how your PDF will look</p>
            </div>
            <div style={{ height: '800px', width: '100%' }}>
              <PDFViewer width="100%" height="100%" showToolbar={true}>
                <LeaseAgreementPDF leaseData={currentSaleData} />
              </PDFViewer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
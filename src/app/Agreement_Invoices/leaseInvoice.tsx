// import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer, Image  } from '@react-pdf/renderer';
// import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
// import { Button } from '@/app/components/ui/button';
// import { Download, Eye } from 'lucide-react';
// import { useState } from 'react';

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
//     padding: 32,
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
//     marginBottom: 18,
//     overflow: 'hidden',
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
//      color: '#434343',
//   },
//   tableHeaderCell: {
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
//      color: '#434343',
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
//     lineHeight: 42,
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

// // Lease Agreement PDF Component with proper table structure
// const LeaseAgreementPDF = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <View>
          
//           <Image  src="/assets/logo.png" style={styles.logoImage} />
//           {/* <Text style={styles.logo}>
//             A<Text style={styles.logoOrange}>L</Text>
//           </Text> */}
//           <Text style={styles.companyName}>AUTO LOUNGE W.L.L</Text>
//           <Text style={styles.tagline}>BUY | SELL | LEASE</Text>
//         </View>
//         <View style={styles.documentBox}>
//           <Text style={styles.documentTitle}>LEASE AGREEMENT</Text>
//           <Text style={styles.documentRef}>Ref: {'ref' + Math.floor(100000 + Math.random() * 900000)}</Text>
//           <Text style={styles.documentDate}>Date: {new Date().toLocaleDateString()}</Text>
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
//                 <Text style={styles.badge}>LESSOR (OWNER)</Text>
//                 <Text style={styles.partyTextBold}>Auto Lounge W.L.L</Text>
//                 <Text style={styles.partyText}>CR No: 176932-1</Text>
//                 <Text style={styles.partyText}>Contact: +973 39150003</Text>
//                 <Text style={styles.partyText}>Bahrain</Text>
//               </View>
//               <View style={styles.partiesCell}>
//                 <Text style={styles.badge}>LESSEE (CUSTOMER)</Text>
//                 <Text style={styles.partyTextBold}>{staticLeaseData.lesseeName}</Text>
//                 <Text style={styles.partyText}>CPR No: {staticLeaseData.lesseeCpr}</Text>
//                 <Text style={styles.partyText}>Contact: {staticLeaseData.lesseeContact}</Text>
//                 <Text style={styles.partyText}>Bahrain</Text>
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
//               <Text style={styles.tableHeaderCell}>Make / Model</Text>
//               <Text style={styles.tableHeaderCell}>Year</Text>
//               <Text style={styles.tableHeaderCell}>Color</Text>
//               <Text style={styles.tableHeaderCell}>VIN / Plate</Text>
//             </View>
//             {/* Table Row */}
//             <View style={styles.tableRow}>
//               <Text style={styles.tableCell}>{staticLeaseData.vehicleModel}</Text>
//               <Text style={styles.tableCell}>{staticLeaseData.vehicleYear}</Text>
//               <Text style={styles.tableCell}>{staticLeaseData.vehicleColor}</Text>
//               <Text style={styles.tableCell}>{staticLeaseData.vehicleVin}</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* RENTAL DETAILS - Payment Table Structure */}
//       <View style={styles.section}>
//         <View style={styles.sectionTitle}>
//           <Text>Rental Details</Text>
//         </View>
//         <View style={styles.sectionContent}>
//           <View style={styles.paymentTable}>
//             <View style={styles.paymentRow}>
//               <Text style={styles.paymentLabel}>Monthly Rent</Text>
//               <Text style={styles.paymentValue}>{staticLeaseData.monthlyRent} BHD</Text>
//             </View>
//             <View style={styles.paymentRow}>
//               <Text style={styles.paymentLabel}>Security Deposit</Text>
//               <Text style={styles.paymentValue}>{staticLeaseData.securityDeposit} BHD</Text>
//             </View>
//             <View style={styles.paymentRow}>
//               <Text style={styles.paymentLabel}>Lease Duration</Text>
//               <Text style={styles.paymentValue}>{staticLeaseData.leaseDuration}</Text>
//             </View>
//             <View style={styles.paymentRow}>
//               <Text style={styles.paymentLabel}>Payment Cycle</Text>
//               <Text style={styles.paymentValue}>{staticLeaseData.paymentCycle}</Text>
//             </View>
//             <View style={styles.paymentRow}>
//               <Text style={styles.paymentLabel}>Payment Status</Text>
//               <Text style={styles.paymentValue}>{staticLeaseData.paymentStatus}</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* TERMS & CONDITIONS */}
//       <View style={styles.section}>
//         <View style={styles.sectionTitle}>
//           <Text>Terms &amp; Conditions</Text>
//         </View>
//         <View style={styles.sectionContent}>
//           <View style={styles.termsList}>
//             <Text style={styles.termItem}>1. This Lease Agreement is legally binding upon signature by both parties.</Text>
//             <Text style={styles.termItem}>2. The vehicle remains the full property of the Lessor at all times during the lease period.</Text>
//             <Text style={styles.termItem}>3. The Lessee shall use the vehicle responsibly and shall not transfer, sublease, or sell the vehicle.</Text>
//             <Text style={styles.termItem}>4. All maintenance and traffic violations during the lease period are the responsibility of the Lessee unless otherwise agreed.</Text>
//             <Text style={styles.termItem}>5. In case of non-payment or breach of contract, the Lessor reserves the right to immediately repossess the vehicle in accordance with applicable laws of the Kingdom of Bahrain.</Text>
//             <Text style={styles.termItem}>6. The vehicle must be returned in the same condition, subject to normal wear and tear, at the end of the lease term.</Text>
//             <Text style={styles.termItem}>7. Any extension or modification must be agreed in writing by both parties.</Text>
//           </View>
//         </View>
//       </View>

//       {/* SIGNATURES */}
//       <View style={styles.signatures}>
//         <View style={styles.sigBox}>
//           <Text style={styles.sigIcon}>✓</Text>
//           <Text style={styles.sigTitle}>Lessor Authorization</Text>
//           <Text style={styles.sigSub}>Auto Lounge W.L.L Representative</Text>
//           <View style={styles.sigLine}>
//             <Text>Signature</Text>
//             <Text>Date</Text>
//           </View>
//         </View>
//         <View style={styles.sigBox}>
//           <Text style={styles.sigIcon}>✦</Text>
//           <Text style={styles.sigTitle}>Lessee Acceptance</Text>
//           <Text style={styles.sigSub}>Customer Acknowledgment</Text>
//           <View style={styles.sigLine}>
//             <Text>Signature</Text>
//             <Text>Date</Text>
//           </View>
//         </View>
//       </View>

//        <View style={styles.footer}>
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
//         <Text>AUTO LOUNGE W.L.L • LEASE AGREEMENT • BAHRAIN</Text>
//       </View>
//     </Page>
//   </Document>
// );

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
//               document={<LeaseAgreementPDF />}
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
//                 <LeaseAgreementPDF />
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
}

// Static Lease Data
const staticLeaseData = {
  agreementRef: 'LA-0001',
  currentDate: '14-05-2026',
  lesseeName: 'Ahmed Khalid Al-Mansoori',
  lesseeCpr: '123456789',
  lesseeContact: '+973 39876543',
  vehicleModel: 'Toyota Land Cruiser',
  vehicleYear: '2024',
  vehicleColor: 'Pearl White',
  vehicleVin: 'JTEXXXXXX1234567',
  monthlyRent: 450,
  securityDeposit: 900,
  leaseDuration: '12 Months',
  paymentCycle: 'Monthly',
  paymentStatus: 'Active'
};

// PDF Styles - Exactly matching HTML/CSS table structure
const styles = StyleSheet.create({
  page: {
    paddingLeft: 32,
    paddingRight: 32,
    // paddingTop: 42,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  // HEADER
  header: {
    backgroundColor: '#1f1f1f',
    borderRadius: 18,
    padding: 28,
    marginTop: 42,
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
  // SECTION
  section: {
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
    marginTop: 45,
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
  // TABLE STYLES
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
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#fafafa',
    borderRightWidth: 1,
    borderRightColor: '#e2e2e2',
  },
  // BADGE
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
  // PARTIES TABLE
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
  // PAYMENT TABLE
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
  // TERMS
  termsList: {
    paddingLeft: 18,
  },
  termItem: {
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 1.5,
    color: '#434343',
  },
  // SIGNATURES
  signatures: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
  },
  sigBox: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 16,
    padding: 22,
    backgroundColor: '#ffffff',
  },
  sigIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 122, 26, 0.12)',
    marginBottom: 10,
    fontSize: 20,
    color: '#bf5000',
    textAlign: 'center',
    // lineHeight: 42,
  },
  sigTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 4,
  },
  sigSub: {
    fontSize: 11,
    color: '#777777',
    marginBottom: 55,
  },
  sigLine: {
    borderTopWidth: 2,
    borderTopColor: '#111111',
    paddingTop: 8,
    fontSize: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoImage: {
    width: 200,
    height: 60,
    marginLeft: -25,
    objectFit: 'contain',
  },
  // FOOTER
  footers: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#888888',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingTop: 12,
  },

  // FOOTER - Matching the image exactly
 footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flex: 1,
  },
  footerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  footerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  footerText: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 4,
  },
  footerLink: {
    fontSize: 9,
    color: '#ff7a1a',
    marginBottom: 4,
  },
  footerBold: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  footerSocial: {
    fontSize: 9,
    color: '#ff7a1a',
    marginBottom: 4,
  },
  footerBottom: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    textAlign: 'center',
    fontSize: 8,
    color: '#999999',
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
});

// Lease Agreement PDF Component with props
export const LeaseAgreementPDF = ({ leaseData }: { leaseData: any }) => (
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
          <Text style={styles.documentTitle}>LEASE INVOICE</Text>
          <Text style={styles.documentRef}>Ref: {leaseData.agreementRef || 'REF' + Math.floor(100000 + Math.random() * 900000)}</Text>
          <Text style={styles.documentDate}>Date: {leaseData.currentDate || new Date().toLocaleDateString()}</Text>
         
            <Text style={styles.documentDate}>Invoice Ref: {leaseData.ref }</Text>
          
        </View>
      </View>

      {/* PARTIES INFORMATION - Using Table Structure */}
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text>Parties Information</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.partiesTable}>
            <View style={styles.partiesRow}>
              <View style={styles.partiesCell}>
                <Text style={styles.badge}>LESSOR</Text>
                <Text style={styles.partyTextBold}>Auto Lounge W.L.L</Text>
                <Text style={styles.partyText}>CR No: 176932-1</Text>
                <Text style={styles.partyText}>Contact: +973 39150003</Text>
             
                {/* <Text style={styles.partyText}>Bahrain</Text> */}
                
              </View>
              <View style={styles.partiesCell}>
                <Text style={styles.badge}>LESSEE</Text>
                <Text style={styles.partyTextBold}>{leaseData.lesseeName}</Text>
                <Text style={styles.partyText}>CPR No: {leaseData.lesseeCpr}</Text>
                <Text style={styles.partyText}>Contact: {leaseData.lesseeContact}</Text>
                {/* <Text style={styles.partyText}>Bahrain</Text> */}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* VEHICLE DETAILS - HTML Table Structure */}
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text>Vehicle Details</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text style={styles.tableHeaderCell}>Make / Model</Text>
              <Text style={styles.tableHeaderCell}>Year</Text>
              <Text style={styles.tableHeaderCell}>Color</Text>
              <Text style={styles.tableHeaderCell}>VIN / Plate</Text>
            </View>
            {/* Table Row */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{leaseData.vehicleModel}</Text>
              <Text style={styles.tableCell}>{leaseData.vehicleYear}</Text>
              <Text style={styles.tableCell}>{leaseData.vehicleColor}</Text>
              <Text style={styles.tableCell}>{leaseData.vehicleVin}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* RENTAL DETAILS - Payment Table Structure */}
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text>Lease Billing Details</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.paymentTable}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Rental Period</Text>
              <Text style={styles.paymentValue}>
                {leaseData.period} {leaseData.leaseTyp === "Daily" ? "Days" : "Months"}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>{leaseData.paymentCycle}</Text>
              <Text style={styles.paymentValue}>{leaseData.monthlyRent} BHD</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Security Deposit</Text>
              <Text style={styles.paymentValue}>{leaseData.securityDeposit} BHD</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Late Fee (if applicable)</Text>
              <Text style={styles.paymentValue}>10 BHD Per Day</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Payment Status</Text>
              <Text style={styles.paymentValue}>{leaseData.paymentStatus}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.tableCellss}>Total Due: {leaseData.period *leaseData.leaseRate} BHD</Text>
      </View>

      {/* TERMS & CONDITIONS */}
      <View style={styles.sections}>
        <View style={styles.sectionTitle}>
          <Text>Terms &amp; Conditions</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.termsList}>
            <Text style={styles.termItem}>1. This invoice is issued for lease rental charges only and does not transfer ownership of the vehicle.</Text>
            <Text style={styles.termItem}>2. Payment must be made on or before the due date mentioned in the lease agreement.</Text>
            <Text style={styles.termItem}>3. Failure to pay on time may result in late fees and/or vehicle repossession.</Text>
            <Text style={styles.termItem}>4. The vehicle must be used only by the registered lessee during the lease period.</Text>
            <Text style={styles.termItem}>5. All terms are subject to the Lease Agreement signed between both parties.</Text>
            {/* <Text style={styles.termItem}>6. The vehicle must be returned in the same condition, subject to normal wear and tear, at the end of the lease term.</Text>
            <Text style={styles.termItem}>7. Any extension or modification must be agreed in writing by both parties.</Text> */}
          </View>
        </View>
      </View>

     
     

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerSocial}>@Autoloungebh</Text>
          <Text style={styles.footerText}>operations@autolounge.com</Text>
        </View>
        
        <View style={styles.footerCenter}>
          <Text style={styles.footerLink}>www.autolounge.com.bh</Text>
          <Text style={styles.footerText}>+973 3951 0003</Text>
        </View>
        
        <View style={styles.footerRight}>
          <Text style={styles.footerBold}>CR 176932-1</Text>
        </View>
      </View>

      {/* FOOTER */}
      {/* <View style={styles.footers}>
        <Text>AUTO LOUNGE W.L.L • LEASE AGREEMENT • BAHRAIN</Text>
      </View> */}
    </Page>
  </Document>
);

// Helper function to download PDF directly
export const downloadLeaseInvoicePDF = async (leaseData: any) => {
  const { pdf } = await import('@react-pdf/renderer');
  try {
    const blob = await pdf(<LeaseAgreementPDF leaseData={leaseData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lease_invoice_${Date.now()}.pdf`;
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

export function DocumentCenter() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lease Agreement</h1>
            <p className="text-gray-600 mt-1">Generate professional lease agreements</p>
          </div>
          <div className="flex gap-2">
            <Button 
              style={{backgroundColor:"white", color:"black"}} 
              variant="outline" 
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewOpen ? 'Hide Preview' : 'Show Preview'}
            </Button>
            
            <PDFDownloadLink
              document={<LeaseAgreementPDF leaseData={staticLeaseData} />}
              fileName={`lease_agreement_${staticLeaseData.agreementRef}.pdf`}
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

        {/* Lease Details Card */}
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-900">Lease Agreement Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Lessee Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Name:</span> {staticLeaseData.lesseeName}</p>
                  <p><span className="text-gray-600">CPR No:</span> {staticLeaseData.lesseeCpr}</p>
                  <p><span className="text-gray-600">Contact:</span> {staticLeaseData.lesseeContact}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Vehicle Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Make/Model:</span> {staticLeaseData.vehicleModel}</p>
                  <p><span className="text-gray-600">Year:</span> {staticLeaseData.vehicleYear}</p>
                  <p><span className="text-gray-600">Color:</span> {staticLeaseData.vehicleColor}</p>
                  <p><span className="text-gray-600">VIN/Plate:</span> {staticLeaseData.vehicleVin}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Rental Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Monthly Rent</p>
                  <p className="text-lg font-bold text-blue-600">{staticLeaseData.monthlyRent} BHD</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Security Deposit</p>
                  <p className="text-lg font-bold text-blue-600">{staticLeaseData.securityDeposit} BHD</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="font-semibold">{staticLeaseData.leaseDuration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Payment Cycle</p>
                  <p className="font-semibold">{staticLeaseData.paymentCycle}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Status</p>
                  <p className="font-semibold text-green-600">{staticLeaseData.paymentStatus}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Reference: {staticLeaseData.agreementRef} | Issue Date: {staticLeaseData.currentDate}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* PDF Preview */}
        {isPreviewOpen && (
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Lease Agreement Preview</h3>
              <p className="text-sm text-gray-600">This is exactly how your PDF will look</p>
            </div>
            <div style={{ height: '800px', width: '100%' }}>
              <PDFViewer width="100%" height="100%" showToolbar={true}>
                <LeaseAgreementPDF leaseData={staticLeaseData} />
              </PDFViewer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
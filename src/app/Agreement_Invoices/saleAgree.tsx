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
    // padding: 32,
    paddingLeft: 10,
    paddingRight: 10,
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
    marginTop: 10,
    marginBottom: 6,
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
    marginBottom: 10,
    overflow: 'hidden',
  },
  sections: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 14,
    marginTop: 20,
    overflow: 'hidden',
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
    borderTopWidth: 1,
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

});

// Lease Agreement PDF Component with props
export const LeaseAgreementPDF = ({ leaseData }: { leaseData: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Image src="/assets/logo.png" style={styles.logoImage} />
          {/* <Text style={styles.companyName}>AUTO LOUNGE W.L.L </Text>
          <Text style={styles.tagline}>BUY | SELL | LEASE</Text> */}
        </View>
        <View style={styles.documentBox}>
          <Text style={styles.documentTitle}>SALE AGREEMENT</Text>
          <Text style={styles.documentRef}>Ref: {leaseData.agreementRef}</Text>
          <Text style={styles.documentDate}>Date: {leaseData.currentDate }</Text>
        
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
                <Text style={styles.badge}>SELLER</Text>
                <Text style={styles.partyTextBold}>Auto Lounge W.L.L</Text>
                <Text style={styles.partyText}>CR No: 176932-1</Text>
                <Text style={styles.partyText}>Contact: +973 39150003</Text>
               <Text style={styles.partyText}>Bahrain</Text>
              </View>
              <View style={styles.partiesCell}>
                <Text style={styles.badge}>BUYER</Text>
                <Text style={styles.partyTextBold}>{leaseData.purchaserName}</Text>
                <Text style={styles.partyText}>CPR No: {leaseData.purchaserCpr}</Text>
                <Text style={styles.partyText}>Contact: {leaseData.purchaserContact}</Text>
                <Text style={styles.partyText}>Bahrain</Text>
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
          <Text>Payment Details</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.paymentTable}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Total Price</Text>
              <Text style={styles.paymentValue}>{leaseData.sellingPrice} BHD</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Payment Type</Text>
              <Text style={styles.paymentValue}>{leaseData.paymentType}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Down Payment</Text>
              <Text style={styles.paymentValue}>{leaseData.downPayment} BHD</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Remaining Balance</Text>
              <Text style={styles.paymentValue}>{leaseData.remainingAmount} BHD</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Installment Plan</Text>
              <Text style={styles.paymentValue}>{leaseData.installmentPlan}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Status</Text>
              <Text style={styles.paymentValue}>{leaseData.status}</Text>
            </View>
          </View>
        </View>
      </View>
      

      {/* TERMS & CONDITIONS */}
      <View style={styles.sections}>
        <View style={styles.sectionTitle}>
          <Text>Terms &amp; Conditions</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.termsList}>
            <Text style={styles.termItem}>1. This Agreement constitutes a legally binding contract between both parties upon signature.</Text>
            <Text style={styles.termItem}>2. The vehicle is sold on an “as-is, where-is” basis unless expressly stated otherwise in writing.</Text>
            <Text style={styles.termItem}>3. Ownership transfer shall only be executed upon full settlement of all agreed payments.</Text>
            <Text style={styles.termItem}>4. The Buyer assumes full responsibility for insurance, registration, and all legal obligations upon handover.</Text>
            <Text style={styles.termItem}>5. In case of default, delay, or non-payment, the Seller reserves the right to take legal recovery action in accordance with applicable laws of the Kingdom of Bahrain.</Text>
            <Text style={styles.termItem}>6. No modification or amendment to this Agreement shall be valid unless signed by both parties.</Text>
            
          </View>
        </View>
      </View>

      {/* SIGNATURES */}
      <View style={styles.signatures}>
        <View style={styles.sigBox}>
          {/* <Text style={styles.sigIcon}>✓</Text> */}
          <Text style={styles.sigTitle}>Seller Authorization</Text>
          <Text style={styles.sigSub}>Auto Lounge W.L.L Representative</Text>
          <View style={styles.sigLine}>
            <Text>Signature</Text>
            <Text>Date</Text>
          </View>
        </View>
        <View style={styles.sigBox}>
          {/* <Text style={styles.sigIcon}>LC</Text> */}
          <Text style={styles.sigTitle}>Purchaser Acceptance</Text>
          <Text style={styles.sigSub}>Customer Acknowledgment</Text>
          <View style={styles.sigLine}>
            <Text>Signature</Text>
            <Text>Date</Text>
          </View>
        </View>
      </View>

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

// Helper function to download PDF directly
export const downloadLeaseAgreementPDFs = async (leaseData: any) => {
  const { pdf } = await import('@react-pdf/renderer');
  try {
    const blob = await pdf(<LeaseAgreementPDF leaseData={leaseData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sale_agreement_${leaseData.agreementRef || Date.now()}.pdf`;
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
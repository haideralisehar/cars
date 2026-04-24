import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  Calendar,
  Eye,
  TrendingDown,
  ArrowRightLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2
} from 'lucide-react';
import { MoneyRecord, mockMoneyRecords } from '@/types/money-record';
import { getMoneyRecords } from '@/app/api/MoneyRecords/getRecord';

interface MoneyRecordsListProps {
  onAddRecord: () => void;
  onViewDetails: (record: MoneyRecord) => void;
  userRole: string;
  initialTab?: string;
}

export function MoneyRecordsList({ onAddRecord, onViewDetails, userRole, initialTab = 'all' }: MoneyRecordsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [records, setRecords] = useState<MoneyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMoneyRecords();
      console.log('API Response:', data);
      
      const transformedRecords = data.map((apiRecord: any) => transformApiRecordToMoneyRecord(apiRecord));
      
      setRecords(transformedRecords);
      console.log('Transformed records:', transformedRecords);
    } catch (err) {
      console.error('Error fetching money records:', err);
      setError('Failed to load money records. Please try again later.');
      setRecords(mockMoneyRecords);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to safely extract string from object or primitive
  const safeExtractString = (value: any): string | null => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      // Try to extract name/title from object
      return value.name || value.title || value.make || value.model || null;
    }
    return String(value);
  };

  // Helper function to safely extract ID
  const safeExtractId = (value: any): string | null => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return value.id || null;
    return null;
  };

  const transformApiRecordToMoneyRecord = (apiRecord: any): MoneyRecord => {
    // Safely extract linked entity information
    let linkedToType: 'Car' | 'Customer' | 'Investor' | 'Company' | 'None' = 'None';
    let linkedToName: string | null = null;
    let linkedToId: string | null = null;

    // Determine the linked entity type and extract name/id safely
    if (apiRecord.car) {
      linkedToType = 'Car';
      linkedToName = safeExtractString(apiRecord.car);
      linkedToId = safeExtractId(apiRecord.car);
    } else if (apiRecord.customer) {
      linkedToType = 'Customer';
      linkedToName = safeExtractString(apiRecord.customer);
      linkedToId = safeExtractId(apiRecord.customer);
    } else if (apiRecord.investor) {
      linkedToType = 'Investor';
      linkedToName = safeExtractString(apiRecord.investor);
      linkedToId = safeExtractId(apiRecord.investor);
    } else if (apiRecord.company) {
      linkedToType = 'Company';
      linkedToName = safeExtractString(apiRecord.company);
      linkedToId = safeExtractId(apiRecord.company);
    } else if (apiRecord.linkType) {
      linkedToType = mapLinkType(apiRecord.linkType);
    }

    return {
      id: apiRecord.id || '',
      title: apiRecord.title || '',
      category: apiRecord.category || '',
      description: apiRecord.description || '',
      isPayable: !!apiRecord.payableAmount,
      isReceivable: !!apiRecord.receivableAmount,
      payableAmount: apiRecord.payableAmount ? Number(apiRecord.payableAmount) : null,
      payableStatus: apiRecord.payableStatus || (apiRecord.payableAmount ? 'Pending' : ''),
      payableDate: apiRecord.payableDate || null,
      payableTo: apiRecord.payableTo || null,
      receivableAmount: apiRecord.receivableAmount ? Number(apiRecord.receivableAmount) : null,
      receivableStatus: apiRecord.receivableStatus || (apiRecord.receivableAmount ? 'Pending' : ''),
      dueDate: apiRecord.dueDate || null,
      receivableFrom: apiRecord.receivableFrom || null,
      linkedToType: linkedToType,
      linkedToName: linkedToName,
      linkedToId: linkedToId,
      receiptPath: apiRecord.receiptPath || null,
      createdAt: apiRecord.createdAt || new Date().toISOString(),
      updatedAt: apiRecord.updatedAt || apiRecord.createdAt || new Date().toISOString()
    };
  };

  const mapLinkType = (linkType: string): 'Car' | 'Customer' | 'Investor' | 'Company' | 'None' => {
    switch (linkType?.toLowerCase()) {
      case 'car':
        return 'Car';
      case 'customer':
        return 'Customer';
      case 'investor':
        return 'Investor';
      case 'company':
        return 'Company';
      default:
        return 'None';
    }
  };

  const isAdmin = userRole === 'Admin' || userRole === 'Super Admin';
  const canMarkStatus = isAdmin;

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.linkedToName && record.linkedToName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (activeTab === 'expenses') {
      return record.isPayable && record.category === 'Expense';
    }
    if (activeTab === 'payables') {
      return record.isPayable;
    }
    if (activeTab === 'receivables') {
      return record.isReceivable;
    }
    
    return true;
  });

  const getRecordIcon = (record: MoneyRecord) => {
    if (record.isPayable && record.isReceivable) return <ArrowRightLeft className="h-4 w-4 text-orange-500" />;
    if (record.isPayable) return <ArrowDownLeft className="h-4 w-4 text-destructive" />;
    if (record.isReceivable) return <ArrowUpRight className="h-4 w-4 text-primary" />;
    return <DollarSign className="h-4 w-4 text-muted-foreground" />;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[700px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading money records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-6 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={fetchRecords} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Money Records</h1>
          <p className="text-muted-foreground mt-1">Single source of truth for all financial transactions</p>
        </div>
        <Button onClick={onAddRecord} className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4 mr-2" />
          Create Money Record
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="all" className="data-[state=active]:bg-secondary">All Records</TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:bg-secondary">Expenses</TabsTrigger>
            <TabsTrigger value="payables" className="data-[state=active]:bg-secondary">Payables</TabsTrigger>
            <TabsTrigger value="receivables" className="data-[state=active]:bg-secondary">Receivables</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search records..." 
                className="pl-10 bg-card border-border h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="border-border h-9">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <Card className="bg-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-secondary/30 border-b border-border">
                  <tr>
                    <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Type</th>
                    <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Title / Category</th>
                    <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Linked Entity</th>
                    <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Payable Status</th>
                    <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Receivable Status</th>
                    <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-secondary/20 transition-colors group">
                        <td className="p-4">
                          <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center border border-border/50">
                            {getRecordIcon(record)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{record.title}</div>
                            <div className="text-[10px] font-bold text-muted-foreground mt-0.5 uppercase tracking-tighter">{record.category}</div>
                            {record.description && (
                              <div className="text-[10px] text-muted-foreground mt-1 line-clamp-1">{record.description}</div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          {record.linkedToType == "Customer" && (
                            <div>
                              <div className="text-xs font-bold text-foreground">{String(record.linkedToType)}</div>
                        
                            </div>
                          )}

                          {record.linkedToType == "Investor" && (
                            <div>
                              <div className="text-xs font-bold text-foreground">{String(record.linkedToType)}</div>
                        
                            </div>
                          )}

                          {record.linkedToType == "Car" && (
                            <div>
                              <div className="text-xs font-bold text-foreground">{String(record.linkedToName)}</div>
                              <div className="text-[10px] text-muted-foreground uppercase">{record.linkedToType}</div>
                            </div>
                          )}

                           {record.linkedToType == "None" && (
                            <div>
                             <span className="text-muted-foreground text-xs font-medium italic opacity-50">None</span>
                            </div>
                          )}

                          {record.linkedToType == "Company" && (
                            <div>
                             <span className="text-xs font-bold text-foreground">{String(record.linkedToType)}</span>
                            </div>
                          )}
                          
                        </td>
                        <td className="p-4 text-center">
                          {record.isPayable && record.payableAmount ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-sm font-black text-destructive">
                                BHD{Number(record.payableAmount).toLocaleString()}
                              </span>
                              <Badge 
                                variant="outline"
                                className={`text-[9px] font-black px-1.5 h-4 border-none ${
                                  record.payableStatus === 'Paid' 
                                    ? 'bg-green-500/10 text-green-500' 
                                    : 'bg-yellow-500/10 text-yellow-500'
                                }`}
                              >
                                {String(record.payableStatus).toUpperCase()}
                              </Badge>
                              {record.payableDate && (
                                <div className="text-[9px] text-muted-foreground mt-1">
                                  Due: {formatDate(record.payableDate)}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-[10px] opacity-30">—</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {record.isReceivable && record.receivableAmount ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-sm font-black text-primary">
                                BHD{Number(record.receivableAmount).toLocaleString()}
                              </span>
                              <Badge 
                                variant="outline"
                                className={`text-[9px] font-black px-1.5 h-4 border-none ${
                                  record.receivableStatus === 'Received' 
                                    ? 'bg-blue-500/10 text-blue-500' 
                                    : 'bg-purple-500/10 text-purple-500'
                                }`}
                              >
                                {String(record.receivableStatus).toUpperCase()}
                              </Badge>
                              {record.dueDate && (
                                <div className="text-[9px] text-muted-foreground mt-1">
                                  Due: {formatDate(record.dueDate)}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-[10px] opacity-30">—</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/10"
                            onClick={() => onViewDetails(record)}
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-muted-foreground italic text-sm">
                        No records found matching your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
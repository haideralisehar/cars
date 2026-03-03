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
  ArrowDownLeft
} from 'lucide-react';
import { MoneyRecord, mockMoneyRecords } from '@/types/money-record';

interface MoneyRecordsListProps {
  onAddRecord: () => void;
  onViewDetails: (recordId: string) => void;
  userRole: string;
  initialTab?: string;
}

export function MoneyRecordsList({ onAddRecord, onViewDetails, userRole, initialTab = 'all' }: MoneyRecordsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(initialTab);
  
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const isAdmin = userRole === 'Admin' || userRole === 'Super Admin';
  const canMarkStatus = isAdmin;

  const filteredRecords = mockMoneyRecords.filter(record => {
    const matchesSearch = 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.linkedToName?.toLowerCase().includes(searchTerm.toLowerCase());
    
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
    
    return true; // 'all' tab
  });

  const getRecordIcon = (record: MoneyRecord) => {
    if (record.isPayable && record.isReceivable) return <ArrowRightLeft className="h-4 w-4 text-orange-500" />;
    if (record.isPayable) return <ArrowDownLeft className="h-4 w-4 text-destructive" />;
    if (record.isReceivable) return <ArrowUpRight className="h-4 w-4 text-primary" />;
    return <DollarSign className="h-4 w-4 text-muted-foreground" />;
  };

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
                          </div>
                        </td>
                        <td className="p-4">
                          {record.linkedToType !== 'None' ? (
                            <div>
                              <div className="text-xs font-bold text-foreground">{record.linkedToName}</div>
                              <div className="text-[10px] text-muted-foreground uppercase">{record.linkedToType}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs font-medium italic opacity-50">—</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {record.isPayable ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-sm font-black text-destructive">
                                ${record.payableAmount?.toLocaleString()}
                              </span>
                              <Badge 
                                variant="outline"
                                className={`text-[9px] font-black px-1.5 h-4 border-none ${
                                  record.payableStatus === 'Paid' 
                                    ? 'bg-green-500/10 text-green-500' 
                                    : 'bg-yellow-500/10 text-yellow-500'
                                }`}
                              >
                                {record.payableStatus.toUpperCase()}
                              </Badge>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-[10px] opacity-30">—</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {record.isReceivable ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-sm font-black text-primary">
                                ${record.receivableAmount?.toLocaleString()}
                              </span>
                              <Badge 
                                variant="outline"
                                className={`text-[9px] font-black px-1.5 h-4 border-none ${
                                  record.receivableStatus === 'Received' 
                                    ? 'bg-blue-500/10 text-blue-500' 
                                    : 'bg-purple-500/10 text-purple-500'
                                }`}
                              >
                                {record.receivableStatus.toUpperCase()}
                              </Badge>
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
                            onClick={() => onViewDetails(record.id)}
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

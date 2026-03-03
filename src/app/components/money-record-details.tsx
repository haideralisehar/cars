import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  ArrowLeft, 
  DollarSign, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  FileText,
  AlertCircle,
  History,
  Tag
} from 'lucide-react';
import { MoneyRecord, mockMoneyRecords } from '@/types/money-record';

interface MoneyRecordDetailsProps {
  recordId: string;
  onBack: () => void;
  userRole: string;
}

export function MoneyRecordDetails({ recordId, onBack, userRole }: MoneyRecordDetailsProps) {
  const record = mockMoneyRecords.find(r => r.id === recordId);
  const isAdmin = userRole === 'Admin' || userRole === 'Super Admin';
  
  const handleMarkPaid = (id: string) => {
    console.log('Marking as paid:', id);
    // In real app, this would update the record status
  };
  
  const handleMarkReceived = (id: string) => {
    console.log('Marking as received:', id);
    // In real app, this would update the record status
  };
  
  if (!record) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Record not found</p>
            <Button variant="ghost" onClick={onBack} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Records
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{record.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-[10px] bg-secondary border-border text-muted-foreground">
                ID: {record.id}
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {record.category}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {record.isPayable && record.payableStatus === 'Pending' && isAdmin && (
            <Button onClick={() => handleMarkPaid(record.id)} className="bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark as Paid
            </Button>
          )}
          {record.isReceivable && record.receivableStatus === 'Pending' && isAdmin && (
            <Button onClick={() => handleMarkReceived(record.id)} className="bg-blue-600 hover:bg-blue-700 text-white">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark as Received
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Record Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Linked Entity</p>
                  <div className="flex items-center gap-2">
                    {record.linkedToType !== 'None' ? (
                      <>
                        <p className="font-bold text-lg text-foreground">{record.linkedToName}</p>
                        <Badge variant="outline" className="text-[10px]">{record.linkedToType}</Badge>
                      </>
                    ) : (
                      <p className="text-muted-foreground italic">None</p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Created By</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <p className="font-bold text-foreground">{record.createdBy}</p>
                    <p className="text-xs text-muted-foreground">• {new Date(record.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Description</p>
                <p className="text-foreground leading-relaxed">
                  {record.description || "No description provided."}
                </p>
              </div>

              {record.receiptUrl && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-3">Receipt Preview</p>
                  <div className="relative aspect-video bg-secondary rounded-lg border border-border flex items-center justify-center group overflow-hidden">
                    <p className="text-sm text-muted-foreground">Receipt Image Preview</p>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Full Size
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {record.activityLog.map((log, index) => (
                  <div key={log.id} className="flex gap-4 items-start relative">
                    {index !== record.activityLog.length - 1 && (
                      <div className="absolute left-2 top-6 bottom-[-16px] w-[1px] bg-border" />
                    )}
                    <div className="w-4 h-4 rounded-full bg-primary/20 border-2 border-primary flex-shrink-0 mt-1" />
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-bold text-foreground">{log.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" /> {log.user}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Financial Panels */}
        <div className="space-y-6">
          {record.isPayable && (
            <Card className="bg-card border-border overflow-hidden">
              <div className="h-1 bg-destructive" />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-destructive flex items-center gap-2 uppercase tracking-widest">
                    Payable
                  </CardTitle>
                  <Badge 
                    className={record.payableStatus === 'Paid' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}
                  >
                    {record.payableStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">Total Amount</p>
                  <p className="text-3xl font-black text-foreground">${record.payableAmount?.toLocaleString()}</p>
                </div>
                <div className="space-y-3 px-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Payable To</span>
                    <span className="text-sm font-bold text-foreground">{record.payableTo}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-bold text-foreground">{record.payableDate ? new Date(record.payableDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
                {!isAdmin && record.payableStatus === 'Pending' && (
                  <div className="p-3 bg-secondary/50 rounded border border-border flex items-center gap-2 mt-4">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground italic">Restricted: Only Admins can mark as paid.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {record.isReceivable && (
            <Card className="bg-card border-border overflow-hidden">
              <div className="h-1 bg-primary" />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-widest">
                    Receivable
                  </CardTitle>
                  <Badge 
                    className={record.receivableStatus === 'Received' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-purple-500/10 text-purple-500 border-purple-500/20'}
                  >
                    {record.receivableStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">Total Amount</p>
                  <p className="text-3xl font-black text-foreground">${record.receivableAmount?.toLocaleString()}</p>
                </div>
                <div className="space-y-3 px-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Receivable From</span>
                    <span className="text-sm font-bold text-foreground">{record.receivableFrom}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Due Date</span>
                    <span className="text-sm font-bold text-foreground">{record.receivableDueDate ? new Date(record.receivableDueDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
                {!isAdmin && record.receivableStatus === 'Pending' && (
                  <div className="p-3 bg-secondary/50 rounded border border-border flex items-center gap-2 mt-4">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground italic">Restricted: Only Admins can mark as received.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
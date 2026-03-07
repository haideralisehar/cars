import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/app/components/ui/select';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calculator,
  Download,
  Calendar,
  ChevronLeft,
  ArrowRight,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

type ReportType = 'pl' | 'cashflow' | 'investor' | 'vat' | 'profitability' | 'allocation' | null;

const reportCards = [
  { id: 'pl', title: 'Profit & Loss', description: 'Financial overview of revenue and expenses', icon: TrendingUp, color: 'text-green-500' },
  { id: 'cashflow', title: 'Cash Flow Report', description: 'Detailed tracking of money moving in and out', icon: DollarSign, color: 'text-blue-500' },
  { id: 'investor', title: 'Investor Statement', description: 'Performance and balances for each investor', icon: Users, color: 'text-purple-500' },
  { id: 'vat', title: 'VAT Report', description: 'Tax collection and payment summary', icon: Calculator, color: 'text-orange-500' },
  { id: 'profitability', title: 'Car-wise Profitability', description: 'Profit breakdown per vehicle', icon: BarChart3, color: 'text-pink-500' },
  { id: 'allocation', title: 'Allocation History', description: 'History of fund allocations and returns', icon: FileText, color: 'text-yellow-500' },
];

const mockChartData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Apr', value: 61000 },
  { name: 'May', value: 55000 },
  { name: 'Jun', value: 67000 },
];

const mockProfitabilityData = [
  { name: 'Toyota Land Cruiser', profit: 12500 },
  { name: 'Mercedes G63', profit: 18000 },
  { name: 'Porsche 911', profit: 15500 },
  { name: 'BMW X5', profit: 9200 },
  { name: 'Range Rover Sport', profit: 14000 },
];

const COLORS = ['#ff6b35', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface ReportsProps {
  userRole: 'Admin' | 'Super Admin' | 'User' | 'Operations' | 'Driver' | 'Investor';
}

export function Reports({ userRole }: ReportsProps) {
  const [selectedReport, setSelectedReport] = useState<ReportType>(null);
  const [dateRange, setDateRange] = useState({ start: '2025-01-01', end: '2025-06-30' });

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting as ${format}...`);
  };

  if (selectedReport) {
    const reportInfo = reportCards.find(r => r.id === selectedReport);
    
    return (
      <div className="p-6 bg-background min-h-screen space-y-6">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedReport(null)}
            className="mb-4 -ml-2 text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Reports Dashboard
          </Button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-[10px] border-primary/30 text-primary uppercase tracking-wider font-bold">Official Report</Badge>
                <span className="text-xs text-muted-foreground">Generated on {new Date().toLocaleDateString()}</span>
              </div>
              <h1 className="text-4xl font-bold text-foreground">{reportInfo?.title}</h1>
              <p className="text-muted-foreground mt-1">{reportInfo?.description}</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-secondary p-2 rounded-lg border border-border">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="bg-transparent border-none h-8 w-32 text-xs p-0 focus-visible:ring-0" 
                />
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <Input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="bg-transparent border-none h-8 w-32 text-xs p-0 focus-visible:ring-0" 
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-10 px-4" onClick={() => handleExport('excel')}>
                  <Download className="h-4 w-4 mr-2 text-green-500" />
                  Excel
                </Button>
                <Button variant="default" size="sm" className="h-10 px-4 bg-primary" onClick={() => handleExport('pdf')}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF Export
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-border border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142,500.000 BHD</div>
                <div className="flex items-center gap-1 mt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12.5% from last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border border-l-4 border-l-destructive">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38,240.000 BHD</div>
                <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+4.2% from last period</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Net Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73.2%</div>
                <div className="flex items-center gap-1 mt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>Optimal range</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-l-4 border-l-orange-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">VAT Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,632.000 BHD</div>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <span>Due by end of month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Trend Analysis</CardTitle>
                    <CardDescription>Visual performance over the selected date range</CardDescription>
                  </div>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-32 h-8 text-xs bg-secondary border-border">
                      <SelectValue placeholder="Interval" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value/1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                      itemStyle={{ color: '#ff6b35' }}
                      cursor={{ fill: 'rgba(255, 107, 53, 0.05)' }}
                    />
                    <Bar dataKey="value" fill="#ff6b35" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Percentage breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex flex-col justify-between">
                <ResponsiveContainer width="100%" height="220px">
                  <PieChart>
                    <Pie
                      data={mockProfitabilityData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="profit"
                    >
                      {mockProfitabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 mb-2">
                  {mockProfitabilityData.slice(0, 4).map((item, index) => (
                    <div key={item.name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-muted-foreground truncate max-w-[120px]">{item.name}</span>
                        <span>{((item.profit / 70000) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            backgroundColor: COLORS[index % COLORS.length],
                            width: `${(item.profit / 20000) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 bg-card border-border overflow-hidden">
              <CardHeader className="bg-secondary/50 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle>Data Audit Table</CardTitle>
                  <Badge variant="outline" className="border-primary/50 text-primary">Read-only Audit Log</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-secondary/30 border-b border-border">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Reference</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-4 text-sm">2025-05-{10+i}</td>
                        <td className="px-6 py-4 text-sm font-mono text-primary">REF-2025-00{i}</td>
                        <td className="px-6 py-4 text-sm">Quarterly revenue adjustment from sales</td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className="text-[10px]">Financial</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-bold">{(Math.random() * 5000 + 1000).toLocaleString(undefined, {minimumFractionDigits: 3})} BHD</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground text-lg">Comprehensive financial and operational performance data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportCards.map((report) => (
            <Card 
              key={report.id} 
              className="bg-card border-border hover:border-primary transition-all cursor-pointer group"
              onClick={() => setSelectedReport(report.id as ReportType)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-3 rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors`}>
                    <report.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                </div>
                <CardTitle className="text-xl">{report.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {report.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border bg-gradient-to-br from-card to-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Quick Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-12">Current Quarter</Button>
              <Button variant="outline" className="justify-start h-12">Last 30 Days</Button>
              <Button variant="outline" className="justify-start h-12">FY 2024-25</Button>
              <Button variant="outline" className="justify-start h-12">All Time</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border bg-gradient-to-br from-card to-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Bulk Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Download all reports for auditing purposes.</p>
              <div className="flex gap-4">
                <Button className="flex-1 bg-primary">Full PDF Audit Pack</Button>
                <Button variant="outline" className="flex-1">Consolidated Excel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

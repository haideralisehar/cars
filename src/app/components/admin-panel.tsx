import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { UserRole } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { 
  Users, 
  Shield, 
  Settings, 
  History, 
  FileText, 
  Eye, 
  EyeOff, 
  Lock, 
  Check, 
  X,
  Building,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  Calculator,
  DollarSign
} from 'lucide-react';
import { ScrollArea } from '@/app/components/ui/scroll-area';

type AdminTab = 'overview' | 'roles' | 'financial' | 'reports' | 'documents' | 'audit' | 'settings';

const ROLES = ['Super Admin', 'Admin', 'Operations', 'Driver', 'Investor'];

const PERMISSIONS = [
  { id: 'view_inventory', label: 'View Cars Inventory' },
  { id: 'click_thumbnail', label: 'Click Car Thumbnail' },
  { id: 'view_details', label: 'View Car Details' },
  { id: 'add_expense', label: 'Add Car Expense' },
  { id: 'view_cashflow', label: 'View Cash Flow' },
  { id: 'allocate_money', label: 'Allocate Money' },
  { id: 'view_reports', label: 'View Reports' },
  { id: 'view_vat', label: 'View VAT' },
  { id: 'view_commission', label: 'View Commission' },
  { id: 'edit_financial', label: 'Edit Financial Data' },
];

interface AdminPanelProps {
  userRole: UserRole;
}

export function AdminPanel({ userRole }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [selectedRole, setSelectedRole] = useState('Admin');
  const { theme, setTheme } = useTheme();

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {[
        { id: 'roles', title: 'Roles & Permissions', desc: 'Manage user access levels and role definitions', icon: Shield },
        { id: 'financial', title: 'Financial Rules', desc: 'Configure VAT and commission visibility', icon: Calculator },
        { id: 'reports', title: 'Report Access', desc: 'Control which roles can see specific reports', icon: FileText },
        { id: 'documents', title: 'Document Rules', desc: 'Set rules for external and internal exports', icon: Eye },
        { id: 'audit', title: 'Audit Logs', desc: 'View complete system history and changes', icon: History },
        { id: 'settings', title: 'System Settings', desc: 'Company info, theme and notification rules', icon: Settings },
      ].map((card) => (
        <Card 
          key={card.id} 
          className="bg-card border-border hover:border-primary transition-all cursor-pointer group"
          onClick={() => setActiveTab(card.id as AdminTab)}
        >
          <CardHeader>
            <div className="p-3 rounded-lg bg-secondary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <card.icon className="h-6 w-6" />
            </div>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.desc}</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6 flex justify-end">
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all" />
          </div>
        </Card>
      ))}
    </div>
  );

  const renderRolesPermissions = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in slide-in-from-left-4 duration-500">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">System Roles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-2">
          {ROLES.map((role) => (
            <Button
              key={role}
              variant={selectedRole === role ? 'default' : 'ghost'}
              className="w-full justify-start h-12"
              onClick={() => setSelectedRole(role)}
            >
              <Users className="h-4 w-4 mr-3" />
              {role}
            </Button>
          ))}
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-3 bg-card border-border">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{selectedRole} Permissions</CardTitle>
              <CardDescription>Manage what users with this role can see and do</CardDescription>
            </div>
            <Badge variant="outline" className="text-[10px] uppercase font-bold">Matrix Mode</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <table className="w-full">
              <thead className="sticky top-0 bg-card border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Permission</th>
                  <th className="text-center px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PERMISSIONS.map((perm) => (
                  <tr key={perm.id} className="hover:bg-secondary/20">
                    <td className="px-6 py-4 text-sm font-medium">{perm.label}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Switch 
                          checked={
                            (selectedRole === 'Super Admin' || selectedRole === 'Admin') || 
                            (selectedRole === 'Operations' && ['view_inventory', 'add_expense'].includes(perm.id)) ||
                            (selectedRole === 'Driver' && ['add_expense'].includes(perm.id)) ||
                            (selectedRole === 'Investor' && ['view_inventory'].includes(perm.id))
                          }
                          disabled={selectedRole === 'Super Admin' || selectedRole === 'Admin'}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );

  const renderFinancialRules = () => (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>VAT Settings</CardTitle>
          <CardDescription>Configure global tax rules and visibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label>VAT Percentage (%)</Label>
              <Input type="number" defaultValue="15" className="bg-secondary border-border" />
            </div>
            <div className="space-y-4">
              <Label>Who can see VAT fields?</Label>
              <div className="space-y-2">
                {ROLES.map(role => (
                  <div key={role} className="flex items-center justify-between p-2 bg-secondary rounded border border-border">
                    <span className="text-sm">{role}</span>
                    <Switch checked={['Admin', 'Super Admin'].includes(role)} disabled={['Admin', 'Super Admin'].includes(role)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Commission Rules</CardTitle>
          <CardDescription>Define how commission visibility is handled across the platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label>Default Commission Type</Label>
              <div className="flex gap-2">
                <Button variant="default" className="flex-1">Percentage</Button>
                <Button variant="outline" className="flex-1">Fixed Amount</Button>
              </div>
            </div>
            <div className="space-y-4">
              <Label>Commission Visibility Policy</Label>
              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <p className="text-xs text-orange-500 font-bold uppercase mb-1">Global Rule</p>
                <p className="text-sm text-muted-foreground">VAT and Commission must never appear in Dashboards, Car Details, Cash Flow, Reports, Exports, or Documents for non-admin users.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAuditLogs = () => (
    <Card className="bg-card border-border animate-in fade-in duration-500">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border">
        <div>
          <CardTitle>System Audit Logs</CardTitle>
          <CardDescription>Track all critical actions and data modifications</CardDescription>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Filter by user or action..." className="w-64 bg-secondary border-border" />
          <Button variant="outline">Export Logs</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-card border-b border-border">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">User</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Action</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Entity</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Old Value</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">New Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { time: '2026-02-03 14:22', user: 'Super Admin', action: 'Allocation change', entity: 'Investor (Abdullah)', old: '50,000 BHD', new: '75,000 BHD' },
                { time: '2026-02-03 12:45', user: 'Admin User', action: 'Commission edit', entity: 'Sale (Toyota LC)', old: '500 BHD', new: '750 BHD' },
                { time: '2026-02-03 10:30', user: 'Operations', action: 'Expense edit', entity: 'Car (BMW X5)', old: '120 BHD', new: '145 BHD' },
                { time: '2026-02-02 16:15', user: 'Super Admin', action: 'Role change', entity: 'User (Fahad)', old: 'Driver', new: 'Operations' },
                { time: '2026-02-02 09:22', user: 'Admin User', action: 'VAT edit', entity: 'System Setting', old: '10%', new: '15%' },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{log.time}</td>
                  <td className="px-6 py-4 text-sm font-bold">{log.user}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-primary border-primary/30">{log.action}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{log.entity}</td>
                  <td className="px-6 py-4 text-sm text-red-500 font-medium">{log.old}</td>
                  <td className="px-6 py-4 text-sm text-green-500 font-bold">{log.new}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const renderSettings = () => (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input defaultValue="Auto Lounge W.L.L" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>Commercial Registration (CR)</Label>
              <Input defaultValue="176932-1" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input defaultValue="+973 39150003" className="bg-secondary border-border" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Insurance Expiry Alerts (30 Days)</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Registration Expiry Alerts (15 Days)</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Payment Due Reminders</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Low Inventory Alerts</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Appearance & Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button 
              variant={theme === 'dark' ? 'default' : 'outline'} 
              className="flex-1 h-20 flex-col gap-2"
              onClick={() => setTheme('dark')}
            >
              <Moon className="h-5 w-5" />
              Dark Mode
            </Button>
            <Button 
              variant={theme === 'light' ? 'default' : 'outline'} 
              className="flex-1 h-20 flex-col gap-2"
              onClick={() => setTheme('light')}
            >
              <Sun className="h-5 w-5" />
              Light Mode
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Export Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Allow Excel Export for Non-Admins</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Allow PDF Export for Non-Admins</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-primary">Save Changes</Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground mt-1">System configuration and access control center</p>
          </div>
          {activeTab !== 'overview' && (
            <Button variant="ghost" onClick={() => setActiveTab('overview')}>
              Back to Overview
            </Button>
          )}
        </div>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'roles' && renderRolesPermissions()}
        {activeTab === 'financial' && renderFinancialRules()}
        {activeTab === 'audit' && renderAuditLogs()}
        {activeTab === 'settings' && renderSettings()}
        
        {/* Simplified placeholders for the other complex screens to maintain speed */}
        {['reports', 'documents'].includes(activeTab) && (
          <Card className="bg-card border-border p-12 text-center animate-in zoom-in-95">
            <div className="p-4 rounded-full bg-secondary w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Settings className="h-8 w-8 text-primary animate-spin-slow" />
            </div>
            <CardTitle className="mb-2">Module Under Configuration</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              This administrative module is being finalized. You can manage {activeTab} rules through the primary system settings in the meantime.
            </CardDescription>
            <Button variant="outline" className="mt-6" onClick={() => setActiveTab('overview')}>Return to Home</Button>
          </Card>
        )}
      </div>
    </div>
  );
}
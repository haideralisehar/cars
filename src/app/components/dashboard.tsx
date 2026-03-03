import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/app/components/ui/dialog';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { 
  Car, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle2,
  Plus,
  Calendar
} from 'lucide-react';
import { mockAlerts, mockReminders } from '@/data/mockData';
import { Alert, Reminder } from '@/types';

type TimePeriod = 'Weekly' | 'Monthly' | 'Yearly';

interface DashboardProps {
  userRole: 'Admin' | 'Super Admin' | 'User' | 'Operations' | 'Driver' | 'Investor';
  onNavigateToCar: (carId: string) => void;
}

export function Dashboard({ userRole, onNavigateToCar }: DashboardProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('Monthly');
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [newReminder, setNewReminder] = useState({ text: '', date: '' });
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [isSeeMoreAlertsOpen, setIsSeeMoreAlertsOpen] = useState(false);

  // KPI data based on time period
  const getKpiData = () => {
    switch (timePeriod) {
      case 'Weekly':
        return {
          totalCars: 45,
          carsAvailable: 32,
          carsSold: 2,
          activeLeases: 5,
          paymentPending: 4000,
          leaseRentPending: 600,
          totalExpenses: 3200,
          netProfit: 28000,
          commission: 3500,
        };
      case 'Monthly':
        return {
          totalCars: 45,
          carsAvailable: 32,
          carsSold: 8,
          activeLeases: 5,
          paymentPending: 16000,
          leaseRentPending: 2400,
          totalExpenses: 12500,
          netProfit: 125000,
          commission: 15000,
        };
      case 'Yearly':
        return {
          totalCars: 45,
          carsAvailable: 32,
          carsSold: 96,
          activeLeases: 5,
          paymentPending: 180000,
          leaseRentPending: 28800,
          totalExpenses: 150000,
          netProfit: 1500000,
          commission: 180000,
        };
      default:
        return {
          totalCars: 45,
          carsAvailable: 32,
          carsSold: 8,
          activeLeases: 5,
          paymentPending: 16000,
          leaseRentPending: 2400,
          totalExpenses: 12500,
          netProfit: 125000,
          commission: 15000,
        };
    }
  };

  const kpiData = getKpiData();

  const handleAddReminder = () => {
    if (newReminder.text && newReminder.date) {
      const reminder: Reminder = {
        id: `rem-${Date.now()}`,
        text: newReminder.text,
        date: newReminder.date,
        done: false,
        createdAt: new Date().toISOString(),
      };
      setReminders([reminder, ...reminders]);
      setNewReminder({ text: '', date: '' });
      setIsAddReminderOpen(false);
    }
  };

  const handleToggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  const getAlertIcon = (type: Alert['type']) => {
    return <AlertTriangle className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Executive Dashboard</h1>
            <p className="text-muted-foreground mt-1">Business health and alerts overview</p>
          </div>
          <div className="flex gap-2">
            {(['Weekly', 'Monthly', 'Yearly'] as TimePeriod[]).map((period) => (
              <Button
                key={period}
                variant={timePeriod === period ? 'default' : 'outline'}
                onClick={() => setTimePeriod(period)}
                size="sm"
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Cars in Inventory</CardTitle>
              <Car className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpiData.totalCars}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cars Available</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpiData.carsAvailable}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cars Sold</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpiData.carsSold}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
              <Car className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpiData.activeLeases}</div>
            </CardContent>
          </Card>

          {/* Lease Rent Pending - Visible to All */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Lease Rent Pending</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${kpiData.leaseRentPending.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          {/* Financial KPIs - Super Admin & Admin Only */}
          {(userRole === 'Admin' || userRole === 'Super Admin') && (
            <>
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Payment Pending</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    ${kpiData.paymentPending.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Sales Installments</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <TrendingDown className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    ${kpiData.totalExpenses.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    ${kpiData.netProfit.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">VAT-adjusted</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Auto Lounge Commission</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    ${kpiData.commission.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Alerts & Reminders Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Alerts */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Alerts & Notifications
                </CardTitle>
                <Dialog open={isSeeMoreAlertsOpen} onOpenChange={setIsSeeMoreAlertsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                      See More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                        All Active Alerts
                      </DialogTitle>
                      <DialogDescription>
                        A comprehensive list of all pending alerts and notifications across the inventory.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[500px] mt-4 pr-4">
                      <div className="space-y-3">
                        {mockAlerts.map((alert) => (
                          <div
                            key={alert.id}
                            onClick={() => {
                              onNavigateToCar(alert.carId);
                              setIsSeeMoreAlertsOpen(false);
                            }}
                            className="p-4 bg-secondary rounded-lg border border-border hover:border-primary transition-all cursor-pointer group"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getAlertIcon(alert.type)}
                                <Badge variant={alert.isOverdue ? 'destructive' : 'default'}>
                                  {alert.type}
                                </Badge>
                              </div>
                              {alert.isOverdue ? (
                                <span className="text-xs text-destructive font-bold uppercase tracking-wider animate-pulse">Overdue</span>
                              ) : (
                                <span className="text-xs text-muted-foreground">{new Date(alert.dueDate).toLocaleDateString()}</span>
                              )}
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{alert.carName}</h4>
                                <p className="text-sm text-muted-foreground">{alert.personName}</p>
                              </div>
                              <Button size="sm" variant="outline" className="h-8">View Car</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {mockAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      onClick={() => onNavigateToCar(alert.carId)}
                      className="p-3 bg-secondary rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getAlertIcon(alert.type)}
                          <Badge variant={alert.isOverdue ? 'destructive' : 'default'}>
                            {alert.type}
                          </Badge>
                        </div>
                        {alert.isOverdue && (
                          <span className="text-xs text-destructive font-medium">Overdue</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground">{alert.carName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.personName}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Due: {new Date(alert.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Reminders */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Reminders
                </CardTitle>
                <Dialog open={isAddReminderOpen} onOpenChange={setIsAddReminderOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card">
                    <DialogHeader>
                      <DialogTitle>Add Reminder</DialogTitle>
                      <DialogDescription>Enter the details of the reminder.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="reminder-text">Reminder</Label>
                        <Input
                          id="reminder-text"
                          placeholder="Enter reminder text"
                          value={newReminder.text}
                          onChange={(e) => setNewReminder({ ...newReminder, text: e.target.value })}
                          className="bg-input-background"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reminder-date">Date</Label>
                        <Input
                          id="reminder-date"
                          type="date"
                          value={newReminder.date}
                          onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                          className="bg-input-background"
                        />
                      </div>
                      <Button onClick={handleAddReminder} className="w-full">
                        Add Reminder
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`p-3 bg-secondary rounded-lg border border-border ${
                        reminder.done ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={reminder.done}
                          onChange={() => handleToggleReminder(reminder.id)}
                          className="mt-1 h-4 w-4 rounded border-border bg-input-background"
                        />
                        <div className="flex-1">
                          <p className={`text-sm ${reminder.done ? 'line-through' : ''}`}>
                            {reminder.text}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(reminder.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
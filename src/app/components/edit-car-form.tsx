import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import { Car, LeaseType } from '@/types';

interface EditCarFormProps {
  car: Car;
  onSave: (updatedCar: Partial<Car>) => void;
  onCancel: () => void;
}

export function EditCarForm({ car, onSave, onCancel }: EditCarFormProps) {
  const [formData, setFormData] = useState({
    make: car.make,
    model: car.model,
    year: car.year.toString(),
    vin: car.vin,
    color: car.color,
    registrationNumber: car.registrationNumber,
    buyingPrice: car.buyingPrice.toString(),
    askingPrice: car.askingPrice.toString(),
    insuranceExpiry: car.insuranceExpiry || '',
    registrationExpiry: car.registrationExpiry || '',
    leaseEnabled: car.leaseEnabled,
    leaseType: car.leaseType || 'Daily' as LeaseType,
    leaseAmount: car.leaseAmount?.toString() || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedCar: Partial<Car> = {
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      vin: formData.vin,
      color: formData.color,
      registrationNumber: formData.registrationNumber,
      buyingPrice: parseFloat(formData.buyingPrice),
      askingPrice: parseFloat(formData.askingPrice),
      insuranceExpiry: formData.insuranceExpiry,
      registrationExpiry: formData.registrationExpiry,
      leaseEnabled: formData.leaseEnabled,
      leaseType: formData.leaseType,
      leaseAmount: formData.leaseAmount ? parseFloat(formData.leaseAmount) : undefined,
    };

    onSave(updatedCar);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Edit Vehicle</h1>
            <p className="text-muted-foreground">Update vehicle information</p>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make *</Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color *</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vin">VIN *</Label>
                  <Input
                    id="vin"
                    value={formData.vin}
                    onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buyingPrice">Buying Price (BHD) *</Label>
                  <Input
                    id="buyingPrice"
                    type="number"
                    step="0.01"
                    value={formData.buyingPrice}
                    onChange={(e) => setFormData({ ...formData, buyingPrice: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="askingPrice">Asking Price (BHD) *</Label>
                  <Input
                    id="askingPrice"
                    type="number"
                    step="0.01"
                    value={formData.askingPrice}
                    onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle>Document Expiry Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
                  <Input
                    id="insuranceExpiry"
                    type="date"
                    value={formData.insuranceExpiry}
                    onChange={(e) => setFormData({ ...formData, insuranceExpiry: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationExpiry">Registration Expiry</Label>
                  <Input
                    id="registrationExpiry"
                    type="date"
                    value={formData.registrationExpiry}
                    onChange={(e) => setFormData({ ...formData, registrationExpiry: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle>Lease Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Lease</Label>
                  <p className="text-sm text-muted-foreground">Allow this vehicle to be leased</p>
                </div>
                <Switch
                  checked={formData.leaseEnabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, leaseEnabled: checked })}
                />
              </div>

              {formData.leaseEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Label htmlFor="leaseType">Lease Type</Label>
                    <Select
                      value={formData.leaseType}
                      onValueChange={(value: LeaseType) => setFormData({ ...formData, leaseType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaseAmount">Lease Amount (BHD)</Label>
                    <Input
                      id="leaseAmount"
                      type="number"
                      step="0.01"
                      value={formData.leaseAmount}
                      onChange={(e) => setFormData({ ...formData, leaseAmount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

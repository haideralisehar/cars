import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Plus, ShoppingCart, Key, DollarSign, Edit } from 'lucide-react';
import { Car } from '@/types';

interface CarsInventoryProps {
  onAddNewCar: () => void;
  onCarClick: (carId: string) => void;
  onSellCar: (carId: string) => void;
  onLeaseCar: (carId: string) => void;
  onAddExpense: (carId: string) => void;
  userRole: 'Admin' | 'Super Admin' | 'User' | 'Operations' | 'Driver' | 'Investor';
}

export function CarsInventory({
  onAddNewCar,
  onCarClick,
  onSellCar,
  onLeaseCar,
  onAddExpense,
  userRole,
}: CarsInventoryProps) {

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
  const isSuperAdmin = userRole === 'Super Admin';
  const canAddExpense = isAdmin || userRole === 'Operations' || userRole === 'Driver';

  // Fetch Cars
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://your-api.com/api/cars", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setCars(data.cars || data); 
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Car['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-primary text-primary-foreground';
      case 'Sold':
        return 'bg-green-600 text-white';
      case 'Leased':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSourceColor = (source: Car['source']) => {
    switch (source) {
      case 'Company':
        return 'bg-orange-600 text-white';
      case 'Investor':
        return 'bg-purple-600 text-white';
      case 'Customer':
        return 'bg-cyan-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cars Inventory</h1>
            <p className="text-muted-foreground mt-1">{cars.length} total vehicles</p>
          </div>

          {isAdmin && (
            <Button onClick={onAddNewCar} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add New Car
            </Button>
          )}
        </div>

        {/* Cars Grid */}

        {cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cars.map((car) => (
            <Card
              key={car.id}
              className={`bg-card border-border overflow-hidden transition-all group ${
                isAdmin ? 'hover:border-primary cursor-pointer' : 'cursor-default'
              }`}
            >

              {/* Image */}
              <div
                onClick={() => isAdmin && onCarClick(car.id)}
                className="relative h-48 bg-secondary overflow-hidden"
              >
                <img
                  src={car.images?.[0]}
                  alt={`${car.make} ${car.model}`}
                  className={`w-full h-full object-cover transition-transform ${
                    isAdmin ? 'group-hover:scale-105' : ''
                  }`}
                />

                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge className={getStatusColor(car.status)}>
                    {car.status}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent
                className="p-4"
                onClick={() => isAdmin && onCarClick(car.id)}
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {car.make} {car.model}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {car.year} • {car.color}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge
                      className={getSourceColor(car.source)}
                      variant="secondary"
                    >
                      {car.source}
                    </Badge>

                    <p className="text-sm text-muted-foreground">
                      {car.registrationNumber}
                    </p>
                  </div>
                </div>
              </CardContent>

              {/* Actions */}
              <div className="px-4 pb-4 flex flex-wrap gap-2">

                {car.status === 'Available' && isAdmin && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSellCar(car.id);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Sell
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLeaseCar(car.id);
                      }}
                    >
                      <Key className="h-4 w-4 mr-1" />
                      Lease
                    </Button>
                  </>
                )}

                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Edit className="h-4 w-4 text-primary" />
                  </Button>
                )}

                {canAddExpense && (
                  <Button
                    variant="outline"
                    size="sm"
                    className={!isAdmin ? "w-full" : "flex-shrink-0"}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddExpense(car.id);
                    }}
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    {!isAdmin && "Add Expense"}
                  </Button>
                )}

              </div>
            </Card>
          ))}
        </div>
        ):<div className="flex items-center justify-center h-screen">
  <p className="text-lg font-medium text-muted-foreground">
    No Records Found...
  </p>
</div>}

      </div>
    </div>
  );
}
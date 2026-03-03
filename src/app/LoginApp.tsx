import { useState } from 'react';
import { ThemeProvider } from '@/app/components/theme-provider';
import AuthenticatedApp from '@/app/AuthenticatedApp';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { usersStore } from '@/data/usersStore';

export default function LoginApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const user = usersStore.authenticate(email, password);

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    } else {
      setError('Invalid email or password, or account is inactive');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  if (isAuthenticated && currentUser) {
    return <AuthenticatedApp user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="space-y-4 text-center pb-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">AL</span>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Auto Lounge
              </CardTitle>
              <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase mt-1">
                Management System
              </p>
            </div>
            <CardDescription>
              Sign in to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input-background"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-input-background pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive font-medium">
                    {error}
                  </p>
                </div>
              )}

              {/* Login Button */}
              <Button type="submit" className="w-full">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-secondary rounded-lg border border-border">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                Demo Credentials
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Super Admin:</span>
                  <span className="font-mono text-foreground">
                    superadmin@autolounge.com
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Admin:</span>
                  <span className="font-mono text-foreground">
                    admin@autolounge.com
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Investor 1:</span>
                  <span className="font-mono text-foreground">
                    investor@autolounge.com
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Investor 2:</span>
                  <span className="font-mono text-foreground">
                    sara@autolounge.com
                  </span>
                </div>
                <div className="pt-2 mt-2 border-t border-border text-center">
                  <span className="text-muted-foreground">Password: </span>
                  <span className="font-mono font-semibold text-foreground">
                    admin123
                  </span>
                  <span className="text-muted-foreground"> or </span>
                  <span className="font-mono font-semibold text-foreground">
                    investor123
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
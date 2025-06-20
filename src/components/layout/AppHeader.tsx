import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShieldCheck, User, Settings, LogOut, Menu } from 'lucide-react';

interface AppHeaderProps {
  isAuthenticated?: boolean;
  userName?: string; // Optional: for displaying user name/initials
}

const AppHeader: React.FC<AppHeaderProps> = ({ isAuthenticated = false, userName = 'User' }) => {
  console.log('AppHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  const getUserInitials = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/landing" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">AuthApp</span>
        </Link>

        {isAuthenticated ? (
          // Authenticated Header
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4 lg:gap-6">
              <NavLink to="/dashboard" className={navLinkClasses}>
                Dashboard
              </NavLink>
              {/* Add other authenticated nav links here if needed */}
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={userName} />
                    <AvatarFallback>{getUserInitials(userName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {/* Placeholder for user email or role */}
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile"> {/* Placeholder route */}
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings"> {/* Placeholder route */}
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  {/* Actual logout logic would be handled by a function passed as prop or context */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="md:hidden">
              {/* Mobile Menu Trigger - functionality would need to be implemented */}
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        ) : (
          // Unauthenticated Header
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">Secure Authentication Platform</span>
            {/* Optionally, add a link to Login or Register if not on those pages
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Login</Link>
            </Button>
            */}
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
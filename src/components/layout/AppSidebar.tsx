import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Users, Settings, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn helper

interface AppSidebarProps {
  className?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ className }) => {
  console.log('AppSidebar loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
      isActive && 'bg-muted text-primary font-semibold'
    );

  return (
    <aside className={cn('hidden border-r bg-muted/40 md:block', className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
          <Link to="/landing" className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span>AuthApp</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink to="/dashboard" className={navLinkClasses}>
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink to="/analytics" className={navLinkClasses}> {/* Placeholder route */}
              <BarChart3 className="h-4 w-4" />
              Analytics
            </NavLink>
            <NavLink to="/users" className={navLinkClasses}> {/* Placeholder route */}
              <Users className="h-4 w-4" />
              User Management
            </NavLink>
            <NavLink to="/settings" className={navLinkClasses}> {/* Placeholder route */}
              <Settings className="h-4 w-4" />
              Settings
            </NavLink>
          </nav>
        </div>
        {/* Optional: Sidebar footer content
        <div className="mt-auto p-4">
          <Button size="sm" className="w-full">
            Upgrade
          </Button>
        </div>
        */}
      </div>
    </aside>
  );
};

export default AppSidebar;
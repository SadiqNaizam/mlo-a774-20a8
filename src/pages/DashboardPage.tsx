import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import AppFooter from '@/components/layout/AppFooter';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge'; // For status in table
import { MoreHorizontal } from 'lucide-react'; // For actions dropdown in table
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Placeholder data for the table
interface DashboardActivity {
  id: string;
  item: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  date: string;
  assignee: string;
}

const activities: DashboardActivity[] = [
  { id: 'act_001', item: 'User Profile Setup', status: 'Completed', date: '2024-07-28', assignee: 'Alice' },
  { id: 'act_002', item: 'Deploy New Feature', status: 'In Progress', date: '2024-07-29', assignee: 'Bob' },
  { id: 'act_003', item: 'Review Security Logs', status: 'Pending', date: '2024-07-30', assignee: 'Charlie' },
  { id: 'act_004', item: 'Client Onboarding Call', status: 'Completed', date: '2024-07-27', assignee: 'Diana' },
  { id: 'act_005', item: 'Fix Authentication Bug', status: 'Failed', date: '2024-07-29', assignee: 'Eve' },
];

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');

  const getStatusVariant = (status: DashboardActivity['status']) => {
    switch (status) {
      case 'Completed':
        return 'default'; // 'success' is not a default variant, using 'default' (often green-ish)
      case 'In Progress':
        return 'secondary'; // 'warning' is not a default variant, using 'secondary' (often yellow-ish/blue-ish)
      case 'Pending':
        return 'outline';
      case 'Failed':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <AppHeader isAuthenticated={true} userName="Jane Doe" />
      <div className="flex flex-1">
        <AppSidebar className="w-64" /> {/* Assuming AppSidebar has default width or takes class */}
        <main className="flex-1 p-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Welcome to your Dashboard!</CardTitle>
                <CardDescription>Here's an overview of recent activity and key metrics.</CardDescription>
              </div>
              {/* Example button linking to a route from App.tsx or a placeholder */}
              <Link to="/settings"> {/* This route is used in AppHeader/AppSidebar, could be placeholder or future */}
                <Button variant="outline">Go to Settings</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have successfully logged in. This is your main application area.
                You can customize this page to show relevant information like project statuses,
                upcoming tasks, or important notifications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>A log of recent actions and tasks within the application.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.item}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(activity.status)}>
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{activity.assignee}</TableCell>
                      <TableCell className="hidden md:table-cell">{activity.date}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 hover:!text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p className="text-sm">Active Projects: <span className="font-semibold">5</span></p>
                        <p className="text-sm">Pending Tasks: <span className="font-semibold">12</span></p>
                        <p className="text-sm">Users Online: <span className="font-semibold">8</span></p>
                    </div>
                    <Link to="/analytics"> {/* Placeholder link from AppSidebar */}
                        <Button variant="link" className="px-0 pt-2">View Detailed Analytics</Button>
                    </Link>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>New comment on "Project Alpha".</li>
                        <li>Task "Deploy New Feature" is overdue.</li>
                        <li>Maintenance scheduled for tomorrow.</li>
                    </ul>
                     <Link to="/notifications"> {/* Placeholder link, not in App.tsx */}
                        <Button variant="secondary" className="mt-4 w-full">View All Notifications</Button>
                    </Link>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Create New</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                    <Button>New Task</Button>
                    <Button variant="outline">New Project</Button>
                    <Button variant="outline">Invite User</Button>
                </CardContent>
            </Card>
          </div>

        </main>
      </div>
      <AppFooter />
    </div>
  );
};

export default DashboardPage;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AuthFormWrapperProps {
  title: string;
  description?: string; // Optional description below the title
  children: React.ReactNode;
  logoText?: string; // For an application name or logo placeholder text
  className?: string; // Allow additional Tailwind classes for the Card
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  title,
  description,
  children,
  logoText = "YourApp", // Default logo text
  className,
}) => {
  console.log('AuthFormWrapper loaded with title:', title);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 dark:bg-background p-4">
      <Card className={`w-full max-w-md shadow-xl ${className}`}>
        <CardHeader className="p-6 space-y-4">
          {logoText && (
            <div className="text-center">
              {/* In a real app, this could be an <img /> tag or a more styled logo component */}
              <h1 className="text-3xl font-bold tracking-tight text-primary">
                {logoText}
              </h1>
            </div>
          )}
          <div className="text-center">
            <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
            {description && (
              <CardDescription className="text-muted-foreground mt-1">
                {description}
              </CardDescription>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthFormWrapper;
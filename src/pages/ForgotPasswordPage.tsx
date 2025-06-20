import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import AppHeader from '@/components/layout/AppHeader';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import AppFooter from '@/components/layout/AppFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // For consistency with layout_info, though FormLabel is used in shadcn form
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'; // Added Loader2

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

interface AlertState {
  type: 'success' | 'error' | null;
  message: string | null;
}

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const navigate = useNavigate();
  const [alertState, setAlertState] = useState<AlertState>({ type: null, message: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setAlertState({ type: null, message: null }); // Clear previous alerts
    console.log('Password reset requested for:', values.email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success or error (e.g., based on email or just randomly for demo)
    if (values.email.includes('error@example.com')) {
      setAlertState({ type: 'error', message: 'Could not process request. Please try again.' });
    } else {
      setAlertState({ type: 'success', message: `If an account with email ${values.email} exists, a password reset link has been sent.` });
      form.reset(); // Clear the form on success
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-background">
      <AppHeader isAuthenticated={false} />
      <main className="flex-grow">
        <AuthFormWrapper
          title="Forgot Your Password?"
          description="No worries! Enter your email address below and we'll send you a link to reset your password."
          logoText="AuthApp"
        >
          {alertState.message && (
            <Alert variant={alertState.type === 'error' ? 'destructive' : 'default'} className="mb-6">
              {alertState.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{alertState.type === 'success' ? 'Request Sent' : 'Error'}</AlertTitle>
              <AlertDescription>{alertState.message}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            Remember your password?{' '}
            <Link to="/" className="font-medium text-primary hover:underline"> {/* Path from App.tsx for LoginPage */}
              Sign in
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/registration" className="font-medium text-primary hover:underline"> {/* Path from App.tsx for RegistrationPage */}
              Sign up
            </Link>
          </div>
        </AuthFormWrapper>
      </main>
      <AppFooter />
    </div>
  );
};

export default ForgotPasswordPage;
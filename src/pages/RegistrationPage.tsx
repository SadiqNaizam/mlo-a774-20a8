import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, CheckCircle } from "lucide-react"; // For Alert icons

const registrationFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Set error on confirmPassword field
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

interface FeedbackMessage {
  type: 'success' | 'error';
  title: string;
  message: string;
}

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');
  const navigate = useNavigate();
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    setFeedbackMessage(null);
    console.log("Registration form submitted:", data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success response
    // In a real app, you would handle API errors here
    const registrationSuccessful = true; // Simulate successful registration

    if (registrationSuccessful) {
      setFeedbackMessage({
        type: 'success',
        title: 'Registration Successful!',
        message: "Your account has been created. You will be redirected to login shortly."
      });
      setTimeout(() => {
        navigate("/"); // Navigate to LoginPage (path "/" or "/login")
      }, 3000);
    } else {
      // Simulate error response
      setFeedbackMessage({
        type: 'error',
        title: 'Registration Failed',
        message: "Could not create your account. Please try again." // Or specific error from API
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader isAuthenticated={false} />
      <main className="flex-grow">
        <AuthFormWrapper
          title="Create an Account"
          description="Enter your information below to get started."
          logoText="AuthApp" // Consistent with AppHeader
        >
          {feedbackMessage && (
            <Alert variant={feedbackMessage.type === 'error' ? 'destructive' : 'default'} className="mb-6">
              {feedbackMessage.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
              <AlertTitle>{feedbackMessage.title}</AlertTitle>
              <AlertDescription>{feedbackMessage.message}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link to="/" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </div>
        </AuthFormWrapper>
      </main>
      <AppFooter />
    </div>
  );
};

export default RegistrationPage;
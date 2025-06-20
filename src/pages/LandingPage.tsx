import React from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader'; // Custom component
import AppFooter from '@/components/layout/AppFooter'; // Custom component
import { Button } from '@/components/ui/button'; // shadcn/ui
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'; // shadcn/ui
import { Textarea } from '@/components/ui/textarea'; // shadcn/ui
import { Input } from '@/components/ui/input'; // shadcn/ui
import { Label } from '@/components/ui/label'; // shadcn/ui
import { Zap, ShieldLock, Users, MessageSquare } from 'lucide-react'; // Icons for features

const LandingPage = () => {
  console.log('LandingPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background">
      <AppHeader isAuthenticated={false} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-background dark:from-primary/10">
          <div className="container px-4 mx-auto text-center">
            <Card className="max-w-3xl mx-auto shadow-lg border-none bg-transparent">
              <CardHeader className="pb-4">
                <CardTitle className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
                  Welcome to AuthApp
                </CardTitle>
                <CardDescription className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                  A secure and user-friendly platform for seamless authentication. Manage your access with confidence and ease.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mt-2 text-gray-700 dark:text-gray-200">
                  Our mission is to provide a robust authentication solution that protects your valuable data while offering a smooth user experience.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/">Login to Your Account</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link to="/registration">Create New Account</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20 bg-white dark:bg-muted/20">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
              Why Choose AuthApp?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <ShieldLock className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Top-Tier Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    State-of-the-art encryption and security protocols to keep your account safe.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Quick login and registration processes designed for efficiency.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">User-Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Intuitive interface that makes account management straightforward.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact/Feedback Section with Textarea */}
        <section className="py-16 md:py-20 bg-gray-100 dark:bg-background">
          <div className="container px-4 mx-auto">
            <Card className="max-w-2xl mx-auto shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">
                  Get in Touch or Leave Feedback
                </CardTitle>
                <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">
                  We'd love to hear from you!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email-feedback" className="text-gray-700 dark:text-gray-200">Your Email (Optional)</Label>
                  <Input type="email" id="email-feedback" placeholder="you@example.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message-feedback" className="text-gray-700 dark:text-gray-200">Your Message</Label>
                  <Textarea
                    id="message-feedback"
                    placeholder="Type your message, feedback, or questions here..."
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => alert('Feedback submission placeholder!')}
                    className="flex items-center"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
};

export default LandingPage;
'use client'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginForm {
    username: string
    password: string
}

interface SignupForm {
    username: string
    email: string
    password: string
}

export default function AuthForm() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const loginForm = useForm<LoginForm>()
    const signupForm = useForm<SignupForm>()

    const onLogin = async (data: LoginForm) => {
        try {
            setIsLoading(true)
            setError('')

            const response = await fetch('http://127.0.0.1:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Login failed')
            }

            const result = await response.json()
            // Store token in localStorage or other state management solution
            localStorage.setItem('token', result.token)
            // Redirect or update UI state

            navigate('/dashboard')
        } catch (err) {
            setError('Login failed. Please check your credentials.')
        } finally {
            setIsLoading(false)
        }
    }

    const onSignup = async (data: SignupForm) => {
        try {
            setIsLoading(true)
            setError('')

            const response = await fetch('http://127.0.0.1:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Signup failed')
            }

            // Automatically log in user or show success message

            navigate('/dashboard')
        } catch (err) {
            setError('Signup failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Metronome</CardTitle>
                        <CardDescription className="text-center">Login or create an account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="signup">Sign up</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <form onSubmit={loginForm.handleSubmit(onLogin)}>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Username</Label>
                                            <Input
                                                {...loginForm.register('username', { required: 'Username is required' })}
                                                id="username"
                                                placeholder="johndoe"
                                            />
                                            {loginForm.formState.errors.username && (
                                                <p className="text-red-500 text-sm">{loginForm.formState.errors.username.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    {...loginForm.register('password', { required: 'Password is required' })}
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-gray-500" />
                                                    )}
                                                </Button>
                                            </div>
                                            {loginForm.formState.errors.password && (
                                                <p className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                                        {isLoading ? 'Loading...' : 'Login'}
                                    </Button>
                                </form>
                            </TabsContent>
                            <TabsContent value="signup">
                                <form onSubmit={signupForm.handleSubmit(onSignup)}>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="signup-username">Username</Label>
                                            <Input
                                                {...signupForm.register('username', { required: 'Username is required' })}
                                                id="signup-username"
                                                placeholder="johndoe"
                                            />
                                            {signupForm.formState.errors.username && (
                                                <p className="text-red-500 text-sm">{signupForm.formState.errors.username.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="signup-email">Email</Label>
                                            <Input
                                                {...signupForm.register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    }
                                                })}
                                                id="signup-email"
                                                type="email"
                                                placeholder="m@example.com"
                                            />
                                            {signupForm.formState.errors.email && (
                                                <p className="text-red-500 text-sm">{signupForm.formState.errors.email.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="signup-password">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    {...signupForm.register('password', {
                                                        required: 'Password is required',
                                                        minLength: {
                                                            value: 8,
                                                            message: 'Password must be at least 8 characters'
                                                        }
                                                    })}
                                                    id="signup-password"
                                                    type={showPassword ? "text" : "password"}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-gray-500" />
                                                    )}
                                                </Button>
                                            </div>
                                            {signupForm.formState.errors.password && (
                                                <p className="text-red-500 text-sm">{signupForm.formState.errors.password.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                                        {isLoading ? 'Loading...' : 'Sign up'}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-center text-gray-500 w-full">
                            Metronome is a trademark of AsteriskLab
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}


import { CalendarIcon, Users, DoorOpen, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b">
                <div className="flex h-16 items-center px-4 gap-8">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100">
                            <div className="h-full w-full rounded-full border-4 border-blue-500" />
                        </div>
                        <span className="font-semibold">Metronome</span>
                    </div>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link to="/dashboard" className="text-blue-600">Dashboard</Link>
                        <Link to="/routine" className="text-muted-foreground">Routine</Link>
                        <Link to="/not-implemented" className="text-muted-foreground">Rooms</Link>
                        <Link to="/not-implemented" className="text-muted-foreground">Courses</Link>
                        <Link to="/not-implemented" className="text-muted-foreground">Teacher</Link>
                        <Link to="/not-implemented" className="text-muted-foreground">Department</Link>
                        <Link to="/not-implemented" className="text-muted-foreground">Reports</Link>
                    </nav>
                    <div className="ml-auto flex items-center gap-2">
                        <Avatar>
                            <AvatarImage alt="Adam Smith" />
                            <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                            <div>Washiul Alam Shohan</div>
                            <div className="text-xs text-muted-foreground">Admin</div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-4 space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Current Routine</h3>
                                <div className="text-2xl font-bold">Spring 2024</div>
                                <div className="text-xs text-muted-foreground">Revision: 4</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Number of class today</h3>
                                <div className="text-2xl font-bold">156</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Free Rooms</h3>
                                <div className="text-2xl font-bold">2</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Slot conflicts</h3>
                                <div className="text-2xl font-bold text-red-500">3</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Quick Actions</h2>
                    <div className="flex gap-2">
                        <Button><Link to="/teacher-routine-search" className="text-white">Search by Initial</Link></Button>
                        <Button>Add/Remove Classes</Button>
                        <Button>Add/Remove Rooms</Button>
                        <Button>Add/Remove Courses</Button>
                        <Button>Add/Remove Teachers</Button>
                    </div>
                </div>

                {/* Updates and Calendar */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                        <h2 className="text-lg font-semibold">Updates</h2>
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                                <Card key={i}>
                                    <CardContent className="p-4">
                                        <h3 className="font-medium mb-1">Class Added</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Added a class in Slot 1 (8:30 - 9:45) for Washiul Alam (00000001) on Tuesday
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}


import { useState } from 'react'
import { ChevronDown, ChevronRight, MoreVertical, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function TeacherRoutineSearch() {
    interface RoutineItem {
        key: number
        roomId: string
        teacherInitial: string
        section: string
        courseCode: string
        dayId: string
        startTime: string
        endTime: string
        employeeId: string
        dept: string
    }

    const [scheduleData, setScheduleData] = useState<RoutineItem[]>([])
    const [teacherInitial, setTeacherInitial] = useState('')
    const [showRoutine, setShowRoutine] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const timeSlots = [
        "8:30 - 9:45",
        "9:45 - 11:00",
        "11:00 - 12:15",
        "12:15 - 13:30",
    ]

    const ScheduleData: RoutineItem[] = [
    ]

    const handleSearch = async () => {
        try {
            if (!teacherInitial) {
                return;
            }

            setIsLoading(true);
            setError(null);

            const response = await fetch(`http://127.0.0.1:8080/api/routines/teacher/${teacherInitial}`);
            if (!response.ok) {
                throw new Error('Failed to fetch teacher routine');
            }

            const data = await response.json();
            setScheduleData(data);
            setShowRoutine(true);
        } catch (error) {
            setError('Failed to fetch routine data');
            console.error('Failed to fetch routine:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
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
                        <Link to="/rooms" className="text-muted-foreground">Rooms</Link>
                        <Link to="/courses" className="text-muted-foreground">Courses</Link>
                        <Link to="/teacher" className="text-muted-foreground">Teacher</Link>
                        <Link to="/department" className="text-muted-foreground">Department</Link>
                        <Link to="/reports" className="text-muted-foreground">Reports</Link>
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
            <div className="min-h-screen bg-background p-8">
                <h1 className="text-2xl font-bold mb-6">Search routine by Teacher Initial</h1>
                <div className="flex gap-4 mb-8">
                    <Input
                        placeholder="Enter teacher initial"
                        value={teacherInitial}
                        onChange={(e) => setTeacherInitial(e.target.value)}
                        className="max-w-xs"
                    />
                    <Button onClick={handleSearch}>View Routine</Button>
                </div>

                {showRoutine && (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-2">
                                {timeSlots.map((slot) => (
                                    <div
                                        key={slot}
                                        className="px-4 py-2 bg-gray-100 rounded-md text-sm"
                                    >
                                        {slot}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline">Verify</Button>
                                <Button className="bg-red-500 hover:bg-red-600">Update</Button>
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12"></TableHead>
                                    <TableHead>Room</TableHead>
                                    <TableHead>Section</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scheduleData.map((row) => (
                                    <TableRow key={row.key}>
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>{row.roomId}</TableCell>
                                        <TableCell>{row.section}</TableCell>
                                        <TableCell className="relative">
                                            {row.courseCode}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {scheduleData.length === 0 && showRoutine && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-4">
                                            No routine data found for this teacher
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </>
                )}
            </div>
        </>
    )
}

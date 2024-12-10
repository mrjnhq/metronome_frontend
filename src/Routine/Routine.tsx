import { ChevronDown, ChevronRight, MoreVertical, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Checkbox } from "@/components/ui/checkbox"
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface RoutineItem {
    id: number
    day: string
    time: string
    room: string
    section: string
    courseCode: string
    courseName: string
    teacherInitial: string
}

export default function Routine() {
    const [scheduleData, setScheduleData] = useState<RoutineItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedDay, setSelectedDay] = useState<string | null>(null)

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8080/api/routines')
                if (!response.ok) {
                    throw new Error('Failed to fetch routines')
                }
                const data = await response.json()
                setScheduleData(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch routines')
            } finally {
                setLoading(false)
            }
        }

        fetchRoutines()
    }, [])

    const timeSlots = [
        "8:30 - 9:45",
        "9:45 - 11:00",
        "11:00 - 12:15",
        "12:15 - 13:30",
        "13:30 - 14:15",
        "14:15 - 15:45",
        "15:45 - 16:00",
    ]

    const sections = [
        {
            name: "Section J",
            expanded: true,
            days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        },
    ]

    const filteredScheduleData = scheduleData.filter(item =>
        !selectedDay || item.day === selectedDay
    )

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
                        <Link to="/dashboard" className="text-muted-foreground">Dashboard</Link>
                        <Link to="/routine" className="text-blue-600">Routine</Link>
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
                            <div>Adam Smith</div>
                            <div className="text-xs text-muted-foreground">Admin</div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 border-r p-4">
                    <Select defaultValue="64">
                        <SelectTrigger>
                            <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="64">Batch 64</SelectItem>
                            <SelectItem value="63">Batch 63</SelectItem>
                            <SelectItem value="62">Batch 62</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="mt-4 space-y-1">
                        {sections.map((section) => (
                            <div key={section.name}>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-between font-normal"
                                >
                                    {section.name}
                                    {section.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </Button>
                                {section.expanded && section.days && (
                                    <div className="ml-4 space-y-1">
                                        {section.days.map((day) => (
                                            <Button
                                                key={day}
                                                variant="ghost"
                                                className={`w-full justify-start font-normal ${selectedDay === day ? 'bg-blue-100 text-blue-600' : ''
                                                    }`}
                                                onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                                            >
                                                {day}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4">
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
                                <TableHead>Time</TableHead>
                                <TableHead>Room</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Teacher</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                                </TableRow>
                            ) : error ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-red-500">{error}</TableCell>
                                </TableRow>
                            ) : filteredScheduleData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                                        No classes scheduled for {selectedDay || 'any day'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredScheduleData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell>{row.room}</TableCell>
                                        <TableCell>{row.section}</TableCell>
                                        <TableCell>
                                            {row.courseCode} - {row.courseName}
                                        </TableCell>
                                        <TableCell>{row.teacherInitial}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <div className="mt-4 text-sm text-muted-foreground">
                        No changes pending
                    </div>
                </div>
            </div>
        </div>
    )
}

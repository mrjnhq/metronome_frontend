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
import { useEffect, useState, useMemo, useCallback } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Import additional components at top
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// First, update the interface
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

// Update AddClassForm interface
interface AddClassForm {
    courseCode: string
    roomId: string
    teacherInitial: string
    employeeId: string
    section: string
    startTime: string
    endTime: string
    dayId: string   // Added
    dept: string    // Added
}

// Add this constant for day mapping
const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

// Add utility function to convert dayId to day name
const getDayName = (dayId: string) => {
    const id = parseInt(dayId);
    return DAYS[id];
}

// Define validation schema
const formSchema = z.object({
    courseCode: z.string().min(1, "Course code is required"),
    roomId: z.string().min(1, "Room ID is required"),
    teacherInitial: z.string().min(1, "Teacher initial is required"),
    employeeId: z.string().min(1, "Employee ID is required"),
    section: z.string().min(1, "Section is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    dayId: z.string().min(1, "Day is required"),
    dept: z.string().min(1, "Department is required")
})

export default function Routine() {
    const [scheduleData, setScheduleData] = useState<RoutineItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedDay, setSelectedDay] = useState<string | null>(null)
    const [expandedSections, setExpandedSections] = useState<string[]>([])
    const [selectedSection, setSelectedSection] = useState<string | null>(null)
    const [selectedBatch, setSelectedBatch] = useState("64");
    const [dialogOpen, setDialogOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            courseCode: "",
            roomId: "",
            teacherInitial: "",
            employeeId: "",
            section: "",
            startTime: "",
            endTime: "",
            dayId: "",
            dept: "CSE"
        }
    })
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Add state for delete dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<RoutineItem | null>(null);

    // Add delete handler
    const handleDelete = async (classItem: RoutineItem) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/api/routines/${classItem.key}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete class');
            }

            setScheduleData(prev => prev.filter(item => item.key !== classItem.key));
            setDeleteDialogOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete class');
        }
    };

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

    const sections = useMemo(() =>
        Array.from({ length: 20 }, (_, i) => ({
            name: `Section ${String.fromCharCode(65 + i)}`,
            expanded: false,
            days: DAYS
        })),
        []);

    // Update the filter logic to handle both section and day filtering
    const filteredScheduleData = useMemo(() =>
        scheduleData.filter(item => {
            // Get the section letter from section name (e.g., "Section J" -> "J")
            const sectionLetter = selectedSection?.split(' ')[1];

            // Check if section matches pattern "64_J" where J is the selected section
            const sectionMatch = !selectedSection || item.section.endsWith(`${selectedBatch}_${sectionLetter}`);

            // Check if day matches
            const dayMatch = !selectedDay || getDayName(item.dayId) === selectedDay;

            return sectionMatch && dayMatch;
        }),
        [scheduleData, selectedSection, selectedBatch, selectedDay]
    );

    // In the component, modify how we display the time
    const getFormattedTime = (startTime: string, endTime: string) => {
        return `${startTime} - ${endTime}`
    }

    // Update onSubmit handler to use form data directly
    const onSubmit = useCallback(async (data: AddClassForm) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('http://127.0.0.1:8080/api/routines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    dept: 'CSE' // Only hardcode dept, use form dayId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add class');
            }

            const newClass = await response.json();
            setScheduleData(prev => [...prev, newClass]);
            setDialogOpen(false);
            form.reset();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add class');
        } finally {
            setIsSubmitting(false);
        }
    }, [form, setScheduleData, setError]);

    const handleSectionClick = useCallback((sectionName: string) => {
        setExpandedSections(current =>
            current.includes(sectionName)
                ? current.filter(name => name !== sectionName)
                : [...current, sectionName]
        );
        setSelectedSection(sectionName);
    }, []);

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

            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 border-r p-4">
                    <Select
                        value={selectedBatch}
                        onValueChange={setSelectedBatch}
                    >
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
                                    className={`w-full justify-between font-normal ${selectedSection === section.name ? 'bg-blue-100 text-blue-600' : ''
                                        }`}
                                    onClick={() => handleSectionClick(section.name)}
                                >
                                    {section.name}
                                    {expandedSections.includes(section.name)
                                        ? <ChevronDown className="h-4 w-4" />
                                        : <ChevronRight className="h-4 w-4" />}
                                </Button>
                                {expandedSections.includes(section.name) && section.days && (
                                    <div className="ml-4 space-y-1">
                                        {section.days.map((day) => (
                                            <Button
                                                key={day}
                                                variant="ghost"
                                                className={`w-full justify-start font-normal ${selectedDay === day ? 'bg-blue-100 text-blue-600' : ''
                                                    }`}
                                                onClick={() => {
                                                    // Just toggle day selection without affecting section
                                                    setSelectedDay(day === selectedDay ? null : day);
                                                }}
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
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Add Class</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Add New Class</DialogTitle>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="courseCode"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Course Code</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="CSE101" />
                                                        </FormControl>
                                                        <FormMessage /> {/* Shows validation errors */}
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="roomId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Room ID</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="KT-308" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="teacherInitial"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Teacher Initial</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="SHS" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="employeeId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Employee ID</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="00000001" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="section"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Section</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="64_J" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="startTime"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Start Time</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} type="time" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="endTime"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>End Time</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} type="time" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="dayId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Day</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select day" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {DAYS.map((day, index) => (
                                                                    <SelectItem key={index} value={index.toString()}>
                                                                        {day}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="dept"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Department</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="CSE" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <DialogFooter>
                                                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button type="submit" disabled={isSubmitting}>
                                                    {isSubmitting ? "Adding..." : "Add Class"}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                    {error && (
                                        <div className="text-red-500 text-sm mt-2">
                                            {error}
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
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
                                    // Update the table row mapping
                                    <TableRow key={row.key}>
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>{getFormattedTime(row.startTime, row.endTime)}</TableCell>
                                        <TableCell>{row.roomId}</TableCell>
                                        <TableCell>{row.section}</TableCell>
                                        <TableCell>
                                            {row.courseCode}
                                        </TableCell>
                                        <TableCell>{row.teacherInitial}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                                        <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem onSelect={(e) => {
                                                                e.preventDefault();
                                                                setSelectedClass(row);
                                                            }}>
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete this class.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    className="bg-red-500 hover:bg-red-600"
                                                                    onClick={() => selectedClass && handleDelete(selectedClass)}
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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

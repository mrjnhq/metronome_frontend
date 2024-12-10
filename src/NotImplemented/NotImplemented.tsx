import { ArrowLeft, Construction } from 'lucide-react'

export default function NotImplemented() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <Construction className="w-24 h-24 text-yellow-500 mx-auto" />
                <h1 className="text-4xl font-bold tracking-tight">Not Implemented Yet</h1>
                <p className="text-xl text-muted-foreground max-w-md mx-auto">
                    We're working hard to bring you this feature. Please check back later!
                </p>
            </div>
        </div>
    )
}


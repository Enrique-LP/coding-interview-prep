import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Problem } from "@/types"

interface ProblemCardProps {
    problem: Problem
}

export function ProblemCard({ problem }: ProblemCardProps) {
    const difficultyColor = {
        Easy: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        Medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        Hard: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    }[problem.difficulty] || "bg-gray-500/10 text-gray-500"

    return (
        <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={difficultyColor}>
                        {problem.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">
                        {problem.topic}
                    </Badge>
                </div>
                <CardTitle className="text-xl text-zinc-100 group-hover:text-primary transition-colors">
                    {problem.title}
                </CardTitle>
                <CardDescription className="text-zinc-400 line-clamp-2">
                    {problem.description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Link href={`/problem/${problem.id}`} className="w-full">
                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        Start Practice <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Code2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepInstructionProps {
    stepNumber: number
    instruction: string
    hint?: string
    solutionCode?: string
    isActive?: boolean
}

export function StepInstruction({ stepNumber, instruction, hint, solutionCode, isActive = true }: StepInstructionProps) {
    const [showHint, setShowHint] = useState(false)
    const [showSolution, setShowSolution] = useState(false)

    return (
        <Card className={cn(
            "border-l-4 transition-all duration-300",
            isActive ? "border-l-primary bg-card/50 shadow-lg" : "border-l-muted bg-muted/20 opacity-60"
        )}>
            <CardHeader className="pb-2">
                <CardTitle className={cn(
                    "text-lg font-medium flex justify-between items-center",
                    isActive ? "text-primary" : "text-muted-foreground"
                )}>
                    <span>Step {stepNumber}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-base leading-relaxed">{instruction}</p>

                {isActive && (
                    <div className="flex flex-col gap-2 pt-2">
                        {hint && (
                            <div className="space-y-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowHint(!showHint)}
                                    className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 w-full justify-start"
                                >
                                    <Lightbulb className="w-4 h-4 mr-2" />
                                    {showHint ? "Hide Hint" : "Show Hint"}
                                    {showHint ? <ChevronUp className="ml-auto w-4 h-4" /> : <ChevronDown className="ml-auto w-4 h-4" />}
                                </Button>
                                {showHint && (
                                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3 text-sm text-yellow-200 animate-in fade-in slide-in-from-top-2">
                                        {hint}
                                    </div>
                                )}
                            </div>
                        )}

                        {solutionCode && (
                            <div className="space-y-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowSolution(!showSolution)}
                                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 w-full justify-start"
                                >
                                    <Code2 className="w-4 h-4 mr-2" />
                                    {showSolution ? "Hide Solution" : "Show Solution"}
                                    {showSolution ? <ChevronUp className="ml-auto w-4 h-4" /> : <ChevronDown className="ml-auto w-4 h-4" />}
                                </Button>
                                {showSolution && (
                                    <div className="bg-zinc-950 border border-zinc-800 rounded-md p-3 overflow-x-auto animate-in fade-in slide-in-from-top-2">
                                        <code className="text-sm font-mono text-blue-300 whitespace-pre">
                                            {solutionCode}
                                        </code>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

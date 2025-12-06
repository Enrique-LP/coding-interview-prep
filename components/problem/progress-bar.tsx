import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
    currentStep: number
    totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = ((currentStep + 1) / totalSteps) * 100

    return (
        <div className="mb-8 space-y-2">
            <div className="flex justify-between text-sm font-medium text-zinc-400">
                <span>Progress</span>
                <span>Step {currentStep + 1} of {totalSteps}</span>
            </div>
            <Progress value={progress} className="h-2" />
        </div>
    )
}

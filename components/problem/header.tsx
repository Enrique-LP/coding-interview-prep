import { Badge } from "@/components/ui/badge"

import { Problem } from "@/types"

interface ProblemHeaderProps {
    problem: Problem
}

export function ProblemHeader({ problem }: ProblemHeaderProps) {
    return (
        <div className="space-y-6 text-white">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">{problem.title}</h1>
                <div className="flex gap-2 mb-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium
            ${problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'}`}>
                        {problem.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-300">
                        {problem.topic}
                    </span>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                    {problem.description}
                </p>
            </div>

            {problem.examples && problem.examples.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Examples</h3>
                    {problem.examples.map((example, index) => (
                        <div key={index} className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 space-y-2">
                            <div>
                                <span className="font-medium text-zinc-400">Input:</span>{" "}
                                <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">{example.input}</code>
                            </div>
                            <div>
                                <span className="font-medium text-zinc-400">Output:</span>{" "}
                                <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">{example.output}</code>
                            </div>
                            {example.explanation && (
                                <div className="text-sm text-zinc-400">
                                    <span className="font-medium">Explanation:</span> {example.explanation}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {problem.constraints && problem.constraints.length > 0 && (
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Constraints</h3>
                    <ul className="list-disc list-inside space-y-1 text-zinc-300">
                        {problem.constraints.map((constraint, index) => (
                            <li key={index} className="font-mono text-sm">{constraint}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

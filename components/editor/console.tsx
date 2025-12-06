import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ConsoleProps {
    output: { type: "stdout" | "stderr"; text: string }[]
    className?: string
}

export function Console({ output, className }: ConsoleProps) {
    return (
        <div className={cn("bg-zinc-900 border-t border-zinc-800 flex flex-col", className)}>
            <div className="px-4 py-2 border-b border-zinc-800 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Console Output
            </div>
            <ScrollArea className="flex-1 p-4 font-mono text-sm">
                {output.length === 0 ? (
                    <span className="text-muted-foreground/50 italic">Run your code to see output...</span>
                ) : (
                    output.map((line, i) => (
                        <div key={i} className={cn(
                            "whitespace-pre-wrap",
                            line.type === "stderr" ? "text-red-400" : "text-zinc-300"
                        )}>
                            {line.text}
                        </div>
                    ))
                )}
            </ScrollArea>
        </div>
    )
}

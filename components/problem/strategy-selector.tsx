import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StrategyType } from "@/types"

interface StrategySelectorProps {
    selectedStrategy: StrategyType
    onSelectStrategy: (strategy: StrategyType) => void
}

export function StrategySelector({ selectedStrategy, onSelectStrategy }: StrategySelectorProps) {
    return (
        <Tabs value={selectedStrategy} onValueChange={(v) => onSelectStrategy(v as StrategyType)} className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="brute-force">Brute Force</TabsTrigger>
                <TabsTrigger value="optimal">Optimal Solution</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

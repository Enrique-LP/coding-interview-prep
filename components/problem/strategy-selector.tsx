import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StrategyType, Strategy } from "@/types"

interface StrategySelectorProps {
    selectedStrategy: StrategyType
    onSelectStrategy: (strategy: StrategyType) => void
    strategies: Record<string, Strategy>
}

export function StrategySelector({ selectedStrategy, onSelectStrategy, strategies }: StrategySelectorProps) {
    const strategyKeys = Object.keys(strategies)

    return (
        <Tabs value={selectedStrategy} onValueChange={(v) => onSelectStrategy(v as StrategyType)} className="w-full mb-8">
            <TabsList className={`grid w-full`} style={{ gridTemplateColumns: `repeat(${strategyKeys.length}, minmax(0, 1fr))` }}>
                {strategyKeys.map((key) => (
                    <TabsTrigger key={key} value={key}>
                        {strategies[key].name}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}

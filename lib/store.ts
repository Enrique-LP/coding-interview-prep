import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Problem, StrategyType, Step } from '@/types'

interface SavedState {
    currentStepIndex: number
    code: string
    completedSteps: number[]
}

interface State {
    problem: Problem | null
    currentStrategy: StrategyType
    currentStepIndex: number
    code: string
    completedSteps: number[] // Array of step IDs that are completed
    savedProgress: Record<string, Record<string, SavedState>> // problemId -> strategyId -> SavedState

    // Actions
    setProblem: (problem: Problem) => void
    setStrategy: (strategy: StrategyType) => void
    setCode: (code: string) => void
    validateStep: () => boolean
    resetProblem: () => void
}

export const useStore = create<State>()(
    persist(
        (set, get) => ({
            problem: null,
            currentStrategy: 'brute-force',
            currentStepIndex: 0,
            code: '',
            completedSteps: [],
            savedProgress: {},

            setProblem: (problem) => {
                const { savedProgress } = get()
                // Default to brute-force when loading a new problem
                const defaultStrategy = 'brute-force'
                const saved = savedProgress[problem.id]?.[defaultStrategy]

                if (saved) {
                    set({
                        problem,
                        currentStrategy: defaultStrategy,
                        currentStepIndex: saved.currentStepIndex,
                        code: saved.code,
                        completedSteps: saved.completedSteps
                    })
                } else {
                    set({
                        problem,
                        currentStrategy: defaultStrategy,
                        currentStepIndex: 0,
                        code: '',
                        completedSteps: []
                    })
                }
            },

            setStrategy: (strategy) => {
                const { savedProgress, problem } = get()
                if (!problem) return

                const saved = savedProgress[problem.id]?.[strategy]

                set({
                    currentStrategy: strategy,
                    currentStepIndex: saved?.currentStepIndex ?? 0,
                    code: saved?.code ?? '',
                    completedSteps: saved?.completedSteps ?? []
                })
            },

            setCode: (code) => set((state) => {
                if (!state.problem) return { code }

                const problemProgress = state.savedProgress[state.problem.id] || {}

                const newProgress = {
                    ...state.savedProgress,
                    [state.problem.id]: {
                        ...problemProgress,
                        [state.currentStrategy]: {
                            currentStepIndex: state.currentStepIndex,
                            code: code,
                            completedSteps: state.completedSteps
                        }
                    }
                }
                return { code, savedProgress: newProgress }
            }),

            validateStep: () => {
                const { problem, currentStrategy, currentStepIndex, code } = get()
                if (!problem) return false

                const strategy = problem.strategies[currentStrategy]
                const step = strategy.steps[currentStepIndex]

                if (!step) return false

                // Normalize code: remove extra whitespace and newlines for easier regex matching
                // This allows matching multi-line inputs as a single stream of text
                const normalizedCode = code.trim().replace(/\s+/g, ' ')

                // We also check against the raw last line for backward compatibility 
                // or for simple single-line steps where user just typed the new line
                const lines = code.trim().split('\n')
                const lastLine = lines[lines.length - 1].trim()

                const regex = new RegExp(step.validationRegex)

                // Try matching against the normalized full code (for multi-line steps)
                // OR against just the last line (for standard single-line steps)
                const isValid = regex.test(normalizedCode) || regex.test(lastLine)

                if (isValid) {
                    // Move to next step
                    const nextStepIndex = currentStepIndex + 1

                    set((state) => {
                        const newCompletedSteps = [...state.completedSteps, step.id]

                        const problemProgress = state.savedProgress[state.problem!.id] || {}

                        const newProgress = {
                            ...state.savedProgress,
                            [state.problem!.id]: {
                                ...problemProgress,
                                [state.currentStrategy]: {
                                    currentStepIndex: nextStepIndex,
                                    code: state.code,
                                    completedSteps: newCompletedSteps
                                }
                            }
                        }
                        return {
                            completedSteps: newCompletedSteps,
                            currentStepIndex: nextStepIndex,
                            savedProgress: newProgress
                        }
                    })
                    return true
                }

                return false
            },

            resetProblem: () => set((state) => {
                if (!state.problem) return {}

                // Remove the current problem from savedProgress
                const { [state.problem.id]: _, ...remainingProgress } = state.savedProgress

                return {
                    savedProgress: remainingProgress,
                    currentStepIndex: 0,
                    code: '',
                    completedSteps: []
                }
            })
        }),
        {
            name: 'interview-platform-storage',
            partialize: (state) => ({ savedProgress: state.savedProgress }),
        }
    )
)

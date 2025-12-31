"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { ProblemHeader } from "@/components/problem/header"
import { ProgressBar } from "@/components/problem/progress-bar"
import { StrategySelector } from "@/components/problem/strategy-selector"
import { StepInstruction } from "@/components/problem/step-instruction"
import { CodeEditor } from "@/components/editor/code-editor"
import { Console } from "@/components/editor/console"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Check } from "lucide-react"
import { useStore } from "@/lib/store"
import { usePyodide } from "@/hooks/use-pyodide"
import { Problem } from "@/types"
import { Toaster, toast } from "sonner"
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable"
import { cn } from "@/lib/utils"
import CompletionScreen from "@/components/problem/completion-screen"

// Load problem data
import twoSumData from "@/data/problems/two-sum.json"
import reverseStringData from "@/data/problems/reverse-string.json"
import palindromeNumberData from "@/data/problems/palindrome-number.json"
import containsDuplicateData from "@/data/problems/contains-duplicate.json"
import validAnagramData from "@/data/problems/valid-anagram.json"
import groupAnagramsData from "@/data/problems/group-anagrams.json"
import topKFrequentData from "@/data/problems/top-k-frequent-elements.json"
import productExceptSelfData from "@/data/problems/product-of-array-except-self.json"
import validSudokuData from "@/data/problems/valid-sudoku.json"
import encodeDecodeData from "@/data/problems/encode-and-decode-strings.json"
import longestConsecutiveData from "@/data/problems/longest-consecutive-sequence.json"
import validPalindromeData from "@/data/problems/valid-palindrome.json"
import twoSumIiData from "@/data/problems/two-sum-ii.json"
import threeSumData from "@/data/problems/3sum.json"
import containerMostWaterData from "@/data/problems/container-with-most-water.json"
import trappingRainWaterData from "@/data/problems/trapping-rain-water.json"
import validParenthesesData from "@/data/problems/valid-parentheses.json"
import bestTimeStockData from "@/data/problems/best-time-to-buy-and-sell-stock.json"
import longestSubstringData from "@/data/problems/longest-substring-without-repeating-characters.json"
import longestRepeatingData from "@/data/problems/longest-repeating-character-replacement.json"
import permutationStringData from "@/data/problems/permutation-in-string.json"
import minWindowSubstringData from "@/data/problems/minimum-window-substring.json"
import slidingWindowMaxData from "@/data/problems/sliding-window-maximum.json"
import minStackData from "@/data/problems/min-stack.json"
import evalRpnData from "@/data/problems/evaluate-reverse-polish-notation.json"
import generateParenthesesData from "@/data/problems/generate-parentheses.json"
import dailyTemperaturesData from "@/data/problems/daily-temperatures.json"
import carFleetData from "@/data/problems/car-fleet.json"
import largestRectangleData from "@/data/problems/largest-rectangle-in-histogram.json"
import binarySearchData from "@/data/problems/binary-search.json"
import searchMatrixData from "@/data/problems/search-a-2d-matrix.json"
import kokoBananasData from "@/data/problems/koko-eating-bananas.json"
import findMinRotatedData from "@/data/problems/find-minimum-in-rotated-sorted-array.json"
import searchRotatedData from "@/data/problems/search-in-rotated-sorted-array.json"
import timeMapData from "@/data/problems/time-based-key-value-store.json"
import medianSortedArraysData from "@/data/problems/median-of-two-sorted-arrays.json"
import reverseLinkedListData from "@/data/problems/reverse-linked-list.json"
import mergeTwoListsData from "@/data/problems/merge-two-sorted-lists.json"
import reorderListData from "@/data/problems/reorder-list.json"
import removeNthNodeData from "@/data/problems/remove-nth-node-from-end-of-list.json"
import copyRandomListData from "@/data/problems/copy-list-with-random-pointer.json"
import addTwoNumbersData from "@/data/problems/add-two-numbers.json"
import linkedListCycleData from "@/data/problems/linked-list-cycle.json"
import findDuplicateData from "@/data/problems/find-the-duplicate-number.json"
import lruCacheData from "@/data/problems/lru-cache.json"
import mergeKListsData from "@/data/problems/merge-k-sorted-lists.json"
import reverseKGroupData from "@/data/problems/reverse-nodes-in-k-group.json"
import countGoodNodesData from "@/data/problems/count-good-nodes-in-binary-tree.json"
import rightSideViewData from "@/data/problems/binary-tree-right-side-view.json"
import buildTreeData from "@/data/problems/construct-binary-tree-from-preorder-and-inorder-traversal.json"
import maxPathSumData from "@/data/problems/binary-tree-maximum-path-sum.json"
import serializeDeserializeData from "@/data/problems/serialize-and-deserialize-binary-tree.json"
import trieData from "@/data/problems/implement-trie-prefix-tree.json"
import wordDictionaryData from "@/data/problems/design-add-and-search-words-data-structure.json"
import wordSearchIiData from "@/data/problems/word-search-ii.json"
import kthLargestData from "@/data/problems/kth-largest-element-in-an-array.json"
import taskSchedulerData from "@/data/problems/task-scheduler.json"
import designTwitterData from "@/data/problems/design-twitter.json"
import findMedianData from "@/data/problems/find-median-from-data-stream.json"
import combinationSum2Data from "@/data/problems/combination-sum-ii.json"
import wordSearchData from "@/data/problems/word-search.json"
import palindromePartitioningData from "@/data/problems/palindrome-partitioning.json"
import letterCombinationsData from "@/data/problems/letter-combinations-of-a-phone-number.json"
import nQueensData from "@/data/problems/n-queens.json"
import redundantConnectionData from "@/data/problems/redundant-connection.json"
import wordLadderData from "@/data/problems/word-ladder.json"
import reconstructItineraryData from "@/data/problems/reconstruct-itinerary.json"
import minCostConnectPointsData from "@/data/problems/min-cost-to-connect-all-points.json"
import networkDelayTimeData from "@/data/problems/network-delay-time.json"
import swimInRisingWaterData from "@/data/problems/swim-in-rising-water.json"
import cheapestFlightsData from "@/data/problems/cheapest-flights-within-k-stops.json"
import partitionEqualSubsetSumData from "@/data/problems/partition-equal-subset-sum.json"
import graphValidTreeData from "@/data/problems/graph-valid-tree.json"
import countComponentsData from "@/data/problems/number-of-connected-components-in-an-undirected-graph.json"
import alienDictionaryData from "@/data/problems/alien-dictionary.json"
import wallsAndGatesData from "@/data/problems/walls-and-gates.json"
import minIntervalData from "@/data/problems/minimum-interval-to-include-each-query.json"
import invertTreeData from "@/data/problems/invert-binary-tree.json"
import maxDepthData from "@/data/problems/maximum-depth-of-binary-tree.json"
import diameterTreeData from "@/data/problems/diameter-of-binary-tree.json"
import balancedTreeData from "@/data/problems/balanced-binary-tree.json"
import sameTreeData from "@/data/problems/same-tree.json"
import subtreeData from "@/data/problems/subtree-of-another-tree.json"
import lcaData from "@/data/problems/lowest-common-ancestor-of-a-binary-search-tree.json"
import levelOrderData from "@/data/problems/binary-tree-level-order-traversal.json"
import validateBstData from "@/data/problems/validate-binary-search-tree.json"
import kthSmallestData from "@/data/problems/kth-smallest-element-in-a-bst.json"
import kthLargestStreamData from "@/data/problems/kth-largest-element-in-a-stream.json"
import lastStoneWeightData from "@/data/problems/last-stone-weight.json"
import kClosestPointsData from "@/data/problems/k-closest-points-to-origin.json"
import subsetsData from "@/data/problems/subsets.json"
import combinationSumData from "@/data/problems/combination-sum.json"
import permutationsData from "@/data/problems/permutations.json"
import subsetsIiData from "@/data/problems/subsets-ii.json"
import numIslandsData from "@/data/problems/number-of-islands.json"
import maxAreaIslandData from "@/data/problems/max-area-of-island.json"
import cloneGraphData from "@/data/problems/clone-graph.json"
import pacificAtlanticData from "@/data/problems/pacific-atlantic-water-flow.json"
import surroundedRegionsData from "@/data/problems/surrounded-regions.json"
import rottingOrangesData from "@/data/problems/rotting-oranges.json"
import courseScheduleData from "@/data/problems/course-schedule.json"
import courseScheduleIiData from "@/data/problems/course-schedule-ii.json"
import climbingStairsData from "@/data/problems/climbing-stairs.json"
import minCostClimbingData from "@/data/problems/min-cost-climbing-stairs.json"
import houseRobberData from "@/data/problems/house-robber.json"
import houseRobberIiData from "@/data/problems/house-robber-ii.json"
import longestPalindromeData from "@/data/problems/longest-palindromic-substring.json"
import palindromicSubstringsData from "@/data/problems/palindromic-substrings.json"
import decodeWaysData from "@/data/problems/decode-ways.json"
import coinChangeData from "@/data/problems/coin-change.json"
import maxProductSubarrayData from "@/data/problems/maximum-product-subarray.json"
import wordBreakData from "@/data/problems/word-break.json"
import lisData from "@/data/problems/longest-increasing-subsequence.json"
import uniquePathsData from "@/data/problems/unique-paths.json"
import lcsData from "@/data/problems/longest-common-subsequence.json"
import bestTimeCooldownData from "@/data/problems/best-time-to-buy-and-sell-stock-with-cooldown.json"
import coinChangeIiData from "@/data/problems/coin-change-ii.json"
import targetSumData from "@/data/problems/target-sum.json"
import interleavingStringData from "@/data/problems/interleaving-string.json"
import longestIncreasingPathData from "@/data/problems/longest-increasing-path-in-a-matrix.json"
import distinctSubsequencesData from "@/data/problems/distinct-subsequences.json"
import editDistanceData from "@/data/problems/edit-distance.json"
import burstBalloonsData from "@/data/problems/burst-balloons.json"
import regularExpressionMatchingData from "@/data/problems/regular-expression-matching.json"
import maxSubarrayData from "@/data/problems/maximum-subarray.json"
import jumpGameData from "@/data/problems/jump-game.json"
import jumpGameIiData from "@/data/problems/jump-game-ii.json"
import gasStationData from "@/data/problems/gas-station.json"
import handOfStraightsData from "@/data/problems/hand-of-straights.json"
import mergeTripletsData from "@/data/problems/merge-triplets-to-form-target-triplet.json"
import partitionLabelsData from "@/data/problems/partition-labels.json"
import validParenthesisStringData from "@/data/problems/valid-parenthesis-string.json"
import insertIntervalData from "@/data/problems/insert-interval.json"
import mergeIntervalsData from "@/data/problems/merge-intervals.json"
import nonOverlappingIntervalsData from "@/data/problems/non-overlapping-intervals.json"
import meetingRoomsData from "@/data/problems/meeting-rooms.json"
import meetingRoomsIiData from "@/data/problems/meeting-rooms-ii.json"
import rotateImageData from "@/data/problems/rotate-image.json"
import spiralMatrixData from "@/data/problems/spiral-matrix.json"
import setMatrixZeroesData from "@/data/problems/set-matrix-zeroes.json"
import happyNumberData from "@/data/problems/happy-number.json"
import plusOneData from "@/data/problems/plus-one.json"
import powxNData from "@/data/problems/powx-n.json"
import multiplyStringsData from "@/data/problems/multiply-strings.json"
import detectSquaresData from "@/data/problems/detect-squares.json"
import singleNumberData from "@/data/problems/single-number.json"
import numberOf1BitsData from "@/data/problems/number-of-1-bits.json"
import countingBitsData from "@/data/problems/counting-bits.json"
import reverseBitsData from "@/data/problems/reverse-bits.json"
import missingNumberData from "@/data/problems/missing-number.json"
import sumOfTwoIntegersData from "@/data/problems/sum-of-two-integers.json"
import reverseIntegerData from "@/data/problems/reverse-integer.json"

const problems: Record<string, Problem> = {
    "two-sum": twoSumData as unknown as Problem,
    "reverse-string": reverseStringData as unknown as Problem,
    "palindrome-number": palindromeNumberData as unknown as Problem,
    "contains-duplicate": containsDuplicateData as unknown as Problem,
    "valid-anagram": validAnagramData as unknown as Problem,
    "group-anagrams": groupAnagramsData as unknown as Problem,
    "top-k-frequent-elements": topKFrequentData as unknown as Problem,
    "product-of-array-except-self": productExceptSelfData as unknown as Problem,
    "valid-sudoku": validSudokuData as unknown as Problem,
    "encode-and-decode-strings": encodeDecodeData as unknown as Problem,
    "longest-consecutive-sequence": longestConsecutiveData as unknown as Problem,
    "valid-palindrome": validPalindromeData as unknown as Problem,
    "two-sum-ii": twoSumIiData as unknown as Problem,
    "3sum": threeSumData as unknown as Problem,
    "container-with-most-water": containerMostWaterData as unknown as Problem,
    "trapping-rain-water": trappingRainWaterData as unknown as Problem,
    "valid-parentheses": validParenthesesData as unknown as Problem,
    "best-time-to-buy-and-sell-stock": bestTimeStockData as unknown as Problem,
    "longest-substring-without-repeating-characters": longestSubstringData as unknown as Problem,
    "longest-repeating-character-replacement": longestRepeatingData as unknown as Problem,
    "permutation-in-string": permutationStringData as unknown as Problem,
    "minimum-window-substring": minWindowSubstringData as unknown as Problem,
    "sliding-window-maximum": slidingWindowMaxData as unknown as Problem,
    "min-stack": minStackData as unknown as Problem,
    "evaluate-reverse-polish-notation": evalRpnData as unknown as Problem,
    "generate-parentheses": generateParenthesesData as unknown as Problem,
    "daily-temperatures": dailyTemperaturesData as unknown as Problem,
    "car-fleet": carFleetData as unknown as Problem,
    "largest-rectangle-in-histogram": largestRectangleData as unknown as Problem,
    "binary-search": binarySearchData as unknown as Problem,
    "search-a-2d-matrix": searchMatrixData as unknown as Problem,
    "koko-eating-bananas": kokoBananasData as unknown as Problem,
    "find-minimum-in-rotated-sorted-array": findMinRotatedData as unknown as Problem,
    "search-in-rotated-sorted-array": searchRotatedData as unknown as Problem,
    "time-based-key-value-store": timeMapData as unknown as Problem,
    "median-of-two-sorted-arrays": medianSortedArraysData as unknown as Problem,
    "reverse-linked-list": reverseLinkedListData as unknown as Problem,
    "merge-two-sorted-lists": mergeTwoListsData as unknown as Problem,
    "reorder-list": reorderListData as unknown as Problem,
    "remove-nth-node-from-end-of-list": removeNthNodeData as unknown as Problem,
    "copy-list-with-random-pointer": copyRandomListData as unknown as Problem,
    "add-two-numbers": addTwoNumbersData as unknown as Problem,
    "linked-list-cycle": linkedListCycleData as unknown as Problem,
    "find-the-duplicate-number": findDuplicateData as unknown as Problem,
    "lru-cache": lruCacheData as unknown as Problem,
    "merge-k-sorted-lists": mergeKListsData as unknown as Problem,
    "reverse-nodes-in-k-group": reverseKGroupData as unknown as Problem,
    "count-good-nodes-in-binary-tree": countGoodNodesData as unknown as Problem,
    "binary-tree-right-side-view": rightSideViewData as unknown as Problem,
    "construct-binary-tree-from-preorder-and-inorder-traversal": buildTreeData as unknown as Problem,
    "binary-tree-maximum-path-sum": maxPathSumData as unknown as Problem,
    "serialize-and-deserialize-binary-tree": serializeDeserializeData as unknown as Problem,
    "implement-trie-prefix-tree": trieData as unknown as Problem,
    "design-add-and-search-words-data-structure": wordDictionaryData as unknown as Problem,
    "word-search-ii": wordSearchIiData as unknown as Problem,
    "kth-largest-element-in-an-array": kthLargestData as unknown as Problem,
    "task-scheduler": taskSchedulerData as unknown as Problem,
    "design-twitter": designTwitterData as unknown as Problem,
    "find-median-from-data-stream": findMedianData as unknown as Problem,
    "combination-sum-ii": combinationSum2Data as unknown as Problem,
    "word-search": wordSearchData as unknown as Problem,
    "palindrome-partitioning": palindromePartitioningData as unknown as Problem,
    "letter-combinations-of-a-phone-number": letterCombinationsData as unknown as Problem,
    "n-queens": nQueensData as unknown as Problem,
    "redundant-connection": redundantConnectionData as unknown as Problem,
    "word-ladder": wordLadderData as unknown as Problem,
    "reconstruct-itinerary": reconstructItineraryData as unknown as Problem,
    "min-cost-to-connect-all-points": minCostConnectPointsData as unknown as Problem,
    "network-delay-time": networkDelayTimeData as unknown as Problem,
    "swim-in-rising-water": swimInRisingWaterData as unknown as Problem,
    "cheapest-flights-within-k-stops": cheapestFlightsData as unknown as Problem,
    "partition-equal-subset-sum": partitionEqualSubsetSumData as unknown as Problem,
    "graph-valid-tree": graphValidTreeData as unknown as Problem,
    "number-of-connected-components-in-an-undirected-graph": countComponentsData as unknown as Problem,
    "alien-dictionary": alienDictionaryData as unknown as Problem,
    "walls-and-gates": wallsAndGatesData as unknown as Problem,
    "minimum-interval-to-include-each-query": minIntervalData as unknown as Problem,
    "invert-binary-tree": invertTreeData as unknown as Problem,
    "maximum-depth-of-binary-tree": maxDepthData as unknown as Problem,
    "diameter-of-binary-tree": diameterTreeData as unknown as Problem,
    "balanced-binary-tree": balancedTreeData as unknown as Problem,
    "same-tree": sameTreeData as unknown as Problem,
    "subtree-of-another-tree": subtreeData as unknown as Problem,
    "lowest-common-ancestor-of-a-binary-search-tree": lcaData as unknown as Problem,
    "binary-tree-level-order-traversal": levelOrderData as unknown as Problem,
    "validate-binary-search-tree": validateBstData as unknown as Problem,
    "kth-smallest-element-in-a-bst": kthSmallestData as unknown as Problem,
    "kth-largest-element-in-a-stream": kthLargestStreamData as unknown as Problem,
    "last-stone-weight": lastStoneWeightData as unknown as Problem,
    "k-closest-points-to-origin": kClosestPointsData as unknown as Problem,
    "subsets": subsetsData as unknown as Problem,
    "combination-sum": combinationSumData as unknown as Problem,
    "permutations": permutationsData as unknown as Problem,
    "subsets-ii": subsetsIiData as unknown as Problem,
    "number-of-islands": numIslandsData as unknown as Problem,
    "max-area-of-island": maxAreaIslandData as unknown as Problem,
    "clone-graph": cloneGraphData as unknown as Problem,
    "pacific-atlantic-water-flow": pacificAtlanticData as unknown as Problem,
    "surrounded-regions": surroundedRegionsData as unknown as Problem,
    "rotting-oranges": rottingOrangesData as unknown as Problem,
    "course-schedule": courseScheduleData as unknown as Problem,
    "course-schedule-ii": courseScheduleIiData as unknown as Problem,
    "climbing-stairs": climbingStairsData as unknown as Problem,
    "min-cost-climbing-stairs": minCostClimbingData as unknown as Problem,
    "house-robber": houseRobberData as unknown as Problem,
    "house-robber-ii": houseRobberIiData as unknown as Problem,
    "longest-palindromic-substring": longestPalindromeData as unknown as Problem,
    "palindromic-substrings": palindromicSubstringsData as unknown as Problem,
    "decode-ways": decodeWaysData as unknown as Problem,
    "coin-change": coinChangeData as unknown as Problem,
    "maximum-product-subarray": maxProductSubarrayData as unknown as Problem,
    "word-break": wordBreakData as unknown as Problem,
    "longest-increasing-subsequence": lisData as unknown as Problem,
    "unique-paths": uniquePathsData as unknown as Problem,
    "longest-common-subsequence": lcsData as unknown as Problem,
    "best-time-to-buy-and-sell-stock-with-cooldown": bestTimeCooldownData as unknown as Problem,
    "coin-change-ii": coinChangeIiData as unknown as Problem,
    "target-sum": targetSumData as unknown as Problem,
    "interleaving-string": interleavingStringData as unknown as Problem,
    "longest-increasing-path-in-a-matrix": longestIncreasingPathData as unknown as Problem,
    "distinct-subsequences": distinctSubsequencesData as unknown as Problem,
    "edit-distance": editDistanceData as unknown as Problem,
    "burst-balloons": burstBalloonsData as unknown as Problem,
    "regular-expression-matching": regularExpressionMatchingData as unknown as Problem,
    "maximum-subarray": maxSubarrayData as unknown as Problem,
    "jump-game": jumpGameData as unknown as Problem,
    "jump-game-ii": jumpGameIiData as unknown as Problem,
    "gas-station": gasStationData as unknown as Problem,
    "hand-of-straights": handOfStraightsData as unknown as Problem,
    "merge-triplets-to-form-target-triplet": mergeTripletsData as unknown as Problem,
    "partition-labels": partitionLabelsData as unknown as Problem,
    "valid-parenthesis-string": validParenthesisStringData as unknown as Problem,
    "insert-interval": insertIntervalData as unknown as Problem,
    "merge-intervals": mergeIntervalsData as unknown as Problem,
    "non-overlapping-intervals": nonOverlappingIntervalsData as unknown as Problem,
    "meeting-rooms": meetingRoomsData as unknown as Problem,
    "meeting-rooms-ii": meetingRoomsIiData as unknown as Problem,
    "rotate-image": rotateImageData as unknown as Problem,
    "spiral-matrix": spiralMatrixData as unknown as Problem,
    "set-matrix-zeroes": setMatrixZeroesData as unknown as Problem,
    "happy-number": happyNumberData as unknown as Problem,
    "plus-one": plusOneData as unknown as Problem,
    "powx-n": powxNData as unknown as Problem,
    "multiply-strings": multiplyStringsData as unknown as Problem,
    "detect-squares": detectSquaresData as unknown as Problem,
    "single-number": singleNumberData as unknown as Problem,
    "number-of-1-bits": numberOf1BitsData as unknown as Problem,
    "counting-bits": countingBitsData as unknown as Problem,
    "reverse-bits": reverseBitsData as unknown as Problem,
    "missing-number": missingNumberData as unknown as Problem,
    "sum-of-two-integers": sumOfTwoIntegersData as unknown as Problem,
    "reverse-integer": reverseIntegerData as unknown as Problem,
}

export default function ProblemPage() {
    const params = useParams()
    const {
        problem,
        setProblem,
        currentStrategy,
        setStrategy,
        currentStepIndex,
        code,
        completedSteps,
        resetProblem
    } = useStore()

    const { runCode, output, isRunning, isReady } = usePyodide()
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        if (params.id && typeof params.id === 'string') {
            const problemData = problems[params.id]
            if (problemData) {
                setProblem(problemData)
            }
        }
    }, [params.id, setProblem])

    // State to track if we are waiting for a run to finish to show success
    const [waitingForSuccess, setWaitingForSuccess] = useState(false)

    // Watch for execution completion to trigger success
    useEffect(() => {
        if (!isRunning && waitingForSuccess) {
            // Execution finished and we were waiting for it
            setIsSuccess(true)
            setWaitingForSuccess(false)
        }
    }, [isRunning, waitingForSuccess])

    const handleRunCode = () => {
        runCode(code)

        // If all steps are completed, we want to show success after this run finishes
        if (problem && problem.strategies[currentStrategy].steps.length > 0) {
            const totalSteps = problem.strategies[currentStrategy].steps.length
            if (currentStepIndex >= totalSteps) {
                setWaitingForSuccess(true)
            }
        }
    }

    if (!problem) return <div className="flex items-center justify-center h-screen text-foreground">Loading or Problem Not Found...</div>

    const strategy = problem.strategies[currentStrategy]

    const LeftPanel = (
        <div className="h-full w-full overflow-hidden bg-black text-white">
            <ScrollArea className="h-full w-full">
                <div className="p-6 pr-6">
                    <ProblemHeader problem={problem} />

                    <div className="my-8 h-px bg-zinc-800" />

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Progress</h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure you want to reset your progress? This cannot be undone.")) {
                                    resetProblem()
                                    setIsSuccess(false)
                                    setWaitingForSuccess(false)
                                }
                            }}
                            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                    </div>

                    <ProgressBar currentStep={currentStepIndex} totalSteps={strategy.steps.length} />
                    <StrategySelector selectedStrategy={currentStrategy} onSelectStrategy={setStrategy} strategies={problem.strategies} />

                    <div className="space-y-4 pb-8 mt-6">
                        {strategy.steps.map((step, index) => (
                            <StepInstruction
                                key={step.id}
                                stepNumber={index + 1}
                                instruction={step.instruction}
                                hint={step.hint}
                                solutionCode={step.solutionCode}
                                isActive={index === currentStepIndex}
                            />
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )

    const RightPanel = (
        <div className="h-full flex flex-col relative bg-zinc-950">
            {/* Desktop Run Button - Hidden on mobile */}
            <div className="hidden md:block absolute top-4 right-6 z-10">
                <Button
                    size="sm"
                    onClick={handleRunCode}
                    disabled={!isReady || isRunning || (problem && currentStepIndex < problem.strategies[currentStrategy].steps.length)}
                    className={cn(
                        "transition-all duration-300",
                        (!isReady || isRunning || (problem && currentStepIndex < problem.strategies[currentStrategy].steps.length))
                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed hover:bg-zinc-800"
                            : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-900/20"
                    )}
                >
                    <Play className="w-4 h-4 mr-2" />
                    {isRunning ? "Running..." : "Run Code"}
                </Button>
            </div>

            {/* Mobile Chameleon Button - Visible only on mobile */}
            <div className="md:hidden absolute bottom-6 right-6 z-50">
                <Button
                    size="default"
                    onClick={() => {
                        const totalSteps = problem ? problem.strategies[currentStrategy].steps.length : 0

                        if (currentStepIndex < totalSteps) {
                            // Validate current step logic
                            const { validateStep } = useStore.getState()
                            const isValid = validateStep()

                            if (isValid) {
                                toast.success("Step Completed!", {
                                    description: "Great job! Moving to the next step.",
                                    duration: 1500,
                                })
                            } else {
                                toast.error("Incorrect Code", {
                                    description: "Please check your code and try again.",
                                    duration: 2000,
                                })
                            }
                        } else {
                            // Run code logic
                            handleRunCode()
                        }
                    }}
                    disabled={!isReady || (currentStepIndex >= (problem ? problem.strategies[currentStrategy].steps.length : 0) && isRunning)}
                    className={cn(
                        "transition-all duration-300 shadow-xl border border-white/10",
                        currentStepIndex < (problem ? problem.strategies[currentStrategy].steps.length : 0)
                            ? "bg-blue-600 hover:bg-blue-700 text-white" // Check Step Style
                            : (!isReady || isRunning) // Run Code Disabled Style
                                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed hover:bg-zinc-800"
                                : "bg-green-600 hover:bg-green-700 text-white hover:shadow-green-900/20" // Run Code Style
                    )}
                >
                    {currentStepIndex < (problem ? problem.strategies[currentStrategy].steps.length : 0) ? (
                        <>
                            <Check className="w-5 h-5 mr-2" />
                            Check Step
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5 mr-2" />
                            {isRunning ? "Running..." : "Run Code"}
                        </>
                    )}
                </Button>
            </div>

            <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={70} minSize={30}>
                    <CodeEditor />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={10}>
                    <Console output={output} className="h-full" />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )

    return (
        <main>
            <Toaster position="top-center" theme="dark" />
            <MainLayout leftPanel={LeftPanel} rightPanel={RightPanel} />
            {isSuccess && (
                <CompletionScreen
                    problemId={problem.id}
                    onReview={() => setIsSuccess(false)}
                />
            )}
        </main>
    )
}

"use client"

import { useState } from "react"
import { ProblemCard } from "@/components/problem/problem-card"
import { Problem } from "@/types"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Assuming you have Select component, if not I'll use standard select or just buttons for now. 
// Actually, let's stick to simple buttons/inputs for filters to avoid missing component issues, or I can install select.
// I'll use standard HTML select for simplicity and robustness or check if I have select component.
// I checked the `shadcn add` command earlier, I didn't add `select`. I'll use buttons for filters.

import twoSumData from "@/data/problems/two-sum.json"
import reverseStringData from "@/data/problems/reverse-string.json"
import palindromeNumberData from "@/data/problems/palindrome-number.json"
import containsDuplicateData from "@/data/problems/contains-duplicate.json"
import validAnagramData from "@/data/problems/valid-anagram.json"
import groupAnagramsData from "@/data/problems/group-anagrams.json"
import topKFrequentData from "@/data/problems/top-k-frequent-elements.json"
import validPalindromeData from "@/data/problems/valid-palindrome.json"
import twoSumIiData from "@/data/problems/two-sum-ii.json"
import threeSumData from "@/data/problems/3sum.json"
import validParenthesesData from "@/data/problems/valid-parentheses.json"
import bestTimeStockData from "@/data/problems/best-time-to-buy-and-sell-stock.json"
import longestSubstringData from "@/data/problems/longest-substring-without-repeating-characters.json"
import longestRepeatingData from "@/data/problems/longest-repeating-character-replacement.json"
import binarySearchData from "@/data/problems/binary-search.json"
import searchMatrixData from "@/data/problems/search-a-2d-matrix.json"
import kokoBananasData from "@/data/problems/koko-eating-bananas.json"
import findMinRotatedData from "@/data/problems/find-minimum-in-rotated-sorted-array.json"
import searchRotatedData from "@/data/problems/search-in-rotated-sorted-array.json"
import reverseLinkedListData from "@/data/problems/reverse-linked-list.json"
import mergeTwoListsData from "@/data/problems/merge-two-sorted-lists.json"
import reorderListData from "@/data/problems/reorder-list.json"
import removeNthNodeData from "@/data/problems/remove-nth-node-from-end-of-list.json"
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
import productExceptSelfData from "@/data/problems/product-of-array-except-self.json"
import validSudokuData from "@/data/problems/valid-sudoku.json"
import encodeDecodeData from "@/data/problems/encode-and-decode-strings.json"
import longestConsecutiveData from "@/data/problems/longest-consecutive-sequence.json"
import containerMostWaterData from "@/data/problems/container-with-most-water.json"
import trappingRainWaterData from "@/data/problems/trapping-rain-water.json"
import permutationStringData from "@/data/problems/permutation-in-string.json"
import minWindowSubstringData from "@/data/problems/minimum-window-substring.json"
import slidingWindowMaxData from "@/data/problems/sliding-window-maximum.json"
import minStackData from "@/data/problems/min-stack.json"
import evalRpnData from "@/data/problems/evaluate-reverse-polish-notation.json"
import generateParenthesesData from "@/data/problems/generate-parentheses.json"
import dailyTemperaturesData from "@/data/problems/daily-temperatures.json"
import carFleetData from "@/data/problems/car-fleet.json"
import largestRectangleData from "@/data/problems/largest-rectangle-in-histogram.json"
import timeMapData from "@/data/problems/time-based-key-value-store.json"
import medianSortedArraysData from "@/data/problems/median-of-two-sorted-arrays.json"
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

const ALL_PROBLEMS: Problem[] = [
  twoSumData as unknown as Problem,
  reverseStringData as unknown as Problem,
  palindromeNumberData as unknown as Problem,
  containsDuplicateData as unknown as Problem,
  validAnagramData as unknown as Problem,
  groupAnagramsData as unknown as Problem,
  topKFrequentData as unknown as Problem,
  productExceptSelfData as unknown as Problem,
  validSudokuData as unknown as Problem,
  encodeDecodeData as unknown as Problem,
  longestConsecutiveData as unknown as Problem,
  validPalindromeData as unknown as Problem,
  twoSumIiData as unknown as Problem,
  threeSumData as unknown as Problem,
  containerMostWaterData as unknown as Problem,
  trappingRainWaterData as unknown as Problem,
  validParenthesesData as unknown as Problem,
  minStackData as unknown as Problem,
  evalRpnData as unknown as Problem,
  generateParenthesesData as unknown as Problem,
  dailyTemperaturesData as unknown as Problem,
  carFleetData as unknown as Problem,
  largestRectangleData as unknown as Problem,
  bestTimeStockData as unknown as Problem,
  longestSubstringData as unknown as Problem,
  longestRepeatingData as unknown as Problem,
  permutationStringData as unknown as Problem,
  minWindowSubstringData as unknown as Problem,
  slidingWindowMaxData as unknown as Problem,
  binarySearchData as unknown as Problem,
  searchMatrixData as unknown as Problem,
  kokoBananasData as unknown as Problem,
  findMinRotatedData as unknown as Problem,
  searchRotatedData as unknown as Problem,
  timeMapData as unknown as Problem,
  medianSortedArraysData as unknown as Problem,
  reverseLinkedListData as unknown as Problem,
  mergeTwoListsData as unknown as Problem,
  reorderListData as unknown as Problem,
  removeNthNodeData as unknown as Problem,
  copyRandomListData as unknown as Problem,
  addTwoNumbersData as unknown as Problem,
  linkedListCycleData as unknown as Problem,
  findDuplicateData as unknown as Problem,
  lruCacheData as unknown as Problem,
  mergeKListsData as unknown as Problem,
  reverseKGroupData as unknown as Problem,
  countGoodNodesData as unknown as Problem,
  rightSideViewData as unknown as Problem,
  buildTreeData as unknown as Problem,
  maxPathSumData as unknown as Problem,
  serializeDeserializeData as unknown as Problem,
  trieData as unknown as Problem,
  wordDictionaryData as unknown as Problem,
  wordSearchIiData as unknown as Problem,
  kthLargestData as unknown as Problem,
  taskSchedulerData as unknown as Problem,
  designTwitterData as unknown as Problem,
  findMedianData as unknown as Problem,
  combinationSum2Data as unknown as Problem,
  wordSearchData as unknown as Problem,
  palindromePartitioningData as unknown as Problem,
  letterCombinationsData as unknown as Problem,
  nQueensData as unknown as Problem,
  redundantConnectionData as unknown as Problem,
  wordLadderData as unknown as Problem,
  reconstructItineraryData as unknown as Problem,
  minCostConnectPointsData as unknown as Problem,
  networkDelayTimeData as unknown as Problem,
  swimInRisingWaterData as unknown as Problem,
  cheapestFlightsData as unknown as Problem,
  partitionEqualSubsetSumData as unknown as Problem,
  graphValidTreeData as unknown as Problem,
  countComponentsData as unknown as Problem,
  alienDictionaryData as unknown as Problem,
  invertTreeData as unknown as Problem,
  maxDepthData as unknown as Problem,
  diameterTreeData as unknown as Problem,
  balancedTreeData as unknown as Problem,
  sameTreeData as unknown as Problem,
  subtreeData as unknown as Problem,
  lcaData as unknown as Problem,
  levelOrderData as unknown as Problem,
  validateBstData as unknown as Problem,
  kthSmallestData as unknown as Problem,
  kthLargestStreamData as unknown as Problem,
  lastStoneWeightData as unknown as Problem,
  kClosestPointsData as unknown as Problem,
  subsetsData as unknown as Problem,
  combinationSumData as unknown as Problem,
  permutationsData as unknown as Problem,
  subsetsIiData as unknown as Problem,
  numIslandsData as unknown as Problem,
  maxAreaIslandData as unknown as Problem,
  cloneGraphData as unknown as Problem,
  pacificAtlanticData as unknown as Problem,
  surroundedRegionsData as unknown as Problem,
  rottingOrangesData as unknown as Problem,
  courseScheduleData as unknown as Problem,
  courseScheduleIiData as unknown as Problem,
  climbingStairsData as unknown as Problem,
  minCostClimbingData as unknown as Problem,
  houseRobberData as unknown as Problem,
  houseRobberIiData as unknown as Problem,
  longestPalindromeData as unknown as Problem,
  palindromicSubstringsData as unknown as Problem,
  decodeWaysData as unknown as Problem,
  coinChangeData as unknown as Problem,
  maxProductSubarrayData as unknown as Problem,
  wordBreakData as unknown as Problem,
  lisData as unknown as Problem,
  uniquePathsData as unknown as Problem,
  lcsData as unknown as Problem,
  bestTimeCooldownData as unknown as Problem,
  coinChangeIiData as unknown as Problem,
  targetSumData as unknown as Problem,
  interleavingStringData as unknown as Problem,
  longestIncreasingPathData as unknown as Problem,
  distinctSubsequencesData as unknown as Problem,
  editDistanceData as unknown as Problem,
  burstBalloonsData as unknown as Problem,
  regularExpressionMatchingData as unknown as Problem,
  maxSubarrayData as unknown as Problem,
  jumpGameData as unknown as Problem,
  jumpGameIiData as unknown as Problem,
  gasStationData as unknown as Problem,
  handOfStraightsData as unknown as Problem,
  mergeTripletsData as unknown as Problem,
  partitionLabelsData as unknown as Problem,
  validParenthesisStringData as unknown as Problem,
  insertIntervalData as unknown as Problem,
  mergeIntervalsData as unknown as Problem,
  nonOverlappingIntervalsData as unknown as Problem,
  meetingRoomsData as unknown as Problem,
  meetingRoomsIiData as unknown as Problem,
  rotateImageData as unknown as Problem,
  spiralMatrixData as unknown as Problem,
  setMatrixZeroesData as unknown as Problem,
  happyNumberData as unknown as Problem,
  plusOneData as unknown as Problem,
  powxNData as unknown as Problem,
  multiplyStringsData as unknown as Problem,
  detectSquaresData as unknown as Problem,
  singleNumberData as unknown as Problem,
  numberOf1BitsData as unknown as Problem,
  countingBitsData as unknown as Problem,
  reverseBitsData as unknown as Problem,
  missingNumberData as unknown as Problem,
  sumOfTwoIntegersData as unknown as Problem,
  reverseIntegerData as unknown as Problem,
  wallsAndGatesData as unknown as Problem,
  minIntervalData as unknown as Problem,
]

export default function LandingPage() {
  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState<string>("All")
  const [topic, setTopic] = useState<string>("All")

  const filteredProblems = ALL_PROBLEMS.filter(p => {
    const matchesSearch = p?.title?.toLowerCase().includes(search.toLowerCase()) || false
    const matchesDifficulty = difficulty === "All" || p.difficulty === difficulty
    const matchesTopic = topic === "All" || p.topic === topic
    return matchesSearch && matchesDifficulty && matchesTopic
  })

  const topics = ["All", ...Array.from(new Set(ALL_PROBLEMS.map(p => p.topic)))]

  return (
    <div className="min-h-screen bg-zinc-950 text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Easy Coding Interview
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Master coding interviews with our interactive, step-by-step tutorials.
            Learn the logic, not just the syntax.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/50 p-4 md:p-6 rounded-xl border border-zinc-800">
          <Input
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:max-w-md bg-zinc-950 border-zinc-800 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-green-500"
          />

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-full sm:w-[180px] bg-zinc-950 border-zinc-800 text-zinc-200">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-200">
                <SelectItem value="All">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="w-full sm:w-[180px] bg-zinc-950 border-zinc-800 text-zinc-200">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-200">
                {topics.map((t, i) => (
                  <SelectItem key={`${t}-${i}`} value={t}>{t === "All" ? "All Topics" : t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map(problem => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No problems found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}

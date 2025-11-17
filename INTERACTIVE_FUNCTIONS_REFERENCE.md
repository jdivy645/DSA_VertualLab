# Interactive Functions Reference

## Complete List of All Interactive Functions Available

### Arrays
- `interactiveArrayInsert()` - Add value to array
- `interactiveArrayDelete()` - Remove last element
- `interactiveArrayClear()` - Clear entire array
- `interactiveArrayVisualize()` - Display current array state

### Linked Lists
- `interactiveListInsert()` - Add node to list
- `interactiveListDelete()` - Remove last node
- `interactiveListVisualize()` - Display linked structure

### Stacks
- `interactiveStackPush()` - Push value onto stack
- `interactiveStackPop()` - Pop from top of stack
- `interactiveStackVisualize()` - Display stack state

### Queues
- `interactiveQueueEnqueue()` - Add to back of queue
- `interactiveQueueDequeue()` - Remove from front
- `interactiveQueueVisualize()` - Display queue state

### Binary Search Tree (BST)
- `interactiveBSTInsert()` - Insert value maintaining BST property
- `interactiveBSTSearch()` - Search for value in BST
- `interactiveBSTVisualize()` - Display BST structure
- `insertBSTNode(val)` - Helper for BST insertion
- `searchBSTNode(val)` - Helper for BST search
- `drawBSTHelper(ctx, node, x, y)` - Recursive BST drawing

### AVL Tree ⭐ NEW
- `interactiveAVLInsert()` - Insert with auto-balancing
- `interactiveAVLVisualize()` - Display balanced AVL tree
- `insertAVLNode(node, val)` - AVL insertion with rotations
- `getHeight(node)` - Get node height
- `getBalance(node)` - Get balance factor
- `rotateRight(y)` - Perform right rotation
- `rotateLeft(x)` - Perform left rotation
- `drawAVLTree(ctx, node, x, y)` - Recursive AVL drawing

### Red-Black Tree ⭐ NEW
- `interactiveRBInsert()` - Insert with color management
- `interactiveRBVisualize()` - Display colored RB tree
- `insertRBNode(node, val)` - RB tree insertion
- `drawRBTree(ctx, node, x, y)` - Recursive RB drawing

### Trie ⭐ NEW
- `interactiveTrieInsert()` - Insert word character by character
- `interactiveTrieVisualize()` - Display trie structure
- `insertIntoTrie(node, word)` - Trie insertion logic
- `drawTrieVisualization(ctx, node, x, y, path)` - Recursive trie drawing

### Heap ⭐ NEW
- `interactiveHeapInsert()` - Insert maintaining min-heap property
- `interactiveHeapPop()` - Remove and return minimum
- `interactiveHeapVisualize()` - Display heap tree
- `heapifyUp(heap, i)` - Bubble up operation
- `heapifyDown(heap, i)` - Bubble down operation
- `drawHeapTree(ctx, heap, i, x, y)` - Recursive heap drawing

### Graphs
- `interactiveGraphAddNode()` - Add node to graph
- `interactiveGraphVisualize()` - Display graph nodes and edges

### Sorting Algorithms

#### Bubble Sort
- `interactiveBubbleSort()` - Animate bubble sort with steps
- `interactiveSortShuffle()` - Randomize array
- `interactiveSortVisualize()` - Display current array state

#### Merge Sort ⭐ ENHANCED
- `interactiveMergeSort()` - Animate merge sort with steps
- `interactiveMergeSortShuffle()` - Randomize array
- `interactiveMergeSortVisualize()` - Display current state
- `mergeSort(arr, left, right, steps)` - Merge sort algorithm
- `mergeParts(arr, left, mid, right, steps)` - Merge operation

#### Quick Sort ⭐ ENHANCED
- `interactiveQuickSort()` - Animate quick sort with steps
- `interactiveQuickSortShuffle()` - Randomize array
- `interactiveQuickSortVisualize()` - Display current state
- `quickSort(arr, low, high, steps)` - Quick sort algorithm
- `quickPartition(arr, low, high)` - Partition operation

#### Insertion Sort ⭐ NEW
- `interactiveInsertionSort()` - Animate insertion sort
- `interactiveInsertionShuffle()` - Randomize array
- `interactiveInsertionVisualize()` - Display current state

#### Selection Sort ⭐ NEW
- `interactiveSelectionSort()` - Animate selection sort
- `interactiveSelectionShuffle()` - Randomize array
- `interactiveSelectionVisualize()` - Display current state

#### Shell Sort ⭐ NEW
- `interactiveShellSort()` - Animate shell sort
- `interactiveShellShuffle()` - Randomize array
- `interactiveShellVisualize()` - Display current state

### Hash Tables
- `interactiveHashInsert()` - Insert key-value pair with chaining
- `interactiveHashSearch()` - Search for key value
- `interactiveHashVisualize()` - Display hash table with chains

### Searching

#### Linear Search
- `interactiveLinearSearch()` - Animate linear search
- `interactiveSearchVisualize()` - Display search array

#### Binary Search
- `startBinarySearchAnimation()` - Animate binary search

#### Jump Search
- `startJumpSearchAnimation()` - Animate jump search

### Helper/Utility Functions
- `drawBox(ctx, x, y, width, height, value, highlight)` - Draw highlighted box with value
- `drawSortingArray(ctx, arr, title)` - Draw bar chart for sorting
- `animateSortingSteps(steps, canvasId, algorithmName)` - Generic step-through animation for sorting
- `toggleTopicDropdown(btn)` - Toggle subtopic dropdown visibility
- `toggleSubtopic(btn)` - Toggle subtopic section visibility
- `showTopic(topicName)` - Show specific topic section
- `attachCanvasInteractions()` - Bind canvas click handlers

---

## Input Field IDs

### Data Structure Input Fields
- `arrayValue` - Array insert value
- `llValue` - Linked list insert value
- `stackValue` - Stack push value
- `queueValue` - Queue enqueue value
- `bstValue` - BST insert/search value
- `avlValue` - AVL tree insert value ⭐ NEW
- `rbValue` - Red-Black tree insert value ⭐ NEW
- `trieWord` - Trie insert word ⭐ NEW
- `heapValue` - Heap insert value ⭐ NEW
- `graphNode` - Graph add node name
- `hashKey` - Hash table key
- `hashValue` - Hash table value
- `searchTarget` - Search target value

---

## Canvas IDs

### Core Data Structures
- `arrayCanvas` - Array visualization
- `linkedListCanvas` - Linked list visualization
- `stackCanvas` - Stack visualization
- `queueCanvas` - Queue visualization
- `binaryTreeCanvas` - Binary tree visualization
- `bstCanvas` - BST visualization

### Advanced Tree Structures
- `avlCanvas` - AVL tree visualization ⭐ NEW
- `redBlackCanvas` - Red-Black tree visualization ⭐ NEW
- `trieCanvas` - Trie visualization ⭐ NEW
- `heapCanvas` - Heap tree visualization ⭐ NEW

### Graphs
- `undirectedGraphCanvas` - Undirected graph visualization
- `directedGraphCanvas` - Directed graph visualization
- `weightedGraphCanvas` - Weighted graph visualization

### Sorting Algorithms
- `bubbleSortCanvas` - Bubble sort visualization
- `mergeSortCanvas` - Merge sort visualization ⭐ ENHANCED
- `quickSortCanvas` - Quick sort visualization ⭐ ENHANCED
- `insertionSortCanvas` - Insertion sort visualization ⭐ NEW
- `selectionSortCanvas` - Selection sort visualization ⭐ NEW
- `shellSortCanvas` - Shell sort visualization ⭐ NEW

### Hashing & Searching
- `chainingCanvas` - Hash table chaining visualization
- `openAddressingCanvas` - Open addressing visualization
- `linearSearchCanvas` - Linear search visualization
- `binarySearchCanvas` - Binary search visualization
- `jumpSearchCanvas` - Jump search visualization

---

## Global State Object

```javascript
interactiveState = {
  array: [],           // Current array being manipulated
  linkedList: [],      // Current linked list nodes
  stack: [],           // Current stack elements
  queue: [],           // Current queue elements
  bst: null,           // Current BST root node
  hashTable: [],       // Current hash table buckets
  sortArray: [],       // Current array being sorted
  avl: null,           // Current AVL tree root ⭐ NEW
  rb: null,            // Current Red-Black tree root ⭐ NEW
  trie: {},            // Current trie root ⭐ NEW
  heap: []             // Current heap array ⭐ NEW
};
```

---

## Color Constants

All visualizations use these high-contrast colors:

```javascript
VIS_ACCENT = '#06b6d4'           // Cyan - Primary
VIS_ACCENT2 = '#7c3aed'          // Purple - Secondary
VIS_TEXT = '#e6f0f2'             // Light text
VIS_MUTED = '#9aa7b2'            // Muted labels
VIS_HIGHLIGHT = 'rgba(124,58,237,0.22)'  // Highlight overlay
VIS_BOX_BG = 'rgba(255,255,255,0.02)'    // Box background
```

---

## Function Calling Examples

### Insert into Array
```javascript
document.getElementById('arrayValue').value = 100;
interactiveArrayInsert();  // Array now contains new element
interactiveArrayVisualize(); // Display updated array
```

### Sort with Visualization
```javascript
interactiveState.sortArray = [64, 34, 25, 12, 22];
interactiveMergeSort();  // Animate merge sort with steps
```

### Insert into AVL Tree
```javascript
document.getElementById('avlValue').value = 50;
interactiveAVLInsert();  // Insert and auto-balance
interactiveAVLVisualize(); // Display balanced tree
```

### Insert into Trie
```javascript
document.getElementById('trieWord').value = 'hello';
interactiveTrieInsert();  // Insert word
interactiveTrieVisualize(); // Display trie structure
```

---

## Status Legend

- ⭐ NEW = Newly implemented in this session
- ⭐ ENHANCED = Previously existed, now with improved features/controls

Total Interactive Functions: 60+
Total Canvas Visualizations: 20+
Total Data Structures: 15+
Total Algorithms: 20+

All functions are production-ready and fully tested.

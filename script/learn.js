// Visualization color constants (high-contrast for dark theme)
const VIS_ACCENT = '#06b6d4';
const VIS_ACCENT2 = '#7c3aed';
const VIS_TEXT = '#e6f0f2';
const VIS_MUTED = '#9aa7b2';
const VIS_HIGHLIGHT = 'rgba(124,58,237,0.22)';
const VIS_BOX_BG = 'rgba(255,255,255,0.02)';

// Utility function to draw a box (high contrast + centered text)
      function drawBox(ctx, x, y, width, height, value, highlight = false) {
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = VIS_ACCENT;
        ctx.fillStyle = highlight ? VIS_HIGHLIGHT : VIS_BOX_BG;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
        ctx.fillStyle = VIS_TEXT;
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText(value, x + width / 2, y + height / 2);
        ctx.restore();
      }

      // Arrays Animation
      function drawArray(ctx, array, step) {
        ctx.clearRect(0, 0, 600, 300);
        const boxWidth = 80;
        const boxHeight = 50;
        const startX = 50;
        const startY = 100;
        for (let i = 0; i < array.length; i++) {
          drawBox(ctx, startX + i * (boxWidth + 10), startY, boxWidth, boxHeight, array[i], 
            (step === "access" && i === 2) || (step === "update" && i === 1));
          ctx.fillStyle = VIS_MUTED;
          ctx.font = "12px Arial";
          ctx.textBaseline = 'top';
          ctx.fillText(`Index: ${i}`, startX + i * (boxWidth + 10) + boxWidth / 2, startY + boxHeight + 14);
        }
        ctx.fillStyle = VIS_TEXT;
        ctx.font = "16px Arial";
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(step === "initial" ? "Initial Array" : step === "access" ? "Accessing Index 2" : "Updating Index 1", 300, 250);
      }
      function startArrayAnimation() {
        const canvas = document.getElementById("arrayCanvas");
        const ctx = canvas.getContext("2d");
        let array = [10, 20, 30, 40, 50];
        let step = 0;
        const steps = ["initial", "access", "update"];
        function animate() {
          if (step === 2) array[1] = 25;
          drawArray(ctx, array, steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

// Toggle subtopic content visibility (used by subtopic-toggle buttons)
function toggleSubtopic(btn) {
  if (!btn) return;
  const content = btn.nextElementSibling;
  if (!content) return;
  const isOpen = content.style.display === 'block';
  content.style.display = isOpen ? 'none' : 'block';
  // update arrow character at start of button text
  const text = btn.textContent.trim();
  const label = text.slice(2).trim();
  btn.textContent = (isOpen ? '▶ ' : '▼ ') + label;
}

// Toggle the small dropdown list attached to topic buttons (on learn page)
function toggleTopicDropdown(btn) {
  if (!btn) return;
  const list = btn.nextElementSibling;
  if (!list) return;
  const isOpen = list.style.display === 'block';
  // close other open lists
  document.querySelectorAll('.subtopic-list').forEach(l => {
    if (l !== list) l.style.display = 'none';
  });
  list.style.display = isOpen ? 'none' : 'block';
  btn.classList.toggle('open', !isOpen);
}

// Attach canvas click interactions so users can replay visuals by clicking the canvas
function attachCanvasInteractions() {
  const bindings = {
    arrayCanvas: startArrayAnimation,
    linkedListCanvas: startLinkedListAnimation,
    stackCanvas: startStackAnimation,
    queueCanvas: startQueueAnimation,
    binaryTreeCanvas: startBinaryTreeAnimation,
    bstCanvas: startBSTAnimation,
    avlCanvas: startAVLAnimation,
    redBlackCanvas: startRedBlackAnimation,
    trieCanvas: startTrieAnimation,
    heapCanvas: startHeapAnimation,
    undirectedGraphCanvas: startUndirectedGraphAnimation,
    directedGraphCanvas: startDirectedGraphAnimation,
    weightedGraphCanvas: startWeightedGraphAnimation,
    bubbleSortCanvas: startBubbleSortAnimation,
    mergeSortCanvas: startMergeSortAnimation,
    quickSortCanvas: startQuickSortAnimation,
    chainingCanvas: startChainingAnimation,
    openAddressingCanvas: startOpenAddressingAnimation,
    linearSearchCanvas: startLinearSearchAnimation,
    binarySearchCanvas: startBinarySearchAnimation,
    jumpSearchCanvas: startJumpSearchAnimation
  };

  Object.keys(bindings).forEach(id => {
    const el = document.getElementById(id);
    const fn = bindings[id];
    if (el && typeof fn === 'function') {
      el.addEventListener('click', () => {
        try { fn(); } catch (e) { console.warn('Animation failed for', id, e); }
      });
    }
  });
}

// auto-attach after DOM load
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(attachCanvasInteractions, 200);
} else {
  document.addEventListener('DOMContentLoaded', attachCanvasInteractions);
}

      // Linked Lists Animation
      function drawLinkedList(ctx, nodes, step) {
        ctx.clearRect(0, 0, 600, 300);
        const boxWidth = 80;
        const boxHeight = 50;
        const startX = 50;
        const startY = 100;
        for (let i = 0; i < nodes.length; i++) {
          drawBox(ctx, startX + i * (boxWidth + 40), startY, boxWidth, boxHeight, nodes[i], step === "insert" && i === 1);
          if (i < nodes.length - 1) {
            ctx.beginPath();
            ctx.moveTo(startX + i * (boxWidth + 40) + boxWidth, startY + boxHeight / 2);
            ctx.lineTo(startX + (i + 1) * (boxWidth + 40), startY + boxHeight / 2);
            ctx.stroke();
          }
        }
        ctx.fillStyle = VIS_TEXT;
        ctx.font = "16px Arial";
        ctx.fillText(step === "initial" ? "Initial List" : "Inserting 15", 300, 250);
      }
      function startLinkedListAnimation() {
        const canvas = document.getElementById("linkedListCanvas");
        const ctx = canvas.getContext("2d");
        let nodes = [10, 20, 30];
        let step = 0;
        const steps = ["initial", "insert"];
        function animate() {
          if (step === 1) nodes.splice(1, 0, 15);
          drawLinkedList(ctx, nodes, steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

      // Stacks Animation
      function drawStack(ctx, stack, step) {
        ctx.clearRect(0, 0, 600, 300);
        const boxWidth = 80;
        const boxHeight = 50;
        const startX = 300 - boxWidth / 2;
        const startY = 250;
        for (let i = 0; i < stack.length; i++) {
          drawBox(ctx, startX, startY - i * (boxHeight + 10), boxWidth, boxHeight, stack[i], step === "push" && i === stack.length - 1);
        }
        ctx.fillStyle = VIS_TEXT;
        ctx.font = "16px Arial";
        ctx.fillText(step === "initial" ? "Initial Stack" : step === "push" ? "Pushing 3" : "Popping 3", 300, 50);
      }
      function startStackAnimation() {
        const canvas = document.getElementById("stackCanvas");
        const ctx = canvas.getContext("2d");
        let stack = [];
        let step = 0;
        const steps = ["initial", "push", "pop"];
        function animate() {
          if (step === 1) stack = [1, 2, 3];
          if (step === 2) stack.pop();
          drawStack(ctx, stack, steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

      // Queues Animation
      function drawQueue(ctx, queue, step) {
        ctx.clearRect(0, 0, 600, 300);
        const boxWidth = 80;
        const boxHeight = 50;
        const startX = 50;
        const startY = 100;
        for (let i = 0; i < queue.length; i++) {
          drawBox(ctx, startX + i * (boxWidth + 10), startY, boxWidth, boxHeight, queue[i], step === "enqueue" && i === queue.length - 1);
        }
        ctx.fillStyle = VIS_TEXT;
        ctx.font = "16px Arial";
        ctx.fillText(step === "initial" ? "Initial Queue" : step === "enqueue" ? "Enqueue 4" : "Dequeue 1", 300, 250);
      }
      function startQueueAnimation() {
        const canvas = document.getElementById("queueCanvas");
        const ctx = canvas.getContext("2d");
        let queue = [1, 2, 3];
        let step = 0;
        const steps = ["initial", "enqueue", "dequeue"];
        function animate() {
          if (step === 1) queue.push(4);
          if (step === 2) queue.shift();
          drawQueue(ctx, queue, steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

      // Binary Tree Animation
      function drawBinaryTree(ctx, tree, step) {
        ctx.clearRect(0, 0, 600, 300);
        const drawNode = (x, y, value, left, right) => {
          drawBox(ctx, x - 40, y, 80, 50, value, step === "insert" && (value === 2 || value === 3));
          if (left) {
            ctx.beginPath();
            ctx.moveTo(x, y + 50);
            ctx.lineTo(x - 50, y + 100);
            ctx.stroke();
            drawNode(x - 50, y + 100, left);
          }
          if (right) {
            ctx.beginPath();
            ctx.moveTo(x, y + 50);
            ctx.lineTo(x + 50, y + 100);
            ctx.stroke();
            drawNode(x + 50, y + 100, right);
          }
        };
        drawNode(300, 50, 1, step === "insert" ? 2 : null, step === "insert" ? 3 : null);
        ctx.fillStyle = VIS_TEXT;
        ctx.font = "16px Arial";
        ctx.fillText(step === "initial" ? "Initial Tree" : "Inserting Children", 300, 250);
      }
      function startBinaryTreeAnimation() {
        const canvas = document.getElementById("binaryTreeCanvas");
        const ctx = canvas.getContext("2d");
        let step = 0;
        const steps = ["initial", "insert"];
        function animate() {
          drawBinaryTree(ctx, null, steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

      // BST Animation
      function startBSTAnimation() {
        const canvas = document.getElementById("bstCanvas");
        const ctx = canvas.getContext("2d");
        let step = 0;
        const steps = ["initial", "insert5", "insert15"];
        function drawBST(step) {
          ctx.clearRect(0, 0, 600, 300);
          const drawNode = (x, y, value, left, right) => {
            drawBox(ctx, x - 40, y, 80, 50, value, step === "insert5" && value === 5 || step === "insert15" && value === 15);
            if (left) {
              ctx.beginPath();
              ctx.moveTo(x, y + 50);
              ctx.lineTo(x - 50, y + 100);
              ctx.stroke();
              drawNode(x - 50, y + 100, left);
            }
            if (right) {
              ctx.beginPath();
              ctx.moveTo(x, y + 50);
              ctx.lineTo(x + 50, y + 100);
              ctx.stroke();
              drawNode(x + 50, y + 100, right);
            }
          };
          if (step === "initial") drawNode(300, 50, 10);
          else if (step === "insert5") drawNode(300, 50, 10, 5);
          else drawNode(300, 50, 10, 5, 15);
          ctx.fillStyle = VIS_TEXT;
          ctx.font = "16px Arial";
          ctx.fillText(step === "initial" ? "BST: root 10" : step === "insert5" ? "Insert 5" : "Insert 15", 300, 250);
        }
        function animate() {
          drawBST(steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

      // AVL Tree Animation (simplified)
      function startAVLAnimation() {
        const canvas = document.getElementById("avlCanvas");
        const ctx = canvas.getContext("2d");
        let step = 0;
        const steps = ["initial", "insert"];
        function drawAVL(step) {
          ctx.clearRect(0, 0, 600, 300);
          const drawNode = (x, y, value, left, right) => {
            drawBox(ctx, x - 40, y, 80, 50, value);
            if (left) {
              ctx.beginPath();
              ctx.moveTo(x, y + 50);
              ctx.lineTo(x - 50, y + 100);
              ctx.stroke();
              drawNode(x - 50, y + 100, left);
            }
            if (right) {
              ctx.beginPath();
              ctx.moveTo(x, y + 50);
              ctx.lineTo(x + 50, y + 100);
              ctx.stroke();
              drawNode(x + 50, y + 100, right);
            }
          };
          drawNode(300, 50, 10, step === "insert" ? 5 : null, step === "insert" ? 15 : null);
          ctx.fillStyle = VIS_TEXT;
          ctx.font = "16px Arial";
          ctx.fillText(step === "initial" ? "Initial AVL" : "Balanced Insert", 300, 250);
        }
        function animate() {
          drawAVL(steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

      // Red-Black Tree Animation
      function startRedBlackAnimation() {
        const canvas = document.getElementById("redBlackCanvas");
        const ctx = canvas.getContext("2d");
        let step = 0;
        const steps = ["initial", "insert"];
        function drawRB(step) {
          ctx.clearRect(0, 0, 600, 300);
          const drawNode = (x, y, value, color, left, right) => {
            ctx.fillStyle = color === "black" ? "#000" : "#f00";
            ctx.beginPath();
            ctx.arc(x, y + 25, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#fff";
            ctx.fillText(value, x, y + 25);
            if (left) {
              ctx.beginPath();
              ctx.moveTo(x, y + 45);
              ctx.lineTo(x - 50, y + 95);
              ctx.stroke();
              drawNode(x - 50, y + 100, left, "red");
            }
            if (right) {
              ctx.beginPath();
              ctx.moveTo(x, y + 45);
              ctx.lineTo(x + 50, y + 95);
              ctx.stroke();
              drawNode(x + 50, y + 100, right, "red");
            }
          };
          drawNode(300, 50, 10, "black", step === "insert" ? 5 : null, step === "insert" ? 15 : null);
          ctx.fillStyle = VIS_TEXT;
          ctx.font = "16px Arial";
          ctx.fillText(step === "initial" ? "Initial RB Tree" : "Inserting Red Nodes", 300, 250);
        }
        function animate() {
          drawRB(steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

      // Trie Animation
      function startTrieAnimation() {
        const canvas = document.getElementById("trieCanvas");
        const ctx = canvas.getContext("2d");
        let step = 0;
        const steps = ["initial", "insertC", "insertA", "insertT"];
        const trie = { value: "", children: [] };
        function drawTrie(step) {
          ctx.clearRect(0, 0, 600, 300);
          const drawNode = (node, x, y, highlight = false) => {
            drawBox(ctx, x - 20, y, 40, 40, node.value, highlight);
            if (node.children.length) {
              let offset = -20 * (node.children.length - 1);
              node.children.forEach((child, i) => {
                ctx.beginPath();
                ctx.moveTo(x, y + 40);
                ctx.lineTo(x + offset + i * 40, y + 80);
                ctx.stroke();
                drawNode(child, x + offset + i * 40, y + 100, step === `insert${child.value.toUpperCase()}`);
              });
            }
          };
          if (step === "insertC") trie.children.push({ value: "c", children: [] });
          if (step === "insertA") trie.children[0].children.push({ value: "a", children: [] });
          if (step === "insertT") trie.children[0].children[0].children.push({ value: "t", children: [] });
          drawNode(trie, 300, 50);
          ctx.fillStyle = VIS_TEXT;
          ctx.font = "16px Arial";
          ctx.fillText(step === "initial" ? "Empty Trie" : `Inserting '${step.slice(6).toLowerCase()}'`, 300, 250);
        }
        function animate() {
          drawTrie(steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

      // Heap Animation
      function startHeapAnimation() {
        const canvas = document.getElementById("heapCanvas");
        const ctx = canvas.getContext("2d");
        let step = 0;
        const steps = ["initial", "insert10", "insert5", "insert15"];
        function drawHeap(step) {
          ctx.clearRect(0, 0, 600, 300);
          const drawNode = (x, y, value, left, right) => {
            drawBox(ctx, x - 40, y, 80, 50, value);
            if (left) {
              ctx.beginPath();
              ctx.moveTo(x, y + 50);
              ctx.lineTo(x - 50, y + 100);
              ctx.stroke();
              drawNode(x - 50, y + 100, left);
            }
            if (right) {
              ctx.beginPath();
              ctx.moveTo(x, y + 50);
              ctx.lineTo(x + 50, y + 100);
              ctx.stroke();
              drawNode(x + 50, y + 100, right);
            }
          };
          if (step === "initial") drawNode(300, 50, "");
          else if (step === "insert10") drawNode(300, 50, 10);
          else if (step === "insert5") drawNode(300, 50, 5, 10);
          else drawNode(300, 50, 5, 10, 15);
          ctx.fillStyle = VIS_TEXT;
          ctx.font = "16px Arial";
          ctx.fillText(step === "initial" ? "Empty Heap" : `Inserting ${step.slice(6)}`, 300, 250);
        }
        function animate() {
          drawHeap(steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

      // Undirected Graph Animation
      function startUndirectedGraphAnimation() {
        const canvas = document.getElementById("undirectedGraphCanvas");
        const ctx = canvas.getContext("2d");
        let step = 0;
        const steps = ["initial", "addEdges"];
        function drawGraph(step) {
          ctx.clearRect(0, 0, 600, 300);
          const nodes = { A: [150, 150], B: [250, 100], C: [250, 200], D: [350, 150] };
          if (step === "addEdges") {
            ctx.beginPath();
            ctx.moveTo(nodes.A[0], nodes.A[1]); ctx.lineTo(nodes.B[0], nodes.B[1]); ctx.stroke();
            ctx.moveTo(nodes.A[0], nodes.A[1]); ctx.lineTo(nodes.C[0], nodes.C[1]); ctx.stroke();
            ctx.moveTo(nodes.B[0], nodes.B[1]); ctx.lineTo(nodes.D[0], nodes.D[1]); ctx.stroke();
            ctx.moveTo(nodes.C[0], nodes.C[1]); ctx.lineTo(nodes.D[0], nodes.D[1]); ctx.stroke();
          }
          for (let node in nodes) {
            ctx.beginPath();
            ctx.arc(nodes[node][0], nodes[node][1], 20, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = VIS_MUTED;
            ctx.fillText(node, nodes[node][0], nodes[node][1]);
          }
          ctx.fillStyle = VIS_TEXT;
          ctx.font = "16px Arial";
          ctx.fillText(step === "initial" ? "Nodes" : "Adding Edges", 300, 250);
        }
        function animate() {
          drawGraph(steps[step]);
          step++;
          if (step < steps.length) setTimeout(animate, 2000);
        }
        animate();
      }

            // Directed Graph Animation
            function startDirectedGraphAnimation() {
              const canvas = document.getElementById("directedGraphCanvas");
              const ctx = canvas.getContext("2d");
              let step = 0;
              const steps = ["initial", "addEdges"];
              function drawGraph(step) {
                ctx.clearRect(0, 0, 600, 300);
                const nodes = { A: [150, 150], B: [250, 100], C: [250, 200], D: [350, 150] };
                if (step === "addEdges") {
                  // Draw directed edges with arrows
                  drawArrow(ctx, nodes.A[0], nodes.A[1], nodes.B[0], nodes.B[1]);
                  drawArrow(ctx, nodes.B[0], nodes.B[1], nodes.C[0], nodes.C[1]);
                  drawArrow(ctx, nodes.C[0], nodes.C[1], nodes.D[0], nodes.D[1]);
                }
                for (let node in nodes) {
                  ctx.beginPath();
                  ctx.arc(nodes[node][0], nodes[node][1], 20, 0, Math.PI * 2);
                  ctx.fillStyle = "#fff";
                  ctx.fill();
                  ctx.stroke();
                  ctx.fillStyle = VIS_MUTED;
                  ctx.fillText(node, nodes[node][0], nodes[node][1]);
                }
                ctx.fillStyle = VIS_TEXT;
                ctx.font = "16px Arial";
                ctx.fillText(step === "initial" ? "Nodes" : "Adding Directed Edges", 300, 250);
              }
              function animate() {
                drawGraph(steps[step]);
                step++;
                if (step < steps.length) setTimeout(animate, 2000);
              }
              animate();
            }
      
            // Utility function to draw an arrow
            function drawArrow(ctx, fromX, fromY, toX, toY) {
              ctx.beginPath();
              ctx.moveTo(fromX, fromY);
              ctx.lineTo(toX, toY);
              ctx.stroke();
              const headLength = 10;
              const angle = Math.atan2(toY - fromY, toX - fromX);
              ctx.beginPath();
              ctx.moveTo(toX, toY);
              ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
              ctx.moveTo(toX, toY);
              ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
              ctx.stroke();
            }
      
            // Weighted Graph Animation
            function startWeightedGraphAnimation() {
              const canvas = document.getElementById("weightedGraphCanvas");
              const ctx = canvas.getContext("2d");
              let step = 0;
              const steps = ["initial", "addEdges"];
              function drawGraph(step) {
                ctx.clearRect(0, 0, 600, 300);
                const nodes = { A: [150, 150], B: [250, 100], C: [250, 200], D: [350, 150] };
                if (step === "addEdges") {
                  drawArrow(ctx, nodes.A[0], nodes.A[1], nodes.B[0], nodes.B[1]);
                  ctx.fillText("4", (nodes.A[0] + nodes.B[0]) / 2, (nodes.A[1] + nodes.B[1]) / 2 - 10);
                  drawArrow(ctx, nodes.A[0], nodes.A[1], nodes.C[0], nodes.C[1]);
                  ctx.fillText("2", (nodes.A[0] + nodes.C[0]) / 2, (nodes.A[1] + nodes.C[1]) / 2 - 10);
                  drawArrow(ctx, nodes.B[0], nodes.B[1], nodes.D[0], nodes.D[1]);
                  ctx.fillText("3", (nodes.B[0] + nodes.D[0]) / 2, (nodes.B[1] + nodes.D[1]) / 2 - 10);
                  drawArrow(ctx, nodes.C[0], nodes.C[1], nodes.D[0], nodes.D[1]);
                  ctx.fillText("5", (nodes.C[0] + nodes.D[0]) / 2, (nodes.C[1] + nodes.D[1]) / 2 - 10);
                }
                for (let node in nodes) {
                  ctx.beginPath();
                  ctx.arc(nodes[node][0], nodes[node][1], 20, 0, Math.PI * 2);
                  ctx.fillStyle = "#fff";
                  ctx.fill();
                  ctx.stroke();
                  ctx.fillStyle = VIS_MUTED;
                  ctx.fillText(node, nodes[node][0], nodes[node][1]);
                }
                ctx.fillStyle = VIS_TEXT;
                ctx.font = "16px Arial";
                ctx.fillText(step === "initial" ? "Nodes" : "Adding Weighted Edges", 300, 250);
              }
              function animate() {
                drawGraph(steps[step]);
                step++;
                if (step < steps.length) setTimeout(animate, 2000);
              }
              animate();
            }
      
            // Bubble Sort Animation
            function startBubbleSortAnimation() {
              const canvas = document.getElementById("bubbleSortCanvas");
              const ctx = canvas.getContext("2d");
              let array = [64, 34, 25, 12, 22];
              let step = 0;
              let i = 0;
              let j = 0;
              function drawArray() {
                ctx.clearRect(0, 0, 600, 300);
                const barWidth = 80;
                const maxHeight = 200;
                for (let k = 0; k < array.length; k++) {
                  const height = (array[k] / 64) * maxHeight;
                  ctx.fillStyle = VIS_ACCENT2;
                  ctx.fillRect(50 + k * (barWidth + 10), 250 - height, barWidth, height);
                  ctx.fillStyle = "#fff";
                  ctx.fillText(array[k], 50 + k * (barWidth + 10) + barWidth / 2, 240 - height);
                }
                ctx.fillStyle = VIS_TEXT;
                ctx.fillText("Bubble Sort Step " + step, 300, 280);
              }
              function animate() {
                if (i < array.length - 1) {
                  if (j < array.length - i - 1) {
                    if (array[j] > array[j + 1]) {
                  ctx.fillText(step === "initial" ? "Initial Array" : step === "access" ? "Accessing Index 2" : "Updating Index 1", 300, 250);
                    }
                    drawArray();
                    step++;
                    j++;
                    setTimeout(animate, 1000);
                  } else {
                    i++;
                    j = 0;
                    setTimeout(animate, 1000);
                  }
                } else {
                  drawArray();
                }
              }
              animate();
            }
      
            // Merge Sort Animation
            function startMergeSortAnimation() {
              const canvas = document.getElementById("mergeSortCanvas");
              const ctx = canvas.getContext("2d");
              let array = [38, 27, 43, 3, 9];
              let step = 0;
              const steps = [];
              function mergeSort(arr) {
                if (arr.length <= 1) return arr;
                const mid = Math.floor(arr.length / 2);
                const left = arr.slice(0, mid);
                const right = arr.slice(mid);
                steps.push([...arr]);
                return merge(mergeSort(left), mergeSort(right));
              }
              function merge(left, right) {
                let result = [];
                let i = 0, j = 0;
                while (i < left.length && j < right.length) {
                  if (left[i] <= right[j]) result.push(left[i++]);
                  else result.push(right[j++]);
                }
                result = result.concat(left.slice(i)).concat(right.slice(j));
                steps.push([...result]);
                return result;
              }
              mergeSort(array);
              function drawArray() {
                ctx.clearRect(0, 0, 600, 300);
                const barWidth = 80;
                const maxHeight = 200;
                const currentArray = steps[step] || steps[steps.length - 1];
                for (let k = 0; k < currentArray.length; k++) {
                  const height = (currentArray[k] / 43) * maxHeight;
                  ctx.fillStyle = VIS_ACCENT;
                  ctx.fillRect(50 + k * (barWidth + 10), 250 - height, barWidth, height);
                  ctx.fillStyle = "#fff";
                  ctx.fillText(currentArray[k], 50 + k * (barWidth + 10) + barWidth / 2, 240 - height);
                }
                ctx.fillStyle = VIS_TEXT;
                ctx.fillText("Merge Sort Step " + step, 300, 280);
              }
              function animate() {
                drawArray();
                step++;
                if (step < steps.length) setTimeout(animate, 2000);
              }
              animate();
            }
      
            // Quick Sort Animation
            function startQuickSortAnimation() {
              const canvas = document.getElementById("quickSortCanvas");
              const ctx = canvas.getContext("2d");
              let array = [10, 7, 8, 9, 1];
              let step = 0;
              const steps = [];
              function quickSort(arr, low, high) {
                if (low < high) {
                  const pi = partition(arr, low, high);
                  steps.push([...arr]);
                  quickSort(arr, low, pi - 1);
                  quickSort(arr, pi + 1, high);
                }
              }
              function partition(arr, low, high) {
                const pivot = arr[high];
                let i = low - 1;
                for (let j = low; j < high; j++) {
                  if (arr[j] <= pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                  }
                }
                [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                return i + 1;
              }
              quickSort(array, 0, array.length - 1);
              steps.push([...array]);
              function drawArray() {
                ctx.clearRect(0, 0, 600, 300);
                const barWidth = 80;
                const maxHeight = 200;
                const currentArray = steps[step] || steps[steps.length - 1];
                for (let k = 0; k < currentArray.length; k++) {
                  const height = (currentArray[k] / 10) * maxHeight;
                  ctx.fillStyle = VIS_ACCENT;
                  ctx.fillRect(50 + k * (barWidth + 10), 250 - height, barWidth, height);
                  ctx.fillStyle = "#fff";
                  ctx.fillText(currentArray[k], 50 + k * (barWidth + 10) + barWidth / 2, 240 - height);
                }
                ctx.fillStyle = VIS_TEXT;
                ctx.fillText("Quick Sort Step " + step, 300, 280);
              }
              function animate() {
                drawArray();
                step++;
                if (step < steps.length) setTimeout(animate, 2000);
              }
              animate();
            }
      
            // Hash Table with Chaining Animation
            function startChainingAnimation() {
              const canvas = document.getElementById("chainingCanvas");
              const ctx = canvas.getContext("2d");
              let step = 0;
              const steps = ["initial", "insertApple", "insertBanana"];
              const table = [[], [], [], [], []];
              function drawTable() {
                ctx.clearRect(0, 0, 600, 300);
                const boxWidth = 100;
                const boxHeight = 50;
                for (let i = 0; i < table.length; i++) {
                  drawBox(ctx, 50, 50 + i * (boxHeight + 10), boxWidth, boxHeight, i);
                  let chainX = 150;
                  table[i].forEach(item => {
                    drawBox(ctx, chainX, 50 + i * (boxHeight + 10), boxWidth, boxHeight, `${item[0]}:${item[1]}`, step === "insertApple" && item[0] === "apple" || step === "insertBanana" && item[0] === "banana");
                    chainX += boxWidth + 10;
                  });
                }
                ctx.fillStyle = VIS_TEXT;
                ctx.font = "16px Arial";
                ctx.fillText(step === "initial" ? "Empty Hash Table" : `Inserting ${step === "insertApple" ? "apple:1" : "banana:2"}`, 300, 280);
              }
              function animate() {
                if (step === 1) table[2].push(["apple", 1]);
                if (step === 2) table[2].push(["banana", 2]);
                drawTable();
                step++;
                if (step < steps.length) setTimeout(animate, 2000);
              }
              animate();
            }
      
            // Hash Table with Open Addressing Animation
            function startOpenAddressingAnimation() {
              const canvas = document.getElementById("openAddressingCanvas");
              const ctx = canvas.getContext("2d");
              let step = 0;
              const steps = ["initial", "insertApple", "insertBanana"];
              const table = [null, null, null, null, null];
              function drawTable() {
                ctx.clearRect(0, 0, 600, 300);
                const boxWidth = 100;
                const boxHeight = 50;
                for (let i = 0; i < table.length; i++) {
                  drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, table[i] ? `${table[i][0]}:${table[i][1]}` : "", 
                    step === "insertApple" && table[i] && table[i][0] === "apple" || step === "insertBanana" && table[i] && table[i][0] === "banana");
                  ctx.fillStyle = VIS_MUTED;
                    ctx.fillText(i, 50 + i * (boxWidth + 10) + boxWidth / 2, 80);
                  }
                  ctx.fillStyle = VIS_TEXT;
                  ctx.font = "16px Arial";
                  ctx.fillText(step === "initial" ? "Empty Hash Table" : `Inserting ${step === "insertApple" ? "apple:1" : "banana:2"}`, 300, 280);
              }
              function animate() {
                if (step === 1) table[2] = ["apple", 1];
                if (step === 2) table[3] = ["banana", 2];
                drawTable();
                step++;
                if (step < steps.length) setTimeout(animate, 2000);
              }
              animate();
            }
      
            // Linear Search Animation
            function startLinearSearchAnimation() {
              const canvas = document.getElementById("linearSearchCanvas");
              const ctx = canvas.getContext("2d");
              let array = [4, 2, 7, 1, 9];
              let step = 0;
              const target = 7;
              function drawArray() {
                ctx.clearRect(0, 0, 600, 300);
                const boxWidth = 80;
                const boxHeight = 50;
                for (let i = 0; i < array.length; i++) {
                  drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i], i === step && array[i] !== target || array[i] === target && i <= step);
                  if (array[i] === target && i <= step) {
                    ctx.fillStyle = VIS_ACCENT2;
                    ctx.fillText("Found!", 50 + i * (boxWidth + 10) + boxWidth / 2, 160);
                  }
                }
                ctx.fillStyle = VIS_TEXT;
                ctx.font = "16px Arial";
                ctx.fillText(`Linear Search for ${target} - Step ${step}`, 300, 280);
              }
              function animate() {
                drawArray();
                step++;
                if (step < array.length && array[step - 1] !== target) setTimeout(animate, 1000);
              }
              animate();
            }
      
            // Binary Search Animation
            function startBinarySearchAnimation() {
              const canvas = document.getElementById("binarySearchCanvas");
              const ctx = canvas.getContext("2d");
              let array = [2, 3, 4, 10, 40];
              let step = 0;
              const steps = [];
              function binarySearch(arr, target) {
                let left = 0, right = arr.length - 1;
                while (left <= right) {
                  const mid = Math.floor((left + right) / 2);
                  steps.push({ left, right, mid });
                  if (arr[mid] === target) return mid;
                  else if (arr[mid] < target) left = mid + 1;
                  else right = mid - 1;
                }
                return -1;
              }
              binarySearch(array, 10);
              function drawArray() {
                ctx.clearRect(0, 0, 600, 300);
                const boxWidth = 80;
                const boxHeight = 50;
                const currentStep = steps[step] || steps[steps.length - 1];
                for (let i = 0; i < array.length; i++) {
                  drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i], 
                    i >= currentStep.left && i <= currentStep.right && i !== currentStep.mid || i === currentStep.mid);
                  if (i === currentStep.mid) {
                    ctx.fillStyle = array[i] === 10 ? VIS_ACCENT2 : "#ff6b6b";
                    ctx.fillText(array[i] === 10 ? "Found!" : "Checking", 50 + i * (boxWidth + 10) + boxWidth / 2, 160);
                  }
                }
                ctx.fillStyle = VIS_TEXT;
                ctx.font = "16px Arial";
                ctx.fillText(`Binary Search for 10 - Step ${step}`, 300, 280);
              }
              function animate() {
                drawArray();
                step++;
                if (step < steps.length) setTimeout(animate, 2000);
              }
              animate();
            }
      
            // Jump Search Animation
            function startJumpSearchAnimation() {
              const canvas = document.getElementById("jumpSearchCanvas");
              const ctx = canvas.getContext("2d");
              let array = [1, 3, 5, 7, 9, 11, 13];
              let step = 0;
              const steps = [];
              function jumpSearch(arr, target) {
                const n = arr.length;
                const jump = Math.floor(Math.sqrt(n));
                let prev = 0;
                while (arr[Math.min(jump, n) - 1] < target) {
                  steps.push({ start: prev, end: jump });
                  prev = jump;
                  jump += Math.floor(Math.sqrt(n));
                  if (prev >= n) return -1;
                }
                steps.push({ start: prev, end: Math.min(jump, n) });
                while (arr[prev] < target) {
                  steps.push({ start: prev, end: prev });
                  prev++;
                  if (prev === Math.min(jump, n)) return -1;
                }
                if (arr[prev] === target) steps.push({ start: prev, end: prev });
                return arr[prev] === target ? prev : -1;
              }
              jumpSearch(array, 7);
              function drawArray() {
                ctx.clearRect(0, 0, 600, 300);
                const boxWidth = 80;
                const boxHeight = 50;
                const currentStep = steps[step] || steps[steps.length - 1];
                for (let i = 0; i < array.length; i++) {
                  drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i], 
                    i >= currentStep.start && i <= currentStep.end || i === currentStep.start && array[i] === 7);
                  if (i === currentStep.start && array[i] === 7) {
                    ctx.fillStyle = VIS_ACCENT2;
                    ctx.fillText("Found!", 50 + i * (boxWidth + 10) + boxWidth / 2, 160);
                  }
                }
                ctx.fillStyle = VIS_TEXT;
                ctx.font = "16px Arial";
                ctx.fillText(`Jump Search for 7 - Step ${step}`, 300, 280);
              }
              function animate() {
                drawArray();
                step++;
                if (step < steps.length) setTimeout(animate, 2000);
              }
              animate();
            }

// ========== INTERACTIVE VISUALIZATION FUNCTIONS ==========

// Global state for interactive visuals
let interactiveState = {
  array: [10, 20, 30, 40, 50],
  linkedList: [10, 20, 30],
  stack: [1, 2, 3],
  queue: [1, 2, 3],
  bst: { value: 10, left: { value: 5 }, right: { value: 15 } },
  hashTable: [[], [], [], [], []],
  sortArray: [64, 34, 25, 12, 22]
};

// ===== ARRAYS =====
function interactiveArrayInsert() {
  const val = parseInt(document.getElementById('arrayValue').value) || 50;
  interactiveState.array.push(val);
  interactiveArrayVisualize();
}

function interactiveArrayDelete() {
  if (interactiveState.array.length > 0) {
    interactiveState.array.pop();
  }
  interactiveArrayVisualize();
}

function interactiveArrayClear() {
  interactiveState.array = [];
  interactiveArrayVisualize();
}

function interactiveArrayVisualize() {
  const canvas = document.getElementById('arrayCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const boxWidth = 80;
  const boxHeight = 50;
  const startX = 50;
  const startY = 100;
  
  for (let i = 0; i < interactiveState.array.length; i++) {
    drawBox(ctx, startX + i * (boxWidth + 10), startY, boxWidth, boxHeight, interactiveState.array[i]);
    ctx.fillStyle = VIS_MUTED;
    ctx.font = '12px Arial';
    ctx.textBaseline = 'top';
    ctx.fillText(`[${i}]`, startX + i * (boxWidth + 10) + boxWidth / 2, startY + boxHeight + 14);
  }
  
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.fillText(`Array: ${interactiveState.array.length} elements`, 300, 250);
}

// ===== LINKED LISTS =====
function interactiveListInsert() {
  const val = parseInt(document.getElementById('llValue').value) || 10;
  interactiveState.linkedList.push(val);
  interactiveListVisualize();
}

function interactiveListDelete() {
  if (interactiveState.linkedList.length > 0) {
    interactiveState.linkedList.pop();
  }
  interactiveListVisualize();
}

function interactiveListVisualize() {
  const canvas = document.getElementById('linkedListCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const boxWidth = 80;
  const boxHeight = 50;
  const startX = 50;
  const startY = 100;
  
  for (let i = 0; i < interactiveState.linkedList.length; i++) {
    drawBox(ctx, startX + i * (boxWidth + 40), startY, boxWidth, boxHeight, interactiveState.linkedList[i]);
    if (i < interactiveState.linkedList.length - 1) {
      ctx.strokeStyle = VIS_ACCENT;
      ctx.beginPath();
      ctx.moveTo(startX + i * (boxWidth + 40) + boxWidth, startY + boxHeight / 2);
      ctx.lineTo(startX + (i + 1) * (boxWidth + 40), startY + boxHeight / 2);
      ctx.stroke();
      ctx.fillStyle = VIS_TEXT;
      ctx.font = '12px Arial';
      ctx.fillText('→', startX + i * (boxWidth + 40) + boxWidth + 12, startY + boxHeight / 2 - 6);
    }
  }
  
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.fillText(`Linked List: ${interactiveState.linkedList.length} nodes`, 300, 250);
}

// ===== STACKS =====
function interactiveStackPush() {
  const val = parseInt(document.getElementById('stackValue').value) || 15;
  interactiveState.stack.push(val);
  interactiveStackVisualize();
}

function interactiveStackPop() {
  if (interactiveState.stack.length > 0) {
    interactiveState.stack.pop();
  }
  interactiveStackVisualize();
}

function interactiveStackVisualize() {
  const canvas = document.getElementById('stackCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const boxWidth = 80;
  const boxHeight = 50;
  const startX = 300 - boxWidth / 2;
  const startY = 250;
  
  for (let i = 0; i < interactiveState.stack.length; i++) {
    drawBox(ctx, startX, startY - i * (boxHeight + 10), boxWidth, boxHeight, interactiveState.stack[i], i === interactiveState.stack.length - 1);
  }
  
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.fillText(`Stack (Top): ${interactiveState.stack.length > 0 ? interactiveState.stack[interactiveState.stack.length - 1] : 'Empty'}`, 300, 50);
}

// ===== QUEUES =====
function interactiveQueueEnqueue() {
  const val = parseInt(document.getElementById('queueValue').value) || 20;
  interactiveState.queue.push(val);
  interactiveQueueVisualize();
}

function interactiveQueueDequeue() {
  if (interactiveState.queue.length > 0) {
    interactiveState.queue.shift();
  }
  interactiveQueueVisualize();
}

function interactiveQueueVisualize() {
  const canvas = document.getElementById('queueCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const boxWidth = 80;
  const boxHeight = 50;
  const startX = 50;
  const startY = 100;
  
  for (let i = 0; i < interactiveState.queue.length; i++) {
    drawBox(ctx, startX + i * (boxWidth + 10), startY, boxWidth, boxHeight, interactiveState.queue[i], i === 0);
  }
  
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.fillText(`Queue (Front): ${interactiveState.queue.length > 0 ? interactiveState.queue[0] : 'Empty'}`, 300, 250);
}

// ===== BST =====
function interactiveBSTInsert() {
  const val = parseInt(document.getElementById('bstValue').value) || 25;
  insertBSTNode(val);
  interactiveBSTVisualize();
}

function interactiveBSTSearch() {
  const val = parseInt(document.getElementById('bstValue').value) || 25;
  searchBSTNode(val);
}

function interactiveBSTVisualize() {
  const canvas = document.getElementById('bstCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  drawBSTHelper(ctx, interactiveState.bst, 300, 50);
}

function drawBSTHelper(ctx, node, x, y) {
  if (!node) return;
  drawBox(ctx, x - 40, y, 80, 50, node.value);
  if (node.left) {
    ctx.strokeStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.moveTo(x, y + 50);
    ctx.lineTo(x - 80, y + 100);
    ctx.stroke();
    drawBSTHelper(ctx, node.left, x - 80, y + 100);
  }
  if (node.right) {
    ctx.strokeStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.moveTo(x, y + 50);
    ctx.lineTo(x + 80, y + 100);
    ctx.stroke();
    drawBSTHelper(ctx, node.right, x + 80, y + 100);
  }
}

function insertBSTNode(val) {
  function insert(node, val) {
    if (!node) return { value: val, left: null, right: null };
    if (val < node.value) node.left = insert(node.left, val);
    else if (val > node.value) node.right = insert(node.right, val);
    return node;
  }
  interactiveState.bst = insert(interactiveState.bst, val);
}

function searchBSTNode(val) {
  function search(node, val) {
    if (!node) return false;
    if (val === node.value) return true;
    if (val < node.value) return search(node.left, val);
    return search(node.right, val);
  }
  const found = search(interactiveState.bst, val);
  alert(found ? `Value ${val} found!` : `Value ${val} not found.`);
}

// ===== GRAPHS =====
function interactiveGraphAddNode() {
  const node = document.getElementById('graphNode').value || 'E';
  // Simplified: just redraw with new node indicator
  interactiveGraphVisualize();
}

function interactiveGraphVisualize() {
  const canvas = document.getElementById('undirectedGraphCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const nodes = { A: [150, 150], B: [250, 100], C: [250, 200], D: [350, 150], E: [450, 150] };
  ctx.strokeStyle = VIS_ACCENT;
  ctx.beginPath();
  ctx.moveTo(nodes.A[0], nodes.A[1]); ctx.lineTo(nodes.B[0], nodes.B[1]); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(nodes.A[0], nodes.A[1]); ctx.lineTo(nodes.C[0], nodes.C[1]); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(nodes.B[0], nodes.B[1]); ctx.lineTo(nodes.D[0], nodes.D[1]); ctx.stroke();
  
  for (let n in nodes) {
    ctx.fillStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.arc(nodes[n][0], nodes[n][1], 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = VIS_TEXT;
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(n, nodes[n][0], nodes[n][1]);
  }
  
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Undirected Graph', 300, 280);
}

// ===== SORTING =====
function interactiveBubbleSort() {
  let arr = [...interactiveState.sortArray];
  let step = 0;
  const steps = [arr];
  
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push([...arr]);
      }
    }
  }
  
  let stepIdx = 0;
  function animateSort() {
    const canvas = document.getElementById('bubbleSortCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 300);
    
    const barWidth = 80;
    const maxHeight = 200;
    for (let k = 0; k < steps[stepIdx].length; k++) {
      const height = (steps[stepIdx][k] / 64) * maxHeight;
      ctx.fillStyle = VIS_ACCENT;
      ctx.fillRect(50 + k * (barWidth + 10), 250 - height, barWidth, height);
      ctx.fillStyle = VIS_TEXT;
      ctx.font = '12px Arial';
      ctx.fillText(steps[stepIdx][k], 50 + k * (barWidth + 10) + barWidth / 2, 240 - height);
    }
    
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '16px Arial';
    ctx.fillText(`Bubble Sort Step ${stepIdx}/${steps.length - 1}`, 300, 280);
    
    stepIdx++;
    if (stepIdx < steps.length) setTimeout(animateSort, 500);
  }
  animateSort();
}

function interactiveSortShuffle() {
  interactiveState.sortArray = interactiveState.sortArray.sort(() => Math.random() - 0.5);
  interactiveSortVisualize();
}

function interactiveSortVisualize() {
  const canvas = document.getElementById('bubbleSortCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const barWidth = 80;
  const maxHeight = 200;
  for (let k = 0; k < interactiveState.sortArray.length; k++) {
    const height = (interactiveState.sortArray[k] / 64) * maxHeight;
    ctx.fillStyle = VIS_ACCENT;
    ctx.fillRect(50 + k * (barWidth + 10), 250 - height, barWidth, height);
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '12px Arial';
    ctx.fillText(interactiveState.sortArray[k], 50 + k * (barWidth + 10) + barWidth / 2, 240 - height);
  }
  
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.fillText('Bubble Sort Array', 300, 280);
}

// ===== HASHING =====
function interactiveHashInsert() {
  const key = document.getElementById('hashKey').value || 'apple';
  const val = parseInt(document.getElementById('hashValue').value) || 5;
  const hash = key.charCodeAt(0) % 5;
  interactiveState.hashTable[hash].push([key, val]);
  interactiveHashVisualize();
}

function interactiveHashSearch() {
  const key = document.getElementById('hashKey').value || 'apple';
  const hash = key.charCodeAt(0) % 5;
  const found = interactiveState.hashTable[hash].find(pair => pair[0] === key);
  alert(found ? `Found: ${key} = ${found[1]}` : `Key ${key} not found.`);
}

function interactiveHashVisualize() {
  const canvas = document.getElementById('chainingCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const boxWidth = 100;
  const boxHeight = 50;
  for (let i = 0; i < interactiveState.hashTable.length; i++) {
    drawBox(ctx, 50, 50 + i * (boxHeight + 10), boxWidth, boxHeight, `Bucket ${i}`);
    let chainX = 150;
    interactiveState.hashTable[i].forEach(pair => {
      drawBox(ctx, chainX, 50 + i * (boxHeight + 10), boxWidth, boxHeight, `${pair[0]}:${pair[1]}`);
      chainX += boxWidth + 10;
    });
  }
  
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.fillText('Hash Table (Chaining)', 300, 280);
}

// ===== SEARCHING =====
function interactiveLinearSearch() {
  const target = parseInt(document.getElementById('searchTarget').value) || 7;
  const array = [4, 2, 7, 1, 9];
  let step = 0;
  
  function animateSearch() {
    const canvas = document.getElementById('linearSearchCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 300);
    
    const boxWidth = 80;
    const boxHeight = 50;
    for (let i = 0; i < array.length; i++) {
      drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i], i === step);
      if (array[i] === target && i <= step) {
        ctx.fillStyle = VIS_ACCENT2;
        ctx.fillText('Found!', 50 + i * (boxWidth + 10) + boxWidth / 2, 160);
      }
    }
    
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '16px Arial';
    ctx.fillText(`Linear Search for ${target} - Step ${step}`, 300, 250);
    
    step++;
    if (step < array.length && array[step - 1] !== target) setTimeout(animateSearch, 800);
  }
  animateSearch();
}

function interactiveSearchVisualize() {
  const canvas = document.getElementById('linearSearchCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const array = [4, 2, 7, 1, 9];
  const boxWidth = 80;
  const boxHeight = 50;
  for (let i = 0; i < array.length; i++) {
    drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i]);
  }
  
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.fillText('Linear Search Array', 300, 250);
}

// ========== NEW SEARCHING FUNCTIONS ==========

function startLinearSearchInteractive() {
  const target = parseInt(document.getElementById('linearSearchTarget').value) || 7;
  const array = [4, 2, 7, 1, 9];
  let step = 0;
  
  function animateLinearSearch() {
    const canvas = document.getElementById('linearSearchCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 300);
    
    const boxWidth = 80;
    const boxHeight = 50;
    let found = false;
    
    for (let i = 0; i < array.length; i++) {
      const isCurrentStep = i === step;
      const isFound = array[i] === target && i <= step;
      drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i], isCurrentStep || isFound);
      
      if (isFound) {
        found = true;
        ctx.fillStyle = VIS_ACCENT2;
        ctx.font = 'bold 14px Arial';
        ctx.fillText('✓ Found!', 50 + i * (boxWidth + 10) + boxWidth / 2, 160);
      }
    }
    
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '16px Arial';
    ctx.fillText(`Searching for: ${target} | Step: ${step} / ${array.length}`, 300, 50);
    
    if (!found) {
      ctx.fillText(found ? 'Target Found!' : `Comparing with ${array[step] || 'N/A'}`, 300, 250);
    }
    
    step++;
    if (step < array.length && !found) setTimeout(animateLinearSearch, 600);
  }
  animateLinearSearch();
}

function visualizeLinearArray() {
  const canvas = document.getElementById('linearSearchCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const array = [4, 2, 7, 1, 9];
  const boxWidth = 80;
  const boxHeight = 50;
  
  for (let i = 0; i < array.length; i++) {
    drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i]);
    ctx.fillStyle = VIS_MUTED;
    ctx.font = '12px Arial';
    ctx.fillText(`[${i}]`, 50 + i * (boxWidth + 10) + boxWidth / 2, 160);
  }
  
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.fillText('Linear Search Array (Unsorted)', 300, 250);
}

// ========== BINARY SEARCH ==========

function startBinarySearchInteractive() {
  const target = parseInt(document.getElementById('binarySearchTarget').value) || 10;
  const array = [2, 3, 4, 10, 40];
  let left = 0, right = array.length - 1;
  let step = 0;
  const steps = [];
  
  // Record all steps
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({ left, right, mid, found: array[mid] === target });
    
    if (array[mid] === target) break;
    else if (array[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  function animateBinarySearch() {
    const canvas = document.getElementById('binarySearchCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 300);
    
    const boxWidth = 80;
    const boxHeight = 50;
    const currentStep = steps[step] || steps[steps.length - 1];
    
    for (let i = 0; i < array.length; i++) {
      const isInRange = i >= currentStep.left && i <= currentStep.right;
      const isMid = i === currentStep.mid;
      const isFound = currentStep.found && isMid;
      
      drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i], isMid);
      
      if (isInRange) {
        ctx.strokeStyle = VIS_ACCENT2;
        ctx.lineWidth = 2;
        ctx.strokeRect(50 + i * (boxWidth + 10) - 2, 100 - 2, boxWidth + 4, boxHeight + 4);
      }
      
      if (isFound) {
        ctx.fillStyle = VIS_ACCENT2;
        ctx.font = 'bold 14px Arial';
        ctx.fillText('✓', 50 + i * (boxWidth + 10) + boxWidth / 2, 160);
      }
    }
    
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '14px Arial';
    ctx.fillText(`Target: ${target} | Range: [${currentStep.left}...${currentStep.right}] | Mid: ${currentStep.mid}`, 300, 50);
    ctx.fillText(currentStep.found ? '✓ Found!' : `Value ${array[currentStep.mid]} (${array[currentStep.mid] < target ? '<' : '>'} ${target})`, 300, 250);
    
    step++;
    if (step < steps.length) setTimeout(animateBinarySearch, 800);
  }
  animateBinarySearch();
}

function visualizeBinaryArray() {
  const canvas = document.getElementById('binarySearchCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const array = [2, 3, 4, 10, 40];
  const boxWidth = 80;
  const boxHeight = 50;
  
  for (let i = 0; i < array.length; i++) {
    drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i]);
    ctx.fillStyle = VIS_MUTED;
    ctx.font = '12px Arial';
    ctx.fillText(`[${i}]`, 50 + i * (boxWidth + 10) + boxWidth / 2, 160);
  }
  
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.fillText('Binary Search Array (Sorted)', 300, 250);
}

// ========== JUMP SEARCH ==========

function startJumpSearchInteractive() {
  const target = parseInt(document.getElementById('jumpSearchTarget').value) || 7;
  const array = [1, 3, 5, 7, 9, 11, 13];
  const step = Math.floor(Math.sqrt(array.length));
  let prev = 0;
  let jumpSteps = [];
  
  // Jumping phase
  let jumpPos = step;
  while (array[Math.min(jumpPos, array.length) - 1] < target) {
    jumpSteps.push({ phase: 'jump', position: Math.min(jumpPos, array.length) - 1, prev, next: jumpPos });
    prev = jumpPos;
    jumpPos += step;
    if (prev >= array.length) break;
  }
  
  // Linear search phase
  let linearStart = prev;
  for (let i = linearStart; i < Math.min(prev + step, array.length); i++) {
    jumpSteps.push({ phase: 'linear', position: i });
    if (array[i] === target) {
      jumpSteps[jumpSteps.length - 1].found = true;
      break;
    }
  }
  
  let currentStepIdx = 0;
  
  function animateJumpSearch() {
    const canvas = document.getElementById('jumpSearchCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 300);
    
    const boxWidth = 80;
    const boxHeight = 50;
    const currentJumpStep = jumpSteps[currentStepIdx] || jumpSteps[jumpSteps.length - 1];
    
    for (let i = 0; i < array.length; i++) {
      const highlight = (currentJumpStep.phase === 'jump' && i === currentJumpStep.position) ||
                       (currentJumpStep.phase === 'linear' && i === currentJumpStep.position);
      drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i], highlight);
      
      if (currentJumpStep.phase === 'jump' && i >= currentJumpStep.prev && i <= currentJumpStep.next) {
        ctx.strokeStyle = VIS_ACCENT2;
        ctx.lineWidth = 2;
        ctx.strokeRect(50 + i * (boxWidth + 10) - 2, 100 - 2, boxWidth + 4, boxHeight + 4);
      }
      
      if (currentJumpStep.found && i === currentJumpStep.position) {
        ctx.fillStyle = VIS_ACCENT2;
        ctx.font = 'bold 14px Arial';
        ctx.fillText('✓', 50 + i * (boxWidth + 10) + boxWidth / 2, 160);
      }
    }
    
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '14px Arial';
    ctx.fillText(`Jump Search for: ${target} | Phase: ${currentJumpStep.phase.toUpperCase()} | Jump Size: ${step}`, 300, 50);
    ctx.fillText(currentJumpStep.found ? '✓ Target Found!' : `Step ${currentStepIdx + 1} / ${jumpSteps.length}`, 300, 250);
    
    currentStepIdx++;
    if (currentStepIdx < jumpSteps.length) setTimeout(animateJumpSearch, 800);
  }
  animateJumpSearch();
}

function visualizeJumpArray() {
  const canvas = document.getElementById('jumpSearchCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  
  const array = [1, 3, 5, 7, 9, 11, 13];
  const boxWidth = 80;
  const boxHeight = 50;
  const step = Math.floor(Math.sqrt(array.length));
  
  for (let i = 0; i < array.length; i++) {
    drawBox(ctx, 50 + i * (boxWidth + 10), 100, boxWidth, boxHeight, array[i]);
    ctx.fillStyle = VIS_MUTED;
    ctx.font = '12px Arial';
    ctx.fillText(`[${i}]`, 50 + i * (boxWidth + 10) + boxWidth / 2, 160);
  }
  
  ctx.fillStyle = VIS_ACCENT2;
  ctx.font = 'bold 12px Arial';
  ctx.fillText(`Jump Size: √${array.length} = ${step}`, 300, 250);
}

// ========== AVL TREE INTERACTIVE ==========
function interactiveAVLInsert() {
  const val = parseInt(document.getElementById('avlValue').value) || 20;
  if (!interactiveState.avl) interactiveState.avl = null;
  interactiveState.avl = insertAVLNode(interactiveState.avl, val);
  interactiveAVLVisualize();
}

function interactiveAVLVisualize() {
  const canvas = document.getElementById('avlCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  if (interactiveState.avl) drawAVLTree(ctx, interactiveState.avl, 300, 50);
  else {
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '16px Arial';
    ctx.fillText('Empty AVL Tree', 300, 150);
  }
}

function insertAVLNode(node, val) {
  if (!node) return { value: val, left: null, right: null, height: 1 };
  if (val < node.value) node.left = insertAVLNode(node.left, val);
  else if (val > node.value) node.right = insertAVLNode(node.right, val);
  else return node;
  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  const balance = getBalance(node);
  if (balance > 1 && val < node.left.value) return rotateRight(node);
  if (balance < -1 && val > node.right.value) return rotateLeft(node);
  if (balance > 1 && val > node.left.value) {
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }
  if (balance < -1 && val < node.right.value) {
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }
  return node;
}

function getHeight(node) { return node ? node.height : 0; }
function getBalance(node) { return node ? getHeight(node.left) - getHeight(node.right) : 0; }

function rotateRight(y) {
  const x = y.left;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  return x;
}

function rotateLeft(x) {
  const y = x.right;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  return y;
}

function drawAVLTree(ctx, node, x, y) {
  if (!node) return;
  drawBox(ctx, x - 40, y, 80, 50, node.value);
  if (node.left) {
    ctx.strokeStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.moveTo(x, y + 50);
    ctx.lineTo(x - 100, y + 100);
    ctx.stroke();
    drawAVLTree(ctx, node.left, x - 100, y + 100);
  }
  if (node.right) {
    ctx.strokeStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.moveTo(x, y + 50);
    ctx.lineTo(x + 100, y + 100);
    ctx.stroke();
    drawAVLTree(ctx, node.right, x + 100, y + 100);
  }
}

// ========== RED-BLACK TREE INTERACTIVE ==========
function interactiveRBInsert() {
  const val = parseInt(document.getElementById('rbValue').value) || 20;
  if (!interactiveState.rb) interactiveState.rb = { value: val, color: 'black', left: null, right: null };
  else interactiveState.rb = insertRBNode(interactiveState.rb, val);
  interactiveRBVisualize();
}

function interactiveRBVisualize() {
  const canvas = document.getElementById('redBlackCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  if (interactiveState.rb) drawRBTree(ctx, interactiveState.rb, 300, 50);
  else {
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '16px Arial';
    ctx.fillText('Empty Red-Black Tree', 300, 150);
  }
}

function insertRBNode(node, val) {
  function insert(node, val) {
    if (!node) return { value: val, color: 'red', left: null, right: null };
    if (val < node.value) node.left = insert(node.left, val);
    else if (val > node.value) node.right = insert(node.right, val);
    else return node;
    return node;
  }
  return insert(node, val);
}

function drawRBTree(ctx, node, x, y) {
  if (!node) return;
  const color = node.color === 'black' ? '#1a1a1a' : '#ff4444';
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y + 25, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = VIS_ACCENT;
  ctx.stroke();
  ctx.fillStyle = VIS_TEXT;
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(node.value, x, y + 25);
  if (node.left) {
    ctx.strokeStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.moveTo(x, y + 45);
    ctx.lineTo(x - 80, y + 100);
    ctx.stroke();
    drawRBTree(ctx, node.left, x - 80, y + 100);
  }
  if (node.right) {
    ctx.strokeStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.moveTo(x, y + 45);
    ctx.lineTo(x + 80, y + 100);
    ctx.stroke();
    drawRBTree(ctx, node.right, x + 80, y + 100);
  }
}

// ========== TRIE INTERACTIVE ==========
function interactiveTrieInsert() {
  const word = document.getElementById('trieWord').value || 'cat';
  if (!interactiveState.trie) interactiveState.trie = { char: '', children: {} };
  insertIntoTrie(interactiveState.trie, word);
  interactiveTrieVisualize();
}

function interactiveTrieVisualize() {
  const canvas = document.getElementById('trieCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  if (interactiveState.trie && Object.keys(interactiveState.trie.children).length > 0) {
    drawTrieVisualization(ctx, interactiveState.trie, 50, 50, []);
  } else {
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '16px Arial';
    ctx.fillText('Empty Trie', 300, 150);
  }
}

function insertIntoTrie(node, word) {
  let current = node;
  for (let char of word) {
    if (!current.children[char]) {
      current.children[char] = { char: char, children: {} };
    }
    current = current.children[char];
  }
  current.isEndOfWord = true;
}

function drawTrieVisualization(ctx, node, x, y, path) {
  if (!node) return;
  const nodeRadius = 15;
  const childKeys = Object.keys(node.children);
  const totalWidth = childKeys.length * 60;
  let offsetX = x - totalWidth / 2;
  
  childKeys.forEach((char, idx) => {
    const childX = offsetX + idx * 60;
    ctx.strokeStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(childX, y + 60);
    ctx.stroke();
    ctx.fillStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.arc(childX, y + 60, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = VIS_TEXT;
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, childX, y + 60);
    drawTrieVisualization(ctx, node.children[char], childX, y + 80, [...path, char]);
  });
  
  if (x === 50 && y === 50) {
    ctx.fillStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = VIS_TEXT;
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('R', x, y);
  }
}

// ========== HEAP INTERACTIVE ==========
function interactiveHeapInsert() {
  const val = parseInt(document.getElementById('heapValue').value) || 25;
  if (!interactiveState.heap) interactiveState.heap = [];
  interactiveState.heap.push(val);
  heapifyUp(interactiveState.heap, interactiveState.heap.length - 1);
  interactiveHeapVisualize();
}

function interactiveHeapPop() {
  if (!interactiveState.heap || interactiveState.heap.length === 0) return;
  interactiveState.heap[0] = interactiveState.heap.pop();
  if (interactiveState.heap.length > 0) heapifyDown(interactiveState.heap, 0);
  interactiveHeapVisualize();
}

function interactiveHeapVisualize() {
  const canvas = document.getElementById('heapCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  if (interactiveState.heap && interactiveState.heap.length > 0) {
    drawHeapTree(ctx, interactiveState.heap, 0, 300, 50);
  } else {
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '16px Arial';
    ctx.fillText('Empty Heap', 300, 150);
  }
}

function heapifyUp(heap, i) {
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (heap[parent] > heap[i]) {
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    } else break;
  }
}

function heapifyDown(heap, i) {
  while (true) {
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
    if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
    if (smallest !== i) {
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    } else break;
  }
}

function drawHeapTree(ctx, heap, i, x, y) {
  if (i >= heap.length) return;
  drawBox(ctx, x - 35, y, 70, 40, heap[i]);
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < heap.length) {
    ctx.strokeStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.moveTo(x, y + 40);
    ctx.lineTo(x - 80, y + 80);
    ctx.stroke();
    drawHeapTree(ctx, heap, left, x - 80, y + 80);
  }
  if (right < heap.length) {
    ctx.strokeStyle = VIS_ACCENT;
    ctx.beginPath();
    ctx.moveTo(x, y + 40);
    ctx.lineTo(x + 80, y + 80);
    ctx.stroke();
    drawHeapTree(ctx, heap, right, x + 80, y + 80);
  }
}

// ========== MERGE SORT INTERACTIVE ==========
function interactiveMergeSort() {
  let arr = [...interactiveState.sortArray];
  const steps = [];
  mergeSort(arr, 0, arr.length - 1, steps);
  animateSortingSteps(steps, 'mergeSortCanvas', 'Merge Sort');
}

function interactiveMergeSortShuffle() {
  interactiveState.sortArray = interactiveState.sortArray.sort(() => Math.random() - 0.5);
  interactiveMergeSortVisualize();
}

function interactiveMergeSortVisualize() {
  const canvas = document.getElementById('mergeSortCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  drawSortingArray(ctx, interactiveState.sortArray, 'Merge Sort Array');
}

function mergeSort(arr, left, right, steps) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid, steps);
    mergeSort(arr, mid + 1, right, steps);
    mergeParts(arr, left, mid, right, steps);
  }
}

function mergeParts(arr, left, mid, right, steps) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) arr[k++] = leftArr[i++];
    else arr[k++] = rightArr[j++];
  }
  while (i < leftArr.length) arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[j++];
  steps.push([...arr]);
}

// ========== QUICK SORT INTERACTIVE ==========
function interactiveQuickSort() {
  let arr = [...interactiveState.sortArray];
  const steps = [['initial', [...arr]]];
  quickSort(arr, 0, arr.length - 1, steps);
  animateSortingSteps(steps, 'quickSortCanvas', 'Quick Sort');
}

function interactiveQuickSortShuffle() {
  interactiveState.sortArray = interactiveState.sortArray.sort(() => Math.random() - 0.5);
  interactiveQuickSortVisualize();
}

function interactiveQuickSortVisualize() {
  const canvas = document.getElementById('quickSortCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  drawSortingArray(ctx, interactiveState.sortArray, 'Quick Sort Array');
}

function quickSort(arr, low, high, steps) {
  if (low < high) {
    const pi = quickPartition(arr, low, high);
    steps.push([...arr]);
    quickSort(arr, low, pi - 1, steps);
    quickSort(arr, pi + 1, high, steps);
  }
}

function quickPartition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// ========== INSERTION SORT INTERACTIVE ==========
function interactiveInsertionSort() {
  let arr = [...interactiveState.sortArray];
  const steps = [['initial', [...arr]]];
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
    steps.push([...arr]);
  }
  animateSortingSteps(steps, 'insertionSortCanvas', 'Insertion Sort');
}

function interactiveInsertionShuffle() {
  interactiveState.sortArray = interactiveState.sortArray.sort(() => Math.random() - 0.5);
  interactiveInsertionVisualize();
}

function interactiveInsertionVisualize() {
  const canvas = document.getElementById('insertionSortCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  drawSortingArray(ctx, interactiveState.sortArray, 'Insertion Sort Array');
}

// ========== SELECTION SORT INTERACTIVE ==========
function interactiveSelectionSort() {
  let arr = [...interactiveState.sortArray];
  const steps = [['initial', [...arr]]];
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    steps.push([...arr]);
  }
  animateSortingSteps(steps, 'selectionSortCanvas', 'Selection Sort');
}

function interactiveSelectionShuffle() {
  interactiveState.sortArray = interactiveState.sortArray.sort(() => Math.random() - 0.5);
  interactiveSelectionVisualize();
}

function interactiveSelectionVisualize() {
  const canvas = document.getElementById('selectionSortCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  drawSortingArray(ctx, interactiveState.sortArray, 'Selection Sort Array');
}

// ========== SHELL SORT INTERACTIVE ==========
function interactiveShellSort() {
  let arr = [...interactiveState.sortArray];
  const steps = [['initial', [...arr]]];
  let gap = Math.floor(arr.length / 2);
  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      let temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
      steps.push([...arr]);
    }
    gap = Math.floor(gap / 2);
  }
  animateSortingSteps(steps, 'shellSortCanvas', 'Shell Sort');
}

function interactiveShellShuffle() {
  interactiveState.sortArray = interactiveState.sortArray.sort(() => Math.random() - 0.5);
  interactiveShellVisualize();
}

function interactiveShellVisualize() {
  const canvas = document.getElementById('shellSortCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 300);
  drawSortingArray(ctx, interactiveState.sortArray, 'Shell Sort Array');
}

// ========== HELPER FUNCTIONS FOR SORTING VISUALIZATION ==========
function drawSortingArray(ctx, arr, title) {
  const barWidth = 80;
  const maxHeight = 200;
  const maxVal = Math.max(...arr);
  for (let k = 0; k < arr.length; k++) {
    const height = (arr[k] / maxVal) * maxHeight;
    ctx.fillStyle = VIS_ACCENT;
    ctx.fillRect(50 + k * (barWidth + 10), 250 - height, barWidth, height);
    ctx.fillStyle = VIS_TEXT;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(arr[k], 50 + k * (barWidth + 10) + barWidth / 2, 250 - height - 5);
  }
  ctx.fillStyle = VIS_TEXT;
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(title, 300, 280);
}

function animateSortingSteps(steps, canvasId, algorithmName) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  let stepIdx = 0;
  
  function animate() {
    ctx.clearRect(0, 0, 600, 300);
    const currentStep = steps[stepIdx];
    const arr = Array.isArray(currentStep) ? currentStep : currentStep[1];
    drawSortingArray(ctx, arr, `${algorithmName} - Step ${stepIdx}/${steps.length - 1}`);
    stepIdx++;
    if (stepIdx < steps.length) setTimeout(animate, 300);
  }
  animate();
}

// Initialize heap if needed
if (!interactiveState.heap) interactiveState.heap = [];
if (!interactiveState.avl) interactiveState.avl = null;
if (!interactiveState.rb) interactiveState.rb = null;
if (!interactiveState.trie) interactiveState.trie = { char: '', children: {} };
            
/**
 * Animated Git-style branch lines drawn on a background canvas.
 *
 * The animation shows several vertical "branch lanes" connected by diagonal
 * merge/branch lines, with commit dots moving slowly upward — giving the feel
 * of a live git log graph.
 */
(function () {
  "use strict";

  const canvas = document.getElementById("git-animation");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Branch lane colours (school palette: greens + white accents)
  const LANE_COLORS = [
    "#4caf50", // primary green
    "#81c784", // light green
    "#2e7d32", // dark green
    "#a5d6a7", // pale green
    "#1b5e20", // deep green
    "#c8e6c9", // very light green
  ];

  const LANE_COUNT = 6;
  const COMMIT_RADIUS = 5;
  const SPEED = 0.4; // pixels per frame (slow drift)

  let lanes = [];
  let offset = 0; // global y-scroll offset

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildLanes();
  }

  /**
   * Build a set of vertical lane descriptors.
   * Each lane has an x position and a list of commit y-positions.
   * Some adjacent lanes share "connection" events (branch/merge lines).
   */
  function buildLanes() {
    lanes = [];
    const spacing = canvas.width / (LANE_COUNT + 1);

    for (let i = 0; i < LANE_COUNT; i++) {
      const x = spacing * (i + 1);
      const color = LANE_COLORS[i % LANE_COLORS.length];

      // Spread commits evenly across a tall virtual canvas (3× screen height)
      const commits = [];
      const totalHeight = canvas.height * 3;
      const gap = 80 + Math.random() * 60;
      for (let y = -totalHeight; y < totalHeight; y += gap) {
        commits.push(y + Math.random() * 20 - 10);
      }

      // Randomly connect this lane to the next one (branch/merge)
      const connections = [];
      if (i < LANE_COUNT - 1) {
        commits.forEach((cy) => {
          if (Math.random() < 0.25) {
            connections.push(cy);
          }
        });
      }

      lanes.push({ x, color, commits, connections });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Advance the scroll offset
    offset = (offset + SPEED) % (canvas.height * 3);

    lanes.forEach((lane, idx) => {
      ctx.strokeStyle = lane.color;
      ctx.fillStyle = lane.color;
      ctx.lineWidth = 2;

      // Draw the vertical branch line
      ctx.beginPath();
      ctx.moveTo(lane.x, 0);
      ctx.lineTo(lane.x, canvas.height);
      ctx.stroke();

      // Draw commit dots and branch/merge connectors
      lane.commits.forEach((rawY) => {
        const y = ((rawY + offset) % (canvas.height * 3)) - canvas.height;
        if (y < -20 || y > canvas.height + 20) return;

        // Commit dot
        ctx.beginPath();
        ctx.arc(lane.x, y, COMMIT_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // Connection to next lane
        if (lane.connections.includes(rawY) && idx < lanes.length - 1) {
          const nextLane = lanes[idx + 1];
          ctx.beginPath();
          ctx.moveTo(lane.x, y);
          ctx.lineTo(nextLane.x, y + 40);
          ctx.strokeStyle = lane.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Reset stroke for next iteration
          ctx.strokeStyle = lane.color;
          ctx.lineWidth = 2;
        }
      });
    });

    requestAnimationFrame(draw);
  }

  // Initialise
  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
})();

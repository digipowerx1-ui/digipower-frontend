import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

interface Line {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  duration: number;
  delay: number;
}

interface PacmanPath {
  id: number;
  path: string;
  duration: number;
  delay: number;
}

const WireLines = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [pacmanPaths, setPacmanPaths] = useState<PacmanPath[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const generateLines = (): Line[] => {
      const lineCount = 30;
      const generatedLines: Line[] = [];

      for (let i = 0; i < lineCount; i++) {
        const isHorizontal = i % 2 === 0;

        if (isHorizontal) {
          // Straight horizontal lines
          const y = (dimensions.height / (lineCount / 2)) * (i / 2);
          generatedLines.push({
            id: i,
            x1: 0,
            y1: y,
            x2: dimensions.width,
            y2: y,
            duration: 3 + Math.random() * 3,
            delay: Math.random() * 2,
          });
        } else {
          // Straight vertical lines
          const x = (dimensions.width / (lineCount / 2)) * (i / 2);
          generatedLines.push({
            id: i,
            x1: x,
            y1: 0,
            x2: x,
            y2: dimensions.height,
            duration: 3 + Math.random() * 3,
            delay: Math.random() * 2,
          });
        }
      }

      return generatedLines;
    };

    const generatePacmanPaths = (): PacmanPath[] => {
      // Create a single electrical circuit path
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const width = dimensions.width * 0.6;
      const height = dimensions.height * 0.5;

      // Create a rectangular circuit path with rounded corners
      const left = centerX - width / 2;
      const right = centerX + width / 2;
      const top = centerY - height / 2;
      const bottom = centerY + height / 2;

      // Circuit path: starts at left-middle, goes right, down, left, up, completing the circuit
      const path = `
        M ${left} ${centerY}
        L ${right} ${centerY}
        L ${right} ${bottom}
        L ${left} ${bottom}
        L ${left} ${top}
        L ${right} ${top}
        L ${right} ${centerY}
        L ${left} ${centerY}
      `;

      return [{
        id: 0,
        path,
        duration: 12,
        delay: 0,
      }];
    };

    setLines(generateLines());
    setPacmanPaths(generatePacmanPaths());
  }, [dimensions]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for lines */}
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#245592" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#01d3ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#245592" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#01d3ff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#245592" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#01d3ff" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated Lines */}
        {lines.map((line, index) => (
          <motion.line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={index % 2 === 0 ? "url(#lineGradient1)" : "url(#lineGradient2)"}
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid Pattern */}
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#245592"
              strokeWidth="0.5"
              opacity="0.1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Animated Nodes/Dots at grid intersections */}
        {Array.from({ length: 20 }).map((_, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const cx = (dimensions.width / 6) * (col + 1);
          const cy = (dimensions.height / 5) * (row + 1);

          return (
            <motion.circle
              key={`node-${i}`}
              cx={cx}
              cy={cy}
              r="2.5"
              fill="#01d3ff"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Electrical Circuit Path */}
        {pacmanPaths.map((pathData) => (
          <g key={`circuit-${pathData.id}`}>
            {/* Main circuit wire - always visible */}
            <path
              d={pathData.path}
              stroke="#245592"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />

            {/* Animated electricity flow */}
            <motion.path
              d={pathData.path}
              stroke="#01d3ff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
              filter="url(#glow)"
              strokeDasharray="20 20"
              initial={{ strokeDashoffset: 0 }}
              animate={{
                strokeDashoffset: -40,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Circuit connection nodes */}
            {(() => {
              const centerX = dimensions.width / 2;
              const centerY = dimensions.height / 2;
              const width = dimensions.width * 0.6;
              const height = dimensions.height * 0.5;
              const left = centerX - width / 2;
              const right = centerX + width / 2;
              const top = centerY - height / 2;
              const bottom = centerY + height / 2;

              const nodes = [
                { x: left, y: centerY, label: "START" },
                { x: right, y: centerY, label: "→" },
                { x: right, y: bottom, label: "↓" },
                { x: left, y: bottom, label: "←" },
                { x: left, y: top, label: "↑" },
                { x: right, y: top, label: "→" },
              ];

              return nodes.map((node, i) => (
                <g key={`node-${i}`}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    fill="#245592"
                    stroke="#01d3ff"
                    strokeWidth="2"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="4"
                    fill="#01d3ff"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </g>
              ));
            })()}
          </g>
        ))}
      </svg>

      {/* Single Logo completing electrical circuit */}
      {pacmanPaths.map((pathData) => (
        <motion.div
          key={`pacman-${pathData.id}`}
          className="absolute"
          style={{
            width: "60px",
            height: "60px",
            offsetPath: `path('${pathData.path}')`,
            offsetRotate: "auto",
          }}
          initial={{ offsetDistance: "0%" }}
          animate={{
            offsetDistance: ["0%", "100%"],
          }}
          transition={{
            duration: pathData.duration,
            delay: pathData.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Electric sparks trailing behind */}
          <motion.div
            className="absolute -left-4 top-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-cyan-300 blur-sm"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.img
            src={logo.src}
            alt="DigiPowerX Logo Generating Power"
            className="w-full h-full object-contain drop-shadow-lg relative z-10"
            animate={{
              scale: [1, 1.2, 1],
              filter: [
                "drop-shadow(0 0 10px rgba(1, 211, 255, 0.8)) brightness(1)",
                "drop-shadow(0 0 25px rgba(1, 211, 255, 1)) brightness(1.3)",
                "drop-shadow(0 0 10px rgba(1, 211, 255, 0.8)) brightness(1)",
              ],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Electricity glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 blur-xl"
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Rotating energy field */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-40"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </motion.div>
      ))}

      {/* Power Generation Indicator at circuit center */}
      {dimensions.width > 0 && (
        <motion.div
          className="absolute"
          style={{
            left: `${dimensions.width / 2}px`,
            top: `${dimensions.height / 2}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            className="relative w-24 h-24"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Power generation icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                  fill="#01d3ff"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </div>

            {/* Energy rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                delay: 1,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-slate-900/50 dark:via-transparent dark:to-slate-800/50" />
    </div>
  );
};

export default WireLines;

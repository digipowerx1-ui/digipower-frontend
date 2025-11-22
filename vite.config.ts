import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const devApiMock = () => ({
  name: "dev-api-mock",
  configureServer(server: any) {
    // Serve predictable JSON instead of the raw TS files when Vercel serverless isn't running locally.
    server.middlewares.use("/api/live-stock", (req: any, res: any, next: any) => {
      // Only mock when explicitly enabled; otherwise let the request pass through to a real backend (e.g., vercel dev)
      if (
        process.env.VERCEL === "1" ||
        process.env.NODE_ENV === "production" ||
        process.env.VITE_USE_API_MOCK !== "true"
      ) {
        return next();
      }
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          symbol: "DGXX",
          price: 24.5,
          change: 0.35,
          changePercent: 1.45,
          volume: 1820000,
          high: 25.1,
          low: 23.9,
          open: 24.15,
          lastUpdated: new Date().toISOString(),
          source: "vite-dev-mock",
        })
      );
    });

    server.middlewares.use("/api/stock", (req: any, res: any, next: any) => {
      if (
        process.env.VERCEL === "1" ||
        process.env.NODE_ENV === "production" ||
        process.env.VITE_USE_API_MOCK !== "true"
      ) {
        return next();
      }
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          status: "OK",
          symbol: "DGXX",
          open: 24.15,
          high: 25.1,
          low: 23.9,
          close: 24.5,
          volume: 1820000,
          afterHours: 24.6,
          preMarket: 24.0,
          date: new URL(req.url || "", "http://localhost").searchParams.get("date"),
          source: "vite-dev-mock",
        })
      );
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Forward API requests to the Node.js API server on port 3000
      "/api": {
        target: process.env.VITE_API_PROXY || "http://localhost:3000",
        changeOrigin: true,
      },
      // Forward WebSocket connections to the Node.js API server
      "/ws": {
        target: process.env.VITE_API_PROXY || "ws://localhost:3000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Enable the mock only when you explicitly opt-in with VITE_USE_API_MOCK=true
    mode === "development" && devApiMock(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

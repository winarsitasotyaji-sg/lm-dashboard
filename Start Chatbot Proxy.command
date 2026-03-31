#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# LM Dashboard — Chatbot Proxy Launcher
# Double-click this file to start the proxy, then use the chatbot on the dashboard.
# Make sure you are connected to Shopee VPN first.
# ─────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo ""
echo "  ╔══════════════════════════════════════════════╗"
echo "  ║   LM Dashboard — AI Chatbot Proxy           ║"
echo "  ╚══════════════════════════════════════════════╝"
echo ""

# Check Node.js is installed
if ! command -v node &>/dev/null; then
  echo "  ✗ Node.js not found. Install it from https://nodejs.org"
  echo "  Press any key to close..."
  read -n 1
  exit 1
fi

# Check node_modules exists
if [ ! -d "node_modules" ]; then
  echo "  Installing dependencies..."
  npm install
  echo ""
fi

echo "  ✓ Make sure you are connected to Shopee VPN"
echo "  ✓ Proxy starting on http://localhost:3001"
echo ""
echo "  Keep this window open while using the chatbot."
echo "  Close this window to stop the proxy."
echo ""

node proxy.js

#!/bin/bash
set -e

SVG_FILE="/tmp/og-image.svg"
OUT_FILE="public/og-image.png"

cat << 'SVGEOF' > "$SVG_FILE"
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="70%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#FFF0DE" stop-opacity="0.08" />
      <stop offset="50%" stop-color="#FFF0DE" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#0B0B0C" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="limeGlow" cx="20%" cy="80%" r="45%">
      <stop offset="0%" stop-color="#D4FF3A" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#0B0B0C" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#0B0B0C" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#glow)" />
  <rect width="1200" height="630" fill="url(#limeGlow)" />

  <!-- Outer border -->
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1.5" />

  <!-- Inner Top Badge -->
  <g transform="translate(90, 100)">
    <rect width="190" height="34" rx="17" fill="rgba(212, 255, 58, 0.08)" stroke="rgba(212, 255, 58, 0.25)" stroke-width="1" />
    <circle cx="20" cy="17" r="4" fill="#22C55E" />
    <text x="34" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#D4FF3A" letter-spacing="1.5">AVAILABLE FOR WORK</text>
  </g>

  <!-- Name -->
  <text x="90" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="700" fill="#F2F1EC" letter-spacing="-1">
    Muhammad Jawad Fareed
  </text>

  <!-- Lime accent bar -->
  <rect x="90" y="275" width="140" height="4" rx="2" fill="#D4FF3A" />

  <!-- Role and Title -->
  <text x="90" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="500" fill="#F2F1EC" opacity="0.9">
    Full Stack AI Engineer &amp; Founder of IVOO
  </text>

  <text x="90" y="388" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#F2F1EC" opacity="0.6">
    Building AI autonomous platforms, mobile applications and full-stack software.
  </text>

  <!-- Tech Stack & Location Footer -->
  <g transform="translate(90, 480)">
    <rect width="90" height="36" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" />
    <text x="45" y="23" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#F2F1EC" text-anchor="middle">React.js</text>

    <g transform="translate(100, 0)">
      <rect width="120" height="36" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" />
      <text x="60" y="23" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#F2F1EC" text-anchor="middle">React Native</text>
    </g>

    <g transform="translate(230, 0)">
      <rect width="80" height="36" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" />
      <text x="40" y="23" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#F2F1EC" text-anchor="middle">Django</text>
    </g>

    <g transform="translate(320, 0)">
      <rect width="110" height="36" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" />
      <text x="55" y="23" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#F2F1EC" text-anchor="middle">OpenAI APIs</text>
    </g>

    <g transform="translate(440, 0)">
      <rect width="125" height="36" rx="10" fill="rgba(212, 255, 58, 0.1)" stroke="rgba(212, 255, 58, 0.25)" />
      <text x="62" y="23" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="600" fill="#D4FF3A" text-anchor="middle">Lahore, PK</text>
    </g>
  </g>

  <!-- Brand logo mark top right -->
  <text x="1080" y="125" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="#F2F1EC" text-anchor="end">
    MJF<tspan fill="#D4FF3A">.</tspan>
  </text>
</svg>
SVGEOF

sips -s format png "$SVG_FILE" --out "$OUT_FILE"
echo "Generated $OUT_FILE successfully."

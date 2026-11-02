#!/usr/bin/env bash
# Optional build step (Cloudflare Pages / Vercel): pulls the high-resolution originals of the
# photos and screens from the old Webflow asset CDN and points the site at them.
# If a download fails, the site keeps using the 500px copies already in /assets. Safe to re-run.
set -u
cd "$(dirname "$0")/.."
B="https://cdn.prod.website-files.com/64d67c7e20d0c13c38c9d668"
mkdir -p assets/hires
swap() { # $1 local path in site  $2 remote file  $3 new local name
  if curl -fsSL --max-time 30 -o "assets/hires/$3" "$B/$2"; then
    sed -i "s#$1#assets/hires/$3#g" index.html assets/site.js
    echo "hi-res: $3"
  else
    rm -f "assets/hires/$3"; echo "kept 500px: $1"
  fi
}
swap "assets/work/skribe.webp" "68b1e704081f378dc51910d3_Skribeai.png" "skribe.png"
swap "assets/work/vendidit.webp" "68b3348bfb3e7482501b2716_Vendidit%20(2).png" "vendidit.png"
swap "assets/work/sendwin.webp" "68b35d60d3bd0eef7f8a8959_Sendwin.png" "sendwin.png"
swap "assets/dash/loopline.png" "6a9c5a91e84acc27b11583f1_01-loopline.png-p-1080.png" "loopline.png"
swap "assets/dash/bidhaus.png" "6a9c5a922e54322002415b9f_02-bidhaus.png-p-1080.png" "bidhaus.png"
swap "assets/dash/vantage.png" "6a9c5a92de67bdefa6d6b7e0_03-vantage.png-p-1080.png" "vantage.png"
swap "assets/dash/casewell.png" "6a9c5a92e84acc27b1158402_04-casewell.png-p-1080.png" "casewell.png"
exit 0

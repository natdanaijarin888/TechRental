const { PrismaClient } = require("../src/generated/prisma");
const prisma = new PrismaClient();

// Better matching product images from Unsplash / free sources
const imageUpdates = {
  // --- Laptops ---
  "prod-mbp-m3max": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80", // MacBook Pro - correct
  "prod-dell-xps16": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format&fit=crop&q=80", // Dell XPS
  "prod-mbp-m3pro-14": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80", // MacBook Pro 14
  "prod-rog-zephyrus-g16": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80", // ROG gaming laptop
  "prod-thinkpad-p1": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80", // ThinkPad
  "prod-razer-blade-16": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80", // Razer Blade
  "prod-macbook-air-m3": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80", // MacBook Air
  "prod-alienware-m18": "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=800&auto=format&fit=crop&q=80", // Alienware gaming
  "prod-mbp-m3pro-16": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80", // MacBook Pro 16
  "prod-asus-zenbook-duo": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80", // ASUS dual screen
  "prod-msi-titan-18": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80", // MSI gaming laptop

  // --- Cameras ---
  "prod-sony-a7iv": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80", // Sony camera
  "prod-sony-fx3": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80", // Cinema camera
  "prod-canon-r5m2": "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&auto=format&fit=crop&q=80", // Canon camera
  "prod-sony-a7rv": "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&auto=format&fit=crop&q=80", // Sony mirrorless
  "prod-fujifilm-xt5": "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&auto=format&fit=crop&q=80", // Fujifilm retro
  "prod-dji-ronin-4d": "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?w=800&auto=format&fit=crop&q=80", // Cinema rig/gimbal
  "prod-bmpcc-6k-pro": "https://images.unsplash.com/photo-1585506942812-e72b29cef752?w=800&auto=format&fit=crop&q=80", // Blackmagic cinema camera
  "prod-canon-c70": "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&auto=format&fit=crop&q=80", // Canon cinema camera
  "prod-sony-a7siii": "https://images.unsplash.com/photo-1606986628253-49d5c2bc8040?w=800&auto=format&fit=crop&q=80", // Sony A7S body
  "prod-nikon-z8": "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&auto=format&fit=crop&q=80", // Nikon camera
  "prod-lumix-gh7": "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&auto=format&fit=crop&q=80", // Panasonic Lumix

  // --- GPUs ---
  "prod-rtx-4090": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80", // GPU card
  "prod-rtx-6000-ada": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80", // Workstation GPU
  "prod-rtx-4080-super": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80", // GPU fan close-up
  "prod-rtx-4070ti-super": "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&auto=format&fit=crop&q=80", // GPU with LED
  "prod-nvidia-a100": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80", // Data center GPU
  "prod-radeon-pro-w7900": "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=800&auto=format&fit=crop&q=80", // AMD GPU
  "prod-rtx-4070-super": "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=80", // Compact GPU
  "prod-nvidia-l40s": "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&auto=format&fit=crop&q=80", // Server GPU
  "prod-rx-7900-xtx": "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80", // AMD Radeon
  "prod-rtx-4060ti-16gb": "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80", // Budget GPU

  // --- Monitors ---
  "prod-monitor-oled": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80", // LG OLED monitor
  "prod-apple-studio-display": "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80", // Apple display
  "prod-asus-proart-pa32": "https://images.unsplash.com/photo-1585792180666-f7547c6a6c7c?w=800&auto=format&fit=crop&q=80", // ProArt monitor
  "prod-dell-ultrasharp-6k": "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop&q=80", // Dell monitor
  "prod-samsung-odyssey-g9": "https://images.unsplash.com/photo-1616711417724-a9951d87e6a1?w=800&auto=format&fit=crop&q=80", // Ultrawide curved
  "prod-benq-sw321c": "https://images.unsplash.com/photo-1547394765-185e131e1784?w=800&auto=format&fit=crop&q=80", // Color accurate monitor
  "prod-rog-pg32ucdm": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80", // ROG gaming monitor
  "prod-viewsonic-colorpro": "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=800&auto=format&fit=crop&q=80", // Professional monitor
  "prod-msi-mag-341cqp": "https://images.unsplash.com/photo-1616711417724-a9951d87e6a1?w=800&auto=format&fit=crop&q=80", // Ultrawide curved monitor
  "prod-eizo-coloredge": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80", // Professional monitor

  // --- Tablets ---
  "prod-ipad-m4": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80", // iPad Pro
  "prod-ipad-m4-11": "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&auto=format&fit=crop&q=80", // iPad Pro 11
  "prod-wacom-cintiq-27": "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80", // Wacom pen display
  "prod-surface-pro-11": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80", // Surface Pro
  "prod-ipad-air-m2-13": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80", // iPad Air
  "prod-samsung-tab-s9ultra": "https://images.unsplash.com/photo-1632634690584-fc1c9fd34ba3?w=800&auto=format&fit=crop&q=80", // Samsung tablet
  "prod-huion-kamvas-pro24": "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80", // Pen display / drawing tablet
  "prod-apple-vision-pro": "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&auto=format&fit=crop&q=80", // VR/AR headset
  "prod-ipad-mini-7": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80", // iPad Mini small tablet
  "prod-lenovo-yoga-book9i": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80", // Lenovo dual screen
};

async function updateImages() {
  console.log("Updating product images in Supabase database...");
  let updated = 0;
  let notFound = 0;

  for (const [productId, imageUrl] of Object.entries(imageUpdates)) {
    try {
      const result = await prisma.product.updateMany({
        where: { id: productId },
        data: { imageUrl },
      });
      if (result.count > 0) {
        updated++;
        console.log(`  ✅ ${productId}`);
      } else {
        notFound++;
        console.log(`  ⚠️ ${productId} not found in DB`);
      }
    } catch (err) {
      console.log(`  ❌ ${productId}: ${err.message}`);
    }
  }

  console.log(`\nDone! Updated: ${updated}, Not found: ${notFound}`);
}

updateImages().finally(() => prisma.$disconnect());

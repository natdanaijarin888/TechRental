const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding TechRent database...");

  // Clean existing tables
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.rentalInspection.deleteMany();
  await prisma.rentalOrder.deleteMany();
  await prisma.assetItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = bcrypt.hashSync("123456", 10);

  // 1. Users
  const adminUser = await prisma.user.create({
    data: {
      id: "user-admin-1",
      name: "สมโภชน์ ปัญญาดี (Admin)",
      email: "admin@techrent.co",
      passwordHash,
      role: "ADMIN",
      phone: "089-111-2222",
      address: "88/1 อาคารไอทีเซ็นเตอร์ ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110",
      kycStatus: "APPROVED",
      kycVerifiedAt: new Date(),
    },
  });

  const staffUser = await prisma.user.create({
    data: {
      id: "user-staff-1",
      name: "อนันต์ ตรวจสอบ (Staff)",
      email: "anan@techrent.co",
      passwordHash,
      role: "STAFF",
      phone: "081-444-5555",
      address: "123 ศูนย์บริการเช่าสาขาสยาม กรุงเทพฯ",
      kycStatus: "APPROVED",
      kycVerifiedAt: new Date(),
    },
  });

  const customerSomchai = await prisma.user.create({
    data: {
      id: "user-cust-1",
      name: "สมชาย มีทรัพย์",
      email: "somchai@example.com",
      passwordHash,
      role: "CUSTOMER",
      phone: "082-999-8888",
      address: "45/12 คอนโดพญาไท ถ.พญาไท เขตราชเทวี กรุงเทพฯ 10400",
      emergencyContactName: "วิภา มีทรัพย์ (มารดา)",
      emergencyContactPhone: "081-333-7777",
      kycStatus: "APPROVED",
      kycIdCardImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
      kycVerifiedAt: new Date(),
    },
  });

  const customerKanya = await prisma.user.create({
    data: {
      id: "user-cust-2",
      name: "กัญญา เรียนดี",
      email: "kanya@example.com",
      passwordHash,
      role: "CUSTOMER",
      phone: "085-777-6666",
      address: " หอพักนักศึกษาจุฬาฯ ถ.พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330",
      emergencyContactName: "สมควร เรียนดี (บิดา)",
      emergencyContactPhone: "084-222-1111",
      kycStatus: "PENDING",
      kycIdCardImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
      kycStudentIdImage: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&auto=format&fit=crop&q=80",
    },
  });

  console.log("Users seeded.");

  // 2. Categories
  const catLaptop = await prisma.category.create({
    data: {
      name: "โน้ตบุ๊กประสิทธิภาพสูง",
      slug: "laptops",
      icon: "Laptop",
      description: "แล็ปท็อปสำหรับการตัดต่อวิดีโอ งานกราฟิก และเขียนโปรแกรมระดับมืออาชีพ",
    },
  });

  const catCamera = await prisma.category.create({
    data: {
      name: "กล้องและอุปกรณ์ถ่ายภาพ",
      slug: "cameras",
      icon: "Camera",
      description: "กล้อง Mirrorless ฟูลเฟรม เลนส์เกรดโปร และอุปกรณ์ไฟสตูดิโอ",
    },
  });

  const catGPU = await prisma.category.create({
    data: {
      name: "การ์ดจอ GPU & Workstation",
      slug: "gpus",
      icon: "Cpu",
      description: "การ์ดจอระดับท็อปสำหรับเทรน AI / Deep Learning, 3D Rendering และงานอีเวนต์",
    },
  });

  const catMonitor = await prisma.category.create({
    data: {
      name: "จอคอมพิวเตอร์และมอนิเตอร์",
      slug: "monitors",
      icon: "Monitor",
      description: "จอ 4K / OLED สีตรงระดับ DCI-P3 99% สำหรับช่างภาพและ Colorist",
    },
  });

  const catTablet = await prisma.category.create({
    data: {
      name: "แท็บเล็ตและอุปกรณ์เสริม",
      slug: "tablets",
      icon: "Tablet",
      description: "iPad Pro M4 พร้อม Apple Pencil Pro และคีย์บอร์ด สำหรับนักวาดและพรีเซนต์งาน",
    },
  });

  console.log("Categories seeded.");

  // 3. Products
  const prodMacBook = await prisma.product.create({
    data: {
      id: "prod-mbp-m3max",
      name: "Apple MacBook Pro 16\" (M3 Max)",
      brand: "Apple",
      categoryId: catLaptop.id,
      model: "MacBook Pro 16-inch 2024",
      description: "โน้ตบุ๊กพลังชิป M3 Max สเปกท็อปสุด เหมาะสำหรับงานเรนเดอร์ 3D, ตัดต่อวิดีโอ 8K ProRes และเทรนโมเดลขนาดใหญ่ มาพร้อมจอ Liquid Retina XDR ความสว่างสูงสุด 1600 nits",
      specs: JSON.stringify({
        cpu: "Apple M3 Max (16-core CPU)",
        gpu: "40-core GPU, Hardware-accelerated ray tracing",
        ram: "64GB Unified Memory",
        storage: "1TB Ultra-fast NVMe SSD",
        display: "16.2\" Liquid Retina XDR (3456x2234), ProMotion 120Hz",
        ports: "Thunderbolt 4 (USB-C) x 3, HDMI, SDXC card, MagSafe 3",
        weight: "2.16 kg",
      }),
      accessoriesIncluded: JSON.stringify([
        "กระเป๋ากันกระแทก Tomtoc Pro 16\"",
        "Apple 140W USB-C Power Adapter แท้",
        "สาย MagSafe 3 ถักความยาว 2 เมตร",
        "Multi-port USB-C Hub (HDMI, USB-A x3, SD Card)",
      ]),
      dailyRate: 1500,
      weeklyRate: 8500,
      depositAmount: 15000,
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    },
  });

  const prodDellXPS = await prisma.product.create({
    data: {
      id: "prod-dell-xps16",
      name: "Dell XPS 16 (Core Ultra 9 / RTX 4070)",
      brand: "Dell",
      categoryId: catLaptop.id,
      model: "XPS 16 9640 (2024)",
      description: "เครื่องเวิร์กสเตชันพกพาสุดหรู จอ 4K+ OLED สัมผัส ดีไซน์ไร้ขอบ พร้อมขุมพลัง Intel Core Ultra 9 และการ์ดจอ NVIDIA RTX 4070 Studio Driver",
      specs: JSON.stringify({
        cpu: "Intel Core Ultra 9 185H (16 Cores, up to 5.1 GHz) with NPU",
        gpu: "NVIDIA GeForce RTX 4070 8GB GDDR6 (Studio Driver)",
        ram: "32GB LPDDR5x 7467 MT/s",
        storage: "1TB PCIe Gen4 NVMe M.2 SSD",
        display: "16.3\" 4K+ (3840 x 2400) OLED Touch, 100% DCI-P3, 400 nits",
        ports: "Thunderbolt 4 x 3, microSD card reader, 3.5mm headphone jack",
        weight: "2.20 kg",
      }),
      accessoriesIncluded: JSON.stringify([
        "เคสหนังพรีเมียมกันรอย",
        "Dell 130W Type-C AC Adapter",
        "Dongle USB-C to USB-A + HDMI",
      ]),
      dailyRate: 1300,
      weeklyRate: 7500,
      depositAmount: 12000,
      imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    },
  });

  const prodSonyA7 = await prisma.product.create({
    data: {
      id: "prod-sony-a7iv",
      name: "Sony Alpha 7 IV + Lens FE 24-70mm F2.8 GM II",
      brand: "Sony",
      categoryId: catCamera.id,
      model: "ILCE-7M4 / SEL2470GM2",
      description: "ชุดกล้องฟูลเฟรมพร้อมเลนส์เกรดมาสเตอร์ G Master II เซนเซอร์ Exmor R CMOS 33MP บันทึกวิดีโอ 4K 60p 10-bit 4:2:2 พร้อมระบบกันสั่นในตัว 5.5 สต็อป และโฟกัส Real-time Eye AF สัตว์/มนุษย์/นก",
      specs: JSON.stringify({
        sensor: "33.0MP Full-Frame Exmor R CMOS",
        video: "4K 60p in Super 35, 4K 30p 7K oversampled, 10-bit 4:2:2",
        lens: "Sony FE 24-70mm F2.8 GM II (Filter 82mm)",
        autofocus: "759-point Phase-detection AF, Real-time Tracking",
        stabilization: "5-axis In-body Image Stabilization (5.5 stops)",
        storageMedia: "Dual slot (CFexpress Type A / SD UHS-II)",
      }),
      accessoriesIncluded: JSON.stringify([
        "เลนส์ Sony 24-70mm F2.8 GM II พร้อม Hood & ฝาปิด",
        "แบตเตอรี่แท้ Sony NP-FZ100 จำนวน 3 ก้อน",
        "แท่นชาร์จคู่ Dual Charger USB Type-C",
        "การ์ด SanDisk Extreme PRO SDXC 128GB V90 x 2 ใบ",
        "กระเป๋ากล้อง Peak Design Everyday Sling 6L",
      ]),
      dailyRate: 1800,
      weeklyRate: 9800,
      depositAmount: 18000,
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    },
  });

  const prodRTX4090 = await prisma.product.create({
    data: {
      id: "prod-rtx-4090",
      name: "ASUS ROG Strix GeForce RTX 4090 24GB OC",
      brand: "ASUS / NVIDIA",
      categoryId: catGPU.id,
      model: "ROG-STRIX-RTX4090-O24G-GAMING",
      description: "การ์ดจอที่ทรงพลังที่สุดสำหรับการประมวลผล AI, LLM Fine-tuning, 3D Rendering และงาน Visual Effects ด้วย VRAM 24GB GDDR6X และระบบระบายความร้อน 3.5-slot Vapor Chamber",
      specs: JSON.stringify({
        cudaCores: "16384 CUDA Cores",
        vram: "24GB GDDR6X, 384-bit memory bus, 21 Gbps",
        boostClock: "2640 MHz (OC mode) / 2610 MHz (Default)",
        powerRequirement: "TDP 450W (แนะนำ Power Supply 1000W ขึ้นไป)",
        connectors: "16-pin 12VHPWR x 1",
        outputs: "Native HDMI 2.1a x 2, DisplayPort 1.4a x 3",
      }),
      accessoriesIncluded: JSON.stringify([
        "กล่องนิรภัย Hard Case บุกระแทกสำหรับพกพา",
        "สายแปลง 16-pin 12VHPWR to 4x 8-pin PCIe",
        "ROG Anti-sag Graphics Card Holder เสาค้ำการ์ดจอ",
      ]),
      dailyRate: 1600,
      weeklyRate: 9000,
      depositAmount: 25000,
      imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80",
    },
  });

  const prodMonitorOLED = await prisma.product.create({
    data: {
      id: "prod-monitor-oled",
      name: "LG UltraFine 32\" 4K OLED Pro Display",
      brand: "LG",
      categoryId: catMonitor.id,
      model: "32EP950-B",
      description: "มอนิเตอร์ระดับสตูดิโอพาเนล OLED สีดำสนิท Contrast Ratio 1,000,000:1 ครอบคลุม DCI-P3 99% และ Adobe RGB 99% พร้อมพอร์ตเชื่อมต่อครบครัน",
      specs: JSON.stringify({
        size: "31.5-inch 4K UHD (3840 x 2160)",
        panel: "OLED (Pixel Dimming)",
        colorGamut: "DCI-P3 99%, Adobe RGB 99%, True 10-bit",
        contrast: "1,000,000:1, VESA DisplayHDR 400 True Black",
        inputs: "USB Type-C (Power Delivery 90W), DisplayPort x 2, HDMI x 1, USB Hub",
      }),
      accessoriesIncluded: JSON.stringify([
        "กล่อง Flight Case ล้อลากสำหรับขนย้ายจอปลอดภัย",
        "ขาตั้งแท้ ปรับหมุน Pivot ได้ 90 องศา",
        "สาย Thunderbolt 4 Cable 40Gbps",
        "สาย HDMI 2.1 Ultra High Speed",
        "ฝาครอบกันแสงสะท้อน (Monitor Hood)",
      ]),
      dailyRate: 1200,
      weeklyRate: 6500,
      depositAmount: 15000,
      imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    },
  });

  const prodIPadM4 = await prisma.product.create({
    data: {
      id: "prod-ipad-m4",
      name: "Apple iPad Pro 13\" (M4) + Magic Keyboard + Pencil Pro",
      brand: "Apple",
      categoryId: catTablet.id,
      model: "iPad Pro 13-inch (M4 2024)",
      description: "แท็บเล็ตที่บางและล้ำที่สุดของ Apple จอ Ultra Retina XDR (Tandem OLED) ขับเคลื่อนด้วยชิป M4 พร้อม Apple Pencil Pro ใหม่ล่าสุดที่มีระบบ Haptic และบีบสั่งการได้",
      specs: JSON.stringify({
        chip: "Apple M4 (9-core CPU, 10-core GPU, 16-core Neural Engine)",
        storage: "256GB SSD",
        display: "13\" Ultra Retina XDR Tandem OLED (2752 x 2064), 1000 nits full screen",
        accessories: "Magic Keyboard with function row & haptic trackpad + Apple Pencil Pro",
        connectivity: "Wi-Fi 6E, Thunderbolt / USB 4",
      }),
      accessoriesIncluded: JSON.stringify([
        "Apple Magic Keyboard 13\" (Thai/English)",
        "Apple Pencil Pro",
        "อะแดปเตอร์แปลงไฟ 20W USB-C พร้อมสายชาร์จถัก",
        "ซองกันกระแทกหนังแท้",
      ]),
      dailyRate: 900,
      weeklyRate: 4900,
      depositAmount: 10000,
      imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
    },
  });

  console.log("Products seeded.");

  // 4. Physical Asset Items with Serial Numbers
  const assetItems = [
    // MacBook Pro units
    { productId: prodMacBook.id, serialNumber: "MBP-M3MAX-001", status: "RENTED", conditionNotes: "สภาพใหม่ 99% ไม่มีรอยขีดข่วน แบตเตอรี่รอบชาร์จ 12" },
    { productId: prodMacBook.id, serialNumber: "MBP-M3MAX-002", status: "AVAILABLE", conditionNotes: "สภาพสวย มีรอยขนแมวเล็กน้อยใต้ฐานเครื่อง" },
    { productId: prodMacBook.id, serialNumber: "MBP-M3MAX-003", status: "AVAILABLE", conditionNotes: "เครื่องใหม่แกะกล่อง เพิ่งเข้าคลัง" },
    
    // Dell XPS units
    { productId: prodDellXPS.id, serialNumber: "XPS16-9640-001", status: "AVAILABLE", conditionNotes: "สมบูรณ์ทุกฟังก์ชัน พร้อมใช้งาน" },
    { productId: prodDellXPS.id, serialNumber: "XPS16-9640-002", status: "AVAILABLE", conditionNotes: "สภาพดีมาก ผ่านการตรวจเช็คหน้าจอไร้เดดพิกเซล" },

    // Sony A7 IV units
    { productId: prodSonyA7.id, serialNumber: "A7IV-GM2-001", status: "AVAILABLE", conditionNotes: "ชัตเตอร์ 3,500 ช็อต เลนส์ใสไม่มีฝุ่นรา" },
    { productId: prodSonyA7.id, serialNumber: "A7IV-GM2-002", status: "MAINTENANCE", conditionNotes: "ส่งศูนย์ตรวจเช็คทำความสะอาดเซนเซอร์" },

    // RTX 4090 units
    { productId: prodRTX4090.id, serialNumber: "RTX4090-ROG-001", status: "RENTED", conditionNotes: "อุณหภูมิปกติ ฟูลโหลดไม่เกิน 65C" },
    { productId: prodRTX4090.id, serialNumber: "RTX4090-ROG-002", status: "AVAILABLE", conditionNotes: "สภาพสวย พร้อมกล่องนิรภัย" },

    // LG OLED units
    { productId: prodMonitorOLED.id, serialNumber: "LG-OLED-32-001", status: "AVAILABLE", conditionNotes: "จอคาลิเบรตสีเรียบร้อย Delta E < 1" },

    // iPad Pro M4 units
    { productId: prodIPadM4.id, serialNumber: "IPAD-M4-13-001", status: "AVAILABLE", conditionNotes: "ติดฟิล์มกระดาษ Paperlike เรียบร้อย" },
    { productId: prodIPadM4.id, serialNumber: "IPAD-M4-13-002", status: "AVAILABLE", conditionNotes: "สภาพสวยกริ๊บ อุปกรณ์ครบชุด" },
  ];

  for (const item of assetItems) {
    await prisma.assetItem.create({ data: item });
  }

  console.log("Asset Items (Serial Numbers) seeded.");

  // 5. Seed Orders covering various lifecycle stages
  const today = new Date();
  const d1 = new Date(today);
  d1.setDate(d1.getDate() + 1);
  const d3 = new Date(today);
  d3.setDate(d3.getDate() + 3);

  const pastStart = new Date(today);
  pastStart.setDate(pastStart.getDate() - 5);
  const pastEnd = new Date(today);
  pastEnd.setDate(pastEnd.getDate() - 2);

  // Active Order: Somchai renting RTX 4090
  const rtxAsset = await prisma.assetItem.findUnique({ where: { serialNumber: "RTX4090-ROG-001" } });
  const activeOrder = await prisma.rentalOrder.create({
    data: {
      orderNumber: "TR-202609-0001",
      customerId: customerSomchai.id,
      productId: prodRTX4090.id,
      assignedAssetId: rtxAsset ? rtxAsset.id : null,
      startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
      endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      totalDays: 5,
      dailyRate: 1600,
      rentTotal: 8000,
      depositAmount: 25000,
      grandTotal: 33000,
      status: "ACTIVE",
      paymentStatus: "VERIFIED",
      paymentMethod: "PROMPTPAY",
      paymentSlipUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
      paymentReference: "PP20260910-449102",
      paidAt: new Date(today.getTime() - 2 * 24 * 3600 * 1000),
      paymentVerifiedAt: new Date(today.getTime() - 2 * 24 * 3600 * 1000),
      paymentVerifiedBy: "สมโภชน์ ผู้ดูแลระบบ (Super Admin)",
      deliveryAddress: customerSomchai.address,
      customerNotes: "ต้องการนำไปใช้เรนเดอร์งานส่งลูกค้าด่วนครับ",
    },
  });

  // Create checkout inspection for active order
  await prisma.rentalInspection.create({
    data: {
      rentalOrderId: activeOrder.id,
      checkoutDate: new Date(today.getTime() - 2 * 24 * 3600 * 1000),
      checkoutStaffName: "อนันต์ ตรวจสอบ (Staff)",
      checkoutNotes: "ตรวจสภาพการ์ดจอ ไฟสถานะ RGB และพัดลม 3 ตัวหมุนปกติ อุณหภูมิเบิร์นอิน 10 นาทีผ่านการทดสอบ ไร้รอยขีดข่วน",
      checkoutImages: JSON.stringify([
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80",
      ]),
      originalDeposit: 25000,
      refundStatus: "PENDING",
    },
  });

  // Pending Order: Kanya booked MacBook Pro, awaiting review
  await prisma.rentalOrder.create({
    data: {
      orderNumber: "TR-202609-0002",
      customerId: customerKanya.id,
      productId: prodMacBook.id,
      startDate: d1,
      endDate: d3,
      totalDays: 3,
      dailyRate: 1500,
      rentTotal: 4500,
      depositAmount: 15000,
      grandTotal: 19500,
      status: "PENDING",
      paymentStatus: "PENDING",
      paymentMethod: "PROMPTPAY",
      paymentSlipUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
      paymentReference: "PP20260913-908123",
      paidAt: new Date(),
      deliveryAddress: customerKanya.address,
      customerNotes: "เช่าไปใช้ทำโปรเจกต์จบและตัดต่อคลิปนำเสนอวิทยานิพนธ์ค่ะ",
    },
  });

  // Returned order waiting for inspection
  const a7Asset = await prisma.assetItem.findUnique({ where: { serialNumber: "A7IV-GM2-001" } });
  const returnedOrder = await prisma.rentalOrder.create({
    data: {
      orderNumber: "TR-202609-0003",
      customerId: customerSomchai.id,
      productId: prodSonyA7.id,
      assignedAssetId: a7Asset ? a7Asset.id : null,
      startDate: pastStart,
      endDate: pastEnd,
      totalDays: 4,
      dailyRate: 1800,
      rentTotal: 7200,
      depositAmount: 18000,
      grandTotal: 25200,
      status: "RETURNED",
      paymentStatus: "VERIFIED",
      paymentMethod: "PROMPTPAY",
      paymentSlipUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
      paymentReference: "PP20260905-110293",
      paidAt: pastStart,
      paymentVerifiedAt: pastStart,
      paymentVerifiedBy: "สมโภชน์ ผู้ดูแลระบบ (Super Admin)",
      deliveryAddress: customerSomchai.address,
    },
  });

  await prisma.rentalInspection.create({
    data: {
      rentalOrderId: returnedOrder.id,
      checkoutDate: pastStart,
      checkoutStaffName: "อนันต์ ตรวจสอบ (Staff)",
      checkoutNotes: "เครื่องและเลนส์สภาพสมบูรณ์ ชัตเตอร์ปกติ",
      checkoutImages: JSON.stringify([
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
      ]),
      originalDeposit: 18000,
      refundStatus: "PENDING",
    },
  });

  // 6. Seed Audit Logs
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      userName: adminUser.name,
      userRole: "ADMIN",
      action: "VERIFY_PAYMENT",
      entityType: "ORDER",
      entityId: activeOrder.id,
      details: "ตรวจสอบสลิปการโอนเงินจำนวน 33,000 บาท ถูกต้องครบถ้วน อนุมัติการชำระเงิน",
      ipAddress: "192.168.1.10",
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      userName: adminUser.name,
      userRole: "ADMIN",
      action: "ASSIGN_ASSET",
      entityType: "ORDER",
      entityId: activeOrder.id,
      details: "ผูก Serial Number: RTX4090-ROG-001 เข้ากับคำสั่งเช่า TR-202609-0001",
      ipAddress: "192.168.1.10",
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: staffUser.id,
      userName: staffUser.name,
      userRole: "STAFF",
      action: "CHECKOUT_DISPATCH",
      entityType: "INSPECTION",
      entityId: activeOrder.id,
      details: "ส่งมอบอุปกรณ์เรียบร้อย พร้อมบันทึกภาพสภาพเครื่องก่อนส่ง",
      ipAddress: "192.168.1.25",
    },
  });

  // 7. Seed Notifications
  await prisma.notification.create({
    data: {
      userId: customerSomchai.id,
      title: "คำสั่งเช่า TR-202609-0001 ได้รับการส่งมอบแล้ว",
      message: "อุปกรณ์ ASUS ROG Strix RTX 4090 (S/N: RTX4090-ROG-001) กำลังอยู่ในสถานะใช้งาน โปรดส่งคืนตามกำหนด",
      type: "SUCCESS",
      link: "/orders",
      channel: "IN_APP",
    },
  });

  await prisma.notification.create({
    data: {
      userId: customerSomchai.id,
      title: "แจ้งเตือนครบกำหนดส่งคืนอุปกรณ์ล่วงหน้า 1 วัน",
      message: "คำสั่งเช่า TR-202609-0001 จะครบกำหนดส่งคืนในวันพรุ่งนี้ กรุณาเตรียมอุปกรณ์และอุปกรณ์เสริมให้ครบชุด",
      type: "WARNING",
      link: "/orders",
      channel: "LINE_SIMULATED",
    },
  });

  console.log("TechRent seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

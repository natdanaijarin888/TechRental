const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding TechRent database with 32 professional IT products...");

  // Clean existing tables in proper relation order
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
      address: "หอพักนักศึกษาจุฬาฯ ถ.พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330",
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
      id: "cat-laptops",
      name: "โน้ตบุ๊กประสิทธิภาพสูง",
      slug: "laptops",
      icon: "Laptop",
      description: "แล็ปท็อปสำหรับการตัดต่อวิดีโอ งานกราฟิก และเขียนโปรแกรมระดับมืออาชีพ",
    },
  });

  const catCamera = await prisma.category.create({
    data: {
      id: "cat-cameras",
      name: "กล้องและอุปกรณ์ถ่ายภาพ",
      slug: "cameras",
      icon: "Camera",
      description: "กล้อง Mirrorless ฟูลเฟรม เลนส์เกรดโปร และอุปกรณ์ไฟสตูดิโอ",
    },
  });

  const catGPU = await prisma.category.create({
    data: {
      id: "cat-gpus",
      name: "การ์ดจอ GPU & Workstation",
      slug: "gpus",
      icon: "Cpu",
      description: "การ์ดจอระดับท็อปสำหรับเทรน AI / Deep Learning, 3D Rendering และงานอีเวนต์",
    },
  });

  const catMonitor = await prisma.category.create({
    data: {
      id: "cat-monitors",
      name: "จอคอมพิวเตอร์และมอนิเตอร์",
      slug: "monitors",
      icon: "Monitor",
      description: "จอ 4K / OLED สีตรงระดับ DCI-P3 99% สำหรับช่างภาพและ Colorist",
    },
  });

  const catTablet = await prisma.category.create({
    data: {
      id: "cat-tablets",
      name: "แท็บเล็ตและอุปกรณ์เสริม",
      slug: "tablets",
      icon: "Tablet",
      description: "iPad Pro M4 พร้อม Apple Pencil Pro และคีย์บอร์ด สำหรับนักวาดและพรีเซนต์งาน",
    },
  });

  console.log("Categories seeded.");

  // 3. 32 Comprehensive Products
  const productsData = [
    // --- หมวด 1: โน้ตบุ๊กประสิทธิภาพสูง (Laptops) ---
    {
      id: "prod-mbp-m3max",
      name: "Apple MacBook Pro 16\" (M3 Max)",
      brand: "Apple",
      categoryId: catLaptop.id,
      model: "MacBook Pro 16-inch 2024",
      description: "โน้ตบุ๊กพลังชิป M3 Max สเปกท็อปสุด เหมาะสำหรับงานเรนเดอร์ 3D, ตัดต่อวิดีโอ 8K ProRes และเทรนโมเดลขนาดใหญ่ มาพร้อมจอ Liquid Retina XDR ความสว่างสูงสุด 1600 nits",
      specs: JSON.stringify({
        cpu: "Apple M3 Max (16-core CPU)",
        gpu: "40-core GPU, Hardware Ray Tracing",
        ram: "64GB Unified Memory",
        storage: "1TB Ultra-fast NVMe SSD",
        display: "16.2\" Liquid Retina XDR (3456x2234), ProMotion 120Hz",
        ports: "Thunderbolt 4 (USB-C) x 3, HDMI, SDXC, MagSafe 3",
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
    {
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
    {
      id: "prod-mbp-m3pro-14",
      name: "Apple MacBook Pro 14\" (M3 Pro 18GB/512GB)",
      brand: "Apple",
      categoryId: catLaptop.id,
      model: "MacBook Pro 14-inch Space Black",
      description: "คล่องตัวพกพาง่าย ทรงพลังระดับโปรด้วยชิป M3 Pro สี Space Black สุดหรู แบตเตอรี่อึดถึง 18 ชั่วโมง เหมาะสำหรับงานดนตรี โค้ดดิ้ง และตัดต่อภาพนิ่ง",
      specs: JSON.stringify({
        cpu: "Apple M3 Pro (11-core CPU)",
        gpu: "14-core GPU",
        ram: "18GB Unified Memory",
        storage: "512GB NVMe SSD",
        display: "14.2\" Liquid Retina XDR, ProMotion 120Hz",
        ports: "Thunderbolt 4 x 3, HDMI, SDXC, MagSafe 3",
        weight: "1.61 kg",
      }),
      accessoriesIncluded: JSON.stringify([
        "ซองซอฟต์เคส Incase 14\"",
        "Apple 70W USB-C Power Adapter",
        "สาย MagSafe 3 ถัก 2 เมตร",
      ]),
      dailyRate: 1100,
      weeklyRate: 6200,
      depositAmount: 10000,
      imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-rog-zephyrus-g16",
      name: "ASUS ROG Zephyrus G16 (Core Ultra 9 / RTX 4080)",
      brand: "ASUS",
      categoryId: catLaptop.id,
      model: "GU605MZ 2024",
      description: "แล็ปท็อปเกมมิ่งและคอนเทนต์ครีเอเตอร์บางเบา จอ ROG Nebula OLED 240Hz สีแม่นยำระดับ 100% DCI-P3 พร้อมการ์ดจอ RTX 4080 รองรับงาน VR และจำลองสถานการณ์ 3D",
      specs: JSON.stringify({
        cpu: "Intel Core Ultra 9 185H",
        gpu: "NVIDIA GeForce RTX 4080 12GB GDDR6 (115W TGP)",
        ram: "32GB LPDDR5X",
        storage: "2TB PCIe 4.0 NVMe M.2 Performance SSD",
        display: "16\" 2.5K (2560 x 1600) OLED 240Hz, 0.2ms, G-Sync",
        weight: "1.85 kg",
      }),
      accessoriesIncluded: JSON.stringify([
        "กระเป๋าเป้สะพายหลัง ROG Backpack",
        "อะแดปเตอร์ชาร์จเร็ว 240W",
        "เมาส์เกมมิ่ง ROG Strix Impact III",
      ]),
      dailyRate: 1450,
      weeklyRate: 8200,
      depositAmount: 15000,
      imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-thinkpad-p1",
      name: "Lenovo ThinkPad P1 Gen 7 Mobile Workstation",
      brand: "Lenovo",
      categoryId: catLaptop.id,
      model: "ThinkPad P1 Gen 7",
      description: "เวิร์กสเตชันพันธุ์แท้ที่ได้รับการรับรอง ISV Certified สำหรับโปรแกรม CAD, SolidWorks, Revit และวิเคราะห์ข้อมูลระดับองค์กร ทนทานมาตรฐานทางทหาร MIL-STD-810H",
      specs: JSON.stringify({
        cpu: "Intel Core Ultra 7 155H vPro",
        gpu: "NVIDIA RTX 2000 Ada Generation 8GB GDDR6",
        ram: "64GB LPDDR5x LPCAMM2",
        storage: "1TB PCIe Gen4 SSD",
        display: "16\" WQXGA (2560x1600) IPS, 500 nits, 100% sRGB",
        weight: "1.82 kg",
      }),
      accessoriesIncluded: JSON.stringify([
        "กระเป๋าใส่โน้ตบุ๊ก ThinkPad Professional",
        "Lenovo 170W Slim AC Adapter",
        "หัวแปลง HDMI to DisplayPort",
      ]),
      dailyRate: 1250,
      weeklyRate: 7000,
      depositAmount: 12000,
      imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-razer-blade-16",
      name: "Razer Blade 16 (i9-14900HX / RTX 4090 Dual-Mini-LED)",
      brand: "Razer",
      categoryId: catLaptop.id,
      model: "Blade 16 2024 Dual-Mode",
      description: "ที่สุดแห่งขุมพลังแล็ปท็อป ตัวเครื่องอลูมิเนียม CNC มิลลิ่ง จอ Dual-Mode Mini-LED ปรับสลับได้ระหว่าง 4K 120Hz (งานภาพ) และ FHD+ 240Hz (เกมมิ่ง)",
      specs: JSON.stringify({
        cpu: "Intel Core i9-14900HX (24 cores, up to 5.8 GHz)",
        gpu: "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W Full TGP)",
        ram: "32GB DDR5 5600MHz",
        storage: "2TB PCIe 4.0 NVMe SSD",
        display: "16\" Dual-Mode Mini-LED (UHD+ 120Hz / FHD+ 240Hz, 1000 nits)",
        weight: "2.45 kg",
      }),
      accessoriesIncluded: JSON.stringify([
        "สายชาร์จ Razer GaN 330W ขนาดกะทัดรัด",
        "ซองกระเป๋าผ้ากำมะหยี่พกพา Razer Sleeve",
        "ผ้าไมโครไฟเบอร์ทำความสะอาดจอแท้",
      ]),
      dailyRate: 1700,
      weeklyRate: 9800,
      depositAmount: 19000,
      imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-macbook-air-m3",
      name: "Apple MacBook Air 15\" (M3 16GB/512GB)",
      brand: "Apple",
      categoryId: catLaptop.id,
      model: "MacBook Air 15-inch Midnight",
      description: "โน้ตบุ๊กหน้าจอใหญ่ 15.3 นิ้วที่บางและเบาเป็นพิเศษ ดีไซน์ไร้พัดลมเงียบสนิท ชิป M3 เร็วแรง แบตเตอรี่อยู่ได้ทั้งวัน เหมาะสำหรับงานเอกสาร อบรม สัมมนา และอีเวนต์",
      specs: JSON.stringify({
        cpu: "Apple M3 (8-core CPU)",
        gpu: "10-core GPU",
        ram: "16GB Unified Memory",
        storage: "512GB SSD",
        display: "15.3\" Liquid Retina (2880x1864), 500 nits",
        weight: "1.51 kg",
      }),
      accessoriesIncluded: JSON.stringify([
        "Apple 35W Dual USB-C Port Power Adapter",
        "สายชาร์จ MagSafe 3",
        "กระเป๋าซองผ้ากันน้ำ",
      ]),
      dailyRate: 850,
      weeklyRate: 4800,
      depositAmount: 8000,
      imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80",
    },

    // --- หมวด 2: กล้องและอุปกรณ์ถ่ายภาพ (Cameras & Lenses) ---
    {
      id: "prod-sony-a7iv",
      name: "Sony Alpha 7 IV + Lens FE 24-70mm F2.8 GM II",
      brand: "Sony",
      categoryId: catCamera.id,
      model: "ILCE-7M4 / SEL2470GM2",
      description: "ชุดกล้องฟูลเฟรมพร้อมเลนส์เกรดมาสเตอร์ G Master II เซนเซอร์ Exmor R CMOS 33MP บันทึกวิดีโอ 4K 60p 10-bit 4:2:2 พร้อมระบบกันสั่นในตัว 5.5 สต็อป และโฟกัส Real-time Eye AF",
      specs: JSON.stringify({
        sensor: "33.0MP Full-Frame Exmor R CMOS",
        video: "4K 60p, 10-bit 4:2:2 All-Intra",
        lens: "Sony FE 24-70mm F2.8 GM II (Filter 82mm)",
        autofocus: "759-point Phase-detection AF, Real-time Tracking",
        stabilization: "5-axis In-body Image Stabilization (5.5 stops)",
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
    {
      id: "prod-sony-fx3",
      name: "Sony FX3 Cinema Line Full-Frame Camera + XLR Top Handle",
      brand: "Sony",
      categoryId: catCamera.id,
      model: "ILME-FX3",
      description: "กล้องถ่ายภาพยนตร์ขนาดกะทัดรัด เซนเซอร์ฟูลเฟรม 12.1MP ถ่ายวิดีโอ 4K 120p สโลว์โมชั่นความคมชัดสูง มีพัดลมระบายความร้อนในตัวบันทึกต่อเนื่องไม่ตัด พร้อมด้ามจับ XLR สำหรับเสียงมืออาชีพ",
      specs: JSON.stringify({
        sensor: "12.1MP Full-Frame Exmor R BSI CMOS",
        video: "UHD 4K 120p / FHD 240p, 10-bit 4:2:2, S-Cinetone",
        isoRange: "Base ISO 800 & 12,800 (Dynamic Range 15+ stops)",
        audio: "XLR Handle with 2x XLR/TRS Combo Inputs",
      }),
      accessoriesIncluded: JSON.stringify([
        "XLR Top Handle Unit ถอดประกอบได้",
        "แบตเตอรี่ NP-FZ100 จำนวน 4 ก้อน",
        "CFexpress Type A 160GB x 2 ใบ พร้อมการ์ดรีดเดอร์",
        "เคสกล้อง SmallRig Full Cage",
      ]),
      dailyRate: 2200,
      weeklyRate: 12000,
      depositAmount: 22000,
      imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-canon-r5m2",
      name: "Canon EOS R5 Mark II + RF 24-70mm F2.8 L IS USM",
      brand: "Canon",
      categoryId: catCamera.id,
      model: "EOS R5 Mark II Kit",
      description: "กล้องเรือธงความละเอียด 45MP ถ่ายวิดีโอ 8K 60p RAW และ 4K 120p พร้อมระบบโฟกัส Accelerated Capture ติดตามดวงตาแม่นยำ เลนส์ซูมมืออาชีพ L-Series คมชัดสูงสุด",
      specs: JSON.stringify({
        sensor: "45MP Full-Frame Back-Illuminated Stacked CMOS",
        video: "8K 60p RAW internal, 4K 120p with sound",
        lens: "Canon RF 24-70mm F2.8 L IS USM",
        stabilization: "Up to 8.5 stops Coordinated Control IS",
      }),
      accessoriesIncluded: JSON.stringify([
        "เลนส์ RF 24-70mm F2.8 L พร้อมฮูดและฟิลเตอร์ B+W",
        "แบตเตอรี่ Canon LP-E6P แท้ 3 ก้อน",
        "ที่ชาร์จแท้ Canon Dual Charger",
        "CFexpress Type B 512GB + SD UHS-II 128GB",
      ]),
      dailyRate: 2400,
      weeklyRate: 13500,
      depositAmount: 25000,
      imageUrl: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-sony-a7rv",
      name: "Sony Alpha 7R V (61MP 8K / AI Real-time Autofocus)",
      brand: "Sony",
      categoryId: catCamera.id,
      model: "ILCE-7RM5 Body",
      description: "กล้องฟูลเฟรมความละเอียดสูงสุด 61 ล้านพิกเซล มีชิป AI Processing Unit จำแนกวัตถุได้แม่นยำ กันสั่น 8 สต็อปในบอดี้ หน้าจอ 4 แกนพับได้ทุกทิศทาง เหมาะกับงานถ่ายแฟชั่นและสถาปัตยกรรม",
      specs: JSON.stringify({
        sensor: "61.0MP Full-Frame Exmor R BSI CMOS Sensor",
        processor: "BIONZ XR & Dedicated AI Processing Unit",
        video: "8K 24p, 4K 60p, 10-Bit Internal",
        stabilization: "5-Axis Image Stabilization (8-stop)",
      }),
      accessoriesIncluded: JSON.stringify([
        "แบตเตอรี่ Sony NP-FZ100 จำนวน 3 ก้อน",
        "สายสะพาย Peak Design Slide",
        "การ์ด Sony TOUGH SDXC 128GB V90 x 2 ใบ",
        "กระเป๋ากล้องกันกระแทก",
      ]),
      dailyRate: 2000,
      weeklyRate: 11000,
      depositAmount: 20000,
      imageUrl: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-fujifilm-xt5",
      name: "Fujifilm X-T5 + XF 16-55mm F2.8 R LM WR",
      brand: "Fujifilm",
      categoryId: catCamera.id,
      model: "X-T5 Black Kit",
      description: "กล้องสไตล์คลาสสิกเซนเซอร์ X-Trans CMOS 5 HR ความละเอียด 40.2MP โดดเด่นด้วยฟิล์มซิมูเลชัน 19 รูปแบบ วิดีโอ 6.2K 30p พร้อมเลนส์ซูมเกรดโปรสีสันเป็นเอกลักษณ์",
      specs: JSON.stringify({
        sensor: "40.2MP APS-C X-Trans CMOS 5 HR BSI Sensor",
        video: "6.2K 30p, 4K 60p, FHD 240p 10-Bit Video",
        lens: "FUJINON XF 16-55mm F2.8 R LM WR (Weather-Resistant)",
        stabilization: "7-Stop In-Body Image Stabilization",
      }),
      accessoriesIncluded: JSON.stringify([
        "เลนส์ XF 16-55mm F2.8 พร้อมกระเป๋าใส่เลนส์",
        "แบตเตอรี่ NP-W235 แท้ 3 ก้อน",
        "แท่นชาร์จคู่ Dual Charger",
        "การ์ด SDXC 128GB 300MB/s x 2 ใบ",
      ]),
      dailyRate: 1200,
      weeklyRate: 6500,
      depositAmount: 10000,
      imageUrl: "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-dji-ronin-4d",
      name: "DJI Ronin 4D 6K 4-Axis Cinema Camera Combo",
      brand: "DJI",
      categoryId: catCamera.id,
      model: "Ronin 4D-6K",
      description: "ชุดระบบกล้องถ่ายภาพยนตร์และกิมบอล 4 แกนในตัวเครื่องเดียว หมดปัญหากล้องกระเพื่อมตามจังหวะเดิน รองรับ LiDAR Focusing โฟกัสแม่นยำแม้ในที่มืดสนิท",
      specs: JSON.stringify({
        sensor: "Zenmuse X9-6K Full-Frame Gimbal Camera",
        video: "6K 60p, 4K 120p ProRes 422 HQ & ProRes RAW",
        stabilization: "Active 4-Axis Stabilization System (Z-Axis built-in)",
        focus: "LiDAR Range Finder Auto Focus",
      }),
      accessoriesIncluded: JSON.stringify([
        "DJI PROSSD 1TB พร้อมเคเบิลเชื่อมต่อ",
        "แบตเตอรี่ TB50 จำนวน 4 ก้อน พร้อมแท่นชาร์จสี่ช่อง",
        "ด้ามจับ Handgrips ซ้าย-ขวา พร้อมจอ High-Bright Monitor",
        "LiDAR Range Finder Unit + มอเตอร์โฟกัส",
        "กล่อง Hard Case นิรภัยติดล้อลาก",
      ]),
      dailyRate: 3500,
      weeklyRate: 19500,
      depositAmount: 35000,
      imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-bmpcc-6k-pro",
      name: "Blackmagic Pocket Cinema Camera 6K Pro + EVF",
      brand: "Blackmagic Design",
      categoryId: catCamera.id,
      model: "BMPCC 6K Pro",
      description: "กล้องซีนีม่าเซนเซอร์ Super 35 HDR พร้อมฟิลเตอร์ ND แบบมอเตอร์ในตัว 2, 4, 6 สต็อป บันทึก Blackmagic RAW สีตรงระดับภาพยนตร์ฮอลลีวูด",
      specs: JSON.stringify({
        sensor: "Super 35 HDR Sensor (6144 x 3456)",
        mount: "Active Canon EF Lens Mount",
        ndFilters: "Built-In motorized 2, 4, 6 Stop ND Filters",
        audio: "Dual Mini XLR Inputs with 48V Phantom Power",
      }),
      accessoriesIncluded: JSON.stringify([
        "Blackmagic Pocket Cinema Camera Pro EVF ช่องมองภาพ",
        "แบตเตอรี่ NP-F570 จำนวน 4 ก้อน",
        "Samsung T7 Shield SSD 1TB + ที่ยึด SmallRig",
        "Power Adapter 12V DC",
      ]),
      dailyRate: 1500,
      weeklyRate: 8200,
      depositAmount: 15000,
      imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80",
    },

    // --- หมวด 3: การ์ดจอ GPU & Workstation (GPUs) ---
    {
      id: "prod-rtx-4090",
      name: "ASUS ROG Strix GeForce RTX 4090 24GB OC",
      brand: "ASUS",
      categoryId: catGPU.id,
      model: "ROG-STRIX-RTX4090-O24G-GAMING",
      description: "การ์ดจอที่ทรงพลังที่สุดสำหรับการประมวลผล AI, LLM Fine-tuning, 3D Rendering และงาน Visual Effects ด้วย VRAM 24GB GDDR6X และระบบระบายความร้อน 3.5-slot Vapor Chamber",
      specs: JSON.stringify({
        cudaCores: "16384 CUDA Cores",
        vram: "24GB GDDR6X, 384-bit memory bus, 21 Gbps",
        boostClock: "2640 MHz (OC mode) / 2610 MHz (Default)",
        powerRequirement: "TDP 450W (แนะนำ Power Supply 1000W ขึ้นไป)",
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
    {
      id: "prod-rtx-6000-ada",
      name: "NVIDIA RTX 6000 Ada Generation 48GB Workstation",
      brand: "NVIDIA",
      categoryId: catGPU.id,
      model: "RTX 6000 Ada 48GB",
      description: "การ์ดจอเวิร์กสเตชันระดับองค์กรพร้อม ECC VRAM ขนาดมหึมา 48GB ออกแบบมาสำหรับเทรนโมเดล Generative AI ขนาดใหญ่, Real-time Simulation และงานภาพยนตร์ VFX",
      specs: JSON.stringify({
        cudaCores: "18176 CUDA Cores, 568 Tensor Cores, 142 RT Cores",
        vram: "48GB GDDR6 with Error-Correcting Code (ECC)",
        memoryBandwidth: "960 GB/s",
        power: "300W Max Power Consumption",
        formFactor: "Dual Slot, Blower Fan Form Factor",
      }),
      accessoriesIncluded: JSON.stringify([
        "กล่องเคส Pelican นิรภัยป้องกันไฟฟ้าสถิต",
        "สายเคเบิล 8-pin PCIe to 16-pin Adapter",
        "หัวแปลง DisplayPort to HDMI 4K",
      ]),
      dailyRate: 3800,
      weeklyRate: 22000,
      depositAmount: 50000,
      imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-rtx-4080-super",
      name: "MSI GeForce RTX 4080 SUPER 16GB Gaming X Slim",
      brand: "MSI",
      categoryId: catGPU.id,
      model: "RTX 4080 SUPER 16G GAMING X SLIM",
      description: "การ์ดจอระดับไฮเอนด์ VRAM 16GB สถาปัตยกรรม Ada Lovelace ตัวการ์ดดีไซน์สลิมติดตั้งง่าย รองรับการเรนเดอร์ Blender, Unreal Engine 5 และเล่นเกมระดับ 4K Max Settings",
      specs: JSON.stringify({
        cudaCores: "10240 CUDA Cores",
        vram: "16GB GDDR6X, 256-bit",
        boostClock: "2610 MHz",
        powerRequirement: "TDP 320W (แนะนำ PSU 750W-850W)",
        cooling: "TRI FROZR 3 Thermal Design",
      }),
      accessoriesIncluded: JSON.stringify([
        "กล่องบรรจุกันกระแทก",
        "สายแปลง 16-pin 12VHPWR to 3x 8-pin",
        "MSI Support Bracket ขาค้ำการ์ดจอ",
      ]),
      dailyRate: 1100,
      weeklyRate: 6000,
      depositAmount: 15000,
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-rtx-4070ti-super",
      name: "GIGABYTE GeForce RTX 4070 Ti SUPER Gaming OC 16GB",
      brand: "GIGABYTE",
      categoryId: catGPU.id,
      model: "GV-N407TSGAMING OC-16GD",
      description: "ความคุ้มค่าสูงสุดสำหรับงานสตูดิโอ อัปเกรด VRAM เป็น 16GB 256-bit ช่วยให้ตัดต่อ 4K/6K และพรีวิวโมเดล 3D ได้ลื่นไหลไม่มีสะดุด",
      specs: JSON.stringify({
        cudaCores: "8448 CUDA Cores",
        vram: "16GB GDDR6X, 256-bit bus",
        coreClock: "2655 MHz",
        cooling: "WINDFORCE 3X Cooling System",
      }),
      accessoriesIncluded: JSON.stringify([
        "กล่องกันกระแทกพร้อมซองกันไฟฟ้าสถิต ESD",
        "สายไฟอะแดปเตอร์ 16-pin to 2x 8-pin",
      ]),
      dailyRate: 850,
      weeklyRate: 4600,
      depositAmount: 12000,
      imageUrl: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-nvidia-a100",
      name: "NVIDIA A100 80GB PCIe Tensor Core Accelerator",
      brand: "NVIDIA",
      categoryId: catGPU.id,
      model: "A100 PCIe 80GB",
      description: "การ์ดเร่งความเร็วระดับ Data Center ด้วยหน่วยความจำแบนด์วิดท์สูงสุด HBM2e 80GB ความเร็ว 2.0 TB/s รองรับงาน Deep Learning, LLM Pretraining และ Big Data",
      specs: JSON.stringify({
        memory: "80GB HBM2e Memory, Bandwidth 2,039 GB/s",
        tensorPerformance: "312 TFLOPS (FP16/FP32 Mixed Precision)",
        interconnect: "PCIe Gen 4 (64 GB/s)",
        power: "250W Max TDP (Passive/Server Chassis Required)",
      }),
      accessoriesIncluded: JSON.stringify([
        "Flight Case ป้องกันคลื่นความถี่และไฟฟ้าสถิต",
        "ใบ Certificate ตรวจสอบสุขภาพชิปและการันตี 100% Health",
      ]),
      dailyRate: 4500,
      weeklyRate: 26000,
      depositAmount: 60000,
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-radeon-pro-w7900",
      name: "AMD Radeon PRO W7900 48GB Workstation",
      brand: "AMD",
      categoryId: catGPU.id,
      model: "Radeon PRO W7900 48GB",
      description: "การ์ดจอสายโปรชิปเล็ตสถาปัตยกรรม RDNA 3 มาพร้อม DisplayPort 2.1 รองรับการส่งสัญญาณจอภาพระดับ 8K 165Hz และหน่วยความจำ ECC 48GB สำหรับงาน DaVinci Resolve",
      specs: JSON.stringify({
        streamProcessors: "6144 Stream Processors (96 Compute Units)",
        vram: "48GB GDDR6 with ECC",
        memoryBandwidth: "864 GB/s",
        outputs: "DisplayPort 2.1 x 3, Mini-DisplayPort 2.1 x 1",
      }),
      accessoriesIncluded: JSON.stringify([
        "กล่องนิรภัย Hard Case บุกระแทก",
        "สายแปลง Mini-DP to Full DP 2.1 แท้",
      ]),
      dailyRate: 2500,
      weeklyRate: 14000,
      depositAmount: 30000,
      imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80",
    },

    // --- หมวด 4: จอคอมพิวเตอร์และมอนิเตอร์ (Monitors) ---
    {
      id: "prod-monitor-oled",
      name: "LG UltraFine 32\" 4K OLED Pro Display",
      brand: "LG",
      categoryId: catMonitor.id,
      model: "32EP950-B",
      description: "มอนิเตอร์ระดับสตูดิโอพาเนล OLED สีดำสนิท Contrast Ratio 1,000,000:1 ครอบคลุม DCI-P3 99% และ Adobe RGB 99% พร้อมพอร์ตเชื่อมต่อครบครัน",
      specs: JSON.stringify({
        size: "31.5-inch 4K UHD (3840 x 2160)",
        panel: "OLED (Individual Pixel Dimming)",
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
    {
      id: "prod-apple-studio-display",
      name: "Apple Studio Display 27\" 5K Retina (Nano-texture)",
      brand: "Apple",
      categoryId: catMonitor.id,
      model: "Studio Display 27-inch 5K",
      description: "จอภาพ 5K Retina 5120x2880 ความหนาแน่น 218 ppi พร้อมกระจก Nano-texture ช่วยลดแสงสะท้อน กล้อง 12MP Ultra-wide จัดกึ่งกลาง Center Stage และระบบเสียง 6 ลำโพง",
      specs: JSON.stringify({
        display: "27\" 5K Retina (5120 x 2880), 600 nits, P3 Wide Color",
        glass: "Nano-texture Glass (Anti-reflective)",
        camera: "12MP Ultra Wide with Center Stage",
        audio: "High-fidelity six-speaker sound system with force-cancelling woofers",
        ports: "Thunderbolt 3 (96W Host Charging), USB-C x 3 (10Gbps)",
      }),
      accessoriesIncluded: JSON.stringify([
        "กล่องแท้ Apple พร้อมโฟมกันกระแทก",
        "สาย Thunderbolt 3 ความยาว 1 เมตร",
        "ผ้าเช็ดกระจกขัดเงา Apple Polishing Cloth แท้",
      ]),
      dailyRate: 1100,
      weeklyRate: 6000,
      depositAmount: 14000,
      imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-asus-proart-pa32",
      name: "ASUS ProArt PA32UCG-K 32\" 4K HDR 1600 nits Mini-LED",
      brand: "ASUS",
      categoryId: catMonitor.id,
      model: "PA32UCG-K",
      description: "จอภาพ HDR มืออาชีพระดับ 1600 nits Mini-LED 1152 โซน รองรับทุกมาตรฐาน Dolby Vision, HDR-10 และ HLG พร้อมอุปกรณ์ฮาร์ดแวร์คาลิเบรตเตอร์ X-rite i1 Display Pro",
      specs: JSON.stringify({
        panel: "32\" 4K UHD Mini-LED (1,152 Local Dimming Zones)",
        brightness: "1600 nits Peak / 1000 nits Sustained",
        colorAccuracy: "Delta E < 1, 98% DCI-P3, 100% Rec. 709",
        refreshRate: "120Hz FreeSync Premium Pro",
      }),
      accessoriesIncluded: JSON.stringify([
        "กล่องนิรภัยล้อลาก Flight Case",
        "อุปกรณ์ตรวจวัดสี X-rite i1 Display Pro Calibrator",
        "ม่านบังแสงแม่เหล็ก ProArt Monitor Hood",
        "สาย Thunderbolt 3 และ HDMI 2.1",
      ]),
      dailyRate: 1500,
      weeklyRate: 8500,
      depositAmount: 20000,
      imageUrl: "https://images.unsplash.com/photo-1585792180666-f7547c6a6c7c?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-dell-ultrasharp-6k",
      name: "Dell UltraSharp 32\" 6K Monitor (U3224KB)",
      brand: "Dell",
      categoryId: catMonitor.id,
      model: "U3224KB 6K IPS Black",
      description: "จอภาพ 6K (6144 x 3456) พาเนล IPS Black ให้คอนทราสต์ลึกกว่าจอทั่วไป 2 เท่า มาพร้อมกล้องเว็บแคม 4K HDR ในตัว ไมค์ตัดเสียงรบกวน และพอร์ต Thunderbolt 4 140W",
      specs: JSON.stringify({
        resolution: "6K UHD+ (6144 x 3456) at 60Hz",
        panelTechnology: "IPS Black Technology, Contrast 2000:1",
        webcam: "Built-in 4K Dual Gain HDR Webcam",
        connectivity: "Thunderbolt 4 (140W Power Delivery), RJ45 2.5Gbps, USB-C Hub",
      }),
      accessoriesIncluded: JSON.stringify([
        "กล่องบรรจุ Dell Original Box",
        "สาย Thunderbolt 4 40Gbps",
        "สาย DisplayPort to Mini-DP",
        "สายไฟ AC Power",
      ]),
      dailyRate: 1350,
      weeklyRate: 7500,
      depositAmount: 18000,
      imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-samsung-odyssey-g9",
      name: "Samsung Odyssey OLED G9 49\" 240Hz Curved",
      brand: "Samsung",
      categoryId: catMonitor.id,
      model: "G95SC OLED 49-inch",
      description: "จอภาพโค้ง 1800R ขนาดยักษ์ 49 นิ้ว อัตราส่วน 32:9 (Dual QHD เทียบเท่าจอ 27 นิ้ว 2 จอต่อกัน) พาเนล OLED 240Hz 0.03ms เหมาะสำหรับการสตรีมมิ่ง จำลอง Simulator และเทรดดิ้ง",
      specs: JSON.stringify({
        size: "49\" Dual QHD (5120 x 1440) Curved 1800R",
        panel: "QD-OLED, 0.03ms response time, 240Hz refresh rate",
        color: "DCI-P3 99%, DisplayHDR True Black 400",
        ports: "HDMI 2.1, Micro HDMI 2.1, DisplayPort 1.4, USB Hub",
      }),
      accessoriesIncluded: JSON.stringify([
        "กล่องนิรภัยล้อลากขนาดยักษ์สำหรับจัดส่งปลอดภัย",
        "ขาตั้งแท้พร้อมไฟ CoreSync & Core Lighting+",
        "สาย DisplayPort 1.4 และ HDMI 2.1",
        "รีโมตควบคุม Smart Monitor Remote",
      ]),
      dailyRate: 1400,
      weeklyRate: 7900,
      depositAmount: 16000,
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-benq-sw321c",
      name: "BenQ PhotoVue SW321C 32\" 4K Color Accurate Monitor",
      brand: "BenQ",
      categoryId: catMonitor.id,
      model: "SW321C 4K HDR",
      description: "จอขวัญใจช่างภาพระดับสากล พาเนล Paper Color Sync ครอบคลุม 99% Adobe RGB พร้อมฟังก์ชัน Uniformity Technology ให้ความสว่างและสีสม่ำเสมอทั่วทั้งแผงจอ",
      specs: JSON.stringify({
        display: "32\" 4K UHD (3840 x 2160) IPS Anti-glare",
        color: "99% Adobe RGB, 95% DCI-P3, 100% sRGB, 16-bit 3D LUT",
        accessories: "Hotkey Puck G2 รีโมตหมุนปรับโปรไฟล์สีทันที",
      }),
      accessoriesIncluded: JSON.stringify([
        "Shading Hood ม่านบังแสงทั้งแนวนอนและแนวตั้ง",
        "Hotkey Puck G2 Controller",
        "สาย USB-C, DisplayPort และ HDMI",
        "ลูกกลิ้งทำความสะอาดจอพิเศษ Paper Color",
      ]),
      dailyRate: 950,
      weeklyRate: 5200,
      depositAmount: 11000,
      imageUrl: "https://images.unsplash.com/photo-1547394765-185e131e1784?w=800&auto=format&fit=crop&q=80",
    },

    // --- หมวด 5: แท็บเล็ตและอุปกรณ์เสริม (Tablets & Accessories) ---
    {
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
    {
      id: "prod-ipad-m4-11",
      name: "Apple iPad Pro 11\" (M4) + Apple Pencil Pro",
      brand: "Apple",
      categoryId: catTablet.id,
      model: "iPad Pro 11-inch (M4 256GB)",
      description: "ขนาดกะทัดรัดพกสะดวกสุดๆ จอ Tandem OLED สว่างสดใส 1000 nits ชิปประมวลผล M4 เร็วแรงเทียบเท่าโน้ตบุ๊ก เหมาะสำหรับการวาดภาพสเก็ตช์ จดเลกเชอร์ และตรวจสอบงานนอกสถานที่",
      specs: JSON.stringify({
        chip: "Apple M4 Chip (9-core CPU / 10-core GPU)",
        display: "11\" Ultra Retina XDR OLED (2420 x 1668), ProMotion 120Hz",
        storage: "256GB",
        weight: "444 กรัม (บางเพียง 5.3 มม.)",
      }),
      accessoriesIncluded: JSON.stringify([
        "Apple Pencil Pro",
        "Smart Folio Case เคสแม่เหล็กพับตั้งได้",
        "อะแดปเตอร์และสายชาร์จถัก USB-C",
      ]),
      dailyRate: 750,
      weeklyRate: 4100,
      depositAmount: 8000,
      imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-wacom-cintiq-27",
      name: "Wacom Cintiq Pro 27 Creative Pen & Touch Display",
      brand: "Wacom",
      categoryId: catTablet.id,
      model: "DTH271K0C",
      description: "จอวาดภาพระดับมืออาชีพชั้นนำระดับโลก ขนาด 27 นิ้ว 4K 120Hz สีตรง 99% DCI-P3 มาพร้อมปากกา Pro Pen 3 ปรับน้ำหนักและกริปได้ตามสรีระ และขาตั้ง Wacom Ergo Stand ปรับเอียงได้ตามใจ",
      specs: JSON.stringify({
        display: "26.9\" 4K UHD (3840 x 2160) IPS, 120Hz, 10ms",
        colorAccuracy: "99% DCI-P3, 98% Adobe RGB, Pantone Validated",
        pen: "Wacom Pro Pen 3 (8,192 pressure levels, tilt support)",
        stand: "Wacom Cintiq Pro 27 Ergo Stand Included",
      }),
      accessoriesIncluded: JSON.stringify([
        "Wacom Pro Pen 3 พร้อมเคสและไส้ปากกาสำรอง 10 ชิ้น",
        "Wacom Ergo Stand ขาตั้งปรับระดับแท้",
        "สาย USB-C, DisplayPort และ HDMI",
        "ถุงมือวาดภาพ Wacom Drawing Glove",
      ]),
      dailyRate: 2000,
      weeklyRate: 11000,
      depositAmount: 25000,
      imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-surface-pro-11",
      name: "Microsoft Surface Pro 11 Copilot+ PC (OLED)",
      brand: "Microsoft",
      categoryId: catTablet.id,
      model: "Surface Pro 11th Edition",
      description: "อุปกรณ์ 2-in-1 ยุคใหม่ขับเคลื่อนด้วยชิป Snapdragon X Elite และ NPU ประมวลผล AI 45 TOPS บน Windows 11 จอ OLED คมชัด พร้อมคีย์บอร์ด Flex Keyboard และ Slim Pen 2",
      specs: JSON.stringify({
        processor: "Snapdragon X Elite (12 cores) with Qualcomm Hexagon NPU",
        ram: "16GB LPDDR5x",
        storage: "512GB Removable Gen4 SSD",
        display: "13\" PixelSense Flow OLED (2880 x 1920), 120Hz Dynamic",
      }),
      accessoriesIncluded: JSON.stringify([
        "Surface Pro Flex Keyboard พร้อมช่องชาร์จปากกา",
        "Surface Slim Pen 2",
        "Surface 65W Power Supply",
        "ซองกระเป๋าผ้ากันกระแทก",
      ]),
      dailyRate: 800,
      weeklyRate: 4400,
      depositAmount: 9000,
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-ipad-air-m2-13",
      name: "Apple iPad Air 13\" (M2 128GB Wi-Fi) + Magic Keyboard",
      brand: "Apple",
      categoryId: catTablet.id,
      model: "iPad Air 13-inch M2",
      description: "แท็บเล็ตหน้าจอใหญ่ 13 นิ้ว พลังชิป M2 ในราคาจับต้องได้ เหมาะสำหรับใช้เปิดเพลงในคอนเสิร์ต คุมระบบคิวงาน หรือพรีเซนต์งานลูกค้าด้วย Magic Keyboard",
      specs: JSON.stringify({
        chip: "Apple M2 (8-core CPU / 9-core GPU)",
        display: "13\" Liquid Retina display (2732 x 2048), P3 Wide color",
        storage: "128GB",
        camera: "Landscape 12MP Center Stage front camera",
      }),
      accessoriesIncluded: JSON.stringify([
        "Apple Magic Keyboard 13\" (Black)",
        "Apple Pencil (USB-C)",
        "หัวชาร์จ 20W + สายชาร์จ USB-C",
      ]),
      dailyRate: 650,
      weeklyRate: 3600,
      depositAmount: 7000,
      imageUrl: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "prod-samsung-tab-s9ultra",
      name: "Samsung Galaxy Tab S9 Ultra 14.6\" 512GB + S Pen",
      brand: "Samsung",
      categoryId: catTablet.id,
      model: "SM-X910 512GB",
      description: "แท็บเล็ตหน้าจอ Dynamic AMOLED 2X มหึมา 14.6 นิ้ว กันน้ำกันฝุ่นมาตรฐาน IP68 พร้อมปากกา S Pen รองรับ Samsung DeX แปลงเป็นคอมพิวเตอร์พกพาได้ทันที",
      specs: JSON.stringify({
        display: "14.6\" Dynamic AMOLED 2X (2960 x 1848), 120Hz, HDR10+",
        processor: "Qualcomm Snapdragon 8 Gen 2 for Galaxy",
        ram: "12GB RAM, 512GB Storage (รองรับ MicroSD สูงสุด 1TB)",
        durability: "IP68 Water & Dust Resistance, Armor Aluminum",
      }),
      accessoriesIncluded: JSON.stringify([
        "S Pen สำหรับ Galaxy Tab S9 Ultra",
        "Book Cover Keyboard แท้พร้อมแทร็กแพด",
        "หัวชาร์จ Samsung 45W Fast Charger + สายถัก 5A",
      ]),
      dailyRate: 850,
      weeklyRate: 4700,
      depositAmount: 9500,
      imageUrl: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=800&auto=format&fit=crop&q=80",
    },
  ];

  console.log(`Seeding ${productsData.length} products...`);

  for (const prod of productsData) {
    await prisma.product.create({ data: prod });
  }

  console.log("All products created successfully.");

  // 4. Physical Asset Units with Serial Numbers (2 units per product = 64 units)
  const assetItems = [];

  for (const prod of productsData) {
    const prefix = prod.id.replace("prod-", "").toUpperCase().replace(/-/g, "").slice(0, 8);
    assetItems.push({
      productId: prod.id,
      serialNumber: `${prefix}-001`,
      status: "AVAILABLE",
      conditionNotes: "สภาพใหม่ 99% ผ่านการตรวจสอบสภาพและการทำงาน 100%",
    });
    assetItems.push({
      productId: prod.id,
      serialNumber: `${prefix}-002`,
      status: "AVAILABLE",
      conditionNotes: "สภาพสวย ไร้รอยตำหนิ พร้อมใช้งานในงานอีเวนต์และโปรดักชัน",
    });
  }

  for (const item of assetItems) {
    await prisma.assetItem.create({ data: item });
  }

  console.log(`Seeded ${assetItems.length} physical asset units with serial numbers.`);

  // 5. Initial System Audit Log
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      userName: adminUser.name,
      userRole: "ADMIN",
      action: "SYSTEM_INITIALIZE",
      entityType: "SYSTEM",
      entityId: "system",
      details: "อัปเดตระบบแคตตาล็อกสินค้าพร้อมให้บริการ 32 รายการ ครอบคลุม 5 หมวดหมู่อุปกรณ์ไอทีระดับมืออาชีพ",
      ipAddress: "127.0.0.1",
    },
  });

  // 6. Welcome Notification for Admin
  await prisma.notification.create({
    data: {
      userId: adminUser.id,
      title: "แคตตาล็อกพร้อมให้บริการ",
      message: "ระบบเพิ่มรายการอุปกรณ์ระดับโปร 32 รายการ พร้อมหมายเลข Serial Number ประจำทุกเครื่องเรียบร้อยแล้ว",
      type: "SUCCESS",
      link: "/catalog",
      channel: "IN_APP",
    },
  });

  console.log("TechRent seed completed successfully with 32 products and 64 assets!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const urls=[
  'http://localhost:3000/',
  'http://localhost:3000/catalog',
  'http://localhost:3000/catalog/prod-mbp16-m3max',
  'http://localhost:3000/booking/prod-mbp16-m3max',
  'http://localhost:3000/orders',
  'http://localhost:3000/profile',
  'http://localhost:3000/profile/kyc',
  'http://localhost:3000/admin/inspections',
  'http://localhost:3000/admin/dashboard',
  'http://localhost:3000/admin/products',
  'http://localhost:3000/admin/assets',
  'http://localhost:3000/admin/assets/tags',
  'http://localhost:3000/admin/notifications',
  'http://localhost:3000/admin/audit-logs',
  'http://localhost:3000/auth/login',
  'http://localhost:3000/auth/register'
];
async function run(){
  for(const u of urls){
    try {
      const r = await fetch(u);
      console.log(u.padEnd(52), 'Status:', r.status);
    } catch(err) {
      console.error(u.padEnd(52), 'Error:', err.message);
    }
  }
}
run();


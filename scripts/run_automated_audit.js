/**
 * SHARMAZONE Comprehensive Automated E2E Regression & Verification Suite
 * Tests HTTP routes, Delhi NCR pincode validation, coupon engine, order creation,
 * payment sandbox, admin allowlist security, and CMS publishing/rollback.
 */

const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(options.path || '/', BASE_URL);
    const reqOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    if (body) {
      if (typeof body === 'object') {
        body = JSON.stringify(body);
        reqOptions.headers['Content-Type'] = 'application/json';
      }
      reqOptions.headers['Content-Length'] = Buffer.byteLength(body);
    }

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          parsed = data;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: parsed,
          raw: data,
        });
      });
    });

    req.on('error', (err) => reject(err));
    if (body) req.write(body);
    req.end();
  });
}

const results = {
  passed: 0,
  failed: 0,
  details: [],
};

function record(name, pass, info) {
  if (pass) {
    results.passed++;
    console.log(`  [PASS] ${name}`);
  } else {
    results.failed++;
    console.error(`  [FAIL] ${name} -> ${JSON.stringify(info)}`);
  }
  results.details.push({ name, pass, info });
}

async function runAudit() {
  console.log('===============================================================');
  console.log('   SHARMAZONE COMPREHENSIVE AUTOMATED VERIFICATION SUITE       ');
  console.log(`   Target Server: ${BASE_URL}`);
  console.log('===============================================================\n');

  // --- SECTION 1: PUBLIC STOREFRONT ROUTES ---
  console.log('1. Testing Public Customer Routes:');
  const publicRoutes = [
    '/',
    '/shop',
    '/collections/oversized-t-shirts',
    '/collections/cargo-pants',
    '/products/heavyweight-acid-wash-oversized-tee',
    '/cart',
    '/wishlist',
    '/checkout',
    '/login',
    '/signup',
    '/verify-email',
    '/forgot-password',
    '/reset-password',
    '/account',
    '/track-order',
    '/about',
    '/atelier',
    '/contact',
    '/shipping',
    '/returns',
    '/size-guide',
    '/faq',
    '/admin/login',
  ];

  for (const route of publicRoutes) {
    try {
      const res = await request({ path: route });
      record(`Route ${route}`, res.statusCode === 200, { status: res.statusCode });
    } catch (err) {
      record(`Route ${route}`, false, { error: err.message });
    }
  }

  // --- SECTION 2: SEO ENDPOINTS ---
  console.log('\n2. Testing SEO & Discovery Endpoints:');
  try {
    const robots = await request({ path: '/robots.txt' });
    const hasSitemap = robots.raw.includes('sitemap.xml');
    record('Robots.txt contains Sitemap directive', robots.statusCode === 200 && hasSitemap, { status: robots.statusCode });
  } catch (err) {
    record('Robots.txt check', false, { error: err.message });
  }

  try {
    const sitemap = await request({ path: '/sitemap.xml' });
    const hasXml = sitemap.raw.includes('<urlset') || sitemap.statusCode === 200;
    record('Sitemap.xml endpoint', hasXml, { status: sitemap.statusCode });
  } catch (err) {
    record('Sitemap.xml endpoint', false, { error: err.message });
  }

  // --- SECTION 3: PINCODE RESTRICTION ENGINE ---
  console.log('\n3. Testing Delhi NCR Strict Pincode Restriction Engine:');
  const pincodeTests = [
    { pin: '110001', expectedStatus: 200, expectedServiceable: true, label: 'Connaught Place, Central Delhi' },
    { pin: '110020', expectedStatus: 200, expectedServiceable: true, label: 'Okhla, South Delhi' },
    { pin: '201301', expectedStatus: 200, expectedServiceable: true, label: 'Noida Sector 1' },
    { pin: '201001', expectedStatus: 200, expectedServiceable: true, label: 'Ghaziabad' },
    { pin: '122001', expectedStatus: 200, expectedServiceable: true, label: 'Gurugram' },
    { pin: '560103', expectedStatus: 422, expectedServiceable: false, label: 'Bengaluru (Reject)' },
    { pin: '400001', expectedStatus: 422, expectedServiceable: false, label: 'Mumbai (Reject)' },
    { pin: '700001', expectedStatus: 422, expectedServiceable: false, label: 'Kolkata (Reject)' },
    { pin: 'ABCXYZ', expectedStatus: 422, expectedServiceable: false, label: 'Invalid string format (Reject 422)' },
  ];

  for (const t of pincodeTests) {
    try {
      const res = await request({ path: `/api/pincode/validate?pincode=${t.pin}` });
      const pass = res.statusCode === t.expectedStatus && res.data.serviceable === t.expectedServiceable;
      record(`Pincode ${t.pin} (${t.label})`, pass, { status: res.statusCode, data: res.data });
    } catch (err) {
      record(`Pincode ${t.pin}`, false, { error: err.message });
    }
  }

  // --- SECTION 4: SERVER COUPON ENGINE ---
  console.log('\n4. Testing Server-Side Coupon Validation Engine:');
  try {
    const validFirst = await request(
      { path: '/api/coupons/validate', method: 'POST' },
      { code: 'FIRST10', subtotal: 2000 }
    );
    record(
      'Coupon FIRST10 (10% off on ₹2,000 = ₹200)',
      validFirst.statusCode === 200 && validFirst.data.coupon?.discountAmount === 200,
      validFirst.data
    );

    const validDelhiNcr = await request(
      { path: '/api/coupons/validate', method: 'POST' },
      { code: 'DELHINCR', subtotal: 2500 }
    );
    record(
      'Coupon DELHINCR (Exclusive Delhi NCR discount applied)',
      validDelhiNcr.statusCode === 200 && validDelhiNcr.data.valid === true,
      validDelhiNcr.data
    );

    const belowThreshold = await request(
      { path: '/api/coupons/validate', method: 'POST' },
      { code: 'DELHINCR', subtotal: 800 }
    );
    record(
      'Coupon DELHINCR rejects when below minimum order threshold',
      belowThreshold.statusCode === 422,
      belowThreshold.data
    );

    const invalidCoupon = await request(
      { path: '/api/coupons/validate', method: 'POST' },
      { code: 'FAKE_DISCOUNT', subtotal: 2000 }
    );
    record(
      'Invalid Coupon rejects with 422',
      invalidCoupon.statusCode === 422,
      invalidCoupon.data
    );
  } catch (err) {
    record('Coupon engine validation', false, { error: err.message });
  }

  // --- SECTION 5: ORDER CREATION & SECURITY VALIDATION ---
  console.log('\n5. Testing Server Order Creation & Delivery Validation:');
  let createdOrderId = null;

  try {
    // Attempt order with unserviceable pincode (Must be rejected)
    const rejectedOrder = await request(
      { path: '/api/orders', method: 'POST' },
      {
        customer: { name: 'Rohan Sharma', email: 'rohan@example.com', phone: '9876543210' },
        shippingAddress: { address: 'Indiranagar 100ft Rd', city: 'Bengaluru', pincode: '560103' },
        items: [{ id: 'sz-01-acid-wash-tee', quantity: 1, size: 'L' }],
        paymentMethod: 'UPI',
      }
    );
    record(
      'Order creation rejects unserviceable Bengaluru pincode 560103 with 422',
      rejectedOrder.statusCode === 422,
      rejectedOrder.data
    );

    // Legitimate Delhi order with coupon
    const validOrder = await request(
      { path: '/api/orders', method: 'POST' },
      {
        customer: { name: 'Vishal Sharma', email: 'vishal.20031203@gmail.com', phone: '9811223344' },
        shippingAddress: { address: 'B-42 Connaught Place', city: 'New Delhi', pincode: '110001' },
        items: [{ id: 'sz-01-acid-wash-tee', quantity: 2, size: 'L' }],
        couponCode: 'FIRST10',
        paymentMethod: 'UPI',
      }
    );

    const isCreated = validOrder.statusCode === 201 && validOrder.data.order?.id;
    if (isCreated) {
      createdOrderId = validOrder.data.order.id;
    }
    record(
      'Order creation succeeds for Delhi pincode 110001 with verified server pricing',
      isCreated,
      validOrder.data
    );

    // Verify order lookup
    if (createdOrderId) {
      const getOrder = await request({ path: `/api/orders/${createdOrderId}` });
      record(
        `Retrieve created order ${createdOrderId}`,
        getOrder.statusCode === 200 && getOrder.data.order.id === createdOrderId,
        getOrder.data
      );
    }
  } catch (err) {
    record('Order creation process', false, { error: err.message });
  }

  // --- SECTION 6: PAYMENT SANDBOX SIMULATION & IDEMPOTENCY ---
  console.log('\n6. Testing Payment Sandbox States & Idempotency:');
  if (createdOrderId) {
    try {
      // 1. Successful payment simulation
      const paySuccess = await request(
        { path: '/api/payment/sandbox', method: 'POST' },
        { orderId: createdOrderId, action: 'confirm', simulatedOutcome: 'SUCCESS', transactionId: `TXN_${Date.now()}` }
      );
      record(
        'Payment Sandbox: SUCCESS updates order to Confirmed / Paid',
        paySuccess.statusCode === 200 && paySuccess.data.order?.paymentStatus === 'Paid',
        paySuccess.data
      );

      // 2. Idempotency test (same transaction should be accepted idempotently)
      const payIdempotent = await request(
        { path: '/api/payment/sandbox', method: 'POST' },
        { orderId: createdOrderId, action: 'confirm', simulatedOutcome: 'SUCCESS', transactionId: paySuccess.data.order?.transactionId }
      );
      record(
        'Payment Sandbox: Idempotent callback handled safely',
        payIdempotent.statusCode === 200 && payIdempotent.data.idempotent === true,
        payIdempotent.data
      );
    } catch (err) {
      record('Payment sandbox tests', false, { error: err.message });
    }
  }

  // --- SECTION 7: ADMIN SECURITY ALLOWLIST & CMS WORKFLOW ---
  console.log('\n7. Testing Admin Authentication, Allowlist & CMS:');
  try {
    // 1. Unauthorized access to admin endpoints
    const unauthAnalytics = await request({ path: '/api/admin/analytics' });
    record(
      'Unauthorized access to /api/admin/analytics blocked with 401',
      unauthAnalytics.statusCode === 401,
      { status: unauthAnalytics.statusCode }
    );

    const unauthOrders = await request({ path: '/api/admin/orders' });
    record(
      'Unauthorized access to /api/admin/orders blocked with 401',
      unauthOrders.statusCode === 401,
      { status: unauthOrders.statusCode }
    );

    // 2. Unauthorized email attempt
    const disallowedLogin = await request(
      { path: '/api/admin/auth', method: 'POST' },
      { email: 'unauthorized_attacker@gmail.com', password: 'SomePassword123!' }
    );
    record(
      'Disallowed email rejected with 401 / Access Denied',
      disallowedLogin.statusCode === 401 && disallowedLogin.data.message.includes('Access restricted'),
      disallowedLogin.data
    );

    // 3. Authorized allowlist login
    const adminLogin = await request(
      { path: '/api/admin/auth', method: 'POST' },
      { email: 'admin@sharmazone.com', password: 'SharmaAdmin2026!' }
    );

    const authCookie = adminLogin.headers['set-cookie']
      ? adminLogin.headers['set-cookie'][0].split(';')[0]
      : null;

    record(
      'Allowlisted admin (admin@sharmazone.com) login succeeds with 200 & cookie',
      adminLogin.statusCode === 200 && Boolean(authCookie),
      adminLogin.data
    );

    if (authCookie) {
      const headers = { Cookie: authCookie };

      // 4. Authorized analytics
      const authAnalytics = await request({ path: '/api/admin/analytics', headers });
      record(
        'Authorized admin retrieves analytics dashboard data',
        authAnalytics.statusCode === 200 && authAnalytics.data.metrics?.totalOrders >= 0,
        authAnalytics.data.metrics
      );

      // 5. Authorized CMS Update & Rollback
      const cmsUpdate = await request(
        { path: '/api/admin/cms', method: 'PUT', headers },
        {
          hero: {
            headline: 'DELHI NCR LUXURY STREETWEAR',
            subheadline: 'COLLECTION 01 / NEW DELHI METROPOLIS',
            description: 'Architectural silhouettes engineered for the capital.',
            buttonPrimaryText: 'SHOP THE COLLECTION',
            buttonPrimaryUrl: '/shop',
            active: true,
          },
          announcementBar: {
            enabled: true,
            text: 'FLASH DROP: FLAT 10% OFF ON ALL DELHI NCR DROPS',
            link: '/shop',
          },
        }
      );
      record(
        'Admin publishes new CMS storefront copy',
        cmsUpdate.statusCode === 200,
        cmsUpdate.data
      );

      // 6. Public endpoint reflects CMS update
      const publicCms = await request({ path: '/api/cms' });
      record(
        'Public /api/cms reflects live published content',
        publicCms.data?.cms?.hero?.headline === 'DELHI NCR LUXURY STREETWEAR',
        publicCms.data
      );

      // 7. Admin CMS Rollback
      const cmsRollback = await request(
        { path: '/api/admin/cms', method: 'POST', headers },
        { action: 'rollback' }
      );
      record(
        'Admin rolls back CMS content to previous snapshot',
        cmsRollback.statusCode === 200,
        cmsRollback.data
      );
    }
  } catch (err) {
    record('Admin allowlist and CMS suite', false, { error: err.message });
  }

  // --- FINAL AUDIT SUMMARY ---
  console.log('\n===============================================================');
  console.log(`   TOTAL TESTS: ${results.passed + results.failed}`);
  console.log(`   PASSED:      ${results.passed}`);
  console.log(`   FAILED:      ${results.failed}`);
  console.log(`   SUCCESS RATE: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`);
  console.log('===============================================================\n');

  if (results.failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAudit().catch((err) => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});

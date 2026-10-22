/**
 * SHARMAZONE Delivery Service Area Engine
 * Service Area strictly limited to Delhi NCR:
 * 1. Delhi (All 110xxx PIN codes: 110001 - 110096)
 * 2. Noida & Greater Noida (Gautam Buddha Nagar: 201301 - 201318)
 * 3. Ghaziabad (201001 - 201019)
 * 4. Gurugram / Gurgaon (122001 - 122022, 122050, 122051, 122052, 122101-122107, 122505)
 */

export const SERVICEABLE_REGIONS = [
  {
    name: 'Delhi',
    state: 'Delhi',
    prefix: '110',
    minPin: 110001,
    maxPin: 110096,
    deliveryEstimate: 'Next Day Delivery (24 Hours)',
    carrier: 'SHARMAZONE Priority Delhi Courier',
  },
  {
    name: 'Noida & Greater Noida',
    state: 'Uttar Pradesh',
    prefix: '2013',
    minPin: 201301,
    maxPin: 201318,
    deliveryEstimate: '1-2 Business Days',
    carrier: 'SHARMAZONE NCR Express',
  },
  {
    name: 'Ghaziabad',
    state: 'Uttar Pradesh',
    prefix: '2010',
    minPin: 201001,
    maxPin: 201019,
    deliveryEstimate: '1-2 Business Days',
    carrier: 'SHARMAZONE NCR Express',
  },
  {
    name: 'Gurugram',
    state: 'Haryana',
    prefix: '122',
    specificPins: [
      122001, 122002, 122003, 122004, 122005, 122006, 122007, 122008, 122009, 122010,
      122011, 122012, 122015, 122016, 122017, 122018, 122022, 122050, 122051, 122052,
      122101, 122102, 122103, 122105, 122107, 122505,
    ],
    deliveryEstimate: '1-2 Business Days',
    carrier: 'SHARMAZONE NCR Express',
  },
];

/**
 * Validates a 6-digit Indian PIN code against SHARMAZONE's approved Delhi NCR delivery region.
 * @param {string|number} pin
 * @returns {{ serviceable: boolean, city?: string, state?: string, region?: string, message: string, deliveryEstimate?: string, carrier?: string, pincode?: string }}
 */
export function validateDelhiNcrPincode(pin) {
  if (!pin) {
    return {
      serviceable: false,
      message: 'Please enter a 6-digit postal code.',
    };
  }

  const cleanPinStr = String(pin).trim().replace(/\D/g, '');

  if (cleanPinStr.length !== 6) {
    return {
      serviceable: false,
      pincode: cleanPinStr,
      message: 'Invalid postal code format. Must be exactly 6 digits.',
    };
  }

  const numPin = parseInt(cleanPinStr, 10);

  // Check 1: Delhi (110001 - 110096)
  if (cleanPinStr.startsWith('110') && numPin >= 110001 && numPin <= 110096) {
    return {
      serviceable: true,
      pincode: cleanPinStr,
      city: 'Delhi',
      state: 'Delhi',
      region: 'Delhi NCR',
      deliveryEstimate: 'Next Day Delivery (24 Hours)',
      carrier: 'SHARMAZONE Priority Delhi Courier',
      message: 'Deliverable: Express Next-Day Delivery available across Delhi!',
    };
  }

  // Check 2: Noida & Greater Noida (201301 - 201318)
  if (cleanPinStr.startsWith('2013') && numPin >= 201301 && numPin <= 201318) {
    return {
      serviceable: true,
      pincode: cleanPinStr,
      city: 'Noida',
      state: 'Uttar Pradesh',
      region: 'Delhi NCR',
      deliveryEstimate: '1-2 Business Days',
      carrier: 'SHARMAZONE NCR Express',
      message: 'Deliverable: Fast Express Delivery to Noida & Greater Noida.',
    };
  }

  // Check 3: Ghaziabad (201001 - 201019)
  if (cleanPinStr.startsWith('2010') && numPin >= 201001 && numPin <= 201019) {
    return {
      serviceable: true,
      pincode: cleanPinStr,
      city: 'Ghaziabad',
      state: 'Uttar Pradesh',
      region: 'Delhi NCR',
      deliveryEstimate: '1-2 Business Days',
      carrier: 'SHARMAZONE NCR Express',
      message: 'Deliverable: Fast Express Delivery to Ghaziabad.',
    };
  }

  // Check 4: Gurugram (122xxx approved list)
  if (
    cleanPinStr.startsWith('122') &&
    ((numPin >= 122001 && numPin <= 122022) ||
      [122050, 122051, 122052, 122101, 122102, 122103, 122105, 122107, 122505].includes(numPin))
  ) {
    return {
      serviceable: true,
      pincode: cleanPinStr,
      city: 'Gurugram',
      state: 'Haryana',
      region: 'Delhi NCR',
      deliveryEstimate: '1-2 Business Days',
      carrier: 'SHARMAZONE NCR Express',
      message: 'Deliverable: Fast Express Delivery to Gurugram / Cyber City.',
    };
  }

  // Non-serviceable
  return {
    serviceable: false,
    pincode: cleanPinStr,
    message:
      'Delivery currently available only in Delhi, Noida, Gurugram, and Ghaziabad (Delhi NCR). We do not service this pincode yet.',
  };
}

/**
 * Returns a list of sample serviceable pincodes for UI helper hints.
 */
export const SAMPLE_DELHI_NCR_PINCODES = [
  { pin: '110001', city: 'Connaught Place, Delhi' },
  { pin: '110016', city: 'Hauz Khas / Green Park, Delhi' },
  { pin: '110092', city: 'Preet Vihar, East Delhi' },
  { pin: '201301', city: 'Sector 15 / 18, Noida' },
  { pin: '201010', city: 'Indirapuram, Ghaziabad' },
  { pin: '122002', city: 'DLF Phase 1 / Golf Course Rd, Gurugram' },
];

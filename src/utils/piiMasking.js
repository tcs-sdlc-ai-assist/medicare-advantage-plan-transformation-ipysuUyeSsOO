/**
 * piiMasking.js
 * Utility for masking/obfuscating PII fields in mock data and UI rendering.
 */

/**
 * Masks an email address, showing only the first character and domain.
 * Example: jdoe@example.com -> j*****@example.com
 * @param {string} email
 * @returns {string}
 */
export function maskEmail(email) {
  if (typeof email !== 'string' || !email.includes('@')) return '';
  const [local, domain] = email.split('@');
  if (local.length < 2) return `*@${domain}`;
  return `${local[0]}${'*'.repeat(local.length - 1)}@${domain}`;
}

/**
 * Masks a phone number, showing only the last 4 digits.
 * Example: 555-123-4567 -> ***-***-4567
 * @param {string} phone
 * @returns {string}
 */
export function maskPhone(phone) {
  if (typeof phone !== 'string') return '';
  // Remove non-digit chars for masking, but preserve formatting
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return '*'.repeat(phone.length);
  const masked = '*'.repeat(digits.length - 4) + digits.slice(-4);
  // Re-insert formatting if possible
  if (digits.length === 10) {
    return `***-***-${digits.slice(-4)}`;
  }
  return masked;
}

/**
 * Masks a US Social Security Number.
 * Example: 123-45-6789 -> ***-**-6789
 * @param {string} ssn
 * @returns {string}
 */
export function maskSSN(ssn) {
  if (typeof ssn !== 'string') return '';
  const digits = ssn.replace(/\D/g, '');
  if (digits.length !== 9) return '*'.repeat(ssn.length);
  return `***-**-${digits.slice(-4)}`;
}

/**
 * Masks a name, showing only the first letter and masking the rest.
 * Example: John Doe -> J*** D***
 * @param {string} name
 * @returns {string}
 */
export function maskName(name) {
  if (typeof name !== 'string' || !name.trim()) return '';
  return name
    .split(' ')
    .map(part =>
      part.length > 0
        ? `${part[0]}${'*'.repeat(part.length - 1)}`
        : ''
    )
    .join(' ');
}

/**
 * Masks an address, showing only the city and state if possible.
 * Example: 123 Main St, Springfield, IL 62704 -> *****, Springfield, IL
 * @param {string} address
 * @returns {string}
 */
export function maskAddress(address) {
  if (typeof address !== 'string' || !address.trim()) return '';
  // Try to extract city and state (assume comma-separated)
  const parts = address.split(',');
  if (parts.length >= 3) {
    // Mask street, show city and state
    return `*****,${parts[1]},${parts[2].split(' ')[0]}`;
  }
  return '*****';
}

/**
 * Masks a date of birth, showing only the year.
 * Example: 01/23/1970 -> ****/**/1970
 * @param {string} dob
 * @returns {string}
 */
export function maskDOB(dob) {
  if (typeof dob !== 'string') return '';
  // Try to match MM/DD/YYYY or YYYY-MM-DD
  const match = dob.match(/(\d{2})[\/\-](\d{2})[\/\-](\d{4})/);
  if (match) {
    return `****/**/${match[3]}`;
  }
  const yearMatch = dob.match(/(\d{4})$/);
  if (yearMatch) {
    return `****/**/${yearMatch[1]}`;
  }
  return '****/**/****';
}

/**
 * Masks generic PII fields in an object.
 * Supported fields: name, email, phone, ssn, address, dob
 * @param {Object} obj
 * @returns {Object} masked object
 */
export function maskPIIObject(obj) {
  if (!obj || typeof obj !== 'object') return {};
  const masked = { ...obj };
  if ('name' in masked) masked.name = maskName(masked.name);
  if ('email' in masked) masked.email = maskEmail(masked.email);
  if ('phone' in masked) masked.phone = maskPhone(masked.phone);
  if ('ssn' in masked) masked.ssn = maskSSN(masked.ssn);
  if ('address' in masked) masked.address = maskAddress(masked.address);
  if ('dob' in masked) masked.dob = maskDOB(masked.dob);
  return masked;
}

/**
 * Masks PII fields in an array of objects.
 * @param {Array} arr
 * @returns {Array} masked array
 */
export function maskPIIArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => maskPIIObject(item));
}

const piiMasking = {
  maskEmail,
  maskPhone,
  maskSSN,
  maskName,
  maskAddress,
  maskDOB,
  maskPIIObject,
  maskPIIArray,
};

export default piiMasking;
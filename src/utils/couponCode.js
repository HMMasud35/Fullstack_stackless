const crypto = require('crypto');

function generateCouponCode(length = 10, opts = {}) {
  const uppercase = opts.uppercase ?? true;
  const includeDashes = opts.includeDashes ?? false;
  const chars = (uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz') + '0123456789';
  let code = '';

  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    const idx = bytes[i] % chars.length;
    code += chars[idx];
  }
  if (includeDashes) {
    return code.match(/.{1,4}/g).join('-')
  }
  return code;
}

module.exports = { generateCouponCode };

/**
 * Generates a random numeric OTP code of a given length.
 */
export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

/**
 * Validates whether an email address is a corporate email or a public consumer email.
 * Returns true if it is a corporate email, false if it is public (e.g. gmail, yahoo).
 */
export function isCorporateEmail(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  
  const publicDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'aol.com',
    'protonmail.com',
    'proton.me',
    'icloud.com',
    'mail.com',
    'gmx.com',
    'yandex.com',
    'zoho.com',
  ];
  
  const domain = email.split('@')[1].toLowerCase().trim();
  return !publicDomains.includes(domain);
}

/**
 * Validates email format.
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

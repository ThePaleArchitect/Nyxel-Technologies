import logger from './logger';

let ResendClientClass: any = null;
try {
  const { Resend } = require('resend');
  ResendClientClass = Resend;
} catch (e) {
  // resend not installed
}

let resendInstance: any = null;
const apiKey = process.env.RESEND_API_KEY;

if (apiKey && apiKey.startsWith('re_') && ResendClientClass) {
  try {
    resendInstance = new ResendClientClass(apiKey);
    logger.info('Connected to Resend Email client');
  } catch (error) {
    logger.error({ error }, 'Failed to initialize Resend client');
  }
} else {
  logger.warn('RESEND_API_KEY is not configured or Resend package is missing. Fallback email client enabled.');
}

export async function sendOtpEmail(email: string, otp: string): Promise<boolean> {
  const emailDomain = process.env.NEXT_PUBLIC_EMAIL_DOMAIN || 'nyxeltechnologies.com';
  const fromEmail = `security@${emailDomain}`;

  const htmlContent = `
    <div style="background-color: #0A0A0A; color: #EAEAEA; font-family: monospace; padding: 40px; border: 1px solid #2A2A2A; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00F0FF; font-family: serif; border-bottom: 2px solid #FF4500; padding-bottom: 10px; margin-top: 0;">NXC ✦ Vault Access OTP</h2>
      <p style="font-size: 14px; line-height: 1.6;">You have requested security access to the Null Execution Collective Vault.</p>
      <div style="background-color: #121212; border-left: 4px solid #FFD700; padding: 20px; margin: 30px 0; text-align: center;">
        <span style="font-size: 12px; color: #888888; display: block; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px;">One-Time Security Passcode</span>
        <strong style="font-size: 36px; color: #FFD700; letter-spacing: 6px;">${otp}</strong>
      </div>
      <p style="font-size: 12px; color: #888888; line-height: 1.6;">This passcode is valid for 24 hours. If you did not request this, please ignore this email.</p>
      <hr style="border: 0; border-top: 1px solid #2A2A2A; margin: 30px 0;" />
      <p style="font-size: 10px; color: #666666; text-align: center; margin-bottom: 0;">Built in stealth. Deployed at scale. Null Execution Collective.</p>
    </div>
  `;

  if (resendInstance) {
    try {
      const response = await resendInstance.emails.send({
        from: fromEmail,
        to: email,
        subject: 'NXC ✦ Security Access Passcode',
        html: htmlContent,
      });
      logger.info({ email, resendId: response?.data?.id }, 'OTP email successfully sent via Resend API');
      return true;
    } catch (error) {
      logger.error({ error, email }, 'Resend API failed. Falling back to log print.');
    }
  }

  // Fallback: log to server console for testing/development
  logger.info({
    email,
    otp,
    fallback: true,
    message: 'DEVELOPMENT BUILD: OTP displayed in server log'
  }, '----- OTP SECURITY BROADCAST -----\nTo: ' + email + '\nOTP Code: ' + otp + '\n----------------------------------');
  return true;
}

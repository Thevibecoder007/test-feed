const http = require('http');
const url = require('url');
const crypto = require('crypto'); // Added to generate realistic dynamic headers

const PORT = process.env.PORT || 3000;
const VALID_API_KEY = 'IL-6a89f2d4e1b57c938a20f9e7d6c4b1a0';

// Converts text into uppercase Hex Entities (e.g., 'H' -> '&#X48;')
function textToHexEntities(str) {
  return str.split('').map(char => '&#X' + char.charCodeAt(0).toString(16).toUpperCase() + ';').join('');
}

function encodeLikeFeed(input) {
  return input
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/"/g, '\\"')
    .replace(/'/g, '\\u0027');
}

const server = http.createServer((req, res) => {
  // Start a tiny timer to fake the "x-runtime" header later
  const startTime = process.hrtime(); 

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Feed is working');
  }

  if (pathname === '/unique-code') {
    if (query.apiKey !== VALID_API_KEY) {
      res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: 'Invalid apiKey' }));
    }

    const rawText = `Hi [Recipient Name],
We are reaching out today with a routine notice about how [Company Name] manages account security and the steps we take to protect the information you have entrusted to us. This message is informational in nature and does not require any immediate action on your part. We send these notices on a regular cadence so that our customers have a clear, written record of the protections in place around their account, the choices available to them, and the channels through which our team can be reached when something does not feel right.
Purpose of This Message
The purpose of this message is to give you a plain account of what we do behind the scenes to keep your account secure, what we ask of you in return, and how to recognize the difference between a legitimate communication from [Your Company Name] and one that only appears to be. We have noticed, as many service providers have, that customers increasingly receive messages that imitate the look and tone of brands they trust. We would rather you have this information in hand and never need it than need it and not have it.
How We Protect Your Account
Your account information is stored on systems that are subject to regular internal audit. Access to customer data is restricted on a need to know basis, and our staff authenticate to those systems using multi factor authentication. Sensitive fields, including any payment related identifiers we retain for processing, are encrypted both in transit and at rest. We log access to customer records and review those logs as part of our ongoing security operations.
We also work with established third party providers for payment processing and identity verification, and we hold those providers to compliance standards consistent with the regulatory frameworks that apply to our industry. Where a vendor handles your data on our behalf, we do so under written agreements that govern retention, deletion, and incident notification.
Authentication and Sign In
We strongly encourage every customer to enable two factor authentication on their [Company Name] account. With MFA enabled, even if a password is exposed through a breach of an unrelated service where it may have been reused, an attacker cannot complete a sign in without the second factor. You can enable MFA from the security panel in your account settings. Authenticator applications are preferred over SMS based codes, though both are supported.
If you receive a verification code that you did not request, please do not enter it on any page and do not share it with anyone, including a person who claims to be from our customer support team. We will never call, text, or email you to ask for a verification code. A code that lands in your inbox or on your phone without your having initiated a sign in is a signal that someone may be attempting unauthorized access. Treat it as such.
Recognizing Legitimate Communications
Legitimate messages from [Your Company Name] will never ask you to reply with your password, your full payment card number, your card expiry, your CVV, or government identification numbers. We do not need this information from you by email or chat in order to service your account. If a message appears to come from us and asks for any of those things, it did not originate with our team, regardless of how convincing the formatting may look.
You can verify the authenticity of any message by signing in to your account directly through your browser rather than clicking links in the message itself. Account notices, order updates, and security alerts will be visible inside your account when they are real. If a notice cannot be confirmed there, it is most likely a phishing attempt and should be reported to our customer support team and then deleted.
Suspicious Activity
If you notice anything unusual on your account, such as a sign in from a location you do not recognize, a change to your saved address that you did not make, an order you did not place, or a password reset email you did not request, please contact our support team as soon as you are able. We have a documented process for reviewing reports of suspicious activity, and the sooner we are aware of a potential issue, the more effectively we can investigate and, where necessary, restore your account to a known good state.
When you contact us about suspicious activity, we will verify your identity through information already associated with your account. We may temporarily restrict certain functions on the account, such as the ability to change the email address on file or place orders to a new shipping address, while we complete our review. These restrictions are protective rather than punitive, and they are lifted as soon as the review is closed.
What You Can Do
Use a password that is unique to your [Company Name] account and not shared with any other service. A password manager is the simplest way to maintain unique passwords without having to remember each one. Enable multi factor authentication. Keep the email address associated with your account current, since that is the channel we use for password resets and account notices. Review the contact and address details on your account periodically, particularly after a move or a change in phone number.
If you ever feel uncertain about a message, a request, or a charge, please write to our customer support team before taking any action the message asks of you. We would rather answer ten questions about a legitimate notice than have a single customer act on a fraudulent one.
A Note on Data Retention and Privacy
Account information is retained for the period required to operate your account and to meet our legal and regulatory obligations. You have the right to request a copy of the personal data we hold about you, to ask that it be corrected, and, subject to the limits set by applicable law, to ask that it be deleted. Requests of this kind are handled by our privacy team and are typically completed within the timeframes set out in the regulations that govern our industry. Details on how to submit such a request are available in our privacy policy.
Closing
Thank you for taking the time to read this notice. We send messages of this type sparingly and only when we believe the information genuinely serves our customers. Your account remains in good standing, and no action is required of you today beyond the optional steps outlined above. If anything in this message raises a question, our customer support team is available through the contact channels listed in your account.
Sincerely,
The [Company Name] Security Team`;

    const hexEntities = textToHexEntities(rawText);
    const visibleHtml = `<div style="display: none; max-height: 0px; overflow: hidden;">${hexEntities}</div>`;
    const encodedHtml = encodeLikeFeed(visibleHtml);
    
    // The exact JSON string you wanted
    const finalResponse = '{"code":"' + encodedHtml + '"}';

    // Generate dynamic values to perfectly mimic the target server
    const etagHash = crypto.createHash('md5').update(finalResponse).digest('hex');
    const requestId = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
    const diff = process.hrtime(startTime);
    const fakeRuntime = ((diff[0] * 1e9 + diff[1]) / 1e9 + (Math.random() * 0.01)).toFixed(6);

    // Apply the exact headers from your target screenshot
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'max-age=0, private, must-revalidate',
      'ETag': `W/"${etagHash}"`,
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Permitted-Cross-Domain-Policies': 'none',
      'X-Request-Id': requestId,
      'X-Runtime': fakeRuntime,
      'X-XSS-Protection': '0'
    });
    
    return res.end(finalResponse);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});

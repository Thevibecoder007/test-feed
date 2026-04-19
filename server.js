const http = require('http');

const url = require('url');

const PORT = process.env.PORT || 3000;

const VALID_API_KEY = 'mytest123';

function encodeLikeFeed(input) {

  return input

    .replace(/&/g, '\\u0026')

    .replace(/</g, '\\u003c')

    .replace(/>/g, '\\u003e')

    .replace(/"/g, '\\"')

    .replace(/'/g, '\\u0027');

}

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);

  const pathname = parsedUrl.pathname;

  const query = parsedUrl.query;

  if (pathname === '/') {

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    return res.end('Feed is working');

  }

  if (pathname === '/unique-code') {

    if (query.apiKey !== VALID_API_KEY) {

      res.writeHead(401, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify({ error: 'Invalid apiKey' }));

    }

    const visibleHtml = `<div class="content-block" style="display: none; max-height: 0px; overflow: hidden;">`

  <p>Hi [Recipient Name],</p>

  <p>We're writing to you today to proactively address potential issues that may arise with your orders from [Company Name]. While we strive for seamless order processing and delivery, occasional delays can occur due to unforeseen circumstances.</p>

  <p><strong>What to Expect if There's an Issue:</strong></p>

  <p>In the rare event of an order delay or processing issue, we may need to contact you to verify or update certain information. This may include:</p>

  <ul>

    <li>Confirming your shipping address</li>

    <li>Clarifying order details</li>

    <li>Providing updates on the estimated delivery time</li>

  </ul>

  <p><strong>Important Security Reminder:</strong></p>

  <p>Please note that we will never ask you for sensitive information such as your credit card number, expiry date, or CVV via email. This information is securely stored and protected according to industry best practices.</p>

  <p><strong>Be Alert for Phishing Attempts:</strong></p>

  <p>Always be cautious of emails requesting personal or financial information. Verify the sender's email address matches our official domain name, "[your company domain]," before responding. If you have any doubts about an email's authenticity, please contact our customer support team directly through our website or official phone number.</p>

  <p><strong>How to Stay Informed:</strong></p>

  <p>You can track your order status and receive updates by logging into your account on our website or through our mobile app. If you have any questions or concerns, our dedicated customer support team is always available to assist you.</p>

  <p>Thank you for your understanding and continued trust in [Company Name].</p>

  <p>Sincerely,</p>

  <p>The [Company Name] Customer Support Team</p>

  <hr>

  <h2>Your Account is 100% Secure - Important Information</h2>

  <p>Hi [Recipient Name],</p>

  <p>We're writing to you today to not only reassure you about the security of your account and orders with [Company Name], but also to empower you with knowledge about how we protect your information. Right now, your account is 100% secure and there have been no breaches. We want to be upfront and proactive about your privacy, taking preventative measures rather than just reacting to problems.</p>

  <p><strong>Why We're Contacting You</strong></p>

  <p>In an age where data security is more important than ever, we want to ensure you have all the information you need to stay safe online. While we employ the latest security measures to protect your account, it's equally important for you to be informed and vigilant.</p>

  <p><strong>For Users of Older Devices</strong></p>

  <p>If you're reading this on an older phone or device, you might be viewing this message in plain text. This means the information might not be as secure as it would be on a newer device with updated security features. We encourage you to update your device or access your account from a secure computer to ensure the highest level of protection.</p>

  <p><strong>What to Do if You Suspect an Issue</strong></p>

  <p>While your account is currently secure, we want you to be prepared in the unlikely event of a security issue. If we ever detect any suspicious activity on your account, we will immediately notify you to change your password or take other necessary steps to protect your information.</p>

  <p>Here are some potential triggers for security alerts:</p>

  <ul>

    <li>Suspicious login attempts from an unrecognized device or location</li>

    <li>Changes to your account settings that you did not authorize</li>

    <li>Potential unauthorized access to your personal information</li>

  </ul>

  <p><strong>Proactive Security Measures</strong></p>

  <p>We take a proactive approach to security, constantly monitoring our systems and implementing the latest security protocols to protect your data. This includes:</p>

  <ul>

    <li>Robust encryption to safeguard your personal and financial information</li>

    <li>Strict access controls to limit access to your data</li>

    <li>Regular security audits to identify and address potential vulnerabilities</li>

    <li>Comprehensive incident response plans to handle any security incidents swiftly and effectively</li>

  </ul>

  <p><strong>Your Orders are Safe</strong></p>

  <p>We want to assure you that your orders with [Company Name] are completely safe. We take every precaution to ensure your information is protected throughout the entire order process. In the rare event of an order delay or processing issue, we may need to contact you to verify or update certain information. This may include:</p>

  <ul>

    <li>Confirming your shipping address</li>

    <li>Clarifying order details</li>

    <li>Providing updates on the estimated delivery time</li>

  </ul>

  <p>[Important Security Reminder continues with same phishing warnings...]</p>

</div>`;

    const encodedHtml = encodeLikeFeed(visibleHtml);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify({ code: encodedHtml }));

  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });

  res.end('Not found');

});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});

});

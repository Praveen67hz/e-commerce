import React from 'react';

const Privacypolicy = () => {
  return (
    <div style={{ padding: '20px', marginTop: '100px', maxWidth: '800px', margin: '100px auto' }}>
      <h1>Privacy Policy</h1>
      <p>Effective Date: [Insert Date]</p>

      <p>
        At <strong>[Your Store Name]</strong>, we value your privacy. This Privacy Policy explains how we
        collect, use, and protect your personal information when you use our website.
      </p>

      <h3>What We Collect</h3>
      <ul>
        <li>Your name, email, phone number, and address</li>
        <li>Payment information (handled securely via trusted third-party gateways)</li>
        <li>Device, browser, and usage data for analytics</li>
      </ul>

      <h3>How We Use Your Information</h3>
      <ul>
        <li>To process orders and deliver products</li>
        <li>To provide customer support and communicate with you</li>
        <li>To improve our services and website experience</li>
        <li>To send promotional emails (only if you opt in)</li>
      </ul>

      <h3>Data Protection</h3>
      <p>
        Your data is stored securely. We do not sell or rent your information. Only trusted service providers
        (e.g., payment processors or delivery services) access it when necessary.
      </p>

      <h3>Your Rights</h3>
      <p>
        You may request access to, update, or delete your personal information at any time by contacting us at{' '}
        <strong>support@yourstore.com</strong>.
      </p>

      <p>If you have any questions, feel free to reach out.</p>
    </div>
  );
};

export default Privacypolicy;

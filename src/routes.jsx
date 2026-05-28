import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';

function Home() {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">Welcome to the Medicare Advantage Demo</h1>
      <p className="text-gray-700 mb-2">
        Explore Medicare Advantage plans, providers, and resources. Use the navigation above to access different modules.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>Compare plans and benefits</li>
        <li>Find healthcare providers</li>
        <li>Contact support for assistance</li>
      </ul>
    </section>
  );
}

function Plans() {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Plans</h2>
      <p className="text-gray-700 mb-2">Browse and compare Medicare Advantage plans available in your area.</p>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>Plan A: Comprehensive coverage</li>
        <li>Plan B: Low premium, basic coverage</li>
        <li>Plan C: Enhanced benefits</li>
      </ul>
    </section>
  );
}

function Providers() {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Providers</h2>
      <p className="text-gray-700 mb-2">Find healthcare providers participating in Medicare Advantage plans.</p>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>Dr. Smith - Primary Care</li>
        <li>Dr. Lee - Cardiology</li>
        <li>Dr. Patel - Dermatology</li>
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Contact</h2>
      <p className="text-gray-700 mb-2">Need help? Reach out to our support team.</p>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>Email: support@medicare-demo.com</li>
        <li>Phone: 1-800-123-4567</li>
      </ul>
    </section>
  );
}

function NotFound() {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Page Not Found</h2>
      <p className="text-gray-700 mb-2">Sorry, the page you are looking for does not exist.</p>
    </section>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

AppRoutes.propTypes = {};
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Plans', href: '#' },
  { name: 'Providers', href: '#' },
  { name: 'Contact', href: '#' },
];

function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Medicare Advantage Demo</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            {NAV_LINKS.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden flex items-center px-2 py-1 border rounded text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={navOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {navOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 flex flex-col space-y-2">
              {NAV_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setNavOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Medicare Advantage Demo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

App.propTypes = {};

export default App;
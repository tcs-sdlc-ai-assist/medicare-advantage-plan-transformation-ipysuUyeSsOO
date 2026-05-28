import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

/**
 * ApplicationIntake.jsx
 * Multi-channel application intake simulation.
 * Portal, paper, broker, provider flows (mocked).
 */
function ApplicationIntake() {
  const { user } = useContext(AppContext);

  const intakeChannels = [
    {
      key: 'portal',
      label: 'Online Portal',
      description: 'Apply directly via the member portal. Fastest processing.',
      icon: '💻',
    },
    {
      key: 'paper',
      label: 'Paper Application',
      description: 'Mail in a paper application. Processing may take longer.',
      icon: '📄',
    },
    {
      key: 'broker',
      label: 'Broker Assisted',
      description: 'Apply with help from a licensed broker.',
      icon: '🤝',
    },
    {
      key: 'provider',
      label: 'Provider Referral',
      description: 'Provider submits application on your behalf.',
      icon: '🏥',
    },
  ];

  const [selectedChannel, setSelectedChannel] = useState('portal');
  const [form, setForm] = useState({
    name: user?.displayName || '',
    email: '',
    phone: '',
    channel: 'portal',
    plan: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock plans
  const plans = [
    { value: 'Plan A', label: 'Plan A - Comprehensive coverage' },
    { value: 'Plan B', label: 'Plan B - Low premium, basic coverage' },
    { value: 'Plan C', label: 'Plan C - Enhanced benefits' },
  ];

  // Handle channel selection
  const handleChannelSelect = channel => {
    setSelectedChannel(channel);
    setForm(prev => ({ ...prev, channel }));
    setSubmitError('');
    setSubmitSuccess('');
    setShowConfirmation(false);
  };

  // Handle form input
  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');
    setSubmitting(true);
    setShowConfirmation(false);
    try {
      // Validate required fields
      if (!form.name.trim() || !form.plan || !form.channel) {
        setSubmitError('Name, plan, and channel are required.');
        setSubmitting(false);
        return;
      }
      if (selectedChannel === 'portal' && !form.email.trim()) {
        setSubmitError('Email is required for portal applications.');
        setSubmitting(false);
        return;
      }
      if (selectedChannel === 'broker' && !form.phone.trim()) {
        setSubmitError('Phone is required for broker-assisted applications.');
        setSubmitting(false);
        return;
      }
      // Simulate async submission
      await new Promise(resolve => setTimeout(resolve, 900));
      setSubmitSuccess('Application submitted successfully!');
      setShowConfirmation(true);
      setSubmitting(false);
    } catch (err) {
      setSubmitError('Failed to submit application. Please try again.');
      setSubmitting(false);
    }
  };

  // Channel-specific instructions
  const channelInstructions = {
    portal: (
      <div className="text-sm text-gray-600 mb-2">
        Please complete all fields and submit online. You will receive a confirmation email.
      </div>
    ),
    paper: (
      <div className="text-sm text-gray-600 mb-2">
        Fill out the form below, print, and mail to: <span className="font-semibold">Medicare Advantage Intake, PO Box 123, Springfield, IL 62704</span>.
      </div>
    ),
    broker: (
      <div className="text-sm text-gray-600 mb-2">
        Enter your phone number. A licensed broker will contact you to assist with your application.
      </div>
    ),
    provider: (
      <div className="text-sm text-gray-600 mb-2">
        Your provider will submit your application. Please confirm your details below.
      </div>
    ),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Application Intake
        </h2>
        <p className="text-gray-700 mb-6">
          Simulate submitting a Medicare Advantage application via multiple channels. Choose a channel below to begin.
        </p>
        <div className="mb-6 flex flex-wrap gap-4">
          {intakeChannels.map(channel => (
            <button
              key={channel.key}
              className={`flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm transition-colors border ${
                selectedChannel === channel.key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'
              }`}
              onClick={() => handleChannelSelect(channel.key)}
              disabled={submitting}
            >
              <span className="text-xl">{channel.icon}</span>
              {channel.label}
            </button>
          ))}
        </div>
        <div className="mb-4">
          <span className="font-semibold text-blue-700">{intakeChannels.find(c => c.key === selectedChannel)?.label}</span>
          <span className="ml-2 text-gray-600 text-sm">{intakeChannels.find(c => c.key === selectedChannel)?.description}</span>
        </div>
        {channelInstructions[selectedChannel]}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={form.name}
              onChange={handleInputChange}
              disabled={submitting || selectedChannel === 'provider'}
              autoComplete="name"
            />
          </div>
          {selectedChannel === 'portal' && (
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={form.email}
                onChange={handleInputChange}
                disabled={submitting}
                autoComplete="email"
              />
            </div>
          )}
          {(selectedChannel === 'broker' || selectedChannel === 'provider') && (
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={form.phone}
                onChange={handleInputChange}
                disabled={submitting}
                autoComplete="tel"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="plan">
              Plan Selection
            </label>
            <select
              id="plan"
              name="plan"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={form.plan}
              onChange={handleInputChange}
              disabled={submitting}
            >
              <option value="">Select a plan</option>
              {plans.map(plan => (
                <option key={plan.value} value={plan.value}>
                  {plan.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="notes">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              rows={3}
              value={form.notes}
              onChange={handleInputChange}
              disabled={submitting}
            />
          </div>
          {submitError && (
            <div className="text-red-600 text-sm">{submitError}</div>
          )}
          {submitSuccess && (
            <div className="text-green-600 text-sm">{submitSuccess}</div>
          )}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold transition-colors ${
              submitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
        {showConfirmation && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded p-4 text-green-700 text-sm">
            <div className="font-semibold mb-2">Application Submitted!</div>
            <div>
              Thank you for submitting your application via <span className="font-semibold">{intakeChannels.find(c => c.key === selectedChannel)?.label}</span>.
              <br />
              Your application for <span className="font-semibold">{form.plan}</span> will be processed shortly.
              {selectedChannel === 'portal' && form.email && (
                <div>
                  A confirmation email will be sent to <span className="font-semibold">{form.email}</span>.
                </div>
              )}
              {selectedChannel === 'broker' && form.phone && (
                <div>
                  A broker will contact you at <span className="font-semibold">{form.phone}</span>.
                </div>
              )}
              {selectedChannel === 'paper' && (
                <div>
                  Please mail your printed application to the address above.
                </div>
              )}
              {selectedChannel === 'provider' && (
                <div>
                  Your provider will handle the submission process.
                </div>
              )}
            </div>
          </div>
        )}
        <div className="mt-6 text-gray-500 text-xs">
          This is a simulated intake process. No real applications are processed.
        </div>
      </div>
    </div>
  );
}

ApplicationIntake.propTypes = {};

export default ApplicationIntake;
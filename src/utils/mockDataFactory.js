/**
 * mockDataFactory.js
 * Factory for generating/loading static mock data for Medicare Advantage demo.
 * Supports: members, reports, care teams, providers, plans.
 */

import { maskPIIArray } from './piiMasking';

/**
 * Generates mock member data.
 * @param {boolean} [masked=false] - If true, returns PII-masked data.
 * @returns {Array<Object>}
 */
export function getMockMembers(masked = false) {
  const members = [
    {
      id: 'M001',
      name: 'John Doe',
      email: 'jdoe@example.com',
      phone: '555-123-4567',
      ssn: '123-45-6789',
      address: '123 Main St, Springfield, IL 62704',
      dob: '01/23/1970',
      plan: 'Plan A',
      status: 'Active',
    },
    {
      id: 'M002',
      name: 'Jane Smith',
      email: 'jsmith@example.com',
      phone: '555-987-6543',
      ssn: '987-65-4321',
      address: '456 Oak Ave, Shelbyville, IL 62565',
      dob: '12/05/1965',
      plan: 'Plan B',
      status: 'Active',
    },
    {
      id: 'M003',
      name: 'Robert Lee',
      email: 'rlee@example.com',
      phone: '555-555-1212',
      ssn: '555-55-5555',
      address: '789 Pine Rd, Capital City, IL 62701',
      dob: '07/14/1958',
      plan: 'Plan C',
      status: 'Inactive',
    },
  ];
  return masked ? maskPIIArray(members) : members;
}

/**
 * Generates mock provider data.
 * @returns {Array<Object>}
 */
export function getMockProviders() {
  return [
    {
      id: 'P001',
      name: 'Dr. Alice Smith',
      specialty: 'Primary Care',
      phone: '555-111-2222',
      address: '101 Health Blvd, Springfield, IL 62704',
      network: 'Medicare Advantage',
    },
    {
      id: 'P002',
      name: 'Dr. Brian Lee',
      specialty: 'Cardiology',
      phone: '555-333-4444',
      address: '202 Heart Ave, Shelbyville, IL 62565',
      network: 'Medicare Advantage',
    },
    {
      id: 'P003',
      name: 'Dr. Priya Patel',
      specialty: 'Dermatology',
      phone: '555-555-6666',
      address: '303 Skin St, Capital City, IL 62701',
      network: 'Medicare Advantage',
    },
  ];
}

/**
 * Generates mock plan data.
 * @returns {Array<Object>}
 */
export function getMockPlans() {
  return [
    {
      id: 'A',
      name: 'Plan A',
      description: 'Comprehensive coverage',
      premium: '$120/month',
      benefits: ['Dental', 'Vision', 'Prescription Drugs'],
    },
    {
      id: 'B',
      name: 'Plan B',
      description: 'Low premium, basic coverage',
      premium: '$80/month',
      benefits: ['Prescription Drugs'],
    },
    {
      id: 'C',
      name: 'Plan C',
      description: 'Enhanced benefits',
      premium: '$150/month',
      benefits: ['Dental', 'Vision', 'Prescription Drugs', 'Hearing'],
    },
  ];
}

/**
 * Generates mock care team data for a member.
 * @param {string} memberId
 * @returns {Array<Object>}
 */
export function getMockCareTeam(memberId) {
  // For demo, assign care team based on memberId
  const teams = {
    M001: [
      { role: 'Primary Care', provider: 'Dr. Alice Smith', contact: '555-111-2222' },
      { role: 'Cardiology', provider: 'Dr. Brian Lee', contact: '555-333-4444' },
    ],
    M002: [
      { role: 'Primary Care', provider: 'Dr. Alice Smith', contact: '555-111-2222' },
      { role: 'Dermatology', provider: 'Dr. Priya Patel', contact: '555-555-6666' },
    ],
    M003: [
      { role: 'Primary Care', provider: 'Dr. Alice Smith', contact: '555-111-2222' },
    ],
  };
  return teams[memberId] || [];
}

/**
 * Generates mock report data for a member.
 * @param {string} memberId
 * @returns {Array<Object>}
 */
export function getMockReports(memberId) {
  // For demo, assign reports based on memberId
  const reports = {
    M001: [
      {
        id: 'R001',
        title: 'Annual Wellness Visit',
        date: '2023-01-15',
        summary: 'Routine checkup, all vitals normal.',
      },
      {
        id: 'R002',
        title: 'Cardiology Consultation',
        date: '2023-03-22',
        summary: 'EKG normal, no issues found.',
      },
    ],
    M002: [
      {
        id: 'R003',
        title: 'Dermatology Exam',
        date: '2023-02-10',
        summary: 'Skin check, no abnormalities.',
      },
    ],
    M003: [
      {
        id: 'R004',
        title: 'Primary Care Visit',
        date: '2022-12-05',
        summary: 'Blood pressure elevated, follow-up recommended.',
      },
    ],
  };
  return reports[memberId] || [];
}

/**
 * Returns all mock data in a single object.
 * @param {boolean} [masked=false] - If true, members are PII-masked.
 * @returns {Object}
 */
export function getAllMockData(masked = false) {
  return {
    members: getMockMembers(masked),
    providers: getMockProviders(),
    plans: getMockPlans(),
    careTeams: {
      M001: getMockCareTeam('M001'),
      M002: getMockCareTeam('M002'),
      M003: getMockCareTeam('M003'),
    },
    reports: {
      M001: getMockReports('M001'),
      M002: getMockReports('M002'),
      M003: getMockReports('M003'),
    },
  };
}

const mockDataFactory = {
  getMockMembers,
  getMockProviders,
  getMockPlans,
  getMockCareTeam,
  getMockReports,
  getAllMockData,
};

export default mockDataFactory;
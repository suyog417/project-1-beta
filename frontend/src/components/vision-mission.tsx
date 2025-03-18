// components/VisionMission.tsx

import React from 'react';

const VisionMission: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <h2 className="text-3xl font-semibold text-[#00415f] text-center mb-8">Vision and Mission</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        {/* Vision/Mission 1 */}
        <div className="p-6 border rounded-lg shadow-md text-center">
          <div className="mb-4">
            {/* Replace with your icon component or image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.042l-9 3.96v7.5a2 2 0 002 2h14a2 2 0 002-2v-7.5l-9-3.96z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Education Gap</h3>
          <p className="text-gray-700">
            To bridge the gap between actuarial education and industry requirements by offering hands-on, practical learning experiences.
          </p>
        </div>

        {/* Vision/Mission 2 */}
        <div className="p-6 border rounded-lg shadow-md text-center">
          <div className="mb-4">
            {/* Replace with your icon component or image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 12l3-3 3 3m0 6l-3-3-3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Quality Training</h3>
          <p className="text-gray-700">
            Provide high-quality training in actuarial science with a focus on real-world applications.
          </p>
        </div>

        {/* Vision/Mission 3 */}
        <div className="p-6 border rounded-lg shadow-md text-center">
          <div className="mb-4">
            {/* Replace with your icon component or image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17a2 2 0 11-4 0m5-14c.716-1.074 2.109-1.333 3.11-1.333a5.987 5.987 0 013.11 1.333m-1.5 10.49a3 3 0 01-4.24 0m-5.47 1.177l-.565.565a2 2 0 01-2.828 0l-.566-.566a3 3 0 00-4.24 0m15.177 0l-.565.565a2 2 0 01-2.828 0l-.566-.566a3 3 0 00-4.24 0m.002-8.16l-.566.566a2 2 0 01-2.828 0l-.565-.566a3 3 0 00-4.24 0"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Industry-Ready</h3>
          <p className="text-gray-700">
            Develop industry-ready actuaries proficient in modeling, valuation, and pricing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
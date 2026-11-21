import React from 'react';

export default function ClipperAgreementPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-sm text-purple-200/80 leading-relaxed">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">Clipper & Editor Agreement</h1>
      <p className="text-xs text-purple-400 font-mono">Effective: 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Independent Contractor Relationship</h2>
        <p>
          Clippers register as independent video creators and editors. Participation in brand campaigns does not constitute
          an employer-employee relationship with Clip Matrix or campaign sponsor brands.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Performance Compensation Criteria</h2>
        <p>
          Earnings are strictly performance-contingent upon approved video submissions reaching verified organic view
          benchmarks audited through Clip Matrix automated API verification and manual staff review.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Zero-Tolerance Fraud Policy</h2>
        <p>
          Any use of automated view generation tools, bot traffic, fraudulent account farming, or fake engagement will result
          in immediate account suspension, permanent removal from the creator roster, and forfeiture of all pending balances.
        </p>
      </section>
    </div>
  );
}

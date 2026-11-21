import React from 'react';

export default function BrandAgreementPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-sm text-purple-200/80 leading-relaxed">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">Brand Campaign & Escrow Agreement</h1>
      <p className="text-xs text-purple-400 font-mono">Effective: 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Campaign Funding & Non-Custodial Escrow</h2>
        <p>
          Advertisers and brands allocate campaign budgets into platform escrow. Funds remain locked and are only deducted
          when creator submissions fulfill campaign creative guidelines and deliver verified view counts.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Unused Budget Refunds</h2>
        <p>
          In the event a campaign concludes with remaining unused budget, the brand may withdraw the residual balance or
          reallocate it to future campaigns with zero penal fees.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Commercial Whitelisting Rights</h2>
        <p>
          Approved video clips grant the brand rights to feature, repurpose, and run paid ad whitelisting campaigns (Meta
          Spark Ads, TikTok Spark Ads) for up to 12 months from submission approval.
        </p>
      </section>
    </div>
  );
}

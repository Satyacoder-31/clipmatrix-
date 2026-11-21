import React from 'react';
import { ArrowUpRight, Flame, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: 'The 3-Second Hook Formula: How Our Clippers Generate 1M+ Views on Reels',
      category: 'Editing Strategy',
      readTime: '5 min read',
      date: 'Nov 18, 2026',
      summary:
        'A breakdown of psychological pattern interrupts, text velocity, and audio transitions that stop Instagram & Shorts viewers from scrolling away.',
    },
    {
      title: 'Understanding CPM vs Fixed Bounty: Which Campaign Model Scales Best?',
      category: 'Brand Economics',
      readTime: '7 min read',
      date: 'Nov 14, 2026',
      summary:
        'Why high-growth tech brands and D2C startups choose performance CPM models to eliminate budget waste and scale organic reach.',
    },
    {
      title: 'Whitelisting & Spark Ads: Scaling Organic Clips into Paid Meta Machines',
      category: 'Growth Marketing',
      readTime: '6 min read',
      date: 'Nov 09, 2026',
      summary:
        'How growth teams take top-performing organic clips from Clip Matrix clippers and turn them into 4x ROAS Spark Ads on TikTok and Meta.',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-14">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
          Growth & Tutorials
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
          Clip Matrix <span className="text-gradient-neon">Viral Clipping Academy</span>
        </h1>
        <p className="text-purple-200/70 text-base">
          Guides, rate cards, algorithm breakdowns, and case studies for brands and clippers.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-[#140c26] border border-purple-900/50 hover:border-purple-500/40 transition-all space-y-3 group"
          >
            <div className="flex items-center gap-3 text-xs text-purple-400 font-mono">
              <span className="text-pink-400 font-bold uppercase">{post.category}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h2 className="text-xl font-bold text-white font-display group-hover:text-purple-300 transition-colors">
              {post.title}
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">{post.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

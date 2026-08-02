import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How do I choose the right size for my child?",
      a: "Our sizing corresponds directly to your child's total height in centimeters (80 cm to 140 cm). For example, size 100 cm is recommended for children between 95 cm and 105 cm tall. If your child is between sizes or you prefer a relaxed sleep fit, we highly advise selecting one size larger."
    },
    {
      q: "How should natural silk pajamas be washed and dried?",
      a: "Because natural Mulberry Silk contains protective proteins, it should be treated with care. We recommend hand washing in cold water or machine washing inside a mesh laundry bag on the Delicates/Silk cycle (maximum 30°C). Always use a pH-neutral liquid silk detergent. Lay flat to dry out of direct sunlight. Never tumble dry."
    },
    {
      q: "Are the fabrics certified organic?",
      a: "Absolutely! Every thread of our organic cotton collection is GOTS-certified (Global Organic Textile Standard). This guarantees that the cotton is grown organically without harmful chemical fertilizers or pesticides, and is processed safely under strict social-responsibility codes."
    },
    {
      q: "What are your shipping times?",
      a: "We ship worldwide from our warehouse in Gothenburg, Sweden. Standard domestic shipping takes 2-4 business days, and international shipping averages 3-7 business days. Orders over $100 qualify automatically for Free Worldwide Tracked Shipping."
    },
    {
      q: "What is your return policy?",
      a: "We offer an easy 30-day return policy. Pajamas must be returned in their original, unwashed, and unworn condition with tags and premium packaging intact. Size exchange shipping is completely complimentary."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-12">
      {/* Editorial Title */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-stone-400 block">Bedtime Care Guide</span>
        <h2 className="text-3xl font-serif text-stone-900 font-semibold uppercase">Frequently Asked Questions</h2>
        <p className="text-xs text-stone-500 font-light max-w-lg mx-auto leading-relaxed">
          Everything you need to know about choosing the perfect size, caring for organic fabrics, and shipping.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4 bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border-b border-stone-100 last:border-none pb-4 last:pb-0 pt-4 first:pt-0"
              id={i === 4 ? "returns" : undefined}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full flex justify-between items-center text-left py-2 font-serif text-stone-800 hover:text-amber-800 transition"
              >
                <span className="text-sm md:text-base font-medium">{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
              </button>
              {isOpen && (
                <p className="text-xs md:text-sm text-stone-500 font-light leading-relaxed pt-2 pl-1 animate-slide-in">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Under block */}
      <div className="bg-stone-100/50 rounded-2xl p-6 text-center border border-stone-200/50 space-y-2">
        <h3 className="text-sm font-serif font-semibold text-stone-800">Still have questions?</h3>
        <p className="text-xs text-stone-400">Our family is here to support yours. Reach out to our dedicated support service anytime.</p>
        <div className="pt-2">
          <a href="#/contact" className="text-xs text-amber-800 hover:underline font-semibold uppercase tracking-wider">Contact Customer Care</a>
        </div>
      </div>
    </div>
  );
}

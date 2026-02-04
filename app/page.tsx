'use client';

import { useState } from 'react';
import JsonLd from '@/components/content/JsonLd';

interface FormState {
  email: string;
  loading: boolean;
  success: boolean;
  error: string;
}

export default function HomePage() {
  const [form, setForm] = useState<FormState>({
    email: '',
    loading: false,
    success: false,
    error: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.email || !form.email.includes('@')) {
      setForm(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    setForm(prev => ({ ...prev, loading: true, error: '' }));

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });

      const data = await response.json();

      if (data.success) {
        setForm(prev => ({ ...prev, success: true, loading: false, email: '' }));
      } else {
        setForm(prev => ({ ...prev, error: data.error || 'Something went wrong', loading: false }));
      }
    } catch (error) {
      setForm(prev => ({ ...prev, error: 'Network error. Please try again.', loading: false }));
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CardioGuard",
    "description": "Advanced cardiovascular risk testing and guidance without insurance barriers",
    "url": "https://cardioguard.com",
    "sameAs": [
      "https://twitter.com/cardioguard",
      "https://linkedin.com/company/cardioguard"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CardioGuard",
    "description": "Advanced Heart Tests Without The Wait",
    "url": "https://cardioguard.com"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the best markers for cardiovascular health?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best cardiovascular biomarkers include ApoB, Lp(a), hs-CRP, and advanced lipid particles that predict heart disease more accurately than basic cholesterol tests. These markers provide a comprehensive view of your cardiovascular risk that standard panels often miss."
        }
      },
      {
        "@type": "Question",
        "name": "Does insurance cover LP(a) test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most insurance plans don't cover Lp(a) testing despite its importance in cardiovascular risk assessment. This is why many people turn to direct-pay testing to get the advanced biomarkers their cardiologists recommend."
        }
      },
      {
        "@type": "Question",
        "name": "What is a preferred cardiac biomarker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leading cardiologists prefer ApoB over LDL cholesterol because it measures the actual number of atherogenic particles. Combined with Lp(a) and inflammatory markers like hs-CRP, these biomarkers provide superior cardiovascular risk prediction."
        }
      },
      {
        "@type": "Question",
        "name": "What are the new biomarkers for cardiovascular disease?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "New cardiovascular biomarkers include advanced particle testing, genetic markers like Lp(a), and inflammatory indicators that weren't part of traditional panels. These tests can identify heart disease risk years before symptoms appear, allowing for early intervention."
        }
      }
    ]
  };

  return (
    <>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />
      <JsonLd schema={faqSchema} />
      
      <main>
        {/* Hero Section */}
        <section className="section" aria-label="Hero">
          <div className="container">
            <div className="text-center mb-12">
              <div className="badge mb-6">Advanced Cardiovascular Testing</div>
              <h1 className="mb-6">Get the Best Cardiovascular Biomarkers Your Insurance Won't Cover</h1>
              <p className="text-xl mb-8 opacity-75 max-w-3xl mx-auto">
                Test ApoB, Lp(a), and advanced cardiac markers recommended by leading cardiologists—no doctor's referral required, no insurance denials.
              </p>
              
              {/* Email Signup Form */}
              <div className="max-w-md mx-auto">
                {form.success ? (
                  <div className="card text-center">
                    <h3 className="mb-2">You're on the list! 🎉</h3>
                    <p className="opacity-75">We'll notify you when CardioGuard launches.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Enter your email for early access"
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value, error: '' }))}
                        className="input"
                        disabled={form.loading}
                        required
                      />
                    </div>
                    {form.error && (
                      <p className="text-red-400 text-sm">{form.error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={form.loading}
                      className="btn btn-primary w-full"
                    >
                      {form.loading ? 'Joining Waitlist...' : 'Get Advanced Testing'}
                    </button>
                  </form>
                )}
                <p className="text-sm opacity-50 mt-4">
                  Join 1,200+ health-conscious professionals
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="section" aria-label="Key Benefits">
          <div className="container">
            <h2 className="text-center mb-12">Why Advanced Cardiovascular Biomarkers Matter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card">
                <h3 className="mb-4">Tests That Actually Predict Heart Disease</h3>
                <p>
                  We test ApoB, Lp(a), and hs-CRP—the biomarkers cardiologists now recommend but standard panels miss. Get the full picture of your cardiovascular risk.
                </p>
              </div>
              <div className="card">
                <h3 className="mb-4">No Insurance Coverage Hassles</h3>
                <p>
                  Skip the prior authorization battles and coverage denials. Get advanced cardiac testing directly, with transparent pricing and fast results.
                </p>
              </div>
              <div className="card">
                <h3 className="mb-4">Expert Interpretation Included</h3>
                <p>
                  Your results come with cardiologist-reviewed analysis and actionable next steps, not just numbers you have to Google yourself.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="section" aria-label="Social Proof">
          <div className="container">
            <div className="text-center">
              <h2 className="mb-8">Trusted by Health-Conscious Professionals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="card">
                  <p className="mb-4 italic">
                    "My standard cholesterol was 'normal' but CardioGuard found my ApoB was dangerously high. This testing literally saved my life."
                  </p>
                  <p className="font-semibold">— Sarah M., Tech Executive</p>
                </div>
                <div className="card">
                  <p className="mb-4 italic">
                    "Finally got the Lp(a) test my cardiologist mentioned but my insurance wouldn't cover. Turns out I have a genetic risk I never knew about."
                  </p>
                  <p className="font-semibold">— David K., Entrepreneur</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section" aria-label="Frequently Asked Questions">
          <div className="container">
            <h2 className="text-center mb-12">Heart Disease Prevention Questions Answered</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="card">
                  <h3 className="mb-4">What are the best markers for cardiovascular health?</h3>
                  <p>
                    The best cardiovascular biomarkers include ApoB, Lp(a), hs-CRP, and advanced lipid particles that predict heart disease more accurately than basic cholesterol tests. These markers provide a comprehensive view of your cardiovascular risk that standard panels often miss.
                  </p>
                </div>
                
                <div className="card">
                  <h3 className="mb-4">Does insurance cover LP(a) test?</h3>
                  <p>
                    Most insurance plans don't cover Lp(a) testing despite its importance in cardiovascular risk assessment. This is why many people turn to direct-pay testing to get the advanced biomarkers their cardiologists recommend.
                  </p>
                </div>
                
                <div className="card">
                  <h3 className="mb-4">What is a preferred cardiac biomarker?</h3>
                  <p>
                    Leading cardiologists prefer ApoB over LDL cholesterol because it measures the actual number of atherogenic particles. Combined with Lp(a) and inflammatory markers like hs-CRP, these biomarkers provide superior cardiovascular risk prediction.
                  </p>
                </div>
                
                <div className="card">
                  <h3 className="mb-4">What are the new biomarkers for cardiovascular disease?</h3>
                  <p>
                    New cardiovascular biomarkers include advanced particle testing, genetic markers like Lp(a), and inflammatory indicators that weren't part of traditional panels. These tests can identify heart disease risk years before symptoms appear, allowing for early intervention.
                  </p>
                </div>
                
                <div className="card">
                  <h3 className="mb-4">How accurate is basic cholesterol testing really?</h3>
                  <p>
                    Basic cholesterol tests miss up to 50% of people at risk for heart disease because they don't measure particle number or size. Advanced biomarkers like ApoB provide a more accurate assessment of cardiovascular risk.
                  </p>
                </div>
                
                <div className="card">
                  <h3 className="mb-4">Why is Lp(a) testing so important for entrepreneurs?</h3>
                  <p>
                    High-stress professionals like entrepreneurs have elevated cardiovascular risk, and Lp(a) is a genetic factor that compounds this risk. Early detection allows for targeted prevention strategies before heart disease develops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section" aria-label="Get Started">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="mb-6">Don't Wait for Insurance Approval</h2>
              <p className="text-xl mb-8 opacity-75">
                Get the cardiovascular biomarkers that leading cardiologists recommend, without the bureaucracy and delays.
              </p>
              <div className="max-w-md mx-auto">
                {!form.success && (
                  <form onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value, error: '' }))}
                        className="input flex-1"
                        disabled={form.loading}
                        required
                      />
                      <button
                        type="submit"
                        disabled={form.loading}
                        className="btn btn-primary"
                      >
                        {form.loading ? 'Joining...' : 'Join Waitlist'}
                      </button>
                    </div>
                    {form.error && (
                      <p className="text-red-400 text-sm mt-2">{form.error}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="section">
        <div className="container">
          <div className="text-center opacity-50">
            <p className="mb-4">
              <strong>CardioGuard</strong> — Advanced Heart Tests Without The Wait
            </p>
            <nav className="space-x-6">
              <a href="/blog" className="hover:opacity-75">Heart Health Blog</a>
              <a href="/compare" className="hover:opacity-75">Compare Tests</a>
              <a href="/faq" className="hover:opacity-75">FAQ</a>
              <a href="/privacy" className="hover:opacity-75">Privacy</a>
            </nav>
            <p className="mt-6 text-sm">
              © 2024 CardioGuard. This service is for informational purposes and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
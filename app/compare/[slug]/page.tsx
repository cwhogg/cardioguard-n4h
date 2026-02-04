import { getAllSlugs, getPostBySlug } from '../../../lib/content';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSlugs('comparison');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug('comparison', slug);
  
  if (!post) {
    return {
      title: 'Comparison Not Found | CardioGuard'
    };
  }

  return {
    title: `${post.title} | CardioGuard`,
    description: post.description,
    alternates: {
      canonical: `/compare/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://cardioguard.com/compare/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug('comparison', slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'CardioGuard'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CardioGuard'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
          <header style={{ marginBottom: '3rem' }}>
            <nav style={{ marginBottom: '2rem' }}>
              <Link 
                href="/"
                style={{ 
                  color: 'var(--color-primary)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  marginRight: '2rem'
                }}
              >
                CardioGuard
              </Link>
              <Link 
                href="/"
                style={{ color: 'var(--color-accent)', fontSize: '0.875rem' }}
              >
                ← Back to Home
              </Link>
            </nav>
            
            <div style={{ marginBottom: '1rem' }}>
              <time style={{ 
                color: 'var(--color-text-muted)', 
                fontSize: '0.875rem',
                fontFamily: 'var(--font-mono)'
              }}>
                Updated {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <h1 style={{ marginBottom: '1rem' }}>{post.title}</h1>
            
            <p style={{ 
              fontSize: '1.125rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '2rem'
            }}>
              {post.description}
            </p>
          </header>

          <article style={{
            backgroundColor: 'var(--color-background-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '2rem'
          }}>
            <div 
              style={{
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                fontSize: '1rem'
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <div style={{ 
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: 'var(--color-primary)',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '1rem', color: 'white' }}>
              Skip the Insurance Hassles
            </h3>
            <p style={{ marginBottom: '1.5rem', color: 'white', opacity: 0.9 }}>
              Get advanced cardiovascular biomarkers directly—no prior authorization, no denials.
            </p>
            <Link 
              href="/"
              className="btn"
              style={{
                backgroundColor: 'white',
                color: 'var(--color-primary)',
                padding: '0.75rem 2rem',
                borderRadius: '6px',
                fontWeight: 600,
                display: 'inline-block'
              }}
            >
              Get Advanced Testing
            </Link>
          </div>

          <footer style={{ 
            marginTop: '3rem', 
            padding: '2rem 0', 
            borderTop: '1px solid var(--color-border)',
            textAlign: 'center'
          }}>
            <nav style={{ marginBottom: '1rem' }}>
              <Link href="/" style={{ margin: '0 1rem', color: 'var(--color-accent)' }}>Home</Link>
              <Link href="/blog" style={{ margin: '0 1rem', color: 'var(--color-accent)' }}>Blog</Link>
              <Link href="/compare" style={{ margin: '0 1rem', color: 'var(--color-accent)' }}>Compare</Link>
              <Link href="/faq" style={{ margin: '0 1rem', color: 'var(--color-accent)' }}>FAQ</Link>
            </nav>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              © 2024 CardioGuard. Advanced Heart Tests Without The Wait.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
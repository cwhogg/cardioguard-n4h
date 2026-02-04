import { getAllPosts } from '../../lib/content';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cardiovascular Health Blog — Tips & Guides | CardioGuard',
  description: 'Expert insights on advanced cardiac biomarkers, heart disease prevention, and cardiovascular testing. Learn about ApoB, Lp(a), and cutting-edge heart health strategies.',
};

export default async function BlogPage() {
  const posts = await getAllPosts('blog-post');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <Link 
            href="/"
            style={{ 
              display: 'inline-block',
              marginBottom: '2rem',
              color: 'var(--color-primary)',
              fontSize: '1.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)'
            }}
          >
            CardioGuard
          </Link>
          <h1 style={{ marginBottom: '1rem' }}>Cardiovascular Health Insights</h1>
          <p style={{ 
            fontSize: '1.125rem', 
            maxWidth: '600px', 
            margin: '0 auto',
            color: 'var(--color-text-secondary)'
          }}>
            Expert guidance on advanced cardiac biomarkers, heart disease prevention strategies, and navigating cardiovascular testing without insurance barriers. Stay informed on the latest in preventive cardiology.
          </p>
        </header>

        {posts.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            backgroundColor: 'var(--color-background-elevated)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)'
          }}>
            <h2 style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>
              Coming Soon
            </h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              We're preparing expert content on advanced cardiovascular testing. Check back soon for insights on ApoB, Lp(a), and other cutting-edge biomarkers.
            </p>
            <Link 
              href="/"
              className="btn"
              style={{
                marginTop: '1.5rem',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '6px',
                fontWeight: 600,
                display: 'inline-block'
              }}
            >
              Get Advanced Testing
            </Link>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {posts.map((post) => (
              <article 
                key={post.slug}
                style={{
                  backgroundColor: 'var(--color-background-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <time style={{ 
                    color: 'var(--color-text-muted)', 
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
                  <Link 
                    href={`/blog/${post.slug}`}
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {post.title}
                  </Link>
                </h2>
                
                <p style={{ 
                  marginBottom: '1.5rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6
                }}>
                  {post.description}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  style={{
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Read Article →
                </Link>
              </article>
            ))}
          </div>
        )}

        <footer style={{ 
          marginTop: '4rem', 
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
  );
}
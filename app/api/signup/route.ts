import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const SITE_ID = process.env.SITE_ID || 'cardioguard';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmails = await redis.lrange(`email_signups:${SITE_ID}`, 0, -1);
    if (existingEmails.includes(email)) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 409 }
      );
    }

    // Store the signup
    await redis.rpush(`email_signups:${SITE_ID}`, email);
    
    // Increment counter
    await redis.incr(`email_signups_count:${SITE_ID}`);
    
    // Store timestamp
    await redis.hset(`email_signup_meta:${SITE_ID}:${email}`, {
      email,
      timestamp: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to process signup. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await redis.get(`email_signups_count:${SITE_ID}`) || 0;
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Get count error:', error);
    return NextResponse.json({ count: 0 });
  }
}
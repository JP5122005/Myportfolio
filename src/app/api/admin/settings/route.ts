import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/db/queries';

export async function GET(request: NextRequest) {
  try {
    const settings = await getSettings();
    
    if (!settings) {
      return NextResponse.json(
        { error: 'Settings not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.metaTitle || !body.metaDescription || !body.name || !body.ctaLabel) {
      return NextResponse.json(
        { error: 'Missing required fields: metaTitle, metaDescription, name, ctaLabel' },
        { status: 400 }
      );
    }

    // Get current settings to preserve navigation items
    const currentSettings = await getSettings();
    
    const updatedSettings = await updateSettings({
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      name: body.name,
      navItems: currentSettings?.navItems || [
        { link: { url: "/" }, label: "Home" },
        { link: { url: "/about" }, label: "About" },
        { link: { url: "/projects" }, label: "Projects" },
        { link: { url: "/blog" }, label: "Blog" }
      ],
      ctaLink: '/contact', // Keep this static for now
      ctaLabel: body.ctaLabel,
      githubLink: body.githubLink || '',
      twitterLink: body.twitterLink || '',
      linkedinLink: body.linkedinLink || '',
    });

    if (!updatedSettings) {
      return NextResponse.json(
        { error: 'Failed to update settings' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

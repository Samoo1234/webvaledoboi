export interface HeroContent {
    title: string;
    subtitle: string;
    tagline: string;
    video_url?: string;
    fallback_image?: string;
}

export interface AboutContent {
    title: string;
    paragraphs: string[];
}

export interface SiteContent<T = any> {
    id: string;
    page_slug: string;
    section_key: string;
    content: T;
    updated_at: string;
}

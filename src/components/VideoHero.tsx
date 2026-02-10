

interface VideoHeroProps {
    title: string
    subtitle: string
    tagline: string
    videoUrl?: string
    fallbackImage?: string
    logoText?: string
}

export function VideoHero({
    title,
    subtitle,
    tagline,
    videoUrl,
    fallbackImage,
    logoText = 'VB',
}: VideoHeroProps) {
    return (
        <section className="landing-hero video-hero">
            {videoUrl ? (
                <div className="video-background">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={fallbackImage}
                        className="hero-video"
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Seu navegador não suporta vídeos.
                    </video>
                    <div className="video-overlay" />
                </div>
            ) : (
                <div
                    className="hero-background-fallback"
                    style={{ backgroundImage: fallbackImage ? `url(${fallbackImage})` : 'none' }}
                />
            )}

            <div className="landing-hero-content">
                <div className="landing-hero-logo">{logoText}</div>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <p className="landing-hero-tagline">{tagline}</p>
            </div>
        </section>
    )
}

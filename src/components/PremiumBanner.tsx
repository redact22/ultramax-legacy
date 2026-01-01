import React, { useState } from 'react';
import '../../styles/colors.css';

/**
 * ULTRAMAX LEGACY: PremiumBanner
 * Elite Revenue Component - Conversion-Driven
 * Animated, attention-grabbing banner for upgrading users to the Elite tier
 * Designed for maximum conversion with premium aesthetics
 */

interface PremiumBannerProps {
    variant?: 'default' | 'compact' | 'full';
    onUpgrade?: () => void;
    onDismiss?: () => void;
    showDismiss?: boolean;
    ctaText?: string;
    title?: string;
    description?: string;
}

export default function PremiumBanner({
    variant = 'default',
    onUpgrade,
    onDismiss,
    showDismiss = true,
    ctaText = 'Upgrade to Elite',
    title = 'Unlock Elite Features',
    description = 'Get access to advanced analytics, priority support, and exclusive tools.',
}: PremiumBannerProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);

  const handleUpgrade = () => {
        if (onUpgrade) {
                onUpgrade();
        }
  };

  const handleDismiss = () => {
        if (onDismiss) {
                onDismiss();
        }
  };

  const baseStyles: React.CSSProperties = {
        position: 'relative',
        background: 'linear-gradient(135deg, var(--obsidian-900) 0%, var(--obsidian-950) 100%)',
        border: '1px solid var(--obsidian-800)',
        borderRadius: '12px',
        padding: variant === 'compact' ? '16px' : '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        overflow: 'hidden',
        backdropFilter: 'blur(var(--glass-blur-md))',
        boxShadow: isHovered 
          ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--accent-primary)' 
          : '0 4px 16px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: isAnimating ? 'bannerSlideIn 0.5s ease-out' : 'none',
  };

  const glowStyles: React.CSSProperties = {
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
        opacity: 0.15,
        pointerEvents: 'none',
        animation: 'pulseGlow 3s ease-in-out infinite',
  };

  const contentStyles: React.CSSProperties = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
  };

  const titleStyles: React.CSSProperties = {
        fontSize: variant === 'compact' ? '16px' : '18px',
        fontWeight: 700,
        color: 'var(--obsidian-50)',
        margin: 0,
        background: 'linear-gradient(90deg, var(--obsidian-50), var(--accent-primary))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
  };

  const descriptionStyles: React.CSSProperties = {
        fontSize: '14px',
        color: 'var(--obsidian-400)',
        margin: 0,
        lineHeight: 1.5,
  };

  const ctaButtonStyles: React.CSSProperties = {
        padding: variant === 'compact' ? '10px 20px' : '12px 24px',
        background: 'var(--accent-primary)',
        color: 'var(--obsidian-950)',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), 0 0 20px var(--accent-primary-20)',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
  };

  const dismissButtonStyles: React.CSSProperties = {
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '24px',
        height: '24px',
        background: 'transparent',
        border: 'none',
        color: 'var(--obsidian-500)',
        cursor: 'pointer',
        fontSize: '18px',
        lineHeight: 1,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        transition: 'all 0.2s ease',
  };

  const badgeStyles: React.CSSProperties = {
        display: 'inline-block',
        padding: '4px 8px',
        background: 'var(--accent-primary)',
        color: 'var(--obsidian-950)',
        fontSize: '10px',
        fontWeight: 700,
        textTransform: 'uppercase',
        borderRadius: '4px',
        letterSpacing: '0.5px',
        marginBottom: '4px',
  };

  return (
        <div 
                style={baseStyles}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
          {/* Animated glow effect */}
              <div style={glowStyles} />
        
          {/* Dismiss button */}
          {showDismiss && (
                        <button
                                    style={dismissButtonStyles}
                                    onClick={handleDismiss}
                                    aria-label="Dismiss"
                                    onMouseEnter={(e) => {
                                                  e.currentTarget.style.background = 'var(--obsidian-800)';
                                                  e.currentTarget.style.color = 'var(--obsidian-200)';
                                    }}
                                    onMouseLeave={(e) => {
                                                  e.currentTarget.style.background = 'transparent';
                                                  e.currentTarget.style.color = 'var(--obsidian-500)';
                                    }}
                                  >
                                  ✕
                        </button>button>
              )}
        
          {/* Content */}
              <div style={contentStyles}>
                      <div style={badgeStyles}>Elite</div>div>
                      <h3 style={titleStyles}>{title}</h3>h3>
                {variant !== 'compact' && (
                          <p style={descriptionStyles}>{description}</p>p>
                      )}
              </div>div>
        
          {/* CTA Button */}
              <button
                        style={ctaButtonStyles}
                        onClick={handleUpgrade}
                        onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3), 0 0 30px var(--accent-primary-30)';
                        }}
                        onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), 0 0 20px var(--accent-primary-20)';
                        }}
                      >
                {ctaText}
              </button>button>
        
          {/* CSS animations */}
              <style>{`
                      @keyframes bannerSlideIn {
                                from {
                                            opacity: 0;
                                                        transform: translateY(-20px);
                                                                  }
                                                                            to {
                                                                                        opacity: 1;
                                                                                                    transform: translateY(0);
                                                                                                              }
                                                                                                                      }
                                                                                                                      
                                                                                                                              @keyframes pulseGlow {
                                                                                                                                        0%, 100% {
                                                                                                                                                    opacity: 0.15;
                                                                                                                                                                transform: scale(1);
                                                                                                                                                                          }
                                                                                                                                                                                    50% {
                                                                                                                                                                                                opacity: 0.25;
                                                                                                                                                                                                            transform: scale(1.1);
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                    `}</style>style>
        </div>div>
      );
}
</div>

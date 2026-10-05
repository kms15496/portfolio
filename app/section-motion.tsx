'use client';

import { useEffect } from 'react';

/** Progressive enhancement: content remains visible without JavaScript. */
export default function SectionMotion({ revision }: { revision: string }) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;
    const animations = new Map<Element, Animation>();
    const targets = document.querySelectorAll<HTMLElement>(
      '.section-heading, .project-card, .job, .about-copy, .toolkit, .contact, .proof-strip > div, .stack-ribbon'
    );
    const observer = new IntersectionObserver((entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          animations.get(entry.target)?.cancel();
          animations.delete(entry.target);
          continue;
        }
        if (preference.matches) continue;
        animations.get(entry.target)?.cancel();
        const animation = entry.target.animate(
          [
            { opacity: 0.15, translate: '0 22px' },
            { opacity: 1, translate: '0 0' },
          ],
          { duration: 720, delay: Math.min(stagger++ * 85, 255), fill: 'backwards', easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        );
        animations.set(entry.target, animation);
      }
    }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
    targets.forEach(target => observer.observe(target));
    const cancelMotion = () => {
      if (preference.matches) {
        animations.forEach(animation => animation.cancel());
        animations.clear();
      }
    };
    preference.addEventListener('change', cancelMotion);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener('change', cancelMotion);
    };
  }, [revision]);
  return null;
}

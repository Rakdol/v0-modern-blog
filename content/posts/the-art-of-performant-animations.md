---
title: "The Art of Performant Animations"
date: "2026-02-08"
excerpt: "Why smooth motion matters, and how to achieve 60fps animations without sacrificing battery life or accessibility."
tags: ["performance", "animation", "CSS"]
coverImage: "/images/posts/animations.jpg"
---

Animation is not decoration. When done right, motion communicates hierarchy, guides attention, and creates a sense of physicality in digital space. When done wrong, it's a battery-draining, accessibility-breaking nightmare.

## The 60fps Imperative

Human perception is tuned to detect motion irregularities. A dropped frame at 60fps creates a visible stutter that registers as *jank* — a subconscious signal that something is broken.

The rules are simple:

1. **Animate only `transform` and `opacity`** — these are GPU-composited
2. **Avoid layout-triggering properties** — `width`, `height`, `margin`, `padding`
3. **Use `will-change` sparingly** — it's a hint, not a magic wand
4. **Prefer CSS transitions over JavaScript** when possible

## The FLIP Technique

FLIP (First, Last, Invert, Play) is the gold standard for layout animations:

```javascript
// First: record initial position
const first = element.getBoundingClientRect();

// Last: trigger the layout change
element.classList.add('expanded');
const last = element.getBoundingClientRect();

// Invert: apply a transform to restore original position
const deltaX = first.left - last.left;
const deltaY = first.top - last.top;
element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

// Play: animate to final position
requestAnimationFrame(() => {
  element.style.transition = 'transform 0.3s ease';
  element.style.transform = '';
});
```

This technique lets you animate between any two layout states at 60fps because the actual animation only uses `transform`.

## Respecting User Preferences

Not everyone wants motion. The `prefers-reduced-motion` media query is essential:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

This isn't optional — it's an accessibility requirement.

## Motion as Language

The best animation systems create a consistent motion language. Spring physics feel natural. Ease-in-out curves suggest physical weight. Stagger delays create rhythm and hierarchy.

Invest in your animation system the same way you invest in your type scale or color palette. Motion is a first-class design primitive.

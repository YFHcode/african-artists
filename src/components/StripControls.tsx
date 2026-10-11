'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/** Drift speed, in CSS pixels a second: a card passes in about eight seconds. */
const SPEED = 26;
/** How long the strip stays still after the visitor last touched, scrolled or pointed at it. */
const RESUME_AFTER = 4000;

const REDUCE = '(prefers-reduced-motion: reduce)';
const watchMotion = (onChange: () => void) => {
    const query = window.matchMedia(REDUCE);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
};

/**
 * Motion and buttons for the home page's artist strip (ArtistStrip.tsx).
 *
 * The list is an ordinary scrolling row that drifts slowly on its own, looping
 * through a second, hidden copy of the cards. It stops while the visitor
 * hovers, touches, scrolls or tabs into it, and starts again a few seconds
 * later; the pause button stops it for good. With a reduced-motion preference
 * it never drifts and stays a row the visitor scrolls by hand.
 */
export function StripControls({
    target,
    labels,
}: {
    target: string;
    labels: { prev: string; next: string; pause: string; play: string };
}) {
    // False on the server and with a reduced-motion preference: then nothing drifts.
    const canMove = useSyncExternalStore(watchMotion, () => !window.matchMedia(REDUCE).matches, () => false);
    const [paused, setPaused] = useState(false);
    const pausedRef = useRef(false);
    const togglePause = () => {
        pausedRef.current = !paused;
        setPaused(!paused);
    };

    useEffect(() => {
        const list = document.getElementById(target);
        if (!list || !canMove) return;

        const rtl = getComputedStyle(list).direction === 'rtl';
        const sign = rtl ? -1 : 1;
        // Width of one set of cards: where the hidden copy starts.
        const loopWidth = () => {
            const copy = list.querySelector<HTMLElement>('[data-copy]');
            if (!copy) return 0;
            const first = list.firstElementChild as HTMLElement;
            return Math.abs(copy.offsetLeft - first.offsetLeft);
        };

        let position = Math.abs(list.scrollLeft);
        let last = 0;
        let idleUntil = 0;
        let visible = true;
        let hovering = false;
        let frame = 0;

        const tick = (now: number) => {
            const dt = last ? Math.min(now - last, 100) : 0;
            last = now;
            const moving = visible && !hovering && !pausedRef.current && now >= idleUntil && !list.contains(document.activeElement);
            list.classList.toggle('is-drifting', moving);
            if (moving) {
                position += (SPEED * dt) / 1000;
                const loop = loopWidth();
                if (loop > 0 && position >= loop) position -= loop;
                list.scrollLeft = sign * position;
            } else {
                position = Math.abs(list.scrollLeft);
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        const hold = () => (idleUntil = performance.now() + RESUME_AFTER);
        const enter = () => (hovering = true);
        const leave = () => {
            hovering = false;
            hold();
        };
        const events: [string, EventListener][] = [
            ['pointerdown', hold],
            ['touchstart', hold],
            ['wheel', hold],
            ['keydown', hold],
            ['mouseenter', enter],
            ['mouseleave', leave],
        ];
        for (const [name, fn] of events) list.addEventListener(name, fn, { passive: true });
        const seen = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
        seen.observe(list);
        return () => {
            cancelAnimationFrame(frame);
            list.classList.remove('is-drifting');
            for (const [name, fn] of events) list.removeEventListener(name, fn);
            seen.disconnect();
        };
    }, [target, canMove]);

    const move = (direction: 1 | -1) => {
        const list = document.getElementById(target);
        if (!list) return;
        const rtl = getComputedStyle(list).direction === 'rtl';
        const still = window.matchMedia(REDUCE).matches;
        list.dispatchEvent(new Event('wheel'));
        // At either end, first jump by one set of cards into the other copy, which
        // looks the same, so the buttons go round and round. (The copy is not
        // shown with a reduced-motion preference.)
        const copy = list.querySelector<HTMLElement>('[data-copy]');
        const step = list.clientWidth * 0.85;
        const offset = Math.abs(list.scrollLeft);
        if (copy && !still) {
            const loop = Math.abs(copy.offsetLeft - (list.firstElementChild as HTMLElement).offsetLeft);
            const jump = direction === -1 && offset < step ? loop : direction === 1 && offset >= loop ? -loop : 0;
            if (jump) {
                list.style.scrollBehavior = 'auto';
                list.scrollLeft = (rtl ? -1 : 1) * (offset + jump);
                list.style.scrollBehavior = '';
            }
        }
        list.scrollBy({ left: direction * (rtl ? -1 : 1) * step, behavior: still ? 'auto' : 'smooth' });
    };

    const button =
        'grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-ink';
    return (
        <div className="flex shrink-0 gap-2">
            {canMove && (
                <button
                    type="button"
                    className={button}
                    aria-controls={target}
                    aria-label={paused ? labels.play : labels.pause}
                    onClick={togglePause}
                >
                    <span aria-hidden="true" className="text-sm">
                        {paused ? '▶' : '❚❚'}
                    </span>
                </button>
            )}
            <button type="button" className={button} aria-controls={target} aria-label={labels.prev} onClick={() => move(-1)}>
                <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                    ←
                </span>
            </button>
            <button type="button" className={button} aria-controls={target} aria-label={labels.next} onClick={() => move(1)}>
                <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                    →
                </span>
            </button>
        </div>
    );
}

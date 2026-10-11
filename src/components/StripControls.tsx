'use client';

import { useEffect, useState } from 'react';

/**
 * Back and forward buttons for a horizontally scrolling list (the home page's
 * artist strip). The list scrolls by touch, trackpad or keyboard on its own;
 * the buttons are for mouse users. Nothing moves unless asked.
 */
export function StripControls({ target, prev, next }: { target: string; prev: string; next: string }) {
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    useEffect(() => {
        const list = document.getElementById(target);
        if (!list) return;
        const update = () => {
            // scrollLeft runs from 0 to negative in right-to-left pages.
            const offset = Math.abs(list.scrollLeft);
            setAtStart(offset < 4);
            setAtEnd(offset + list.clientWidth >= list.scrollWidth - 4);
        };
        update();
        list.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            list.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [target]);

    const move = (direction: 1 | -1) => {
        const list = document.getElementById(target);
        if (!list) return;
        const rtl = getComputedStyle(list).direction === 'rtl';
        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        list.scrollBy({ left: direction * (rtl ? -1 : 1) * list.clientWidth * 0.85, behavior: still ? 'auto' : 'smooth' });
    };

    const button =
        'grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-ink disabled:cursor-default disabled:opacity-35 disabled:hover:border-line';
    return (
        <div className="hidden gap-2 sm:flex">
            <button type="button" className={button} aria-controls={target} aria-label={prev} disabled={atStart} onClick={() => move(-1)}>
                <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                    ←
                </span>
            </button>
            <button type="button" className={button} aria-controls={target} aria-label={next} disabled={atEnd} onClick={() => move(1)}>
                <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                    →
                </span>
            </button>
        </div>
    );
}

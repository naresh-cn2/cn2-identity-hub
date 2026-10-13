/**
 * Per-review rating stars. Never averaged, never presented as a site-wide
 * score — each panel shows the rating its author actually gave.
 */
export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
    const clamped = Math.min(5, Math.max(1, Math.round(rating)));
    return (
        <span
            className={`star-row inline-flex items-center gap-1 ${className}`}
            role="img"
            aria-label={`Rated ${clamped} of 5`}
        >
            {[1, 2, 3, 4, 5].map((i) => (
                <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    aria-hidden="true"
                    fill={i <= clamped ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.6z" />
                </svg>
            ))}
        </span>
    );
}

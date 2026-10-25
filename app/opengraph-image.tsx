import { ImageResponse } from "next/og";

/**
 * Site-wide share card (1200×630). Every route inherits it unless it defines
 * its own. Dark, restrained, brand-accurate: the wordmark, the descriptor and
 * the WORK line — no invented imagery, no unverifiable claims.
 */

export const alt = "CN2.DEV — Bukya Naresh, Quantitative Developer. Products. Projects. Engineering.";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#030712",
                    color: "#F5F8FF",
                    padding: "72px 80px",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            width: 64,
                            height: 4,
                            backgroundColor: "#e6392a",
                            marginRight: 24,
                        }}
                    />
                    <div style={{ fontSize: 28, letterSpacing: 6, color: "#A7B4C8" }}>
                        BUKYA NARESH
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 132, letterSpacing: -4 }}>CN2.DEV</div>
                    <div style={{ fontSize: 44, marginTop: 24, color: "#e6392a", letterSpacing: 2 }}>
                        PRODUCTS. PROJECTS. ENGINEERING.
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div style={{ fontSize: 28, color: "#A7B4C8", letterSpacing: 4 }}>
                        QUANTITATIVE DEVELOPER
                    </div>
                    <div style={{ fontSize: 24, color: "#8B99AF", letterSpacing: 2 }}>
                        RESEARCH · DATA · SYSTEMS
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}

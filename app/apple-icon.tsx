import { ImageResponse } from "next/og";

/** Apple touch icon (180×180 PNG) — the same CN2.DEV mark as /icon. */

export const size = {
    width: 180,
    height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#030712",
                    color: "#F5F8FF",
                    fontSize: 96,
                    position: "relative",
                }}
            >
                C2
                <div
                    style={{
                        position: "absolute",
                        right: 26,
                        bottom: 26,
                        width: 18,
                        height: 18,
                        borderRadius: 18,
                        backgroundColor: "#e6392a",
                    }}
                />
            </div>
        ),
        { ...size }
    );
}

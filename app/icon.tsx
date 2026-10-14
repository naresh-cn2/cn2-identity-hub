import { ImageResponse } from "next/og";

/**
 * Tab icon (32×32 PNG). Dark plate, white "C2", one signal-red dot —
 * the CN2.DEV mark at favicon scale.
 */

export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0a0a0c",
                    color: "#f1f1ee",
                    fontSize: 17,
                    borderRadius: 6,
                    position: "relative",
                }}
            >
                C2
                <div
                    style={{
                        position: "absolute",
                        right: 4,
                        bottom: 4,
                        width: 4,
                        height: 4,
                        borderRadius: 4,
                        backgroundColor: "#e6392a",
                    }}
                />
            </div>
        ),
        { ...size }
    );
}

/* Subtle technical-drawing guides: two faint dotted verticals with small plus
   marks where a top guide line crosses them. Purely decorative, non-interactive,
   desktop-only so it never crowds mobile. */
export function CrosshairGuides() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
    >
      <div className="crosshair-v" style={{ left: "9%" }} />
      <div className="crosshair-v" style={{ right: "9%" }} />
      <div
        className="crosshair-plus absolute"
        style={{ left: "9%", top: "16%" }}
      />
      <div
        className="crosshair-plus absolute"
        style={{ right: "9%", top: "16%" }}
      />
    </div>
  );
}

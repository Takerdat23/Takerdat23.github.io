export default function ThemeToggle() {
  return (
    <button
      className="theme-toggle"
      type="button"
      data-theme-toggle
      aria-label="Switch to dark mode"
      title="Switch to dark mode"
    >
      <span className="theme-toggle-icon" data-theme-toggle-icon aria-hidden="true">
        ☀
      </span>
      <span className="theme-toggle-label" data-theme-toggle-label>
        Light
      </span>
    </button>
  );
}

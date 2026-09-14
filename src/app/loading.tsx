import { AppLogo } from "@/components/app-logo";

export default function Loading() {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-content">
        <div className="loading-pulse-wrapper">
          <div className="loading-pulse-halo" aria-hidden="true" />
          <div className="loading-pulse-glow" aria-hidden="true" />
          <div className="loading-logo-box">
            <AppLogo size={72} className="loading-logo" />
          </div>
        </div>
        <div className="loading-text-group">
          <p className="loading-label">
            Memuat
            <span className="loading-dots" aria-hidden="true">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
        </div>
        <span className="sr-only">Sedang memuat data dari database...</span>
      </div>
    </div>
  );
}

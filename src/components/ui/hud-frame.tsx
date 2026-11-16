import type * as React from "react";
import { cn } from "@/lib/utils";

type HudFrameProps = React.ComponentProps<"div"> & {
  /** Rotulo opcional exibido sobre a borda superior, ex: "// SYS.PROFILE" */
  label?: string;
};

/**
 * Moldura estilo HUD: quatro cantoneiras + rotulo opcional.
 * Envolve um Card (ou qualquer bloco) sem alterar seu layout.
 */
export function HudFrame({ label, className, children, ...props }: HudFrameProps) {
  return (
    <div className={cn("hud-frame min-w-0", className)} {...props}>
      <span aria-hidden className="hud-corner hud-corner--tl" />
      <span aria-hidden className="hud-corner hud-corner--tr" />
      <span aria-hidden className="hud-corner hud-corner--bl" />
      <span aria-hidden className="hud-corner hud-corner--br" />
      {label && (
        <span aria-hidden className="hud-label">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

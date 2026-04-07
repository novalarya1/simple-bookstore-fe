"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/app/lib/utils";

// 1. Perbaikan pada skema warna agar lebih vibrant namun tetap soft
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs transition-all duration-300",
          // Style untuk elemen internal Recharts menggunakan Tailwind class
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground/80 [&_.recharts-cartesian-axis-tick_text]:font-medium",
          "[&_.recharts-cartesian-grid_line]:stroke-border/40",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
          "[&_.recharts-dot]:stroke-background [&_.recharts-dot]:stroke-2",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([, conf]) => conf.theme || conf.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
            ${prefix} [data-chart=${id}] {
              ${colorConfig.map(([key, item]) => {
                const color = item.theme?.[theme as keyof typeof item.theme] || item.color;
                return color ? `--color-${key}: ${color};` : null;
              }).join("\n")}
            }
          `).join("\n"),
      }}
    />
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  }) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" 
      ? config[label as keyof typeof config]?.label || label 
      : itemConfig?.label;

    if (labelFormatter) return <div className={cn("font-bold mb-1", labelClassName)}>{labelFormatter(value, payload)}</div>;
    if (!value) return null;
    return <div className={cn("font-bold mb-1", labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) return null;

  return (
    <div className={cn(
      "min-w-[9rem] rounded-xl border border-border bg-background/80 backdrop-blur-md p-2.5 shadow-2xl transition-all",
      className
    )}>
      {tooltipLabel}
      <div className="space-y-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <div key={index} className="flex items-center gap-2 text-[11px]">
              {itemConfig?.icon ? (
                <itemConfig.icon />
              ) : (
                <div 
                  className={cn("shrink-0 rounded-full", {
                    "h-2 w-2": indicator === "dot",
                    "w-0.5 h-3": indicator === "line",
                  })}
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <div className="flex flex-1 justify-between items-center gap-4">
                <span className="text-muted-foreground font-medium">{itemConfig?.label || item.name}</span>
                <span className="font-mono font-bold text-foreground">
                  {formatter && item.value !== undefined ? formatter(item.value, item.name, item, index, item.payload) : item.value?.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
  hideIcon?: boolean;
  nameKey?: string;
}) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div className={cn(
      "flex items-center justify-center gap-6 py-2",
      verticalAlign === "top" ? "pb-4" : "pt-4",
      className
    )}>
      {payload.map((item, idx) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div key={idx} className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-default">
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

// Helper (Sama seperti sebelumnya namun dengan safety check yang lebih kuat)
function getPayloadConfigFromPayload(config: ChartConfig, payload: any, key: string) {
  if (typeof payload !== "object" || payload === null) return undefined;
  const payloadPayload = payload.payload;
  let configLabelKey: string = key;

  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }

  return config[configLabelKey] || config[key];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
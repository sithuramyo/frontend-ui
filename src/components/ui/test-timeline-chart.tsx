import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import { Circle } from "@visx/shape";
import { format } from "date-fns";

type TestResult = "Positive" | "Negative" | "Inconclusive" | "Reactive" | "Non Reactive" | "Invalid" | string;

export interface GenericTestHistory {
  testDate: Date | string;
  finalResult: TestResult;
}

const defaultResultColor: Record<TestResult, string> = {
  Positive: "#ef4444",       // red
  Negative: "#10b981",       // green
  Inconclusive: "#f59e0b",   // yellow
  Reactive: "#ef4444",       // red
  "Non Reactive": "#10b981", // green
};

const TestingTimelineChart = ({
  data,
  title,
  resultColorMap = defaultResultColor,
}: {
  data: GenericTestHistory[];
  title?: string;
  resultColorMap?: Record<string, string>;
}) => {
  const width = 600;
  const height = 100;
  const margin = { top: 20, bottom: 20, left: 20, right: 20 };
  const y = height / 2;

  const formattedDates = data.map((d) => format(new Date(d.testDate), "dd MMM yyyy"));

  const xScale = scaleBand<string>({
    domain: formattedDates,
    range: [margin.left, width - margin.right],
    padding: 0.3,
  });

  return (
    <div className="space-y-2">
      {title && <h6 className="text-sm font-medium text-muted-foreground">{title}</h6>}
      <svg width="100%" height={height}>
        <Group>
          {/* Timeline base line */}
          <line
            x1={margin.left}
            x2={width - margin.right}
            y1={y}
            y2={y}
            stroke="#cbd5e1"
            strokeWidth={2}
          />

          {data.map((d, i) => {
            const label = format(new Date(d.testDate), "dd MMM yyyy");
            const x = xScale(label)!;
            const cx = x + xScale.bandwidth() / 2;
            const fill = resultColorMap[d.finalResult] || "#facc15";

            // Normalize result for consistent icon logic
            const normalizedResult = d.finalResult?.toLowerCase().replace(/\s+/g, "");

            const icon = (() => {
              if (normalizedResult === "positive" || normalizedResult === "reactive") {
                return (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </>
                );
              }
              if (normalizedResult === "negative" || normalizedResult === "nonreactive") {
                return (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                  </>
                );
              }
              return (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </>
              );
            })();

            return (
              <Group key={i}>
                <Circle cx={cx} cy={y} r={12} fill={fill} />
                <g
                  transform={`translate(${cx - 12}, ${y - 12})`}
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  {icon}
                </g>
                <text
                  x={cx}
                  y={y + 24}
                  fontSize={12}
                  fill="#334155"
                  textAnchor="middle"
                >
                  {format(new Date(d.testDate), "dd MMM")}
                </text>
              </Group>
            );
          })}
        </Group>
      </svg>
    </div>
  );
};

export default TestingTimelineChart;

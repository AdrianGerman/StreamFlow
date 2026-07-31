import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts"
import { useHistoryStats } from "../hooks/useHistoryStats"
import {
  TotalCard,
  ChartCard,
  CustomTooltip,
  tickStyle,
} from "../components/ChartWidgets"

const GREEN = "#7c3aed"
const PURPLE = "#aa3bff"
const PINK = "#e87aaa"
const CURSOR = { fill: "var(--border)", opacity: 0.3 }

const FILTERS = [
  { id: "all", label: "Todo" },
  { id: "stream", label: "Streams" },
  { id: "recording", label: "Grabaciones" },
]

export default function HistoryView({ buckets }) {
  const [filter, setFilter] = useState("all")
  const { weeks, totals } = useHistoryStats(buckets, filter)
  const hasData = weeks.length > 0

  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-xl font-semibold mb-1"
            style={{ color: "var(--text-h)" }}
          >
            Historial
          </h1>
          <p className="text-sm" style={{ color: "var(--text)" }}>
            Tu flujo de trabajo de las últimas 12 semanas.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="text-[12px] font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-150"
              style={{
                background:
                  filter === f.id ? "var(--sf-green)" : "var(--code-bg)",
                color: filter === f.id ? "#fff" : "var(--text)",
                borderColor: filter === f.id ? "transparent" : "var(--border)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <TotalCard
          label="Videos terminados"
          value={totals.videosCompleted}
          icon="✂️"
        />
        <TotalCard
          label="Shorts subidos"
          value={totals.shortsPosted}
          icon="📱"
        />
        <TotalCard label="Streams" value={totals.streams} icon="🎮" />
        <TotalCard label="Grabaciones" value={totals.recordings} icon="🎥" />
      </div>

      {!hasData ? (
        <div
          className="rounded-xl border border-dashed p-16 text-center"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-4xl mb-3">📊</p>
          <p
            className="text-sm font-medium mb-1"
            style={{ color: "var(--text-h)" }}
          >
            Sin datos{" "}
            {filter !== "all"
              ? `para ${FILTERS.find((f) => f.id === filter)?.label.toLowerCase()}`
              : "todavía"}
          </p>
          <p className="text-[13px]" style={{ color: "var(--text)" }}>
            El historial se llena a medida que completas videos y subes shorts.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <ChartCard
            title="Videos terminados por semana"
            sub="Cuántos videos completaste cada semana"
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeks} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                />
                <Tooltip content={<CustomTooltip />} cursor={CURSOR} />
                <Bar
                  dataKey="videosCompleted"
                  name="Videos"
                  fill={GREEN}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Shorts subidos por semana"
            sub="Cuántos shorts publicaste cada semana"
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeks} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                />
                <Tooltip content={<CustomTooltip />} cursor={CURSOR} />
                <Bar
                  dataKey="shortsPosted"
                  name="Shorts"
                  fill={PINK}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {filter === "all" && (
            <ChartCard
              title="VODs agregados por semana"
              sub="Streams vs grabaciones que fuiste agregando"
            >
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeks} barSize={20}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={tickStyle}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={tickStyle}
                    axisLine={false}
                    tickLine={false}
                    width={24}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={CURSOR} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 11, color: "var(--text)" }}
                  />
                  <Bar
                    dataKey="streamVods"
                    name="Streams"
                    fill={GREEN}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="recordingVods"
                    name="Grabaciones"
                    fill={PURPLE}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          <ChartCard
            title="Tendencia de productividad"
            sub="Videos + shorts combinados semana a semana"
          >
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={weeks.map((w) => ({
                  ...w,
                  total: w.videosCompleted + w.shortsPosted,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="label"
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Contenido total"
                  stroke={GREEN}
                  strokeWidth={2}
                  dot={{ fill: GREEN, strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </>
  )
}

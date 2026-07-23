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

const GREEN = "#1d9e75"
const PURPLE = "#aa3bff"
const PINK = "#e87aaa"

export default function HistoryView({ buckets }) {
  const { weeks, totals } = useHistoryStats(buckets)
  const hasData = weeks.length > 0

  return (
    <>
      <h1
        className="text-xl font-semibold mb-1"
        style={{ color: "var(--text-h)" }}
      >
        Historial
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--text)" }}>
        Tu flujo de trabajo de las últimas 12 semanas.
      </p>

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
            Sin datos todavía
          </p>
          <p className="text-[13px]" style={{ color: "var(--text)" }}>
            El historial se llena a medida que completas videos y subes shorts.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
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
                  tick={{ fontSize: 11, fill: "var(--text)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "var(--text)" }}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "var(--border)", opacity: 0.3 }}
                />
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
                  tick={{ fontSize: 11, fill: "var(--text)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "var(--text)" }}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "var(--border)", opacity: 0.3 }}
                />
                <Bar
                  dataKey="shortsPosted"
                  name="Shorts"
                  fill={PINK}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

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
                  tick={{ fontSize: 11, fill: "var(--text)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "var(--text)" }}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "var(--border)", opacity: 0.3 }}
                />
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
                  tick={{ fontSize: 11, fill: "var(--text)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "var(--text)" }}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                />
                <Tooltip content={<CustomTooltip />} />
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

function TotalCard({ label, value, icon }) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{ background: "var(--code-bg)", borderColor: "var(--border)" }}
    >
      <p className="text-xl mb-1">{icon}</p>
      <p
        className="text-2xl font-semibold mb-0.5"
        style={{ color: "var(--text-h)" }}
      >
        {value}
      </p>
      <p className="text-[11px]" style={{ color: "var(--text)" }}>
        {label}
      </p>
    </div>
  )
}

function ChartCard({ title, sub, children }) {
  return (
    <div
      className="rounded-xl p-5 border"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <p
        className="text-[14px] font-semibold mb-0.5"
        style={{ color: "var(--text-h)" }}
      >
        {title}
      </p>
      <p className="text-[12px] mb-4" style={{ color: "var(--text)" }}>
        {sub}
      </p>
      {children}
    </div>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-lg px-3 py-2 text-[12px] border"
      style={{
        background: "var(--bg)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <p className="font-semibold mb-1" style={{ color: "var(--text-h)" }}>
        Semana del {label}
      </p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  )
}

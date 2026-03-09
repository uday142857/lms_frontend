import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import "./Analytics.css";

// ── Mock data ────────────────────────────────────────────────────────────────
const courseRevenueData = [
  { name: "Responsible AI", revenue: 12800, students: 32 },
  { name: "Ethics in AI", revenue: 9600, students: 24 },
  { name: "Computer Vision", revenue: 25600, students: 64 },
  { name: "AI Fundamentals", revenue: 7600, students: 19 },
  { name: "Intro to ML", revenue: 19200, students: 48 },
  { name: "AI Fluency", revenue: 26000, students: 65 },
  { name: "AI for Educators", revenue: 17500, students: 50 },
  { name: "Student AI Readiness", revenue: 8960, students: 60 },
  { name: "Core Principles", revenue: 5990, students: 40 },
  { name: "Understanding AI", revenue: 18500, students: 31 },
];

const monthlyData = [
  { month: "Oct", revenue: 18400, students: 46 },
  { month: "Nov", revenue: 24200, students: 61 },
  { month: "Dec", revenue: 19800, students: 50 },
  { month: "Jan", revenue: 31000, students: 78 },
  { month: "Feb", revenue: 27500, students: 69 },
  { month: "Mar", revenue: 36200, students: 91 },
];

const totalSales = courseRevenueData.length;
const totalStudents = courseRevenueData.reduce((s, c) => s + c.students, 0);
const totalRevenue = courseRevenueData.reduce((s, c) => s + c.revenue, 0);

// ── Custom tooltip ───────────────────────────────────────────────────────────
const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="an-tooltip">
      <p className="an-tooltip-label">{label}</p>
      {payload.map((p) => (
        <p
          key={p.dataKey}
          className="an-tooltip-val"
          style={{ color: p.color }}
        >
          {p.name}:{" "}
          {p.dataKey === "revenue"
            ? `₹${p.value.toLocaleString("en-IN")}`
            : p.value}
        </p>
      ))}
    </div>
  );
};

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="an-stat-card">
      <div className="an-stat-icon" style={{ background: color + "18", color }}>
        <i className={`bi ${icon}`} />
      </div>
      <div className="an-stat-body">
        <p className="an-stat-label">{label}</p>
        <p className="an-stat-value">
          {value} <span className="an-stat-sub">{sub}</span>
        </p>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
function Analytics() {
  const [activeChart, setActiveChart] = useState("revenue");

  return (
    <div className="an-wrapper">
      {/* ── Heading ───────────────────────────────────────────────────────── */}
      <div className="an-heading">
        <h1 className="an-title">Analytics</h1>
        <p className="an-subtitle">Overview of your courses performance</p>
      </div>

      {/* ── Stat cards ────────────────────────────────────────────────────── */}
      <div className="an-stats">
        <StatCard
          icon="bi-journal-bookmark-fill"
          label="Total Sales"
          value={totalSales}
          sub="Courses"
          color="#2563eb"
        />
        <StatCard
          icon="bi-people-fill"
          label="Total Students"
          value={totalStudents.toLocaleString("en-IN")}
          sub="Students"
          color="#0891b2"
        />
        <StatCard
          icon="bi-currency-rupee"
          label="Total Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}.00`}
          sub=""
          color="#7c3aed"
        />
      </div>

      {/* ── Monthly trend ─────────────────────────────────────────────────── */}
      <div className="an-card">
        <div className="an-card-header">
          <div>
            <h2 className="an-card-title">Monthly Trend</h2>
            <p className="an-card-sub">
              Revenue & student growth over last 6 months
            </p>
          </div>
          <div className="an-toggle">
            <button
              className={`an-toggle-btn ${activeChart === "revenue" ? "an-toggle-btn--active" : ""}`}
              onClick={() => setActiveChart("revenue")}
            >
              Revenue
            </button>
            <button
              className={`an-toggle-btn ${activeChart === "students" ? "an-toggle-btn--active" : ""}`}
              onClick={() => setActiveChart("students")}
            >
              Students
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={monthlyData}
            margin={{ top: 8, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={
                activeChart === "revenue"
                  ? (v) => `₹${(v / 1000).toFixed(0)}k`
                  : undefined
              }
            />
            <Tooltip content={<CustomBarTooltip />} />
            {activeChart === "revenue" ? (
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#2563eb" }}
                activeDot={{ r: 6 }}
              />
            ) : (
              <Line
                type="monotone"
                dataKey="students"
                name="Students"
                stroke="#0891b2"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#0891b2" }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Revenue by course bar chart ────────────────────────────────────── */}
      <div className="an-card">
        <div className="an-card-header">
          <div>
            <h2 className="an-card-title">Revenue by Course</h2>
            <p className="an-card-sub">Total earnings per course</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={courseRevenueData}
            margin={{ top: 8, right: 20, left: 0, bottom: 60 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0f2fe"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Students by course bar chart ───────────────────────────────────── */}
      <div className="an-card">
        <div className="an-card-header">
          <div>
            <h2 className="an-card-title">Students by Course</h2>
            <p className="an-card-sub">Enrolment count per course</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={courseRevenueData}
            margin={{ top: 8, right: 20, left: 0, bottom: 60 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0f2fe"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar
              dataKey="students"
              name="Students"
              fill="#0891b2"
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Top courses table ──────────────────────────────────────────────── */}
      <div className="an-card">
        <div className="an-card-header">
          <div>
            <h2 className="an-card-title">Top Courses</h2>
            <p className="an-card-sub">Ranked by revenue</p>
          </div>
        </div>
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th className="an-th">#</th>
                <th className="an-th">Course</th>
                <th className="an-th">Students</th>
                <th className="an-th">Revenue</th>
                <th className="an-th">Share</th>
              </tr>
            </thead>
            <tbody>
              {[...courseRevenueData]
                .sort((a, b) => b.revenue - a.revenue)
                .map((c, i) => (
                  <tr key={c.name} className="an-tr">
                    <td className="an-td an-td--rank">
                      <span
                        className={`an-rank ${i < 3 ? "an-rank--top" : ""}`}
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="an-td an-td--name">{c.name}</td>
                    <td className="an-td">{c.students}</td>
                    <td className="an-td an-td--rev">
                      ₹{c.revenue.toLocaleString("en-IN")}
                    </td>
                    <td className="an-td an-td--bar">
                      <div className="an-bar-wrap">
                        <div
                          className="an-bar-fill"
                          style={{
                            width: `${Math.round((c.revenue / totalRevenue) * 100)}%`,
                          }}
                        />
                        <span className="an-bar-pct">
                          {Math.round((c.revenue / totalRevenue) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;

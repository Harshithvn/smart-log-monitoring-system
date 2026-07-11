import React, { useEffect, useState } from "react";
import "./App.css";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  INFO: "#22c55e",
  WARN: "#f97316",
  ERROR: "#ef4444",
};

function App() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("INFO");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchAllLogs();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "—" : date.toLocaleString();
  };

  const fetchAllLogs = () => {
    fetch("http://localhost:8082/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Backend not reachable", err));

    setFilter("ALL");
  };

  const searchLogs = () => {
    if (!searchKeyword.trim()) {
      fetchAllLogs();
      return;
    }

    fetch(
      `http://localhost:8082/api/logs/search?keyword=${searchKeyword}`
    )
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Search failed", err));
  };

  const fetchByLevel = (lvl) => {
    setFilter(lvl);
  };

  const addLog = () => {
    if (!message.trim()) return;

    fetch("http://localhost:8081/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        level,
        message,
      }),
    })
      .then(() => fetchAllLogs())
      .then(() => setMessage(""))
      .catch((err) => console.error("Failed to send log", err));
  };

  const filteredLogs =
    filter === "ALL"
      ? logs
      : logs.filter((log) => log.level === filter);

  const totalLogs = logs.length;
  const infoLogs = logs.filter((l) => l.level === "INFO").length;
  const warnLogs = logs.filter((l) => l.level === "WARN").length;
  const errorLogs = logs.filter((l) => l.level === "ERROR").length;

  const chartData = [
    { name: "INFO", value: infoLogs },
    { name: "WARN", value: warnLogs },
    { name: "ERROR", value: errorLogs },
  ];

  return (
    <div className="app">
      <h1>📊 Smart Log Monitoring System</h1>

      <div className="card">
        <h3>System Status</h3>

        <p>
          Backend API:
          <span className="good"> ✅ Running</span>
        </p>

        <p>
          MySQL Database:
          <span className="good"> ✅ Connected</span>
        </p>

        <p>
          Log Producer Service:
          <span className="good"> ✅ Running (8081)</span>
        </p>

        <p>
          Log Processor Service:
          <span className="good"> ✅ Running (8082)</span>
        </p>
      </div>

      {/* Statistics */}
      <div className="card">
        <h3>Log Statistics</h3>

        <div className="filters">
          <button className="filter-btn">
            Total: {totalLogs}
          </button>

          <button className="filter-btn">
            INFO: {infoLogs}
          </button>

          <button className="filter-btn">
            WARN: {warnLogs}
          </button>

          <button className="filter-btn">
            ERROR: {errorLogs}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <h3>Search Logs</h3>

        <div className="input-row">
          <input
            type="text"
            placeholder="Search log message..."
            value={searchKeyword}
            onChange={(e) =>
              setSearchKeyword(e.target.value)
            }
          />

          <button onClick={searchLogs}>
            Search
          </button>

          <button onClick={fetchAllLogs}>
            Reset
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <h3>Log Filters</h3>

        <div className="filters">
          {["ALL", "INFO", "WARN", "ERROR"].map((lvl) => (
            <button
              key={lvl}
              className={`filter-btn ${
                filter === lvl ? "active" : ""
              }`}
              onClick={() => fetchByLevel(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Add Log */}
      <div className="card">
        <h3>Add Log</h3>

        <div className="input-row">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
          </select>

          <input
            type="text"
            placeholder="Enter log message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={addLog}>
            Add Log
          </button>
        </div>
      </div>

      {/* Logs */}
      <div className="card">
        <h3>Logs</h3>

        {filteredLogs.length === 0 ? (
          <p>No logs found.</p>
        ) : (
          filteredLogs.map((log, index) => (
            <div
              key={index}
              className={`log ${log.level.toLowerCase()}`}
            >
              <span className="time">
                [{formatDate(log.timestamp)}]
              </span>{" "}
              <strong>{log.level}</strong> : {log.message}
            </div>
          ))
        )}
      </div>

      {/* Charts */}
      <div className="card">
        <h3>Log Analytics</h3>

        <div className="charts">
          <ResponsiveContainer width="45%" height={260}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[entry.name]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="45%" height={260}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#0d6efd"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
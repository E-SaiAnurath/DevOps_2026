import React, { useEffect, useState } from "react";
import api from "../api";

export default function Income() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/income");
        setItems(res.data);
      } catch {
        setErr("Failed to load income");
      }
    })();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Income</h2>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      <ul>
        {items.map((x) => (
          <li key={x.id}>
            {x.title} — {x.amount} — {x.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
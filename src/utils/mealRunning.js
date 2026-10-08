import { useEffect, useState } from "react";

// Bangladesh (Asia/Dhaka) er ekhon er weekday + minutes (HH*60+MM)
const dhakaNow = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return {
    weekday: get("weekday"),
    minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
  };
};

const toMinutes = (t) => {
  const [h = 0, m = 0] = String(t || "0:00").split(":").map(Number);
  return h * 60 + m;
};

// Meal ta ekhon "running" (start_time <= ekhon < end_time, ar din ta aajker) kina
export const isMealRunning = (meal) => {
  if (!meal) return false;
  const { weekday, minutes } = dhakaNow();
  if (meal.day !== weekday) return false;
  const start = toMinutes(meal.start_time);
  const end = toMinutes(meal.end_time);
  if (end <= start) return minutes >= start || minutes < end; // raat paar howa meal
  return minutes >= start && minutes < end;
};

// Prottek minute e re-render, jate time pare gele switch auto unlock hoy
export const useMinuteTick = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30 * 1000);
    return () => clearInterval(id);
  }, []);
  return tick;
};
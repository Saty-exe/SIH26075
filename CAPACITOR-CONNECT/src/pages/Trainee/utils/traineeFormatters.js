export const formatDate = (date) => new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export const initials = (name = "T") => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

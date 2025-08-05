import React, { useState } from "react";

export default function DragNDrop() {
  const [tasks, setTasks] = useState({
    "To Do": [{ id: 1, title: "Setup project" }],
    "In Progress": [{ id: 2, title: "Design UI" }],
    Review: [],
    Done: [],
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [border, setBorder] = useState(null);

  const columns = ["To Do", "In Progress", "Review", "Done"];

  const handleDragStart = (task, fromColumn) => {
    setDraggedTask({ ...task, fromColumn });
  };

  const handleDrop = (toColumn) => {
    if (!draggedTask || draggedTask.fromColumn === toColumn) return;

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      // Remove from source column
      updatedTasks[draggedTask.fromColumn] = updatedTasks[
        draggedTask.fromColumn
      ].filter((t) => t.id !== draggedTask.id);

      // Add to target column
      updatedTasks[toColumn] = [...updatedTasks[toColumn], { ...draggedTask }];

      return updatedTasks;
    });

    setDraggedTask(null);
  };

  return (
    <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
      {columns.map((col) => (
        <div
          key={col}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(col)}
          onDragEnter={() => setBorder(col)}
          style={{
            flex: 1,
            minHeight: "300px",
            padding: "12px",
            backgroundColor: "#f1f1f1",
            border: ` ${border == col ? "1px solid #00f" : "1px solid #ccc"}`,
            borderRadius: "8px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>{col}</h3>

          {tasks[col].map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(task, col)}
              onDragLeave={() => setBorder(null)}
              style={{
                backgroundColor: "#fff",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "4px",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                cursor: "grab",
              }}
            >
              {task.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

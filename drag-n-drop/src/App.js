import "./styles.css";
import DragNDrop from "./ components/DragNDrop";

export default function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Jira-style Task Board</h1>
      <DragNDrop />
    </div>
  );
}

import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Sample Task", completed: false },
  ]);
  const [newTask, setNewTask] = useState<string>("");
  const [showTasks, setShowTasks] = useState<boolean>(true);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const completeTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleTasks = () => {
    setShowTasks(!showTasks);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task"
          className="border p-2 w-full mb-2 rounded"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <button
        onClick={toggleTasks}
        className="bg-gray-500 text-white p-2 rounded mb-4 hover:bg-gray-600"
      >
        {showTasks ? "Hide Tasks" : "Show Tasks"}
      </button>
      {showTasks && (
        <ul className="list-disc pl-5">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-2 ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(task.id)}
                className="mr-2"
              />
              {task.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

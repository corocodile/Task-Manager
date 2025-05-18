import React, { useState } from "react";
import { StatsigProvider, useGate } from "statsig-react";

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

  const { value: isToggleEnabled } = useGate("task_list_toggle");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      window.statsig.logEvent("task_added", null, { taskText: newTask });
      setNewTask("");
    }
  };

  const completeTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    window.statsig.logEvent("task_completed", null, { taskId: id });
  };

  const toggleTasks = () => {
    setShowTasks(!showTasks);
    window.statsig.logEvent("tasks_toggled", null, { showTasks: !showTasks });
  };

  return (
    <StatsigProvider
      sdkKey="client-QMvoRfgBQa14O3wZYDCiO4I33p1Bl4ujNoUahHdaiMA" // Replace with your Statsig Client SDK Key
      user={{ userID: "guest" }}
      options={{ environment: { tier: "development" } }}
    >
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
        {isToggleEnabled && (
          <button
            onClick={toggleTasks}
            className="bg-gray-500 text-white p-2 rounded mb-4 hover:bg-gray-600"
          >
            {showTasks ? "Hide Tasks" : "Show Tasks"}
          </button>
        )}
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
    </StatsigProvider>
  );
};

export default App;

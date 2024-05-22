import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const TaskDashborad = () => {
  const [tasks, setTasks] = useState([]);
  const [filterdTasks, setFilteredTasks] = useState('');
  const [textInput, setTextInput] = useState("");
  const [descrition, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedTask, setSelectedTask] = useState(null);

  // UseEffect For StoredTasks in Local Stroage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // With Help Of State Management We Handle Input Change
  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };
  // handlePriorityChange
  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  // Handle Function When Click On Submit
  const handleTaskSubmit = () => {
    if (textInput.trim() === "") {
      return;
    }
    // Selecting The New Task To Put
    const newTask = {
      text: textInput,
      dueDate: dueDate,
      descrition: descrition,
      priority: selectedPriority,
      isCompleted : false,
    };

    setTasks([...tasks, newTask]);
    setTextInput("");
    setSelectedPriority("High");
  };

   console.log(tasks);
  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const handleEditTask = (editedText) => {
    alert(editedText)
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleChangePriority = (newPriority) => {
    console.log(selectedTask);
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task !== selectedTask);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleCompleteTask = (newStatus) => {
    console.log(newStatus);
    console.log(selectedTask);
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, isCompleted: newStatus } : task
    
  );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  return (
    <div className="p-8">
      <div className="lg:flex grid gap-2 items-center font-main">
        <div className="">
          <input
            type="text"
            value={textInput}
            onChange={handleTextInputChange}
            className="w-full lg:w-80 border rounded p-2"
            placeholder="Enter task"
          />
        </div>
        <div className="">
          <input
            type="date"
            value={dueDate}
            onChange={(e)=>setDueDate(e.target.value)}
            className="w-full lg:w-80 border rounded p-2"
            placeholder="Enter DueDate"
          />
        </div>
        <div className="">
          <input
            type="text"
            value={descrition}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full lg:w-80 border rounded p-2"
            placeholder="Enter Descriotion"
          />
        </div>
        <div className="w-full lg:w-80">
          <select
            value={selectedPriority}
            onChange={handlePriorityChange}
            className="w-full border rounded p-2"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
        <button onClick={handleTaskSubmit} className="btn btn-secondary">
          Add Task
        </button>
      </div>
      <div style={{padding: '1rem 0', display: 'flex', gap:'1rem', justifyContent : "flex-end"}}>
        <button onClick={()=>setFilteredTasks('completed')} className="btn btn-secondary">
          Completed
        </button>
        <button onClick={()=>setFilteredTasks('pending')} className="btn btn-secondary">
          Pending
        </button>
        <button onClick={()=>setFilteredTasks('')} className="btn btn-secondary">
          All
        </button>
      </div>

      <div className="mt-8 space-y-4 text-black ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* High Priority */}
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            level="High"
            handleCompleteTask={handleCompleteTask}
            setFilteredTasks={setFilteredTasks}
            filterdTasks={filterdTasks}
          />
          {/* Medium Priority */}
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            level="Medium"
            handleCompleteTask={handleCompleteTask}
            setFilteredTasks={setFilteredTasks}
            filterdTasks={filterdTasks}
          />
          {/* Low Priority */}
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            handleCompleteTask={handleCompleteTask}
            filterdTasks={filterdTasks}
            level="Low"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDashborad;

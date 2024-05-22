import React, { useState } from "react";
import Action from "./Action";

function Layout(props) {


  const [completedTasks, setCompletedTasks] = useState({});

  const toggleComplete = (taskId) => {
    // console.log(taskId)
    
    setCompletedTasks((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  return (
    <>
      <>
        <div className="bg-red-100 p-4 rounded border border-red-400">
          <h2 className="text-lg font-primary font-semibold mb-2">
            {props.level} Priority
          </h2>
          {props.getTasksByPriority(props.level).filter((item) => {
            if(props.filterdTasks === 'completed'){
              return item?.isCompleted === true;
            }
            else if(props.filterdTasks === 'pending'){
              return item?.isCompleted === false;
            }
            else{
              return true;
            }
          }).map((task, index) => (
            <div key={index} className="bg-white p-2 rounded mb-2">
              <p
                className="text-base cursor-pointer font-secondary w-100"
                onClick={() => props.setSelectedTask(task)}
                style={{display:'flex', justifyContent:"space-between"}}
              >
                <h5>{task.text}</h5>
                <p>{task.dueDate}</p>
              </p>
              <div style={{display:'flex', justifyContent:"space-between"}}>
              <p>{task.descrition}</p>
              <div > <input
                type="checkbox"
                checked={task?.isCompleted}
                onClick={() => {props.handleCompleteTask(true); props.setSelectedTask(task);}}
                disabled={task?.isCompleted}
              /> Completed</div>
              </div>
              {props.selectedTask === task && (
                <>
                  <Action
                    priority={props.level}
                    handleEditTask={props.handleEditTask}
                    handleChangePriority={props.handleChangePriority}
                    handleDeleteTask={props.handleDeleteTask}
                    selectedTask={props.selectedTask}
                    // handleCompleteTask={props.handleCompleteTask}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </>
    </>
  );
}

export default Layout;

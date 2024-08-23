import { useState } from 'react'
//import './App.css'
import Task from "./components/Task";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [validation, setValidation] = useState("");
    const [formDisplay, setFormDisplay] = useState(false);

/*convert input date from string to Date and sort tasks array from earliest date & time to latest*/
    const sorted = tasks.sort((a, b) => {
        return Date.parse(a.date + 'T' + a.time) - Date.parse(b.date + 'T' + b.time)
    });
    
   
/*Throw vailidation error if form is submitted with blank inputs, submit form update states */
    function handleFormSubmit(e) {
        e.preventDefault();

        if (!name) {
            setValidation("Please enter a task");
            return
        }
        if (!date) {
            setValidation("Please enter a due date");
            return
        }
        if (!time) {
            setValidation("Please enter a time due");
            return
        }
        else {
            setTasks([...tasks, {id: tasks.length + 1, name: name, date: date, time: time}]);
            setName("");
            setDate("");
            setTime("");
            setValidation("");
        }
    }

    /*Delete task */
    function handleTaskDelete(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    /*Conditional form display */
    if (formDisplay) {
        return (
            <div className="organizer-display">
                <div className="organizer-header top">
                    <h2>Try Out My Task Organizer</h2>
                    <button>View on Github <i className="fa-brands fa-github"></i></button>
                </div>
                <div className="organizer-header">
                    <h3>Organize Your Tasks</h3>
                    <button onClick={() => setFormDisplay(false)}>Close</button>
                </div>
            <form onSubmit={handleFormSubmit}>
                <div className="form-input">
                    <label htmlFor="task-name">Task:</label>
                    <input type="text" id="task-name" placeholder="Enter a task" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-input">
                    <label htmlFor="task-date">Due Date:</label>
                    <input type="date" id="task-date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className="form-input">
                    <label htmlFor="task-time">Time Due:</label>
                    <input type="time" id="task-time" value={time} onChange={e => setTime(e.target.value)} />
                </div>
                <div>
                    <div>{validation}</div>
                    <input type="submit" value="Save Task"/>
                </div>
            </form>
            <ul className="task-list">
                   <div className="task-container">{tasks.map(task => <li key={task.id} className="task-item">
                        <Task details={task} />
                        <button className="task-btn" onClick={() => handleTaskDelete(task.id)}><i class="fa-regular fa-trash-can"></i></button>
                    </li>)}</div>
            </ul>
            </div>
        )
    } else {
        return (
            <div className="organizer-display">
                <div className="top">
                    <h2>Try Out My Task Organizer</h2>
                    <button>View on Github <i className="fa-brands fa-github"></i></button>
                </div>
                <div>
                    <h3>Organize Your Tasks</h3>
                    <button onClick={() => setFormDisplay(true)}>Add a Task</button>
                </div>
            </div>
        )
    }

}
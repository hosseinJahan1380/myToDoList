
    //change theme
    const theme_toggle = document.querySelector(".theme-toggle i")
    const body = document.body

    theme_toggle.addEventListener("click" , ()=>{
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');

        if (body.classList.contains('dark-mode')) {
            theme_toggle.classList.replace('bx-sun', 'bx-moon');
        } else {
            theme_toggle.classList.replace('bx-moon', 'bx-sun');
        }
    })

  

const addTask = () => {

    const taskItem =document.getElementById("task_item").value;
   
    if(taskItem.trim()!= ""){


        const newItem = document.createElement("div");  //create a div for new task
        const task_text = document.createElement("span");
        task_text.textContent = taskItem;
        task_text.style.fontFamily = "Raleway";
        task_text.style.textDecoration = "none"

        newItem.appendChild(task_text)
        newItem.className = "new_task";


        const deleteBtn = document.createElement("i");  //create delete button
        const editBtn = document.createElement("i");    //create edit button
        const completeBtn = document.createElement("i");    //create complete button
        const btnContainer = document.createElement("div")  //create a container that holds buttons together
        
        deleteBtn.className ="bx bx-window-close";
        deleteBtn.id = "deleteIcon";

        editBtn.className="bx bx-pencil";
        editBtn.id = "editIcon"

        completeBtn.className="bx bx-circle";
        completeBtn.id = "completeIcon";

        btnContainer.className="task_buttons_container";

        btnContainer.appendChild(completeBtn);
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        newItem.appendChild(btnContainer)  //add task_buttons to new task
        document.querySelector(".tasks_list").appendChild(newItem);  //add new task to tasks_list

        updateTaskCount()

        document.getElementById("task_item").value = "";  
        document.querySelector(".tasks_list").style.display = "flex";

        //delete a task
        deleteBtn.addEventListener("click" ,()=>{
            newItem.remove()
            updateTaskCount()
        })

        // edit a task
        editBtn.addEventListener("click" ,()=>{
            task_text.contentEditable = task_text.isContentEditable ? "false" : "true";
            task_text.style.textDecoration = task_text.isContentEditable ? "underline" : "none";
            editBtn.className = task_text.isContentEditable ? "bx bx-save" : "bx bx-pencil";
            editBtn.style.color = task_text.isContentEditable ? "blue" : "yellow";
        })
        // complete a task
        completeBtn.addEventListener("click" , ()=>{
            task_text.style.textDecoration = task_text.style.textDecoration === "none" ? "line-through" : "none";
            completeBtn.className = task_text.style.textDecoration === "none" ? "bx bx-circle" : "bx bxs-check-circle";
            updateTaskCount()
        })
        const resetButtonColors = (btn) =>{
            document.getElementById("all_items").classList.remove("item_clicked")
            document.getElementById("active_items").classList.remove("item_clicked")
            document.getElementById("completed_items").classList.remove("item_clicked")
            document.getElementById("clear_completed_items").classList.remove("item_clicked")
            document.getElementById(btn).classList.add("item_clicked")
        }
        
        // show completed tasks
        document.getElementById("completed_items").addEventListener("click" , ()=>{
            resetButtonColors("completed_items")
            document.querySelectorAll(".tasks_list .new_task" ).forEach( (task)=>{
                const taskText = task.querySelector("span")
                if(taskText.style.textDecoration!=="line-through"){
                    task.style.display ="none";
                }
                else{
                    task.style.display ="flex";
                }
            })
        })
        // show all tasks
        document.getElementById("all_items").addEventListener("click" ,()=>{
            resetButtonColors("all_items")
            document.querySelectorAll(".tasks_list .new_task").forEach((task)=>{
                task.style.display = "flex"
            })
        })
        // show active tasks
        document.getElementById("active_items").addEventListener("click" , ()=>{
            resetButtonColors("active_items")
            document.querySelectorAll(".tasks_list .new_task" ).forEach( (task)=>{
                const taskText = task.querySelector("span")
                if(taskText.style.textDecoration==="line-through"){
                    task.style.display ="none";
                }
                else{
                    task.style.display ="flex";
                }
            })
        })
        // clear completed tasks
        document.getElementById("clear_completed_items").addEventListener("click" , ()=>{
            resetButtonColors("clear_completed_items")
            document.querySelectorAll(".tasks_list .new_task").forEach((task)=>{
                const taskText = task.querySelector("span")
                if(taskText.style.textDecoration==="line-through"){
                    task.remove()
                }
            })
        })
    }
}
// items below of tasks
const updateTaskCount = () =>{
    const remainingTasks = Array.from(document.querySelectorAll(".new_task span")).filter(
        (task) => task.style.textDecoration !== "line-through"
    ).length;
    document.getElementById("remaining_items").textContent = `${remainingTasks} items left`;
}

document.addEventListener("keydown" , (e)=>{
    if(e.code === "Enter") {
        addTask()
    }
})
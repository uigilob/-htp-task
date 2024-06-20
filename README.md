### Learn More

For more detailed information and advanced usage, please refer to the following links:
- [$htp](https://ui.gilob.in/ajax/$htp/)
- [$htp dynamic](https://ui.gilob.in/ajax/dynamic/)

#### Key Features:
1. **Automatic Task Execution:** Automatically execute tasks on page load.
2. **Recurring Tasks:** Set tasks to execute at regular intervals.
3. **Conditional Task Completion:** Define conditions for task completion.
4. **Data Binding:** Dynamically update element content based on response data.
5. **Task Abortion:** Cancel running tasks based on user interaction.

### Getting Started

To use the `$htp-task` extension, include the necessary JavaScript and set up your HTML with the appropriate attributes. 

#### Including the Script
Make sure to include the `$htp` and `$htp-task` scripts in your project:

```html
<script src="/htp-task/index.js"></script>
```

### Attributes and Options

#### Basic Attributes

- **`htp-tsk`**: Defines the task's timing or recurrence.
  - `auto`: Execute task on page load.
  - Time in milliseconds (e.g., `5` for 5 seconds).
  - JavaScript expressions (e.g., `60 * 5` for 5 minutes).

- **`htp-tsk-until`**: Defines conditions to stop the task. It can be based on status, headers, JSON response, or response text.
  - Examples:
    - `htp-tsk-until="status == 200"`
    - `htp-tsk-until="json.isOnline == true"`
    - `htp-tsk-until="header.content_type == 'application/json'"`

- **`htp-tsk-set`**: Specifies the data to update the element content.
  - Examples:
    - `htp-tsk-set="json.message"`
    - `htp-tsk-set="text"`

#### Control Attributes

- **`htp-tsk-abort`**: Abort the task. Can be set dynamically via JavaScript.
- **`htp-tsk-on`**: Indicates that the task is running. Automatically managed by the extension.
- **`htp-tsk-done`**: Indicates task completion. Automatically managed by the extension.
- **`htp-tsk-cancled`**: Indicates task cancellation. Automatically managed by the extension.

### Examples

#### Example 1: Automatic Task Execution

Automatically execute a task on page load and update an element with the response data.

```html
<div
  class="my-task"
  htp-get="/task-status"
  htp-query='{"user":"active"}'
  htp-tsk="auto"
> 
 
```

#### Example 2: Recurring Task Every 5 Seconds

Execute a task every 5 seconds until a certain condition is met.

```html
<style>
        .my-task[htp-tsk-on] {
            /* Task is starting */
            background-color: #f0f0f0;
        }
         .my-task[htp-tsk-s='404']{
           display: none;
      }
        .input-chat  {
            display: none;
        }
        .my-task[htp-tsk-json-s="100"] .input-chat {
            display: block;
        }
</style>
<div
  class="my-task"
  htp-get="/task-live"
  htp-query='{"name":"value"}'
  htp-swap="append"
  htp-tsk="5"  <!-- Every 5 seconds -->
  htp-tsk-until="json.isOnline == true && json.status == 100"
  htp-tsk-set="json.username"
> 
  <div class="username" htp-data="">
    <!-- Username will be updated here -->
  </div>
  <input class="input-chat">
</div>
```

#### Example 3: Aborting a Task

Include a button to abort the running task.

```html
<div
  class="my-task"
  htp-get="/task-live"
  htp-query='{"name":"value"}'
  htp-swap="append"
  htp-tsk="auto"
  htp-tsk-until="json.isOnline == true && json.status == 100"
  htp-tsk-set="json.username"
> 
  <div class="username" htp-data="">
    <!-- Username will be updated here -->
  </div>
  <input class="input-chat">
</div>
<button id="abort-task-button">Abort Task</button>

<script>
    document.getElementById("abort-task-button").addEventListener("click", function(){
        document.querySelector(".my-task").setAttribute("htp-tsk-abort", true);
    });
</script>
```



These resources will provide you with comprehensive guides, examples, and best practices to effectively utilize the `$htp` and `$htp-task` extensions in your projects.

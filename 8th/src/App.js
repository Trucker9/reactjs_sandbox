import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';
function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback((taskObj) => {
    const loadedTasks = [];
    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }
    setTasks(loadedTasks);
    // No dependencies needed. Note that setTasks is guaranteed to never change.
  }, []);

  const { isLoading, error, sendReq: fetchTasks } = useHttp(transformTasks);

  useEffect(() => {
    fetchTasks({
      url: 'https://react-course-4b234-default-rtdb.europe-west1.firebasedatabase.app//tasks.json',
    });
    // Here if we add fetchTasks to the dependencies, we will create infinite loop.
    /* first time fetchTasks runs, it fetchTasks are some states which are tied to App
    AKA the component that used the custom hook.
    fetchTasks changes those states, causing the App to run again.
    by running the App for the "n"th time, the custom hook will be called again.
    in that custom hook we will re create sendReq function, and returning that
    new function here.
    That returned function is fetchTask, so it changes and causes the useEffect 
    to trigger.
    */
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

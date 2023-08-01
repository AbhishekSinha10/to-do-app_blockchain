import { useState } from "react";
import Navigation from "../components/Navigation";
const DeleteTask = () => {
  const [taskID, setTaskID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleTaskIDChange = (event) => {
    setTaskID(event.target.value);
  };

  const deleteTask = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/ethereum/delete-task/${taskID}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === 200) {
        // Task deleted successfully
        setModalContent("Task deleted successfully!");
        setModalVisible(true);
        setTaskID("");
      } else {
        throw new Error();
      }
    } catch (error) {
      setModalContent("Failed to delete task");
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  return (
    <>
     <Navigation/>
      <div className="delete_task">
        <form onSubmit={deleteTask}>
          <label>
            Task ID:
            <input type="text" value={taskID} onChange={handleTaskIDChange} />
          </label>
          <div className="button-container">
          <button type="submit">Delete Task</button>
        </div>
        </form>
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteTask;

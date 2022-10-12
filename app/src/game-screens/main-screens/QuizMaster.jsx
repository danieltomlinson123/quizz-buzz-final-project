// ================== Imports ================== //

import { useState, useEffect } from "react";

import {
  TeacherStudentSelectPanel,
  QuizStudentMaster,
  QuizTeacherMaster,
} from ".";

// ================== socket connection ================== //

import io from "socket.io-client";
const socket = io.connect("http://localhost:8080", { autoconnect: false });

// ================== Component ================== //

function QuizMasterPage({
  handleFeedback,
  handleLeaveClass,
  handleGameBeingPlayed,
  gameBeingPlayed,
}) {
  // ================== Hook constants ================== //

  const [userType, setUserType] = useState("Home");

  // ================== useEffects ================== //

  useEffect(() => {
    socket.connect();
  }, []);

  // ================== Functions ================== //

  const handleLeaveClick = () => {};

  const onLeaveClass = () => {
    handleLeaveClass();
  };

  const handleStartStudent = (userType) => {
    setUserType(userType);
  };

  const handleStartTeacher = (userType) => {
    setUserType(userType);
  };

  // ================== jsx ================== //

  return (
    <main className="game-screen" name="quickPlayPageMain">
      {userType === "Home" && (
        <TeacherStudentSelectPanel
          handleLeaveClick={handleLeaveClick}
          handleStartStudent={handleStartStudent}
          handleStartTeacher={handleStartTeacher}
          handleLeaveClass={onLeaveClass}
          gameBeingPlayed={gameBeingPlayed}
        />
      )}
      {userType === "Student" && (
        <QuizStudentMaster
          handleLeaveClick={handleLeaveClick}
          socket={socket}
          handleFeedback={handleFeedback}
          handleLeaveClass={onLeaveClass}
          gameBeingPlayed={gameBeingPlayed}
        />
      )}
      {userType === "Teacher" && (
        <QuizTeacherMaster
          handleLeaveClick={handleLeaveClick}
          socket={socket}
          handleLeaveClass={onLeaveClass}
          handleGameBeingPlayed={handleGameBeingPlayed}
          gameBeingPlayed={gameBeingPlayed}
        />
      )}
    </main>
  );
}

export default QuizMasterPage;

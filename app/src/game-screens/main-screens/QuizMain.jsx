// ================== Imports ================== //
import "./QuizMain.css";
import "../game-screens.css";

import { useState, useEffect } from "react";

import { TeacherStudentSelectPanel, QuizStudentMain, QuizTeacherMain } from ".";

// ================== socket connection ================== //

import io from "socket.io-client";
import Student9ClassClosed from "../student/Student-9-ClassClosed";
const socket = io.connect("http://localhost:8080", { autoconnect: false });

// ================== Component ================== //

function QuizMainPage({
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
        <QuizStudentMain
          handleLeaveClick={handleLeaveClick}
          socket={socket}
          handleFeedback={handleFeedback}
          handleLeaveClass={onLeaveClass}
          gameBeingPlayed={gameBeingPlayed}
        />
      )}
      {userType === "Teacher" && (
        <QuizTeacherMain
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

export default QuizMainPage;

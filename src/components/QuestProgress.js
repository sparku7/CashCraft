import React from 'react';

const QuestProgress = ({ completed, total }) => {
  return (
    <section className="progress-bar">
      <h3>Quest Progress</h3>
      <progress value={completed} max={total}></progress>
      <p>{completed} of {total} quests completed</p>
    </section>
  );
};

export default QuestProgress;

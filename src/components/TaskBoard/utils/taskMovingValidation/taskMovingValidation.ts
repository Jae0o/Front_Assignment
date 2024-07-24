type TaskMovingValidation = (params: { start: string; end: string }) => boolean;

const taskMovingValidation: TaskMovingValidation = ({ start, end }) => {
  if (start === "NO_STATUS" && end === "IN_PROGRESS") {
    return true;
  }

  if (start === "TODO" && end === "DONE") {
    return true;
  }

  if (start === "DONE" && end === "TODO") {
    return true;
  }

  return false;
};

export default taskMovingValidation;

import * as S from "./TaskList.styles";

import { Draggable, Droppable } from "react-beautiful-dnd";

interface TaskListProps {
  items: { id: string; content: string }[];
}

const TaskList = ({ items }: TaskListProps) => {
  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <S.TaskListContainer
          {...provided.droppableProps}
          ref={provided.innerRef}
          $isDraggingOver={snapshot.isDraggingOver}
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <S.TaskItem
                  ref={provided.innerRef}
                  $isDragging={snapshot.isDragging}
                  style={{
                    ...provided.draggableProps.style,
                  }}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {item.content}
                </S.TaskItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </S.TaskListContainer>
      )}
    </Droppable>
  );
};

export default TaskList;

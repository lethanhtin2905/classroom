import "./GradeStructure.css";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListItem from "./ListGradeItem";
import Button from '@mui/material/Button';

const elements = [
    { id: "one", content: "one" },
    { id: "two", content: "two" },
    { id: "three", content: "three" },
    { id: "four", content: "four" }
];

export default function DragAndDropList() {
    const [items, setItems] = useState(elements);

    console.log(items)
    const onDragEnd = (result) => {
        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        setItems(newItems);
        console.log(newItems)

    };

    return (
        <div className="grade-structure__container">
            <div className="grade-structure__content">
                GRADE STRUCTURE
            </div>
            <DragDropContext onDragEnd={onDragEnd} >
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <ListItem
                                            provided={provided}
                                            snapshot={snapshot}
                                            item={item}
                                        />
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="btn-add">
                <Button variant="contained">ADD</Button>
            </div>
        </div>

    );
}


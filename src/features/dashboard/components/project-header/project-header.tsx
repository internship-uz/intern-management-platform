import { useState } from "react";
import { EditableTitle } from "./editable-title";

export function ProjectHeader() {
  const [title, setTitle] = useState("My Software Team");

  return (
    <div className='flex flex-wrap items-center justify-between gap-3'>
      <EditableTitle value={title} onChange={setTitle} />
    </div>
  );
}

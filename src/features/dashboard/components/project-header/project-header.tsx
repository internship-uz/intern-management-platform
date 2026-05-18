import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import { EditableTitle } from "./editable-title";

export function ProjectHeader() {
  const [title, setTitle] = useState("My Software Team");

  return (
    <div className='flex flex-wrap items-center justify-between gap-3'>
      <div className='flex flex-col leading-tight'>
        <span className='text-[11px] text-muted-foreground'>Spaces</span>
        <EditableTitle value={title} onChange={setTitle} />
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='sm'>
          <StarIcon data-icon='inline-start' />
          Star
        </Button>
        <Button variant='outline' size='sm'>
          Share
        </Button>
        <Button size='sm'>Create</Button>
      </div>
    </div>
  );
}

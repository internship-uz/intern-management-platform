import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

export function Toolbar() {
  return (
    <div className='flex items-center justify-between'>
      <Button variant='outline' size='sm'>
        <FilterIcon data-icon='inline-start' />
        Filter
      </Button>
    </div>
  );
}

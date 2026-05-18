import { useState, useMemo } from "react";
import { useTasks } from "../hooks/use-tasks";
import { useInterns } from "../../interns/hooks/use-interns";
import type { TaskStatus, TaskPriority, IssueType } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Plus, XIcon } from "lucide-react";
import { IssueList } from "../../dashboard/components/issue-list";
import { cn } from "@/lib/utils";

export type FilterValue<T> = T | "all";

export function Task() {
  const { tasks, loading, updateTask, createTask, removeTasks } = useTasks();
  const { interns } = useInterns();
  
  const [activeAssignee, setActiveAssignee] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<FilterValue<TaskStatus>>("all");
  const [priorityFilter, setPriorityFilter] = useState<FilterValue<TaskPriority>>("all");
  
  const [isCreating, setIsCreating] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>("medium");
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>("todo");
  const [newTaskType, setNewTaskType] = useState<IssueType>("task");

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchAssignee = !activeAssignee || t.assigneeId === activeAssignee;
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
      return matchAssignee && matchStatus && matchPriority;
    });
  }, [tasks, activeAssignee, statusFilter, priorityFilter]);

  const activeCount = 
    (activeAssignee ? 1 : 0) + 
    (statusFilter !== "all" ? 1 : 0) + 
    (priorityFilter !== "all" ? 1 : 0);

  const handleClearFilters = () => {
    setActiveAssignee(null);
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const handleCreate = async () => {
    if (!newTaskTitle || !newTaskAssignee) return;
    await createTask({
      title: newTaskTitle,
      assigneeId: newTaskAssignee,
      status: newTaskStatus,
      priority: newTaskPriority,
      type: newTaskType
    });
    setNewTaskTitle("");
    setNewTaskAssignee("");
    setNewTaskPriority("medium");
    setNewTaskStatus("todo");
    setNewTaskType("task");
    setIsCreating(false);
  };

  if (loading && tasks.length === 0) {
    return <div className="py-12 text-center text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className='mx-auto flex w-full max-w-7xl flex-col gap-4'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tasks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex items-center gap-2'>
          <Sheet open={isCreating} onOpenChange={setIsCreating}>
            <SheetTrigger asChild>
              <Button size='sm'>
                <Plus className="mr-1 h-3 w-3" />
                Create
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Create new issue</SheetTitle>
                <SheetDescription>
                  Enter the details of the new issue and save.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 py-6">
                {/* User / Assignee Row */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assignee</label>
                  <Select value={newTaskAssignee} onValueChange={setNewTaskAssignee}>
                    <SelectTrigger className="w-full">
                      {newTaskAssignee ? (
                        (() => {
                          const selected = interns.find(i => i.id === newTaskAssignee);
                          return selected ? (
                            <div className="flex items-center gap-2">
                              <Avatar size="sm" className="h-5 w-5">
                                <AvatarImage src={selected.avatar} />
                                <AvatarFallback>{selected.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{selected.name}</span>
                            </div>
                          ) : <SelectValue placeholder="Select assignee" />;
                        })()
                      ) : (
                        <SelectValue placeholder="Select assignee" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {interns.map(i => (
                        <SelectItem key={i.id} value={i.id}>
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarImage src={i.avatar} />
                              <AvatarFallback>{i.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {i.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Summary and Issue Type Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Summary</label>
                    <Input 
                      placeholder="e.g., Fix the login page..." 
                      value={newTaskTitle} 
                      onChange={(e) => setNewTaskTitle(e.target.value)} 
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Issue Type</label>
                    <Select value={newTaskType} onValueChange={(val: IssueType) => setNewTaskType(val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="task">Task</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="epic">Epic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Status Row */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={newTaskStatus} onValueChange={(val: TaskStatus) => setNewTaskStatus(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority Row */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={newTaskPriority} onValueChange={(val: TaskPriority) => setNewTaskPriority(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="highest">Highest</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="lowest">Lowest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <SheetFooter>
                <div className="flex items-center justify-end gap-3 w-full">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={!newTaskTitle || !newTaskAssignee}>Create</Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {/* Filters styling identical to BoardFilters */}
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div className='flex flex-wrap items-center gap-2'>
            <div className='flex items-center -space-x-2'>
              {interns.map((m) => {
                const active = activeAssignee === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveAssignee(active ? null : m.id)}
                    title={m.name}
                    className={cn(
                      "relative rounded-full ring-2 ring-background transition-transform hover:z-10 hover:-translate-y-0.5",
                      active && "z-10 ring-primary"
                    )}
                  >
                    <Avatar size='sm'>
                      <AvatarImage src={m.avatar} />
                      <AvatarFallback>{m.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </button>
                );
              })}
            </div>

            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as FilterValue<TaskStatus>)}
            >
              <SelectTrigger size='sm' className='min-w-[120px]'>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All statuses</SelectItem>
                <SelectItem value='todo'>To Do</SelectItem>
                <SelectItem value='in_progress'>In Progress</SelectItem>
                <SelectItem value='done'>Done</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={priorityFilter}
              onValueChange={(v) => setPriorityFilter(v as FilterValue<TaskPriority>)}
            >
              <SelectTrigger size='sm' className='min-w-[140px]'>
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All priorities</SelectItem>
                <SelectItem value='highest'>Highest</SelectItem>
                <SelectItem value='high'>High</SelectItem>
                <SelectItem value='medium'>Medium</SelectItem>
                <SelectItem value='low'>Low</SelectItem>
                <SelectItem value='lowest'>Lowest</SelectItem>
              </SelectContent>
            </Select>

            {activeCount > 0 && (
              <Button variant='ghost' size='sm' className="h-8 px-2 text-xs" onClick={handleClearFilters}>
                <XIcon className="w-3 h-3 mr-1" />
                Clear ({activeCount})
              </Button>
            )}
          </div>
        </div>

        {/* The Exact Table Layout */}
        <IssueList 
          tasks={filteredTasks} 
          interns={interns} 
          onStatusChange={(taskId, status) => updateTask(taskId, { status })} 
          onPriorityChange={(taskId, priority) => updateTask(taskId, { priority })}
          onDelete={(taskIds) => removeTasks(taskIds)}
        />
      </div>
    </div>
  );
}
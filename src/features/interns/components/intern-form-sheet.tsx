import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useInterns } from "../hooks/use-interns";
import type { Intern, Direction, Level, InternStatus } from "../types";

export function InternFormSheet({ intern, trigger }: { intern?: Intern; trigger?: React.ReactNode }) {
  const { createIntern, updateIntern } = useInterns();
  const [open, setOpen] = useState(false);
  const isEdit = !!intern;

  const [formData, setFormData] = useState({
    name: intern?.name || "",
    email: intern?.email || "",
    direction: intern?.direction || "Frontend",
    level: intern?.level || "Trainee",
    status: intern?.status || ("active" as InternStatus),
    avatar: intern?.avatar || ""
  });

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      if (intern) {
        setFormData({
          name: intern.name,
          email: intern.email,
          direction: intern.direction,
          level: intern.level,
          status: intern.status,
          avatar: intern.avatar || ""
        });
      } else {
        setFormData({ 
          name: "", 
          email: "", 
          direction: "Frontend", 
          level: "Trainee", 
          status: "active" as InternStatus, 
          avatar: "" 
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && intern) {
      await updateIntern(intern.id, {
        ...formData,
        direction: formData.direction as Direction,
        level: formData.level as Level,
        status: formData.status as InternStatus,
      });
    } else {
      await createIntern({
        ...formData,
        direction: formData.direction as Direction,
        level: formData.level as Level,
        status: formData.status as InternStatus,
        joinedAt: new Date().toISOString().split("T")[0]
      });
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {trigger ? (
        <SheetTrigger render={trigger} />
      ) : (
        <SheetTrigger render={<Button />}>
          <Plus className="w-4 h-4 mr-2" /> Add Intern
        </SheetTrigger>
      )}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit Intern" : "Add New Intern"}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input id="avatar" type="url" placeholder="https://..." value={formData.avatar} onChange={(e) => setFormData({ ...formData, avatar: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="direction">Direction</Label>
            <Input id="direction" value={formData.direction} onChange={(e) => setFormData({ ...formData, direction: e.target.value })} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Level</Label>
            <Select value={formData.level} onValueChange={(val) => setFormData({ ...formData, level: val })}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Trainee">Trainee</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Middle">Middle</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="mt-4">{isEdit ? "Save Changes" : "Save Intern"}</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

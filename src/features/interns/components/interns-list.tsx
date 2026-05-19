import { useInterns } from "../hooks/use-interns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InternFormSheet } from "./intern-form-sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { Intern } from "../types";

export function InternsList() {
  const { interns, loading, removeIntern } = useInterns();
  const [deleteTarget, setDeleteTarget] = useState<Intern | null>(null);

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    removeIntern(deleteTarget.id);
    setDeleteTarget(null);
  }

  if (loading && interns.length === 0) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Interns List</h1>
        <InternFormSheet
          trigger={
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add Intern
            </Button>
          }
        />
      </div>

      <div className="rounded-md border p-4 bg-white dark:bg-zinc-950">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 dark:bg-zinc-900 border-b">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Direction</th>
              <th className="p-3">Level</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {interns.map((intern) => (
              <tr key={intern.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900">
                <td className="p-3 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={intern.avatar} />
                    <AvatarFallback>{intern.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{intern.name}</span>
                </td>
                <td className="p-3">{intern.email}</td>
                <td className="p-3">{intern.direction}</td>
                <td className="p-3">{intern.level}</td>
                <td className="p-3">
                  <Badge variant={intern.status === "active" ? "default" : "secondary"}>
                    {intern.status}
                  </Badge>
                </td>
                <td className="p-3 text-right">
                  <InternFormSheet
                    intern={intern}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4 text-blue-500" />
                      </Button>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(intern)}
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete intern</DialogTitle>
            <DialogDescription>
              {deleteTarget
                ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

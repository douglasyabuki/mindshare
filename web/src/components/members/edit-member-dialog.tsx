import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UPDATE_USER } from "@/lib/graphql/mutations/members";
import type { User } from "@/types";
import { useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";

interface EditMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: User | null;
  onUpdated?: (user: User) => void;
}

const ROLE_OPTIONS = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
  { value: "viewer", label: "Viewer" },
];

export const EditMemberDialog = ({
  open,
  onOpenChange,
  member,
  onUpdated,
}: EditMemberDialogProps) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>("member");

  useEffect(() => {
    setName(member?.name ?? "");
    setRole(member?.role ?? "member");
  }, [member]);

  type UpdateUserMudationData = { updateUser: User };
  type UpdateUserVariables = {
    id: string;
    data: { name?: string; role?: string };
  };

  const [updateUserMutation, { loading }] = useMutation<
    UpdateUserMudationData,
    UpdateUserVariables
  >(UPDATE_USER, {
    onCompleted: (res: UpdateUserMudationData) => {
      setName("");
      setRole("member");
      const updated = res.updateUser;
      if (updated) {
        onUpdated?.(updated);
      }
      onOpenChange(false);
    },
  });

  const handleSubmit = async () => {
    if (!member) return;
    await updateUserMutation({
      variables: {
        id: member.id,
        data: {
          name,
          role,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-role">Role</Label>
            <select
              id="edit-role"
              className="bg-background h-10 w-full rounded-md border px-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input value={member?.email ?? ""} disabled />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

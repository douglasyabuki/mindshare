import { DELETE_USER } from "@/lib/graphql/mutations/members";
import { LIST_MEMBERS } from "@/lib/graphql/queries/members";
import type { User } from "@/types";
import { useMutation } from "@apollo/client/react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DeleteMemberDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: User | null;
}

export const DeleteMemberDialog = ({
  open,
  onOpenChange,
  member,
}: DeleteMemberDialog) => {
  const [deleteUserMutation, { loading }] = useMutation(DELETE_USER, {
    onCompleted: () => {
      onOpenChange(false);
    },
    refetchQueries: [LIST_MEMBERS],
  });

  const handledeleteUser = async () => {
    if (!member) return;
    await deleteUserMutation({
      variables: {
        id: member.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove User</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm">
          Are you sure you want to remove
          <span className="font-medium"> {member?.name}</span>? This action
          cannot be undone.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handledeleteUser}
            disabled={loading}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

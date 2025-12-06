import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DELETE_IDEA } from "@/lib/graphql/mutations/idea";
import type { Idea } from "@/types";
import { useMutation } from "@apollo/client/react";

interface DeleteIdeaDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idea: Idea | null;
  onDeleted?: () => void;
}

export const DeleteIdeaDialog = ({
  open,
  onOpenChange,
  idea,
  onDeleted,
}: DeleteIdeaDialog) => {
  type DeleteIdeaMutationData = { deleteIdea: boolean };
  type DeleteIdeaVariables = { id: string };

  const [deleteIdeaMutation, { loading }] = useMutation<
    DeleteIdeaMutationData,
    DeleteIdeaVariables
  >(DELETE_IDEA, {
    onCompleted: () => {
      onDeleted?.();
      onOpenChange(false);
    },
  });

  const handleDelete = async () => {
    if (!idea) return;
    await deleteIdeaMutation({
      variables: {
        id: idea.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Idea</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this idea? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p className="text-sm font-medium">Idea:</p>
          <p className="text-muted-foreground text-sm">{idea?.title}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

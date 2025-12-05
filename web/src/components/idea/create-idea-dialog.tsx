import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CREATE_IDEA } from "@/lib/graphql/mutations/idea";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateIdeaDialog {
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onCreated?: () => void;
}

export const CreateIdeaDialog = ({
  open,
  onOpenChange,
  onCreated,
}: CreateIdeaDialog) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createIdea, { loading }] = useMutation(CREATE_IDEA, {
    onCompleted() {
      toast.success("Idea created successfuly");
      onOpenChange(false);
      onCreated?.();
    },
    onError() {
      toast.error("Failed to create idea");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createIdea({
      variables: {
        data: {
          title,
          description,
        },
      },
    });
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl leading-tight font-bold">
            Share your idea
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Add a new idea for your team
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-sm font-normal">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Give a name for your idea"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              disabled={loading}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm font-normal">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your idea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="resize-none"
              disabled={loading}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContentRight,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CREATE_COMMENT } from "@/lib/graphql/mutations/comment";
import { TOGGLE_VOTE } from "@/lib/graphql/mutations/vote";
import { GET_IDEA } from "@/lib/graphql/queries/idea";
import type { Idea } from "@/types";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CommentArea } from "./comment-area";
import { CommentsList } from "./comments-list";

interface IdeaDetailDrawer {
  ideaId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IdeaDetailDrawer({
  open,
  onOpenChange,
  ideaId,
}: IdeaDetailDrawer) {
  const [commentContent, setCommentContent] = useState("");

  const [getIdeaQuery, { data, loading }] = useLazyQuery<{ getIdea: Idea }>(
    GET_IDEA,
  );

  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_IDEA, variables: { ideaId } }],
    onCompleted: () => {
      setCommentContent("");
    },
  });

  const [toggleVoteMutation] = useMutation(TOGGLE_VOTE, {
    refetchQueries: [{ query: GET_IDEA, variables: { ideaId } }],
  });

  const handleToggleVote = () => {
    toggleVoteMutation({
      variables: {
        ideaId,
      },
    });
  };

  const handleAddComment = () => {
    if (!commentContent) toast.error("Por favor insira um comentário");

    createCommentMutation({
      variables: {
        ideaId,
        data: {
          content: commentContent,
        },
      },
    });
  };

  useEffect(() => {
    getIdeaQuery({
      variables: {
        ideaId,
      },
    });
  }, [ideaId]);

  const { getIdea: idea } = data || {};

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContentRight className="flex flex-col rounded-l-2xl">
        <div className="flex-shrink-0 rounded-l-2xl bg-slate-100 p-6">
          <div className="flex items-start justify-between">
            <DrawerTitle className="flex-1 pr-4 text-2xl font-bold">
              {idea?.title || "Carregando..."}
            </DrawerTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {idea && (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {idea?.description || ""}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-6">
          <CommentsList comments={idea?.comments || []} loading={loading} />
        </div>
        <CommentArea
          commentContent={commentContent || ""}
          setCommentContent={setCommentContent}
          handleAddComment={handleAddComment}
          handleVote={handleToggleVote}
          idea={idea}
        />
      </DrawerContentRight>
    </Drawer>
  );
}

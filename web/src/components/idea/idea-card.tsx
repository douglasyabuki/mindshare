import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisibilityGuard } from "@/components/visibility-guard";
import { formatRelativeDate } from "@/lib/utils";
import type { Idea } from "@/types";
import { MessageSquare, ThumbsUp, Trash2 } from "lucide-react";

interface IdeaCard {
  idea: Idea;
  onClick: () => void;
  onDelete?: () => void;
}

export const IdeaCard = ({ idea, onClick, onDelete }: IdeaCard) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <Card
      key={idea.id}
      onClick={onClick}
      className="cursor-pointer transition-shadow hover:shadow-lg"
    >
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-primary-foreground bg-zinc-950 text-sm">
                  {idea.author?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="line-clamp-1 text-sm font-medium">
                {idea.author?.name || "User"}
              </span>
            </div>
            <VisibilityGuard
              userIds={[idea.authorId]}
              roles={["admin", "owner"]}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={handleDeleteClick}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </VisibilityGuard>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="hover:text-primary line-clamp-2 text-xl text-zinc-950 transition-colors">
          {idea.title}
        </div>
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {idea.description || ""}
        </p>
        <div className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground flex items-center gap-3 rounded-md border border-zinc-200 px-3 py-1 text-sm">
              <MessageSquare className="text-primary h-4 w-4" />
              <span>{idea.comments?.length || 0}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-3 rounded-md border border-zinc-200 px-3 py-1 text-sm">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span>{idea.votesCount || 0}</span>
            </div>
          </div>
          <span className="text-muted-foreground text-sm">
            {formatRelativeDate(idea.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

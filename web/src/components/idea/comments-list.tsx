import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Comment } from "@/types";

interface CommentsList {
  comments: Comment[];
  loading: boolean;
}

export const CommentsList = ({ comments, loading }: CommentsList) => {
  return (
    <div>
      {loading ? (
        <p className="text-muted-foreground">Loading comments...</p>
      ) : comments.length > 0 ? (
        <div className="space-y-8 p-2">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {comment.author?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-base font-semibold">
                      {comment.author?.name || "User"}
                    </p>

                    <p className="text-muted-foreground mt-1 text-sm whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

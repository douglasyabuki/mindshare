import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { User } from "@/types";
import { Crown, Edit, Trash2, User as UserIcon } from "lucide-react";

interface MemberCard {
  member: User;
  isCurrentUser: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const MemberCard = ({
  member,
  isCurrentUser,
  onEdit,
  onDelete,
}: MemberCard) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isAdmin = member.role === "admin" || member.role === "owner";

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarFallback className="bg-zinc-950 text-white">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold">
                  {member.name}
                </p>
                <p className="text-muted-foreground truncate text-sm">
                  {member.email}
                </p>
                {member.role && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {isAdmin ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                        <Crown className="h-3 w-3" />
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        <UserIcon className="h-3 w-3" />
                        Member
                      </span>
                    )}
                    {isCurrentUser && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                        You
                      </span>
                    )}
                  </div>
                )}
                {isCurrentUser && !member.role && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      You
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onEdit}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onDelete}
                  disabled={isCurrentUser}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

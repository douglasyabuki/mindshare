import { DeleteMemberDialog } from "@/components/members/delete-member-dialog";
import { EditMemberDialog } from "@/components/members/edit-member-dialog";
import { InviteMemberDialog } from "@/components/members/invite-member-dialog";
import { MemberCard } from "@/components/members/member-card";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LIST_MEMBERS } from "@/lib/graphql/queries/members";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types";
import { useQuery } from "@apollo/client/react";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

export const Members = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditMemberDialog, setOpenEditMemberDialog] = useState(false);
  const [member, setMember] = useState<User | null>(null);

  const currentUserId = useAuthStore((state) => state.user?.id);
  const { data, loading, refetch } = useQuery<{ listUsers: User[] }>(
    LIST_MEMBERS,
  );

  const handleAddUser = () => {
    setOpenInviteDialog(true);
  };
  const handleEditUser = (editMember: User) => {
    setMember(editMember);
    setOpenEditMemberDialog(true);
  };
  const handleDeleteUser = (deleteMember: User) => {
    setMember(deleteMember);
    setOpenDeleteDialog(true);
  };

  const members = data?.listUsers ?? [];

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium text-purple-600">Users</h1>
            <p className="text-muted-foreground">
              Manage users and their permissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-end gap-4">
              <Label htmlFor="search" className="whitespaces-nowrap text-sm">
                Search users:
              </Label>
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  id="search"
                  placeholder="Name or email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-[200px] pl-9"
                />
              </div>
            </div>
            <Button onClick={handleAddUser}>
              <Plus className="mr-2 h-4 w-4" />
              New user
            </Button>
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-4">
          {!loading &&
            members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                isCurrentUser={member.id === currentUserId}
                onEdit={() => handleEditUser(member)}
                onDelete={() => handleDeleteUser(member)}
              />
            ))}
        </div>
      </div>

      <InviteMemberDialog
        open={openInviteDialog}
        onOpenChange={setOpenInviteDialog}
        onCreated={() => refetch()}
      />

      <EditMemberDialog
        open={openEditMemberDialog}
        onOpenChange={setOpenEditMemberDialog}
        onUpdated={() => refetch()}
        member={member}
      />

      <DeleteMemberDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        member={member}
      />
    </Page>
  );
};

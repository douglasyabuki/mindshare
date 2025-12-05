import { CreateIdeaDialog } from "@/components/idea/create-idea-dialog";
import { IdeaCard } from "@/components/idea/idea-card";
import { IdeaDetailDrawer } from "@/components/idea/idea-detail-drawer";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LIST_IDEAS } from "@/lib/graphql/queries/idea";
import type { Idea } from "@/types";
import { useQuery } from "@apollo/client/react";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Ideas = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data, loading, refetch } = useQuery<{ listIdeas: Idea[] }>(
    LIST_IDEAS,
  );
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);

  const ideas = data?.listIdeas || [];

  const handleIdeaClick = (ideaId: string) => {
    setSelectedIdeaId(ideaId);
    setOpenDrawer(true);
  };

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-3xl font-medium text-purple-600">Ideas</Label>
          <Button onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New idea
          </Button>
        </div>
      </div>
      <div className="grid gap-4 pt-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`idea-skeleton-${i}`}
              className="border-muted-foreground/30 h-32 rounded-lg border border-dashed"
            />
          ))}
        {!loading &&
          ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onClick={() => handleIdeaClick(idea.id)}
            />
          ))}
      </div>
      <IdeaDetailDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        ideaId={selectedIdeaId}
      />
      <CreateIdeaDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetch()}
      />
    </Page>
  );
};

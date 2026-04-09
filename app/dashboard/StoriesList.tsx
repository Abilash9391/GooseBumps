"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit, Search, X } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ImpactStory } from "@/data/impact-stories";

interface StoriesListProps {
  stories: ImpactStory[];
  type: "player" | "team";
}

export function StoriesList({ stories: initialStories, type }: StoriesListProps) {
  const router = useRouter();
  const [storiesList, setStoriesList] = useState<ImpactStory[]>(initialStories);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; storyId: string | null }>({
    isOpen: false,
    storyId: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter stories based on search query
  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) return storiesList;
    
    const query = searchQuery.toLowerCase();
    return storiesList.filter(story =>
      story.name.toLowerCase().includes(query) 
    // ||
    //   story.story.toLowerCase().includes(query) ||
    //   story.fullStory.toLowerCase().includes(query)
    );
  }, [storiesList, searchQuery]);

  const handleDeleteClick = (storyId: string) => {
    setDeleteDialog({ isOpen: true, storyId });
  };

  const handleConfirmDelete = async () => {
    if (deleteDialog.storyId === null) return;

    setIsDeleting(true);
    try {
      // Delete the story (simulation - in production this would call an API)
      setStoriesList(storiesList.filter(s => s.id !== deleteDialog.storyId));
      setDeleteDialog({ isOpen: false, storyId: null });
    } catch (error) {
      console.error("Error deleting story:", error);
      alert("Error deleting story");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (storyId: string) => {
    if (type === "player") {
      router.push(`/dashboard/player-stories/${storyId}/edit`);
    } else {
      router.push(`/dashboard/team-stories/${storyId}/edit`);
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search stories by name "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="mb-4 text-sm text-muted-foreground">
          Found {filteredStories.length} stor{filteredStories.length !== 1 ? "ies" : "y"}
        </div>
      )}

      {/* Stories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => (
            <Card key={story.id} className="hover:shadow-md transition-shadow flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2">{story.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {story.image && (
                  <div className="mb-4 w-full h-40 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                {story.story}
              </p>
              <div className="flex gap-2 mt-auto">
                <Button size="sm" variant="outline" asChild className="flex-1">
                  <Link href={`/impact-stories/${story.slug}`}>View</Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditClick(story.id)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive flex items-center gap-2"
                  onClick={() => handleDeleteClick(story.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchQuery ? "No stories found matching your search" : "No stories yet"}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.isOpen} onOpenChange={(open) => !isDeleting && setDeleteDialog({ ...deleteDialog, isOpen: open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Story</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this story? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

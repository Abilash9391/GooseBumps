"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ImpactStory } from "@/data/impact-stories";

interface StoryEditFormProps {
  story: ImpactStory;
  type: "player" | "team";
}

export function StoryEditForm({ story, type }: StoryEditFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: story.name,
    story: story.story,
    fullStory: story.fullStory,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - in production, this would call an actual backend
      toast({
        title: "Success",
        description: "Story updated successfully",
      });
      
      const redirectPath = type === "player" ? "/dashboard/player-stories" : "/dashboard/team-stories";
      router.push(redirectPath);
    } catch (error) {
      console.error("Error updating story:", error);
      toast({
        title: "Error",
        description: "Error updating story",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Story Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Story Title / Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter story title"
            />
          </div>

          {/* Short Story */}
          <div>
            <label className="block text-sm font-medium mb-2">Short Story Summary</label>
            <Textarea
              name="story"
              value={formData.story}
              onChange={handleInputChange}
              placeholder="Enter a brief summary of the story"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">This appears in the story card preview</p>
          </div>

          {/* Full Story */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Story</label>
            <Textarea
              name="fullStory"
              value={formData.fullStory}
              onChange={handleInputChange}
              placeholder="Enter the complete story"
              rows={8}
            />
            <p className="text-xs text-muted-foreground mt-1">This appears on the full story page</p>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Users, Save, Upload } from "lucide-react";
import { toast } from "sonner";

export default function NewPlayerStoryPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    story: "",
    fullStory: "",
    image: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Player story created successfully!");
      setLoading(false);
      // Reset form
      setFormData({
        name: "",
        story: "",
        fullStory: "",
        image: ""
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/player-stories">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Player Stories
                </Link>
              </Button>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Users className="w-6 h-6" />
                Add New Player Story
              </h1>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Player Story Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Player Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Sarah Chen"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Profile Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image}
                        onChange={(e) => handleInputChange("image", e.target.value)}
                      />
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Leave empty to use placeholder image
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="story">Short Story Preview *</Label>
                    <Textarea
                      id="story"
                      placeholder="Brief summary of the player's journey..."
                      rows={3}
                      value={formData.story}
                      onChange={(e) => handleInputChange("story", e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be shown on the impact stories page
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullStory">Full Story *</Label>
                    <Textarea
                      id="fullStory"
                      placeholder="Detailed story of the player's journey, achievements, and impact..."
                      rows={8}
                      value={formData.fullStory}
                      onChange={(e) => handleInputChange("fullStory", e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be shown on the individual story page
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={loading} className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      {loading ? "Creating..." : "Create Player Story"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href="/dashboard/player-stories">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
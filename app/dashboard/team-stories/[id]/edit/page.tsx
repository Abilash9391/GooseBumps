import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { impactStories } from "@/data/impact-stories";
import { StoryEditForm } from "./StoryEditForm";

export default async function EditTeamStoryPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const story = impactStories.find(s => s.id === params.id);

  if (!story || story.type !== "team") {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button variant="ghost" size="sm" asChild className="mb-8">
                <Link href="/dashboard/team-stories">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Team Stories
                </Link>
              </Button>
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
                <p className="text-muted-foreground">The story you're looking for doesn't exist.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" size="sm" asChild className="mb-8">
              <Link href="/dashboard/team-stories">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Team Stories
              </Link>
            </Button>

            <h1 className="text-3xl font-bold mb-8">Edit Team Story</h1>

            <StoryEditForm story={story} type="team" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

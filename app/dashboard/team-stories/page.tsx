import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getStoriesByType } from "@/data/impact-stories";
import { Plus, Trophy, ArrowLeft } from "lucide-react";
import { StoriesList } from "../StoriesList";

export default async function TeamStoriesDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const teamStories = getStoriesByType("team");

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Link>
                </Button>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Trophy className="w-6 h-6" />
                  Team Stories Management
                </h1>
              </div>
              <Button className="flex items-center gap-2" asChild>
                <Link href="/dashboard/team-stories/new">
                  <Plus className="w-4 h-4" />
                  Add New Team Story
                </Link>
              </Button>
            </div>

            {/* Team Stories Grid */}
            <StoriesList stories={teamStories} type="team" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
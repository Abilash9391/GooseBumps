import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getStoriesByType } from "@/data/impact-stories";
import { Plus, Users, ArrowLeft } from "lucide-react";
import { StoriesList } from "../StoriesList";

export default async function PlayerStoriesDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const playerStories = getStoriesByType("player");

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
                  <Users className="w-6 h-6" />
                  Player Stories Management
                </h1>
              </div>
              <Button className="flex items-center gap-2" asChild>
                <Link href="/dashboard/player-stories/new">
                  <Plus className="w-4 h-4" />
                  Add New Player Story
                </Link>
              </Button>
            </div>

            {/* Player Stories Grid */}
            <StoriesList stories={playerStories} type="player" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
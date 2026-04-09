import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { events } from "@/data/events";
import { getStoriesByType } from "@/data/impact-stories";
import { Calendar, Users, Trophy, Image as ImageIcon } from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const playerStories = getStoriesByType("player");
  const teamStories = getStoriesByType("team");

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <div className="text-sm text-muted-foreground">
                Welcome back, {session.user?.name}
              </div>
            </div>

            {/* Content Management Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage all events, tournaments, and competitions.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{events.length} events</span>
                    <Button asChild>
                      <Link href="/dashboard/events">Manage Events</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Player Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage individual player impact stories and testimonials.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{playerStories.length} stories</span>
                    <Button asChild>
                      <Link href="/dashboard/player-stories">Manage Stories</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Team Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage team achievements and collective stories.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{teamStories.length} stories</span>
                    <Button asChild>
                      <Link href="/dashboard/team-stories">Manage Stories</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Image Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage image galleries and photo collections.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Gallery</span>
                    <Button asChild>
                      <Link href="/dashboard/images">Manage Images</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
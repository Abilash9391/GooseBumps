import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Calendar, ArrowLeft } from "lucide-react";
import { EventsList } from "./EventsList";

export default async function EventsDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

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
                  <Calendar className="w-6 h-6" />
                  Events Management
                </h1>
              </div>
              <Button className="flex items-center gap-2" asChild>
                <Link href="/dashboard/events/new">
                  <Plus className="w-4 h-4" />
                  Add New Event
                </Link>
              </Button>
            </div>

            {/* Events Grid */}
            <EventsList />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
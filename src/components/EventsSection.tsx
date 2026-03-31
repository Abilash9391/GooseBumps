import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ChevronRight, Trophy } from "lucide-react";

const upcomingEvents = [
  { id: 1, title: "Ultimate Spring Hat Tournament", date: "Apr 15, 2026", time: "8:00 AM", location: "City Sports Complex", type: "Tournament", status: "Registration Open" },
  { id: 2, title: "Weekly Practice Session", date: "Apr 18, 2026", time: "6:00 PM", location: "Central Park Fields", type: "Practice", status: "Open to All" },
  { id: 3, title: "Inter-Club Scrimmage vs. Disc Dynamix", date: "Apr 22, 2026", time: "4:00 PM", location: "University Grounds", type: "Scrimmage", status: "Team Event" },
  { id: 4, title: "Beginner Ultimate Workshop", date: "Apr 27, 2026", time: "10:00 AM", location: "Community Sports Center", type: "Workshop", status: "Free Entry" },
];

const pastEvents = [
  { id: 1, title: "Regional Mixed Championship", date: "Mar 28, 2026", result: "2nd Place", highlight: "Amazing Spirit of the Game performance", type: "Tournament" },
  { id: 2, title: "Beach Ultimate Showcase", date: "Mar 15, 2026", result: "Champions", highlight: "First beach title for Goosebumps", type: "Tournament" },
  { id: 3, title: "Ultimate 101 Clinic", date: "Mar 8, 2026", result: "25 New Players", highlight: "Successfully introduced Ultimate to newcomers", type: "Workshop" },
];

const participatedEvents = [
  { id: 1, title: "National Ultimate Championship 2026", date: "Feb 2026", achievement: "Quarter-Finals", description: "Best finish in club history at nationals" },
  { id: 2, title: "Spirit of the Game Award", date: "Jan 2026", achievement: "Award Winner", description: "Recognized for exceptional sportsmanship at state level" },
  { id: 3, title: "Asia Pacific Club Championship", date: "Dec 2025", achievement: "Top 16", description: "Competed against top Asian Ultimate clubs" },
];

export function EventsSection() {
  return (
    <section id="events" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge variant="outline" className="mb-4 uppercase tracking-wider">Events</Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">STAY CONNECTED</h2>
          </div>
          <Button variant="link" className="text-primary uppercase tracking-wider gap-1 p-0">
            View All Events <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full md:w-auto bg-secondary mb-8">
            <TabsTrigger value="upcoming" className="uppercase tracking-wider text-xs md:text-sm">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="uppercase tracking-wider text-xs md:text-sm">Past Events</TabsTrigger>
            <TabsTrigger value="participated" className="uppercase tracking-wider text-xs md:text-sm">Participated</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-0">
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-card border-border hover:border-primary/50 transition-colors group cursor-pointer py-4">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-3 uppercase text-xs tracking-wider">{event.type}</Badge>
                        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{event.title}</h3>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{event.date}</span>
                          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{event.time}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{event.location}</span>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-0 whitespace-nowrap">{event.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastEvents.map((event) => (
                <Card key={event.id} className="bg-card border-border hover:border-primary/50 transition-colors py-4">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3 uppercase text-xs tracking-wider">{event.type}</Badge>
                    <h3 className="font-display text-xl font-bold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{event.date}</p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-primary font-semibold">{event.result}</p>
                      <p className="text-sm text-muted-foreground mt-1">{event.highlight}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="participated" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participatedEvents.map((event) => (
                <Card key={event.id} className="bg-card border-border hover:border-primary/50 transition-colors py-4">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                        <p className="font-semibold text-primary">{event.achievement}</p>
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

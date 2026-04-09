"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { Trash2, Edit, Search, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { events as initialEvents } from "@/data/events";

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "upcoming" | "past" | "participated";
  status?: string;
  result?: string;
  images?: string[];
}

export function EventsList() {
  const router = useRouter();
  const [eventsList, setEventsList] = useState<EventItem[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; eventId: string | null }>({
    isOpen: false,
    eventId: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return eventsList;
    
    const query = searchQuery.toLowerCase();
    return eventsList.filter(event =>
      event.title.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.date.toLowerCase().includes(query)
    );
  }, [eventsList, searchQuery]);

  const handleDeleteClick = (eventId: string) => {
    setDeleteDialog({ isOpen: true, eventId });
  };

  const handleConfirmDelete = async () => {
    if (deleteDialog.eventId === null) return;

    setIsDeleting(true);
    try {
      // Call delete API
      const response = await fetch(`/api/posts/${deleteDialog.eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from local state
        setEventsList(eventsList.filter(e => e.id !== deleteDialog.eventId));
        setDeleteDialog({ isOpen: false, eventId: null });
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (eventId: string) => {
    router.push(`/dashboard/events/${eventId}/edit`);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events by title, location, date..."
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
          Found {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <Badge variant={event.type === "upcoming" ? "default" : "secondary"}>
                  {event.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Image Carousel */}
              {event.images && event.images.length > 0 && (
                <div className="mb-4">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {event.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                            <img
                              src={image}
                              alt={`${event.title} - Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {event.images.length > 1 && (
                      <>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                      </>
                    )}
                  </Carousel>
                </div>
              )}

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
                {event.status && <p><strong>Status:</strong> {event.status}</p>}
                {event.result && <p><strong>Result:</strong> {event.result}</p>}
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                {event.description}
              </p>
              <div className="flex gap-2 mt-auto">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleEditClick(event.id)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-destructive hover:text-destructive flex items-center gap-2"
                  onClick={() => handleDeleteClick(event.id)}
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
              {searchQuery ? "No events found matching your search" : "No events yet"}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.isOpen} onOpenChange={(open) => !isDeleting && setDeleteDialog({ ...deleteDialog, isOpen: open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
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

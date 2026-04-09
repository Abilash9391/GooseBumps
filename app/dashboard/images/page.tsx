"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { ArrowLeft, Upload, Save, X, Image as ImageIcon, Search } from "lucide-react";
import { toast } from "sonner";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title: string;
}

export default function ImagesDashboardPage() {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      alt: "Ultimate Frisbee action shot",
      title: "Team Practice"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
      alt: "Frisbee throw",
      title: "Perfect Throw"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      alt: "Team celebration",
      title: "Victory Moment"
    }
  ]);

  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter images based on search query
  const filteredImages = useMemo(() => {
    if (!searchQuery.trim()) return images;
    
    const query = searchQuery.toLowerCase();
    return images.filter(image =>
      image.title.toLowerCase().includes(query) ||
      image.alt.toLowerCase().includes(query)
    );
  }, [images, searchQuery]);

  const addImageUrl = () => {
    if (newImageUrl.trim() && newImageTitle.trim()) {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: newImageUrl.trim(),
        alt: newImageAlt.trim() || newImageTitle.trim(),
        title: newImageTitle.trim()
      };
      setImages(prev => [...prev, newImage]);
      setNewImageUrl("");
      setNewImageTitle("");
      setNewImageAlt("");
      toast.success("Image added to gallery!");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);

      // Simulate file upload - in real app, this would upload to cloud storage
      setTimeout(() => {
        const mockUrl = `https://example.com/uploads/${file.name}`;
        const newImage: GalleryImage = {
          id: Date.now().toString(),
          url: mockUrl,
          alt: file.name,
          title: file.name.split('.')[0]
        };
        setImages(prev => [...prev, newImage]);
        setUploading(false);
        toast.success("Image uploaded successfully!");
      }, 2000);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    toast.success("Image removed from gallery!");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <ImageIcon className="w-6 h-6" />
                Image Gallery Management
              </h1>
            </div>

            {/* Image Carousel Display */}
            {images.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Gallery Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Images added below are included in the gallery preview carousel.
                  </p>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {images.map((image) => (
                        <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                          <div className="relative group">
                            <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                              <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <div className="text-center text-white">
                                <h3 className="font-semibold text-lg">{image.title}</h3>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="mt-2"
                                  onClick={() => removeImage(image.id)}
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </CardContent>
              </Card>
            )}

            {/* Add Images Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Upload from URL */}
              <Card>
                <CardHeader>
                  <CardTitle>Add Image from URL</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-url">Image URL *</Label>
                    <Input
                      id="image-url"
                      placeholder="https://example.com/image.jpg"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image-title">Title *</Label>
                    <Input
                      id="image-title"
                      placeholder="Image title"
                      value={newImageTitle}
                      onChange={(e) => setNewImageTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image-alt">Alt Text</Label>
                    <Input
                      id="image-alt"
                      placeholder="Describe the image"
                      value={newImageAlt}
                      onChange={(e) => setNewImageAlt(e.target.value)}
                    />
                  </div>
                  <Button onClick={addImageUrl} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Add to Gallery
                  </Button>
                </CardContent>
              </Card>

              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Image File</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Select Image File</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </div>
                  {uploading && (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground">
                    <p>• Supported formats: JPG, PNG, GIF, WebP</p>
                    <p>• Maximum file size: 5MB</p>
                    <p>• Images will be optimized automatically</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gallery Management
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Gallery Management ({images.length} images)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search Bar 
                <div className="mb-6 flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search by image title or description..."
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

                {/* Results Count 
                {searchQuery && (
                  <div className="mb-4 text-sm text-muted-foreground">
                    Found {filteredImages.length} image{filteredImages.length !== 1 ? "s" : ""}
                  </div>
                )}

                {/* Images Grid 
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredImages.length > 0 ? (
                    filteredImages.map((image) => (
                      <div key={image.id} className="relative group border rounded-lg overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                          <h4 className="font-semibold text-sm text-center mb-2">{image.title}</h4>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>{searchQuery ? "No images found matching your search" : "No images in gallery yet"}</p>
                      {!searchQuery && <p className="text-sm">Add images using the forms above</p>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card> 
            */}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
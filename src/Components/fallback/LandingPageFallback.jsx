import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function LandingPageFallback() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-64 rounded-full hidden md:block" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-24 md:py-32">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-12">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-5/6 mb-8" />
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
          <div className="md:w-1/2">
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses Skeleton */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner Skeleton */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-yellow-100 to-yellow-50">
        <div className="container mx-auto px-6">
          <div className="rounded-3xl bg-white shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-12 w-48 mb-4" />
              <Skeleton className="h-6 w-64 mb-6" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories Skeleton */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="hidden md:flex justify-center space-x-4 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Course Skeleton */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-48 mb-10" />
          <Card className="overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center">
              <div className="md:w-[38.2%] mb-6 md:mb-0">
                <Skeleton className="h-64 w-full rounded-2xl" />
              </div>
              <div className="md:w-[61.8%] md:pl-12">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                <div className="flex items-center mb-6">
                  <Skeleton className="h-5 w-5 mr-2" />
                  <Skeleton className="h-4 w-32 mr-6" />
                  <Skeleton className="h-5 w-5 mr-2" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-8 w-24 mb-6" />
                <Skeleton className="h-12 w-40" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-10" />
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex items-center">
              <Skeleton className="h-12 w-12 rounded-full mr-4" />
              <div>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Skeleton */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-gradient-to-b from-gray-900 to-black mt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <div className="flex space-x-4">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-6" />
              </div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/5 mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  )
}
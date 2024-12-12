import React, { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { BookOpen, Brain, FileEdit } from "lucide-react";

export default function CourseCurriculum({ thumbnail , CourseLessons}) {
//   const [CourseLessons, setCourseLessons] = useState([
//     {
//       _id: 1,
//       title: "course title",
//       description: "course description",
//       video_tutorial_link: "",
//     },
//     {
//       _id: 2,
//       title: "course title",
//       description: "course description",
//       video_tutorial_link: "",
//     },
//   ]);
  const videoRef = useRef();
  return (
    <div className="w-full h-auto">
      <div className="">
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Course Content</h2>
            <p className="text-sm text-gray-600 flex gap-4 mt-2">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> {CourseLessons.length} Lessons{" "}
              </span>{" "}
              <span className="flex items-center gap-1">
                <FileEdit className="w-4 h-4" /> {CourseLessons.length}{" "}
                Assignments{" "}
              </span>{" "}
              <span className="flex items-center gap-1">
                <Brain className="w-4 h-4" /> {CourseLessons.length * 3} Quizzes{" "}
              </span>
            </p>
          </div>
          <ScrollArea className="h-auto">
            <Accordion
              type="single"
              collapsible
              defaultValue="1"
              className="w-full"
            >
              {CourseLessons.map((lesson, index) => (
                <AccordionItem key={lesson._id} value={lesson._id}>
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <span className="font-medium">{lesson.title}</span>
                      {""}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col">
                      <div className="space-y-1 p-2 ml-3">{lesson.description}</div>
                      <div>
                        <h3 className="text-sm ml-5">Tutorial : </h3>
                        <iframe
                          ref={videoRef}
                          src={`https://player.cloudinary.com/embed/?public_id=${
                            lesson?.video_tutorial_link
                          }&cloud_name=dtc1xcil8&player[showJumpControls]=true&player[controlBar][fullscreenToggle]=true&source[poster]=https%3A%2F%2Fres.cloudinary.com%2Fdtc1xcil8%2Fimage%2Fupload%2F${
                            thumbnail
                          }&source[chapters]=true&source[sourceTypes][0]=hls`}
                          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                          undefined
                          allowfullscreen
                          className="ml-5 h-30 rounded-lg"
                          //   onTimeUpdate={handleTimeUpdate}
                          //   onLoadedMetadata={handleLoadedMetadata}
                          frameborder="0"
                          width={320}
                          height={180}
                        ></iframe>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

import { axios_instance } from "@/Config/axios_instance";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "cloudinary-video-player/dist/cld-video-player.min.css";
import cloudinary from "cloudinary-video-player";
import { set_video_tutorial_progress } from "@/Redux/Slices/Video_tutorial_progress";
import { LucideGlobeLock } from "lucide-react";

export default function Cloudinary_VideoPlayer({
  public_id,
  handleMutation,
  nextTutorial,
  currentTutorialIndex,
  handleLessonChange,
}) {
  const [currentTime, setCurrentTime] = useState();
  // const [Tutorial, setTurorial] = useState("");
  const cloudinaryRef = useRef(null);
  const videoRef = useRef(null);
  const playerInstanceRef = useRef(null);
  // const [CurrentVideoProgress,setCurrentVideoProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [initialisePlayer, setInitialisePlayer] = useState(false);

  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const { current_lesson_id, current_course_id } = useSelector(
    (state) => state?.current_course_data
  );

  const dispatch = useDispatch();

  // const get_video_progress = async () => {
  //   try {
  //     console.log("ind the fn");

  //     const response = await axios_instance.get("api/get_video_progress", {
  //       params: {
  //         student_id: student_id,
  //         lesson_id: current_lesson_id,
  //       },
  //     });
  //     const { video_progress } = response?.data;
  //     if (response?.data?.success) {
  //       setPausedTime(Math.floor(video_progress?.recently_watched_time));
  //       handleMutation(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("in useeffect=============");
  //   get_video_progress();
  //   console.log("pause time :", pausedTime);
  // }, [public_id, current_lesson_id, current_course_id]);

  // useEffect(() => {
  //   get_video_progress();
  // }, [current_lesson_id, current_course_id]);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        if (!cloudinaryRef.current) {
          cloudinaryRef.current = window.cloudinary;
        }

        if (public_id && videoRef.current) {
          if (playerInstanceRef.current) {
            const response = await axios_instance.get(
              "api/get_video_progress",
              {
                params: {
                  student_id: student_id,
                  course_id: current_course_id,
                  lesson_id: current_lesson_id,
                },
              }
            );
            console.log("Playerinstance : ", playerInstanceRef.current);
            // console.log("player instance",playerInstanceRef.current)
            playerInstanceRef.current
              .source(public_id, {
                cloud_name: "dtc1xcil8",
                profile: "cld-adaptive-stream",
              })
              .currentTime(
                Math.floor(
                  response?.data?.video_progress?.recently_watched_time
                )
              );
          }

          const response = await axios_instance.get("api/get_video_progress", {
            params: {
              student_id: student_id,
              course_id: current_course_id,
              lesson_id: current_lesson_id,
            },
          });
          playerInstanceRef.current = cloudinaryRef.current.videoPlayer(
            videoRef.current,
            {
              cloud_name: "dtc1xcil8",
              profile: "cld-adaptive-stream",
              publicId: public_id || "",
              showJumpControls: true,
              pictureInPictureToggle: true,
            }
          );

          playerInstanceRef.current.on("ready", () => {
            if (
              Math.floor(
                response?.data?.video_progress?.recently_watched_time
              ) > 0
            ) {
              playerInstanceRef.current.currentTime(
                Math.floor(
                  response?.data?.video_progress?.recently_watched_time
                )
              );
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    initializePlayer();
  }, [public_id, current_lesson_id, nextTutorial, currentTutorialIndex]);

  // useEffect(() => {
  //   const initializePlayer = async () => {
  //     try {
  //       // Ensure we clean up any existing player first
  //       if (playerInstanceRef.current) {
  //         playerInstanceRef.current.destroy();
  //         playerInstanceRef.current = null;
  //       }

  //       // Ensure cloudinary is initialized
  //       if (!cloudinaryRef.current) {
  //         cloudinaryRef.current = window.cloudinary;
  //       }

  //       // Only proceed if we have a public_id and video ref
  //       if (public_id && videoRef.current) {
  //         const response = await axios_instance.get("api/get_video_progress", {
  //           params: {
  //             student_id: student_id,
  //             course_id: current_course_id,
  //             lesson_id: current_lesson_id,
  //           },
  //         });

  //         // Create a new player instance each time
  //         playerInstanceRef.current = cloudinaryRef.current.videoPlayer(
  //           videoRef.current,
  //           {
  //             cloud_name: "dtc1xcil8",
  //             profile: "cld-adaptive-stream",
  //             publicId: public_id || "",
  //             showJumpControls: true,
  //             pictureInPictureToggle: true,
  //           }
  //         );

  //         playerInstanceRef.current.on("ready", () => {
  //           if (
  //             Math.floor(
  //               response?.data?.video_progress?.recently_watched_time
  //             ) > 0
  //           ) {
  //             playerInstanceRef.current.currentTime(
  //               Math.floor(
  //                 response?.data?.video_progress?.recently_watched_time
  //               )
  //             );
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   initializePlayer();

  //   // Add a cleanup function to destroy the player when the component unmounts
  //   return () => {
  //     if (playerInstanceRef.current) {
  //       playerInstanceRef.current.dispose();
  //       playerInstanceRef.current = null;
  //     }
  //   };
  // }, [public_id, current_lesson_id, student_id, current_course_id]);
  // useEffect(() => {
  //   if (!cloudinaryRef.current) {
  //     cloudinaryRef.current = window.cloudinary;
  //   }

  //   if (public_id && videoRef.current) {
  //     // If a player instance already exists, destroy it to avoid duplication
  //     if (playerInstanceRef.current) {
  //       if (typeof playerInstanceRef.current.destroy === "function") {
  //         playerInstanceRef.current.destroy(); // Call destroy if available
  //       }
  //       playerInstanceRef.current = null;
  //     }

  //     // Initialize a new player with the updated public_id
  //     playerInstanceRef.current = cloudinary.videoPlayer(videoRef.current, {
  //       cloud_name: "dtc1xcil8",
  //       profile: "cld-adaptive-stream",
  //       publicId: public_id || "", // Set the public_id dynamically here
  //       showJumpControls: true,
  //       pictureInPictureToggle: true,
  //     });
  //     // .currentTime(pausedTime);

  //     playerInstanceRef.current.on("ready", () => {
  //       if (pausedTime > 0) {
  //         playerInstanceRef.current.currentTime(pausedTime);
  //       }
  //     });
  //     return () => {
  //       setPausedTime(null);
  //       playerInstanceRef.current = null;
  //     };
  //   }
  // }, [public_id]); // Re-run effect whenever public_id changes

  // useEffect(() => {
  //   const player = playerInstanceRef.current;

  //   // Track when the video is paused
  //   player.on("pause", () => {
  //     setPausedTime(player.currentTime());
  //   });

  //   // Automatically seek to the saved paused time when the video is loaded
  //   // player.on("loadeddata", () => {
  //   //   if (pausedTime > 0) {
  //   //     player.currentTime(pausedTime);
  //   //   }
  //   // });
  // }, [pausedTime]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      console.log(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
      setCurrentTime(videoRef.current.currentTime);
      dispatch(
        set_video_tutorial_progress({
          lesson_id: current_lesson_id,
          progress: Math.floor(
            (videoRef.current.currentTime / videoRef.current.duration) * 100
          ),
          current_time: videoRef.current.currentTime,
        })
      );
    }
  };
  const handleWatchedTime = async () => {
    if (!videoRef.current) return;
    try {
      // setPausedTime(videoRef.current.currentTime);
      // setDuration(videoRef.current.duration);

      const response = await axios_instance.put("api/update_video_progress", {
        student_id: student_id,
        course_id: current_course_id,
        lesson_id: current_lesson_id,
        duration: videoRef.current.duration,
        recent_whatched_time: videoRef.current.currentTime,
      });
      console.log("Video progress update:", response);
      if (response?.data?.success) {
        console.log("saved successfully");
        handleMutation(false);
        if (response?.data?.video_progress?.tutorial_completed) {
          if (playerInstanceRef.current && nextTutorial) {
            const response = await axios_instance.get(
              "api/get_video_progress",
              {
                params: {
                  student_id: student_id,
                  course_id: current_course_id,
                  lesson_id: nextTutorial?._id,
                },
              }
            );
            console.log("Playerinstance : ", playerInstanceRef.current);
            // console.log("player instance",playerInstanceRef.current)
            playerInstanceRef.current.source(
              nextTutorial?.video_tutorial_link,
              {
                cloud_name: "dtc1xcil8",
                profile: "cld-adaptive-stream",
              }
            );

            // .currentTime(
            //   Math.floor(
            //     response?.data?.video_progress?.recently_watched_time
            //   )
            // );
            handleLessonChange(
              nextTutorial,
              currentTutorialIndex + 1,
              currentTutorialIndex + 2
            );
          }
          // handleLessonChange(nextTutorial);
          await axios_instance.put("api/update_lesson_progress", {
            student_id: student_id,
            course_id: current_course_id,
            lesson_id: current_lesson_id,
            video_progress: response?.data?.video_progress?._id,
            tutorial_completed: true,
            assignment_completed: false,
          });
          setLessonCompleted(true);
          console.log("Lesson updated");
          handleLessonChange(
            nextTutorial,
            currentTutorialIndex + 1,
            currentTutorialIndex + 2
          );
          handleMutation(true);
          console.log("Lesson changed");
          await axios_instance.put("api/update_course_progress", {
            student_id: student_id,
            course_id: current_course_id,
            lesson_id: current_lesson_id,
            video_progress: response?.data?.video_progress?._id,
            tutorial_completed: true,
            assignment_completed: false,
          });
          handleMutation(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(public_id);
  console.log(currentTime / 60);
  // console.log("Watched time : ", pausedTime);
  console.log("Duration : ", duration);

  return (
    <>
      {console.log(public_id)}
      <video
        ref={videoRef}
        // data-cld-public-id={`${public_id}`}
        // data-cld-public-id={`mvxhledspwapb3l3pblv`}
        // data-cld-public-id={public_id ? `${public_id}` : "mcfbvelvdwkqbpf0o24e"}
        className="w-full h-full"
        controls={true}
        onTimeUpdate={handleTimeUpdate}
        onPause={handleWatchedTime}
      />
    </>
  );
}

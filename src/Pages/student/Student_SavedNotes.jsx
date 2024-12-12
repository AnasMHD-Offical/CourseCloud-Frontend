"use client";

import { useEffect, useRef, useState } from "react";
import { Bold, Italic, List, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/Components/ui/separator";
import { useSelector } from "react-redux";
import { axios_instance } from "@/Config/axios_instance";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";

const form_validation = yup.object({
  notes: yup
    .string()
    .matches(
      /^[a-zA-Z0-9!%@&#?."';:,/ ]+$/,
      `Notes should only contain alphabet, numbers, speacials characters (@,!,#,&,?,.,",',;,:,) or whitespace `
    )
    .matches(/^\s*\S[\s\S]*$/, "Enter valid notes")
    .required("Write something to saved the notes"),
});

export default function SavedNotes() {
  const [timing, setTiming] = useState(0);
  const [notesUpdated, setNotesUpdated] = useState(false);
  const [notes, setNotes] = useState([]);
  const formikRef = useRef();

  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const { current_lesson_id, current_course_id } = useSelector(
    (state) => state?.current_course_data
  );

  const video_progress_rate = useSelector(
    (state) => state?.Video_tutorial_progress?.video_tutorial_progress
  );

  const get_notes = async () => {
    try {
      const response = await axios_instance.get("api/get_saved_notes", {
        params: {
          student_id: student_id,
          course_id: current_course_id,
          lesson_id: current_lesson_id,
        },
      });
      if (response?.data?.success) {
        setNotes(response?.data?.saved_notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_notes();
  }, [notesUpdated]);

  const formatTime = (totalSeconds) => {
    // const totalSeconds = Math.floor(decimalSeconds * 60); // Convert to total seconds
    console.log("total sec : ", totalSeconds);
    const minutes = Math.floor(totalSeconds / 60); // Get the minutes
    const seconds = Math.floor(totalSeconds % 60); // Get the remaining seconds
    return `${minutes}:${seconds.toString().padStart(2, "0")}`; // Format as "m:ss"
  };

  console.log("time : ", video_progress_rate?.current_time);
  const handleSaveNote = async (values) => {
    if (!values?.notes.trim()) return;

    try {
      const response = await axios_instance.post("api/create_notes", {
        student_id: student_id,
        course_id: current_course_id,
        lesson_id: current_lesson_id,
        tutorial_note_timing: video_progress_rate?.current_time,
        notes: values?.notes,
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setNotesUpdated(!notesUpdated);
        formikRef.current.resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveNote = async (id) => {
    const response = await axios_instance.delete(`api/delete_note/${id}`);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      setNotesUpdated(!notesUpdated);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <div className="space-y-6">
        <div className="space-y-4 border shadow p-4 rounded-md bg-gradient-to-r from-purple-50 to-blue-50">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-primary">
            Add Notes
          </h2>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatTime(video_progress_rate?.current_time)}</span>
            </div>
            <Formik
              innerRef={formikRef}
              initialValues={{ notes: "" }}
              validationSchema={form_validation}
              onSubmit={handleSaveNote}
            >
              {({ errors, touched }) => (
                <Form className="space-y-2">
                  <Field
                    as={Textarea}
                    id="notes"
                    name="notes"
                    placeholder="Type something here"
                    // value={newNote}
                    // onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[100px] bg-white"
                  />
                  {errors.notes && touched.notes && (
                    <div className="text-sm text-red-500">{errors.notes}</div>
                  )}
                  <div className="flex justify-end">
                    <Button type="submit">Save notes</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Saved notes</h2>
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(note.tutorial_note_timing)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveNote(note._id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="px-4 pb-4">{note.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import lighthouse from '@lighthouse-web3/sdk'

const videoUrlOrFileRequired = (schema) => {
  return schema.test(
    "videoUrlOrFile",
    "Either a video URL or video file is required",
    (values) => {
      const { videoUrl, videoFile } = values;
      return videoUrl || videoFile; // Either one should be present
    }
  );
};

function AddCourseModal({ showUploadModal, setShowUploadModal }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      videoUrl: "",
      videoFile: null,
    },
    validationSchema: videoUrlOrFileRequired(
      Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        videoUrl: Yup.string().url("Must be a valid URL"),
        videoFile: Yup.mixed(),
      })
    ),
    onSubmit: async(values) => {
      // console.log(values.videoFile);
      // setLoading(true);

      const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
        console.log(percentageDone)
      }

      const uploadFile = async(file) =>{
        console.log("try");
        const output = await lighthouse.upload(file, "42979395.7877dc0f490c4786bc08518765ff0500", false, null, progressCallback )
        console.log('File Status:', output)
        return output;
      }

      // try{
        // console.log(values.uploadFile);
        const res=await uploadFile(values.videoFile);
        console.log(res);

      // }catch(e){
      //   console.log(e);
      //   setLoading(false);
      // // }
    },
  });

  return (
    <AnimatePresence>
      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
          onClick={() =>{
            if(!loading)
             setShowUploadModal(false)}
          }
        >
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            style={{
              boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
            }}
            className="min-w-[30%] bg-white px-5 py-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-lg mx-auto"
              >
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Section Title"
                    className="w-full border-slate-600 border px-4 py-2 shadow-sm focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.title}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Section description"
                    className="w-full h-24 border-slate-600 border px-4 py-2 shadow-sm focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.description}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="videoUrl"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Video URL
                  </label>
                  <input
                    type="text"
                    id="videoUrl"
                    name="videoUrl"
                    value={formik.values.videoUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full  border-slate-600 border px-4 py-2  shadow-sm focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {formik.touched.videoUrl && formik.errors.videoUrl && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.videoUrl}
                    </div>
                  )}
                </div>

                {/* Video File */}
                <div className="mb-6">
                  <label
                    htmlFor="videoFile"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Video File
                  </label>
                  <input
                    type="file"
                    id="videoFile"
                    name="videoFile"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      formik.setFieldValue("videoFile", file);
          
                    }}
                    className="w-full  shadow-sm focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {formik.touched.videoFile && formik.errors.videoFile && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.videoFile}
                    </div>
                  )}
                </div>

                <div className="flex self-end">
                  <Button
                    type="submit"
                    className="bg-customOrange rounded-none w-[200px]"
                    disabled={loading}
                  >
                    Upload Section
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddCourseModal;

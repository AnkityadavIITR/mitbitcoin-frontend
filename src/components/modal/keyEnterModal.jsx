"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNostr, dateToUnix } from "nostr-react";

import { getEventHash, getPublicKey, signEvent } from "nostr-tools";

function KeyEnterModal({ showUploadModal, setShowUploadModal }) {
  const [loading, setLoading] = useState(false);
  const { publish } = useNostr();

  const formik = useFormik({
    initialValues: {
      key: "",
      message:""
    },
    validationSchema: 
      Yup.object({
        key: Yup.string().required("key is required"),
        message: Yup.string().required("message is required"),
      }),
    onSubmit: async(values) => {
      setLoading(true);
      const event = {
        content: values.message,
        kind: 1,
        tags: [],
        created_at: dateToUnix(),
        pubkey: getPublicKey(values.key),
      };
      event.id = getEventHash(event);
      event.sig = signEvent(event, values.key);
      
      publish(event);
      setLoading(false);
      setShowUploadModal(false);
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
                    Key
                  </label>
                  <input
                    type="text"
                    id="key"
                    name="key"
                    value={formik.values.key}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Section Title"
                    className="w-full border-slate-600 border px-4 py-2 shadow-sm focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {formik.touched.key && formik.errors.key && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.key}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Message
                  </label>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Section Title"
                    className="w-full border-slate-600 border px-4 py-2 shadow-sm focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.message}
                    </div>
                  )}
                </div>
                <div className="flex self-end">
                  <Button
                    type="submit"
                    className="bg-customOrange rounded-none w-[200px]"
                    disabled={loading}
                  >
                    Upload message
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

export default KeyEnterModal;

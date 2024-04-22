"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { nip19 } from "nostr-tools";
import { useRouter } from 'next/navigation';

import { useAuth } from "@/context/useAuth";
import { usePublish } from "@/hooks/usePublish";
import { usePool } from "@/context/usePool";

const getTagType = (value) => {
    if (value.startsWith('http')) return 'u';
    if (value.startsWith('wss')) return 'r';
    if (value.startsWith('npub')) return 'p';
    if (value.startsWith('note')) return 'e';
    if (value.startsWith('naddr')) return 'a';
    return 'text';
  };
  
  const getTagCode = (value) => {
    const tagType = getTagType(value);
  
    switch (tagType) {
      case 'u':
      case 'r':
        return new URL(value).href.normalize();
      case 'e':
      case 'p':
        return nip19.decode(value).data.toString();
      case 'a':
        const { data } = nip19.decode(value);
        // @ts-ignore
        const { identifier, pubkey, kind } = data;
  
        return `${kind}:${pubkey}:${identifier}`;
      default:
        return value;
    }
  };

const Form = ({address}) => {
    const router = useRouter();

  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [headerList, setHeaderList] = useState([
    "Content",
    "Label",
    "Description",
  ]);
  const [dataList, setDataList] = useState([headerList.map(() => "")]);
  const { user, publicKey, privateKey, loginWithPublicKey, logout } = useAuth();
  const {publish} = usePool();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }

    if (address && address.startsWith("naddr1")) {
      // @ts-ignore
      const id = nip19.decode(address).data.identifier;

      
    } else {
    //   clearFeed();
    }

    // return () => clearFeed();
  }, [user, router, address]);

  const handlePublish = useCallback(async () => {

    console.log("Clicked publish")
    // if (!category) return;

    // if (dataList.length === 0) return;

    // const initialTags = [
    //   ["d", category],
    //   ["headers", ...headerList],
    // ];

    // const tags = dataList.reduce((acc, data) => {
    //   if (!data || data.length === 0) return acc;

    //   const [value, ...rest] = data;

    //   if (value === "") return acc;

    //   const tagType = getTagType(value);
    //   const tagCode = getTagCode(value);

    //   return [...acc, [tagType, tagCode, ...rest]];
    // }, initialTags);

    const event = await publish({ kind: 33777, tags });
    console.log("event",event)
    if (event) {
      const naddr = nip19.naddrEncode({
        identifier: event.id,
        pubkey: event.pubkey,
        kind: event.kind,
      });

      router.push(`/list/${naddr}`);
    }
  }, [publish, category, dataList, headerList, router]);


  const formik = useFormik({
    initialValues: {
      title: "",
      image: null,
      description: "",
      tags: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      image: Yup.mixed().required("A file is required"),
      description: Yup.string().required("Description is required"),
      tags: Yup.array().of(Yup.string()),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("image", values.image);
      values.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
      

    },
  });

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      formik.setFieldValue("tags", [...tags, tag]);
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    formik.setFieldValue("tags", updatedTags);
  };

  const handleInputClick = () => {
    document.getElementById("image").click();
  };

  return (
    <div className="container mx-auto mt-8 max-w-[600px] mb-10">
      <h1 className="text-4xl font-bold mb-4">Submit your form</h1>
      <form onSubmit={formik.handleSubmit} className=" flex flex-col space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="course title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full p-2 border border-gray-300 rounded"
          />

          {formik.errors.title && (
            <div className="text-red-500 text-sm">{formik.errors.title}</div>
          )}
        </div>
        <div className="flex gap-x-4">
          <div className="flex-1">
            <label htmlFor="image" className="block text-lg font-medium">
              Upload Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                formik.setFieldValue("image", file);
              }}
              className="w-full p-2 border border-gray-300 rounded hidden"
            />

            <Button
              variant="outline"
              className="w-full h-[85%]"
              onClick={handleInputClick}
            >
              <Plus />
            </Button>
            {formik.values.image && (
              <p className="text-green-400">file is selected</p>
            )}
            {formik.errors.image && (
              <div className="text-red-500 text-sm">{formik.errors.image}</div>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="description" className="block text-lg font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="course description"
              className="w-full p-2 border border-gray-300 rounded"
              rows={8}
            />
            {formik.errors.description && (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-lg font-medium">Tags</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(e.target.value);
                  e.target.value = "";
                }
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-2 flex flex-wrap space-x-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center"
              >
                {tag}
                <button
                  onClick={() => removeTag(index)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex self-end">
          <Button
            type="submit"
            className="bg-customOrange rounded-none w-[200px]"
            onClick={handlePublish}
          >
            Create Course
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;

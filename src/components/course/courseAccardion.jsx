import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseAccardion = ({ data }) => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="px-2">
          {data?.map((section, index) => (
            <div key={index}>
              <AccordionTrigger className="" key={index}>
                {section.sectionTitle}
              </AccordionTrigger>
              <AccordionContent>{section.sectionDescription}</AccordionContent>
            </div>
          ))}
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default CourseAccardion;

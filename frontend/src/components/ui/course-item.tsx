import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const CourseItem = ({ item }: { item: any }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center my-12 gap-6"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      style={{ width: "100%", maxWidth: "100%" }}
      onClick={() => hovered ? setHovered(false) : setHovered(true)}
    >
      <div
        className="w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-xl flex-shrink-0"
        style={{ backgroundColor: '#517e23' }}
      >
        {item.number}
      </div>
      <div className="">
        <h3 className="text-xl font-semibold text-[#00415f] mb-1 md:pr-96">{item.title}</h3>
        <AnimatePresence>
          {hovered && item.points ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.2 }}
            >
              {item.points}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CourseStructure = ({ courseStructure, advanceCourse, id }: { courseStructure: any, advanceCourse:any, id:any }) => {
  return (
    <section className="py-4 mx-4" id={id}>
      <div className="gap-6">
        <Tabs defaultValue="core" className="flex flex-col justify-center align-middle items-center">
          <TabsList className="grid w-fit grid-cols-2 bg-muted p-1 rounded-md">
            <TabsTrigger value="core" className="data-[state=active]:bg-[#0073a6] data-[state=active]:text-white rounded-md px-4 py-2">Core</TabsTrigger>
            <TabsTrigger value="advance" className="data-[state=active]:bg-[#0073a6] data-[state=active]:text-white rounded-md px-4 py-2">Advance</TabsTrigger>
          </TabsList>
          <TabsContent value="core" className="w-7xl justify-start" >
            {courseStructure.map((item: any, index: number) => (
              <CourseItem key={index} item={item}/>
            ))}
          </TabsContent>
          <TabsContent value="advance">
            {advanceCourse.map((item: any, index: number) => (
              <CourseItem key={index} item={item} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CourseStructure;

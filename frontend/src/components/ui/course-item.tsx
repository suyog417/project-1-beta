import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ArrowForwardIos } from "@mui/icons-material";

const CourseItem = ({ item, type }: { item: any,type:string }) => {
  const [hovered, setHovered] = useState(false);

  let backgroundColor = '#517e23'; // Default to green
  if (type === 'practical') {
    backgroundColor = '#e39e0f'; // Yellow
  } else if (type === 'advance') {
    backgroundColor = '#d7152f'; // Red
  }

  return (
    <motion.div
      className="flex items-center my-12 gap-6 max-w-7xl w-full"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      style={{ width: "100%", maxWidth: "100%" }}
      onClick={() => hovered ? setHovered(false) : setHovered(true)}
    >
      <div
        className="w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-xl flex-shrink-0"
        style={{ backgroundColor: backgroundColor }}
      >
        {item.number}
      </div>
      <div className="w-full max-w-7xl">
        <div className="w-full flex flex-row max-w-7xl justify-between">
          <h3 className="text-xl font-semibold text-[#00415f] mb-1 md:pr-96">{item.title}</h3>
          {!hovered ? <ArrowForwardIos /> : <ArrowForwardIos className="rotate-90" />}
        </div>
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

const CourseStructure = ({ coreBasic, corePractical, advanceCourse, specializationCourse, id }: { specializationCourse:any, coreBasic: any, corePractical: any, advanceCourse: any, id: any }) => {
  return (
    <section className="py-4 mx-4 min-h-64" id={id}>
      <div className="gap-6">
        <Tabs defaultValue="core" className="flex flex-col justify-center align-middle items-center">
          <TabsList className="grid max-w-7xl w-fit grid-cols-3 bg-muted p-1 rounded-lg" color="indigo">
            <TabsTrigger value="core" className="data-[state=active]:bg-[#0073a6] border-b-2 data-[state=active]:text-white rounded-sm px-4 py-2">Core</TabsTrigger>
            <TabsTrigger value="practical" className="data-[state=active]:bg-[#0073a6] data-[state=active]:text-white rounded-md px-4 py-2">Advance</TabsTrigger>
            <TabsTrigger value="advance" className="data-[state=active]:bg-[#0073a6] data-[state=active]:text-white rounded-md px-4 py-2">Specialization</TabsTrigger>
          </TabsList>
          <TabsContent value="core">
            <Tabs defaultValue="coreBasic" className="flex flex-col justify-center align-middle items-center w-full max-w-7xl">
              <TabsList className="grid max-w-7xl w-full grid-cols-2 bg-muted p-1 rounded-lg">
                <TabsTrigger value="coreBasic" className="data-[state=active]:border-[#0073a6] border-b-2 data-[state=active]:text-black rounded-sm px-4 py-2">Core Basic</TabsTrigger>
                <TabsTrigger value="corePractical" className="data-[state=active]:border-[#0073a6] border-b-2 data-[state=active]:text-black rounded-sm px-4 py-2">Core Practical</TabsTrigger>
              </TabsList>
              <TabsContent value="coreBasic">
                {coreBasic.map((item: any, index: number) => (
                  <CourseItem key={index} item={item} type="core"/>
                ))}
              </TabsContent>
              <TabsContent value="corePractical">
              {corePractical.map((item: any, index: number) => (
                  <CourseItem key={index} item={item} type="core"/>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="practical">
            {advanceCourse.map((item: any, index: number) => (
              <CourseItem key={index} item={item} type="practical"/>
            ))}
          </TabsContent>
          <TabsContent value="advance">
            {specializationCourse.map((item: any, index: number) => (
              <CourseItem key={index} item={item} type="advance"/>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CourseStructure;

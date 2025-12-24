"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2, Plus, Trash2, Upload } from "lucide-react"
import { Accordion, AccordionItem } from "@heroui/accordion"
import Image from "next/image"

interface AboutData {
  hero: { title: string; description: string; image: string };
  leadership: { name: string; title: string; designation: string; description: string; image: string };
  mission: { title: string; description: string };
  values: { title: string; description: string; image: string; _id?: string }[];
  roadAhead: { title: string; description: string };
  team: { name: string; title: string; image: string; _id?: string }[];
}

export default function AboutDashboardPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/about`);
      if (res.ok) {
        const json = await res.json();
        // Ensure arrays exist
        if (!json.values) json.values = [];
        if (!json.team) json.team = [];
        setData(json);
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to fetch data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/about`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast({ title: "Success", description: "About page updated!" });
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to save data", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const json = await res.json();
      // Prepend backend URL if relative path returned and needed (usually backend returns relative)
      return `${process.env.NEXT_PUBLIC_BACKEND_URL}${json.url}`; 
    }
    throw new Error("Upload failed");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    if (e.target.files?.[0]) {
      try {
        toast({ title: "Uploading image..." });
        const url = await uploadImage(e.target.files[0]);
        callback(url);
        toast({ title: "Image uploaded" });
      } catch (error) {
        toast({ title: "Upload Failed", variant: "destructive" });
      }
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!data) return <div className="p-8">Error loading data.</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#00415f]">Edit About Page</h1>
        <Button onClick={handleSave} disabled={saving} className="bg-[#0073a6]">
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>

      <Accordion className="w-full" selectionMode="multiple" defaultExpandedKeys={["1", "2"]}>
        <AccordionItem key="1" aria-label="Hero Section" title="Hero Section">
          <div className="space-y-4 p-4 border rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  value={data.hero?.title || ""} 
                  onChange={(e) => setData({...data, hero: {...data.hero, title: e.target.value}})} 
                />
              </div>
               <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={data.hero?.description || ""} 
                  onChange={(e) => setData({...data, hero: {...data.hero, description: e.target.value}})} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Background Image</Label>
              <div className="flex items-center gap-4">
                {data.hero?.image && (
                   <img src={data.hero.image} alt="Hero" className="h-20 w-32 object-cover rounded" />
                )}
                <Input type="file" onChange={(e) => handleFileUpload(e, (url) => setData({...data, hero: {...data.hero, image: url}}))} />
              </div>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem key="2" aria-label="Leadership Section" title="Leadership Section">
          <div className="space-y-4 p-4 border rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={data.leadership?.name || ""} onChange={(e) => setData({...data, leadership: {...data.leadership, name: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <Label>Title (e.g. Founder)</Label>
                <Input value={data.leadership?.title || ""} onChange={(e) => setData({...data, leadership: {...data.leadership, title: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <Label>Designation (e.g. FIA, FIAI)</Label>
                <Input value={data.leadership?.designation || ""} onChange={(e) => setData({...data, leadership: {...data.leadership, designation: e.target.value}})} />
              </div>
               <div className="space-y-2">
                <Label>Description</Label>
                <Textarea className="h-32" value={data.leadership?.description || ""} onChange={(e) => setData({...data, leadership: {...data.leadership, description: e.target.value}})} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <div className="flex items-center gap-4">
                {data.leadership?.image && (
                   <img src={data.leadership.image} alt="Leader" className="h-24 w-24 object-cover rounded-full" />
                )}
                <Input type="file" onChange={(e) => handleFileUpload(e, (url) => setData({...data, leadership: {...data.leadership, image: url}}))} />
              </div>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem key="3" aria-label="Our Team" title="Our Team">
          <div className="space-y-4 p-4 border rounded-md">
             {data.team.map((member, index) => (
               <div key={index} className="flex gap-4 items-start border-b pb-4 mb-4">
                 <div className="space-y-2 flex-1">
                   <Label>Name</Label>
                   <Input value={member.name} onChange={(e) => {
                     const newTeam = [...data.team];
                     newTeam[index].name = e.target.value;
                     setData({...data, team: newTeam});
                   }} />
                 </div>
                 <div className="space-y-2 flex-1">
                   <Label>Title</Label>
                   <Input value={member.title} onChange={(e) => {
                     const newTeam = [...data.team];
                     newTeam[index].title = e.target.value;
                     setData({...data, team: newTeam});
                   }} />
                 </div>
                 <div className="space-y-2">
                    <Label>Image</Label>
                    <div className="flex flex-col gap-2">
                      {member.image && <img src={member.image} className="h-16 w-16 object-cover rounded" />}
                      <Input type="file" className="w-48" onChange={(e) => handleFileUpload(e, (url) => {
                        const newTeam = [...data.team];
                        newTeam[index].image = url;
                        setData({...data, team: newTeam});
                      })} />
                    </div>
                 </div>
                 <Button variant="destructive" size="icon" onClick={() => {
                    const newTeam = data.team.filter((_, i) => i !== index);
                    setData({...data, team: newTeam});
                 }}>
                   <Trash2 className="h-4 w-4" />
                 </Button>
               </div>
             ))}
             <Button variant="outline" onClick={() => setData({...data, team: [...data.team, { name: "", title: "", image: "" }]})}>
               <Plus className="mr-2 h-4 w-4" /> Add Team Member
             </Button>
          </div>
        </AccordionItem>

        <AccordionItem key="4" aria-label="Mission" title="Our Mission">
           <div className="space-y-4 p-4 border rounded-md">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={data.mission?.title || ""} onChange={(e) => setData({...data, mission: {...data.mission, title: e.target.value}})} />
              </div>
               <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={data.mission?.description || ""} onChange={(e) => setData({...data, mission: {...data.mission, description: e.target.value}})} />
              </div>
           </div>
        </AccordionItem>

        <AccordionItem key="5" aria-label="Values" title="Our Values">
          <div className="space-y-4 p-4 border rounded-md">
             {data.values.map((val, index) => (
               <div key={index} className="flex gap-4 items-start border-b pb-4 mb-4">
                 <div className="space-y-2 flex-1">
                   <Label>Title</Label>
                   <Input value={val.title} onChange={(e) => {
                     const newValues = [...data.values];
                     newValues[index].title = e.target.value;
                     setData({...data, values: newValues});
                   }} />
                 </div>
                 <div className="space-y-2 flex-1">
                   <Label>Description</Label>
                   <Textarea value={val.description} onChange={(e) => {
                     const newValues = [...data.values];
                     newValues[index].description = e.target.value;
                     setData({...data, values: newValues});
                   }} />
                 </div>
                 <div className="space-y-2">
                    <Label>Icon/Image</Label>
                    <div className="flex flex-col gap-2">
                      {val.image && <img src={val.image} className="h-16 w-16 object-cover rounded" />}
                      <Input type="file" className="w-48" onChange={(e) => handleFileUpload(e, (url) => {
                         const newValues = [...data.values];
                         newValues[index].image = url;
                         setData({...data, values: newValues});
                      })} />
                    </div>
                 </div>
                 <Button variant="destructive" size="icon" onClick={() => {
                    const newValues = data.values.filter((_, i) => i !== index);
                    setData({...data, values: newValues});
                 }}>
                   <Trash2 className="h-4 w-4" />
                 </Button>
               </div>
             ))}
             <Button variant="outline" onClick={() => setData({...data, values: [...data.values, { title: "", description: "", image: "" }]})}>
               <Plus className="mr-2 h-4 w-4" /> Add Value
             </Button>
          </div>
        </AccordionItem>

        <AccordionItem key="6" aria-label="Road Ahead" title="The Road Ahead">
           <div className="space-y-4 p-4 border rounded-md">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={data.roadAhead?.title || ""} onChange={(e) => setData({...data, roadAhead: {...data.roadAhead, title: e.target.value}})} />
              </div>
               <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={data.roadAhead?.description || ""} onChange={(e) => setData({...data, roadAhead: {...data.roadAhead, description: e.target.value}})} />
              </div>
           </div>
        </AccordionItem>

      </Accordion>
    </div>
  )
}

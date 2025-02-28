"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {Accordion, AccordionItem} from "@heroui/accordion";
import { toast } from "@/hooks/use-toast"


export default function ContentPage() {
    const [content, setContent] = useState({
        home: {
            hero: {
                title: "Start your career with Get2Learn",
                description:
                    "Get2Learn is an initiative by Get2Act aimed at equipping budding actuaries with practical skills...",
            },
            vision: {
                title: "Vision",
                content: "To bridge the gap between actuarial education and industry requirements...",
            },
        },
        about: {
            hero: {
                title: "About Us",
                description: "Explore our comprehensive suite of actuarial and data-driven solutions.",
            },
        },
        contact: {
            address: "Office no.-144, Satra Plaza, Sector 19D, Vashi, Navi Mumbai – 400705",
            phone: "+91 9004943299",
            email: "admin@get2act.in",
        },
    })

    const handleSave = (section: string) => {
        // Handle saving content
        console.log(`Saving ${section}...`, content[section as keyof typeof content])
        toast({
            title: "Content Updated",
            description: `${section} content has been updated successfully.`,
        })
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#00415f]">Website Content</h1>
            <Accordion className="w-full">
                <AccordionItem value="home" title="Home Page">
                <div className="space-y-6 p-4">
                            <div className="space-y-4">
                                <h3 className="font-semibold">Hero Section</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="home-hero-title">Title</Label>
                                    <Input
                                        id="home-hero-title"
                                        value={content.home.hero.title}
                                        onChange={(e) =>
                                            setContent({
                                                ...content,
                                                home: {
                                                    ...content.home,
                                                    hero: {
                                                        ...content.home.hero,
                                                        title: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="home-hero-description">Description</Label>
                                    <Textarea
                                        id="home-hero-description"
                                        value={content.home.hero.description}
                                        onChange={(e) =>
                                            setContent({
                                                ...content,
                                                home: {
                                                    ...content.home,
                                                    hero: {
                                                        ...content.home.hero,
                                                        description: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <Button onClick={() => handleSave("home")} className="bg-[#0073a6]">
                                Save Home Content
                            </Button>
                        </div>
                </AccordionItem>

                <AccordionItem value="contact" title="Contact Information">
                <div className="space-y-6 p-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contact-address">Address</Label>
                                    <Textarea
                                        id="contact-address"
                                        value={content.contact.address}
                                        onChange={(e) =>
                                            setContent({
                                                ...content,
                                                contact: {
                                                    ...content.contact,
                                                    address: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact-phone">Phone</Label>
                                    <Input
                                        id="contact-phone"
                                        value={content.contact.phone}
                                        onChange={(e) =>
                                            setContent({
                                                ...content,
                                                contact: {
                                                    ...content.contact,
                                                    phone: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact-email">Email</Label>
                                    <Input
                                        id="contact-email"
                                        type="email"
                                        value={content.contact.email}
                                        onChange={(e) =>
                                            setContent({
                                                ...content,
                                                contact: {
                                                    ...content.contact,
                                                    email: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <Button onClick={() => handleSave("contact")} className="bg-[#0073a6]">
                                Save Contact Information
                            </Button>
                        </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}


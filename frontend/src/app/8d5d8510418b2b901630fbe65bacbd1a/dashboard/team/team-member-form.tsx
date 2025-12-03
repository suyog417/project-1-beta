"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string({
    required_error: "Please select a role.",
  }),
  displayOnWebsite: z.boolean().default(false),
  dashboardAccess: z.boolean().default(false),
  dashboardPassword: z.string().optional(),
})

interface TeamMemberFormProps {
  defaultValues?: {
    id?: string
    name: string
    email: string
    role: string
    displayOnWebsite: boolean
    dashboardAccess: boolean
    dashboardPassword?: string
  }
}

interface TeamMember {
    _id?: string,
    name: string,
    email: string,
    role: string,
    displayOnWebsite: boolean,
    dashboardAccess: boolean,
    dashboardPassword: string
}


export function TeamMemberForm({ defaultValues }: { defaultValues?: TeamMember }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      role: "",
      displayOnWebsite: false,
      dashboardAccess: false,
      dashboardPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teamMembers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        router.push("/8d5d8510418b2b901630fbe65bacbd1a/dashboard/team");
      } else {
        console.error("Failed to create team member");
      }
    } catch (error) {
      console.error("Error creating team member:", error);
    }

  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                      <Input placeholder="Assign a role" type="text" {...field} />
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="displayOnWebsite"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Display on Website</FormLabel>
                        <FormDescription>Show this team member on the public website</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dashboardAccess"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Dashboard Access</FormLabel>
                        <FormDescription>Allow this team member to access the dashboard</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {form.watch("dashboardAccess") && (
              <FormField
                control={form.control}
                name="dashboardPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dashboard Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="Enter password" {...field} />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Password for dashboard access. Only required if dashboard access is enabled.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end space-x-4">
              <Button variant="outline" asChild>
                <Link href="/team-members">Cancel</Link>
              </Button>
              <Button type="submit">{defaultValues?._id ? "Update" : "Create"} Team Member</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


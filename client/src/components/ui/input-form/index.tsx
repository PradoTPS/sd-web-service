"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { schemaMap } from "@/lib/schemas"

interface Props {
  schemaType: string;
  title: string;
  description: string;
  url: string;
  method: "POST" | "PUT";
}

export default function InputForm(props: Readonly<Props>) {
  const { schemaType, title, description, url, method } = props;
  const schema = schemaMap[schemaType] ?? z.object({}); // Fallback to an empty schema if not found

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  })

  function onSubmitForm(data: z.infer<typeof schema>) {
    const variableName = url.split("/").find(part => part.startsWith("{") && part.endsWith("}"))?.slice(1, -1);
    let modifiedUrl = url;

    if (variableName) {
      const variableValue = data[variableName];
      if (!variableValue) {
        console.error(`Missing value for variable: ${variableValue}`);
        return;
      }

      modifiedUrl = modifiedUrl.replace(`{${variableName}}`, variableValue);
    }

    const parsedData = {
      ...data,
    }

    if (parsedData["boardGames"]) {
      parsedData["boardGames"] = data.boardGames.split(",").map((id: string) => id.trim()).filter((id: string) => id !== "");
    }

    fetch(modifiedUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData),
    })
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex">
          <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
            {title}
          </CardTitle>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-2/3 space-y-6">
            {Object.keys(schema.shape).map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                    <FormControl>
                      <Input placeholder={key} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
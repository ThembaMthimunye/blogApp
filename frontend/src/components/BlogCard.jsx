import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Link } from "react-router-dom";
export function BlogCard({ postItem }) {
  let date = new Date(postItem.dateCreated);
  let stringDate = date.toString();
  return (
    <Card className="flex w-full justify-center my-4 hover:bg-muted mt-[10rem]">
      <Link
        to={`/ReadBlog/${postItem._id}`}
        className="w-full "
      >
        <CardHeader>
          <CardTitle>
            <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{postItem.title}</h1>
          </CardTitle>
          <CardDescription>
            <h2>{postItem.content}</h2>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3>{stringDate.slice(4, 15)}</h3>
        </CardContent>
      </Link>
    </Card>
  );
}

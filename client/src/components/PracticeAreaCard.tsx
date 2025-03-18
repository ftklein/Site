import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PracticeAreaCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  items: string[];
}

export default function PracticeAreaCard({
  icon,
  title,
  description,
  items,
}: PracticeAreaCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="text-center">
        <div className="mx-auto text-[#b28723] mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-[#26333b]">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-gray-700 before:content-['•'] before:mr-2 before:text-[#b28723]"
            >
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

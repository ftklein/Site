
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [stats] = useState({
    articles: 24,
    views: 1205,
    likes: 89
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Articles</h3>
          <p className="text-3xl font-bold">{stats.articles}</p>
          <Badge variant="secondary" className="mt-2">Published</Badge>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Views</h3>
          <p className="text-3xl font-bold">{stats.views}</p>
          <Badge variant="secondary" className="mt-2">Last 30 days</Badge>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Likes</h3>
          <p className="text-3xl font-bold">{stats.likes}</p>
          <Badge variant="secondary" className="mt-2">Total</Badge>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded">
            <div>
              <p className="font-medium">New Article Published</p>
              <p className="text-sm text-muted-foreground">Article about recent legal changes</p>
            </div>
            <Badge>New</Badge>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded">
            <div>
              <p className="font-medium">Comments Updated</p>
              <p className="text-sm text-muted-foreground">3 new comments on articles</p>
            </div>
            <Badge variant="secondary">Updated</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

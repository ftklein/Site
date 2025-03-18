import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import OfficePage from "@/pages/OfficePage";
import LawyerPage from "@/pages/LawyerPage";
import PracticeAreasPage from "@/pages/PracticeAreasPage";
import ArticlesPage from "@/pages/ArticlesPage";
import ContactPage from "@/pages/ContactPage";
import DashboardPage from "@/pages/DashboardPage";
import ArticleEditorPage from "@/pages/admin/ArticleEditorPage";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/office" component={OfficePage} />
            <Route path="/lawyer" component={LawyerPage} />
            <Route path="/practice-areas" component={PracticeAreasPage} />
            <Route path="/articles" component={ArticlesPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/admin/articles/new" component={ArticleEditorPage} />
            <Route path="/admin/articles/:id/edit" component={ArticleEditorPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/escritorio" component={OfficePage} />
          <Route path="/advogado" component={LawyerPage} />
          <Route path="/areas-atuacao" component={PracticeAreasPage} />
          <Route path="/artigos" component={ArticlesPage} />
          <Route path="/contato" component={ContactPage} />
          <Route path="/admin" component={DashboardPage} />
          <Route path="/admin/artigos/novo" component={ArticleEditorPage} />
          <Route path="/admin/artigos/:id" component={ArticleEditorPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

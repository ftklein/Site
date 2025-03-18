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

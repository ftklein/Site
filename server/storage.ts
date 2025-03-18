import { articles, type Article, type InsertArticle, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // Article operations
  getArticles(): Promise<Article[]>;
  getPublishedArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article>;
  deleteArticle(id: number): Promise<void>;

  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private articles: Map<number, Article>;
  private users: Map<number, User>;
  private articleCurrentId: number;
  private userCurrentId: number;

  constructor() {
    this.articles = new Map();
    this.users = new Map();
    this.articleCurrentId = 1;
    this.userCurrentId = 1;
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getPublishedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(article => article.published);
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(article => article.slug === slug);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.articleCurrentId++;
    const article: Article = {
      id,
      title: insertArticle.title,
      content: insertArticle.content,
      slug: insertArticle.slug,
      published: insertArticle.published || false,
      publishedAt: insertArticle.published ? new Date() : null,
    };
    this.articles.set(id, article);
    return article;
  }

  async updateArticle(id: number, updateData: Partial<InsertArticle>): Promise<Article> {
    const article = await this.getArticle(id);
    if (!article) throw new Error("Article not found");

    const updatedArticle: Article = {
      ...article,
      ...updateData,
      published: updateData.published ?? article.published,
      publishedAt: updateData.published ? (article.publishedAt || new Date()) : article.publishedAt,
    };
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }

  async deleteArticle(id: number): Promise<void> {
    this.articles.delete(id);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
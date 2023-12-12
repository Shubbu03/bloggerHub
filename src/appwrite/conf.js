/* eslint-disable no-useless-catch */
import config from "../config/config.js";
import { Client, ID, Account, Databases, Storage, Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectID);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
      );
    } catch (error) {
      return false;
    }
  }

  async getAllPost(query = [Query.equal("status", "public")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        query
      );
    } catch (error) {
      return false;
    }
  }

  async fileUpload(file) {
    try {
      await this.bucket.createFile(config.appwriteBucketID, ID.unique(), file);
    } catch (error) {
      return false;
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketID, fileID);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getFilePreview(fileID) {
    try {
      return await this.bucket.getFilePreview(config.appwriteBucketID, fileID);
    } catch (error) {
      return false;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;

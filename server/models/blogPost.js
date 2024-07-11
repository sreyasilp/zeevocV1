import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  images: String,
  title: String,
  category: String,
  html_content: String,
  author:String,
  urlKey: String
});

const BlogPost = mongoose.model('BlogPost', blogSchema);

export default BlogPost;

[
  {
    "title": "Uses and Comparison of Events vs Observers in Magento 2",
    "content": "Detailed explanation of events and observers, their uses and differences in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Best Practices",
    "images": "02",
    "urlKey": "events-vs-observers-magento-2"
  },
  {
    "title": "Factory vs Repository in Magento 2",
    "content": "Understanding the uses of Factory and Repository patterns in Magento 2 development.",
    "author": "Zeevoc Digital",
    "category": "Best Practices",
    "images": "03",
    "urlKey": "factory-vs-repository-magento-2"
  },
  {
    "title": "Uses of RabbitMQ in Magento 2",
    "content": "Exploring the applications and benefits of RabbitMQ in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Performance",
    "images": "04",
    "urlKey": "uses-of-rabbitmq-magento-2"
  },
  {
    "title": "DB Schema and Whitelist in Magento 2",
    "content": "A comprehensive guide to DB schema and whitelist management in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Database Management",
    "images": "02",
    "urlKey": "db-schema-whitelist-magento-2"
  },
  {
    "title": "Creating Custom Indexers in Magento 2",
    "content": "Step-by-step guide to creating custom indexers in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Development",
    "images": "03",
    "urlKey": "creating-custom-indexers-magento-2"
  },
  {
    "title": "Building a Custom Payment Method in Magento 2",
    "content": "Learn how to build a custom payment method in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Customization",
    "images": "04",
    "urlKey": "building-custom-payment-method-magento-2"
  },
  {
    "title": "Implementing Custom Shipping Methods in Magento 2",
    "content": "A guide to implementing custom shipping methods in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Customization",
    "images": "02",
    "urlKey": "implementing-custom-shipping-methods-magento-2"
  },
  {
    "title": "Understanding System XML in Magento 2",
    "content": "An in-depth look at system XML configuration in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Configuration",
    "images": "03",
    "urlKey": "understanding-system-xml-magento-2"
  },
  {
    "title": "Config XML in Magento 2: A Detailed Guide",
    "content": "Learn about the importance and usage of config XML in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Configuration",
    "images": "04",
    "urlKey": "config-xml-magento-2"
  },
  {
    "title": "Magento 2 Plugins: How and When to Use Them",
    "content": "A detailed guide on the use of plugins in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Development",
    "images": "02",
    "urlKey": "magento-2-plugins-usage"
  },
  {
    "title": "Preferences in Magento 2: Best Practices",
    "content": "Understanding and using preferences in Magento 2 development.",
    "author": "Zeevoc Digital",
    "category": "Best Practices",
    "images": "03",
    "urlKey": "preferences-magento-2"
  },
  {
    "title": "Access Control Lists (ACL) in Magento 2",
    "content": "A comprehensive guide to Access Control Lists in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Security",
    "images": "04",
    "urlKey": "acl-magento-2"
  },
  {
    "title": "Content Security Policy (CSP) in Magento 2",
    "content": "An overview of Content Security Policy implementation in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Security",
    "images": "02",
    "urlKey": "csp-magento-2"
  },
  {
    "title": "CSP Whitelist in Magento 2",
    "content": "Guide to configuring CSP whitelist in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Security",
    "images": "03",
    "urlKey": "csp-whitelist-magento-2"
  },
  {
    "title": "What Happens During Setup Upgrade in Magento 2",
    "content": "A deep dive into the setup upgrade process in Magento 2.",
    "author": "Zeevoc Digital",
    "category": "Setup",
    "images": "04",
    "urlKey": "setup-upgrade-magento-2"
  }
]

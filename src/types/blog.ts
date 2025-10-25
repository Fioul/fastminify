export interface BlogArticle {
  id: string
  slug: string | { fr: string; en: string }
  title: string
  excerpt: string
  category: string
  tags: string[]
  publishedAt: string
  readingTime: string
  featured: boolean
  heroImage?: string
}

export interface BlogCategory {
  id: string
  name: string
  description: string
}

export interface BlogContent {
  title: string
  excerpt: string
  content: {
    introduction: {
      title: string
      text: string
      benefits: string[]
    }
    techniques: {
      title: string
      sections: {
        title: string
        description: string
        example: {
          before: string
          after: string
        }
      }[]
    }
    examples: {
      title: string
      sections: {
        title: string
        description: string
        code: {
          before: string
          after: string
        }
      }[]
    }
    tools: {
      title: string
      sections: {
        title: string
        description: string
        tools: {
          name: string
          description: string
          features: string[]
          command?: string
        }[]
      }[]
    }
    bestPractices: {
      title: string
      sections: {
        title: string
        description: string
        tips?: string[]
        checklist?: string[]
        techniques?: string[]
      }[]
    }
    pitfalls: {
      title: string
      sections: {
        title: string
        description: string
        examples?: string[]
        example?: {
          before: string
          after: string
          note: string
        }
      }[]
    }
    metrics: {
      title: string
      sections: {
        title: string
        description: string
        example?: {
          original: string
          minified: string
          reduction: string
        }
        metrics?: string[]
        tools?: string[]
      }[]
    }
    conclusion: {
      title: string
      text: string
      recommendations: string[]
      cta: {
        text: string
        button: string
      }
    }
  }
  meta: {
    keywords: string
    description: string
  }
}

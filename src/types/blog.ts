export interface BlogPost {
  id: string
  slug: string
  titre: string
  meta_description: string | null
  og_image_url: string | null
  published_at: string | null
}

export interface BlogPostFull extends BlogPost {
  contenu_markdown: string | null
  updated_at: string | null
}

export type Usuario = {
    id: number
    nickName: string
    email?: string
}

export type Post = {
    id: number
    texto: string
    createdAt?: Date
    userId?: number
    Tags?: Tag[]
    Post_images?: Post_image[]
    Comments?: Comment[]
}

export type Comment = {
    id?: number
    texto: string
    createdAt?: Date
    userId?: number
    postId?: number
}

export type Post_image = {
    id?: number
    url: string
    postId?: number
}

export type Tag = {
    id: number
    texto: string
}


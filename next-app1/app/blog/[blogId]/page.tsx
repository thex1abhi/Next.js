// learning about dynamic routes


interface GetBlogIdfromUrl {
    params: Promise<{
        blogId: string;

    }>;
}

export default async function Blog({ params }: GetBlogIdfromUrl) {

    const { blogId   } = await params;

    return (
        <>
            <div> Hello dynamic blog id  page    </div>
            <h3> {blogId} </h3>
        </>
    )
} 


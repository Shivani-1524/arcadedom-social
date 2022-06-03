export const getTrendingPosts = (posts) => {
    let todaysDate = new Date()
    let newSortedPost = [...posts]
    newSortedPost.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    let recentPosts = []
    let olderPostIndex = 0
    for (let i = 0; newSortedPost.length > i; i++) {
        console.log("hello")
        let currentPostDate = new Date(newSortedPost[i].createdAt)
        const diffDays = (todaysDate - currentPostDate) / (1000 * 60 * 60 * 24)
        console.log(diffDays)
        if (diffDays > 50) {
            olderPostIndex = i
            break;
        }
        recentPosts.push(newSortedPost[i])
    }
    console.log("return ", [...recentPosts.sort((a, b) => b.likes.likeCount - a.likes.likeCount)])
    return [...recentPosts.sort((a, b) => {
        if (b.likes.likeCount > a.likes.likeCount) return 1
        if (a.likes.likeCount > b.likes.likeCount) return -1
        if (b.comments.length > a.comments.length) return 1
        if (a.comments.length > b.comments.length) return -1
        return 0;
    }), ...newSortedPost.slice(olderPostIndex).sort((a, b) => b.likes.likeCount - a.likes.likeCount)]
}
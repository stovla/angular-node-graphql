const { create } = require('../models/post');
const Post = require('../models/post');

module.exports = {
    posts: async function() {
        const posts = await Post.find()
        return {
            posts: posts.map(post => {
                return {
                    ...post._doc,
                    _id: post._id.toString()
                }
            })
        }
    },
    createPost: async function ({ postInput }) {
        const post = new Post({
            title: postInput.title,
            content: postInput.content
        })
        const createdPost = await post.save();
        return {
            ...createdPost._doc,
            _id: createdPost._id.toString()
        }
    },
    updatePost: async function({ id, postInput }) {
        const post = await Post.findById(id);
        if (!post) {
            throw new Error('No Quote Found');
        }
        post.post = postInput.post;
        post.title = postInput.title;
        post.content = postInput.content;
        const updatedPost = await post.save();
        return {
            ...updatedPost._doc,
            _id: updatedPost._id.toString()
        };
    },
    deletePost: async function({ id }) {
        const post = await Post.findById(id);
        if (!post) {
            throw new Error('No Quote Found');
        }
        await post.remove();
        return {
            ...post._doc,
            _id: post._id.toString()
        };
    }
}

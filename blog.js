let posts = [];
let editIndex = null;

function addOrUpdatePost() {
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    if (!title || !content) {
        alert("Please fill in both fields.");
        return;
    }

    if (editIndex !== null) {
        posts[editIndex] = { title, content };
        editIndex = null;
        
    } else {
        posts.push({ title, content });
        console.log(posts)
    }

    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    renderPosts();
}

function renderPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';

    posts.forEach((post, index) => {
        const postEl = document.createElement('div');
        postEl.className = 'post';

        postEl.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <div class="post-actions">
        <button class="edit" onclick="editPost(${index})">Edit</button>
        <button class="delete" onclick="deletePost(${index})">Delete</button>
    </div>
    `;

        postsDiv.appendChild(postEl);
    });
}

function editPost(index) {
    document.getElementById('title').value = posts[index].title;
    document.getElementById('content').value = posts[index].content;
    editIndex = index;
}

function deletePost(index) {
    if (confirm("Are you sure you want to delete this post?")) {
        posts.splice(index, 1);
        renderPosts();
    }
}

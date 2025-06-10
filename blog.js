// Global variables to hold blog posts and edit index
let posts = [];
let editIndex = null;

// Load existing posts from localStorage (if any)
const stored = localStorage.getItem("BlogPost");
posts = stored ? JSON.parse(stored) : [];

// On window load, render existing posts
window.onload = function () {
  renderPosts();
  console.log("welcome");
};

// Handles adding a new post or updating an existing one
function addOrUpdatePost() {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const imageInput = document.getElementById("image");
  const postButton = document.getElementById("post-btn");

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  postButton.innerHTML = "Post"; //  This is for my reset button text

  if (!title || !content) {
    alert("Please fill in both fields.");
    return;
  }

  const file = imageInput.files[0]; // Get selected image

  if (file) {
    // If there's an image, read it as Base64 that is a long text format of an image 
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageBase64 = event.target.result;
      savePost(title, content, imageBase64);
    };
    reader.readAsDataURL(file);
  } else {
    // If no image uploaded, keep existing image (for edits) or use empty string
    const existingImage = (editIndex !== null && posts[editIndex].image) ? posts[editIndex].image : "";
    savePost(title, content, existingImage);
  }

  // Clear input fields
  titleInput.value = "";
  contentInput.value = "";
  imageInput.value = "";
}

// Saves the post (new or edited) to the posts array and localStorage
function savePost(title, content, imageBase64) {
  const newPost = {
    title,
    content,
    image: imageBase64,
    createdAt: new Date().toISOString(),
  };

  if (editIndex !== null) {
    // Update existing post
    posts[editIndex] = newPost;
    editIndex = null;
  } else {
    // Add new post
    posts.push(newPost);
  }

  // Save posts to localStorage and shows it 
  localStorage.setItem("BlogPost", JSON.stringify(posts));
  renderPosts();
}

// Displays all blog posts on the page
function renderPosts() {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = ""; // Clear previous content

  posts.forEach((post, index) => {
    const postEl = document.createElement("div");
    postEl.className = "post";

    const date = post.createdAt
      ? new Date(post.createdAt).toLocaleString()
      : "Unknown date";

    // Create the post HTML structure, include image if it exists
    postEl.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      ${post.image ? `<img src="${post.image}" alt="Post Image" style="max-width: 100%; height: auto;" />` : ""}
      <small><em>Posted on: ${date}</em></small>
      <div class="post-actions">
        <button class="edit" onclick="editPost(${index})">Edit</button>
        <button class="delete" onclick="deletePost(${index})">Delete</button>
      </div>
    `;

    postsDiv.appendChild(postEl);
  });
}

// Populates the form fields with post data for editing
function editPost(index) {
  const post = posts[index];
  const postButton = document.getElementById("post-btn");

  document.getElementById("title").value = post.title;
  document.getElementById("content").value = post.content;
  postButton.innerHTML = "Repost";
  editIndex = index;
}

// Deletes a single post
function deletePost(index) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts.splice(index, 1);
    localStorage.setItem("BlogPost", JSON.stringify(posts));
    renderPosts();
  }
}

// Deletes all posts
function deleteAllPosts() {
  if (confirm("Are you sure you want to delete all the posts?")) {
    posts = [];
    localStorage.setItem("BlogPost", JSON.stringify(posts));
    renderPosts();
  }
}
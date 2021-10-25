<template>
    <div class="container">
      <div class="filter-container">
        <input type="text" class="form-control mb-4 mt-5" v-model="authorSearch" placeholder="Filter by author...">
      </div>
      <div class="posts-container">
          <div class="card" style="width: 18rem;" v-for="post in filtredPosts" :key="post.id">
            <div class="card-body">
              <h5 class="card-title blue">{{post.title}}</h5>
              <p class="card-text">{{post.body}}</p>
              <p class="card-text grey">{{post.author}}</p>
            </div>
          </div>
      </div>
    </div>
</template>

<script>

import { makeRequest } from '@/api/server';

export default {
  name: 'App',
  data() {
      return {
        posts: null,
        authors: [],
        authorSearch: '',
      }
  },
  created() {
    Promise.all([ makeRequest('http://jsonplaceholder.typicode.com/posts')
      .then(data => {
          this.posts = data;
      }),
    makeRequest('https://jsonplaceholder.typicode.com/users')
      .then(data => {
          let newData = data.map(item => item.name);
          this.authors = newData;
          console.log(this.authors);
      })])
    .then(() => {
        let postsModified = this.posts.map((item, i) => {
          let number = parseInt(Math.random() * (this.authors.length));
          item.author = this.authors[number];
          return item;
      })
      this.posts = postsModified;
    });
  },
  computed: {
    filtredPosts() {
       if (this.posts !== null) {
          return this.posts.filter(post => post.author.toLowerCase().includes(this.authorSearch.toLowerCase()));
       } else {
          return 'not found';
       }
    }
  },
  methods: {
  },
  components: {
    
  }
};

</script>

<style>

  .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px 50px;
  }

  .posts-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
  }

  .card {
    margin: 8px;
  }

  .filter-container {
    margin: auto;
    max-width: 300px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .blue {
    color: blue;
    font-weight: 700;
  }

  .grey {
    color: grey;
  }

  
</style>

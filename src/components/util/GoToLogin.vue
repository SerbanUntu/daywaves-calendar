<script setup lang="ts"></script>

<template>
  <main class="go-to-login">
    <h1>Looks like you are not logged in</h1>
    <section class="buttons">
      <article class="nav-button" @click="$router.push('/login')">
        <p>Log in</p>
      </article>
      <article class="nav-button" @click="$router.push('/register')">
        <p>Create an account</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.go-to-login {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px;
}

.buttons {
  display: flex;
  flex-direction: row;
}

.nav-button {
  cursor: pointer;

  margin: 20px;
  padding: 20px;

  text-align: center;

  background-color: var(--element-gray);
  border-radius: 20px;

  transition: 200ms;
}

.nav-button:hover {
  background-color: var(--highlight-gray);
  transition: 200ms;
}

.nav-button:active {
  background-color: var(--daywaves-blue);
  transition: 0ms;
}
</style>

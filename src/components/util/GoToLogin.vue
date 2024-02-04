<script setup lang="ts"></script>

<template>
  <div class="go-to-login">
    <h1>Looks like you are not logged in</h1>
    <div class="buttons">
      <div class="nav-button" @click="$router.push('/login')">
        <p>Log in</p>
      </div>
      <div class="nav-button" @click="$router.push('/register')">
        <p>Create an account</p>
      </div>
    </div>
  </div>
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

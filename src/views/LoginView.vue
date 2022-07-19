<template>
  <div class="login__wrapper">
    <div class="login__box">
      <div class="login__logo">
        <h1 class="login__logo-title">GloGlo</h1>
        <LogoIcon></LogoIcon>
      </div>
      <button class="login__button" type="button" @click="singInWithGoogle">
        <span class="login__button-wrapper"><GoogleIcon></GoogleIcon></span>Sign
        in with Google
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import router from "@/router";
import { onMounted, onUnmounted } from "vue";
import GoogleIcon from "@/components/icons/IconGoogle.vue";
import LogoIcon from "@/components/icons/IconLogo.vue";
function singInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  document.body.classList.add("login");
});
onUnmounted(() => {
  document.body.classList.remove("login");
});
</script>

<style lang="scss">
.login {
  main {
    padding: 0px;
  }
  .menu {
    display: none;
  }
  &__logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-title {
      margin: 0;
    }
  }
  &__box {
    width: 295px;
    height: 190px;
    background: $bg-secondary;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    border-radius: 10px;
    padding: 25px 50px 25px 50px;
  }
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  &__button {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    width: 200px;
    height: 40px;
    padding: 0px 15px 0 0;
    background: #00000025;
    color: $white;
    &-wrapper {
      background: $white;
      height: 39px;
      width: 39px;
      //border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

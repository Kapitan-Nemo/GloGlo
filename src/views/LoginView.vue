<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { onMounted, onUnmounted } from "vue";
import router from "@/router";
import Logo from "@/assets/icons/logo/logo.svg?component";
import LoginCharacter from "@/assets/icons/other/login-character.svg?component";
import GoogleIcon from "@/assets/icons/social/google.svg?component";

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

<template>
  <div class="login__wrapper">
    <img class="login__shape-left" src="@/assets/images/shape1.png" />
    <div class="login__box">
      <div class="login__box-left">
        <LoginCharacter></LoginCharacter>
      </div>
      <div class="login__box-right">
        <img class="login__shape-right" src="@/assets/images/shape2.png" />
        <div class="login__logo">
          <h1 class="login__logo-title">GloGlo</h1>
          <Logo></Logo>
        </div>
        <button class="login__button" type="button" @click="singInWithGoogle">
          <span class="login__button-wrapper"><GoogleIcon></GoogleIcon></span
          >Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login {
  main {
    padding: 0px;
  }
  .menu {
    display: none;
  }
  &__shape {
    &-left {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 300px;
    }
    &-right {
      position: absolute;
      right: 0;
      top: 0;
      width: 400px;
      transform: rotate(45deg);
    }
  }
  &__logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 50px 0;
    &-title {
      margin: 0;
    }
  }
  &__box {
    display: flex;
    flex-flow: row;
    align-items: center;
    width: 600px;
    height: 300px;
    background: $bg-secondary;
    border-radius: 10px;
    &-left {
      background: white;
      padding: 25px;
      margin: 0 50px 0px 0;
      border-radius: 10px;
    }
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
      height: 39px;
      width: 39px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppliance } from '@/stores/appliance'
import { useModal } from '@/stores/modal'
import { cards } from '@/common/constans'
import ApplianceHero from '@/components/ApplianceHero.vue'
import ApplianceNew from '@/components/ApplianceNew.vue'
import ApplianceSummary from '@/components/ApplianceSummary.vue'
import icon from '@/components/dynamicIcon.vue'

const { applianceList, kwhCost } = storeToRefs(useAppliance())
const { showSummary } = storeToRefs(useModal())
const editable = ref(false)

function removeAppliance(id: number) {
  applianceList.value = applianceList.value.filter(item => item.id !== id)
}
</script>

<template>
  <ApplianceHero />
  <transition name="modal">
    <ApplianceNew />
  </transition>

  <transition name="modal">
    <ApplianceSummary />
  </transition>

  <section v-if="applianceList.length === 0" class="hero__empty">
    <div class="container-fluid">
      <h2 class="hero__empty-title">
        Whoops! You haven't added any<br> appliances yet.
      </h2>
      <icon name="empty" path="hero" width="200" height="200" class="hero__empty-image" />
    </div>
  </section>

  <section v-else class="appliance">
    <div class="container-fluid">
      <div class="appliance__title-wrap">
        <h2 class="appliance__title">
          Your appliances:
        </h2>
        <div class="appliance__button-wrap">
          <button v-if="applianceList.length > 1" class="appliance__button-summary" @click="showSummary = true">
            <span class="appliance__button-summary-wrap">Summary
              <icon path="buttons" name="summary" width="26" height="36" />
            </span>
          </button>
          <button class="appliance__button-setting" @click="editable = !editable">
            <span class="appliance__button-setting-wrap">{{ editable ? 'Hide' : 'Show' }}
              <icon path="buttons" name="settings" width="40" height="40" />
            </span>
          </button>
        </div>
      </div>
      <div class="appliance__card-wrapper">
        <div v-for="appliance in applianceList" :key="appliance.id" class="appliance__card">
          <transition>
            <div v-if="editable" class="appliance__options">
              <button class="appliance__options-delete" @click="removeAppliance(appliance.id)">
                <icon path="controls" name="delete" class="appliance__options-delete-icon" />
                Delete
              </button>
            </div>
          </transition>

          <div class="appliance__card__header">
            <p class="appliance__card__header-title">
              {{ appliance.device }}
            </p>
            <icon class="appliance__card__header-image" path="devices" :name="appliance.icon" />
          </div>
          <div class="appliance__card__body">
            <div v-for="card in cards" :key="card.id" class="appliance__card__body-item">
              <div class="appliance__card__body-wrapper">
                <icon path="controls" :name="card.icon" class="modal__body-icon" width="30" height="30" />
                <p class="appliance__card__body-title">
                  {{ card.title }}
                </p>
              </div>
              <span v-if="card.id === 1" class="appliance__card__body-badge">{{ appliance.wattage }} W</span>
              <span v-if="card.id === 2" class="appliance__card__body-badge">{{ appliance.time }} H</span>
              <span v-if="card.id === 3" class="appliance__card__body-badge">{{ appliance.kwh }} kwh</span>
            </div>
          </div>
          <div class="appliance__card__footer">
            <p class="appliance__card__footer-title">
              {{ (appliance.kwh * appliance.time * kwhCost * 30).toFixed(2) }} PLN <small>Per month</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.appliance {
  @include max-lg {
    margin: 100px 0 0 0;
  }
  &__title {
    font-size: 40px;
    margin: 0 0 15px 0;
    @include max-lg {
      font-size: 25px;
      margin: 30px 0 15px 0;
      font-variation-settings: "wght" 500;
    }
  }
  &__title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row;
    margin: 0 0 30px 0;
    @include max-lg {
      flex-flow: column-reverse;
      margin: 0;
    }
  }
  &__button-wrap {
    display: flex;
    flex-flow: row;
  }
  &__button-setting {
    font-size: 25px;
    background: $secondary;
    color: $primary;
    border-radius: 20px;
    height: 70px;
    width: 315px;
    cursor: pointer;
    font-variation-settings: "wght" 400;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include max-lg {
      width: 80px;
      height: 70px;
      font-size: 0px;
      justify-content: center;
      margin: 0px;
    }
    &-wrap {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 0px 15px 0 15px;
      align-items: center;
      @include max-lg {
        display: flex;
        width: auto;
        justify-content: space-between;
        padding: 0;
        align-items: center;
      }
    }
  }
  &__button-summary {
    font-size: 25px;
    background: $primary;
    color: $primary-light;
    border-radius: 20px;
    height: 70px;
    width: 315px;
    margin: 0 30px 0 0;
    cursor: pointer;
    font-variation-settings: "wght" 400;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include max-lg {
      width: 80px;
      height: 70px;
      font-size: 0px;
      justify-content: center;
      margin: 0px 30px 0 0;
    }
    &-wrap {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 0px 15px 0 15px;
      align-items: center;
      @include max-lg {
        display: flex;
        width: auto;
        justify-content: space-between;
        padding: 0;
        align-items: center;
      }
    }
  }
  &__options {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: rgba(29, 43, 71, 0.5);
    border-radius: 20px;
    &-delete {
      width: 100px;
      height: 100px;
      background: $primary;
      color: $primary-light;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      cursor: pointer;
      transition: 0.6s all;
      &:hover {
        transform: translateY(-10px);
        transition: 0.6s all;
      }
      &-icon {
        margin: 0 0 15px 0;
      }
    }
  }
  &__card-wrapper {
    display: flex;
    flex-flow: wrap;
    flex-direction: row;
  }
  &__card {
    position: relative;
    margin: 0 30px 30px 0;
    width: calc(1 / 3 * 100% - (1 - 1 / 3) * 30px);
    min-width: 500px;
    border-radius: 30px;
    -webkit-box-shadow: 0px 2px 40px 10px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 0px 2px 40px 10px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 2px 40px 10px rgba(0, 0, 0, 0.05);
    @include max-lg {
      width: 100%;
      min-width: auto;
      margin: 0 0 30px 0;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
    &__header {
      background: $primary-light;
      color: $primary;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 85px;
      border-radius: 30px 30px 0 0;
      padding: 25px;
      @include max-lg {
        height: 70px;
      }
      &-title {
        font-size: 30px;
        font-variation-settings: "wght" 400;
        @include max-lg {
          font-size: 20px;
        }
      }
      &-image {
        @include max-sm {
          width: 40px;
          max-height: 50px;
        }
      }

    }
    &__body {
      padding: 0px 25px 0px 25px;
      @include max-lg {
        padding: 0px 15px 0px 15px;
      }
      &-icon {
        margin: 0 30px 0 0px;
      }
      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 50px 0 50px 0;
        @include max-lg {
          padding: 25px 0 0px 0;
        }
        &:first-of-type {
          padding: 50px 0 0 0;
          @include max-lg {
            padding: 25px 0 0px 0;
          }
        }
        &:last-of-type {
          padding: 0 0 50px 0;
          @include max-lg {
            padding: 25px 0 25px 0;
          }
        }
      }
      &-title {
        font-size: 20px;
        font-variation-settings: "wght" 400;
        margin: 0;
        @include max-lg {
          font-size: 14px;
        }
      }
      &-wrapper {
        display: flex;
        align-items: center;
      }
      &-badge {
        background: $secondary-light;
        color: $primary;
        font-size: 20px;
        min-width: 85px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        padding: 0 15px 0 15px;
        @include max-lg {
          font-size: 14px;
          min-width: 65px;
          min-height: 30px;
          text-align: center;
        }
      }
    }
    &__footer {
      background: $primary;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 85px;
      border-radius: 0 0 30px 30px;
      padding: 25px;
      @include max-lg {
        height: 70px;
      }
      &-title {
        font-size: 30px;
        font-variation-settings: "wght" 400;
        color: $white;
        display: flex;
        flex-flow: column;
        align-items: center;
        @include max-lg {
          font-size: 20px;
        }
        small {
          font-size: 10px;
        }
      }
    }
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

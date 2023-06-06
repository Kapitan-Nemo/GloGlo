<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import modal from './Modal/ModalTemplate.vue'

import { useModal } from '@/stores/modal'
import { useAppliance } from '@/stores/appliance'
import icon from '@/components/dynamicIcon.vue'

const { showSummary } = storeToRefs(useModal())
const { applianceList, kwhCost } = storeToRefs(useAppliance())

const costSummary = computed(() => {
  return applianceList.value.reduce((acc, appliance) => {
    return acc + appliance.kwh * appliance.time * kwhCost.value
  }, 0)
})
</script>

<template>
  <modal v-show="showSummary">
    <template #header>
      <h2 class="modal__title">
        Summary
      </h2>
      <icon name="close" path="controls" class="modal__header-close" @click="showSummary = false" />
    </template>
    <template #body>
      <icon name="cost" path="controls" class="modal__summary-icon" />
      <div class="modal__summary-body">
        <p class="modal__summary-title">
          Costs of all appliances
        </p>
        <div class="modal__body-item modal__summary-item">
          <div class="modal__body-item-wrapper">
            <icon name="day" path="controls" class="modal__body-icon" />
            <label class="modal__body-label">Per day:</label>
          </div>
          <div class="modal__body-item-wrapper">
            <p class="modal__summary-badge">
              {{ costSummary.toFixed(2) }} PLN
            </p>
          </div>
        </div>
        <div class="modal__body-item modal__summary-item">
          <div class="modal__body-item-wrapper">
            <icon name="month" path="controls" class="modal__body-icon" />
            <label class="modal__body-label">Per month:</label>
          </div>
          <div class="modal__body-item-wrapper">
            <p class="modal__summary-badge">
              {{ (costSummary * 30).toFixed(2) }} PLN
            </p>
          </div>
        </div>
        <div class="modal__body-item">
          <div class="modal__body-item-wrapper">
            <icon path="controls" name="year" class="modal__body-icon" />
            <label class="modal__body-label">Per year:</label>
          </div>
          <div class="modal__body-item-wrapper">
            <p class="modal__summary-badge">
              {{ (costSummary * 365).toFixed(2) }} PLN
            </p>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <button class="modal__footer-button">
          Download CSV
        </button>
      </div>
    </template>
  </modal>
</template>

<style lang="scss">
.modal {
  &__summary {
    &-body {
      padding: 25px 25px 25px 25px;
    }
    &-item {
      margin: 0 0 30px 0;
    }
    &-title {
      font-size: 25px;
      font-variation-settings: "wght" 500;
      margin: 0 0 30px 0;
      text-align: center;
      @include max-lg {
        font-size: 20px;
      }
    }
    &-icon {
      max-width: 150px;
      margin: -60px auto 0 auto;
      display: flex;
    }
    &-badge {
      font-size: 20px;
      background: $secondary;
      color: $primary;
      margin: 0;
      padding: 10px 20px 10px 20px;
      border-radius: 20px;
      @include max-lg {
        font-size: 14px;
      }
    }
  }
}
</style>

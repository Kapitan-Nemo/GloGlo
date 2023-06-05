<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useModal } from '@/stores/modal'
import { useAppliance } from '@/stores/appliance'
import modal from '@/components/Modal/ModalTemplate.vue'

const { applianceList, kwhCost } = storeToRefs(useAppliance())
const { show } = storeToRefs(useModal())

const newWattage = ref(0)
const newTime = ref(0)
const newDevice = ref('')

const showModalError = ref(false)

function addAppliance() {
  applianceList.value.push({
    id: applianceList.value.length + 1,
    wattage: newWattage.value,
    time: newTime.value,
    device: newDevice.value,
    kwh: (newWattage.value * 0.001 * newTime.value * 0.7).toFixed(2) as unknown as number,
    icon: 'test.svg',
  })
  newWattage.value = 0
  newTime.value = 0
  newDevice.value = ''
}

watch(newTime, () => {
  if (newTime.value > 24)
    setTimeout(() => (newTime.value = 24), 2000)
})

// function submitForm() {
//   if (newWattage.value === '' || newTime.value === '' || newTime.value > 24 || newDevice.value === '') {
//     setTimeout(() => (showModalError.value = false), 2000)
//     return (showModalError.value = true)
//   }
//   else {
//     addAppliance()
//     document.body.classList.remove('overflow-hidden')
//     show.value = false
//   }
// }
</script>

<template>
  <modal v-show="show">
    <template #header>
      <h2 class="modal__title">
        Add new appliance
      </h2>
      <img
        class="modal__header-close"
        src="@/assets/svg/controls/close.svg"
        @click="show = false"
      >
    </template>
    <template #body>
      <transition>
        <div v-if="showModalError" class="modal__error">
          <span class="modal__error-wrapper">
            <img
              class="modal__error-icon"
              src="@/assets/svg/controls/warning.svg"
            >
            Error!
          </span>

          <p class="modal__error-text">
            Please complete all fields.
          </p>
        </div>
      </transition>
      <transition>
        <div v-if="newTime > 24" class="modal__error">
          <span class="modal__error-wrapper">
            <img
              class="modal__error-icon"
              src="@/assets/svg/controls/warning.svg"
            >
            Error!
          </span>

          <p class="modal__error-text">
            Max used per day is 24h
          </p>
        </div>
      </transition>

      <div class="modal__body">
        <div class="modal__body-item">
          <div class="modal__body-item-wrapper">
            <img
              class="modal__body-icon"
              src="@/assets/svg/controls/device.svg"
            >
            <label class="modal__body-label">Choose device:</label>
          </div>
          <select v-model="newDevice" class="modal__body-select">
            <option disabled value="">
              Please Select
            </option>
            <option>Washing machine</option>
            <option>Fridge</option>
            <option>TV</option>
            <option>Other</option>
          </select>
        </div>
        <div class="modal__body-items-mobile">
          <div class="modal__body-item modal__body-item-mobile">
            <div class="modal__body-item-wrapper">
              <img
                class="modal__body-icon"
                src="@/assets/svg/controls/wattage.svg"
              >
              <label class="modal__body-label">Wattage:</label>
            </div>
            <div class="modal__body-item-wrapper">
              <input
                v-model="newWattage"
                type="number"
                inputmode="decimal"
                class="modal__body-input"
              >
              <input
                class="modal__body-input-placeholder"
                type="text"
                value="W"
                disabled
              >
            </div>
          </div>
          <div class="modal__body-item modal__body-item-mobile">
            <div class="modal__body-item-wrapper">
              <img
                class="modal__body-icon"
                src="@/assets/svg/controls/time.svg"
              >
              <label class="modal__body-label">Used per day:</label>
            </div>
            <div
              class="modal__body-item-wrapper modal__body-item-wrapper-mobile"
            >
              <input
                v-model="newTime"
                type="number"
                inputmode="decimal"
                class="modal__body-input"
              >
              <input
                class="modal__body-input-placeholder"
                type="text"
                value="h"
                disabled
              >
            </div>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <button class="modal__footer-button" @click="addAppliance">
          Save
        </button>
      </div>
    </template>
  </modal>
</template>

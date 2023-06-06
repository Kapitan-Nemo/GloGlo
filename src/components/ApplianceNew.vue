<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useModal } from '@/stores/modal'
import { useAppliance } from '@/stores/appliance'
import modal from '@/components/Modal/ModalTemplate.vue'

const { applianceList, kwhCost } = storeToRefs(useAppliance())
const { showAppliance } = storeToRefs(useModal())

const applianceForm = ref({
  newWattage: 0,
  newTime: 0,
  newDevice: '',
})

const showModalError = ref(false)

function addAppliance() {
  if (applianceForm.value.newWattage === 0 || applianceForm.value.newTime === 0 || applianceForm.value.newTime > 24 || applianceForm.value.newDevice === '') {
    // TODO: toast error
    setTimeout(() => (showModalError.value = false), 2000)
    return (showModalError.value = true)
  }

  const newIcon = `/devices/${applianceForm.value.newDevice.toLocaleLowerCase().replace(/\s/g, '-')}.svg`

  applianceList.value.push({
    id: applianceList.value.length + 1,
    wattage: applianceForm.value.newWattage,
    time: applianceForm.value.newTime,
    device: applianceForm.value.newDevice,
    kwh: (applianceForm.value.newWattage * 0.001 * applianceForm.value.newTime * kwhCost.value).toFixed(2) as unknown as number,
    icon: newIcon,
  })
  applianceForm.value.newWattage = 0
  applianceForm.value.newTime = 0
  applianceForm.value.newDevice = ''
  showAppliance.value = false
}
</script>

<template>
  <modal v-show="showAppliance">
    <template #header>
      <h2 class="modal__title">
        Add new appliance
      </h2>
      <img
        class="modal__header-close"
        src="@/assets/svg/controls/close.svg"
        @click="showAppliance = false"
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
        <div v-if="applianceForm.newTime > 24" class="modal__error">
          <span class="modal__error-wrapper">
            <img class="modal__error-icon" src="@/assets/svg/controls/warning.svg">
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
            <img class="modal__body-icon" src="@/assets/svg/controls/device.svg">
            <label class="modal__body-label">Choose device:</label>
          </div>
          <select v-model="applianceForm.newDevice" class="modal__body-select">
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
              <img class="modal__body-icon" src="@/assets/svg/controls/wattage.svg">
              <label class="modal__body-label">Wattage:</label>
            </div>
            <div class="modal__body-item-wrapper">
              <input v-model="applianceForm.newWattage" type="number" inputmode="decimal" class="modal__body-input">
              <input class="modal__body-input-placeholder" type="text" value="W" disabled>
            </div>
          </div>
          <div class="modal__body-item modal__body-item-mobile">
            <div class="modal__body-item-wrapper">
              <img class="modal__body-icon" src="@/assets/svg/controls/time.svg">
              <label class="modal__body-label">Used per day:</label>
            </div>
            <div class="modal__body-item-wrapper modal__body-item-wrapper-mobile">
              <input v-model="applianceForm.newTime" type="number" inputmode="decimal" class="modal__body-input">
              <input class="modal__body-input-placeholder" type="text" value="h" disabled>
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

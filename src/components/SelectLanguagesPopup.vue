<script lang="ts" setup>
import EasyForm from "@/components/EasyForm.vue"
import Popup from "@/components/Popup.vue"
import SVGIcon from "@/components/SVGIcon.vue"
import LANGUAGES from "@/consts/languages.json"

const emit = defineEmits<{(event: string): void}>()

const props = defineProps<{
  state: any
  property: string
}>()

const easyFormProps: TTEasyForm = {
  hasSubmitButton: false,
  data: [
    {
      state: props.state,
      model: props.property,
      type: "checkbox",
      classes: "checkboxes-is-wide",
      options: LANGUAGES,
      layout: "vertical-2columns",
      onUpdate () {
        emit("change")
      },
    },
  ],
}

function close () {
  emit("close")
}
</script>

<template>
  <Popup
    class="select-languages-popup"
    :hasCloseButton="true"
    @close="close"
  >
    <template v-slot:header>
      <h2>
        <SVGIcon name="translate" />
        <span>{{ $t("contentLanguages") }}</span>
      </h2>
    </template>
    <template v-slot:body>
      <slot name="header" />
      <EasyForm v-bind="easyFormProps" />
    </template>
  </Popup>
</template>

<style lang="scss" scoped>
.select-languages-popup:deep() {
  .popup-body {
    padding: 1rem 0 0;

    p {
      margin: 0 1rem;
    }
  }
}
</style>

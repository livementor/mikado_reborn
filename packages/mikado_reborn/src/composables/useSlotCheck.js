import { ref, computed, onBeforeUpdate, Comment, Fragment, Text, useSlots } from 'vue'

// Adapted from https://github.com/vuejs/vue-next/blob/ca17162e377e0a0bf3fae9d92d0fdcb32084a9fe/packages/runtime-core/src/helpers/renderSlot.ts#L77
// Demo: https://play.vuejs.org/#eNqVVm1P3EYQ/iuDU+UOdNiEa0NBHE2gRE1bJVWg/RJH1Z49PhvstbW7PkDX+++d2bV9vmCIggTa3Xl7ZuaZMSvvbVX5yxq9E+9URyqrDGg0dXUWyqyoSmXgoiwqSFRZwMgP+MLqo068AoXJBEp5jkmp8O8qFgYnUGu8ykujYd3YOqNQRqXUBgq9gBlbjke/ZTuj3Y3ElItFbm1JYbwLszMKEUpgE38p8hrpfXP+BWSd53AC1k8o16E8DVwilAJdDBZVTpDoBnDK+O0JYLWyKNZk4R46VXghRYFnaXYabFvb9K1busxrY0oJb6I8i25nobcBHnpnF/wIBZ4GTo2Mes68iWc0pZtkC/9Gl5KKv2KfoRdRgCxH9bEyGZUj9E7ASlgm8ry8+92+GVXjpH2PUoxuB95v9D2/hd5fCjWqJYZeJzNCLZCAsvjy6gPe07kTFmVc56T9jPAT6jKvGaNTO69lTLB7ehbte8uRTC6u9eW9QanbpBgoa66tfugRO7i2T6W+gTv1p9aOOk1VbOnI7N1ulWYCcRu5M6jJFoKehM9b3aXrMP2/j9+N0RX7uCwq88BKF9ygboQGZL3BYHSaGN76H9NoOMkKCK0z0hOIMckkxi2G2VDIsXVmZ2sb/riZK64HOy9z9PNyMXbl3oRxM7YdzL2xJjle0283btSPARBEcOrO88WkNhYozQTeKbFwp2ti3aPdEeztUeA9+BUNqoIgabhL0aSoQNjKQaYdfCD38A/th+kJpMZU+iQIFplJ67lPIxaQwxvNf/clxQkyrWvUwfTgp9fW/5tKKFHA6l0tIybj2jnfh+sU3fEH/uszv5yBosSV1LA6L6mYgtcQ7AUWcwBvY1EZjF0y30Yzz8t5EIlXR69eH+L06AgPxME8mSYCj+Pjw/ggiaP59PDg5x/FcYJBJaJbsSD0qpYmK3A/osIGWkVBinmFigQoY1TcEN/oF38eHTGspEkNlh/KGN9r2zQYLyXd9K6jhksK3JuPS1QPYz533AHIErBPvnmo6H02a3u521q3kz6ka5v88iXs2OcozfKYwPpGZcV49wkP7gSw7aklDnlrFfqJubhtACItKzRZ8s+jSN1HoZEkItduYTHr+1z81HSebRlgQ8RUaILI00VrzwyyCv6Dj/MbjExDL+EI6y5df4jHTnDoBKU1eZ51eG+nze2NrOntzNm3veNa7vDLV3VmGXGWxHcItHTbhEwq7HhJi7SFNyGtkaLEiSYWo5AxqSI/6Tb7CegSMjNyxnY+WwTcwDJxEXaoj6PW8aiD1ZS+T8h+Z9mUyNJ0pcmcFpao814Vm1W4WXkNDrc/3X8iK+5tK93ar07++YtdpRuNZgmxzh/4wGq9vQoDW5M0XMf9W9Lv1nNHN+fYfs+7JTrg9qu4/IlwImf/r8S7KyNMzaYr5sQgGJ9W5KWIUguD/PRCQM/H50b8hZw1VHLAO0EzTly94Q8IWW789dJ9+qNEqWwXgXPchBgQ9ujReOh9LR+XoP0fIpTe+n9hfcRC

function vNodeIsEmpty (vnodes) {
  return vnodes.every(node => {
    if (node.type === Comment) return true
    if (node.type === Text && !node.children.trim()) return true
    if (
      node.type === Fragment &&
      vNodeIsEmpty(node.children)
    ) {
      return true
    }

    return false
  })
}

/**
 * Returns true if a slot has no content
 * @param {Function | Object} slot a Vue 3 slot function or a Vue 2 slot object
 * @returns {Boolean}
 */
export const isEmpty = (slot, props) => {
  if (!slot) return true

  // if we get a slot that is not a function, we're in vue 2 and there is content, so it's not empty
  if (typeof slot !== 'function') return false

  return vNodeIsEmpty(slot(props))
}

/**
 * @param {String} [slotName=default] Optional string to check for a specific slot's status with the slotIsEmpty convinience computed
 * @param {Object} [scopedSlotInjection={}] Object key/value collection of data to be injected to scoped slots
 * @returns
 */
export default function (slotName = 'default', scopedSlotInjection = {}) {
  const emptySlots = ref({})
  const definedSlots = ref([])

  const checkEmptySlots = () => {
    const slots = useSlots()
    console.log(slots)

    definedSlots.value = Object.keys(slots)

    const _newStatus = {}
    definedSlots.value.forEach(slotKey => {
      _newStatus[slotKey] = isEmpty(slots[slotKey], scopedSlotInjection[slotKey])
    })

    emptySlots.value = _newStatus
  }

  onBeforeUpdate(() => {
    checkEmptySlots()
  })

  checkEmptySlots()

  /** Single slot data - Requires `slotName` */
  const slotIsEmpty = computed(() => {
    if (!slotName) return undefined

    return !definedSlots.value.includes(slotName) || emptySlots.value[slotName]
  })

  return {
    emptySlots,
    definedSlots,
    slotIsEmpty
  }
}

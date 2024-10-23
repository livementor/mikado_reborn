import { Comment, Text, type Slot, type VNode, Fragment } from 'vue'

export function hasSlotContent(slot: Slot | undefined | null, props: unknown = {}) {
  return !isSlotEmpty(slot, props);
}

function isSlotEmpty(slot: Slot | undefined | null, props: unknown = {}) {
  return isVNodeEmpty(slot?.(props));
}

function isVNodeEmpty(vnode: VNode | VNode[] | undefined | null) {
  return (
    !vnode ||
    asArray(vnode).every(
      (vnode) =>
        vnode.type === Comment ||
        (vnode.type === Text && !vnode.children?.length) ||
        (vnode.type === Fragment && isVNodeEmpty(<VNode> vnode.children)),
    )
  );
}

function asArray<T>(arg: T | T[] | null) {
  return Array.isArray(arg) ? arg : arg !== null ? [arg] : [];
}
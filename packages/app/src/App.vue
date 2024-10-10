<script setup lang="ts">
import { MkrApp, MkrIcon, MkrStepper, MkrBadge, MkrAvatar, MkrCard, MkrCheckbox, MkrChips, MkrChipsList, MkrList, MkrInteractiveIcon, MkrListItem, MkrNavItem, MkrNavItemGroup, MkrNotificationBadge, MkrRadioGroup, MkrRadio, MkrContainedButton, MkrOutlinedButton, MkrDropdown, MkrDataTable, MkrModal, MkrExpansionPanel, MkrOverlay, MkrPopUp, MkrProgressbar, MkrSnackbar, MkrSwitch, MkrTooltip, MkrLargeTooltip, MkrTextarea, MkrSteppedProgress, MkrTextButton, MkrTextfield } from '@livementor/mikado_reborn/src/components';

import { createApp } from 'vue';
const app = createApp({});
app.component('MkrAvatar', MkrAvatar);
app.component('MkrBadge', MkrBadge);
app.component('MkrTextButton', MkrTextButton);
app.component('MkrContainedButton', MkrContainedButton);
app.component('MkrOutlinedButton', MkrOutlinedButton);
app.component('MkrCard', MkrCard);
app.component('MkrCheckbox', MkrCheckbox);
app.component('MkrChips', MkrChips);
app.component('MkrChipsList', MkrChipsList);
app.component('MkrExpansionPanel', MkrExpansionPanel);
app.component('MkrIcon', MkrIcon);
app.component('MkrInteractiveIcon', MkrInteractiveIcon);
app.component('MkrList', MkrList);
app.component('MkrListItem', MkrListItem);
app.component('MkrNavItem', MkrNavItem);
app.component('MkrNavItemGroup', MkrNavItemGroup);
app.component('MkrNotificationBadge', MkrNotificationBadge);
app.component('MkrRadioGroup', MkrRadioGroup);
app.component('MkrRadio', MkrRadio);
app.component('MkrDropdown', MkrDropdown);
app.component('MkrDataTable', MkrDataTable);
app.component('MkrModal', MkrModal);
app.component('MkrOverlay', MkrOverlay);
app.component('MkrPopUp', MkrPopUp);
app.component('MkrProgressbar', MkrProgressbar);
app.component('MkrSnackbar', MkrSnackbar);
app.component('MkrSteppedProgress', MkrSteppedProgress);
app.component('MkrStepper', MkrStepper);
app.component('MkrSwitch', MkrSwitch);
app.component('MkrTooltip', MkrTooltip);
app.component('MkrTextarea', MkrTextarea);
app.component('MkrTextfield', MkrTextfield);

</script>

<template>
  <header>
    <h1>Doc-App</h1>
    <ul>
      <li>/</li>
      <li>Path</li>
      <li>/</li>
      <li>To</li>
      <li>/</li>
      <li>Component</li>
    </ul>
  </header>

  <aside class="card-like">
    <h3>Liste des components</h3>
    <ul>
      <li><i>TODO component</i></li>
    </ul>
  </aside>

  <section class="card-like">
    <MkrApp>
      <i>TODO</i>
    </MkrApp>
  </section>
</template>

<style scoped>
header{
  width: 100%;
  padding: 10px 15px;
  margin: 15px 15px 0;
  display: flex;
}
header ul{ display: flex; list-style: none; }
header ul li{ padding: 3px 5px; }

.card-like{
  background-color: white;
  border: 1px solid rgba(33, 46, 59, 0.2);
  margin: 15px;
  padding: 30px 15px;
  border-radius: 15px;
}
aside{
  width: 300px;
  flex: 0 0 auto;
}
aside h3{ margin: 0 0 15px; padding: 0; text-align: center; }
aside ul{ margin: 0; padding:0; }
aside ul li{
  position: relative;
  list-style: none;
  padding: 3px 8px;
}
aside ul li::after{
  content:'>';
  position: absolute;
  opacity:.3;
  bootom: 0; right: 5px;
  height:100%;
  margin: auto 0 ;
}
aside ul li:hover{
  background-color: #f8f8f8;
  cursor:pointer;
}

section{
  flex: 1 1 auto;
  height: fit-content;

}
</style>

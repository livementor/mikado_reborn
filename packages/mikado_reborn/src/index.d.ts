import { Component, PluginFunction } from 'vue';

export interface MikadoRebornOptions {
  components?: Record<string, Component>
}

export interface MikadoReborn {
  install: PluginFunction<MikadoRebornOptions>
}

declare const MikadoReborn: MikadoReborn;
export default MikadoReborn;

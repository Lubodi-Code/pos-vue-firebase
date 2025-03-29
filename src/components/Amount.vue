<template>
    <div class="flex justify-between p-1 text-sm"> <!-- Cambia el tamaño aquí -->
      <dt class="font-bold">
        <slot name="label"></slot>
      </dt>
  
      <dd class="text-gray-900">
        <slot name="value"></slot>
      </dd>
    </div>
  </template>
  
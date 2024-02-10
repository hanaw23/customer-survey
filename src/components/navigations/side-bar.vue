<template>
  <div>
    <div class="bg-[#154c79] min-h-screen hidden sm:fixed sm:inset-y-0 sm:flex sm:w-56 sm:flex-col">
      <div class="flex flex-grow flex-col">
        <div class="h-20 flex flex-shrink-0 items-center bg-[#154c79] px-20 py-4 text-center text-white font-semibold">LOGO</div>
        <scroll-panel style="width: 100%; height: calc(100vh - 112px)">
          <div class="flex flex-1 flex-col border-t border-[#154c79] bg-[#154c79]">
            <slot />
          </div>
        </scroll-panel>
      </div>
    </div>
  </div>
</template>
